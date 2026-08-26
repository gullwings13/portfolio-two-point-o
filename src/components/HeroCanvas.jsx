import React, { useEffect, useRef } from 'react'

/**
 * The hero background: a node field with packets routed along its edges, projected with
 * fake perspective and reactive to the pointer.
 *
 * A routing motif rather than generic particles, because it carries both halves of the
 * CV at once (enterprise networking into full-stack) and stays calm enough behind the
 * wordmark to keep it legible. Plain 2D canvas, no render library.
 *
 * The field is a real, if shallow, volume. Every node has a z, and each frame the whole
 * slab is rotated about its centre -- yaw then pitch -- before a focal-length divide turns
 * depth into a scale factor driving size, brightness and link reach. Nodes on the near side
 * of the turn swell and brighten while the far side recedes, and the two sides swap draw
 * order as they cross. A flat parallax pan cannot fake that crossing.
 *
 * The rotation comes from two places: a slow sine drift so the field is alive on an
 * untouched page, and the pointer, which adds yaw and pitch on top. Both stay small on
 * purpose -- the wordmark sits over this and has to stay legible.
 *
 * Pauses when the tab is hidden, and draws a single static frame with no pointer
 * response when the viewer has asked for reduced motion.
 */

const NODE_DENSITY = 30000     // one node per this many square px of world
const NODE_MIN = 40
const NODE_MAX = 160
const LINK_DISTANCE = 175      // px at the near plane, scaled by depth
const PACKET_COUNT = 9
const PACKET_SPEED = 0.0065    // fraction of an edge per frame at 60fps

const FOCAL = 520              // with DEPTH below, scale runs 1.0 (near) to 0.67 (far)
const DEPTH = 260
const MIN_SCALE = 520 / (520 + 260)

// Rotation. Pointer and drift are additive, so the sums are what the eye actually sees:
// about 10 degrees of yaw and 6 of pitch at full deflection. Past that the field starts
// competing with the wordmark instead of sitting behind it.
const MAX_YAW = 0.11           // rad, pointer-driven
const MAX_PITCH = 0.065
const DRIFT_YAW = 0.07         // rad, the idle sway
const DRIFT_PITCH = 0.04
const DRIFT_SPEED = 0.0009     // phase per frame -- one full sway takes about two minutes
const DRIFT_PITCH_RATIO = 0.61 // incommensurate with the yaw phase, so it never visibly loops
const ROT_EASE = 0.05          // rotation smoothing

// The turn is bounded by how far it swings the field edge in DEPTH, not by its angle. The
// slab is as wide as the viewport, so a fixed angle on a 3440px hero throws its edges much
// further back than the same angle on a phone -- past the far plane, where they contract
// inside the viewport and leave a bare band down the sides. Capping the swing in px keeps
// the effect looking the same at every width; wide screens simply turn through fewer
// degrees to get there.
const ROTATION_SWING = 180     // px of depth at the field edge, at full deflection

// Depth scaling contracts the field toward the centre and rotation contracts the receding
// side further, so it is built well wider than the viewport. Tuned as the smallest value
// that leaves no bare edge at full deflection from 375px to 3440px wide.
const ROTATION_OVERSCAN = 1.22

const CURSOR_RADIUS = 185      // px, screen space
const CURSOR_PUSH = 20         // px a node is nudged out of the pointer's way

const INK = '#111827'
const PACKET_HEAD = '#f687b3'

// Deterministic PRNG (mulberry32) so the field looks the same on every load rather
// than occasionally dealing an ugly hand.
const makeRandom = seed => () =>
{
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

// Overscan. Depth scaling contracts everything toward the centre, so a field built to
// exactly the viewport leaves the edges bare once the far nodes shrink inward. Build across
// the area the FAR plane covers (plus room for the turn) and let perspective pull it in.
// Shared so the node placement and the wander bounds cannot drift apart.
const worldBounds = (width, height) =>
{
    const worldW = (width / MIN_SCALE) * ROTATION_OVERSCAN
    const worldH = (height / MIN_SCALE) * ROTATION_OVERSCAN
    const insetX = (worldW - width) / 2
    const insetY = (worldH - height) / 2
    return { worldW, worldH, minX: -insetX, maxX: width + insetX, minY: -insetY, maxY: height + insetY }
}

// Jittered grid rather than pure random placement. Uniform random clumps badly at this
// node count -- the first pass left the left third dense and the right third empty --
// and a background field wants even coverage more than it wants true randomness.
const buildNodes = (width, height) =>
{
    const random = makeRandom(20260826)

    const { worldW, worldH, minX: originX, minY: originY } = worldBounds(width, height)

    const target = Math.round((worldW * worldH) / NODE_DENSITY)
    const count = Math.max(NODE_MIN, Math.min(NODE_MAX, target))

    const aspect = worldW / Math.max(worldH, 1)
    const cols = Math.max(2, Math.round(Math.sqrt(count * aspect)))
    const rows = Math.max(2, Math.ceil(count / cols))
    const cellW = worldW / cols
    const cellH = worldH / rows

    const nodes = []
    for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
            if (nodes.length >= count) break
            nodes.push({
                x: originX + (col + 0.15 + random() * 0.7) * cellW,
                y: originY + (row + 0.15 + random() * 0.7) * cellH,
                z: random(),
                vx: (random() - 0.5) * 0.22,
                vy: (random() - 0.5) * 0.22,
                r: 1.2 + random() * 2.0,
                sx: 0,
                sy: 0,
                s: 1,
                d: 0,
            })
        }
    }
    return nodes
}

const HeroCanvas = ({ className }) =>
{
    const canvasRef = useRef(null)

    useEffect(() =>
    {
        const canvas = canvasRef.current
        if (!canvas) return undefined
        const ctx = canvas.getContext('2d')
        if (!ctx) return undefined

        const reduceMotion =
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches

        let width = 0
        let height = 0
        let worldMinX = 0
        let worldMaxX = 0
        let worldMinY = 0
        let worldMaxY = 0
        let nodes = []
        let packets = []
        let frame = null

        // Where the pointer wants the field turned, and where it has eased to so far.
        let targetYaw = 0
        let targetPitch = 0
        let yaw = 0
        let pitch = 0
        let cosYaw = 1
        let sinYaw = 0
        let cosPitch = 1
        let sinPitch = 0
        let phase = 0
        // Set on resize: the angles above, scaled down if this viewport is wide enough
        // that they would overswing it. See ROTATION_SWING.
        let maxYaw = MAX_YAW
        let maxPitch = MAX_PITCH
        let driftYaw = DRIFT_YAW
        let driftPitch = DRIFT_PITCH
        // Draw order, held as indices: the packets address nodes by index, so the node
        // array itself must not be reordered.
        let order = []
        let pointerX = -9999
        let pointerY = -9999
        let pointerActive = false

        // A packet rides from one node to a nearby one, then picks a new neighbour.
        const nearestNeighbour = (index, exclude) =>
        {
            const from = nodes[index]
            let best = -1
            let bestDist = Infinity
            for (let i = 0; i < nodes.length; i += 1) {
                if (i === index || i === exclude) continue
                const dx = nodes[i].x - from.x
                const dy = nodes[i].y - from.y
                const dist = dx * dx + dy * dy
                if (dist < bestDist && dist > 400) {
                    bestDist = dist
                    best = i
                }
            }
            return best === -1 ? (index + 1) % nodes.length : best
        }

        const spawnPacket = seedIndex =>
        {
            const from = seedIndex % nodes.length
            const to = nearestNeighbour(from, -1)
            return { from, to, t: Math.random() }
        }

        const resize = () =>
        {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            width = canvas.clientWidth
            height = canvas.clientHeight
            canvas.width = Math.floor(width * dpr)
            canvas.height = Math.floor(height * dpr)
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            const bounds = worldBounds(width, height)
            worldMinX = bounds.minX
            worldMaxX = bounds.maxX
            worldMinY = bounds.minY
            worldMaxY = bounds.maxY
            nodes = buildNodes(width, height)
            order = nodes.map((unused, i) => i)

            const yawScale = Math.min(1, ROTATION_SWING /
                Math.max((bounds.worldW / 2) * Math.sin(MAX_YAW + DRIFT_YAW), 0.001))
            const pitchScale = Math.min(1, ROTATION_SWING /
                Math.max((bounds.worldH / 2) * Math.sin(MAX_PITCH + DRIFT_PITCH), 0.001))
            maxYaw = MAX_YAW * yawScale
            driftYaw = DRIFT_YAW * yawScale
            maxPitch = MAX_PITCH * pitchScale
            driftPitch = DRIFT_PITCH * pitchScale
            // Rebuild the packets too: the node array they index into was just replaced,
            // so keeping the old ones would leave them pointing at the wrong nodes.
            packets = Array.from({ length: PACKET_COUNT }, (unused, i) => spawnPacket(i * 6 + 1))
        }

        // World position to screen position: turn the node about the centre of the field,
        // then divide by depth. z is stored 0..1 and re-centred here, so at zero rotation
        // this is exactly the plain focal divide it replaced.
        const project = node =>
        {
            const cx = width / 2
            const cy = height / 2
            const px = node.x - cx
            const py = node.y - cy
            const pz = (node.z - 0.5) * DEPTH

            const xYaw = px * cosYaw + pz * sinYaw
            const zYaw = pz * cosYaw - px * sinYaw
            const yPitch = py * cosPitch - zYaw * sinPitch
            const zPitch = zYaw * cosPitch + py * sinPitch

            const s = FOCAL / (FOCAL + zPitch + DEPTH * 0.5)
            let sx = cx + xYaw * s
            let sy = cy + yPitch * s

            if (pointerActive) {
                const dx = sx - pointerX
                const dy = sy - pointerY
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < CURSOR_RADIUS && dist > 0.001) {
                    const push = (1 - dist / CURSOR_RADIUS) * CURSOR_PUSH * s
                    sx += (dx / dist) * push
                    sy += (dy / dist) * push
                }
            }

            node.sx = sx
            node.sy = sy
            node.s = s
            node.d = zPitch
        }

        const step = () =>
        {
            if (!reduceMotion) phase += DRIFT_SPEED
            yaw += (targetYaw + Math.sin(phase) * driftYaw - yaw) * ROT_EASE
            pitch += (targetPitch + Math.sin(phase * DRIFT_PITCH_RATIO) * driftPitch - pitch) * ROT_EASE
            cosYaw = Math.cos(yaw)
            sinYaw = Math.sin(yaw)
            cosPitch = Math.cos(pitch)
            sinPitch = Math.sin(pitch)

            ctx.fillStyle = INK
            ctx.fillRect(0, 0, width, height)

            for (let i = 0; i < nodes.length; i += 1) {
                const n = nodes[i]
                if (!reduceMotion) {
                    n.x += n.vx
                    n.y += n.vy
                    if (n.x < worldMinX || n.x > worldMaxX) n.vx *= -1
                    if (n.y < worldMinY || n.y > worldMaxY) n.vy *= -1
                }
                project(n)
            }

            // Edges. Reach scales with depth so the mesh stays consistent in world space
            // rather than the far field looking artificially disconnected.
            ctx.lineWidth = 1
            for (let i = 0; i < nodes.length; i += 1) {
                const a = nodes[i]
                for (let j = i + 1; j < nodes.length; j += 1) {
                    const b = nodes[j]
                    const avgS = (a.s + b.s) * 0.5
                    const reach = LINK_DISTANCE * avgS
                    const dx = b.sx - a.sx
                    const dy = b.sy - a.sy
                    if (Math.abs(dx) > reach || Math.abs(dy) > reach) continue
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist > reach) continue

                    const fade = (1 - dist / reach) * avgS
                    ctx.strokeStyle = 'rgba(246, 135, 179, ' + (fade * 0.55).toFixed(3) + ')'
                    ctx.beginPath()
                    ctx.moveTo(a.sx, a.sy)
                    ctx.lineTo(b.sx, b.sy)
                    ctx.stroke()
                }
            }

            // Nodes, far to near. Rotation reshuffles depth every frame, so this is sorted
            // here rather than once at build time -- the swap as two nodes cross is a good
            // part of what sells the turn. Nearly-sorted input, so it stays cheap.
            order.sort((a, b) => nodes[b].d - nodes[a].d)
            for (let k = 0; k < order.length; k += 1) {
                const n = nodes[order[k]]
                // Clamped: rotation can push a near node past s = 1.5, and an rgba() alpha
                // above 1 is not a value every browser agrees to parse.
                let alpha = Math.min(1, 0.18 + 0.55 * n.s)
                let radius = n.r * n.s

                if (pointerActive) {
                    const dx = n.sx - pointerX
                    const dy = n.sy - pointerY
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < CURSOR_RADIUS) {
                        const k = 1 - dist / CURSOR_RADIUS
                        alpha = Math.min(1, alpha + k * 0.55)
                        radius += k * 1.5 * n.s
                        // A thread from the pointer to whatever it is near.
                        ctx.strokeStyle = 'rgba(246, 135, 179, ' + (k * k * 0.45).toFixed(3) + ')'
                        ctx.lineWidth = 1
                        ctx.beginPath()
                        ctx.moveTo(pointerX, pointerY)
                        ctx.lineTo(n.sx, n.sy)
                        ctx.stroke()
                    }
                }

                ctx.fillStyle = 'rgba(246, 135, 179, ' + alpha.toFixed(3) + ')'
                ctx.beginPath()
                ctx.arc(n.sx, n.sy, radius, 0, Math.PI * 2)
                ctx.fill()
            }

            for (let i = 0; i < packets.length; i += 1) {
                const p = packets[i]
                const a = nodes[p.from]
                const b = nodes[p.to]
                if (!a || !b) continue

                const x = a.sx + (b.sx - a.sx) * p.t
                const y = a.sy + (b.sy - a.sy) * p.t
                const tailT = Math.max(0, p.t - 0.28)
                const tx = a.sx + (b.sx - a.sx) * tailT
                const ty = a.sy + (b.sy - a.sy) * tailT
                const s = a.s + (b.s - a.s) * p.t

                const gradient = ctx.createLinearGradient(tx, ty, x, y)
                gradient.addColorStop(0, 'rgba(213, 63, 140, 0)')
                gradient.addColorStop(1, 'rgba(213, 63, 140, ' + s.toFixed(3) + ')')
                ctx.strokeStyle = gradient
                ctx.lineWidth = 1.6 * s
                ctx.beginPath()
                ctx.moveTo(tx, ty)
                ctx.lineTo(x, y)
                ctx.stroke()

                ctx.fillStyle = PACKET_HEAD
                ctx.beginPath()
                ctx.arc(x, y, 2.2 * s, 0, Math.PI * 2)
                ctx.fill()

                if (!reduceMotion) {
                    p.t += PACKET_SPEED
                    if (p.t >= 1) {
                        p.t = 0
                        const previous = p.from
                        p.from = p.to
                        p.to = nearestNeighbour(p.from, previous)
                    }
                }
            }

            if (!reduceMotion) frame = window.requestAnimationFrame(step)
        }

        const start = () =>
        {
            if (frame === null && !reduceMotion) frame = window.requestAnimationFrame(step)
        }
        const stop = () =>
        {
            if (frame !== null) {
                window.cancelAnimationFrame(frame)
                frame = null
            }
        }

        const onPointerMove = event =>
        {
            const rect = canvas.getBoundingClientRect()
            pointerX = event.clientX - rect.left
            pointerY = event.clientY - rect.top
            // Only treat the pointer as present while it is actually over the hero.
            pointerActive =
                pointerY >= 0 && pointerY <= height && pointerX >= 0 && pointerX <= width
            // Turn toward the pointer: whichever side it is on comes forward.
            targetYaw = ((pointerX - width / 2) / Math.max(width / 2, 1)) * maxYaw
            targetPitch = ((pointerY - height / 2) / Math.max(height / 2, 1)) * maxPitch
        }

        const onPointerLeave = () =>
        {
            pointerActive = false
            targetYaw = 0
            targetPitch = 0
        }

        const onVisibility = () => (document.hidden ? stop() : start())
        const onResize = () => { resize() }

        resize()

        // One frame regardless, so reduced-motion viewers still get the image.
        step()

        window.addEventListener('resize', onResize)
        document.addEventListener('visibilitychange', onVisibility)
        if (!reduceMotion) {
            // On window, not the canvas: the wordmark and nav sit on top of it.
            window.addEventListener('pointermove', onPointerMove, { passive: true })
            window.addEventListener('pointerdown', onPointerMove, { passive: true })
            document.addEventListener('pointerleave', onPointerLeave)
        }

        return () =>
        {
            stop()
            window.removeEventListener('resize', onResize)
            document.removeEventListener('visibilitychange', onVisibility)
            window.removeEventListener('pointermove', onPointerMove)
            window.removeEventListener('pointerdown', onPointerMove)
            document.removeEventListener('pointerleave', onPointerLeave)
        }
    }, [])

    return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}

export default HeroCanvas

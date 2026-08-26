import React, { useEffect, useRef } from 'react'

/**
 * The hero background: a node field with packets routed along its edges, projected with
 * fake perspective and reactive to the pointer.
 *
 * A routing motif rather than generic particles, because it carries both halves of the
 * CV at once (enterprise networking into full-stack) and stays calm enough behind the
 * wordmark to keep it legible. Plain 2D canvas, no render library.
 *
 * Depth is faked the cheap way. Every node gets a z, and a focal-length divide turns it
 * into a scale factor driving size, brightness, link reach and parallax. Near nodes are
 * bigger, brighter and swing further as the pointer moves, which reads as 3D without
 * anything actually being 3D.
 *
 * Pauses when the tab is hidden, and draws a single static frame with no pointer
 * response when the viewer has asked for reduced motion.
 */

const NODE_DENSITY = 30000     // one node per this many square px of world
const NODE_MIN = 40
const NODE_MAX = 130
const LINK_DISTANCE = 175      // px at the near plane, scaled by depth
const PACKET_COUNT = 9
const PACKET_SPEED = 0.0065    // fraction of an edge per frame at 60fps

const FOCAL = 520              // with DEPTH below, scale runs 1.0 (near) to 0.67 (far)
const DEPTH = 260
const MIN_SCALE = 520 / (520 + 260)
const PARALLAX = 0.075         // how far the field swings with the pointer
const CURSOR_RADIUS = 185      // px, screen space
const CURSOR_PUSH = 20         // px a node is nudged out of the pointer's way
const EASE = 0.075             // pointer smoothing

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

// Jittered grid rather than pure random placement. Uniform random clumps badly at this
// node count -- the first pass left the left third dense and the right third empty --
// and a background field wants even coverage more than it wants true randomness.
const buildNodes = (width, height) =>
{
    const random = makeRandom(20260826)

    // Overscan. Depth scaling contracts everything toward the centre, so a field built
    // to exactly the viewport leaves the edges bare once the far nodes shrink inward.
    // Build across the area the FAR plane covers, then let perspective pull it in.
    const worldW = width / MIN_SCALE
    const worldH = height / MIN_SCALE
    const originX = -(worldW - width) / 2
    const originY = -(worldH - height) / 2

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
            })
        }
    }
    // Painter's algorithm: draw the far ones first. z never changes, so sorting once
    // here saves sorting every frame.
    nodes.sort((a, b) => b.z - a.z)
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

        // Where the pointer is, and where the field has eased to so far.
        let targetX = 0
        let targetY = 0
        let camX = 0
        let camY = 0
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
            worldMinX = -(width / MIN_SCALE - width) / 2
            worldMaxX = width - worldMinX
            worldMinY = -(height / MIN_SCALE - height) / 2
            worldMaxY = height - worldMinY
            nodes = buildNodes(width, height)
            // Rebuild the packets too: the node array they index into was just replaced,
            // so keeping the old ones would leave them pointing at the wrong nodes.
            packets = Array.from({ length: PACKET_COUNT }, (unused, i) => spawnPacket(i * 6 + 1))
        }

        // World position to screen position, with depth scaling and pointer parallax.
        // Near nodes (s near 1) swing further than far ones, which is the whole trick.
        const project = node =>
        {
            const s = FOCAL / (FOCAL + node.z * DEPTH)
            const cx = width / 2
            const cy = height / 2
            let sx = cx + (node.x - cx) * s + camX * s
            let sy = cy + (node.y - cy) * s + camY * s

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
        }

        const step = () =>
        {
            camX += (targetX - camX) * EASE
            camY += (targetY - camY) * EASE

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

            // Nodes, far to near (the array is depth-sorted at build time).
            for (let i = 0; i < nodes.length; i += 1) {
                const n = nodes[i]
                let alpha = 0.18 + 0.55 * n.s
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
            targetX = (pointerX - width / 2) * -PARALLAX
            targetY = (pointerY - height / 2) * -PARALLAX
        }

        const onPointerLeave = () =>
        {
            pointerActive = false
            targetX = 0
            targetY = 0
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

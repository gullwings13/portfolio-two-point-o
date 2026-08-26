import React, { useEffect, useRef } from 'react'

/**
 * The hero background: a drifting node field with packets routed along its edges.
 *
 * A routing motif rather than generic particles, because it carries both halves of the
 * CV at once (enterprise networking into full-stack) and stays calm enough behind the
 * wordmark to keep it legible. Plain 2D canvas, no render library.
 *
 * Pauses when the tab is hidden, and draws a single static frame when the viewer has
 * asked for reduced motion.
 */

const NODE_DENSITY = 26000     // one node per this many square px
const NODE_MIN = 34
const NODE_MAX = 90
const LINK_DISTANCE = 180      // px, in CSS pixels
const PACKET_COUNT = 9
const PACKET_SPEED = 0.0065    // fraction of an edge per frame at 60fps

const INK = '#111827'
const EDGE = 'rgba(246, 135, 179, 0.20)'
const NODE = 'rgba(246, 135, 179, 0.55)'
const PACKET_HEAD = '#f687b3'
const PACKET_TAIL = '#d53f8c'

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
    const target = Math.round((width * height) / NODE_DENSITY)
    const count = Math.max(NODE_MIN, Math.min(NODE_MAX, target))

    const aspect = width / Math.max(height, 1)
    const cols = Math.max(2, Math.round(Math.sqrt(count * aspect)))
    const rows = Math.max(2, Math.ceil(count / cols))
    const cellW = width / cols
    const cellH = height / rows

    const nodes = []
    for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
            if (nodes.length >= count) break
            nodes.push({
                x: (col + 0.15 + random() * 0.7) * cellW,
                y: (row + 0.15 + random() * 0.7) * cellH,
                vx: (random() - 0.5) * 0.22,
                vy: (random() - 0.5) * 0.22,
                r: 1.1 + random() * 1.9,
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
        let nodes = []
        let packets = []
        let frame = null

        const resize = () =>
        {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            width = canvas.clientWidth
            height = canvas.clientHeight
            canvas.width = Math.floor(width * dpr)
            canvas.height = Math.floor(height * dpr)
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            nodes = buildNodes(width, height)
            // Rebuild the packets too: the node array they index into was just replaced,
            // so keeping the old ones would leave them pointing at the wrong nodes.
            packets = Array.from({ length: PACKET_COUNT }, (unused, i) => spawnPacket(i * 6 + 1))
        }

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

        const step = () =>
        {
            ctx.fillStyle = INK
            ctx.fillRect(0, 0, width, height)

            for (let i = 0; i < nodes.length; i += 1) {
                const n = nodes[i]
                if (!reduceMotion) {
                    n.x += n.vx
                    n.y += n.vy
                    if (n.x < 0 || n.x > width) n.vx *= -1
                    if (n.y < 0 || n.y > height) n.vy *= -1
                }
            }

            ctx.lineWidth = 1
            ctx.strokeStyle = EDGE
            ctx.beginPath()
            for (let i = 0; i < nodes.length; i += 1) {
                for (let j = i + 1; j < nodes.length; j += 1) {
                    const dx = nodes[j].x - nodes[i].x
                    const dy = nodes[j].y - nodes[i].y
                    if (Math.abs(dx) > LINK_DISTANCE || Math.abs(dy) > LINK_DISTANCE) continue
                    if (Math.sqrt(dx * dx + dy * dy) > LINK_DISTANCE) continue
                    ctx.moveTo(nodes[i].x, nodes[i].y)
                    ctx.lineTo(nodes[j].x, nodes[j].y)
                }
            }
            ctx.stroke()

            ctx.fillStyle = NODE
            for (let i = 0; i < nodes.length; i += 1) {
                const n = nodes[i]
                ctx.beginPath()
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
                ctx.fill()
            }

            for (let i = 0; i < packets.length; i += 1) {
                const p = packets[i]
                const a = nodes[p.from]
                const b = nodes[p.to]
                if (!a || !b) continue

                const x = a.x + (b.x - a.x) * p.t
                const y = a.y + (b.y - a.y) * p.t
                const tailT = Math.max(0, p.t - 0.28)
                const tx = a.x + (b.x - a.x) * tailT
                const ty = a.y + (b.y - a.y) * tailT

                const gradient = ctx.createLinearGradient(tx, ty, x, y)
                gradient.addColorStop(0, 'rgba(213, 63, 140, 0)')
                gradient.addColorStop(1, PACKET_TAIL)
                ctx.strokeStyle = gradient
                ctx.lineWidth = 1.6
                ctx.beginPath()
                ctx.moveTo(tx, ty)
                ctx.lineTo(x, y)
                ctx.stroke()

                ctx.fillStyle = PACKET_HEAD
                ctx.beginPath()
                ctx.arc(x, y, 2.1, 0, Math.PI * 2)
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

        const onVisibility = () => (document.hidden ? stop() : start())
        const onResize = () => { resize(); }

        resize()

        // One frame regardless, so reduced-motion viewers still get the image.
        step()

        window.addEventListener('resize', onResize)
        document.addEventListener('visibilitychange', onVisibility)

        return () =>
        {
            stop()
            window.removeEventListener('resize', onResize)
            document.removeEventListener('visibilitychange', onVisibility)
        }
    }, [])

    return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}

export default HeroCanvas

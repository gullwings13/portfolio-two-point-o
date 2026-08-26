import React, { useEffect, useRef, useState } from 'react'

/**
 * Animated stand-in for the Surreal Diamond project card image.
 *
 * Recreated from that project's design system rather than screenshotted, so it
 * stays crisp at any DPR and costs nothing over the wire. Tier colors, the
 * zero-radius/hard-shadow frame language and the `glitch` tier's signature pair
 * of spinning conic rings are taken from Surreal Diamond's DESIGN-INVENTORY.md.
 *
 * Animation only runs while the deck is on screen, and stops entirely under
 * prefers-reduced-motion.
 */

// Frame colors are the dominant end of each tier's ramp, per the design inventory.
const TIERS = [
    { key: 'yellow', color: '#ffe066', rotate: -13, x: -215, y: 7, z: 1 },
    { key: 'green', color: '#5bd98a', rotate: -7, x: -112, y: 2, z: 2 },
    { key: 'blue', color: '#5bb0f0', rotate: 7, x: 112, y: 2, z: 2 },
    { key: 'violet', color: '#c06aff', rotate: 13, x: 215, y: 7, z: 1 },
]

const GLITCH = '#ff79c6'

const css = `
.sdc-root {
    position: relative;
    overflow: hidden;
    background: #f5f0e5;
    color: #0a0a0a;
}
.sdc-bar {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 22px;
    background: #ffe135;
    border-bottom: 2px solid #0a0a0a;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    box-sizing: border-box;
    color: #0a0a0a;
    z-index: 5;
}
.sdc-wordmark {
    font-family: 'Barlow Condensed', 'Oswald', 'Arial Narrow', sans-serif;
    font-weight: 800;
    font-size: 11px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    line-height: 1;
    color: #0a0a0a;
}
.sdc-chip {
    font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
    font-weight: 700;
    font-size: 8px;
    letter-spacing: 1px;
    text-transform: uppercase;
    line-height: 1;
    color: #0a0a0a;
    padding: 2px 4px;
    border: 1px solid #0a0a0a;
    background: #f5f0e5;
}
.sdc-stage {
    position: absolute;
    top: 22px; left: 0; right: 0; bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.sdc-fan {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* --- a single card ------------------------------------------------------ */
.sdc-card {
    position: absolute;
    width: 42px;
    height: 62px;
    box-sizing: border-box;
    background: #f5f0e5;
    border: 2px solid #0a0a0a;
    /* hard offset ink shadow, no blur -- house rule from the design system */
    box-shadow: 3px 3px 0 rgba(10, 10, 10, 0.85);
    padding: 3px;
    display: flex;
    flex-direction: column;
    gap: 3px;
}
.sdc-frame {
    height: 22px;
    border: 2px solid var(--tier);
    background: var(--tier-wash);
    position: relative;
    overflow: hidden;
}
.sdc-pip {
    position: absolute;
    top: 2px; right: 2px;
    width: 4px; height: 4px;
    background: var(--tier);
}
.sdc-line {
    height: 3px;
    background: #0a0a0a;
    opacity: 0.82;
}
.sdc-line.is-short { width: 62%; }
.sdc-rule {
    height: 2px;
    background: var(--tier);
    margin-top: auto;
}

/* --- the glitch / Nonpareil card ---------------------------------------- */
.sdc-card.is-glitch {
    width: 48px;
    height: 72px;
    z-index: 4;
    border-color: #0a0a0a;
    box-shadow: 3px 3px 0 rgba(10, 10, 10, 0.85), 0 0 12px rgba(255, 121, 198, 0.55);
}
.sdc-rings {
    position: absolute;
    top: 50%; left: 50%;
    width: 96px; height: 96px;
    margin: -48px 0 0 -48px;
    z-index: -1;
    pointer-events: none;
}
.sdc-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    /* masked so only a thin annulus shows -- the tier's signature */
    -webkit-mask: radial-gradient(circle, transparent 60%, #000 62%, #000 69%, transparent 71%);
    mask: radial-gradient(circle, transparent 60%, #000 62%, #000 69%, transparent 71%);
    background: conic-gradient(from 0deg, transparent 0deg, ${GLITCH} 60deg, #5bb0f0 130deg, transparent 200deg, transparent 360deg);
    opacity: 1;
}
.sdc-ring.is-outer {
    -webkit-mask: radial-gradient(circle, transparent 78%, #000 80%, #000 87%, transparent 89%);
    mask: radial-gradient(circle, transparent 78%, #000 80%, #000 87%, transparent 89%);
    background: conic-gradient(from 180deg, transparent 0deg, #c06aff 80deg, ${GLITCH} 150deg, transparent 240deg, transparent 360deg);
    opacity: 0.85;
}
.sdc-holo {
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg,
        transparent 30%,
        rgba(255, 255, 255, 0.75) 45%,
        rgba(255, 121, 198, 0.45) 52%,
        transparent 68%);
    background-size: 260% 100%;
    background-position: 140% 0;
    mix-blend-mode: overlay;
    pointer-events: none;
}

/* --- motion. only while visible, never under reduced-motion ------------- */
@media (prefers-reduced-motion: no-preference) {
    .sdc-root.is-live .sdc-ring {
        animation: sdc-spin 5.5s linear infinite;
        will-change: transform;
    }
    .sdc-root.is-live .sdc-ring.is-outer {
        animation: sdc-spin-rev 8s linear infinite;
    }
    .sdc-root.is-live .sdc-holo {
        animation: sdc-sheen 3.6s ease-in-out infinite;
        will-change: background-position;
    }
    .sdc-root.is-live .sdc-card.is-glitch {
        animation: sdc-hover 3.6s ease-in-out infinite;
    }
}
@keyframes sdc-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
@keyframes sdc-spin-rev {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
}
@keyframes sdc-sheen {
    0%, 12% { background-position: 140% 0; }
    55%, 100% { background-position: -60% 0; }
}
@keyframes sdc-hover {
    0%, 100% { transform: translate(-50%, -50%) translateY(0); }
    50% { transform: translate(-50%, -50%) translateY(-3px); }
}
`

const MiniCard = ({ tier }) => (
    <div
        className="sdc-card"
        style={{
            '--tier': tier.color,
            '--tier-wash': `${tier.color}2e`,
            transform: `translate(-50%, -50%) translate(${tier.x}%, ${tier.y}px) rotate(${tier.rotate}deg)`,
            left: '50%',
            top: '50%',
            zIndex: tier.z,
        }}
    >
        <div className="sdc-frame">
            <span className="sdc-pip" />
        </div>
        <div className="sdc-line" />
        <div className="sdc-line is-short" />
        <div className="sdc-rule" />
    </div>
)

const SurrealDiamondDeck = ({ className }) =>
{
    const rootRef = useRef(null)
    const [live, setLive] = useState(false)

    useEffect(() =>
    {
        const node = rootRef.current
        if (!node) return undefined

        // No IntersectionObserver (older Safari, SSR-adjacent cases): just run.
        if (typeof IntersectionObserver === 'undefined') {
            setLive(true)
            return undefined
        }

        const observer = new IntersectionObserver(
            ([entry]) => setLive(entry.isIntersecting),
            { rootMargin: '120px' }
        )
        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={rootRef}
            className={`sdc-root${live ? ' is-live' : ''} ${className || ''}`}
            role="img"
            aria-label="Surreal Diamond: a fanned deck of rarity-tiered player cards with a glitch-tier Nonpareil card at the centre"
        >
            <style>{css}</style>
            <div className="sdc-bar">
                <span className="sdc-wordmark">Surreal Diamond</span>
                <span className="sdc-chip">Nonpareil</span>
            </div>
            <div className="sdc-stage">
                <div className="sdc-fan">
                    {TIERS.map(tier => (
                        <MiniCard key={tier.key} tier={tier} />
                    ))}

                    <div
                        className="sdc-card is-glitch"
                        style={{
                            '--tier': GLITCH,
                            '--tier-wash': `${GLITCH}33`,
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <div className="sdc-rings">
                            <span className="sdc-ring" />
                            <span className="sdc-ring is-outer" />
                        </div>
                        <div className="sdc-frame">
                            <span className="sdc-pip" />
                        </div>
                        <div className="sdc-line" />
                        <div className="sdc-line is-short" />
                        <div className="sdc-rule" />
                        <span className="sdc-holo" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SurrealDiamondDeck

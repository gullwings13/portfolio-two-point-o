import React, { useEffect, useState } from 'react'

/**
 * A raw <img> for project art that has to bypass gatsby-plugin-sharp -- sharp
 * flattens animation to a single frame, so anything moving is served straight
 * out of /static instead.
 *
 * An animated WebP cannot honour prefers-reduced-motion on its own, so when the
 * viewer asks for reduced motion we swap in a still frame.
 */
const ProjectMedia = ({ src, still, alt, className }) =>
{
    const [reduced, setReduced] = useState(false)

    useEffect(() =>
    {
        if (!still || typeof window === 'undefined' || !window.matchMedia) return undefined

        const query = window.matchMedia('(prefers-reduced-motion: reduce)')
        const apply = () => setReduced(query.matches)
        apply()

        // Safari below 14 only ships the deprecated listener API.
        if (query.addEventListener) {
            query.addEventListener('change', apply)
            return () => query.removeEventListener('change', apply)
        }
        query.addListener(apply)
        return () => query.removeListener(apply)
    }, [still])

    return (
        <img
            className={className}
            src={reduced && still ? still : src}
            alt={alt}
            loading="lazy"
        />
    )
}

export default ProjectMedia

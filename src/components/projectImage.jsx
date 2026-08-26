import safeGet from 'lodash.get'
import React, { useMemo } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Img from 'gatsby-image/withIEPolyfill';

const Image = ({ src, objectPosition, alt, className, ...props }) =>
{
  const data = useStaticQuery(graphql`
    query {
      allFile( filter: { internal: { mediaType: { regex: "/image/" } } } ) {
        nodes {
          relativePath
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  `)

  const match = useMemo(() => (
    data.allFile.nodes.find(({ relativePath }) => src === relativePath)
  ), [data, src])

  const fluid = safeGet(match, 'childImageSharp.fluid')

  // A miss used to render null, which left the card's pink backing showing with no clue
  // why -- that was the whole pink-tile bug. Say so instead of vanishing.
  if (!fluid) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`projectImage: no processed image for "${src}" -- is it in src/images?`)
    }
    return (
      <div
        className={className}
        role="img"
        aria-label={alt}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 0.5rem',
          background: '#2d3748',
          textAlign: 'center',
        }}
      >
        <span style={{ color: '#e2e8f0', fontSize: '0.75rem', lineHeight: 1.3 }}>{alt}</span>
      </div>
    )
  }

  return (
    <Img
      objectPosition={objectPosition}
      fluid={fluid}
      alt={alt}
      className={className}
      Tag='div'
      {...props}
    />
  )
}

export default Image

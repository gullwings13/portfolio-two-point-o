import safeGet from 'lodash.get'
import React, { useMemo } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Img from 'gatsby-image/withIEPolyfill';

const Image = ({ src, objectPosition, ...props }) =>
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

  return fluid ? (
    <Img
      objectPosition={objectPosition}
      fluid={fluid}
      Tag='div'
      {...props}
    />
  ) : null
}

export default Image
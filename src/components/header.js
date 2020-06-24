import { AnchorLink } from "gatsby-plugin-anchor-links"
import React from "react"
// import Tilt from 'react-parallax-tilt'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faVimeoSquare } from '@fortawesome/free-brands-svg-icons'
import video from "../media/Webshort.mp4"

const Header = () => (
  <React.Fragment>
    <div className="videoContainer">
      <video autoPlay muted loop playsInline className="demoReelVideo">
        <source src={video} type="video/mp4" />
      </video>
      {/* <Tilt className=" absolute right-0 top-0 md:bottom-0 md:top-auto">
        <a href="https://vimeo.com/369092145" className="link-pink">
          <span className="sr-only">Demo Reel</span>
          <FontAwesomeIcon className="text-4xl" icon={faVimeoSquare} /></a>
      </Tilt> */}
    </div>
    {/* <div className="videoContainer">
    </div> */}
    <header className="slide-in-from-top absolute top-0 flex justify-center w-full text-center mt-12 md:mt-24">
      <div>
        <h1>
          <div className="slide-in-from-top font-mono text-3xl sm:text-4xl md:text-6xl bg-gray-900 mt-1 md:py-4 md:pt-1" to="/">
            tReVoR sMith-&#x2060;holbouRN
          </div>
        </h1>
        <h2 className="slide-in-from-top mt-2">
          <span className="font-serif font-thin text-xl sm:text-2xl md:text-4xl mt-1 md:p-4 md:pt-1 bg-gray-900">Software Engineer & Gameplay Programmer</span>
        </h2>
      </div>

    </header>
    <nav className=" slide-in-from-top flex justify-between w-full fixed bg-gray-900 p-3 md:pt-1 bottom-0 md:top-0 md:bottom-auto z-10">
      <AnchorLink to="/#about" title="About" className="sm:w-1/3 sm:text-left">
        <span className="sm:text-2xl link-pink">About</span>
      </AnchorLink>
      <AnchorLink to="/#work" title="Projects" className="sm:w-1/3 sm:text-center">
        <span className="sm:text-2xl link-pink">Work</span>
      </AnchorLink>
      <AnchorLink to="/#contact" title="Contact" className="sm:w-1/3 sm:text-right">
        <span className="sm:text-2xl link-pink">contact</span>
      </AnchorLink>
    </nav>
  </React.Fragment>
)

export default Header

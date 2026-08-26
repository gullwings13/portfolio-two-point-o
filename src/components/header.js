import { AnchorLink } from "gatsby-plugin-anchor-links"
import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import video from "../media/Webshort.mp4"
import HeroCanvas from "./HeroCanvas"

const Header = () =>
{
  // The reel is 27MB. Importing it only yields a URL, so nothing transfers until the
  // <video> is actually rendered -- which is why it stays behind this flag rather than
  // being the toll every first visit pays.
  const [showReel, setShowReel] = useState(false)

  return (
    <React.Fragment>
      <div id="home" className="videoContainer">
        {showReel ? (
          <video autoPlay muted loop playsInline preload="none" className="demoReelVideo">
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <HeroCanvas className="heroCanvas" />
        )}

        <button
          type="button"
          className="reelToggle link-pink font-mono"
          onClick={() => setShowReel(shown => !shown)}
        >
          {showReel ? 'Close reel' : 'Demo reel'}
        </button>
      </div>

      <header className="pointer-events-none slide-in-from-top absolute top-0 flex justify-center w-full text-center mt-12 md:mt-24">
        <div>
          <h1 className="slide-in-from-top">
            <div>
              <span className="slide-in-from-top font-mono text-3xl sm:text-4xl md:text-6xl bg-white text-gray-900 p-1 mt-1 md:p-4 md:pt-1" to="/">
                tReV
              </span>
            </div>
            <div>
              <span className="slide-in-from-top font-mono text-3xl sm:text-4xl md:text-6xl bg-white text-black pt-1 mt-1 md:p-4 md:pt-1" to="/">
                holbouRN
              </span>
            </div>
          </h1>
          <h2 className="slide-in-from-top mt-2">
            <span className="font-serif font-thin text-xl sm:text-2xl md:text-4xl mt-1 md:p-4 md:pt-1 bg-gray-900">Software Engineer · Full-Stack &amp; Internal Tooling</span>
          </h2>
        </div>
      </header>

      <nav className=" z-50 slide-in-from-top flex justify-between w-full fixed bg-gray-900 p-3 md:pt-1 bottom-0 md:top-0 md:bottom-auto z-10">
        <AnchorLink to="/#home" title="About" className="sm:w-1/3 sm:text-left">
          <span className="sm:text-2xl link-pink"><FontAwesomeIcon icon={faHome} /></span>
        </AnchorLink>
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
}

export default Header

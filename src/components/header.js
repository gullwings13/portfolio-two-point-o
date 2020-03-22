import { Link } from "gatsby"
import { AnchorLink } from "gatsby-plugin-anchor-links"
import React from "react"
import video from "../media/Webshort.mp4"

const Header = () => (
  <React.Fragment>
    <div className="videoContainer">
      <video autoPlay muted loop playsInline className="demoReelVideo">
        <source src={video} type="video/mp4" />
      </video>
    </div>
    <header className="absolute top-0 flex justify-center w-full text-center md:mt-24">
      <div>
        <h1>
          <Link className="font-mono text-4xl sm:text-4xl md:text-6xl bg-gray-900 mt-1 md:p-4 md:pt-1" to="/">
            TREVOR SMITH-&#x2060;HOLBOURN
          </Link>
        </h1>
        <h2 >
          <span className=" font-serif font-thin text-xl sm:text-2xl md:text-4xl mt-1 md:p-4 md:pt-1 bg-gray-900">Software Engineer & Gameplay Programmer</span>
        </h2>
      </div>
    </header>
    <nav className="flex justify-between w-full fixed bg-gray-900 p-3 md:pt-1 bottom-0 md:top-0 md:bottom-auto">
      <AnchorLink to="/#about" title="About">
        <span className="font-mono text-xl">About</span>
      </AnchorLink>
      <AnchorLink to="/#projects" title="Projects">
        <span className="font-mono text-xl">Projects</span>
      </AnchorLink>
      <AnchorLink to="/#contact" title="Contact">
        <span className="font-mono text-xl">Contact</span>
      </AnchorLink>
    </nav>
  </React.Fragment>
)

export default Header

import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Contact from "../components/Contact"
import Projects from "../components/Projects"


const IndexPage = () => (
  <Layout>
    <SEO />
    <div id="about" className="my-6 p-4 text-lg sm:text-xl md:text-2xl text-center xs:w-3/4 md:w-2/3">
      <div className="my-2">
        <span className="font-mono text-xl sm:text-2xl md:text-3xl bg-white text-black p-1">About Me</span>
      </div>
      <p className="mt-4 text-justify ">
        <span className="font-bold">Hi!</span> I’m a caring and imaginative engineer with over 20 years of experience solving hard technical problems. After a decade designing and implementing high-reliability Cisco networks, I moved into customer-facing SaaS and full-stack development. I build scripts to bridge product gaps, web apps, and indie games (C#, Unity, DOTS), with a passion for clean code and collaborative design. Whether it's squashing obscure bugs, walking a customer through a tricky integration, or making something cool, I’m ready to contribute.
      </p>

    </div >

    <div id="work" className="my-10 p-4 text-lg sm:text-xl md:text-2xl text-center">
      <div className="my-2">
        <span className="font-mono text-xl sm:text-2xl md:text-3xl bg-white text-black p-1">My Work</span>
      </div>
      <Projects />
    </div>

    <div id="contact" className="my-6 p-4 text-lg sm:text-xl md:text-2xl text-center w-3/4 md:w-1/2">
      <div className="my-2">
        <span className="font-mono text-xl sm:text-2xl md:text-3xl bg-white text-black p-1">contact Me</span>
      </div>
      <Contact />
    </div>
  </Layout >
)

export default IndexPage

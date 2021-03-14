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
        <span className="font-bold">Hi!</span> I’m an empathic and imaginative software engineer with over 20 years working in technology. Having previously designed and implemented reliable, fast and secure Cisco networks, I am now building full stack web applications and neat games in JS/React/Node/Ruby on Rails/Firebase and C#/Unity. Grab my resume or get in contact with me at the bottom of this page, I'd love to help you build your next cool thing.
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

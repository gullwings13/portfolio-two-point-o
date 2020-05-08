import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Contact from "../components/Contact"
import Projects from "../components/Projects"


const IndexPage = () => (
  <Layout>
    <SEO />
    <div id="about" className="my-6 p-4 text-lg sm:text-xl md:text-2xl text-center">
      <span className="font-mono text-xl sm:text-2xl md:3xl bg-white text-black p-1">About Me</span>
      <p className="mt-4 text-justify ">
        <span className="font-bold">Hi!</span> I’m an empathic and imaginative software engineer with over 20 years working in technology. Having previously designed and implemented reliable, fast and secure Cisco networks, I am now building complex full stack web applications and games in JS/React/Node and C#/Unity. Coding is my passion because I love problem-solving and creating useful things. I aspire to make a positive contribution in an inclusive and collaborative environment.
      </p>

    </div >

    <div id="work" className="my-6 p-4 text-lg sm:text-xl md:text-2xl text-center">
      <span className="font-mono text-xl sm:text-2xl md:3xl bg-white text-black p-1">My Work</span>
      <Projects />
    </div>

    <div id="contact" className="my-6 p-4 text-lg sm:text-xl md:text-2xl text-center">
      <span className="font-mono text-xl sm:text-2xl md:3xl bg-white text-black p-1">contact Me</span>
      <Contact />
    </div>
  </Layout >
)

export default IndexPage

import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Contact from "../components/Contact"
import Projects from "../components/Projects"


const IndexPage = () => (
  <Layout>
    <SEO />
    <div id="about" className="my-6 p-4 text-2xl text-justify">
      <span className="font-mono text-3xl bg-black">About Me</span>
      <p className="mt-4">
        <span className="font-bold">Hi!</span> I’m an empathic and imaginative software engineer with over 20 years working in technology. Having previously designed and implemented reliable, fast and secure Cisco networks, I am now building complex full stack web applications and games in JS/React/Node and C#/Unity. Coding is my passion because I love problem-solving and creating useful things. I aspire to make a positive contribution in an inclusive and collaborative environment.
      </p>

    </div >

    <div id="projects" className="my-6 p-4 text-2xl">
      <span className="font-mono text-3xl bg-black">Work</span>
      <Projects />
    </div>

    <div id="contact" className="my-6 p-4 text-2xl">
      <span className="font-mono text-3xl bg-black">Contact</span>
      <Contact />
    </div>
  </Layout >
)

export default IndexPage

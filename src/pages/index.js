import React from "react"
// import { Link } from "gatsby"


import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import Contact from "../components/Contact"
import Projects from "../components/Projects"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div id="about" className="my-6 p-4 text-2xl">
      <h3 className="font-mono text-3xl">About Me</h3>
      <p className="mt-4"><span className="font-bold">Hi!</span> I’m an empathic and imaginative software engineer with over 20 years working in technology. Having previously designed and implemented reliable, fast and secure Cisco networks, I am now building complex full stack web applications and games in JS/React/Node and C#/Unity.</p>
      <p className="mt-4">
        Coding is my passion because I love problem-solving and creating useful things. I aspire to make a positive contribution in an inclusive and collaborative environment.</p>
      <p className="mt-4">
        Take a look at my demo reel here on Vimeo <a className="font-bold text-purple-600 hover:underline" href="https://vimeo.com/369092145">https://vimeo.com/369092145 <i className="fab fa-vimeo-square text-purple-600"></i></a> (the volume is a little loud, please adjust your volume lower before playing)</p>
    </div>

    <div id="projects" className="my-6 p-4 text-2xl">
      <h3 className="font-mono text-3xl">My Projects</h3>
      <Projects />
    </div>

    <div id="contact" className="my-6 p-4 text-2xl">
      <h3 className="font-mono text-3xl">Contact Me!</h3>
      <Contact />
    </div>
  </Layout>
)

export default IndexPage

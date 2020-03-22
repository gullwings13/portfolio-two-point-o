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
    <div id="about" className="my-6 p-4 text-2xl text-justify">
      <span className="font-mono text-3xl bg-black">About Me</span>
      <p className="mt-4"><span className="font-bold">Hi!</span> I’m an empathic and imaginative software engineer with over 20 years working in technology. Having previously designed and implemented reliable, fast and secure Cisco networks, I am now building complex full stack web applications and games in JS/React/Node and C#/Unity.</p>
      <p className="mt-4">
        Coding is my passion because I love problem-solving and creating useful things. I aspire to make a positive contribution in an inclusive and collaborative environment.</p>
      <p className="mt-4">
        Take a look at my demo reel here on <a className="link-pink" href="https://vimeo.com/369092145">Vimeo
        <i className="fab fa-vimeo-square"></i></a>,
      </p>
      <p>(the volume is a little loud, please adjust your volume lower before playing)</p>
      <p className="mt-4">You can also find me on:</p>
      <p>
        <a className="link-pink" href="https://github.com/gullwings13/">Github<i className="fab fa-github-square"></i></a>
      </p>
      <p>
        <a className="link-pink" href="https://www.linkedin.com/in/trevor-smith-holbourn/">Linkedin<i className="fab fa-linkedin"></i></a>
      </p>
      <p>And grab my resume  <a className="link-pink" href="https://trevorsmithholbourn.xyz/resume.pdf">here<i className="far fa-file-pdf"></i></a></p>
    </div>





    <div id="projects" className="my-6 p-4 text-2xl">
      <span className="font-mono text-3xl bg-black">My Projects</span>
      <Projects />
    </div>

    <div id="contact" className="my-6 p-4 text-2xl">
      <span className="font-mono text-3xl bg-black">Contact Me!</span>
      <Contact />
    </div>
  </Layout>
)

export default IndexPage

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
        I’m a software engineer who came up through enterprise networking and moved into full-stack development. At HackerRank I build CLI and Google Sheets tooling in JavaScript, Apps Script and Ruby that made solution delivery several times faster, and I’m the technical point of contact for Fortune 500 accounts including Google, Uber and JPMC. Outside work I ship my own things end to end. Gro.lol went from empty repo to a live Rails and React product in about a week, and Surreal Diamond runs a Hono API instrumented with Sentry, PostHog and an admin dashboard. I like the problems where the fix is buried somewhere unglamorous, and I like shipping the result.
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

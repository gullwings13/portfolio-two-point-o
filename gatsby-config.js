module.exports = {
  siteMetadata: {
    title: `Trevor Smith-Holbourn | Portfolio`,
    description: `Software Engineer & Gameplay Programmer`,
    author: `Trevor Smith-Holbourn`,
    description: `I am seeking new opportunities. Please visit my portfolio to see past work, download my resume and get in touch.`,
    siteUrl: `https://trevorsmithholbourn.xyz`,
    image: "portfolio.png",
    social: {
      twitter: `gullwings13`,
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -30
      }
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Trevor Smith-Holbourn Portfolio`,
        short_name: `portfolio`,
        start_url: "/",
        background_color: "#000000",
        theme_color: "#000000",
        display: "standalone",
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // gatsby-plugin-offline was REMOVED deliberately -- do not add it back.
    // Its service worker served /page-data/sq/d/<queryhash>.json StaleWhileRevalidate,
    // and that filename hashes the QUERY TEXT, not the results -- so the URL is stable
    // across builds while its contents change every deploy. A returning visitor got the
    // new content-hashed JS bundle (new projectlist) paired with the PREVIOUS build's
    // image manifest, so any newly added image found no node, projectImage returned
    // null, and the card showed its bare pink backing. gatsby-browser.js unregisters
    // the workers that are still installed out there.
  ],
}

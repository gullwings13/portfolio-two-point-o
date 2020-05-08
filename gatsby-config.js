module.exports = {
  siteMetadata: {
    title: `Portfolio | Trevor Smith-Holbourn`,
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}

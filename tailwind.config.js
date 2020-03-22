const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: ['Roboto Slab', ...defaultTheme.fontFamily.serif],
        mono: ["Major Mono Display", ...defaultTheme.fontFamily.mono],
      }
    },
  },
  variants: {},
  plugins: [],
}

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
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    textDecoration: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },
  plugins: [],
}

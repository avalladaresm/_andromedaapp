const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      blueGray: colors.blueGray,
      coolGray: colors.coolGray,
      gray: colors.gray,
      trueGray: colors.trueGray,
      warmGray: colors.warmGray,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      lightBlue: colors.lightBlue,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
      white: colors.white,
      black: colors.black
    },
    extend: {
      maxWidth: {
        'xxs': '10rem',
      },
      minWidth: {
        'xxs': '10rem',
      },
      maxHeight: {
        'xxs': '10rem',
      },
      minHeight: {
        'xxs': '10rem',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      boxShadow: ['active'],
      cursor: ['hover', 'focus']
    },
  },
  plugins: [],
  corePlugins: {
    outline: false,
  }
}

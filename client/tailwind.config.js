module.exports = {
  purge: ['./src/**/*.{js,jsx}', './public/index.html'],
  darkMode: false,
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        dark: '#2f3640',
        tomato: '#e55039',
        greenish: '#2ed573',
        darkBlue: '#0a3d62',
        trash: '#ff0000',
        ashGray: '#576574',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

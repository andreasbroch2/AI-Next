/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        success: '#0070f3',
        primary: "#e76e42",
        secondary: "#5E17EB",
        lightprimary: "#FFECE6",
        light: "#DFD6F0"
      },
      spacing: {
        28: '7rem',
        content: '1280px',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        'extra-tight': '1.15',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      fontFamily: {
        primary: ['var(--font-poppins)'],
        secondary: ['var(--font-poppins)'],
    },
    },
  },
  plugins: [],
}

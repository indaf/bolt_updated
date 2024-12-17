/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'bebas': ['"Bebas Neue"', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#fff',
            h1: {
              color: '#fff',
              fontFamily: '"Bebas Neue", sans-serif',
              letterSpacing: '0.05em',
            },
            h2: {
              color: '#fff',
              fontFamily: '"Bebas Neue", sans-serif',
              letterSpacing: '0.05em',
            },
            h3: {
              color: '#fff',
              fontFamily: '"Bebas Neue", sans-serif',
              letterSpacing: '0.05em',
            },
            h4: {
              color: '#fff',
              fontFamily: '"Bebas Neue", sans-serif',
              letterSpacing: '0.05em',
            },
            strong: {
              color: '#fff',
            },
            a: {
              color: '#009B70',
              '&:hover': {
                color: '#007B56',
              },
            },
            code: {
              color: '#fff',
              backgroundColor: '#2A2B32',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            blockquote: {
              color: '#9CA3AF',
              borderLeftColor: '#4B5563',
            },
            ul: {
              listStyleType: 'disc',
              paddingLeft: '1.5em',
            },
            ol: {
              listStyleType: 'decimal',
              paddingLeft: '1.5em',
            },
            'ul > li': {
              position: 'relative',
              paddingLeft: '0.5em',
            },
            'ol > li': {
              position: 'relative',
              paddingLeft: '0.5em',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
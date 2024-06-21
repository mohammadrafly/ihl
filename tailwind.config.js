/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.jsx",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      animation: {
        'slide-left-to-right': 'leftToRight 1s ease-in-out',
        'slide-right-to-left': 'rightToLeft 1s ease-in-out',
        'slide-bottom-to-top': 'bottomToTop 1s ease-in-out',
        'slide-top-to-bottom': 'topToBottom 1s ease-in-out',
      },
      keyframes: {
        leftToRight: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
        rightToLeft: {
          '0%': {
            transform: 'translateX(200%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
        bottomToTop: {
          '0%': {
            transform: 'translateY(200%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        topToBottom: {
          '0%': {
            transform: 'translateY(-200%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        }
      },
    },
  },
  plugins: [],
}

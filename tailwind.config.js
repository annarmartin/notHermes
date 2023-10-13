/** @type {import('tailwindcss').Config} */
module.exports = {  
  content: [  
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    "./node_modules/flowbite/**/*.js"
  ],  
  theme: {         
    extend: {
      scale: {
        '102': '1.02',
      },
      fontSize: {
        'xxl': '10rem',
      },
      colors: {
        'cream': '#FEFCF7',
      }
    },
  },
  plugins: [],
}


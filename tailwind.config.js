import daisyui from "daisyui";


/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mozilaText: ["Mozilla Text", "sans-serif"], 
        eduNsw: ["Edu NSW ACT Cursive", "cursive"],// Custom font name
      },
      colors:{
        bgGradient1:'#f3dfc1',
        bgGradient2:'	#e0c9a6',
        bgGradinet3:'#e0c9a6',
        textColor:'	#1a1c1a',
        buttonBg:'#1a1c1a',
        textWhite:'#fff'

      }
    },
   },
  plugins: [daisyui],
  daisyui: {

    themes:false,
  },
   darkMode: "class",
}



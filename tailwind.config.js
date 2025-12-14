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
        bg1:'#0d0d0d',
        bg2:'#f2f2f0',
        bg3:'#5b6e74',
        bg4:'	#819fa7',
        bg5:'#f3f5f9',
        btnBg:'#F1C40F'
        

      }
    },
   },
  plugins: [daisyui],
  daisyui: {

    themes:false,
  },
   darkMode: "class",
}



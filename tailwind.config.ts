import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: 'class',
  
  daisyui: {
    themes: [
        {
        mytheme: {
          "primary": "#254e58",
          "secondary": "#379683",
          "accent": "#6e6658",
          "neutral": "#88bdbc",
          "base-100": "#112d32",
        },
        bluefresh: {
          "primary": "#2e9cca",
          "secondary": "#464866",
          "accent": "#aaabbb",
          "neutral": "#29648a",
          "base-100": "#25274d",
        },
        futurisk: {
          "primary": "#7d7d7d",
          "secondary": "#474646",
          "accent": "#374151",
          "neutral": "#c2c0c0",
          "base-100": "rgb(51, 51, 51)",
        },
        darkmode: {
          "primary": "#616161",
          "secondary": "#474646",
          "accent": "rgb(51, 51, 51)",
          "neutral": "#adadad",
          "base-100": "#292929",
        },
        lightmode: {
          "primary": "#e3e3e3",
          "secondary": "#adadad",
          "accent": "#c2c0c0",
          "neutral": "#1b3c5c",
          "base-100": "#fff",
        },
        // futurisk: {
        //   "primary": "#7d7d7d",
        //   "secondary": "#474646",
        //   "accent": "#464d47",
        //   "neutral": "#c2c0c0",
        //   "base-100": "rgb(51, 51, 51)",
        // },
      },
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ],
  },

  content: ["./src/**/*.tsx",  "./src/**/*.{js,jsx,ts,tsx}",
  "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  
  plugins: [require("daisyui")],

  
  
} satisfies Config;




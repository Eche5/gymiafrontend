/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      small: "310px",
      iphone: "360px",
      phone: "390px",
      mobile: "768px",
      macBook: "800px",
      desktop: "1280px",
      laptop: "1536px",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};

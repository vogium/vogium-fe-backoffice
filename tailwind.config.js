/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F3F4F6",
        brand: "#7F3D5B",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".filter-brand": {
          filter:
            "invert(27%) sepia(21%) saturate(1317%) hue-rotate(281deg) brightness(99%) contrast(89%);",
        },
        ".filter-green": {
          filter:
            " invert(70%) sepia(34%) saturate(4674%) hue-rotate(90deg) brightness(101%) contrast(92%);",
        },
        ".filter-red": {
          filter:
            "invert(20%) sepia(94%) saturate(7496%) hue-rotate(1deg) brightness(95%) contrast(115%);",
        },
      });
    },
  ],
  safelist: [
    {
      pattern: /col-span-(1|2|3|4|5|6|7|8|9|10|11|12)/,
    },
  ],
};

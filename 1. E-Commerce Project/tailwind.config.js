export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      width: {
        128: "32rem", // 512px
        144: "36rem", // 576px
        160: "40rem", // 640px
        192: "48rem", // 768px
        256: "64rem", // 1024px
      },
      boxShadow: {
        "custom-red": "0 5px 15px rgba(255, 100, 102, 0.5)", // Custom shadow value
      },
      borderRadius: {
        "extra-lg": "50px",
        "super-xl": "100px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

module.exports = {
  mode: "jit",
  content: ["./src/*.{html,js}"],
  theme: {
    extend: {},
  },
  variant: {},
  plugins: [require("@tailwindcss/forms")],
};

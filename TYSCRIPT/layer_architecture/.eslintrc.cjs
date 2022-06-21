module.exports = {
  root: true,
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  extends: ["airbnb", "airbnb-typescript", "prettier"],
};

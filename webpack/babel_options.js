module.exports = {
  presets: [
    "stage-0",
    "es2015",
    "react"
  ],
  plugins: [
    "transform-runtime",
    "transform-decorators-legacy",
    "babel-plugin-transform-class-properties",
    "universal-import"
  ],
  babelrc: false
};
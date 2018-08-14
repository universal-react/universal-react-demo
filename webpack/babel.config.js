const babelConfig = {
  presets: [
    ["@babel/env", {
      targets: {
        ie: "10",
        firefox: "60",
        chrome: "67",
        safari: "11.1"
      },
      useBuiltIns: "usage"
    }],
    "@babel/react"
  ],
  plugins: ["universal-import"]
};

module.exports = babelConfig;
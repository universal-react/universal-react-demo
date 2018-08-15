const babelConfig = {
  presets: [
    ["@babel/env", {
      targets: {
        browsers: [
          "android > 4",
          "last 2 versions",
          "ios 9"
        ]
      },
      useBuiltIns: "usage",
      debug: true,
    }],
    "@babel/react"
  ],
  plugins: ["universal-import", "@babel/plugin-syntax-dynamic-import"],
  babelrc: false,

};

module.exports = babelConfig;
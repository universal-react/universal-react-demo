require('babel-register')({
  extensions: [".jsx", ".js", ".ts", ".tsx"],
  plugins: [
    "universal-import"
  ],
  babelrc: false,
});

const serve = require('./server').default;

serve.listen(8080, () => {
  // tslint:disable no-console
  console.log(`server start on http://localhost:${8080}`);
});

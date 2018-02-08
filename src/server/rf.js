const rimraf = require('rimraf');
const path = require('path');

console.log(path.resolve('dist'), process.cwd())

const distPath = path.join(__dirname, '../../dist');
console.log(distPath)
rimraf.sync(`${distPath}/*`);
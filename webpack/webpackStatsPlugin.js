const fs = require('fs');
const path = require('path');

function WebpackGenerateManifestPlugin(options) {
  this.options = options;
}

WebpackGenerateManifestPlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', stats => {
    const statsJson = stats.toJson();
    const statsStr = JSON.stringify({ statsJson });

    fs.writeFile(path.join(stats.compilation.outputOptions.path, 'webpack-stats.json'), statsStr, (err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
    });
  });
}

module.exports = WebpackGenerateManifestPlugin;
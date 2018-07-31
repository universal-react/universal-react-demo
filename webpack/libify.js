/**
 * @summary generate .${extensition}.js file for static files (like svg, png, html, etc.)
 * @author mrkou47
 *
 * Created at     : 2018-07-30 15:54:02 
 * Last modified  : 2018-07-30 15:56:39
 */

/* eslint-disable no-console, consistent-return */
const fs = require('fs');
const path = require('path');
const jsTokens = require('js-tokens').default;
const { getOptions } = require('loader-utils');

const mkdirp = require('mkdirp');

const genContent = (resourcePath, content, replacedPath) => {
  const ext = path.extname(resourcePath);

  if (ext === '.css') {
    return content.replace('exports.locals', 'module.exports');
  }

  if (content.indexOf('__webpack_public_path__') !== -1) {
    jsTokens.lastIndex = 0;
    const parts = content.match(jsTokens);
    content = parts.map((val) => {
      if (val === '__webpack_public_path__') return JSON.stringify(replacedPath);
      return val;
    }).join('');
  }
  return content;
}

module.exports = function libify(code) {
  this.cacheable();
  const callback = this.async();
  const options = getOptions(this);
  const { replace, publicPath } = options;
  const { resourcePath } = this;
  const isCss = path.extname(resourcePath) === '.css';

  let content = code;
  let replacedPath;
  let outputPath = resourcePath;

  if (!callback) {
    if (resourcePath.split(path.sep).indexOf('node_modules') !== -1) {
      return code;
    }

    mkdirp.sync(path.dirname(outputPath));
    fs.writeFileSync(outputPath, genContent(resourcePath, content, replacedPath));
    return isCss ? code : content;
  }

  if (resourcePath.split(path.sep).indexOf('node_modules') !== -1) {
    process.nextTick(() => callback(null, content));
    return code;
  }

  if (replace) {
    if (typeof replace === 'function') {
      outputPath = replace(resourcePath);
    } else {
      outputPath = replace;
    }
  }

  outputPath = outputPath.indexOf('.js') < 0 ? `${outputPath}.js` : outputPath;

  try {
    replacedPath = publicPath || this.options.output.publicPath;
  } catch (e) {
    return callback(e);
  }

  // replace __webpack_public_path__
  content = genContent(resourcePath, content, replacedPath);

  // write code to outputPath
  mkdirp(path.dirname(outputPath), (err) => {
    if (err) return callback(err);
    fs.writeFile(outputPath, content, fserr => {
      callback(fserr, isCss ? code : content);
    });
  });

};

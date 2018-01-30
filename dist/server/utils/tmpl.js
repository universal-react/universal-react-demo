'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function tmpl() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { title: '', header: '', content: '', initialState: {} };

  return '<!DOCTYPE html>\n      <html lang="en">\n      <head>\n        <meta charset="UTF-8">\n        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n        <meta http-equiv="X-UA-Compatible" content="ie=edge">\n        <title>' + options.title + '</title>\n        ' + options.header + '\n        <script>window.initialState = ' + JSON.stringify(options.initialState) + '</script>  \n        </head>\n        <body>\n        <div id="app">' + options.content + '</div>\n        <script src="/statics/bundle.js"></script>\n      </body>\n    </html>';
}

exports.tmpl = tmpl;
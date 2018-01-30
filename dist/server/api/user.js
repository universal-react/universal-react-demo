'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function userList(req, res) {
  if (req.url !== '/user/list') {
    res.writeHead(502);
    res.end();
    return false;
  } else {
    var body = '';
    req.on('data', function (data) {
      return body += data;
    });
    req.on('end', function () {
      try {
        var obj = JSON.parse(body);
      } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ list: [{ name: 'bob' }, { name: 'John' }] }));
      }
    });
  }
}

exports.userList = userList;
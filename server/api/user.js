function userList(req, res) {
  if (req.url !== '/user/list') {
    res.writeHead(502);
    res.end();
    return false;
  } else {
    let body = '';
    req.on('data', data => body += data);
    req.on('end', () => {
      try {
        const obj = JSON.parse(body);
      } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ list: [{  name: 'bob' }, { name: 'John' }] }))
      }
    });
  }
}

export { userList };

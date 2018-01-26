
import http from 'http';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import routers from '../src/routers';

const PORT = 8388;

const serve = http.createServer((req, res) => {
  const context = {};
  const content = renderToString(
    <StaticRouter location={req.url} context={context}>
      {renderRoutes(routers)}
    </StaticRouter>
  );
  res.end(content);
});

serve.listen(PORT, () => {
  console.log(`server start on port ${PORT}`);
});

export default serve;
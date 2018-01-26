# React SSR step-by-step

一步一步来实现 react 的服务端渲染。

## 预期结果

实现react在服务端的渲染，同时支持额外拓展，包括 react-router，redux，css-module，react-addons-*。

## First Step

在实现服务端渲染之前，我们需要先实现一个最简单的react组件的展示过程。

这一步包含了最基本的react组件的显示，同时使用webpack-dev-server做服务器。

```js
//container.jsx
import React, { Component } from 'react';

export class Hello extends Component {
  render() {
    return (
      <div>
        Hello world
      </div>
    )
  }
}

export default Hello;
```

```js
// render.js
import ReactDOM from 'react-dom';
import React from 'react';

import Home from './container/home/container';

ReactDOM.render(<Home />, document.getElementById('app'));
```

```js
//webpack.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
  entry: path.resolve(__dirname, '../src/render.js'),
  output: {
    path: path.resolve(__dirname, '../statics'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js','.jsx']
  },
  module: {
    rules: [{
      test: /jsx?/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react'],
          plugins: [['transform-runtime']]
        }
      },
      exclude: /node_modules/,
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, './tmpl.html'),
      inject: true,
    })
  ],
  devServer: {
    port: 8388,
  }
};

module.exports = config;
```

> webpack-dev-server --config webpack/webpack.config.js --port 8388 --inline

# Step 2 - Simpe server side render

服务端渲染，实际上就是让 react 在服务端将我们使用es6语法写的组件渲染为字符串的一个过程。在这个过程中，我们首先需要实现在服务端使用 es6 的语法。

我们可以使用 `babel-node` 来实现在服务端使用es6 module system。我们使用 visual studio code 来进行调试：

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch via Babel",
      "program": "${workspaceRoot}/server/server.js",
      "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/babel-node",
      "cwd": "${workspaceRoot}"
    }
  ]
}
```

然后我们再实现一个最简单的ssr。我们可以使用 `react-dom/server` 提供的 `renderToString` 方法，将我们使用 *es6* 语法编写的react组件翻译为字符串。

```js
import http from 'http';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Home from '../src/container/home/index.js';

const PORT = 8388;

const serve = http.createServer((req, res) => {
  const dom = renderToString(<Home />);
  res.end(dom);
});

serve.listen(PORT, () => {
  console.log(`server start on port ${PORT}`);
});

export default serve;
```
执行脚本：
> node server/server.js

这就是一个服务端渲染的实现，但这还远远不够。我们还需要实现对路由和数据存储，数据请求的功能。

在此之前，我们还可以做一个小测试，测试一下到底是服务端渲染快还是客户端渲染快。我们可以使用 `window.performance.now()` 或者 `console.time()` 来做测试。为了统一标准，我们这里使用 `console.time`。我们在 *Hello* 组件里面渲染10000个div 来进行实验。

```js

export class Hello extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.time('mount');
  }

  componentDidMount(){
    console.timeEnd('mount');
  }

  render() {
    return (
      <div>
        Hello world
        {Object.keys(Array.from({ length: 10000 }))
          .map((i,index) => <div key={index}>{index}</div>)}
      </div>
    )
  }
}·
```

同样，我们把服务端代码也改一下：

```js
// server.js
...
const serve = http.createServer((req, res) => {
  console.time('mount');
  const dom = renderToString(<Home />);
  console.timeEnd('mount');
  res.end(dom);
});
...
```

分别使用 webpack-dev-server 和 `node server/server.js` 来运行我们的react代码，可以发现, 浏览器渲染大约需要 `mount: 303.55322265625ms`，而服务端掉用 `renderToString` 只需要 `mount: 172.4598450064659ms`，可见服务端渲染确实快了不少。

### Step 3 - Add react router

我们现在在我们的代码中加入 *react-router*。我们使用最新的 v4 版本。由于 v4 和 v2 版本差距非常大，这次顺便学习一下新的api。

我们设计一个最简单的路由结构:

>  - / -> <Root />
   - /home -> <Home />
   - /profile -> <Profile />

```js
// routes.js

import AppRoot from './container/root';
import Home from './container/home';
import Profile from './container/profile';

const routes = [
  {
    path: '/',
    exact: true,
    component: AppRoot
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/profile',
    component: Profile
  }
];

export default routes;
```

对于服务端代码，我们对于所有 `Content-Type: text/html` 的请求都由 `react-dom/server` 处理。实际上我们就是在 render `<Router>` 的时候，将用户当前的url传递给 `react-router`, 由它来加载并渲染不同的组件

```js
// server.js

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
```

# Step 4 - Add css

这一步，我们要处理一下css，实际上css我们也可以当作是普通文本处理。我们可以把所有样式都写在一个文件里。
function tmpl(options = { title: '', header: '', content: '', initialState: {}, initialCss: {} }) {
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${options.title}</title>
        <script>
          window.initialState = ${JSON.stringify(options.initialState)};
          window.initialCss = ${JSON.stringify(options.initialCss)};
        </script>
        </head>
        <body>
        <div id="app">${options.content}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>`;
}

export { tmpl };
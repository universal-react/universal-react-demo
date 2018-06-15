const puppeteer = require('puppeteer');

function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();      
    }, time);
  })
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 300,
  });
  const page = await browser.newPage();

  await page.setViewport( { width: 1280, height: 800} );
  await page.goto('http://www.baidu.com');

  await page.waitFor(3000);

  await page.screenshot({
    path: 'page.png',
  });
  await browser.close();
})();


const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 393, height: 852, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/me', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: '../joya-me-preview.png' });
  await browser.close();
})();

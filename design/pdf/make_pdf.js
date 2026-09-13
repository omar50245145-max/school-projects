const { chromium } = require('/tmp/node_modules/playwright-core');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const filePath = 'file://' + path.resolve(__dirname, 'covers.html');
  await page.goto(filePath, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.pdf({
    path: path.resolve(__dirname, 'سجلات-القسم.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' },
    preferCSSPageSize: true,
  });
  console.log('errors:', errors);
  await browser.close();
})();

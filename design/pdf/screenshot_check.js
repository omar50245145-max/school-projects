const { chromium } = require('/tmp/node_modules/playwright-core');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 900, height: 1200 } });
  const filePath = 'file://' + path.resolve(__dirname, 'covers.html');
  await page.goto(filePath, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const handles = await page.$$('body > div');
  console.log('page count found:', handles.length);
  for (let i = 0; i < handles.length; i++) {
    await handles[i].screenshot({ path: `/tmp/cover-page-${i + 1}.png` });
  }
  await browser.close();
})();

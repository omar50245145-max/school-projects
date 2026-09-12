const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto('file://' + process.cwd() + '/title-card.html');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'title-card.png' });
  await page.goto('file://' + process.cwd() + '/outro-card.html');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'outro-card.png' });
  await page.goto('file://' + process.cwd() + '/caption1.html');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'caption1.png', omitBackground: true });
  await page.goto('file://' + process.cwd() + '/caption2.html');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'caption2.png', omitBackground: true });
  await browser.close();
})();

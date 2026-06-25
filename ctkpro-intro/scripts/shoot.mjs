// 截圖驗證腳本：開啟 index.html，逐頁截圖到 /tmp
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = 'file://' + path.resolve(__dirname, '..', 'index.html');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto(url);
await page.waitForTimeout(600);

for (let i = 1; i <= 7; i++) {
  await page.screenshot({ path: `/tmp/slide-${i}.png` });
  console.log(`shot slide ${i}`);
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(450);
}
await browser.close();
console.log('done');

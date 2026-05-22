/**
 * ZOXE 社群圖卡截圖腳本
 * 用法：node screenshot.mjs <html-path> <output-path>
 *
 * 輸入：本地 HTML 檔案路徑（已填入內容的完整 HTML）
 * 輸出：2x PNG（deviceScaleFactor: 2），實際像素 2160×2700
 */

import { chromium } from 'playwright';
import { resolve, dirname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const [,, htmlPath, outputPath] = process.argv;

if (!htmlPath || !outputPath) {
  console.error('用法：node screenshot.mjs <html-path> <output-path>');
  process.exit(1);
}

const resolvedHtml = resolve(htmlPath);
const resolvedOutput = resolve(outputPath);

if (!existsSync(resolvedHtml)) {
  console.error(`找不到 HTML 檔案：${resolvedHtml}`);
  process.exit(1);
}

// 確保輸出目錄存在
const outputDir = dirname(resolvedOutput);
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
  console.log(`已建立輸出目錄：${outputDir}`);
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 2,           // 2x → 2160×2700 PNG
  });

  const page = await context.newPage();

  // 載入本地 HTML
  await page.goto(`file://${resolvedHtml}`, { waitUntil: 'networkidle' });

  // 等待字體載入（Google Fonts）
  await page.waitForTimeout(1500);

  // 截圖
  await page.screenshot({
    path: resolvedOutput,
    type: 'png',
    clip: { x: 0, y: 0, width: 1080, height: 1350 },
  });

  await browser.close();

  console.log(`✅ 圖卡已輸出：${resolvedOutput}`);
  console.log(`   尺寸：2160×2700 px（@2x）`);
})();

// 產生簡報用插畫圖（重用 ctkpro_blog_posts 的 Gemini 呼叫邏輯）
// 風格：白底、輕插畫、柔和色彩，與白底高橋流簡報一致
//
// 用法：
//   node scripts/gen-images.mjs            # 產生全部尚未存在的圖
//   node scripts/gen-images.mjs --force    # 強制重產全部
//   node scripts/gen-images.mjs slide5-poc-prod   # 只產指定的圖
//
// API Key 來源：重用 /Users/alfred/ctkpro_blog_posts/.env 的 GEMINI_API_KEY

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import sharp from 'sharp';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(PROJECT_ROOT, 'images');

// 重用 blog_posts 的金鑰（不複製、不印出）
dotenv.config({ path: '/Users/alfred/ctkpro_blog_posts/.env' });

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('❌ 找不到 GEMINI_API_KEY（預期在 /Users/alfred/ctkpro_blog_posts/.env）');
  process.exit(1);
}
const MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-3-pro-image-preview';

// 統一風格約束：參考 CTK Pro 官網 Hero Image
// = 藍墨手繪塗鴉 + 溫暖米色紙張 + 木質桌面 + 柔和暖光，直式 Portrait 構圖
const STYLE = [
  'Hand-drawn illustration style: blue ballpoint-pen and pencil sketch doodles',
  'drawn on a sheet of warm cream/beige worksheet paper lying on a wooden desk.',
  'Soft warm natural window light, gentle shadows, subtle paper texture.',
  'Line-art icons and figures sketched in blue ink with light shading;',
  'palette limited to blue ink + warm paper/wood tones (cream, beige, light brown).',
  'A real pencil resting beside the paper for a tactile, editorial, professional feel.',
  'Top-down / slightly angled flat-lay view.',
  'VERTICAL PORTRAIT composition, clearly taller than wide.',
  'Calm, warm, trustworthy mood. Absolutely NO readable text, NO words, NO letters, NO captions.',
].join(' ');

// 要產生的圖：檔名 → prompt（直式構圖，流程改為由上而下）
const IMAGES = {
  // 第 2 章：痛點 — demo 卡在本機，跨不過上線的斷層（垂直：下=本機，上=雲端）
  'slide2-gap':
    `A vertical concept sketch about the gap between building and shipping software. ` +
    `At the BOTTOM, a small laptop showing a tiny prototype app (a demo stuck on a local machine). ` +
    `In the MIDDLE, a broken bridge or a cliff gap, symbolizing how hard it is to go live. ` +
    `At the TOP, a cloud server with a small shield (the real production environment, out of reach). ` +
    `An upward arrow that does not quite connect. Convey "easy to build a demo, hard to actually ship it". ${STYLE}`,

  // 第 5 章：POC → Production 流程（垂直三階段，由上而下，向下箭頭）
  'slide5-poc-prod':
    `A clean VERTICAL three-step flow, stacked top to bottom with downward arrows between steps. ` +
    `TOP step: a small lightbulb / rough prototype sketch (POC, an idea or experiment). ` +
    `MIDDLE step: a blueprint with a gear and a checklist (planning and architecture). ` +
    `BOTTOM step: a cloud server with a security shield (Production, launched and secured). ` +
    `Three distinct simple sketched icons connected vertically by downward arrows, evenly spaced. ${STYLE}`,

  // 第 6 章：理想引薦對象 — 有 idea 卻卡在上線的企業主
  'slide6-referral':
    `A friendly portrait sketch of a small-business owner with a great idea. ` +
    `A person at a desk with a lightbulb thought bubble above their head, hopeful but a bit stuck. ` +
    `Around them, small sketched icons hint at: a government grant document with a stamp, an AI spark, ` +
    `and a rocket/launch symbol — representing wanting to apply for a grant and go live. ${STYLE}`,
};

function buildModel(genAI) {
  return genAI.getGenerativeModel({ model: MODEL });
}

async function generateOne(genAI, name, prompt) {
  const enhanced =
    `IMPORTANT: If this image contains any Chinese text, it MUST be in Traditional Chinese (繁體中文), ` +
    `NOT Simplified Chinese. But ideally this image should contain NO text at all.\n\n${prompt}`;

  const model = buildModel(genAI);

  // 對暫時性錯誤 (503/429) 做指數退避重試
  const maxRetries = 3;
  let result;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      result = await model.generateContent(enhanced);
      break;
    } catch (err) {
      const status = err.status || err.httpCode;
      if ((status === 503 || status === 429) && attempt < maxRetries) {
        const delay = attempt * 15000;
        console.warn(`  ⚠️  API 暫時無法使用 (${status})，${delay / 1000}s 後重試 (${attempt}/${maxRetries})`);
        await new Promise((r) => setTimeout(r, delay));
      } else {
        throw err;
      }
    }
  }

  const response = await result.response;
  if (!response.candidates || response.candidates.length === 0) {
    throw new Error('回應中沒有 candidates');
  }

  const parts = response.candidates[0].content.parts;
  let imageData = null;
  for (const part of parts) {
    if (part.inlineData) {
      imageData = part.inlineData.data;
      break;
    } else if (part.text) {
      console.log(`  ℹ️  AI 文字回應：${part.text.slice(0, 120)}`);
    }
  }
  if (!imageData) {
    throw new Error('回應中找不到圖片資料');
  }

  const rawBuffer = Buffer.from(imageData, 'base64');

  // 用 Sharp 統一成直式 4:5 PNG；letterbox 補成暖色紙張色，與插畫風融合
  const PAPER = '#f3ead8';
  const outPath = path.join(IMAGES_DIR, `${name}.png`);
  await sharp(rawBuffer)
    .resize(1080, 1350, { fit: 'contain', background: PAPER })
    .flatten({ background: PAPER })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(outPath);

  const { size } = await fs.stat(outPath);
  console.log(`  ✅ ${name}.png （${(size / 1024).toFixed(0)} KB）`);
  return outPath;
}

async function main() {
  await fs.mkdir(IMAGES_DIR, { recursive: true });

  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const onlyNames = args.filter((a) => !a.startsWith('--'));

  const targets = Object.entries(IMAGES).filter(([name]) =>
    onlyNames.length === 0 ? true : onlyNames.includes(name)
  );

  if (targets.length === 0) {
    console.error(`找不到指定的圖名。可用：${Object.keys(IMAGES).join(', ')}`);
    process.exit(1);
  }

  console.log(`🎨 使用模型：${MODEL}`);
  console.log(`📁 輸出目錄：${IMAGES_DIR}\n`);

  const genAI = new GoogleGenerativeAI(API_KEY);

  for (const [name, prompt] of targets) {
    const outPath = path.join(IMAGES_DIR, `${name}.png`);
    if (!force) {
      try {
        await fs.access(outPath);
        console.log(`⏭️  ${name}.png 已存在，略過（用 --force 重產）`);
        continue;
      } catch {
        // 不存在 → 產生
      }
    }
    console.log(`⏳ 產生 ${name} …`);
    try {
      await generateOne(genAI, name, prompt);
    } catch (err) {
      console.error(`  ❌ ${name} 產生失敗：${err.message}`);
    }
  }

  console.log('\n完成。');
}

main().catch((err) => {
  console.error('腳本錯誤：', err);
  process.exit(1);
});

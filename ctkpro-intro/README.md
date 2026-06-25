# BNI 分享會簡報：AI x 創新與政府補助（CTK Pro）

一份 8 分鐘、7 張的 HTML 簡報，白底高橋流（Takahashi-style）風格，左右鍵翻頁，可直接推上 GitHub Pages。

## 直接播放

用瀏覽器開啟 `index.html` 即可。

操作方式：

| 動作 | 按鍵 / 手勢 |
|------|------------|
| 下一頁 | `→`、`↓`、空白鍵、`PageDown`、點畫面右半、向左滑 |
| 上一頁 | `←`、`↑`、`PageUp`、點畫面左半、向右滑 |
| 第一頁 / 最後一頁 | `Home` / `End` |

右下角顯示頁碼，底部有進度條。

## 投影片內容（7 張）

1. 封面 — AI x 創新與政府補助（BNI 新竹B區 + CTK Pro Logo）
2. 痛點 — 「做得出來」≠「上得了線」
3. CTK Pro 是誰 — ① 界定 Prototype 範圍 ② 真正上線到 Production（ISO 27001）
4. 真實案例 — 西北影像 LINE 報價機器人
5. 流程 — POC → Production
6. Referral Ask — 請把這種人介紹給我
7. 結尾 — CTK Pro｜Alfred Kang｜https://ctkpro.com

## 部署到 GitHub Pages

1. 建立 GitHub repo 並把整個專案推上去（`index.html` 在根目錄）。
2. 進 repo → **Settings** → **Pages**。
3. **Source** 選 **Deploy from a branch**，分支選 `main`、資料夾選 `/ (root)`，按 Save。
4. 等一兩分鐘，用顯示的網址即可播放（例：`https://<帳號>.github.io/<repo>/`）。

> `images/` 內含 Logo、3 張產生的插圖與西北影像截圖，會一併部署，無需額外設定。

## 重新產生插圖（選用）

插圖已產好放在 `images/`，平常不需要重跑。若要重產：

```bash
npm install                       # 安裝 @google/generative-ai、sharp、dotenv
npm run gen-images                # 只產尚未存在的圖
node scripts/gen-images.mjs --force          # 強制全部重產
node scripts/gen-images.mjs slide5-poc-prod  # 只產指定的圖
```

- 風格：藍墨手繪 × 暖色紙張桌面（參考官網 Hero Image），直式 4:5。
- 模型：Google Gemini（`gemini-3-pro-image-preview`）。
- API Key：重用 `/Users/alfred/ctkpro_blog_posts/.env` 的 `GEMINI_API_KEY`（不會印出、不入 git）。

## 檔案結構

```
.
├── index.html              # 簡報本體（內嵌 CSS / JS）
├── images/                 # Logo、插圖、截圖
├── scripts/
│   ├── gen-images.mjs      # 產圖腳本（Gemini）
│   └── shoot.mjs           # Playwright 截圖驗證（選用）
├── package.json
└── .gitignore
```

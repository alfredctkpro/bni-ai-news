# CLAUDE.md — BNI 分享投影片工作庫

> 給未來在這個 repo 工作的 Claude：先讀這份，再動手。

## 這個專案是什麼

`~/bni-ai-news` 是 **Alfred（CTK Pro）在 BNI 早餐會分享投影片的工作庫**。
產出全部是**純前端 HTML 投影片**，推上 **GitHub Pages**（repo: `alfredctkpro/bni-ai-news`），現場用網址放映。

**分工**：
- **素材來源**：`~/thinkr`（思考引擎）— 每週 AI 新聞/趨勢的 digest、大綱、金句、配圖清單在那邊擬定。
- **這個 repo**：只負責**把素材做成投影片**並發佈。不在這裡做研究或寫 digest。

每場分享的素材（大綱、配圖清單、原始 digest）會先被放進對應的**日期資料夾**，再依素材做成 `index.html` 投影片。

## 檔案結構

```
bni-ai-news/
├── index.html              # 根目錄索引頁（目錄/入口頁，列出每場分享，可捲動卡片式）
├── CLAUDE.md               # 本檔
├── 2026-06-25/             # 一場分享 = 一個日期資料夾（格式 YYYY-MM-DD）
│   ├── index.html          #   ← 投影片本體（待製作）
│   ├── README.md           #   素材包說明
│   ├── 大綱與素材.md        #   逐頁骨架、話術、金句、素材清單（做投影片的主要依據）
│   ├── 配圖清單.md          #   每頁要準備的圖
│   ├── images/             #   該場的 logo / 插圖 / 截圖（待建）
│   └── 素材/digests-原始/   #   thinkr 本週原始 digest（追溯出處用）
└── ctkpro-intro/           # 公司介紹簡報，亦為【投影片風格標準】
    ├── index.html          #   7 頁高橋流簡報（風格基準，做新投影片時對齊它）
    ├── images/             #   logo、插圖、截圖
    ├── scripts/
    │   ├── gen-images.mjs  #   Gemini 產插圖腳本
    │   └── shoot.mjs       #   Playwright 截圖驗證
    ├── package.json
    └── README.md
```

> `ctkpro-intro/` 由 `~/bni-0529-sharing`（獨立 repo）複製而來，**原資料夾保留**。複製時排除了 `node_modules/` 與 `package-lock.json`（需要時 `npm install` 重建）。

## 🎨 投影片風格標準（最重要 — 所有投影片都要對齊）

**基準檔案：`ctkpro-intro/index.html`**。新做任何一場投影片，**直接複製它當骨架**再改內容，不要從零寫。風格要件：

- **風格名**：白底「高橋流（Takahashi-style）」— 大字、極簡、一頁一個重點。
- **單檔自足**：CSS / JS 全內嵌在 `index.html`，無外部相依（除了 Google Fonts）。
- **設計 token（`:root` CSS 變數，務必沿用）**：
  - `--ink:#1a1a1a`（主文字）、`--muted:#6b6b6b`（次要）、`--line:#e2e2e2`（分隔線）
  - `--blue:#2f4fb0`（**藍墨強調色**，標題重點、序號、`.em` 都用它）
  - `--paper:#f3ead8`（暖紙底）、`--bg:#ffffff`
- **字體**：Noto Sans TC（900/700/500/400），fallback PingFang TC。
- **字級**：全用 `clamp()` 響應式；標題 `font-weight:900`，行高 1.1~1.2。
- **版型 class**：`.slide.center`（封面/純文字/結尾置中）、`.slide.split`（左文字 `.col-text` + 右圖 `.col-media`）。
- **元件**：`.kicker`(小標) / `h2.head`(主標，`.em` 上藍色) / `.lead`(說明) / `.points`(序號清單) / `.phone`(手機截圖框) / `.qr`(QR 區塊) / `.illus`(插圖)。
- **互動**：左右鍵 / 空白 / 點畫面左右半 / 觸控滑動翻頁；右下頁碼、底部進度條、左下操作提示（4 秒淡出）。JS 邏輯照搬即可。
- **響應式**：窄螢幕（`max-width:760px` 或直向）split 改上下堆疊。

> 新增一頁就加一個 `<section class="slide ...">`，頁碼 `total` 由 JS 自動算（`querySelectorAll('.slide')`），不需手改。

## 製作一場新投影片的標準流程

1. **讀素材**：該日期資料夾的 `大綱與素材.md`（逐頁骨架、話術、金句）＋ `配圖清單.md`。
2. **建骨架**：複製 `ctkpro-intro/index.html` 到該日期資料夾的 `index.html`，改 `<title>`、封面、各頁內容。
3. **配圖**：
   - 要去抓的（截圖/logo/官方圖）：放進該資料夾的 `images/`。
   - 要生成的插圖：用 `ctkpro-intro/scripts/gen-images.mjs`（Gemini，藍墨手繪×暖紙風）；API key 重用 `~/ctkpro_blog_posts/.env` 的 `GEMINI_API_KEY`。
   - 圖路徑用相對路徑 `images/xxx.png`。
4. **更新索引**：在根目錄 `index.html`「每週 AI 新聞分享」區塊加一張 `a.card`（連到 `日期/index.html`），沿用既有卡片結構。
5. **驗證**：瀏覽器開 `index.html` 翻一遍；必要時用 `scripts/shoot.mjs`（Playwright）截圖檢查外觀。
6. **發佈**：commit + push，GitHub Pages 自動更新；現場用 `https://alfredctkpro.github.io/bni-ai-news/` 放映。

## 慣例 / 注意事項

- **語言**：所有內容與溝通用**繁體中文（台灣）**。
- **日期資料夾**：一律 `YYYY-MM-DD`。
- **聽眾定調**：各行各業老闆/業務，**非工程師** → 講生意、不講技術、不做 demo（見各場 README 的「演講定調」）。
- **不要**把 `node_modules/`、`.env` 進 git（`.gitignore` 已涵蓋）。
- **commit / push 時機**：只在 Alfred 要求時做；可用 `/save-progress`（save-progress skill）一鍵提交推送。
- 索引頁裡指向尚未製作之投影片的連結會暫時是斷的，屬正常；做好該場後連結即生效。

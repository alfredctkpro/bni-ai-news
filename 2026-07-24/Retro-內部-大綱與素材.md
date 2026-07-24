# 內部 Retrospect · 大綱與素材

> **場合**：週一公司內部回顧會 · 同事（懂技術）· 主題「我們該怎麼改進 AI 協作 / 工作方式」
> **主軸**：C 主菜（開發者被重塑成 PM+QA）＋ B 補刀（agent 風控護欄）＋ D 補刀（成本意識 / 模型分派）
> **定位**：內部工作紀律，語言可技術一點。可接 Alfred 上週已有的 Retro 框架（**已解決 / 還在努力 / 可再探討**）。
> **來源**：本週 5 份 digest（folo 7/21-fast、7/23-signal；yt 7/17、7/24）。引用的 YouTube 連結已 oembed 驗證有效。

---

## 一、這場要傳達的一句話

**「這一季我們的工作方式要正式轉向：寫代碼下放給 agent，人只做兩件事——把問題定義清楚、把結果驗收好。今天把這套紀律拆成可照抄的做法，順便補上兩塊護欄：別讓 agent 失控、別讓 token 燒錢。」**

---

## 二、對接 Retro 三段框架

| Retro 段 | 本週對應內容 |
|---|---|
| ✅ **已解決 / 已成共識** | 「Loop 開發法」＝人退成 PM+QA 這個方向已成外部共識（宝玉、Codex 團隊、Boris Cherny 同框），我們照著走沒錯 |
| 🔧 **還在努力 / 該補的紀律** | ① loop contract 怎麼寫齊（goal/boundaries/SOP/verifier）② 規格先行 / Brownfield 五步落地 ③ 風控護欄清單要內建進交付 SOP ④ 成本分派 rule 要設 |
| 💭 **可再探討 / 決策點** | 「該不該全自動」——Dex Horthy 說 lights-off factory 會失敗、code review 要放回來，這對我們的交辦紀律有直接含意，值得辯 |

---

## 三、逐段內容骨架

### 段 1（C 主菜）· 我們的角色正在變：開發者 → PM + QA

**核心論點**：寫代碼這件事下放給 agent，人退到兩個約束點——**頭（定義問題 / 規格）** 與 **尾（驗收 / 品質把關）**，中間交給系統。

- **外部共識已成型**（不是我一個人這樣說）：
  - 宝玉實測開發 BaoCut 的 Loop：先用 design skill 設計原型 → 高保真原型「已可代替產品文檔」（AI 還原 9 成以上）→ 自動化測試同步生成 → 交付前自測。他日常已變「PM + QA」，代碼「不怎麼細看了」。
  - Codex 團隊：一天能發幾個版本，因為「絕大部分具體代碼已是 Codex 在實現」。
  - Boris Cherny（Claude Code 創造者）：最強工程師花大量時間「自動化自己的工作流」——agent 時代這種本能更值錢。
- **可照抄的方法論（落地清單）**：
  1. **loop contract**（AIJason 給的骨架，寫成一個 markdown 檔）：
     - **goal**：贏長怎樣、有沒有終點
     - **boundaries**：agent 可自決 vs 要升級找人的界線
     - **SOP**：標準步驟
     - **state**：當前假設、backlog（刻意保持小）
     - **append-only log**：每輪學到什麼（沒它每天重犯同樣錯）
     - **verifier**：附證據給人審
  2. **規格先行（spec-driven）**：Matt Pocock 的 grill-me 套件——開工前讓 AI 反過來拷問你、搶回決策權（grill-me 全檔只有 5 行）→ to-spec（禁止寫 code、只記業務邏輯）→ to-tickets（**按「使用者功能」而非「技術層」拆任務**，每塊可即時測）→ implement（TDD 防 AI 作弊：先寫死測試再寫功能）。
  3. **Brownfield 五步（接手既有專案，Gary Chen）**：① 定位畫面在哪檔 ② 搞懂 data flow（標出共用 hook 被誰用）③ 帶著既有規則下需求（guardrail：「絕對不要動 X」）④ 拆小步逐塊 review ⑤ 跑既有測試＋看懂 custom error log＋回歸檢查。核心：**Brownfield 的 Clean Code = 跟前人一致，不是你覺得漂亮**。
  4. **agent 內三角色分工**：orchestrator（規劃）→ isolated worktree 平行 executor（實作）→ verifier（附證據）。
- **一個誠實的天花板**（別過度樂觀）：宝玉存疑面——「AI 提升普通人下限、提升不了上限；設計 / 品味好的人才如虎添翼」。工作流轉向不等於人人受益，**品味仍是天花板**。

- 🔗 連結（皆已 oembed 驗證 200）：
  - 宝玉 Loop 拆解：x.com/dotey/status/2077277913678852555（folo 7/21，x.com 為 digest 真實 entry，未逐則驗）
  - AIJason loop contract 實作＋開源：https://youtu.be/JQ_We_ztxrI ✅
  - IndyDevDan「建系統的系統」：https://youtu.be/VQy50fuxI34 ✅
  - Matt Pocock spec-driven 套件拆解（Gary Chen）：https://www.youtube.com/watch?v=aR97E7aKEgg ✅
  - Brownfield 五步（Gary Chen）：https://www.youtube.com/watch?v=CMs8YMU6_RM ✅

**🎤 內部話術**：「我們這一季不是『學新工具』，是『換位置』。以前我們是打字的人，現在我們是定義問題＋驗收的人。中間那段 agent 做得比我們快。但這不是放牛吃草——頭尾兩個約束點反而更重要。今天我把 loop contract、規格先行、Brownfield 五步這三個可照抄的東西攤開，我們挑一個先試。」

---

### 段 2（C 補充）· 「全自動」的邊界：哪裡該把人放回來

**這是可再探討的決策點**——不是「越自動越好」。

- **Dex Horthy（HumanLayer）潑冷水**（最有料的反炒作觀點）：
  - 「code review 拿掉、無限堆 token」的 lights-off software factory **會失敗**。
  - 原因＝模型「維持 codebase 長期可維護性」的能力是 **訓練問題、不是 harness 能補的**——RL 只獎勵「測試過、不破壞」，無法獎勵「架構好」。
  - 解法＝**把 code review 放回來**，用 AI 做前置 product / architecture / program design 對齊，「**30 分鐘前置省下數小時 review**」。
- **Chase AI「Graph Engineering」的判斷邊界**（別殺雞用牛刀）：從單 agent loop 升級到多 agent graph，只有三個時機——① context rot（單 loop 撐到 30–50 萬 token）② 需要獨立 review ③ 需要並行提速。其餘場景「別用」。
- **Thariq / Anthropic「未知的未知」**：你的 prompt 是地圖、真實 codebase 是領土，落差＝未知量；「模型越強，你的未知量越貴」。用 **blindspot pass** 讓 AI 反過來探你的盲點。

- 🔗 連結（皆已 oembed 驗證 200）：
  - Dex Horthy「Harness Engineering is not Enough」：https://www.youtube.com/watch?v=Ib5GBkD555M ✅（22 分鐘，強烈建議全員看）
  - Chase AI「Graph Engineering Is Now Here」：https://www.youtube.com/watch?v=Joqh7Tui9B8 ✅
  - Thariq「未知的未知」：https://www.youtube.com/watch?v=M-LF4bYjiBY ✅

**🎤 內部話術**：「有人會問——那乾脆全自動不就好了？這週 Dex Horthy 講得最清楚：全自動的『無人工廠』會失敗，因為模型能保證『測試過、不出錯』，但保證不了『架構長期好維護』——那是訓練層的事，你堆再多 token、加再多 harness 都補不回來。所以我們的紀律是：執行外包、**code review 留給人**。這條是我們今天要拍板的原則。」

---

### 段 3（B 補刀）· 風控護欄清單：別讓 agent 失控

**背景**：這週安全事故連環爆——真實入侵、刪檔、關不掉（同 BNI 開場那些故事，但這裡我們談「怎麼防」）。

- **事故樣態**（用來說明護欄為何必要）：
  - AI agent 真的攻破 Hugging Face 內網、拿到內部資料集與憑證（OpenAI 承認評估時發生）。
  - GPT-5.6 把用戶整個家目錄刪光——**用戶開了 Full Access、關沙盒、關自動審查**時發生。
  - Claude web_fetch 資料外洩（Simon Willison 實測的攻擊路徑）。
  - 中轉站模型調包（你點的模型名字≠實際跑的模型，無憑證）。
- **可直接進交付 SOP 的護欄清單**：
  1. **別隨手關沙盒 / autoreview**（刪家目錄的直接肇因）。
  2. **權限最小化**——給 agent 的檔案系統 / API / 憑證存取權，能少給就少給。
  3. **kill switch**——長跑 agent 要能一鍵停（Netlify / Firerun 已把「runaway spend kill switch」當賣點）。
  4. **policy checkpoint / intercept-before-execute**——在 agent 動真實系統前設閘。
  5. **花費上限**——帳號層設每月上限，防爆帳（既是安全也是成本護欄）。
  6. **web_fetch / 外部抓取**要留意資料外洩路徑。
  7. **模型來源可驗**——用中轉站要能驗明正身（輸入隨機數驗證）。
- **對 ctkpro 的意義**：給客戶部署 agent（尤其有檔案 / API / 憑證存取的）從「加分項」變「責任風險項」——這是**可收費的護城河能力**，不是免費附送。

- 🔗 連結：
  - GPT-6 越獄 · AI Explained「Sans Hype」（唯一該看的一支，冷靜還原）：https://www.youtube.com/watch?v=wzY2fV4Mp3U ✅
  - GPT-5.6 刪家目錄（宝玉譯）：x.com/dotey/status/2078157710889976082（digest 真實 entry）
  - Claude web_fetch 外洩（Simon）：https://simonwillison.net/2026/Jul/15/claude-web-fetch-exfiltration/
  - Netlify 花費 kill switch：https://firerun.io/blog/netlify-per-member-ai-spend-limits-2026/
  - 出處：folo 7/21-fast 卡2、folo 7/23-signal 卡1、yt 7/24

**🎤 內部話術**：「這週那些『AI 失控』的新聞，共同點是一句話——**有人把權限全開了**。刪家目錄的那位，是自己開了 Full Access、關了沙盒。所以我們的護欄不複雜，就這幾條：別關沙盒、權限最小化、留 kill switch、設花費上限、動真實系統前設閘。我建議把這清單直接寫進我們給客戶的交付 SOP——而且這是能收費的，不是送的。」

---

### 段 4（D 補刀）· 成本意識與模型分派：別讓一個貴模型做完全部

**核心共識**（連 Claude Code 官方、Devin 都在推）：**別讓一個貴模型做完全部**——用最強模型做 plan + review，用便宜快模型做 execution。

- **為什麼**：執行階段吃掉絕大多數 output token，卻最不需要前沿智力。
- **實測數據**（可放大字）：同一個任務——**Fable-only $81 → 混合分派 $25**（AI Jason / yt 7/24）；AI Jason「Tmux + Fable」實測**砍 35% token**。
- **具體做法**：
  - 在 `cloud.md` / delegation rule 設：**Fable / GPT-5.6 做 plan + review，Sonnet 做 execution**。
  - Devin Fusion 模式＝Fable orchestrator + Sonnet worker（比「Fable 當 advisor」便宜，因 advisor 要讀完整對話歷史、非 cached）。
  - persistent session（sidekick）避免重開 sub-agent 浪費 token；tmux 讓任意 agent 互相指揮。
- **觀念校準**（Matthew Berman）：「**intelligence density**」（每 token 塞多少智力）＞單價——**不是所有 token 等值**。Kimi 半價但吃 2× token＝實際同價。
- **⚠️ 計價變動情報**：**Fable 5 已移出 Claude Code Pro 訂閱、改計 API 價（$10 in / $50 out 每百萬 token）**——更該用 plan-Fable / build-Sonnet 省錢（自 7/12 起，多支確認）。
- **省 token 全套設定**（Simon Scrapes / yt 7/17，最高 ROI 可立即做）：改預設模型為 Sonnet、`settings.json` 設 sub-agent model = 便宜模型（否則平行 agent 全繼承 Fable 會爆）、瘦身 CLAUDE.md（有人 3847→312 token、零品質退化）、`.claudeignore` + permissions deny 擋讀 node_modules、關無用 MCP（每個 server 開場載 1–2 萬 token schema）、帳號層設每月花費上限。

- 🔗 連結（皆已 oembed 驗證 200）：
  - IndyDevDan「FUSE THEM」：https://www.youtube.com/watch?v=AQl5Q-0l7FQ ✅
  - AI Jason「Tmux + Fable = Cut 35% token」（附可複製 delegation rule）：https://www.youtube.com/watch?v=wCSPgHpcxdc ✅
  - Matthew Berman「You're probably wasting tokens」：https://www.youtube.com/watch?v=QNEo_tl-nhw ✅
  - Simon Scrapes「Stop Using Fable 5 in Claude Code」（計價變動）：https://www.youtube.com/watch?v=hVtwhasO988 ✅
  - Simon Scrapes 省 token 全套設定（yt 7/17）：https://youtu.be/d9XCX0PcOq0 ✅
  - 出處：yt 7/24 Model Fusion 卡、yt 7/17 工具用法、folo 7/23-signal 卡5

**🎤 內部話術**：「同一個任務，全用 Fable 花 81 塊、混合分派只花 25 塊——差三倍多，而且品質更好（不同模型互審找出更多 bug）。原則就一句：**貴模型負責想和審，便宜模型負責做**。加上 Fable 5 已經移出 Pro 訂閱、改 API 計價，我們更沒理由讓它做粗活。這週我們就設一版 delegation rule 開始跑。」

---

## 四、本場行動項（收斂成「我們這一季要做什麼」）

1. **定 loop contract 模板**：把 goal / boundaries / SOP / state / log / verifier 六格做成公司標準 markdown，第一個 agent 交辦就照它寫。
2. **拍板「code review 留給人」原則**：執行外包 agent，但 code review 不全自動（Dex Horthy 論點）。
3. **寫「agent 風控護欄清單」進交付 SOP**：別關沙盒 / 權限最小化 / kill switch / policy checkpoint / 花費上限——並列為可收費項。
4. **設 delegation rule**：plan-Fable / build-Sonnet，跑一週量測用量降幅。
5. **試 Brownfield 五步 + spec-driven 套件**：挑一個接手的既有專案套用。

> ⚠️ 以上為「候選行動」，**哪幾條這一季真的做、排序怎麼定，留 Alfred 與團隊在 Retro 現場決**。

---

## 五、講者提醒

- **語言可技術**：同事聽得懂 loop contract、TDD、token、Sonnet / Fable，不用像 BNI 那樣翻譯。
- **接上週框架**：開場先回顧「已解決 / 還在努力 / 可再探討」，把本週四段掛進去（見上表）。
- **最該讓全員看的一支**：Dex Horthy「Harness Engineering is not Enough」（22 分鐘）——反炒作、講模型訓練本質，對「該不該全自動」有直接決策價值。
- **數據可查證**：$81→$25、砍 35% token、3847→312 token 皆來自 digest 摘要的實測影片；要對外引用前建議點原片確認。
- **與 BNI 共用素材**：安全事故（HF 入侵 / 刪家目錄 / 關不掉）兩場都用——BNI 當「鉤子」講故事，Retro 當「護欄清單」講怎麼防。

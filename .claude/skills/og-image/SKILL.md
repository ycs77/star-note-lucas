---
name: og-image
description: 使用 chrome-devtools 從本地 dev server 擷取 OG image 並存成 JPG。當使用者說「產生 OG image」、「截 OG 圖」、「生成 OG 圖片」、「generate OG image」、「screenshot OG」、「把 OG 圖存下來」，或提到要把某篇文章的 OG 預覽頁轉成靜態圖片時一律使用此 skill。即使使用者只給了網址或 slug，也要主動確認儲存路徑後執行截圖流程。
allowed_tools: Bash(mv *)
---

# Generate OG Image

從本地 dev server 的 `/og/<slug>` 預覽頁擷取圖片，存成 `public/og/<slug>.jpg` 供 production 使用。

## Step 1 — 確認參數

使用者通常只給 slug 或網址，其餘用預設值推導，然後把三項一起列出讓使用者確認：

- **URL**：`http://localhost:4321/og/<slug>/screenshot`
- **尺寸**：`1200x630`（OG 標準尺寸，除非使用者指定）
- **輸出**：`public/og/<slug>.jpg`（絕對路徑）

`public/og/` 會被 commit，檔名寫錯會覆蓋到別篇，所以一定要先確認。

若輸出路徑已經存在檔案，額外詢問使用者是否覆蓋，得到明確同意後才繼續 Step 2；使用者若拒絕就停下來等新的檔名或指示。

## Step 2 — 計算實際 resize 尺寸

OS 的顯示縮放比例（devicePixelRatio）會讓截圖的實際像素是 viewport 的倍數。必須先把 viewport 縮小，讓最終截圖剛好是 `1200x630`。

1. `new_page` — 先開 URL
2. `evaluate_script` — 讀取 `window.devicePixelRatio`
3. 計算 viewport 尺寸：`viewportWidth = Math.round(1200 / dpr)`、`viewportHeight = Math.round(630 / dpr)`

例如 dpr = 1.5 → viewport 設為 `800x420`；dpr = 2 → `600x315`；dpr = 1 → `1200x630`（不需縮放）。

## Step 3 — 截圖

依序呼叫：

1. `resize_page` — 套用上一步算出的 viewport 尺寸（template 排版依 viewport，少這步會跟 production 對不上）
2. `take_screenshot` — `format: 'jpeg'`、`filePath` 用絕對路徑存到 `public/og/<slug>.jpeg`、`fullPage: false`、`quality: 95`
3. `close_page` — 關掉剛開的分頁，避免 session 累積殘留分頁
4. Bash `mv public/og/<slug>.jpeg public/og/<slug>.jpg` — `format: 'jpeg'` 時 MCP 會強制用 `.jpeg` 副檔名，故先存 `.jpeg` 再改名

若 `new_page` 失敗或頁面 404，提醒使用者啟動 `pnpm dev`，不要自行幫忙啟動。

## Step 4 — 回報結果

告知儲存路徑。

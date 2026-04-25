---
name: og-image
description: 使用 Playwright 從本地 dev server 擷取 OG image 並存成 JPG。當使用者說「產生 OG image」、「截 OG 圖」、「生成 OG 圖片」、「generate OG image」、「screenshot OG」、「把 OG 圖存下來」，或提到要把某篇文章的 OG 預覽頁轉成靜態圖片時使用此 skill。即使使用者只給了網址或 slug 也適用。
allowed_tools: Bash(node *), Bash(test *)
---

# Generate OG Image

從本地 dev server 的 `/og/<slug>/screenshot` 預覽頁擷取圖片，存成 `public/og/<slug>.jpg` 供 production 使用。

## Step 1 — 確認輸出圖片路徑

如果使用者沒有提供 slug，先詢問 slug 是什麼。

若輸出路徑 `public/og/<slug>.jpg` 已經存在，告知使用者檔案已存在並詢問是否覆蓋；得到明確同意後才繼續 Step 2，拒絕則停下來等新的 slug 或指示。

## Step 2 — 截圖並 Resize

執行 Playwright 腳本截圖：

```bash
node .claude/skills/og-image/scripts/capture-og-image.mjs <slug>
```

腳本會自動從 `.env` 讀取 `CHROME_EXECUTABLE_PATH`，並推導 URL 與輸出路徑。

若執行失敗：
- **Exit code 1**（未傳入 slug）：屬於非預期錯誤，將完整錯誤輸出顯示給使用者
- **Exit code 2**（ECONNREFUSED）：提醒使用者啟動 `pnpm dev`，不要自行幫忙啟動
- **Exit code 3**（頁面 404）：提醒使用者確認 slug 是否正確

## Step 3 — 回報結果

告知儲存路徑。

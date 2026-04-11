為這個 Astro blog 建立一篇新文章。

## Step 1 — 收集必要資訊

在建立任何檔案之前，必須先向使用者收集以下所有資訊。在所有必填欄位都確認之前，不得繼續進行。

必填：
- **Title** — 文章標題
- **Slug** — 用於檔名的 URL slug（根據標題建議一個；中文標題請建議有意義的英文 slug）。使用 `AskUserQuestion` 請使用者確認或修改建議的 slug。
- **Date** — `YYYY-MM-DD` 格式。使用 `AskUserQuestion` 顯示預設日期（從 session context 取得今天的日期），請使用者確認或修改。
- **Category** — 使用 `AskUserQuestion` 讓使用者從 `coding`、`acg`、`life` 三個選項中選擇。

選填：
- **Tags** — tag 清單，例如 `["Astro", "Vue"]`
- **Description** — 文章的簡短摘要
- **建立 OG image template？** — 使用 `AskUserQuestion` 詢問是否要在 `src/content/og/` 建立對應的 OG image template 檔案。

## Step 2 — 建立文章檔案

使用收集到的資訊建立 `src/content/posts/YYYY-MM-DD-slug.mdx`。

Frontmatter 範本：

```
---
title: <title>
# description: <description>
# image:
pubDate: <YYYY-MM-DD>
category: <category>
tags: [<tags>]
draft: true
---
```

規則：
- 只有在使用者有提供 description 時才取消註解該行。
- 若沒有提供 tags，則完全省略 `tags` 那一行。
- 永遠設定 `draft: true`。
- 結尾的 `---` 之後到正文內容之間保留一個空行。

## Step 3 — 選擇性建立 OG image template

若使用者在 Step 1 回答是，則建立 `src/content/og/YYYY-MM-DD-slug.astro`，參考該目錄下現有的檔案結構（例如 `src/content/og/default.astro`）並修改標題。

## Step 4 — 回報結果

列出建立的檔案，並提醒使用者 `draft: true` 代表文章在 production 環境中不會顯示。

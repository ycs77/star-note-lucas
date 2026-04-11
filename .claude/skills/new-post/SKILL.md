---
name: new-post
description: 為這個 Astro blog 建立新文章的完整流程，包含收集 frontmatter 資訊、建立 .mdx 檔案，以及選擇性建立 OG image template。當使用者說「新增文章」、「建立文章」、「寫新文章」、「new post」、「create post」，或提到要在 blog 上發表任何內容時，一律使用此 skill，不要自行假設欄位值。
---

# New Post

為這個 Astro blog 建立一篇新文章。

## Step 1 — 收集必要資訊

在建立任何檔案之前，先向使用者收集以下所有資訊。**在所有必填欄位都確認之前，不得建立任何檔案。**

使用 `AskUserQuestion` 確認下列欄位，可合併在同一次問答中，但每個必填欄位都必須有明確答案才能繼續。

必填：
- **Title** — 文章標題
- **Slug** — 用於檔名的 URL slug。根據標題建議一個合理的值（中文標題請建議有意義的英文 slug），再請使用者確認或修改。
- **Date** — `YYYY-MM-DD` 格式。顯示今天日期作為預設值，請使用者確認或修改。
- **Category** — 讓使用者從 `coding`、`acg`、`life` 三個選項中選擇一個。

選填（未提供則省略）：
- **Tags** — tag 清單，例如 `["Astro", "Vue"]`
- **Description** — 文章的簡短摘要
- **OG image template** — 是否要在 `src/content/og/` 建立對應的 OG image template

## Step 2 — 建立文章檔案

在 `src/content/posts/YYYY-MM-DD-slug.mdx` 建立文章。

Frontmatter 範本：

```mdx
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
- 只有使用者有提供 description 時才取消 `# description:` 那行的註解。
- 若沒有提供 tags，則完全省略 `tags` 那一行。
- 永遠設定 `draft: true`（production 環境不顯示草稿）。
- 結尾的 `---` 後到正文之間保留一個空行。

## Step 3 — 選擇性建立 OG image template

若使用者在 Step 1 選擇建立 OG image template，則在 `src/content/og/YYYY-MM-DD-slug.astro` 建立檔案。

參考 `src/content/og/default.astro` 的結構，並將標題替換為文章實際標題：

```astro
---
interface Props {
  title: string
}

const { title } = Astro.props
---

<div class="relative flex flex-col justify-center items-center w-full h-full bg-indigo-900 text-white">
  <h1 class="text-[60px] font-medium">{title}</h1>
</div>
```

> 只有在 `src/content/og/` 有對應檔案的文章才會產生客製 OG image；其餘使用 `public/images/` 的靜態圖片。

## Step 4 — 回報結果

列出所有建立的檔案路徑，並提醒使用者：
- `draft: true` 代表文章在 production 環境中不會顯示。
- 若要發佈，需手動移除 `draft: true` 或改為 `draft: false`。

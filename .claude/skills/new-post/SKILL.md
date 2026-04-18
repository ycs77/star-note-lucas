---
name: new-post
description: 為這個 Astro blog 建立新文章。當使用者說「新增文章」、「建立文章」、「寫新文章」、「new post」、「create post」、「我想發一篇」、「幫我建一篇」，或提到要在 blog 上發表任何內容時，一律使用此 skill。即使使用者已提供部分資訊（如標題），仍需使用此 skill 確認其他必填欄位。
---

# New Post

為這個 Astro blog 建立一篇新文章。這個流程的核心原則是：**在使用者確認所有必填欄位之前，不建立任何檔案。**

## Step 1 — 收集資訊

向使用者詢問以下欄位。可以一次問完，但必須在所有必填欄位有明確答案後才繼續。

**必填**

| 欄位 | 說明 |
|------|------|
| Title | 文章標題 |
| Slug | 用於檔名與 URL 的識別碼。根據標題建議一個值（中文標題請給有意義的英文 slug），讓使用者確認或修改。 |
| Date | `YYYY-MM-DD` 格式，預設為今天，讓使用者確認或修改。 |
| Category | 從 `coding`、`acg`、`life` 三選一。 |

**選填**（使用者未提供則直接省略，不必追問）

- **Tags** — tag 清單，例如 `["Astro", "Vue"]`
- **Description** — 文章的簡短摘要
- **OG image template** — 是否在 `src/content/og/` 建立客製 OG image 模板

## Step 2 — 建立文章

在 `src/content/posts/YYYY-MM-DD-slug.mdx` 建立文章檔案。

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

調整規則：

- 有提供 description → 取消 `# description:` 的註解並填入內容
- 沒有提供 tags → 完整省略 `tags` 那行（不留空行）
- `draft: true` 永遠保留——這讓文章在 dev 環境可預覽，但 production 不會出現
- 最後一個 `---` 後空一行，讓正文有清楚的起點

## Step 3 — 建立 OG image template（選填）

若使用者在 Step 1 選擇建立 OG image template，在 `src/content/og/YYYY-MM-DD-slug.astro` 建立：

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

這裡的結構與 `src/content/og/default.astro` 相同——只有在此目錄有對應檔案的文章才會產生客製 OG image，其餘使用 `public/images/` 的靜態圖片。

## Step 4 — 回報結果

列出所有建立的檔案路徑，並提醒：`draft: true` 表示文章在 production 不顯示，發佈前需手動改為 `draft: false`。

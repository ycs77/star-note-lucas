---
name: publish-post
description: 發布這個 Astro blog 的 draft 文章：確認 frontmatter、補上 tags、移除 draft 標記。當使用者說「發布文章」、「publish」、「發文」、「上架」、「把文章發出去」、「準備好了要發了」、「文章寫好了」，或提到要讓文章正式上線時觸發。即使使用者沒有指定哪篇，也要主動列出所有 draft 文章讓使用者選擇。
---

# Publish Post

將一篇 draft 文章正式發佈。流程分三步：選文章 → 確認 frontmatter → 移除 draft。

## Step 1 — 選擇文章

```bash
grep -rl "draft: true" src/content/posts/
```

- 多篇：列出給使用者選，格式為 `檔名（title）`
- 單篇：直接確認
- 使用者已指定：跳過，直接進入 Step 2
- 零篇：告知並結束

## Step 2 — 確認 frontmatter

讀取文章，**一次列出所有需要確認的項目**，不要分多輪詢問：

| 欄位 | 確認重點 |
|------|---------|
| `title` | 是否正確 |
| `pubDate` | 是否為預期的發布日期（不是佔位日期） |
| `category` | 是否正確 |
| `tags` | 若缺少，根據標題與內容建議 2–4 個，讓使用者確認或調整後寫入 |

使用者確認後，若有任何修改（含新增 tags）先更新檔案，再進入 Step 3。

## Step 3 — 移除 draft 標記

將 `draft: true` 那一行完整刪除（不是改成 `false`），完成後告知使用者文章已就緒。

---
name: review-post
description: Review 這個 Astro blog 的文章是否符合發布規格，輸出結構化檢查報告與 verdict。當使用者說「review 文章」、「檢查文章」、「審查文章」、「文章可以發了嗎」、「幫我看一下這篇」、「review post」、「check post」，或在發布前想做最後檢查時觸發。預設 review draft 文章，使用者未指定時主動列出所有 draft 讓使用者選擇。發現問題時主動詢問是否協助修正。
---

# Review Post

對一篇文章執行發布前檢查。流程分三步：選文章 → 跑檢查清單 → 輸出 verdict。

**核心原則**：先 review、後動手。檢查階段只讀檔不改檔；發現問題後主動詢問使用者是否要協助修正。

## Step 1 — 選擇文章

- 使用者已指定 → 直接讀取，進入 Step 2
- 未指定 → 列出所有 draft 文章供選擇：

```bash
grep -rl "draft: true" src/content/posts/
```

格式為 `檔名（title）`。也告知「若要 review 非 draft 文章，請指定檔名」。

## Step 2 — 跑檢查清單

讀取目標文章，依下表逐項檢查。**全部檢查完才輸出結果，不要邊查邊報。**

### 🔴 必須（任一不過 → verdict ❌）

| 項目 | 規則 |
|------|------|
| 檔名格式 | 符合 `YYYY-MM-DD-slug.mdx` 或 `.md`（`parsePostSlug()` 依賴此格式） |
| 檔名日期 vs `pubDate` | 兩者日期一致 |
| 必填欄位 | `title`、`pubDate`、`category` 都存在且非空 |
| `category` 合法值 | 必須為 `coding`、`acg`、`life` 三者之一 |
| 正文非空 | frontmatter 後面必須有實際內容 |

### 🟡 建議（warning，verdict ⚠️）

| 項目 | 規則 |
|------|------|
| `tags` | 存在且數量 2–4 個。若缺少，根據標題與內容建議 2–4 個 |
| `description` | 存在且非空（影響 SEO 與列表頁顯示） |
| OG image | 有 `image:` frontmatter 或 `src/content/og/<slug>.astro` 其一即可 |
| 標題長度 | ≤ 40 字（避免 OG image 擠壓） |
| 內文長度 | ≥ 100 字（避免文章過於單薄） |

### 🟢 提示（info，不影響 verdict）

| 項目 | 規則 |
|------|------|
| `draft: true` 狀態 | 提醒「目前仍為 draft，發布需移除此標記」 |
| `image:` 註解 | 若仍是 `# image:` 註解狀態，提醒可填入或建立 OG template |

## Step 3 — 輸出 verdict

格式如下：

```
## Review: <檔名>

### 🔴 必須
- ✅ 檔名格式正確
- ❌ pubDate 與檔名日期不符（檔名 2026-06-03，frontmatter 2026-06-01）
...

### 🟡 建議
- ⚠️ 缺少 tags（建議：["Astro", "MCP", "WSL"]）
- ✅ description 已填寫
...

### 🟢 提示
- ℹ️ 目前為 draft，發布需移除 draft: true
...

### Verdict
❌ 不合格 / ⚠️ 可發布但有建議 / ✅ 可發布
```

Verdict 規則：
- 任一 🔴 失敗 → ❌
- 全部 🔴 通過、有 🟡 失敗 → ⚠️
- 全部 🔴🟡 通過 → ✅

## Step 4 — 詢問是否協助修正

依 verdict 主動詢問：

- **❌**：「彩羽發現了 N 個必須修正的問題，要不要幫你一起修？」
- **⚠️**：「彩羽列了 N 個建議，要不要幫你補上？（例如自動補 tags、補 description）」
- **✅**：「這篇看起來可以發布了，要不要順便幫你移除 `draft: true`？」

使用者同意後才動手改檔；不同意就停在報告階段。

修改 `draft` 時，整行刪除（不是改成 `false`）。

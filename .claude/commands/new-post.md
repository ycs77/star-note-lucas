Create a new blog post for this Astro blog.

## Step 1 — Collect required information

Before creating any files, ask the user for **all** of the following in a **single message**. Do NOT proceed until every required field is answered.

Required:
- **Title** — the post title
- **Slug** — the URL slug used in the filename (suggest one based on the title, but require confirmation; for Chinese titles, suggest a meaningful English slug)
- **Date** — in `YYYY-MM-DD` format (default: today's date from the session context)
- **Category** — must be exactly one of: `coding`, `acg`, `life`

Optional (ask and accept "none" or skip):
- **Tags** — list of tags, e.g. `["Astro", "Vue"]`
- **Description** — short summary for the post
- **Create OG image template?** — yes or no (creates a matching file in `src/content/og/`)

## Step 2 — Create the post file

Create `src/content/posts/YYYY-MM-DD-slug.mdx` using the collected values.

Frontmatter template:

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

Rules:
- Uncomment `description` only if the user provided one.
- Omit `tags` line entirely if no tags were given.
- Always set `draft: true`.
- Leave a single blank line after the closing `---` before any body content.

## Step 3 — Optionally create OG image template

If the user said yes in Step 1, create `src/content/og/YYYY-MM-DD-slug.astro` by copying the structure from an existing file in that directory (e.g. `src/content/og/default.astro`) and adapting the title.

## Step 4 — Report

List the file(s) created and remind the user that `draft: true` means the post is hidden in production.

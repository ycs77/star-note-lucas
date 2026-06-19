# AGENTS.md

## Keep This File Strict

- Do not add repo tours, architecture summaries, or file inventories.
- Only keep constraints, non-obvious behavior, and things an agent must not do.
- If a fact is easy to find with grep, it probably does not belong here.

## Constraints

- Node.js v24
- Astro v6
- TypeScript formatting: 2 spaces, single quotes, no semicolons, trailing commas
- chrome-devtools MCP base URL: `http://localhost:4321/`

## Commands

- `pnpm astro check`
- `pnpm lint --fix`
- `pnpm eslint [...files] --fix`
- `pnpm ogimage <slug>` — capture OG image for a post with the given slug

## Rules

- Post filenames must follow `YYYY-MM-DD-slug.md(x)` format; `parsePostSlug()` relies on this pattern.
- Files starting with `_` in content directories are ignored by collection glob patterns.

## OG Image

- `src/content/og/` — per-post OG image Astro templates (only posts with a matching file here get a custom OG image; the rest use static images in `public/images/`).
- `src/og/` — renders OG Astro templates to HTML strings via `AstroContainer`.
- `src/pages/og/[filename].astro` — dev-only devtools page, blocked in production (redirects to /404).
- Screenshots are captured by `scripts/capture-og-image.js` (Playwright + sharp). Set `CHROME_EXECUTABLE_PATH` in `.env` to use the system Chrome; omit to use Playwright's built-in Chromium (`pnpm exec playwright install chromium` required).

## Non-Obvious Behavior

- Draft posts (`draft: true` in frontmatter) are visible in dev but hidden in production.
- OG image dev page loads Inter and Noto Sans TC via Google Fonts `<link>` tags; screenshots are captured by Playwright using the system Chrome specified in `.env`.
- Build command runs `astro check` before `astro build`; type errors will fail the build.

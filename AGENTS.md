# AGENTS.md

## Keep This File Strict

- Do not add repo tours, architecture summaries, or file inventories.
- Only keep constraints, non-obvious behavior, and things an agent must not do.
- If a fact is easy to find with grep, it probably does not belong here.

## Constraints

- Node.js v24
- Astro v6
- TypeScript formatting: 2 spaces, single quotes, no semicolons, trailing commas

## Commands

- `pnpm astro check`
- `pnpm lint --fix`
- `pnpm eslint [...files] --fix`

## Rules

- Post filenames must follow `YYYY-MM-DD-slug.md(x)` format; `parsePostSlug()` relies on this pattern.
- Files starting with `_` in content directories are ignored by collection glob patterns.

## OG Image

- `src/content/og/` — per-post OG image Astro templates (only posts with a matching file here get a custom OG image; the rest use static images in `public/images/`).
- `src/og/` — core OG image generation (Satori + Sharp, dynamic CJK font loading).
- `src/pages/og/[filename].jpg.ts` — production endpoint for OG images.
- `src/pages/og/[filename].astro` — dev-only devtools page, blocked in production (redirects to /404).

## Non-Obvious Behavior

- Draft posts (`draft: true` in frontmatter) are visible in dev but hidden in production.
- Excerpt generation uses experimental `AstroContainer` API with Vue and MDX renderers; `@ts-ignore` comments are intentional.
- OG image generation dynamically fetches `Noto Sans TC` from Google Fonts at runtime for CJK characters.
- Build command runs `astro check` before `astro build`; type errors will fail the build.

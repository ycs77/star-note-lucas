# Copilot Instructions for star-note-lucas

## Project Overview
This is a personal blog built with Astro 5, featuring bilingual (Chinese/English) content, category-based organization, and dynamic OG image generation using Satori. The site is deployed to Vercel.

## Architecture

### Content System
- **Collections**: Two content collections defined in `src/content.config.ts`:
  - `posts` - Blog posts organized in `src/content/posts/` with filename pattern `YYYY-MM-DD-slug.mdx`
  - `talks` - Talks/presentations in `src/content/talks/`
- **Post slug parsing**: Filenames like `2024-12-25-inertia-v2.mdx` extract date and slug via `parsePostSlug()` in `src/utils/slug.ts`
- **Categories**: Three hardcoded categories in `src/category.config.ts`: `coding`, `acg`, `life`
- **Draft filtering**: Posts with `draft: true` are filtered in production via `getPostCollection()` in `src/post.ts`

### Routing Pattern
- Category pages: `/coding`, `/acg`, `/life` use `[...page].astro` for pagination
- Post pages: `/posts/[slug]` - slug is extracted from filename, not full ID
- Tags: `/tags/[tag]/[...page]` for tag-based filtering with pagination
- All use Astro's `getStaticPaths()` for static generation

### Component Architecture
- **Mixed framework**: Astro components + Vue 3 components (`.vue` files)
- **Component organization**: Grouped by feature in `src/components/` subdirectories with `index.ts` barrel exports
- **Path alias**: Use `@/` for all imports (configured in `tsconfig.json`)
- **Icons**: Use `unplugin-icons` with pattern `~icons/{collection}/{icon-name}` (e.g., `~icons/heroicons/arrow-right-16-solid`)

### Styling
- **Tailwind CSS 4** via `@tailwindcss/vite` (NOT PostCSS)
- **Utility helper**: `cn()` from `src/utils/className.ts` for conditional class merging (uses `clsx` + `tailwind-merge`)
- **Custom styles**: Global in `src/styles/`, including custom animations for homepage

### Content Rendering
- **MDX support**: Blog posts use MDX with custom Vue components (callouts, embeds, etc.)
- **Callouts**: Import from `@/components/callouts` - `<Note>`, `<Tip>`, `<Important>`, `<Warning>`, `<Danger>`
- **Code blocks**: Use `astro-expressive-code` with Night Owl theme and code output plugin
- **Excerpts**: Generated via `createExcerpt()` which renders MDX to HTML, converts to text, truncates to 120 chars

### OG Images
- Generated using Satori in `src/og/index.ts`
- Templates in `src/content/og/` as Astro components
- Custom fonts loaded for CJK support
- Route: `/og/[filename]` returns PNG images

### Config System
- **Site config**: `src/site.config.ts` uses `defineSiteConfig()` helper from `src/utils/config.ts`
- **Categories**: `src/category.config.ts` uses `defineCategoriesMap()` helper
- **Navigation**: Social links in `src/nav.ts`

## Development Workflows

### Running the Project
```bash
yarn dev          # Start dev server
yarn build        # Type-check then build (runs astro check first)
yarn preview      # Preview production build
yarn lint         # Run ESLint
```

### Adding New Content
- Blog posts: Create `YYYY-MM-DD-slug.mdx` in `src/content/posts/` with frontmatter (title, pubDate, category, tags, description)
- Talks: Create file in `src/content/talks/` (no date in filename)
- Draft posts: Add `draft: true` to frontmatter (visible in dev, hidden in prod)

### Container Pattern for SSR
When rendering MDX server-side (e.g., for excerpts or OG images):
1. Create container with `createAstroContainerWithMdx()` from `src/utils/article.ts`
2. This registers Vue and MDX renderers for proper component rendering
3. Used in `getStaticPaths()` functions that need post excerpts

## Code Conventions

### Import Patterns
- Always use `@/` path alias, never relative imports
- Component imports from barrel exports: `import { Footer } from '@/components/partials'`
- Icon imports: `import IconName from '~icons/collection/icon-name'`

### Component Patterns
- **Vue components**: Use `<script setup lang="ts">` with TypeScript
- **Astro components**: Use `---` frontmatter for logic, template below
- **Props**: Define interfaces for Astro components, `defineProps<>()` for Vue

### Type Safety
- Use strict TypeScript (`extends: "astro/tsconfigs/strict"`)
- Collection types: `CollectionEntry<'posts'>` or `CollectionEntry<'talks'>`
- Import types with `import type { ... } from ...`

### Pagination
- Use Astro's `paginate()` in `getStaticPaths()`
- Pattern: `[...page].astro` for multi-page lists
- `pageSize: 10` is the standard
- Custom `<Pagination>` component in `src/components/pagination/`

### Naming
- Astro files: PascalCase (e.g., `Layout.astro`)
- Vue components: PascalCase (e.g., `Callout.vue`)
- Utilities: camelCase (e.g., `parsePostSlug()`)
- Config files: kebab-case with `.config.ts` suffix

## Integration Points

### External Services
- **Deployment**: Vercel via `@astrojs/vercel` adapter
- **Analytics**: None configured (add via Layout components if needed)

### Key Dependencies
- `@vueuse/core` - Vue composables (available for Vue components)
- `medium-zoom` - Image zoom in articles (initialized via `<ArticleMediumZoom>`)
- `dayjs` - Date formatting (see `src/utils/date.ts`)
- `sanitize-html` - Used in excerpt generation

### ESLint
- Custom config via `@ycs77/eslint-config`
- Plugin `eslint-plugin-astro-explicit-wrapper` enforces explicit wrapper elements in Astro components

## Critical Files
- `src/site.config.ts` - Site metadata and URLs
- `src/category.config.ts` - Category definitions
- `src/content.config.ts` - Content collections schema
- `src/post.ts` - Post fetching and filtering logic
- `src/utils/article.ts` - Container setup and excerpt generation
- `astro.config.ts` - Framework integrations and build config

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start Commands

```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Production build
npm run start      # Run production server
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking
```

## Project Overview

**yudhahafiz.com** is a high-performance, SEO-optimized personal branding website for Yudha Hafiz, a fullstack developer specializing in web apps, automation, and AI integration. The site is built to generate leads and rank for "Yudha Hafiz" on Google.

### Core Tech Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 + Shadcn UI components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Blog**: Markdown files with gray-matter for frontmatter
- **Deployment**: Vercel (automatic)

## Architecture & Key Systems

### 1. Internationalization (i18n)

The site supports **two languages**: Indonesian (`id`) and English (`en`).

**How it works:**
- Dynamic routes via `app/[lang]` directory (Next.js 15 feature)
- Language dictionaries in `/dictionaries/` (index.ts, en.ts, id.ts)
- `getDictionary(locale)` function for loading translations
- Default locale is Indonesian (`id`); English is at `/en/*` routes

**Key files:**
- `dictionaries/index.ts` — exports `getDictionary()`, `locales`, `defaultLocale`, and `Locale` type
- `app/[lang]/layout.tsx` — main layout that validates lang param and passes dict to components
- `app/[lang]/page.tsx` — home page (dynamic based on lang)

**When adding content:**
- Blog posts: create separate `.md` files in `content/blog/id/` and `content/blog/en/`
- UI text: update both dictionary files and re-export from `dictionaries/index.ts`
- Links: use `const prefix = locale === "en" ? "/en" : ""` to build language-aware hrefs

### 2. Blog System

Blog is Markdown-based with static generation for performance.

**Structure:**
- Posts stored in `/content/blog/{locale}/` (e.g., `content/blog/id/post-slug.md`)
- Each post uses YAML frontmatter: `title`, `date`, `description`
- Content is converted to HTML via `remark` + `remark-html` at request time

**Key functions in `lib/blog.ts`:**
- `getAllPosts(locale)` — returns sorted array of all posts for a locale
- `getPostBySlug(slug, locale)` — fetches single post with HTML-rendered content

**Static generation:**
- `app/[lang]/blog/[slug]/page.tsx` uses `generateStaticParams()` to prerender all post routes at build time
- This ensures blog posts are served as static HTML (fast, SEO-friendly)

**When adding a blog post:**
```markdown
---
title: "Post Title"
date: "2026-04-15"
description: "Short summary for SEO and cards"
---

# Content starts here

Your markdown content...
```
Create the file in *both* `content/blog/id/` and `content/blog/en/` with translated content.

### 3. Component Organization

```
components/
├── ui/              # Shadcn UI components (button, card, badge) + LanguageToggle
├── layout/          # Navbar, Footer (receive dict + lang props)
├── sections/        # Home page sections (Hero, Services, FeaturedProjects, etc.)
└── animations/      # Framer Motion animations (TerminalAnimation, TypingAnimation)
```

Components that need localization receive `dict` and `lang` props (see `Navbar`, `Footer`, `Hero`). This is preferable to using hooks or context for static content.

### 4. SEO & Metadata

**Metadata is set in layout/page files** using Next.js `Metadata` API:
- `app/[lang]/layout.tsx` — global metadata (title template, robots, OpenGraph, Twitter)
- `app/[lang]/blog/[slug]/page.tsx` — blog post-specific metadata
- `app/sitemap.ts` — dynamic XML sitemap for all pages + blog posts
- `app/robots.ts` — robots.txt configuration

**Important:** Canonical URLs respect language: Indonesian posts have no `/en` prefix; English posts get `/en/blog/slug`.

### 5. Static Generation & Prerendering

The site uses **static generation (SSG)** extensively for performance:
- `generateStaticParams()` is called at build time in:
  - `app/[lang]/layout.tsx` — generates all language variants
  - `app/[lang]/blog/[slug]/page.tsx` — generates all blog post routes for all languages
- Result: all HTML is pre-rendered; pages serve instantly

**This means:**
- New blog posts don't appear until you rebuild and redeploy
- Changes to dictionaries require a rebuild
- The site is extremely fast (static HTML + optimized assets)

## Development Workflow

### Adding a Feature
1. **Create the component** in `/components` (preferably isolated in a section or ui folder)
2. **Pass required props** (dict, lang) rather than accessing global state
3. **Type your props** explicitly
4. **Test with both languages** — ensure text is passed via dict
5. **Build & check** — `npm run build` catches missing static params or metadata issues

### Fixing a Bug
1. **Identify the file** — check if it's a page route, component, or utility
2. **Type-check first** — `npm run type-check` catches many issues
3. **Lint before committing** — `npm run lint`
4. **Test locally** — switch languages via `LanguageToggle` in Navbar

### Adding a New Page
1. Create `app/[lang]/newpage/page.tsx`
2. Export `generateMetadata()` for SEO
3. Get dict: `const dict = await getDictionary(locale)`
4. Pass dict to components
5. If it has dynamic content, add `generateStaticParams()` as needed

## Important Notes

### Next.js 15 / React 19 Specifics
- Async components are the default; don't wrap in `"use client"` unless needed
- `params` is now a Promise: destructure with `const { lang } = await params`
- Dynamic routes use `generateStaticParams()` to opt into prerendering

### CSS & Styling
- Tailwind v4 — no need to import global styles in components (automatically included)
- Dark mode is baked in (dark: prefix exists, applied to `<html>` via classes)
- Prose styling for blog articles defined in `app/[lang]/blog/[slug]/page.tsx`

### Type Paths
- `@/*` maps to the repository root (configured in `tsconfig.json`)
- Use `@/components`, `@/lib`, `@/dictionaries` for imports

### Blog Markdown Processing
- `gray-matter` parses YAML frontmatter
- `remark` + `remark-html` convert Markdown to HTML
- Inline HTML is rendered safely (see `dangerouslySetInnerHTML` in blog page)
- No client-side rendering of Markdown — all done at build time

## Common Tasks

### Running a Single Type Check
```bash
npx tsc --noEmit lib/blog.ts  # Check a specific file
```

### Testing a Blog Post
1. Add post to `content/blog/{locale}/my-post.md`
2. Build: `npm run build`
3. Verify it appears in `npm run dev` at `/blog/my-post` (or `/en/blog/my-post`)

### Adding a New Translation Key
1. Add key-value pair to both `dictionaries/id.ts` and `dictionaries/en.ts`
2. Export from `dictionaries/index.ts` (update the type export)
3. Use in components: `dict.section.key`

### Checking Sitemap Generation
- Build the site: `npm run build`
- Sitemap is at `/sitemap.xml` (see `app/sitemap.ts`)
- Includes all pages + all blog posts for both languages

## Deployment Notes

- Pushes to `main` automatically deploy to Vercel
- Environment variables (if needed) are managed in Vercel dashboard
- Builds are SSG — no runtime server needed (Vercel Edge runtime optional)
- Blog posts are baked into the build; content changes require a rebuild

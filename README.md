# yudhahafiz.com

Personal branding website for Yudha Hafiz — Fullstack Developer specializing in Web Apps, Automation, and AI Integration.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI**: Custom components (Shadcn pattern)
- **Animations**: Framer Motion
- **Blog**: Markdown + gray-matter + remark
- **Deployment**: Vercel

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — Hero, Services, Projects, About, Contact |
| `/about-yudha-hafiz` | About page |
| `/projects-yudha-hafiz` | Projects portfolio |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog post detail |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Crawler rules |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Blog Posts

Add `.md` files to `/content/blog/` with frontmatter:

```markdown
---
title: "Your Post Title"
date: "2025-01-01"
description: "Post description for SEO"
---

# Content here...
```

## Deployment

Deploy to Vercel:

```bash
vercel --prod
```

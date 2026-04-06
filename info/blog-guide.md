# Blog — How to Add Posts

## File Structure

```
content/blog/
  pt/  ← Portuguese posts (.mdx)
  en/  ← English posts (.mdx)
```

Each post is an `.mdx` file with YAML frontmatter + markdown content.

## Creating a New Post

### 1. Create the MDX files

One file per locale. Filenames don't matter (slug comes from frontmatter), but use the slug for consistency.

**Example:** `content/blog/pt/meu-novo-artigo.mdx`

```mdx
---
title: "Título do Artigo"
description: "Descrição curta para SEO (120-155 caracteres)"
date: "2026-04-07"
category: "web-development"
slug: "meu-novo-artigo"
alternateSlug: "my-new-article"
locale: "pt"
readingTime: 7
---

Conteúdo em **markdown** aqui.

## Secção

Parágrafos, listas, links, código — tudo funciona.
```

### 2. Frontmatter fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title (used in page title, OG, cards) |
| `description` | Yes | SEO description, 120-155 chars |
| `date` | Yes | Publish date, `YYYY-MM-DD` format |
| `category` | Yes | Category slug (e.g. `web-development`, `ai-automation`, `seo`) |
| `slug` | Yes | URL slug for this locale |
| `alternateSlug` | Yes | Slug of the counterpart post in the other locale (for locale switcher) |
| `locale` | Yes | `pt` or `en` |
| `readingTime` | No | Minutes to read (defaults to 5) |
| `image` | No | Hero image path (e.g. `/blog/my-image.webp`) |

### 3. Write both locales

Always create both PT and EN versions. They don't need to be literal translations — adapt the content for each audience.

- PT: European Portuguese (`contacto`, `telemóvel`, not Brazilian)
- EN: International English

Each post's `alternateSlug` must point to the other locale's `slug`. This enables the locale switcher on blog post pages.

### 4. Deploy

Posts are picked up automatically at build time — just commit and push (or `/ship`). No config changes needed.

## Markdown Features

Standard markdown plus:
- `## Headings` (h2, h3)
- `**bold**`, `*italic*`
- Bullet and numbered lists
- `[links](url)`
- `` `inline code` `` and code blocks
- `> blockquotes`
- `---` horizontal rules
- Images: `![alt](path)`

All elements are styled to match the site's tech aesthetic.

## Where Things Live

| What | Where |
|------|-------|
| Post content | `content/blog/{locale}/` |
| Blog UI text | `app/[lang]/dictionaries/blog-en.json`, `blog-pt.json` |
| Blog utility | `app/[lang]/_lib/blog.ts` |
| Listing page | `app/[lang]/blog/page.tsx` |
| Post page | `app/[lang]/blog/[slug]/page.tsx` |
| Card component | `app/[lang]/_components/blog-card.tsx` |
| Article renderer | `app/[lang]/_components/blog-article.tsx` |
| Blog images | `public/blog/` |

## SEO

Each blog post automatically gets:
- `generateMetadata` with title, description, canonical, hreflang alternates
- OG tags (type: article, publishedTime)
- JSON-LD Article schema
- Sitemap entry (auto-discovered from filesystem)

## Categories in Use

- `web-development`
- `ai-automation`
- `seo`

Add new categories freely — they're just strings in frontmatter.

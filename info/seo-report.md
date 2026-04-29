# SEO Check — SurgeX

_URL: https://www.surgex.pt_
_Checked: 2026-04-29_
_Pages audited: `/en`, `/pt`, `/en/about`, `/pt/about`, `/en/blog/what-is-geo-aeo-ai-search`, `/en/services/geo-aeo`_

## ✅ Passing

### Homepage (`/en` + `/pt`)

- [x] `<title>` set, locale-specific (EN: "SurgeX | Bespoke AI Solutions for Your Business" / PT: "SurgeX | Soluções de IA à Medida...")
- [x] `<meta name="description">` set, ~150 chars, locale-specific
- [x] `<meta name="robots" content="index, follow">`
- [x] `<link rel="canonical">` matches URL
- [x] `og:title`, `og:description`, `og:image`, `og:url`, `og:type=website`, `og:locale` (en_US / pt_PT), `og:site_name=SurgeX`
- [x] `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`
- [x] `<link rel="icon">` → `/favicon.ico`, `apple-touch-icon`, `manifest`
- [x] `<html lang="en">` / `<html lang="pt">` matches route
- [x] Exactly 1 `<h1>`
- [x] No broken images (all 8 imgs render)
- [x] **JSON-LD `@graph`**: WebSite + ProfessionalService linked via `@id` cross-reference (`#website` ↔ `#business`)
- [x] **`sameAs`**: 4 URLs in Organization schema (LinkedIn, Instagram, Facebook, X)
- [x] **FAQPage** schema with 8 Q&As

### `/about` (EN + PT)

- [x] Title/description correctly localized via `aboutPage.meta` dict
- [x] Canonical + OG locale (en_US / pt_PT) match locale
- [x] **JSON-LD `@graph`** with all 4 expected types: `AboutPage` + `Organization` + `Person` + `BreadcrumbList`
- [x] **`@id` cross-references intact**: AboutPage.mainEntity → `#business`, AboutPage.isPartOf → `#website`, Person.worksFor → `#business`, Organization.founder → `#founder`, AboutPage.breadcrumb → `#breadcrumb`
- [x] **Person node**: name (Sebastião Guimarães), jobTitle (Founder & AI Engineer), description (bio), `worksFor`, `knowsAbout` (6 capabilities), `nationality=Portuguese`, `sameAs` to founder LinkedIn
- [x] **Organization node**: foundingDate=2026, logo, full address (Lisbon, PT), 4 sameAs URLs
- [x] **BreadcrumbList**: localized labels (EN: Home > About / PT: Início > Sobre)
- [x] `inLanguage` = `pt-PT` on PT page (correct BCP-47)
- [x] 1 H1 ("About SurgeX." / "Sobre a SurgeX.")

### Blog post (`/en/blog/what-is-geo-aeo-ai-search`)

- [x] **Article schema** with `speakable: { cssSelector: [".quick-answer"] }` — AI engines pointed at the Quick Answer block
- [x] **`.quick-answer` DOM block present** with 50-word direct answer
- [x] **BreadcrumbList**: Home > Blog > Post
- [x] All 7 H2 headings are questions ("How is search changing?", "What is GEO?", etc.)
- [x] `og:type=article`, `og:locale=en_US`, canonical correct
- [x] 1 H1, valid hreflang alternates

### Service page (`/en/services/geo-aeo`)

- [x] 4 JSON-LD scripts: layout `@graph` + Service + FAQPage + BreadcrumbList — all valid
- [x] 1 H1

### Site-wide

- [x] **`/robots.txt`**: 16 AI crawlers explicitly allowed (GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Bytespider, DuckAssistBot, MistralAI-User, cohere-ai, meta-externalagent) + `host` declaration
- [x] **`/llms.txt`**: present at root with business summary
- [x] **`/sitemap.xml`**: includes `/about` for both locales

## ⚠️ Warnings

- **Homepage images: 0 lazy-loaded, 0 with srcset** — 8 images on `/en`, none use `loading="lazy"` or `srcset`. Likely fine if all are above-fold/hero (lazy on above-fold hurts LCP), but worth confirming with PageSpeed Insights. If any are below-fold, add `loading="lazy"` to the relevant `<img>` or migrate to `next/image`.
- **Homepage H1 reads as concatenated text** (`"PREMIUM QUALITY.FAIR PRICES."` in `.textContent`) — visually separate lines, but the merged extracted text could read awkwardly to AI extractors. Consider adding a space or splitting into `<span>`s with whitespace between.
- **`/about` BreadcrumbList has redundant `@context`** inside `@graph` — `buildBreadcrumb` adds `@context` for standalone use, but it's already covered by the parent `@graph`'s `@context`. Valid but noisy. Cosmetic only.

## 📊 Summary

- **42 checks passed**
- **0 failing**
- **3 warnings** (cosmetic / performance)

The AEO sweep is fully live on production. All 3 batches (AI crawlers, /about entity anchor, blog Quick Answer + speakable) verified end-to-end. Schema graph cross-references work as designed: AI engines parsing any of these pages will see the same `#business`/`#website`/`#founder` entities, treating them as one unified brand identity.

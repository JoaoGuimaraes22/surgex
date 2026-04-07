# SEO, AEO & Discoverability — Current State + Roadmap

## What We Have (Implemented)

### Technical SEO
- [x] `generateMetadata` on every page (title, description, canonical, hreflang alternates)
- [x] OG tags on all pages (title, description, image, type, locale, site_name)
- [x] Twitter `summary_large_image` cards on all pages
- [x] JSON-LD schemas:
  - Homepage: `LocalBusiness` + `FAQPage`
  - Blog posts: `Article` (headline, datePublished, author, publisher)
  - Service detail: `Service` (name, description, provider) + `FAQPage` (3 Q&A per service)
  - Services hub: `OfferCatalog` (all 6 services listed)
  - Projects listing: `CollectionPage` + `ItemList` (top 10 projects)
  - Project detail: `WebPage` + `LocalBusiness` about (name, location, aggregateRating)
  - City pages: `ProfessionalService` with `areaServed`
- [x] `generateStaticParams` on all dynamic routes (projects, blog, services, cities) — 159 static pages
- [x] Per-project OG images (portfolio screenshots as OG images)
- [x] Dynamic OG images for blog posts (auto-generated branded 1200x630 PNG via next/og)
- [x] `<html lang>` attribute per locale
- [x] Single H1 per page
- [x] Dynamic `robots.txt` allowing all crawlers
- [x] Dynamic `sitemap.xml` with hreflang alternates (homepage, 60 projects, 3 blog posts, 6 services, 1 city — 150+ URLs)
- [x] 404 page has `noindex` robots directive
- [x] Favicon set (ico, 96px, apple-touch, manifest icons)
- [x] PWA manifest with maskable icons
- [x] Bilingual (PT + EN) with proper locale routing
- [x] `llms.txt` for AI crawler discoverability

### Content SEO
- [x] Blog with 3 SEO-focused posts targeting PT keywords ("website para empresas", "IA para negócios", "SEO local")
- [x] 6 service landing pages with rich structured content
- [x] FAQ section on homepage (8 items with FAQPage schema)
- [x] FAQ on each service page (3 items each)
- [x] Portfolio with 60 projects including location, niche, ratings, review counts
- [x] City SEO page: Carcavelos (15 local projects, aggregate stats, ProfessionalService schema)

### Local SEO Signals
- [x] Location data on all portfolio projects (structured `location` field)
- [x] Physical address in JSON-LD (Lisboa, Portugal)
- [x] Phone number in JSON-LD and contact section
- [x] Google review counts and ratings displayed on projects
- [x] City-specific landing page with `areaServed` schema

---

## Roadmap

### High Priority
- [ ] More blog posts — target local pain points ("quanto custa um website", "como aparecer no Google Maps")
- [x] FAQ schema on service pages (3 FAQ items each — FAQPage JSON-LD on all 6 service detail pages)
- [ ] Google Business Profile — create/claim GBP listing, add services, photos, collect reviews

### Medium Priority
- [ ] City SEO pages for SDR (~10 projects) and Cascais (~5 projects) when density is sufficient
- [ ] Citation building — list SurgeX on PT business directories (Páginas Amarelas, Racius, Infoempresas)
- [ ] Structured data expansion — add `offers` to Service JSON-LD (pricing from 450€), `hasOfferCatalog`
- [ ] Internal linking strategy — blog→services, services→portfolio, portfolio→services

### Nice-to-have
- [ ] BreadcrumbList JSON-LD for nested routes (/services/websites, /projects/gutsy)
- [ ] Dynamic OG images for service detail and city pages (like blog has)
- [ ] Organization JSON-LD with `sameAs` links (LinkedIn, GitHub, etc.)
- [ ] Monitor what ChatGPT/Perplexity say about SurgeX periodically

---

## AI Discoverability (AEO/GEO)

### For SurgeX itself
- [x] `llms.txt` describing the business
- [x] Clear, factual service descriptions extractable by LLMs
- [ ] Build citations on authoritative sites that AI models train on
- [ ] Monitor what ChatGPT/Perplexity say about SurgeX periodically

### As a service we offer clients
- [x] GEO/AEO service page live at `/services/geo-aeo`
- [x] Full landing page with use cases, process, FAQ
- [ ] Develop actual delivery playbook (audit → implement → monitor)
- [ ] Create case study once first client is served

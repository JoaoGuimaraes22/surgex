# SEO, AEO & Discoverability — Current State + Roadmap

## What We Have (Implemented)

### Technical SEO
- [x] `generateMetadata` on every page (title, description, canonical, hreflang alternates)
- [x] OG tags (title, description, image 1200x630, type, locale, site_name)
- [x] Twitter summary_large_image cards
- [x] JSON-LD schemas: ProfessionalService (homepage), Article (blog posts), Service (service pages)
- [x] `<html lang>` attribute per locale
- [x] Single H1 per page
- [x] Dynamic `robots.txt` allowing all crawlers
- [x] Dynamic `sitemap.xml` with hreflang alternates (homepage, projects, blog, services — 50+ URLs)
- [x] Favicon set (ico, 96px, apple-touch, manifest icons)
- [x] PWA manifest with maskable icons
- [x] Bilingual (PT + EN) with proper locale routing

### Content SEO
- [x] Blog with 3 SEO-focused posts targeting PT keywords ("website para empresas", "IA para negócios", "SEO local")
- [x] 6 service landing pages with rich structured content
- [x] FAQ section on homepage (8 items — FAQ schema potential)
- [x] FAQ on each service page (3 items each)
- [x] Portfolio with 16 projects including location, niche, ratings, review counts

### Local SEO Signals
- [x] Location data on all portfolio projects (structured `location` field)
- [x] Physical address in JSON-LD (Lisboa, Portugal)
- [x] Phone number in JSON-LD and contact section
- [x] Google review counts and ratings displayed on projects

---

## What We Should Add (Roadmap)

### High Priority

#### llms.txt
- A `/llms.txt` file that describes the business for AI crawlers
- Tells ChatGPT, Perplexity, etc. what SurgeX is, what we do, where we are
- **Status:** Implemented (`public/llms.txt`)

#### FAQ Schema (JSON-LD)
- `FAQPage` JSON-LD schema on homepage (8 FAQ items)
- Google shows FAQ rich snippets in search results — more SERP real estate
- **Status:** Implemented on homepage. TODO: add to service pages (3 FAQ items each)

#### Blog post images
- Each blog post should have a hero image (`/public/blog/`)
- OG images per post (currently falls back to site-wide og-image.jpg)
- **Status:** Image field exists in frontmatter, no images generated yet

#### Coverage area section
- Dedicated section or page showing areas served with real project map
- References actual project locations (Cascais, Carcavelos, Oeiras, Parede, SDR, Lisboa, etc.)
- Builds local authority without fake city doorway pages
- **Status:** Location data on projects, no dedicated section yet

### Medium Priority

#### Locally-targeted blog posts
- Write posts targeting specific area keywords naturally
- "Como escolher uma agência digital na zona de Cascais"
- "Empresas em Oeiras que já usam IA"
- Links to real portfolio projects in those areas
- **Status:** Not started

#### Google Business Profile
- Create/claim GBP listing for SurgeX
- Link to surgex.pt, add services, photos, posts
- Collect reviews from clients
- **Status:** Unknown

#### Citation building
- List SurgeX on Portuguese business directories
- Páginas Amarelas, Racius, Infoempresas, etc.
- Consistent NAP (Name, Address, Phone) across all listings
- **Status:** Not started

#### Structured data expansion
- Add `offers` to Service JSON-LD (pricing from 450€)
- Add `areaServed` to ProfessionalService schema (list of municipalities)
- Add `hasOfferCatalog` linking services
- **Status:** Basic schemas exist, could be richer

### Lower Priority

#### Open Graph per blog post
- Generate unique OG images per blog post (title + brand overlay)
- Could use Vercel OG or static generation
- **Status:** Not implemented

#### Hreflang on blog posts
- Currently blog post hreflang alternates assume same slug across locales
- Fixed in code with `alternateSlug` frontmatter field
- **Status:** Implemented

#### Internal linking strategy
- Blog posts should link to relevant service pages
- Service pages should link to relevant portfolio projects
- Portfolio projects should link back to service pages
- **Status:** Minimal cross-linking

---

## AI Discoverability (AEO/GEO) Specific

### For SurgeX itself
- [ ] Implement `llms.txt` describing the business
- [ ] Structure homepage content in Q&A format that LLMs can extract
- [ ] Ensure all service descriptions are clear, factual, and extractable
- [ ] Build citations on authoritative sites that AI models train on
- [ ] Monitor what ChatGPT/Perplexity say about SurgeX periodically

### As a service we offer clients
- [x] GEO/AEO service page live at `/services/geo-aeo`
- [x] Full landing page with use cases, process, FAQ
- [ ] Develop actual delivery playbook (audit → implement → monitor)
- [ ] Create case study once first client is served

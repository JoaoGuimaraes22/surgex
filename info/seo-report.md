# SEO Check — SurgeX

_URL: https://www.surgex.pt_
_Checked: 2026-09-25 (post-rebrand; replaces the 2026-04-29 audit)_
_Method: served HTML of 26 pages (both locales of `/`, `/about`, `/services`, `/projects`, `/blog`, `/cities/carcavelos`, the five service pages, one project, one blog post) + a HEAD on every image, favicon, manifest and `og:image`; the two cross-locale blog URLs the sitemap listed were fetched separately. No browser: the site is server-rendered, so meta, JSON-LD and headings are in the response._

## ✅ Passing (503 checks, every page)

- [x] `<title>` locale-specific on every page; no generic titles
- [x] `<meta name="description">` present everywhere, locale-specific; home, projects and project pages within 50–160 chars
- [x] `robots` = `index, follow` on every audited page; `robots.txt` allows all + the AI crawlers
- [x] Canonical present and equal to the page URL on all 26 pages; `hreflang` alternates on every page
- [x] Open Graph: `og:title`, `og:description`, `og:url` (= canonical), `og:type`, `og:locale` (`en_*` / `pt_*` matching the path), `og:image` resolves (200, `image/*`) on every page
- [x] Twitter card (`summary_large_image`), title and description on every page
- [x] JSON-LD valid on every page: `WebSite` + `LocalBusiness` graph on the home and listing pages, `Article` + `BreadcrumbList` on posts, `AboutPage` + `Organization` + `Person` on `/about`, `Service` + `BreadcrumbList` on service pages, `ProfessionalService` on the city page
- [x] `<html lang>` matches the locale; exactly one `<h1>` per page
- [x] Every `<img>` resolves (HEAD 200); all go through `/_next/image` with `srcset`; below-fold images lazy; none over 500 KB
- [x] Favicon and `site.webmanifest` load

## 🔴 Failing — fixed in this pass (deployed with the check)

- [x] **Sitemap listed every blog post under both locales with the same slug** (`/pt/blog/online-booking-automation`, `/en/blog/automacao-marcacoes-online`, …): 24 of the 48 blog URLs were the not-found page. `app/sitemap.ts` now lists a post under its own locale only, with the `alternateSlug` as the other locale's alternate (and `lastModified` = the post date instead of build time).
- [x] **Unknown blog, service and city slugs answered HTTP 200** with the noindex not-found page (a streamed soft 404, e.g. `/pt/blog/nao-existe-xyz`, `/pt/services/nao-existe`). The projects route already had `export const dynamicParams = false` for this reason; the same guard is now on `blog/[slug]`, `services/[slug]` and `cities/[slug]`, so anything outside `generateStaticParams` is a real 404.

## ⚠️ Warnings (25)

- [ ] **Meta descriptions over 160 chars on 17 pages** (Google truncates): `/about` EN 165 · `/services` 184/183 · `/blog` 174/162 · `/cities/carcavelos` 183/191 · `/services/online-presence` 172/171 · `get-found` 172/181 · `customer-care` 180/196 · `social-media` 173/172 · `campaigns` 187/187. Trim to ≤155 when the live copy is reviewed (`tasks/todo.md` § Rebrand: "Review the live copy").
- [ ] `/about` `Organization` node has no `image` (both locales) — add the logo URL once the founder photo / brand assets land.
- [ ] `/cities/carcavelos` `ProfessionalService` node has no `address`, `telephone` or `image` — the city page's schema is thinner than the home `LocalBusiness`; reuse the shared `schemaIds` entity or add the fields when the next city page is built.

## 📊 Summary

| | |
|---|---|
| Pages checked | 26 (+2 cross-locale probes) |
| Checks passed | 503 |
| Failing | 2 site-wide issues, both fixed and shipped 2026-09-25 |
| Warnings | 25 (17 description lengths, 8 schema fields) |

Re-check after the copy review: descriptions, and `curl -s https://www.surgex.pt/sitemap.xml | grep -c blog` should print 26 (2 listings + 24 posts).

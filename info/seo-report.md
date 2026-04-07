## SEO Check — SurgeX
_URL: https://www.surgex.pt_
_Checked: 2026-04-07_

---

### Pages Checked

| Page | PT | EN |
|------|----|----|
| Homepage | `/pt` | `/en` |
| Services | `/pt/services` | `/en/services` |
| Projects | `/pt/projects` | `/en/projects` |
| Blog | `/pt/blog` | `/en/blog` |

---

### ✅ Passing

**Homepage (both locales)**
- [x] `<title>` unique and descriptive per locale
- [x] `<meta name="description">` present, proper length (140 chars EN)
- [x] `<meta name="robots">` set to `index, follow`
- [x] `<link rel="canonical">` correct per locale
- [x] `og:title` matches `<title>`
- [x] `og:description` matches meta description
- [x] `og:image` present and resolves (HTTP 200, image/jpeg)
- [x] `og:url` matches canonical
- [x] `og:type` set to "website"
- [x] `og:locale` correct (`pt_PT` / `en_US`)
- [x] `twitter:card` set to `summary_large_image`
- [x] `twitter:title` and `twitter:description` present
- [x] `<html lang>` matches locale (`pt` / `en`)
- [x] Exactly one `<h1>` per page
- [x] JSON-LD: ProfessionalService schema with name, description, telephone, email, address, image
- [x] JSON-LD: FAQPage schema with 8 questions (valid JSON, proper @type)
- [x] Favicon loads (HTTP 200, `image/vnd.microsoft.icon`)
- [x] `site.webmanifest` loads with correct name, icons (192x192 + 512x512 maskable)
- [x] `robots.txt` allows all, references sitemap
- [x] `sitemap.xml` has localized alternates with hreflang for all pages
- [x] Hreflang `<link>` tags present for both locales
- [x] 0 broken images on homepage (8 total, all load)

**Services (both locales)**
- [x] Unique `<title>` per locale ("Serviços | SurgeX" / "Services | SurgeX")
- [x] Meta description present and descriptive
- [x] Canonical URL correct
- [x] `<html lang>` correct
- [x] Exactly one `<h1>`
- [x] 2 JSON-LD schemas present
- [x] Hreflang tags present
- [x] 0 broken images

**Projects (both locales)**
- [x] Unique `<title>` ("Projetos | SurgeX")
- [x] Meta description present
- [x] Canonical correct
- [x] Exactly one `<h1>`
- [x] 60 of 61 images use `loading="lazy"` (excellent)
- [x] 0 broken images

**Blog (both locales)**
- [x] Unique `<title>` ("Blog | SurgeX")
- [x] Meta description present
- [x] Canonical correct
- [x] Exactly one `<h1>`
- [x] 1 JSON-LD schema present
- [x] 0 broken images

---

### 🔴 Failing

- [ ] **Services pages missing `og:image`** — Both `/pt/services` and `/en/services` have no `og:image` tag. Social shares will show no preview image. **Fix:** Add `openGraph.images` to the services `generateMetadata`.
- [ ] **Services pages missing `og:locale`** — Neither locale sets `og:locale` on services pages. **Fix:** Add `openGraph.locale` to services `generateMetadata`.
- [ ] **Projects pages missing `og:image`** — `/pt/projects` and `/en/projects` have no `og:image`. **Fix:** Add `openGraph.images` to projects `generateMetadata`.
- [ ] **Projects pages missing `og:locale`** — Same as services. **Fix:** Add `openGraph.locale` to projects `generateMetadata`.
- [ ] **Blog pages missing `og:image`** — `/pt/blog` has no `og:image`. **Fix:** Add `openGraph.images` to blog `generateMetadata`.
- [ ] **Blog pages missing `og:locale`** — No `og:locale` on blog pages. **Fix:** Add `openGraph.locale` to blog `generateMetadata`.

---

### ⚠️ Warnings

- [ ] **Homepage images not using `loading="lazy"`** — All 8 homepage images have `loading="auto"`. Above-fold images (logo, hero) are fine, but portfolio images below the fold should use `loading="lazy"`.
- [ ] **No `srcset` on homepage images** — Portfolio images don't use Next.js `<Image>` or `srcset`, serving full-size images to all viewports.

---

### 📊 Summary

- **31 checks passed**
- **6 failing** (missing og:image and og:locale on subpages)
- **2 warnings** (image lazy loading and srcset on homepage)

The homepage SEO is excellent across both locales — all meta tags, OG, Twitter, JSON-LD (ProfessionalService + FAQPage), hreflang, sitemap, and robots are properly configured. The main issues are subpages (services, projects, blog) missing `og:image` and `og:locale` tags, which affects social media sharing previews.

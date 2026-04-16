## SEO Check — SurgeX

_URL: https://www.surgex.pt_
_Checked: 2026-04-16_

### PT locale (`/pt`)

#### Passing
- [x] HTTP 200, `<html lang="pt">`
- [x] Title: "SurgeX | Soluções de IA à Medida para o Seu Negócio" (54 chars)
- [x] Meta description: 158 chars, within 50-160 range
- [x] `robots: index, follow`
- [x] Canonical: `https://www.surgex.pt/pt` (self-referential)
- [x] Hreflang: `en`, `pt`, **`x-default`** all present and point to www
- [x] OG: title, description, image, url, type=website, locale=pt_PT, site_name all set
- [x] OG image loads: HTTP 200, image/jpeg, 99KB
- [x] Twitter: card=summary_large_image, title, description, image all set
- [x] JSON-LD: 2 scripts, valid JSON
  - ProfessionalService with name, description, url, telephone, email, image, address, geo, hours, priceRange, sameAs
  - FAQPage with 8 Q&A entries
- [x] Exactly one `<h1>`
- [x] Favicon loads (ico + 96x96 png + apple-touch-icon)
- [x] site.webmanifest loads (application/manifest+json)
- [x] No broken images (0/8), all have alt text

### EN locale (`/en`)

#### Passing
- [x] HTTP 200, `<html lang="en">`
- [x] Title: "SurgeX | Bespoke AI Solutions for Your Business" (47 chars)
- [x] Meta description: 130 chars
- [x] `robots: index, follow`
- [x] Canonical: `https://www.surgex.pt/en` (self-referential)
- [x] Hreflang: `en`, `pt`, **`x-default` → /pt**
- [x] OG: locale=en_US, all fields set
- [x] Twitter: card=summary_large_image
- [x] JSON-LD: ProfessionalService + FAQPage
- [x] Exactly one `<h1>`

### Warnings

- [ ] Logo `<img src="/sgx-logo.webp" alt="" aria-hidden="true">` has empty alt. This is **intentional and correct** for a decorative logo paired with visible brand text — flagged only for awareness.
- [ ] Above-fold images are eagerly loaded (Next Image `priority`). No lazy-loaded or srcset images detected in initial snapshot — this is expected for a hero-heavy homepage rendered server-side; below-fold images get `loading="lazy"` by default via Next Image.

### Google Search Console context

The two issues originally reported:

1. **"Page with redirect"** for `http://surgex.pt/` and `https://www.surgex.pt/` — informational only. These URLs correctly redirect (http→https, and `/` → `/pt`). Not a bug.
2. **"Duplicate, Google chose different canonical"** for `/pt` — addressed this session by:
   - `x-default` hreflang added
   - proxy.ts locale redirect 307 → 308
   - Vercel apex→www redirect changed to 308 permanent
   - Vercel apex A record updated to current `216.150.1.1`

Next step: Request indexing in Search Console for `/pt` and `/en`, then wait 1-4 weeks for canonical re-consolidation.

### Summary

- **~30 checks passed** across both locales
- **0 failing**
- **2 warnings** (both non-issues — decorative logo alt and lazy-loading note)

SEO configuration is clean. Canonical-consolidation fixes are live; remaining work is Search Console re-indexing + waiting.

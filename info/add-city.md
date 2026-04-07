# Adding a City SEO Page

## When to Add
Only when a city has 5+ deployed projects. Check density with:
```bash
python3 -c "
import json
with open('app/[lang]/dictionaries/en.json') as f:
    d = json.load(f)
from collections import Counter
cities = Counter(p.get('location','') for p in d['portfolio']['projects'])
for city, count in cities.most_common():
    if count >= 3: print(f'  {city}: {count}')
"
```

## Steps

### 1. Add city to dict files

**`app/[lang]/dictionaries/cities-en.json`** — add entry inside `cities`:
```json
"city-slug": {
  "name": "City Name",
  "label": "LOCAL_PORTFOLIO",
  "headline": "Digital Agency in City Name.",
  "description": "Unique 2-sentence copy about the local business scene. Mention neighborhoods, what makes the city tick.",
  "stats": {
    "projects": "X",
    "avgRating": "4.X",
    "totalReviews": "X,XXX+",
    "niches": "X"
  },
  "statsLabels": {
    "projects": "Websites Built",
    "avgRating": "Avg. Google Rating",
    "totalReviews": "Total Client Reviews",
    "niches": "Industries Served"
  },
  "projectsLabel": "OUR_WORK_IN_CITY_NAME",
  "projectsHeadline": "What We've Built Here.",
  "viewProject": "View Project",
  "cta": "Start Your Project in City Name",
  "ctaDescription": "Join X local businesses already standing out online. We'll build you something worth talking about.",
  "ctaButton": "Get in Touch"
}
```

Also update `meta.title` and `meta.description` if they're city-specific (currently shared across all cities — may want per-city meta later).

**`app/[lang]/dictionaries/cities-pt.json`** — same structure, translate all text. Keep `name` and `stats` values identical.

### 2. Compute stats

```bash
python3 -c "
import json
CITY = 'Carcavelos'  # change this
with open('app/[lang]/dictionaries/en.json') as f:
    d = json.load(f)
projects = [p for p in d['portfolio']['projects'] if p.get('location') == CITY]
ratings = [float(p['rating']) for p in projects if p.get('rating')]
reviews = sum(int(p.get('reviewCount','0').replace('+','') or '0') for p in projects)
niches = len(set(p['niche'] for p in projects))
print(f'Projects: {len(projects)}')
print(f'Avg rating: {sum(ratings)/len(ratings):.1f}')
print(f'Total reviews: {reviews:,}+')
print(f'Niches: {niches}')
"
```

### 3. Add slug to route + sitemap

**`app/[lang]/cities/[slug]/page.tsx`** — add to `CITY_SLUGS` array:
```ts
const CITY_SLUGS = ["carcavelos", "new-city-slug"];
```

**`app/sitemap.ts`** — add to `citySlugs` array:
```ts
const citySlugs = ["carcavelos", "new-city-slug"];
```

### 4. Add footer link

In both `en.json` and `pt.json`, add to `footer.links[]`:
```json
{ "label": "City Name", "href": "/{locale}/cities/city-slug" }
```

### 5. Build and verify

```bash
npx next build  # should show /en/cities/new-slug and /pt/cities/new-slug
```

## Notes

- The slug must match the key in the cities dict (`cities.city-slug`)
- Projects are filtered by exact match on `location` field vs `city.name`
- If a city name has variants in the portfolio (e.g. "São Domingos de Rana" vs "SDR"), normalize the `location` field in the portfolio dict first
- JSON-LD uses `ProfessionalService` with `areaServed` for local SEO

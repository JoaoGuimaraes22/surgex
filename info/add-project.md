# Adding a Project to the SurgeX Portfolio

## Quick Steps

1. **Copy og-image** from the project into surgex-ai:
   ```bash
   cp projects/{dirname}/public/og-image.jpg internal/surgex-ai/public/portfolio/{dirname}.jpg
   ```

2. **Add entry to EN dict** (`app/[lang]/dictionaries/en.json` → `portfolio.projects[]`):
   ```json
   {
     "id": "{dirname}",
     "name": "Business Name",
     "category": "Website",
     "image": "/portfolio/{dirname}.jpg",
     "url": "https://{vercel-url}",
     "description": "One-line EN description of the business.",
     "services": ["Web Design", "SEO", "Google Reviews Integration", "Multi-language"],
     "niche": "Niche Name",
     "location": "City",
     "reviewCount": "123+",
     "rating": "4.8"
   }
   ```
   Insert in alphabetical order by niche, then by name within the niche group.

3. **Add entry to PT dict** (`app/[lang]/dictionaries/pt.json` → `portfolio.projects[]`):
   - Same entry, but translate `description` and `niche` to Portuguese
   - Keep `id`, `name`, `image`, `url`, `category`, `services`, `location`, `reviewCount`, `rating` identical

4. **If it's a new niche** (not already in the portfolio):
   - Add to `projectsPage.nicheNav[]` in both EN and PT dicts
   - EN: `{ "id": "niche-slug", "label": "Niche Name" }`
   - PT: `{ "id": "niche-slug", "label": "Nome do Nicho" }` (same `id`, translated `label`)
   - The `id` is always English-based: lowercase, spaces→hyphens, `&`→hyphen (e.g. "Bar & Nightlife" → "bar-nightlife")
   - Insert in alphabetical order by English niche name

5. **Update counts** in both dicts:
   - `projectsPage.projectCount` — EN: `"X projects across Y industries"`, PT: `"X projetos em Y setores"`

## Niche → PT Translation Reference

| EN | PT | Nav ID |
|---|---|---|
| Accounting | Contabilidade | accounting |
| Auto Body | Pintura Auto | auto-body |
| Auto Detailing | Detailing Auto | auto-detailing |
| Bar & Nightlife | Bar & Noite | bar-nightlife |
| Car Dealership | Stand Automóvel | car-dealership |
| Chiropractic | Quiroprática | chiropractic |
| Cleaning | Limpeza | cleaning |
| Dental | Dentista | dental |
| Dog Training | Treino Canino | dog-training |
| Electrician | Eletricista | electrician |
| Fitness | Fitness | fitness |
| Head Spa | Head Spa | head-spa |
| HVAC | AVAC | hvac |
| Junk Removal | Recolha de Entulho | junk-removal |
| Landscaping | Jardinagem | landscaping |
| Laundry | Lavandaria | laundry |
| Mechanic | Mecânica | mechanic |
| Physiotherapy | Fisioterapia | physiotherapy |
| Plumbing | Canalização | plumbing |
| Pool & Spa | Piscina & Spa | pool-spa |
| Real Estate | Imobiliária | real-estate |
| Restaurant | Restaurante | restaurant |
| Salon | Salão | salon |
| Tattoo | Tatuagem | tattoo |
| Veterinary | Veterinária | veterinary |

## Services Tags

Pick from: `Web Design`, `SEO`, `Google Reviews Integration`, `Multi-language`, `Gallery`, `Appointment Booking`, `Reservation System`

## Notes

- The `id` field must match the dirname used for the image file
- Projects are grouped by niche on the page — the gallery component groups by `niche` field
- Section IDs on the page use the `nicheNav[].id` (English-based), not the translated niche name
- Homepage shows first 6 unique niches from the portfolio array — reorder if you want different homepage representation
- Sitemap auto-generates from the portfolio array — no manual sitemap changes needed

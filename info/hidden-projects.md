# Temporarily Hidden Projects

Projects hidden from the portfolio while prospects are in active sales conversations.

## Currently Hidden

- `revicar` — Revicar (interested, 2026-04-15)
- `vet-lpda` — LPDA Carcavelos (interested, 2026-04-15)
- `laundry-grace` — Grace Laundry (interested, 2026-04-15)
- `barbershop-specialone` — Special One Barbershop (interested, 2026-04-15)

## How to Add/Remove

Search for `HIDDEN_IDS` across these 4 files:

1. `app/[lang]/_components/portfolio.tsx` — homepage featured grid
2. `app/[lang]/_components/projects-gallery.tsx` — /projects gallery page
3. `app/[lang]/projects/[id]/page.tsx` — individual project detail + static params
4. `app/sitemap.ts` — XML sitemap

Each file has a `HIDDEN_IDS` array at the top. Add or remove project IDs from the array.

**To hide a project:** add its `id` (from the dict `portfolio.projects` array) to all 4 `HIDDEN_IDS` arrays.

**To unhide a project:** remove its `id` from all 4 arrays. When the array is empty, delete the `HIDDEN_IDS` lines and the filter calls entirely.

Redeploy after changes.

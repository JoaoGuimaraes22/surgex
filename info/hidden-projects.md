# Temporarily Hidden Projects

Projects hidden from the portfolio while prospects are in active sales conversations.

## Currently Hidden

The list lives in code: `HIDDEN_PROJECT_IDS` in `app/[lang]/_lib/hidden-projects.ts` (2026-09-30: `revicar`, `laundry-grace`, `barbershop-specialone`, `harvey`, `mm-detalhe`, `autobody-jpautopaint`).

## How to Add/Remove

Add or remove the id (from the dict `portfolio.projects` array) in `HIDDEN_PROJECT_IDS` — the one source. The homepage grid, the /projects gallery and index, the project pages (and their static params) and the city pages all filter through `visibleProjects` / `isHiddenProject`.

Project detail pages are `noindex` and out of the sitemap since 2026-09-30 (thin demo pages that ranked for the businesses' own names), so hiding is about visitors, not search.

Redeploy after changes.

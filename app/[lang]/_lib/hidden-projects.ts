/**
 * Demo projects kept out of the public site while their prospect is in active
 * talks (they shouldn't find "their" demo on surgex.pt before we've closed).
 * Single source of truth — gallery, sitemap, project pages, city pages and the
 * projects index all filter through here. Remove an id once the deal is done.
 */
export const HIDDEN_PROJECT_IDS: readonly string[] = [
  "revicar",
  "laundry-grace",
  "barbershop-specialone",
  "harvey",
  "mm-detalhe",
  "autobody-jpautopaint",
];

export function isHiddenProject(id: string): boolean {
  return HIDDEN_PROJECT_IDS.includes(id);
}

export function visibleProjects<T extends { id: string }>(projects: T[]): T[] {
  return projects.filter((p) => !isHiddenProject(p.id));
}

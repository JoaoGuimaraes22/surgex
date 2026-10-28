/**
 * Matching key for a niche label: the projects' `niche` and the nav pills'
 * `label` are typed separately, so accents and case must not break the link
 * between a pill and its section ("Veterinaria" vs "Veterinária").
 */
export function nicheKey(label: string): string {
  return label.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

/** Nav pills that have at least one listed project (a hidden demo can empty a niche). */
export function navWithProjects<T extends { label: string }>(
  nav: readonly T[],
  projects: readonly { niche: string }[],
): T[] {
  const keys = new Set(projects.map((p) => nicheKey(p.niche)));
  return nav.filter((n) => keys.has(nicheKey(n.label)));
}

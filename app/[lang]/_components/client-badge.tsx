/** «Cliente» tag on a portfolio card whose entry has `client: true` (a live client site, not a demo). */
export default function ClientBadge({ label }: { label: string }) {
  return (
    <span className="absolute top-4 left-4 border border-foreground/40 bg-background/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[2px] text-foreground backdrop-blur-sm">
      {label}
    </span>
  );
}

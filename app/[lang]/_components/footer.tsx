export default function Footer({
  dict,
}: {
  dict: {
    brand: string;
    version: string;
    copyright: string;
    links: { label: string; href: string }[];
  };
}) {
  return (
    <footer className="overflow-hidden border-t border-muted/20 bg-background px-10 py-12">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        {/* Brand */}
        <div className="text-sm font-bold uppercase tracking-[4px]">
          {dict.brand}{" "}
          <span className="font-normal text-muted">{dict.version}</span>
        </div>

        {/* Nav links */}
        <nav className="flex gap-8">
          {dict.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[10px] uppercase tracking-[2px] text-muted transition-colors duration-300 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Copyright */}
      <div className="mt-8 font-mono text-[8px] uppercase tracking-[2px] text-muted">
        {dict.copyright}
      </div>
    </footer>
  );
}

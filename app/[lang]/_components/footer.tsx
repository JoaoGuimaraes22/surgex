export default function Footer({
  dict,
}: {
  dict: {
    brand: string;
    version: string;
    copyright: string;
    links: { label: string; href: string }[];
    legal?: { label: string; href: string }[];
  };
}) {
  return (
    <footer className="relative z-[5] overflow-hidden border-t border-muted/20 px-6 pt-12 pb-32 md:px-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        {/* Brand */}
        <div className="text-sm font-bold uppercase tracking-[4px]">
          {dict.brand}{" "}
          <span className="font-normal text-muted">{dict.version}</span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap gap-x-8 gap-y-3">
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

      {/* Copyright + Legal */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="font-mono text-[8px] uppercase tracking-[2px] text-muted">
          {dict.copyright}
        </div>
        {dict.legal && (
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {dict.legal.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[8px] uppercase tracking-[2px] text-muted/60 transition-colors duration-300 hover:text-muted"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}

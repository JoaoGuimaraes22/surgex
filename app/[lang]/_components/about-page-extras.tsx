import Link from "next/link";

type ServiceItem = { title: string; description: string; href: string };

export default function AboutPageExtras({
  dict,
}: {
  dict: {
    hero: {
      label: string;
      headline: string;
      subheadline: string;
    };
    whatWeDo: {
      label: string;
      headline: string;
      description: string;
      services: ServiceItem[];
      cta: string;
      ctaHref: string;
    };
    location: {
      label: string;
      headline: string;
      description: string;
      cityLabel: string;
      city: string;
      country: string;
      emailLabel: string;
      email: string;
      phoneLabel: string;
      phone: string;
    };
    connect: {
      label: string;
      headline: string;
      description: string;
      links: { label: string; href: string }[];
    };
  };
}) {
  return (
    <>
      <section className="relative z-[5] overflow-hidden px-10 pt-32 pb-16">
        <span className="font-mono text-[9px] uppercase tracking-[2px] text-muted">
          {dict.hero.label}
        </span>
        <h1
          className="mt-4 font-sans font-extralight leading-[0.9] tracking-[-1px]"
          style={{ fontSize: "clamp(40px, 7vw, 96px)" }}
        >
          {dict.hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
          {dict.hero.subheadline}
        </p>
      </section>

      <section className="relative z-[5] overflow-hidden px-10 py-16">
        <div className="mb-12">
          <span className="font-mono text-[9px] uppercase tracking-[2px] text-muted">
            {dict.whatWeDo.label}
          </span>
          <h2
            className="mt-4 font-sans font-extralight leading-[0.9] tracking-[-1px]"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            {dict.whatWeDo.headline}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            {dict.whatWeDo.description}
          </p>
        </div>
        <div className="grid gap-px md:grid-cols-2 lg:grid-cols-3">
          {dict.whatWeDo.services.map((service, i) => (
            <Link
              key={service.href}
              href={service.href}
              className="group relative border border-muted/20 p-8 transition-colors duration-300 hover:border-foreground/40"
            >
              <span className="font-mono text-[10px] tracking-[2px] text-muted">
                ({String(i + 1).padStart(2, "0")})
              </span>
              <h3 className="mt-6 text-xl font-light tracking-[-0.5px]">
                {service.title}
              </h3>
              <div className="my-5 h-px w-12 bg-muted transition-all duration-500 group-hover:w-full group-hover:bg-foreground" />
              <p className="text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
        <Link
          href={dict.whatWeDo.ctaHref}
          className="mt-10 inline-block font-mono text-[10px] uppercase tracking-[2px] text-muted transition-colors duration-300 hover:text-foreground"
        >
          → {dict.whatWeDo.cta}
        </Link>
      </section>

      <section className="relative z-[5] overflow-hidden px-10 py-16">
        <div className="grid gap-px md:grid-cols-2">
          <div className="border border-muted/20 p-10">
            <span className="font-mono text-[9px] uppercase tracking-[2px] text-muted">
              {dict.location.label}
            </span>
            <h2
              className="mt-4 font-sans font-extralight leading-[0.9] tracking-[-1px]"
              style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
            >
              {dict.location.headline}
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              {dict.location.description}
            </p>
          </div>
          <div className="border border-muted/20 p-10">
            <dl className="space-y-6 font-mono text-[10px] uppercase tracking-[2px]">
              <div>
                <dt className="text-muted">{dict.location.cityLabel}</dt>
                <dd className="mt-1 text-foreground">
                  {dict.location.city}, {dict.location.country}
                </dd>
              </div>
              <div>
                <dt className="text-muted">{dict.location.emailLabel}</dt>
                <dd className="mt-1 text-foreground">
                  <a
                    href={`mailto:${dict.location.email}`}
                    className="hover:underline"
                  >
                    {dict.location.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-muted">{dict.location.phoneLabel}</dt>
                <dd className="mt-1 text-foreground">{dict.location.phone}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="relative z-[5] overflow-hidden px-10 py-16">
        <span className="font-mono text-[9px] uppercase tracking-[2px] text-muted">
          {dict.connect.label}
        </span>
        <h2
          className="mt-4 font-sans font-extralight leading-[0.9] tracking-[-1px]"
          style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
        >
          {dict.connect.headline}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          {dict.connect.description}
        </p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {dict.connect.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="me noopener"
                className="border border-muted/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[2px] text-muted transition-colors duration-300 hover:border-foreground/40 hover:text-foreground"
              >
                {link.label} →
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

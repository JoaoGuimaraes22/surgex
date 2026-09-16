import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const cspHeader = `
  default-src 'self';
  connect-src 'self' https://formspree.io;
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://formspree.io;
  frame-src 'self' https://www.google.com https://maps.google.com https://*.vercel.app;
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

/** 2026-09 rebrand: six service pages became five pillars. Old URLs 301 to the closest pillar. */
const LEGACY_SERVICE_REDIRECTS: Record<string, string> = {
  "ai-solutions": "customer-care",
  websites: "online-presence",
  automation: "customer-care",
  marketing: "social-media",
  "geo-aeo": "get-found",
};

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...Object.entries(LEGACY_SERVICE_REDIRECTS).map(([from, to]) => ({
        source: `/:lang(en|pt)/services/${from}`,
        destination: `/:lang/services/${to}`,
        permanent: true,
      })),
      {
        source: "/:lang(en|pt)/services/training",
        destination: "/:lang/services",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 2678400, // 31 days — local images never change
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [16, 32, 48, 64, 128, 256],
  },
  async headers() {
    return [
      {
        // Hidden partner pages (public/partners/*.html): unguessable URLs, never indexed.
        source: "/partners/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, "").replace(/\s{2,}/g, " ").trim(),
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=()" },
        ],
      },
    ];
  },
};

export default nextConfig;

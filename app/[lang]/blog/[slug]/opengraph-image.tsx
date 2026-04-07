import { ImageResponse } from "next/og";
import { getPostBySlug, getAllPosts } from "../../_lib/blog";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of ["en", "pt"] as const) {
    for (const post of getAllPosts(lang)) {
      params.push({ lang, slug: post.slug });
    }
  }
  return params;
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = getPostBySlug(lang, slug);

  const title = post?.title ?? "SurgeX Blog";
  const category = post?.category?.replace(/-/g, " ").toUpperCase() ?? "BLOG";
  const date = post?.date
    ? new Date(post.date).toLocaleDateString(lang === "pt" ? "pt-PT" : "en-US", {
        year: "numeric",
        month: "long",
      })
    : "";

  // Load Inter font
  const interBold = await fetch(
    new URL("https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf")
  ).then((res) => res.arrayBuffer());

  const interLight = await fetch(
    new URL("https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyfMZg.ttf")
  ).then((res) => res.arrayBuffer());

  const jetbrains = await fetch(
    new URL("https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.ttf")
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          color: "#ffffff",
          padding: "60px 70px",
        }}
      >
        {/* Top: category + date */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: 14,
              letterSpacing: "3px",
              color: "#888888",
              textTransform: "uppercase",
            }}
          >
            {category}
          </span>
          <span
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: 13,
              color: "#666666",
            }}
          >
            {date}
          </span>
        </div>

        {/* Center: title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1
            style={{
              fontFamily: "Inter Light",
              fontSize: title.length > 60 ? 42 : title.length > 40 ? 50 : 58,
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-1px",
              margin: 0,
              maxWidth: "900px",
            }}
          >
            {title}
          </h1>
          <div style={{ display: "flex", width: 60, height: 1, backgroundColor: "#888888" }} />
        </div>

        {/* Bottom: brand */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span
            style={{
              fontFamily: "Inter Bold",
              fontSize: 22,
              letterSpacing: "4px",
              fontWeight: 700,
            }}
          >
            SURGEX
          </span>
          <span
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: 13,
              color: "#666666",
            }}
          >
            surgex.pt/blog
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter Light", data: interLight, weight: 300 },
        { name: "Inter Bold", data: interBold, weight: 700 },
        { name: "JetBrains Mono", data: jetbrains, weight: 400 },
      ],
    }
  );
}

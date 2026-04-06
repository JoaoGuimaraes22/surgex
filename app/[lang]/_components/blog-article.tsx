import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { JSX } from "react";

type Comp<T extends keyof JSX.IntrinsicElements> = (
  props: JSX.IntrinsicElements[T]
) => React.ReactNode;

const mdxComponents = {
  h2: ((props) => (
    <h2
      className="mt-10 mb-4 text-2xl font-light tracking-[-0.5px]"
      {...props}
    />
  )) as Comp<"h2">,
  h3: ((props) => (
    <h3 className="mt-8 mb-3 text-xl font-light" {...props} />
  )) as Comp<"h3">,
  p: ((props) => (
    <p className="mb-6 text-base leading-relaxed text-muted" {...props} />
  )) as Comp<"p">,
  ul: ((props) => (
    <ul
      className="mb-6 ml-6 list-disc space-y-2 text-muted"
      {...props}
    />
  )) as Comp<"ul">,
  ol: ((props) => (
    <ol
      className="mb-6 ml-6 list-decimal space-y-2 text-muted"
      {...props}
    />
  )) as Comp<"ol">,
  a: ((props) => (
    <a
      className="text-foreground underline underline-offset-4 hover:text-muted"
      {...props}
    />
  )) as Comp<"a">,
  blockquote: ((props) => (
    <blockquote
      className="my-8 border-l-2 border-foreground/30 pl-6 italic text-muted"
      {...props}
    />
  )) as Comp<"blockquote">,
  code: ((props) => (
    <code
      className="bg-muted/10 px-1.5 py-0.5 font-mono text-sm"
      {...props}
    />
  )) as Comp<"code">,
  pre: ((props) => (
    <pre
      className="my-6 overflow-x-auto border border-muted/20 bg-muted/5 p-6 font-mono text-sm"
      {...props}
    />
  )) as Comp<"pre">,
  hr: () => <hr className="my-12 border-muted/20" />,
  strong: ((props) => (
    <strong className="text-foreground font-medium" {...props} />
  )) as Comp<"strong">,
};

export default function BlogArticle({
  post,
  dict,
  lang,
}: {
  post: {
    title: string;
    description: string;
    date: string;
    category: string;
    readingTime: number;
    content: string;
    locale: string;
  };
  dict: {
    backToBlog: string;
    publishedOn: string;
    category: string;
    minuteRead: string;
  };
  lang: string;
}) {
  const formattedDate = new Intl.DateTimeFormat(
    lang === "pt" ? "pt-PT" : "en-GB",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  ).format(new Date(post.date));

  return (
    <article className="relative z-[5] overflow-hidden px-6 pt-32 pb-24">
      <div className="mx-auto max-w-prose">
        {/* Meta labels */}
        <div className="mb-6 flex flex-wrap items-center gap-4 font-mono text-[9px] uppercase tracking-[2px] text-muted">
          <time dateTime={post.date}>{formattedDate}</time>
          <span>·</span>
          <span>{post.category}</span>
          <span>·</span>
          <span>
            {post.readingTime} {dict.minuteRead}
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-sans font-extralight leading-[1.1] tracking-[-1px]"
          style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
        >
          {post.title}
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
          {post.description}
        </p>

        {/* Divider */}
        <div className="my-8 h-px w-16 bg-muted" />

        {/* MDX Content */}
        <MDXRemote source={post.content} components={mdxComponents} />

        {/* Back to Blog CTA */}
        <div className="mt-16">
          <Link
            href={`/${lang}/blog`}
            className="group inline-flex items-center gap-5 transition-transform duration-300 ease-out hover:translate-x-[10px]"
          >
            <span className="text-xs uppercase tracking-[3px] text-muted transition-colors duration-300 group-hover:text-foreground">
              {dict.backToBlog}
            </span>
            <div className="h-px w-[60px] bg-foreground transition-all duration-300 group-hover:w-[100px]" />
          </Link>
        </div>
      </div>
    </article>
  );
}

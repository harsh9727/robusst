import type { ComponentProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import markdownStyles from "~/styles/markdown-styles.module.css";
import type { SanityBlogPost } from "~/types/sanity/blog";

const components: ComponentProps<typeof PortableText>["components"] = {
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const external = /^https?:\/\//.test(href);
      return external ? (
        <a
          href={href}
          aria-label={value?.ariaLabel}
          target={value?.openInNewTab ? "_blank" : undefined}
          rel={value?.openInNewTab ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      ) : (
        <Link href={href} aria-label={value?.ariaLabel}>
          {children}
        </Link>
      );
    },
  },
  types: {
    contentImage: ({ value }) =>
      value?.url ? (
        <figure className="markdown-figure">
          <Image
            src={value.url}
            alt={value.alt ?? ""}
            width={1200}
            height={675}
            className="h-auto w-full"
          />
          {value.caption && (
            <figcaption className="markdown-figcaption">
              {value.caption}
            </figcaption>
          )}
        </figure>
      ) : null,
    imageGallery: ({ value }) => (
      <figure>
        <div className="grid gap-4 sm:grid-cols-2">
          {(value?.images ?? []).map(
            (image: { url?: string; alt?: string }, index: number) =>
              image.url ? (
                <Image
                  key={`${image.url}-${index}`}
                  src={image.url}
                  alt={image.alt ?? ""}
                  width={800}
                  height={600}
                  className="h-auto w-full rounded-lg"
                />
              ) : null,
          )}
        </div>
        {value?.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
    contentTable: ({ value }) => (
      <div className="overflow-x-auto">
        <table>
          <caption>{value?.caption}</caption>
          <tbody>
            {(value?.rows ?? []).map(
              (row: { _key?: string; cells?: string[] }, rowIndex: number) => (
                <tr key={row._key ?? rowIndex}>
                  {(row.cells ?? []).map((cell, cellIndex) => {
                    const Cell =
                      value?.firstRowIsHeader && rowIndex === 0 ? "th" : "td";
                    return <Cell key={`${rowIndex}-${cellIndex}`}>{cell}</Cell>;
                  })}
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    ),
    callout: ({ value }) => (
      <aside data-tone={value?.tone} className="rounded-lg border p-5">
        {value?.title && <strong>{value.title}</strong>}
        {Array.isArray(value?.body) && <PortableText value={value.body} />}
      </aside>
    ),
    callToAction: ({ value }) =>
      value?.link?.href ? (
        <Link href={value.link.href} aria-label={value.link.ariaLabel}>
          {value.link.label}
        </Link>
      ) : null,
    codeBlock: ({ value }) => (
      <pre>
        <code data-language={value?.language}>{value?.code}</code>
      </pre>
    ),
    embed: ({ value }) =>
      value?.url ? (
        <figure>
          <iframe
            src={value.url}
            title={value.title ?? ""}
            loading="lazy"
            className="aspect-video w-full"
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      ) : null,
  },
};

export function BlogPortableText({ body }: { body: SanityBlogPost["body"] }) {
  return (
    <div className={markdownStyles.markdown}>
      <PortableText value={body} components={components} />
    </div>
  );
}

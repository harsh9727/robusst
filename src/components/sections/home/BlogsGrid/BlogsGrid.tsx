import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCmsBlogList } from "~/lib/cms/client";

interface BlogsGridProps {
  locale: string;
}

// Async Server Component — fetches the 3 latest blog posts from the CMS.
export const BlogsGrid = async ({ locale }: BlogsGridProps) => {
  const allPosts = await getCmsBlogList(locale);
  const latestPosts = (allPosts ?? []).slice(0, 3);

  return (
    <div className="relative w-full overflow-hidden px-6 py-16 sm:px-12 sm:py-20 lg:px-25 lg:py-25">
      <section className="relative flex w-full flex-col gap-8">
        {/* Header row */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-primary-foreground text-xl leading-tight font-medium sm:text-2xl lg:text-4xl">
            Latest AI Insights &amp; Blogs
          </p>

          <Link
            href={`/${locale}/blogs`}
            className="text-muted-foreground hover:text-primary-foreground flex items-center gap-1 text-sm transition-colors"
          >
            View all articles
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Blog cards */}
        {latestPosts.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No blog posts found. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => {
              const primaryKeyword =
                post.meta?.primaryKeyword ?? post.tags[0] ?? null;
              const formattedDate = new Date(
                post.publishedAt,
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              return (
                <Link
                  key={post.slug}
                  href={`/${locale}/blogs/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                >
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    {/* Meta */}
                    <p className="text-muted-foreground text-xs">
                      {formattedDate}
                      {primaryKeyword && (
                        <>
                          {" "}
                          &middot;{" "}
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
                            {primaryKeyword}
                          </span>
                        </>
                      )}
                    </p>

                    {/* Title */}
                    <h3 className="text-primary-foreground line-clamp-2 text-base leading-snug font-semibold sm:text-lg">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground line-clamp-3 flex-1 text-sm leading-relaxed">
                      {post.excerpt ?? ""}
                    </p>

                    {/* CTA */}
                    <span className="text-brand-one mt-2 flex items-center gap-1 text-sm font-medium">
                      Read article
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

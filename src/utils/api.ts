import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

// types
import type { Blog } from "~/types";

const blogsDirectory = join(process.cwd(), "public/blogs");

export function getBlogSlugs() {
  return fs.readdirSync(blogsDirectory);
}

export function getBlogBySlug(slug: string): Blog | null {
  try {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(blogsDirectory, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    // Strip any leading whitespace/newlines so gray-matter always sees
    // the "---" front-matter delimiter as the very first character.
    const rawContents = fs.readFileSync(fullPath, "utf8");
    const fileContents = rawContents.replace(/^\s+/, "");

    const { data, content } = matter(fileContents);

    // Guard: a file whose front-matter wasn't parsed yields no title /
    // coverImage, which would produce blank or broken UI cards.
    if (!data.title || !data.coverImage) {
      console.warn(
        `[api] Skipping "${realSlug}" — missing required front-matter fields (title, coverImage).`,
      );
      return null;
    }

    return { ...data, slug: realSlug, content } as Blog;
  } catch (error) {
    console.error(`Error loading blog ${slug}:`, error);
    return null;
  }
}

export function getAllBlogs(): Blog[] {
  const slugs = getBlogSlugs();
  const blogs = slugs
    .map((slug) => getBlogBySlug(slug))
    .filter((blog): blog is Blog => blog !== null)
    // sort blogs by date in descending order
    .sort((blog1, blog2) => (blog1.date > blog2.date ? -1 : 1));
  return blogs;
}

// Enhanced SEO utility functions
export function generateBlogSEO(blog: Blog, baseUrl: string) {
  const blogUrl = `${baseUrl}/blogs/${blog.slug}`;
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(blog.title ?? "")}&excerpt=${encodeURIComponent(blog.excerpt ?? "")}`;

  return {
    title: blog.metaTitle ?? `${blog.title} | Robusst Blog`,
    description: blog.metaDescription ?? blog.excerpt ?? "",
    url: blogUrl,
    ogImage: ogImageUrl,
    keywords: [
      blog.primaryKeyword,
      ...(blog.secondaryKeywords ?? []),
      "Telecom AI Solutions",
      "B2B Technology",
      "Robusst Insights",
      "Digital Transformation",
      "Enterprise Technology",
    ].filter(Boolean),
  };
}

// Get related blogs based on tags or keywords
export function getRelatedBlogs(currentBlog: Blog, limit = 3): Blog[] {
  const allBlogs = getAllBlogs().filter(
    (blog) => blog.slug !== currentBlog.slug,
  );

  if (allBlogs.length === 0) return [];

  // Build word-level token set for the current blog
  const currentTokens = new Set(
    [currentBlog.primaryKeyword, ...(currentBlog.secondaryKeywords ?? [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length > 3),
  );

  if (currentTokens.size === 0) {
    return allBlogs.slice(0, limit);
  }

  // Score every candidate blog by token overlap, then sort best-first
  const scored = allBlogs
    .map((blog) => {
      const blogTokens = new Set(
        [blog.primaryKeyword, ...(blog.secondaryKeywords ?? [])]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .split(/\W+/)
          .filter((w) => w.length > 3),
      );

      let relevance = 0;
      for (const token of currentTokens) {
        if (blogTokens.has(token)) relevance++;
      }

      return { blog, relevance };
    })
    .sort((a, b) => b.relevance - a.relevance);

  // Return top `limit` — high-relevance first, recent blogs fill any gap
  return scored.slice(0, limit).map((item) => item.blog);
}

// Search functionality
export function searchBlogs(query: string): Blog[] {
  const allBlogs = getAllBlogs();
  const searchTerms = query
    .toLowerCase()
    .split(" ")
    .filter((term) => term.length > 2);

  if (searchTerms.length === 0) {
    return allBlogs;
  }

  return allBlogs
    .map((blog) => {
      const searchContent = [
        blog.title,
        blog.excerpt,
        blog.primaryKeyword,
        ...(blog.secondaryKeywords ?? []),
        blog.content,
      ]
        .join(" ")
        .toLowerCase();

      const matches = searchTerms.filter((term) =>
        searchContent.includes(term),
      ).length;

      return {
        blog,
        relevance: matches,
      };
    })
    .filter((item) => item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .map((item) => item.blog);
}

// Get blogs by category/tag
export function getBlogsByKeyword(keyword: string): Blog[] {
  const allBlogs = getAllBlogs();
  const searchKeyword = keyword.toLowerCase();

  return allBlogs.filter((blog) => {
    const blogKeywords = [
      blog.primaryKeyword,
      ...(blog.secondaryKeywords ?? []),
    ]
      .filter(Boolean)
      .map((k) => k?.toLowerCase());

    return blogKeywords.some((k) => k?.includes(searchKeyword));
  });
}

// Get featured blogs
export function getFeaturedBlogs(limit = 5): Blog[] {
  return getAllBlogs().slice(0, limit);
}

// Get recent blogs
export function getRecentBlogs(limit = 5): Blog[] {
  return getAllBlogs().slice(0, limit);
}

// Utility to calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Enhanced blog data with reading time and other metadata
export function getEnhancedBlogBySlug(
  slug: string,
): (Blog & { readingTime: number; wordCount: number }) | null {
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return null;
  }

  const wordCount = blog.content.split(/\s+/).length;
  const readingTime = calculateReadingTime(blog.content);

  return {
    ...blog,
    readingTime,
    wordCount,
  };
}

import { getDiscoveryContent } from "~/sanity/queries/discovery";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
export const revalidate = 300;

function clean(value: string | null | undefined) {
  return value?.replace(/\s+/g, " ").trim() ?? "";
}

function localizedUrl(href: string | null) {
  if (!href) return baseUrl;
  return href.startsWith("/")
    ? `${baseUrl}/en${href === "/" ? "" : href}`
    : href;
}

export async function GET() {
  const data = await getDiscoveryContent("en");
  if (!data.site || !data.solutions || !data.home)
    return new Response("Discovery content is unavailable.\n", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  const lines = [
    `# ${clean(data.site.siteName)}`,
    "",
    `> ${clean(data.site.organizationDescription)}`,
    "",
    clean(data.site.tagline),
    "",
    `## ${clean(data.solutions.heading)}`,
    "",
    clean(data.solutions.description),
    "",
  ];
  for (const solution of data.solutions.items ?? [])
    lines.push(
      `### ${clean(solution.title)}`,
      `URL: ${localizedUrl(solution.href)}`,
      "",
      clean(solution.description),
      "",
    );
  if (data.home.results) {
    lines.push(
      `## ${clean(data.home.results.title)}`,
      "",
      clean(data.home.results.description),
      "",
    );
    for (const result of data.home.results.items ?? [])
      lines.push(`- ${clean(result.value)} ${clean(result.title)}`);
    lines.push("");
  }
  if (data.home.industries) {
    lines.push(
      `## ${clean(data.home.industries.title)}`,
      "",
      clean(data.home.industries.description),
      "",
    );
    for (const industry of data.home.industries.items ?? [])
      lines.push(
        `- **${clean(industry.title)}** — ${clean(industry.description)}`,
      );
    lines.push("");
  }
  if (data.home.presence)
    lines.push(
      `## ${clean(data.home.presence.title)}`,
      "",
      clean(data.home.presence.subtitle),
      "",
      ...(data.home.presence.labels ?? []).map((label) => `- ${clean(label)}`),
      "",
    );
  if (data.home.storiesHeading) {
    lines.push(
      `## ${clean(data.home.storiesHeading)}`,
      "",
      `URL: ${baseUrl}/en/stories`,
      "",
    );
    for (const story of data.stories)
      lines.push(
        `### ${clean(story.title)}`,
        clean(story.customerName),
        "",
        clean(story.summary),
        "",
      );
  }
  if (data.home.blogsHeading) {
    lines.push(
      `## ${clean(data.home.blogsHeading)}`,
      "",
      `URL: ${baseUrl}/en/blogs`,
      "",
    );
    for (const post of data.blogs)
      lines.push(
        `- [${clean(post.title)}](${baseUrl}/en/blogs/${post.slug}) — ${clean(post.excerpt)}`,
      );
    lines.push("");
  }
  lines.push(`## ${clean(data.site.quickLinksHeading)}`, "");
  for (const link of [
    ...(data.site.primaryNavigation ?? []),
    ...(data.site.solutionLinks ?? []),
  ])
    lines.push(`- [${clean(link.label)}](${localizedUrl(link.href)})`);
  lines.push(
    baseUrl + "/sitemap.xml",
    "",
    `## ${clean(data.site.socialLinksHeading)}`,
    "",
  );
  for (const link of data.site.socialLinks ?? [])
    lines.push(`- [${clean(link.label)}](${link.href})`);
  if (data.site.contactEmail)
    lines.push(
      "",
      `[${data.site.contactEmail}](mailto:${data.site.contactEmail})`,
    );
  return new Response(`${lines.join("\n").trim()}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}

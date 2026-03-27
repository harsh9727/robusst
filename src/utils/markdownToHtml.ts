import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function markdownToHtml(markdown: any) {
  const result = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: true })
     
    .process(markdown);

  let htmlString = result.toString();

  // 1) Replace <p><img></p>\n<p><strong>Source:</strong> <a href="...">Label</a></p>
  htmlString = htmlString.replace(
    /<p>\s*(<img[^>]+>)\s*<\/p>\s*<p>\s*(?:<strong>\s*Source:\s*<\/strong>\s*)?<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>\s*<\/p>/gi,
    (_m, imgTag, href, linkText) =>
      `<figure class="markdown-figure">${imgTag}<figcaption class="markdown-figcaption"><a href="${href}" rel="noopener noreferrer" target="_blank">${linkText}</a></figcaption></figure>`,
  );

  // 2) Replace case when image and caption are in the same paragraph:
  //    <p><img ...> <strong>Source:</strong> <a href="...">Label</a></p>
  htmlString = htmlString.replace(
    /<p>\s*(<img[^>]+>)\s*(?:<strong>\s*Source:\s*<\/strong>\s*)?<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>\s*<\/p>/gi,
    (_m, imgTag, href, linkText) =>
      `<figure class="markdown-figure">${imgTag}<figcaption class="markdown-figcaption"><a href="${href}" rel="noopener noreferrer" target="_blank">${linkText}</a></figcaption></figure>`,
  );

  // 3) Replace <p><img></p>\n<p><strong>Image description:</strong> text</p>
  //    (Image description without a link - just plain text)
  htmlString = htmlString.replace(
    /<p>\s*(<img[^>]+>)\s*<\/p>\s*<p>\s*<strong>\s*Image description:\s*<\/strong>\s*(.*?)<\/p>/gi,
    (_m, imgTag, description) =>
      `<figure class="markdown-figure">${imgTag}<figcaption class="markdown-figcaption">${description}</figcaption></figure>`,
  );

  // 4) Replace case when image and description are in the same paragraph:
  //    <p><img ...> <strong>Image description:</strong> text</p>
  htmlString = htmlString.replace(
    /<p>\s*(<img[^>]+>)\s*<strong>\s*Image description:\s*<\/strong>\s*(.*?)<\/p>/gi,
    (_m, imgTag, description) =>
      `<figure class="markdown-figure">${imgTag}<figcaption class="markdown-figcaption">${description}</figcaption></figure>`,
  );

  // 5) Handle Alt Text removal (optional cleanup)
  //    Remove standalone <p><strong>Alt Text:</strong> ...</p> paragraphs
  //    since alt text should be in the img tag, not as visible caption
  htmlString = htmlString.replace(
    /<p>\s*<strong>\s*Alt Text:\s*<\/strong>\s*.*?<\/p>/gi,
    "",
  );

  return htmlString;
}

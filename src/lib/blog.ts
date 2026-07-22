import fs from "fs";
import path from "path";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  image?: string;
};

const blogDir = path.join(process.cwd(), "src", "content", "blog");

export function getBlogPosts(): BlogPost[] {
  try {
    const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));

    const posts = files.map((file) => {
      const slug = file.replace(".mdx", "");
      const content = fs.readFileSync(path.join(blogDir, file), "utf-8");
      const metadata = parseFrontmatter(content);

      return {
        slug,
        title: metadata.title || slug,
        date: metadata.date || "",
        category: metadata.category || "general",
        excerpt: metadata.excerpt || "",
        content: metadata.body || content,
        image: metadata.image,
      };
    });

    return posts.sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch {
    return [];
  }
}

export function getBlogPost(slug: string): BlogPost | null {
  const posts = getBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getBlogPosts().filter((p) => p.category === category);
}

function parseFrontmatter(content: string): Record<string, string> & { body: string } {
  const result: Record<string, string> = {};
  let body = content;

  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (match) {
    const frontmatter = match[1];
    body = match[2].trim();

    frontmatter.split("\n").forEach((line) => {
      const sep = line.indexOf(":");
      if (sep > 0) {
        const key = line.slice(0, sep).trim();
        const value = line.slice(sep + 1).trim().replace(/^["']|["']$/g, "");
        result[key] = value;
      }
    });
  }

  return Object.assign(result, { body });
}

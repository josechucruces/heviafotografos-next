import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { getAlternates } from "@/lib/seo";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import BlogPostingSchema from "@/components/BlogPostingSchema";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return {};

  return {
    title: `${post.title} - Hevia Fotógrafos`,
    description: post.excerpt,
    alternates: getAlternates(`/es/blog/${post.slug}`),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [{ url: post.image, width: 1200, height: 630 }] : [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const t = await getTranslations("blog");
  const post = getBlogPost(slug);

  if (!post) notFound();

  const baseUrl = "https://www.heviafotografos.com";

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Inicio", url: `${baseUrl}/es` },
        { name: "Blog", url: `${baseUrl}/es/blog` },
        { name: post.title, url: `${baseUrl}/es/blog/${post.slug}` },
      ]} />
      {post.image && (
        <BlogPostingSchema
          title={post.title}
          description={post.excerpt}
          date={post.date}
          image={post.image}
          url={`${baseUrl}/es/blog/${post.slug}`}
        />
      )}
      <div className="max-w-3xl mx-auto px-4 py-16">
      <Link href="/es/blog" className="text-amber-600 hover:underline mb-8 inline-block">
        &larr; Volver al blog
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-sm text-gray-500">
            {post.date && <span>{post.date}</span>}
          </div>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700">
          {post.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{line.replace("## ", "")}</h2>;
            }
            if (line.startsWith("### ")) {
              return <h3 key={i} className="text-xl font-bold mt-6 mb-3">{line.replace("### ", "")}</h3>;
            }
            if (line.startsWith("![") && line.includes("](")) {
              const alt = line.match(/\[(.*?)\]/)?.[1] || "";
              const src = line.match(/\((.*?)\)/)?.[1] || "";
              return (
                <Image
                  key={i}
                  src={src}
                  alt={alt}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full rounded-lg my-6"
                  style={{ height: "auto" }}
                  loading="lazy"
                />
              );
            }
            if (line.trim() === "") return null;
            return <p key={i} className="mb-4">{line}</p>;
          })}
        </div>
      </article>
    </div>
    </>
  );
}

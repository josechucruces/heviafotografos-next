import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getAlternates } from "@/lib/seo";
import { getBlogPosts } from "@/lib/blog";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog");
  return {
    title: t("title"),
    description: t("description"),
    alternates: getAlternates("/es/blog"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPage() {
  const t = await getTranslations("blog");
  const posts = getBlogPosts();

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "https://www.heviafotografos.com/es" },
        { name: "Blog", url: "https://www.heviafotografos.com/es/blog" },
      ]} />
      <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-lg text-gray-600 mb-12">{t("description")}</p>

      <div className="space-y-12">
        {posts.length === 0 && (
          <p className="text-gray-500">{t("noPosts")}</p>
        )}
        {posts.map((post) => (
          <article key={post.slug} className="flex gap-6 border-b border-gray-200 pb-8">
            {post.image && (
              <Link href={`/es/blog/${post.slug}`} className="shrink-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={192}
                  height={128}
                  className="object-cover rounded-lg"
                  loading="lazy"
                />
              </Link>
            )}
            <div className="flex-1 min-w-0">
              <Link href={`/es/blog/${post.slug}`} className="group">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-amber-600 transition-colors">
                  {post.title}
                </h2>
              </Link>
              <div className="text-sm text-gray-500 mb-4">
                {post.date}
              </div>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link
                href={`/es/blog/${post.slug}`}
                className="text-amber-600 font-medium hover:underline"
              >
                {t("readMore")} &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
      </div>
    </>
  );
}

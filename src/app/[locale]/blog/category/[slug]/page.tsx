import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getBlogPostsByCategory } from "@/lib/blog";
import { getAlternates } from "@/lib/seo";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

type Props = {
  params: Promise<{ slug: string }>;
};

const validCategories = ["general"];

export async function generateStaticParams() {
  return validCategories.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTranslations("blog");
  return {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} - ${t("title")}`,
    description: t("description"),
    alternates: getAlternates(`/es/blog/category/${slug}`),
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const t = await getTranslations("blog");

  if (!validCategories.includes(slug)) notFound();

  const posts = getBlogPostsByCategory(slug);
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "https://www.heviafotografos.com/es" },
        { name: "Blog", url: "https://www.heviafotografos.com/es/blog" },
        { name: categoryName, url: `https://www.heviafotografos.com/es/blog/category/${slug}` },
      ]} />
      <div className="max-w-5xl mx-auto px-4 py-16">
      <Link href="/es/blog" className="text-amber-600 hover:underline mb-8 inline-block">
        &larr; {t("allPosts")}
      </Link>

      <h1 className="text-4xl font-bold mb-4">{categoryName}</h1>
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
              <div className="text-sm text-gray-500 mb-4">{post.date}</div>
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

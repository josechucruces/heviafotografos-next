import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";

const baseUrl = "https://www.heviafotografos.com";

const staticPages = [
  { path: "/es", lastModified: new Date(), priority: 1.0 },
  { path: "/es/nosotros", lastModified: new Date(), priority: 0.8 },
  { path: "/es/galerias/boda", lastModified: new Date(), priority: 0.9 },
  { path: "/es/galerias/comuniones", lastModified: new Date(), priority: 0.9 },
  { path: "/es/galerias/publicidad", lastModified: new Date(), priority: 0.9 },
  { path: "/es/blog", lastModified: new Date(), priority: 0.8 },
  { path: "/es/contacto", lastModified: new Date(), priority: 0.7 },
  { path: "/es/legal", lastModified: new Date(), priority: 0.3 },
  { path: "/es/cookies", lastModified: new Date(), priority: 0.3 },
  { path: "/es/privacy", lastModified: new Date(), priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getBlogPosts().map((post) => ({
    url: `${baseUrl}/es/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    priority: 0.6 as const,
    images: post.image ? [post.image] : undefined,
  }));

  const blogCategories = [
    "general",
  ].map((cat) => ({
    url: `${baseUrl}/es/blog/category/${cat}`,
    lastModified: new Date(),
    priority: 0.5 as const,
  }));

  const galleryImages: [string, string][] = [
    ["/es/galerias/boda", "/content/img/boda/_cover.webp"],
    ["/es/galerias/comuniones", "/content/img/comuniones/_cover.webp"],
    ["/es/galerias/publicidad", "/content/img/publicidad/_cover.webp"],
  ];

  return [
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page.path}`,
      lastModified: page.lastModified,
      priority: page.priority,
    })),
    ...blogPosts,
    ...blogCategories,
    ...galleryImages.map(([path, image]) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      priority: 0.9 as const,
      images: [image],
    })),
  ];
}

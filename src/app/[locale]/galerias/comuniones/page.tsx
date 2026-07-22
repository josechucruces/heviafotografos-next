import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAlternates } from "@/lib/seo";
import GalleryGrid from "@/components/GalleryGrid";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("gallery");
  return {
    title: t("communionTitle"),
    description: t("communionDescription"),
    alternates: getAlternates("/es/galerias/comuniones"),
    openGraph: {
      title: t("communionTitle"),
      description: t("communionDescription"),
      images: [{ url: "/content/img/comuniones/_cover.webp", width: 1200, height: 800 }],
    },
  };
}

export default async function ComunionesPage() {
  const t = await getTranslations("gallery");

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "https://www.heviafotografos.com/es" },
        { name: "Galerías", url: "https://www.heviafotografos.com/es/galerias/comuniones" },
        { name: "Comuniones", url: "https://www.heviafotografos.com/es/galerias/comuniones" },
      ]} />
      <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">{t("communionTitle")}</h1>
      <p className="text-lg text-gray-600 mb-12">{t("communionDescription")}</p>
      <GalleryGrid folder="comuniones" />
      </div>
    </>
  );
}

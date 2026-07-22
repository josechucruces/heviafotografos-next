import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAlternates } from "@/lib/seo";
import GalleryGrid from "@/components/GalleryGrid";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("gallery");
  return {
    title: t("advertisingTitle"),
    description: t("advertisingDescription"),
    alternates: getAlternates("/es/galerias/publicidad"),
    openGraph: {
      title: t("advertisingTitle"),
      description: t("advertisingDescription"),
      images: [{ url: "/content/img/publicidad/_cover.webp", width: 1200, height: 800 }],
    },
  };
}

export default async function PublicidadPage() {
  const t = await getTranslations("gallery");

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "https://www.heviafotografos.com/es" },
        { name: "Galerías", url: "https://www.heviafotografos.com/es/galerias/publicidad" },
        { name: "Publicidad", url: "https://www.heviafotografos.com/es/galerias/publicidad" },
      ]} />
      <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">{t("advertisingTitle")}</h1>
      <p className="text-lg text-gray-600 mb-12">{t("advertisingDescription")}</p>
      <GalleryGrid folder="publicidad" />
      </div>
    </>
  );
}

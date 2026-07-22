import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="flex flex-col items-center justify-center py-32 px-4">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">{t("title")}</h2>
      <p className="text-gray-600 mb-8">{t("description")}</p>
      <Link
        href="/es"
        className="bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
      >
        {t("goHome")}
      </Link>
    </div>
  );
}

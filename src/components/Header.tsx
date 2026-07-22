"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const locale = "es";
  const isActive = (path: string) => pathname === `/${locale}${path}`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="text-xl font-bold tracking-tight">
            Hevia Fotógrafos
          </Link>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href={`/${locale}`}
              className={`text-sm font-medium transition-colors hover:text-amber-600 ${isActive("") ? "text-amber-600" : "text-gray-700"}`}
            >
              {t("welcome")}
            </Link>
            <Link
              href={`/${locale}/nosotros`}
              className={`text-sm font-medium transition-colors hover:text-amber-600 ${isActive("/nosotros") ? "text-amber-600" : "text-gray-700"}`}
            >
              {t("about")}
            </Link>

            <div
              className="relative py-2"
              onMouseEnter={() => setGalleryOpen(true)}
              onMouseLeave={() => setGalleryOpen(false)}
            >
              <span className="text-sm font-medium text-gray-700 cursor-pointer hover:text-amber-600 transition-colors">
                {t("galleries")}
              </span>
              {galleryOpen && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 min-w-40">
                  <Link href={`/${locale}/galerias/boda`} className="block px-4 py-2 text-sm text-gray-700 hover:text-amber-600 hover:bg-gray-50">
                    {t("galleryWedding")}
                  </Link>
                  <Link href={`/${locale}/galerias/comuniones`} className="block px-4 py-2 text-sm text-gray-700 hover:text-amber-600 hover:bg-gray-50">
                    {t("galleryCommunion")}
                  </Link>
                  <Link href={`/${locale}/galerias/publicidad`} className="block px-4 py-2 text-sm text-gray-700 hover:text-amber-600 hover:bg-gray-50">
                    {t("galleryAdvertising")}
                  </Link>
                </div>
              )}
            </div>

            <Link
              href={`/${locale}/blog`}
              className={`text-sm font-medium transition-colors hover:text-amber-600 ${isActive("/blog") ? "text-amber-600" : "text-gray-700"}`}
            >
              {t("blog")}
            </Link>

            <Link
              href={`/${locale}/contacto`}
              className={`text-sm font-medium transition-colors hover:text-amber-600 ${isActive("/contacto") ? "text-amber-600" : "text-gray-700"}`}
            >
              {t("contact")}
            </Link>
          </nav>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4">
            <Link href={`/${locale}`} className="block py-2 text-sm text-gray-700" onClick={() => setMenuOpen(false)}>
              {t("welcome")}
            </Link>
            <Link href={`/${locale}/nosotros`} className="block py-2 text-sm text-gray-700" onClick={() => setMenuOpen(false)}>
              {t("about")}
            </Link>
            <div className="py-2">
              <span className="text-sm font-medium text-gray-700">{t("galleries")}</span>
              <div className="pl-4 mt-1 space-y-1">
                <Link href={`/${locale}/galerias/boda`} className="block py-1 text-sm text-gray-600" onClick={() => setMenuOpen(false)}>
                  {t("galleryWedding")}
                </Link>
                <Link href={`/${locale}/galerias/comuniones`} className="block py-1 text-sm text-gray-600" onClick={() => setMenuOpen(false)}>
                  {t("galleryCommunion")}
                </Link>
                <Link href={`/${locale}/galerias/publicidad`} className="block py-1 text-sm text-gray-600" onClick={() => setMenuOpen(false)}>
                  {t("galleryAdvertising")}
                </Link>
              </div>
            </div>
            <Link href={`/${locale}/blog`} className="block py-2 text-sm text-gray-700" onClick={() => setMenuOpen(false)}>
              {t("blog")}
            </Link>
            <Link href={`/${locale}/contacto`} className="block py-2 text-sm text-gray-700" onClick={() => setMenuOpen(false)}>
              {t("contact")}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

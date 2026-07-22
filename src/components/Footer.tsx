import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const c = useTranslations("common");

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Hevia Fotógrafos</h3>
            <p className="text-sm text-gray-400">
              Fotografía de bodas, comuniones y publicidad en Asturias.
              Más de 30 años capturando momentos especiales.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-medium">Arriondas:</span> c/Severo Ochoa, 8
              </li>
              <li>
                <a href="tel:+34985840055" className="hover:text-amber-400 transition-colors">
                  {c("phone1")}
                </a>
              </li>
              <li>
                <a href="tel:+34678827190" className="hover:text-amber-400 transition-colors">
                  {c("phone2")}
                </a>
              </li>
              <li>
                <a href="mailto:tamihevia@gmail.com" className="hover:text-amber-400 transition-colors">
                  {c("email")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/es/nosotros" className="hover:text-amber-400 transition-colors">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/es/blog" className="hover:text-amber-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/es/contacto" className="hover:text-amber-400 transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/es/legal" className="hover:text-amber-400 transition-colors">
                  {t("legal")}
                </Link>
              </li>
              <li>
                <Link href="/es/cookies" className="hover:text-amber-400 transition-colors">
                  {t("cookies")}
                </Link>
              </li>
              <li>
                <Link href="/es/privacy" className="hover:text-amber-400 transition-colors">
                  {t("privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Hevia Fotógrafos. {t("rights")}.
        </div>
      </div>
    </footer>
  );
}

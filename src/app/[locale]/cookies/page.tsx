import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAlternates } from "@/lib/seo";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cookies");
  return {
    title: t("title"),
    description: "Política de Cookies de Hevia Fotógrafos",
    alternates: getAlternates("/es/cookies"),
  };
}

export default function CookiesPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "https://www.heviafotografos.com/es" },
        { name: "Política de Cookies", url: "https://www.heviafotografos.com/es/cookies" },
      ]} />
      <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Política de Cookies</h1>

      <div className="prose prose-lg text-gray-700">
        <h2>¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que los sitios web almacenan en el navegador
          del usuario para recordar información sobre su visita.
        </p>

        <h2>Tipos de cookies utilizadas</h2>
        <ul>
          <li><strong>Cookies técnicas:</strong> Necesarias para el funcionamiento del sitio web.</li>
          <li><strong>Cookies de análisis:</strong> Utilizamos Vercel Analytics para entender cómo
          se utiliza el sitio web de forma anónima.</li>
        </ul>

        <h2>Gestión de cookies</h2>
        <p>
          Puedes configurar tu navegador para rechazar todas las cookies o para indicar cuándo
          se envía una cookie. Sin embargo, algunas funciones del sitio pueden no funcionar
          correctamente.
        </p>

        <h2>Cookies de terceros</h2>
        <p>
          Este sitio web utiliza Vercel Analytics, que puede instalar cookies para recopilar
          datos anónimos de navegación con fines estadísticos.
        </p>

        <h2>Más información</h2>
        <p>
          Si tienes dudas sobre nuestra política de cookies, puedes contactarnos en
          tamihevia@gmail.com.
        </p>
      </div>
      </div>
    </>
  );
}

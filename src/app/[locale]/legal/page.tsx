import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAlternates } from "@/lib/seo";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal");
  return {
    title: t("title"),
    description: "Aviso Legal de Hevia Fotógrafos",
    alternates: getAlternates("/es/legal"),
  };
}

export default function LegalPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "https://www.heviafotografos.com/es" },
        { name: "Aviso Legal", url: "https://www.heviafotografos.com/es/legal" },
      ]} />
      <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Aviso Legal</h1>

      <div className="prose prose-lg text-gray-700">
        <h2>Identificación del titular</h2>
        <p>
          En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002,
          de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico,
          a continuación se exponen los datos identificativos del titular del sitio web heviafotografos.com:
        </p>
        <ul>
          <li><strong>Titular:</strong> José Cruces Suárez</li>
          <li><strong>NIF:</strong> ---</li>
          <li><strong>Dirección:</strong> c/Severo Ochoa, 8, 33540 Arriondas, Asturias</li>
          <li><strong>Teléfono:</strong> 985 84 00 55</li>
          <li><strong>Email:</strong> tamihevia@gmail.com</li>
        </ul>

        <h2>Propiedad intelectual e industrial</h2>
        <p>
          Todos los contenidos del sitio web, incluyendo sin carácter limitativo, textos, imágenes,
          gráficos, logotipos, iconos, software y demás elementos susceptibles de protección, son
          propiedad intelectual de Hevia Fotógrafos, a menos que se indique lo contrario.
        </p>
        <p>
          Queda prohibida la reproducción, distribución, comunicación pública o transformación de
          los contenidos sin la autorización expresa del titular.
        </p>

        <h2>Enlaces externos</h2>
        <p>
          Este sitio web puede contener enlaces a sitios web de terceros. Hevia Fotógrafos no se
          hace responsable del contenido ni de las políticas de privacidad de estos sitios.
        </p>

        <h2>Legislación aplicable</h2>
        <p>
          Las presentes condiciones se rigen por la legislación española. Para cualquier
          controversia que pudiera derivarse, las partes se someten a los juzgados y tribunales
          de Asturias.
        </p>
      </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAlternates } from "@/lib/seo";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("privacy");
  return {
    title: t("title"),
    description: "Política de Privacidad de Hevia Fotógrafos",
    alternates: getAlternates("/es/privacy"),
  };
}

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "https://www.heviafotografos.com/es" },
        { name: "Política de Privacidad", url: "https://www.heviafotografos.com/es/privacy" },
      ]} />
      <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>

      <div className="prose prose-lg text-gray-700">
        <h2>Responsable del tratamiento</h2>
        <p>
          <strong>Identidad:</strong> José Cruces Suárez<br />
          <strong>Email:</strong> tamihevia@gmail.com<br />
          <strong>Dirección:</strong> c/Severo Ochoa, 8, 33540 Arriondas, Asturias
        </p>

        <h2>Finalidad del tratamiento de datos</h2>
        <p>
          En Hevia Fotógrafos tratamos los datos personales que nos proporcionas con las
          siguientes finalidades:
        </p>
        <ul>
          <li>Gestionar las consultas y solicitudes de información que nos realices a través del formulario de contacto.</li>
          <li>Enviar comunicaciones comerciales sobre nuestros servicios, siempre que hayas prestado tu consentimiento.</li>
        </ul>

        <h2>Legitimación</h2>
        <p>
          El tratamiento de tus datos se realiza basándonos en tu consentimiento expreso al
          aceptar nuestra política de privacidad y al enviar el formulario de contacto.
        </p>

        <h2>Destinatarios</h2>
        <p>
          No cedemos tus datos personales a terceros, salvo obligación legal.
        </p>

        <h2>Derechos</h2>
        <p>
          Tienes derecho a acceder, rectificar, suprimir, limitar el tratamiento, oponerte al
          tratamiento y solicitar la portabilidad de tus datos. Para ejercer estos derechos,
          puedes contactarnos en tamihevia@gmail.com.
        </p>

        <h2>Plazo de conservación</h2>
        <p>
          Conservaremos tus datos personales mientras sean necesarios para las finalidades para
          las que fueron recogidos, y posteriormente durante los plazos legales establecidos.
        </p>
      </div>
      </div>
    </>
  );
}

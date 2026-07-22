import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getAlternates } from "@/lib/seo";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");
  return {
    title: t("title"),
    description: t("description"),
    alternates: getAlternates("/es/nosotros"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [{ url: "/content/img/web/nosotros.webp", width: 1200, height: 800 }],
    },
  };
}

export default async function NosotrosPage() {
  const t = await getTranslations("about");
  const c = await getTranslations("common");

  return (
    <div>
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "https://www.heviafotografos.com/es" },
        { name: "Nosotros", url: "https://www.heviafotografos.com/es/nosotros" },
      ]} />
      <section className="relative h-[50vh] bg-black overflow-hidden">
        <Image
          src="/content/img/web/background_nosotros.webp"
          alt="Hevia Fotógrafos estudio"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white z-10 px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("heading")}</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Un equipo, una familia, una historia dedicada a la fotografía
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg text-gray-700 max-w-none">
          <p className="text-xl text-gray-500 italic leading-relaxed">
            Bienvenido a nuestra casa, bienvenido a nuestro estudio de fotógrafos en Asturias.
            Puedes entrar sin llamar, y siempre que quieras…
          </p>

          <p>
            <strong>Hevia Fotógrafos</strong> somos un equipo, una familia. Llevamos la fotografía
            en la sangre desde siempre — nuestros abuelos, bisabuelos y padres ya eran fotógrafos.
            La fotografía forma parte de nuestro ADN, es para nosotros mucho más que una profesión,
            es un estilo de vida.
          </p>

          <p>
            Hoy, <strong>Tamara Hevia</strong> y <strong>José Cruces</strong> continuamos este
            legado con la misma pasión de siempre. Ella, heredera de una saga de fotógrafos; él,
            su compañero de vida y de trabajo. Juntos formamos un equipo joven y dinámico, donde
            cada uno tiene su misión, y nos entregamos en cuerpo y alma a cada historia que nos
            confiáis.
          </p>

          <p>
            Amamos nuestra profesión. Sentimos cada imagen, nos involucramos con cada historia,
            nos emocionamos, nos divertimos y sentimos con vosotros. Necesitamos sentir para
            transmitir, por eso nuestro trato es cercano y familiar.
          </p>

          <p>
            Aportamos la seguridad que dan muchos años de profesión, siempre estudiando, avanzando
            e intentando ofrecer las últimas novedades. Tenemos la ventaja de ser un equipo joven
            y dinámico, en el que cada miembro tiene una misión o una parcela, a la que se dedica
            en cuerpo y alma, para vosotros.
          </p>

          <p>
            Nuestro estilo se basa en la naturalidad, los sentimientos, el <em>feeling</em>.
            Cuidamos especialmente la luz, las composiciones limpias, directas y elegantes.
            Buscamos ese <strong>instante decisivo</strong> donde los sentimientos fluyen, los
            captamos y los hacemos eternos.
          </p>

          <p>
            Como fotógrafos de bodas en Asturias contamos con productora propia de vídeo,
            laboratorio profesional, y lo más importante, unos profesionales altamente cualificados,
            y siempre de casa, sin subcontratas ni aprendices, solo nosotros.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros estudios</h2>
          <div className="flex justify-center">
            <div className="bg-white rounded-lg p-8 shadow-sm max-w-md">
              <h3 className="text-xl font-bold mb-3 text-amber-700">Arriondas</h3>
              <p className="text-gray-600">c/Severo Ochoa, 8<br />33540 Arriondas, Asturias</p>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-6">
            Pero nuestro trabajo se realiza donde tú estés. No ponemos límites a los
            desplazamientos — los nuevos retos nos encantan.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg text-gray-700 max-w-none">
          <p>
            Somos ante todo fotógrafos de personas, de historias. Nuestra especialidad son los
            reportajes de boda, el estudio, las comuniones y los niños — que tienen un lugar muy
            destacado en esta casa y suelen crecer con nosotros. También hacemos publicidad, una
            faceta que en los últimos tiempos nos está dando muchas satisfacciones.
          </p>

          <p>
            Confía en nosotros para captar los instantes más preciados de tu vida. Porque somos
            fotógrafos profesionales con años de experiencia, y porque sabemos captar la esencia
            de los momentos, la magia y la profundidad que cada imagen necesita.
          </p>

          <div className="flex justify-center my-12">
            <Image
              src="/content/img/web/nosotros.webp"
              alt="Tamara Hevia y José Cruces - Hevia Fotógrafos"
              width={400}
              height={266}
              className="rounded-lg shadow-md"
            />
          </div>

          <p className="text-center text-lg text-gray-500 font-semibold">
            Muchas gracias por visitarnos.
          </p>

          <p className="text-center text-xl text-amber-700 font-bold">
            Hevia Fotógrafos
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Contacto</h2>
          <ul className="space-y-3 text-gray-600">
            <li><strong>Teléfono:</strong> <a href="tel:+34985840055" className="text-amber-600 hover:underline">{c("phone1")}</a> / <a href="tel:+34678827190" className="text-amber-600 hover:underline">{c("phone2")}</a></li>
            <li><strong>Email:</strong> <a href="mailto:tamihevia@gmail.com" className="text-amber-600 hover:underline">{c("email")}</a></li>
          </ul>
        </div>
      </section>
    </div>
  );
}

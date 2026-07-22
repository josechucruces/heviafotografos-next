import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  return {
    title: t("title"),
    description: t("description"),
    alternates: getAlternates("/es"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

const services = [
  {
    title: "Bodas",
    href: "/es/galerias/boda",
    desc: "Fotografía de bodas natural y emocional",
    img: "/content/img/boda/boda-01.webp",
  },
  {
    title: "Comuniones",
    href: "/es/galerias/comuniones",
    desc: "Sesiones de comunión únicas",
    img: "/content/img/comuniones/comunion-01.webp",
  },
  {
    title: "Publicidad",
    href: "/es/galerias/publicidad",
    desc: "Fotografía publicitaria profesional",
    img: "/content/img/publicidad/publicidad-01.webp",
  },
];

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <div>
      <section className="relative h-[70vh] bg-black overflow-hidden">
        <Image
          src="/content/img/web/fotografos_boda_asturias_hevia_fotografos_arriondas_tamara_hevia_fotografia_1036.webp"
          alt="Hevia Fotógrafos"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30 z-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white z-20 px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Hevia Fotógrafos</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
              Fotografía de bodas, comuniones y publicidad en Asturias
            </p>
            <div className="mt-8 flex gap-4 justify-center">
              <Link
                href="/es/galerias/boda"
                className="bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
              >
                Ver galerías
              </Link>
              <Link
                href="/es/contacto"
                className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                {t("contact")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <a
            href="/es/blog/lucia-se-casa"
            className="group relative block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            <img
              src="/content/img/blog/lucia-se-casa-1.webp"
              alt="Fotógrafos de boda Asturias"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                FOTÓGRAFOS DE BODA ASTURIAS
              </h3>
            </div>
          </a>

          <a
            href="/es/blog/natalia-steve-y-claudia-una-post-boda-de-playa-en-familia"
            className="group relative block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            <img
              src="/content/img/blog/natalia-steve-y-claudia-una-post-boda-de-playa-en-familia-1.webp"
              alt="Fotógrafos de boda Cantabria"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                FOTÓGRAFOS DE BODA CANTABRIA
              </h3>
            </div>
          </a>

          <a
            href="/es/blog/fotos-de-comunion-diferentes-parte-2"
            className="group relative block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            <img
              src="/content/img/web/fotografos_comunion_asturias.webp"
              alt="Fotógrafos de comunión Asturias"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                FOTÓGRAFOS DE COMUNIÓN ASTURIAS
              </h3>
            </div>
          </a>
        </div>

        <h2 className="text-3xl font-bold text-center mb-8">Bienvenido a Hevia Fotógrafos</h2>
        <div className="prose prose-lg mx-auto text-gray-600">
          <p>
            Somos un estudio fotográfico con más de 30 años de experiencia en el sector.
            Nuestra pasión es capturar los momentos más importantes de vuestra vida con
            naturalidad y emoción.
          </p>
          <p>
            Trabajamos en toda Asturias, con estudio en Arriondas.
            Especializados en fotografía de bodas, comuniones, publicidad y sesiones de estudio.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Testimonios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { text: "Increíble trabajo, captaron cada momento de nuestra boda con una naturalidad única.", name: "María & Carlos" },
            { text: "Profesionales y cercanos. Las fotos de comunión de nuestra hija son espectaculares.", name: "Ana García" },
            { text: "Los mejores fotógrafos de Asturias. Repetiremos sin dudarlo.", name: "Laura & Pablo" },
            { text: "Trato excelente y resultados impresionantes. Muy recomendables.", name: "David Martínez" },
          ].map((testimonial) => (
            <div key={testimonial.name} className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 italic mb-4">&ldquo;{testimonial.text}&rdquo;</p>
              <p className="font-semibold text-sm">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Afiliaciones</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <span className="text-lg font-semibold text-gray-500">MyWed</span>
            <span className="text-lg font-semibold text-gray-500">Fearless Photographers</span>
            <span className="text-lg font-semibold text-gray-500">Inspiration Photographers</span>
          </div>
        </div>
      </section>
    </div>
  );
}

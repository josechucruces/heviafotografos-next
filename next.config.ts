import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
  },
  async redirects() {
    return [
      {
        source: "/lang/es/bienvenido",
        destination: "/es",
        permanent: true,
      },
      {
        source: "/lang/es/nosotros",
        destination: "/es/nosotros",
        permanent: true,
      },
      {
        source: "/lang/es/galerias",
        destination: "/es/galerias",
        permanent: true,
      },
      {
        source: "/lang/es/galerias/boda",
        destination: "/es/galerias/boda",
        permanent: true,
      },
      {
        source: "/lang/es/galerias/comuniones",
        destination: "/es/galerias/comuniones",
        permanent: true,
      },
      {
        source: "/lang/es/galerias/publicidad",
        destination: "/es/galerias/publicidad",
        permanent: true,
      },
      {
        source: "/lang/es/contactar",
        destination: "/es/contacto",
        permanent: true,
      },
      {
        source: "/lang/es/blog",
        destination: "/es/blog",
        permanent: true,
      },
      {
        source: "/lang/es/blog/:slug*",
        destination: "/es/blog/:slug*",
        permanent: true,
      },
      {
        source: "/lang/es/blog/category/:cat*",
        destination: "/es/blog/category/:cat*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

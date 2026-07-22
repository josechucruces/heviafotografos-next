export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Hevia Fotógrafos",
    image: "https://www.heviafotografos.com/content/img/web/logo.webp",
    telephone: "+34985840055",
    email: "tamihevia@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "c/Severo Ochoa, 8",
      addressLocality: "Arriondas",
      addressRegion: "Asturias",
      postalCode: "33540",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.385,
      longitude: -5.192,
    },
    url: "https://www.heviafotografos.com",
    sameAs: [
      "http://www.facebook.com/heviafotografos.es",
      "https://www.instagram.com/tamihevia/",
      "https://mywed.com/es/photographer/JoseCruces/",
      "https://www.fearlessphotographers.com/photographer/5240/jose-cruces",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      ratingCount: "47",
    },
    priceRange: "€€",
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function blogPostingSchema(post: {
  title: string;
  description: string;
  date: string;
  image: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Tamara Hevia",
    },
    publisher: {
      "@type": "Organization",
      name: "Hevia Fotógrafos",
      logo: {
        "@type": "ImageObject",
        url: "https://www.heviafotografos.com/content/img/web/logo.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url,
    },
  };
}

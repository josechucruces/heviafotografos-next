import fs from "fs";
import path from "path";
import Image from "next/image";

export default function GalleryGrid({ folder }: { folder: string }) {
  const dir = path.join(process.cwd(), "public", "content", "img", folder);
  let images: string[] = [];

  try {
    images = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".webp"))
      .sort()
      .map((f) => `/content/img/${folder}/${f}`);
  } catch {
    images = [];
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No hay imágenes disponibles en esta galería.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((src, i) => (
        <a
          key={i}
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="group block aspect-[3/2] overflow-hidden rounded-lg bg-gray-100 relative"
        >
          <Image
            src={src}
            alt={`${folder} photo ${i + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </a>
      ))}
    </div>
  );
}

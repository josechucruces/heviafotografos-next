import { blogPostingSchema } from "@/lib/schema";

export default function BlogPostingSchema({
  title,
  description,
  date,
  image,
  url,
}: {
  title: string;
  description: string;
  date: string;
  image: string;
  url: string;
}) {
  const schema = blogPostingSchema({ title, description, date, image, url });
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

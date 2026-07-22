type Alternates = {
  canonical: string;
  languages: Record<string, string>;
};

export function getAlternates(canonical: string): Alternates {
  const baseUrl = "https://www.heviafotografos.com";
  return {
    canonical: `${baseUrl}${canonical}`,
    languages: {
      es: `${baseUrl}${canonical}`,
    },
  };
}

const SITE_URL = 'https://kirovbelmash.ru';

interface WebPageJsonLdProps {
  type?: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage' | 'SearchResultsPage';
  name: string;
  description: string;
  url: string;
}

export default function WebPageJsonLd({ type = 'WebPage', name, description, url }: WebPageJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url: `${SITE_URL}${url}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'КировБелМаш',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'КировБелМаш',
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo/logo.webp`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

import { Service } from './servicesData';

const SITE_URL = 'https://kirovbelmash.ru';

interface ServiceJsonLdProps {
  service: Service;
}

export default function ServiceJsonLd({ service }: ServiceJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    url: `${SITE_URL}/services/${service.id}`,
    image: service.image ? `${SITE_URL}${service.image}` : undefined,
    provider: {
      '@type': 'Organization',
      name: 'КировБелМаш',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Россия',
    },
    serviceType: service.title,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

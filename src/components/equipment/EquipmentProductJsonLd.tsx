import { EquipmentItem } from './equipmentData';

const SITE_URL = 'https://kirovbelmash.ru';

interface EquipmentProductJsonLdProps {
  item: EquipmentItem;
}

export default function EquipmentProductJsonLd({ item }: EquipmentProductJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: item.name,
    description: item.description,
    image: item.image ? `${SITE_URL}${item.image}` : undefined,
    url: `${SITE_URL}/oborudovanie/${item.slug}`,
    brand: {
      '@type': 'Brand',
      name: 'КировБелМаш',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'КировБелМаш',
      url: SITE_URL,
    },
    category: item.category,
    sku: item.slug,
    additionalProperty: item.specs.map((spec) => ({
      '@type': 'PropertyValue',
      name: spec.label,
      value: spec.value,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

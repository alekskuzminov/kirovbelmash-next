import { BlogPost } from './blogData';

const SITE_URL = 'https://kirovbelmash.ru';

interface ArticleJsonLdProps {
  post: BlogPost;
}

export default function ArticleJsonLd({ post }: ArticleJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image ? `${SITE_URL}${post.image}` : `${SITE_URL}/images/logo/og-image.jpg`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'КировБелМаш',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'КировБелМаш',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo/logo.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    wordCount: post.readTime * 800,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

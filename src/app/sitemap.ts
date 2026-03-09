import { MetadataRoute } from 'next';
import { blogPosts } from '@/components/blog/blogData';
import { equipmentItems, equipmentCategoriesConfig } from '@/components/equipment/equipmentData';
import { projectsData } from '@/components/projects/projectsData';
import { servicesData } from '@/components/services/servicesData';
import { getAllLineIds } from '@/components/lines/linesData';

const BASE_URL = 'https://kirovbelmash.ru';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contacts`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/linii-briketirovaniya`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/linii-granulirovaniya`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/oborudovanie`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/projects`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/sushilnie-linii`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const equipmentCategoryEntries: MetadataRoute.Sitemap = equipmentCategoriesConfig
    .filter((c) => c.slug !== 'all')
    .map((cat) => ({
      url: `${BASE_URL}/oborudovanie/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  const equipmentItemEntries: MetadataRoute.Sitemap = equipmentItems.map((item) => ({
    url: `${BASE_URL}/oborudovanie/${item.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const productionLineEntries: MetadataRoute.Sitemap = getAllLineIds().map((id) => ({
    url: `${BASE_URL}/production-lines/${id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const projectEntries: MetadataRoute.Sitemap = projectsData.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  const serviceEntries: MetadataRoute.Sitemap = servicesData.map((service) => ({
    url: `${BASE_URL}/services/${service.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...blogEntries,
    ...equipmentCategoryEntries,
    ...equipmentItemEntries,
    ...productionLineEntries,
    ...projectEntries,
    ...serviceEntries,
  ];
}

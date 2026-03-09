import * as fs from 'fs';
import * as path from 'path';
import { blogPosts } from '../src/components/blog/blogData';
import { equipmentItems, equipmentCategoriesConfig } from '../src/components/equipment/equipmentData';
import { projectsData } from '../src/components/projects/projectsData';
import { servicesData } from '../src/components/services/servicesData';
import { getAllLineIds } from '../src/components/lines/linesData';

const BASE_URL = 'https://kirovbelmash.ru';
const now = new Date().toISOString();

async function generate() {
    const pages = [
        { url: BASE_URL, priority: 1.0, changefreq: 'weekly' },
        { url: `${BASE_URL}/about`, priority: 0.7, changefreq: 'monthly' },
        { url: `${BASE_URL}/blog`, priority: 0.8, changefreq: 'weekly' },
        { url: `${BASE_URL}/calculator`, priority: 0.7, changefreq: 'monthly' },
        { url: `${BASE_URL}/contacts`, priority: 0.8, changefreq: 'monthly' },
        { url: `${BASE_URL}/linii-briketirovaniya`, priority: 0.9, changefreq: 'monthly' },
        { url: `${BASE_URL}/linii-granulirovaniya`, priority: 0.9, changefreq: 'monthly' },
        { url: `${BASE_URL}/oborudovanie`, priority: 0.9, changefreq: 'weekly' },
        { url: `${BASE_URL}/projects`, priority: 0.8, changefreq: 'monthly' },
        { url: `${BASE_URL}/services`, priority: 0.8, changefreq: 'monthly' },
        { url: `${BASE_URL}/sushilnie-linii`, priority: 0.9, changefreq: 'monthly' },
        { url: `${BASE_URL}/privacy-policy`, priority: 0.3, changefreq: 'yearly' },
    ];

    blogPosts.forEach((post) => {
        pages.push({
            url: `${BASE_URL}/blog/${post.slug}`,
            priority: 0.7,
            changefreq: 'monthly',
        });
    });

    equipmentCategoriesConfig
        .filter((c) => c.slug !== 'all')
        .forEach((cat) => {
            pages.push({
                url: `${BASE_URL}/oborudovanie/${cat.slug}`,
                priority: 0.8,
                changefreq: 'monthly',
            });
        });

    equipmentItems.forEach((item) => {
        pages.push({
            url: `${BASE_URL}/oborudovanie/${item.slug}`,
            priority: 0.7,
            changefreq: 'monthly',
        });
    });

    getAllLineIds().forEach((id) => {
        pages.push({
            url: `${BASE_URL}/production-lines/${id}`,
            priority: 0.85,
            changefreq: 'monthly',
        });
    });

    projectsData.forEach((project) => {
        pages.push({
            url: `${BASE_URL}/projects/${project.slug}`,
            priority: 0.6,
            changefreq: 'yearly',
        });
    });

    servicesData.forEach((service) => {
        pages.push({
            url: `${BASE_URL}/services/${service.id}`,
            priority: 0.7,
            changefreq: 'monthly',
        });
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
            .map((page) => {
                return `  <url>
    <loc>${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
            })
            .join('\n')}
</urlset>
`;

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    // Write Sitemap
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('✅ sitemap.xml generated automatically!');

    // Write Robots.txt
    const robotsTxt = `User-Agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Host: ${BASE_URL}
Sitemap: ${BASE_URL}/sitemap.xml
`;
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
    console.log('✅ robots.txt generated automatically!');
}

generate();

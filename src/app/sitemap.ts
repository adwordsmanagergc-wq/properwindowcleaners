import type { MetadataRoute } from 'next';
import { areas } from '@/lib/areas';
import { serviceDetails } from '@/lib/services';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/book`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/prices`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/areas`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ];

  const servicePages: MetadataRoute.Sitemap = serviceDetails.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const areaPages: MetadataRoute.Sitemap = areas.map((a) => ({
    url: `${site.url}/window-cleaning/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [...staticPages, ...servicePages, ...areaPages];
}

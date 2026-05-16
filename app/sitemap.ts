import type { MetadataRoute } from 'next';

const BASE_URL = 'https://portfolio-giampiers-projects.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${BASE_URL}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/#about`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/#projects`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/#contact`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
  ];
}

import { MetadataRoute } from "next";
import { getAllSeedlingSlugs, getAllArticleSlugs } from "@/lib/sanity";

export const revalidate = 3600; // hourly refresh so new CMS items appear

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://turia-farm.vercel.app";
  const now = new Date();

  const [seedlingSlugs, articleSlugs] = await Promise.all([
    getAllSeedlingSlugs().catch(() => []),
    getAllArticleSlugs().catch(() => []),
  ]);

  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/bibit-pisang`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/proses-kultur`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tentang-kami`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/panduan-tani`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...seedlingSlugs.map((s: any) => ({
      url: `${baseUrl}/bibit-pisang/${s.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...articleSlugs.map((s: any) => ({
      url: `${baseUrl}/panduan-tani/${s.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}

import { Metadata } from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { SeedlingsSection } from "@/components/SeedlingsSection";
import { getSeedlings, getCatalogPage, getSiteConfig, getFooter, projectId, dataset } from "@/lib/sanity";

export const revalidate = 60; // ISR: revalidate every 60 seconds, or on-demand via webhook

export async function generateMetadata(): Promise<Metadata> {
  const catalogPage = await getCatalogPage().catch(() => null);
  const seo = catalogPage?.seo;
  return {
    title: seo?.metaTitle || "Katalog Bibit Pisang Unggul & Bibit Sengon | Turia Farm Kediri",
    description:
      seo?.metaDescription ||
      "Daftar harga dan varietas bibit pisang anakan pilihan & bibit sengon biji Turia Farm di Batuaji Ringinrejo Kediri: Cavendish Grand Naine, Raja Bulu, Kepok Tanjung, Mas Kirana, Barangan, Sengon Solomon.",
    keywords: [
      "harga bibit pisang cavendish",
      "bibit pisang raja bulu kediri",
      "bibit kepok tanjung bersertifikat",
      "katalog bibit pisang turia farm",
    ],
    alternates: {
      canonical: "https://turia-farm.vercel.app/bibit-pisang",
    },
    openGraph: seo?.ogImage
      ? {
          images: [
            {
              url: seo.ogImage.asset
                ? `https://cdn.sanity.io/images/${projectId}/${dataset}/${seo.ogImage.asset._ref.replace("image-", "").replace("-jpg", ".jpg").replace("-png", ".png").replace("-webp", ".webp")}`
                : seo.ogImage,
            },
          ],
        }
      : undefined,
  };
}

export default async function SeedlingsPage() {
  const [allSeedlings, catalogPage, siteConfig, footer] = await Promise.all([
    getSeedlings().catch(() => []),
    getCatalogPage().catch(() => null),
    getSiteConfig().catch(() => null),
    getFooter().catch(() => null),
  ]);

  // Use curated featuredSeedlings from CMS, fallback to all seedlings
  const displaySeedlings = catalogPage?.featuredSeedlings?.length > 0
    ? catalogPage.featuredSeedlings
    : allSeedlings;

  return (
    <PageWrapper cmsSiteConfig={siteConfig} cmsFooter={footer}>
      <div className="pt-6">
        <SeedlingsSection
          cmsSeedlings={displaySeedlings}
          cmsCatalogHero={catalogPage?.hero}
        />
      </div>
    </PageWrapper>
  );
}

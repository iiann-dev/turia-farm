import { Metadata } from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { ProcessSection } from "@/components/ProcessSection";
import { getProcessPage, getSiteConfig, getFooter, projectId, dataset } from "@/lib/sanity";

export const revalidate = 60; // ISR: revalidate every 60 seconds, or on-demand via webhook

export async function generateMetadata(): Promise<Metadata> {
  const processPage = await getProcessPage().catch(() => null);
  const seo = processPage?.seo;
  return {
    title: seo?.metaTitle || "Proses Pembibitan | Turia Farm Kediri",
    description:
      seo?.metaDescription ||
      "Pelajari 4 tahap pembibitan pisang anakan dan penyemaian bibit sengon biji di Turia Farm Batuaji Ringinrejo Kediri. Akar aktif bergaransi hidup.",
    keywords: ["proses pembibitan pisang", "kultur jaringan pisang", "pembibitan sengon"],
    alternates: {
      canonical: "https://turia-farm.vercel.app/proses-kultur",
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

export default async function ProcessPage() {
  const [processPage, siteConfig, footer] = await Promise.all([
    getProcessPage().catch(() => null),
    getSiteConfig().catch(() => null),
    getFooter().catch(() => null),
  ]);

  return (
    <PageWrapper cmsSiteConfig={siteConfig} cmsFooter={footer}>
      <div className="pt-6">
        <ProcessSection cmsProcessPage={processPage} />
      </div>
    </PageWrapper>
  );
}
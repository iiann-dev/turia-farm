import { Metadata } from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { AboutAndStory } from "@/components/AboutAndStory";
import { getAboutPage, projectId, dataset } from "@/lib/sanity";

export const revalidate = 60; // ISR: revalidate every 60 seconds, or on-demand via webhook

export async function generateMetadata(): Promise<Metadata> {
  const aboutPage = await getAboutPage().catch(() => null);
  const seo = aboutPage?.seo;
  return {
    title: seo?.metaTitle || "Tentang Kami & Nursery 2.8 Ha | Turia Farm Kediri",
    description:
      seo?.metaDescription ||
      "Mengenal visi Turia Farm di Batuaji, Ringinrejo, Kediri: Menyejahterakan petani nusantara melalui penyediaan bibit pisang unggul murni bebas layu fusarium dan bibit sengon bermutu.",
    keywords: [
      "profil turia farm",
      "pembibitan pisang kediri",
      "sejarah nursery pisang batuaji",
    ],
    alternates: {
      canonical: "https://turia-farm.vercel.app/tentang-kami",
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

export default async function AboutPage() {
  const aboutPage = await getAboutPage().catch(() => null);

  return (
    <PageWrapper>
      <div className="pt-6">
        <AboutAndStory cmsAboutPage={aboutPage} />
      </div>
    </PageWrapper>
  );
}

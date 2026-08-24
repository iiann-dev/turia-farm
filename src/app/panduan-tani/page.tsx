import { Metadata } from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { JournalAndFaq } from "@/components/JournalAndFaq";
import { getGuidePage, projectId, dataset } from "@/lib/sanity";

export const revalidate = 60; // ISR: revalidate every 60 seconds, or on-demand via webhook

export async function generateMetadata(): Promise<Metadata> {
  const guidePage = await getGuidePage().catch(() => null);
  const seo = guidePage?.seo;
  return {
    title: seo?.metaTitle || "Panduan Budidaya Pisang & FAQ | Edukasi Tani Turia Farm",
    description:
      seo?.metaDescription ||
      "Kumpulan artikel teknis budidaya pisang: jarak tanam cavendish 30 ton/ha, cara cegah penyakit layu fusarium, analisis modal usaha kebun pisang 1 hektar.",
    keywords: [
      "panduan budidaya pisang",
      "jarak tanam pisang cavendish",
      "cara mengatasi layu pisang",
      "analisa usaha tani pisang raja",
    ],
    alternates: {
      canonical: "https://turia-farm.vercel.app/panduan-tani",
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

export default async function JournalPage() {
  const guidePage = await getGuidePage().catch(() => null);

  return (
    <PageWrapper>
      <div className="pt-6">
        <JournalAndFaq cmsGuidePage={guidePage} />
      </div>
    </PageWrapper>
  );
}

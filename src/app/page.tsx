import { Metadata } from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { Hero } from "@/components/Hero";
import { HomeHighlights } from "@/components/HomeHighlights";
import { getHomePage, getFeaturedSeedlings, getArticles, getProcessSteps } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const homeData = await getHomePage().catch(() => null);
  const seo = homeData?.seo;

  return {
    title: seo?.metaTitle || "Turia Farm | Pusat Pembibitan Pisang & Bibit Sengon Kediri",
    description:
      seo?.metaDescription ||
      "Nursery bibit pisang dari anakan super (Cavendish, Raja Bulu, Kepok Tanjung) serta bibit sengon biji unggul di Batuaji, Kab. Kediri. Sehat, vigor tinggi, siap tanam, bergaransi.",
    keywords: seo?.metaKeywords || [
      "bibit pisang kediri",
      "bibit pisang anakan",
      "bibit sengon kediri",
      "bibit kepok tanjung kediri",
      "bibit pisang batuaji ringinrejo",
      "turia farm",
      "nursery pisang jawa timur",
    ],
    alternates: {
      canonical: seo?.canonicalUrl || "https://turia-farm.vercel.app",
    },
  };
}

export default async function HomePage() {
  const [homeData, featuredSeedlings, articles, processSteps] = await Promise.all([
    getHomePage().catch(() => null),
    getFeaturedSeedlings().catch(() => []),
    getArticles().catch(() => []),
    getProcessSteps().catch(() => []),
  ]);

  return (
    <PageWrapper>
      <Hero cmsData={homeData?.hero} statsData={homeData?.stats} />
      <HomeHighlights
        cmsData={homeData}
        featuredSeedlings={featuredSeedlings}
        featuredArticle={articles[0]}
        processSteps={processSteps}
      />
    </PageWrapper>
  );
}

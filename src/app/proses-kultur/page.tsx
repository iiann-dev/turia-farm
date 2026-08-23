import { Metadata } from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { ProcessSection } from "@/components/ProcessSection";
import { getProcessSteps, getSiteConfig } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig().catch(() => null);
  return {
    title: "Proses Pembibitan | Turia Farm Kediri",
    description:
      "Pelajari 4 tahap pembibitan pisang anakan dan penyemaian bibit sengon biji di Turia Farm Batuaji Ringinrejo Kediri. Akar aktif bergaransi hidup.",
    keywords: [
      "proses pembibitan pisang",
      "penyemaian biji sengon",
      "kebun bibit pisang batuaji",
      "nursery pisang kediri",
    ],
    alternates: {
      canonical: "https://turia-farm.vercel.app/proses-kultur",
    },
  };
}

export default async function ProcessPage() {
  const [processSteps, siteConfig] = await Promise.all([
    getProcessSteps().catch(() => []),
    getSiteConfig().catch(() => null),
  ]);

  return (
    <PageWrapper>
      <div className="pt-6">
        <ProcessSection cmsProcessSteps={processSteps} cmsSiteConfig={siteConfig} />
      </div>
    </PageWrapper>
  );
}

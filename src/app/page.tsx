import { Metadata } from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { Hero } from "@/components/Hero";
import { HomeHighlights } from "@/components/HomeHighlights";

export const metadata: Metadata = {
  title: "Turia Farm | Pusat Pembibitan Pisang & Bibit Sengon Kediri",
  description:
    "Nursery bibit pisang dari anakan super (Cavendish, Raja Bulu, Kepok Tanjung) serta bibit sengon biji unggul di Batuaji, Kab. Kediri. Sehat, vigor tinggi, siap tanam, bergaransi.",
  keywords: [
    "bibit pisang kediri",
    "bibit pisang anakan",
    "bibit sengon kediri",
    "bibit kepok tanjung kediri",
    "bibit pisang batuaji ringinrejo",
    "turia farm",
    "nursery pisang jawa timur",
  ],
  alternates: {
    canonical: "https://turia-farm.vercel.app",
  },
};

export default function HomePage() {
  return (
    <PageWrapper>
      <Hero />
      <HomeHighlights />
    </PageWrapper>
  );
}

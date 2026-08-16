import { Metadata } from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { Hero } from "@/components/Hero";
import { HomeHighlights } from "@/components/HomeHighlights";

export const metadata: Metadata = {
  title: "Turia Farm | Pusat Pembibitan Pisang & Bibit Sengon Kediri",
  description:
    "Nursery bibit pisang kultur jaringan dan anakan super (Cavendish, Raja Bulu, Kepok Tanjung) serta bibit sengon unggul di Batuaji, Kab. Kediri. Bebas fusarium, siap tanam, bergaransi.",
  keywords: [
    "bibit pisang kediri",
    "bibit pisang kultur jaringan",
    "jual bibit pisang cavendish kediri",
    "bibit kepok tanjung kediri",
    "bibit pisang batuaji ringinrejo",
    "turia farm",
    "nursery pisang jawa timur",
  ],
  alternates: {
    canonical: "https://turiafarm.id",
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

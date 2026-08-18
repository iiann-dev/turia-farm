import { Metadata } from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { AboutAndStory } from "@/components/AboutAndStory";

export const metadata: Metadata = {
  title: "Tentang Kami & Nursery 2.8 Ha | Turia Farm Kediri",
  description:
    "Mengenal visi Turia Farm di Batuaji, Ringinrejo, Kediri: Menyejahterakan petani nusantara melalui penyediaan bibit pisang unggul murni bebas layu fusarium dan bibit sengon bermutu.",
  keywords: [
    "profil turia farm",
    "pembibitan pisang kediri",
    "sejarah nursery pisang batuaji",
  ],
  alternates: {
    canonical: "https://turia-farm.vercel.app/tentang-kami",
  },
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="pt-6">
        <AboutAndStory />
      </div>
    </PageWrapper>
  );
}

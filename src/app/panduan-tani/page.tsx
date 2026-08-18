import { Metadata } from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { JournalAndFaq } from "@/components/JournalAndFaq";

export const metadata: Metadata = {
  title: "Panduan Budidaya Pisang & FAQ | Edukasi Tani Turia Farm",
  description:
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
};

export default function JournalPage() {
  return (
    <PageWrapper>
      <div className="pt-6">
        <JournalAndFaq />
      </div>
    </PageWrapper>
  );
}

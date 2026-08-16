import { Metadata } from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { ProcessSection } from "@/components/ProcessSection";

export const metadata: Metadata = {
  title: "Proses Kultur Jaringan & Aklimatisasi Bibit | Turia Farm",
  description:
    "Pelajari 4 tahap pemuliaan bibit pisang di laboratorium dan greenhouse Turia Farm Batuaji Kediri. 99.8% steril, akar aktif bergaransi hidup.",
  keywords: [
    "proses kultur jaringan pisang",
    "aklimatisasi bibit pisang kediri",
    "greenhouse bibit pisang batuaji",
    "standar mutu bibit turia farm",
  ],
  alternates: {
    canonical: "https://turiafarm.id/proses-kultur",
  },
};

export default function ProcessPage() {
  return (
    <PageWrapper>
      <div className="pt-24">
        <ProcessSection />
      </div>
    </PageWrapper>
  );
}

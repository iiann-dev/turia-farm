import { Metadata } from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { SeedlingsSection } from "@/components/SeedlingsSection";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Katalog Bibit Pisang Unggul & Bibit Sengon | Turia Farm Kediri",
  description:
    "Daftar harga dan varietas bibit pisang kultur jaringan & bibit sengon Turia Farm di Batuaji Ringinrejo Kediri: Cavendish Grand Naine, Raja Bulu, Kepok Tanjung, Mas Kirana, Barangan, Sengon Solomon.",
  keywords: [
    "harga bibit pisang cavendish",
    "bibit pisang raja bulu kediri",
    "bibit kepok tanjung bersertifikat",
    "katalog bibit pisang turia farm",
  ],
  alternates: {
    canonical: "https://turiafarm.id/bibit-pisang",
  },
};

export default function SeedlingsPage() {
  return (
    <PageWrapper>
      <PageTransition>
        <div className="pt-6">
          <SeedlingsSection />
        </div>
      </PageTransition>
    </PageWrapper>
  );
}

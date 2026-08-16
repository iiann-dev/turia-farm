import { Metadata } from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { SeedlingsSection } from "@/components/SeedlingsSection";

export const metadata: Metadata = {
  title: "Katalog Bibit Pisang Unggul & Harga | Turia Farm Kediri",
  description:
    "Daftar harga dan varietas bibit pisang kultur jaringan Turia Farm di Batuaji Kediri: Cavendish Grand Naine, Raja Bulu, Kepok Tanjung, Mas Kirana, Barangan.",
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
      <div className="pt-24">
        <SeedlingsSection />
      </div>
    </PageWrapper>
  );
}

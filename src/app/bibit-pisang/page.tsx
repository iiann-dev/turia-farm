import { Metadata } from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { SeedlingsSection } from "@/components/SeedlingsSection";
import { getSeedlings } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Katalog Bibit Pisang Unggul & Bibit Sengon | Turia Farm Kediri",
    description:
      "Daftar harga dan varietas bibit pisang anakan pilihan & bibit sengon biji Turia Farm di Batuaji Ringinrejo Kediri: Cavendish Grand Naine, Raja Bulu, Kepok Tanjung, Mas Kirana, Barangan, Sengon Solomon.",
    keywords: [
      "harga bibit pisang cavendish",
      "bibit pisang raja bulu kediri",
      "bibit kepok tanjung bersertifikat",
      "katalog bibit pisang turia farm",
    ],
    alternates: {
      canonical: "https://turia-farm.vercel.app/bibit-pisang",
    },
  };
}

export default async function SeedlingsPage() {
  const seedlings = await getSeedlings().catch(() => []);

  return (
    <PageWrapper>
      <div className="pt-6">
        <SeedlingsSection cmsSeedlings={seedlings} />
      </div>
    </PageWrapper>
  );
}

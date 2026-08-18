import { Metadata } from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { ContactAndLocation } from "@/components/ContactAndLocation";

export const metadata: Metadata = {
  title: "Kontak & Alamat Nursery Batuaji Kediri | Turia Farm",
  description:
    "Hubungi nursery Turia Farm di Batuaji, Ringinrejo, Kab. Kediri untuk konsultasi pemesanan bibit pisang dan bibit sengon skala kecil maupun partai besar perkebunan. Buka Senin-Sabtu.",
  keywords: [
    "alamat turia farm kediri",
    "nomor whatsapp bibit pisang",
    "bibit sengon kediri",
    "lokasi kebun bibit batuaji",
    "kontak nursery kediri",
  ],
  alternates: {
    canonical: "https://turiafarm.id/kontak",
  },
};

export default function ContactPage() {
  return (
    <PageWrapper>
      <div className="pt-6">
        <ContactAndLocation />
      </div>
    </PageWrapper>
  );
}

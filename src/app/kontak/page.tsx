import { Metadata } from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { ContactAndLocation } from "@/components/ContactAndLocation";
import { getContactPage, getSiteConfig, projectId, dataset } from "@/lib/sanity";

export const revalidate = 60; // ISR: revalidate every 60 seconds, or on-demand via webhook

export async function generateMetadata(): Promise<Metadata> {
  const contactPage = await getContactPage().catch(() => null);
  const seo = contactPage?.seo;
  return {
    title: seo?.metaTitle || "Kontak & Alamat Nursery Batuaji Kediri | Turia Farm",
    description:
      seo?.metaDescription ||
      "Hubungi nursery Turia Farm di Batuaji, Ringinrejo, Kab. Kediri untuk konsultasi pemesanan bibit pisang dan bibit sengon skala kecil maupun partai besar perkebunan. Buka Senin-Sabtu.",
    keywords: [
      "alamat turia farm kediri",
      "nomor whatsapp bibit pisang",
      "bibit sengon kediri",
      "lokasi kebun bibit batuaji",
      "kontak nursery kediri",
    ],
    alternates: {
      canonical: "https://turia-farm.vercel.app/kontak",
    },
    openGraph: seo?.ogImage
      ? {
          images: [
            {
              url: seo.ogImage.asset
                ? `https://cdn.sanity.io/images/${projectId}/${dataset}/${seo.ogImage.asset._ref.replace("image-", "").replace("-jpg", ".jpg").replace("-png", ".png").replace("-webp", ".webp")}`
                : seo.ogImage,
            },
          ],
        }
      : undefined,
  };
}

export default async function ContactPage() {
  const [contactPage, siteConfig] = await Promise.all([
    getContactPage().catch(() => null),
    getSiteConfig().catch(() => null),
  ]);

  return (
    <PageWrapper>
      <div className="pt-6">
        <ContactAndLocation
          cmsContactPage={contactPage}
          cmsSiteConfig={siteConfig}
        />
      </div>
    </PageWrapper>
  );
}

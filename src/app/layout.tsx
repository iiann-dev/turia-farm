import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://turiafarm.id"),
  title: {
    default: "Turia Farm | Pembibitan Pisang Kultur Jaringan Kediri",
    template: "%s | Turia Farm Kediri",
  },
  description:
    "Pusat bibit pisang kultur jaringan dan anakan unggul bersertifikasi (Cavendish, Raja Bulu, Kepok Tanjung, Mas Kirana, Barangan) di Batuaji, Kab. Kediri, Jawa Timur.",
  keywords: [
    "bibit pisang kediri",
    "bibit pisang batuaji",
    "bibit pisang ringinrejo",
    "bibit pisang kultur jaringan jawa timur",
    "jual bibit pisang cavendish",
    "bibit pisang kepok tanjung",
    "bibit pisang raja bulu",
    "turia farm",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  authors: [{ name: "Turia Farm Agronomy Team" }],
  creator: "Turia Farm",
  publisher: "Turia Farm Kediri",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Turia Farm | Pembibitan Pisang Unggul & Kultur Jaringan Kediri",
    description:
      "Bibit pisang sehat, akar kuat, seragam & garansi hidup sampai lahan. Nursery 2.8 Hektar di Batuaji, Kab. Kediri.",
    url: "https://turiafarm.id",
    siteName: "Turia Farm",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1668762924635-a3683caf32bf?w=1200&q=80&auto=format",
        width: 1200,
        height: 630,
        alt: "Turia Farm - Pembibitan Pisang Kultur Jaringan Kediri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Turia Farm | Pembibitan Pisang Kultur Jaringan Kediri",
    description:
      "Pusat bibit pisang unggul bersertifikasi bebas penyakit di Batuaji, Kab. Kediri, Jawa Timur.",
    images: ["https://images.unsplash.com/photo-1668762924635-a3683caf32bf?w=1200&q=80&auto=format"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Turia Farm - Pembibitan Pisang Unggul",
  image: "https://images.unsplash.com/photo-1668762924635-a3683caf32bf?w=1200&q=80&auto=format",
  "@id": "https://turiafarm.id",
  url: "https://turiafarm.id",
  telephone: "+6281234567890",
  priceRange: "Rp 10.000 - Rp 15.000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Batuaji, Ringinrejo",
    addressLocality: "Kediri",
    addressRegion: "Jawa Timur",
    postalCode: "64172",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -7.9528,
    longitude: 112.0156,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "07:30",
    closes: "16:30",
  },
  sameAs: ["https://wa.me/6281234567890"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Noto+Serif:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#faf9f3] text-[#1b1c19] font-sans antialiased selection:bg-[#c4ebde] selection:text-[#00251d]">
        {children}
      </body>
    </html>
  );
}

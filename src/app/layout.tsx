import type { Metadata } from "next";
import { Manrope, Noto_Serif } from "next/font/google";
import "./globals.css";

// Self-hosted fonts — no render-blocking Google Fonts CSS, no 3rd-party
// requests on mobile. Same families/weights as before (Manrope sans,
// Noto Serif display) so desktop & tablet rendering is identical.
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://turia-farm.vercel.app"),
  title: {
    default: "Turia Farm | Pembibitan Pisang & Bibit Sengon Kediri",
    template: "%s | Turia Farm Kediri",
  },
  description:
    "Pusat bibit pisang anakan unggul dan bibit sengon biji pilihan (Cavendish, Raja Bulu, Kepok Tanjung, Mas Kirana, Barangan, Sengon Solomon) di Batuaji, Ringinrejo, Kab. Kediri, Jawa Timur.",
  keywords: [
    "bibit pisang kediri",
    "bibit pisang anakan",
    "bibit sengon kediri",
    "bibit pisang jawa timur",
    "bibit sengon kediri",
    "jual bibit sengon solomon",
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
    title: "Turia Farm | Pembibitan Pisang Unggul & Bibit Sengon Kediri",
    description:
      "Bibit pisang sehat, akar kuat, seragam & garansi hidup sampai lahan. Nursery 2.8 Hektar di Batuaji, Ringinrejo, Kab. Kediri.",
    url: "https://turia-farm.vercel.app",
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
    title: "Turia Farm | Pembibitan Pisang & Bibit Sengon Kediri",
    description:
      "Pusat bibit pisang unggul bersertifikasi & bibit sengon di Batuaji, Ringinrejo, Kab. Kediri, Jawa Timur.",
    images: ["https://images.unsplash.com/photo-1679255728321-88375291b36c?w=1200&q=80&auto=format"],
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
  name: "Turia Farm - Pembibitan Pisang & Bibit Sengon",
  image: "https://images.unsplash.com/photo-1679255728321-88375291b36c?w=1200&q=80&auto=format",
  "@id": "https://turia-farm.vercel.app",
  url: "https://turia-farm.vercel.app",
  telephone: "+6289508495717",
  priceRange: "Rp 2.000 - Rp 15.000",
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
    latitude: -7.966564,
    longitude: 112.1038139,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "07:30",
    closes: "16:30",
  },
  sameAs: ["https://wa.me/6289508495717"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`scroll-smooth ${manrope.variable} ${notoSerif.variable}`}
    >
      <head>
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

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#05060f",
};

export const metadata: Metadata = {
  title: "SVD WebDesign | Websites & Webshops op maat",
  description:
    "SVD WebDesign bouwt moderne websites en webshops op maat — snel, professioneel en volledig naar wens. Bekijk eerder werk en vraag een vrijblijvende offerte aan.",
  keywords: [
    "webdesign", "webdesigner", "website laten maken", "webshop laten maken",
    "websites op maat", "bedrijfswebsite", "SVD WebDesign", "Sem van Dieen",
    "website bouwen", "moderne website", "React website", "Next.js webdesign",
    "goedkope website", "professionele website", "webdesign Nederland",
  ],
  authors: [{ name: "Sem van Dieen", url: "https://svdwebdesign.nl" }],
  creator: "Sem van Dieen",
  metadataBase: new URL("https://svdwebdesign.nl"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://svdwebdesign.nl",
    siteName: "SVD WebDesign",
    title: "SVD WebDesign | Websites & Webshops op maat",
    description:
      "Moderne websites en webshops volledig op maat. Snel, betaalbaar en professioneel. Vraag vrijblijvend een offerte aan.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SVD WebDesign — Websites & Webshops op maat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SVD WebDesign | Websites & Webshops op maat",
    description:
      "Moderne websites en webshops volledig op maat. Snel, betaalbaar en professioneel.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SVD WebDesign",
  description:
    "SVD WebDesign bouwt moderne websites en webshops op maat voor bedrijven en ondernemers in Nederland.",
  url: "https://svdwebdesign.nl",
  email: "sem.vdieen@gmail.com",
  telephone: "+31627381813",
  founder: {
    "@type": "Person",
    name: "Sem van Dieen",
    jobTitle: "Webdesigner & Developer",
    email: "sem.vdieen@gmail.com",
  },
  areaServed: {
    "@type": "Country",
    name: "Netherlands",
  },
  serviceType: ["Webdesign", "Webshop ontwikkeling", "Websites op maat"],
  priceRange: "€€",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#05060f] text-[#f0f0f0]`}
        suppressHydrationWarning
      >
        <div className="relative" style={{ zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}

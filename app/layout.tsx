import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "SVD WebDesign | Websites & Webshops op maat",
  description:
    "SVD WebDesign bouwt moderne websites en webshops op maat. Bekijk ons werk en neem contact op voor een vrijblijvende offerte.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#05060f] text-[#f0f0f0]`}
      >
        {children}
      </body>
    </html>
  );
}

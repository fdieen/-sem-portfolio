import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AlgemeneVoorwaarden from "../components/AlgemeneVoorwaarden";

export const metadata: Metadata = {
  title: "Algemene voorwaarden | SVD WebDesign",
  description:
    "De algemene voorwaarden van SVD WebDesign — van toepassing op alle offertes, opdrachten en leveringen van diensten.",
  alternates: {
    canonical: "/algemene-voorwaarden",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AlgemeneVoorwaardenPage() {
  return (
    <main>
      <Navbar />
      <AlgemeneVoorwaarden />
      <Footer />
    </main>
  );
}

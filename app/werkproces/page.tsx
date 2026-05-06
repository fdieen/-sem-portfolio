import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProcessDetail from "../components/ProcessDetail";

export const metadata: Metadata = {
  title: "Hoe werkt het | SVD WebDesign",
  description: "Van idee tot lancering in 5 stappen. Ontdek hoe SVD WebDesign jouw website of webshop realiseert.",
};

export default function WerkprocesPage() {
  return (
    <main>
      <Navbar />
      <ProcessDetail />
      <Footer />
    </main>
  );
}

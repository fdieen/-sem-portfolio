import { Metadata } from "next";
import ProjectenGallery from "./ProjectenGallery";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Projecten | Sem van Dieen",
  description: "Bekijk alle websites en webshops die ik heb gebouwd.",
};

export default function ProjectenPage() {
  return (
    <>
      <Navbar />
      <ProjectenGallery />
      <Footer />
    </>
  );
}

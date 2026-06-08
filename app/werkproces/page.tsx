import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProcessDetail from "../components/ProcessDetail";

export const metadata: Metadata = {
  title: "Hoe werkt het | SVD BV",
  description: "Van idee tot lancering in 5 stappen. Ontdek hoe SVD BV jouw website of webshop realiseert.",
};

export default function WerkprocesPage() {
  return (
    <main>
      <Navbar />
      <ProcessDetail />
      {/* Sand continues seamlessly down through the footer area on this page.
          Starts at exactly the bottom stop of the Shoreline's sand-grad
          (#2c2620) so the boundary is invisible, then eases into a darker
          tone toward the bottom of the page. The fade is intentionally long
          and soft so the darkening isn't perceived as a line or band. */}
      <div
        style={{
          background:
            "linear-gradient(to bottom, #2c2620 0%, #2a2218 25%, #221b12 60%, #14100a 100%)",
        }}
      >
        <Footer transparent />
      </div>
    </main>
  );
}

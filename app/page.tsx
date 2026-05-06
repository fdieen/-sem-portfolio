import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Process from "./components/Process";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import SeoFooter from "./components/SeoFooter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Projects />
      <Process />
      <About />
      <Skills />
      <Contact />
      <SeoFooter />
      <Footer />
    </main>
  );
}

import React, { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Certificates from "./components/Certificates";
import Art from "./components/Art";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ModalGallery from "./components/ModalGallery";
import LoadingScreen from "./components/LoadingScreen";
import ScrollToTop from "./components/ScrollToTop";
import KeyboardShortcuts from "./components/KeyboardShortcuts";

import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

export default function App() {
  const [gallery, setGallery] = useState({ open: false, images: [] });
  const [isLoading, setIsLoading] = useState(true);

  /* ================= SMOOTH SCROLL (LENIS) ================= */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: false,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
  /* ========================================================= */

  /* ================= LOADING SCREEN ================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  /* ================================================== */

  const openGallery = (imgs) =>
    setGallery({ open: true, images: imgs || [] });

  const closeGallery = () =>
    setGallery({ open: false, images: [] });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app-container">
          {/* Background Ambience */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden bg-ambience">
            <div className="ambience-orb ambience-orb-1" />
            <div className="ambience-orb ambience-orb-2" />
          </div>

          <Navigation />

          <main>
              <Hero />
            <div className="page-wrapper">
              <About />
              <Skills />
              <Projects />
              <Journey openGallery={openGallery} />
              <Certificates openGallery={openGallery} />
              <Contact />
            </div>
          </main>

          <Footer />
          <ScrollToTop />
          <KeyboardShortcuts />

          {gallery.open && (
            <ModalGallery
              images={gallery.images}
              onClose={closeGallery}
            />
          )}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

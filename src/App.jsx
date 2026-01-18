import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const openGallery = (imgs) => setGallery({ open: true, images: imgs || [] });
  const closeGallery = () => setGallery({ open: false, images: [] });

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
            <div className="app-container">
              <div className="page-wrapper">
                <Hero />
                <div className="max-w-7xl mx-auto px-4 pb-20 space-y-16">
                  <About />
                  <Skills />
                  <Projects />
                  <Journey openGallery={openGallery} />
                  <Certificates openGallery={openGallery} />
                  <Art openGallery={openGallery} />
                  <Contact />
                </div>
              </div>
            </div>
          </main>

          <Footer />
          <ScrollToTop />
          <KeyboardShortcuts />

          {gallery.open && (
            <ModalGallery images={gallery.images} onClose={closeGallery} />
          )}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

import React from "react";
import { Icon } from "./Icons";
import { useLanguage } from "../context/LanguageContext";
import { DATA } from "../data/portfolioData";
import "./About.css";

export default function About() {
  const { t } = useLanguage();

  // Function to download CV as file
  const handleDownloadCV = async () => {
    try {
      const link = document.createElement("a");
      link.href = DATA.cv?.pdfUrl || "";
      link.download = "Badr_Eldin_CV.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      window.open(DATA.cv?.pdfUrl, "_blank");
    }
  };

  return (
    <section id="about" className="about-section">
      <div className="about-container animate-fade-in-up">
        <div className="about-grid">
          {/* Profile Image with Available Badge */}
          <div className="about-image-wrapper">
            <div className="about-image-container">
              <img
                src={DATA.header.profileImage}
                alt={DATA.header.name}
                className="about-image"
              />
              <div className="available-badge">
                <span className="available-dot"></span>
                {t("hero.availableForWork")}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="about-text">
            <h2 className="section-title">{t("about.title")}</h2>

            <div className="about-content">
              {DATA.summary.map((para, i) => (
                <p
                  key={i}
                  className="about-paragraph"
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="about-actions">
          <button
            onClick={handleDownloadCV}
            className="action-button action-button-primary"
          >
            <Icon.Download />
            <span>{t("hero.downloadCV")}</span>
          </button>

          <a
            href={DATA.header.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="action-button action-button-whatsapp"
          >
            <span>💬</span>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}

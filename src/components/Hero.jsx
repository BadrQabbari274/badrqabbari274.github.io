import React from "react";
import { Icon } from "./Icons";
import { useLanguage } from "../context/LanguageContext";
import { DATA } from "../data/portfolioData";
import "./Hero.css";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <header id="home" className="hero-section">
      <div className="hero-container">
        {/* Content */}
        <div className="hero-content">
          <h1 className="hero-title animate-fade-in-up">
            {t("hero.greeting")}{" "}
            <span className="hero-name">{DATA.header.name}</span>
          </h1>

          <p className="hero-subtitle animate-fade-in-up delay-100">
            {DATA.header.title}
          </p>

          {/* Buttons */}
          <div className="hero-buttons animate-fade-in-up delay-200">
            <a href="#projects" className="hero-button hero-button-secondary">
              <Icon.Eye />
              <span>{t("hero.exploreWork")}</span>
            </a>

            <a
              href="#contact"
              className="action-button action-button-secondary"
            >
              <Icon.Mail />
              <span>Contact Me</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="hero-socials animate-fade-in-up delay-300">
            <a
              href={DATA.header.github}
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="GitHub"
            >
              <Icon.Github />
            </a>
            <a
              href={DATA.header.linkedin}
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <Icon.Linkedin />
            </a>
            <a
              href={DATA.header.instagram}
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="Instagram"
            >
              <Icon.Instagram />
            </a>
            <a
              href={DATA.header.twitter}
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="Twitter"
            >
              <Icon.Twitter />
            </a>
            <a
              href={DATA.header.facebook}
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="Facebook"
            >
              <Icon.Facebook />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator animate-fade-in delay-500">
        <Icon.ChevronDown />
      </div>
    </header>
  );
}

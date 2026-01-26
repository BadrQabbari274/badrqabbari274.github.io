import React, { useState, useEffect } from 'react';
import { Icon } from './Icons';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import './Navigation.css';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setMobileMenuOpen(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;

      setScrolled(currentScrollY > 50);

      const sections = ['home', 'about', 'skills', 'projects', 'journey', 'certificates', 'contact'];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el && currentScrollY >= el.offsetTop - 100) {
          setActiveSection(sec);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '#home', label: t('nav.home') },
    { to: '#about', label: t('nav.about') },
    { to: '#skills', label: t('nav.skills') },
    { to: '#projects', label: t('nav.projects') },
    { to: '#journey', label: t('nav.journey') },
    { to: '#certificates', label: t('nav.certificates') },
    { to: '#contact', label: t('nav.contact') }
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''} ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo" onClick={() => window.scrollTo(0, 0)}>
          Badr Eldin<span className="logo-accent"></span>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links-desktop">
          {navLinks.map((link) => (
            <a
              key={link.to}
              href={link.to}
              className={`nav-link ${activeSection === link.to.replace('#', '') ? 'active' : ''}`}
            >
              {link.label}
              <span className="nav-link-underline" />
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="nav-actions">
          <button
            onClick={toggleTheme}
            className="action-button"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Icon.Sun /> : <Icon.Moon />}
          </button>

          <button
            onClick={toggleLanguage}
            className="action-button"
            aria-label="Toggle language"
          >
            <Icon.Globe />
            <span className="language-text">{language === 'en' ? 'AR' : 'EN'}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-button"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <Icon.Close /> : <Icon.Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {navLinks.map((link) => (
            <a
              key={link.to}
              href={link.to}
              className={`mobile-menu-link ${activeSection === link.to.replace('#', '') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

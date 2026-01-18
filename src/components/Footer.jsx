import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          © {new Date().getFullYear()} Badr Eldin Qabbari. {t('footer.rights')}
        </div>
        <div className="footer-links">
          <a href="#home">{t('footer.home')}</a>
          <a href="#journey">{t('footer.journey')}</a>
          <a href="#projects">{t('footer.projects')}</a>
        </div>
      </div>
    </footer>
  );
}

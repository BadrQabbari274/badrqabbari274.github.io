import React from 'react';
import { Icon } from './Icons';
import { useLanguage } from '../context/LanguageContext';
import { DATA } from '../data/portfolioData';
import './Certificates.css';

export default function Certificates({ openGallery }) {
  const { t } = useLanguage();
  const allCerts = [...DATA.certifications, ...DATA.competitions];

  return (
    <section id="certificates" className="certificates-section">
      <h2 className="section-title">{t('certificates.title')}</h2>
      <div className="certificates-grid">
        {allCerts.map((cert, i) => (
          <div key={i} className="cert-card">
            <Icon.Check />
            <h3 className="cert-name">{cert.name}</h3>
            <p className="cert-org">{cert.org || cert.year}</p>
            <button onClick={() => openGallery(cert.images)} className="cert-button">
              {t('certificates.viewCertificate')} →
            </button>
          </div>
        ))}
      </div>
      
      <div className={`soft-skills-banner ${isVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
        <h3 className="soft-skills-title">{t('skills.softSkills')}</h3>
        <div className="soft-skills-tags">
          {DATA.skills.soft.map((skill, i) => (
            <span key={i} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

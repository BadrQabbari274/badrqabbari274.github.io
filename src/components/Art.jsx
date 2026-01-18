import React from 'react';
import { Icon } from './Icons';
import { useLanguage } from '../context/LanguageContext';
import { DATA } from '../data/portfolioData';
import './Art.css';

export default function Art({ openGallery }) {
  const { t } = useLanguage();

  return (
    <section id="art" className="art-section">
      <div className="art-container">
        <div className="art-header">
          <h2 className="art-title">
            <Icon.Palette /> {t('art.title')}
          </h2>
          <p className="art-subtitle">{t('art.subtitle')}</p>
        </div>

        <div className="art-gallery">
          {DATA.artworks.map((art, i) => (
            <div key={i} className="art-item" onClick={() => openGallery([art.url])}>
              <img src={art.url} alt={art.title || `Artwork ${i + 1}`} />
              <div className="art-overlay">
                <span>{art.title || 'View'}</span>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => openGallery(DATA.artworks.map(a => a.url))} className="art-button">
          {t('art.viewAll')}
        </button>
      </div>
    </section>
  );
}

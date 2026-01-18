import React from 'react';
import { Icon } from './Icons';
import { useLanguage } from '../context/LanguageContext';
import { DATA } from '../data/portfolioData';
import './Journey.css';

export default function Journey({ openGallery }) {
  const { t } = useLanguage();

  const getIcon = (type) => {
    switch (type) {
      case 'education': return <Icon.Graduation />;
      case 'work': return <Icon.Briefcase />;
      case 'activity': return <span>★</span>;
      default: return null;
    }
  };

  return (
    <section id="journey" className="journey-section">
      <div className="section-header">
        <h2 className="section-title text-gradient">{t('journey.title')}</h2>
        <p className="section-subtitle">{t('journey.subtitle')}</p>
      </div>

      <div className="timeline">
        <div className="timeline-line"></div>
        {DATA.journey.map((item, idx) => (
          <div key={item.id} className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}>
            <div className="timeline-icon">{getIcon(item.type)}</div>
            <div className="timeline-content">
              <span className="timeline-year">{item.year}</span>
              <h3 className="timeline-title">{item.title}</h3>
              <div className="timeline-org">{item.org}</div>
              <p className="timeline-desc">{item.desc}</p>
              <div className="timeline-tags">
                {item.tags?.map((tag, i) => (
                  <span key={i} className="timeline-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
        {/*
      <div className="journey-action">
        <button onClick={() => openGallery(DATA.activities[0]?.images)} className="action-btn">
          <Icon.Eye /> {t('journey.viewActivities')}
        </button>
      </div>
      */}
    </section>
  );
}

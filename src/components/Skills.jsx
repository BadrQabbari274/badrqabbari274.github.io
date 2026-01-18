import React from 'react';
import { Icon } from './Icons';
import { useLanguage } from '../context/LanguageContext';
import { DATA } from '../data/portfolioData';
import { useScrollAnimation } from './ScrollAnimation';
import './Skills.css';

export default function Skills() {
  const { t } = useLanguage();
  const [elementRef, isVisible] = useScrollAnimation();

  return (
    <section id="skills" className="skills-section" ref={elementRef}>
      <div className={`section-header ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h2 className="section-title text-gradient">{t('skills.title')}</h2>
      </div>

      <div className="skills-grid">
        {DATA.skills.technical.map((skillGroup, i) => (
          <div 
            key={i} 
            className={`skill-card ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: isVisible ? `${i * 100 + 100}ms` : '0ms' }}
          >
            <h3 className="skill-category">{skillGroup.category}</h3>
            <ul className="skill-list">
              {skillGroup.items.map((skill, j) => (
                <li key={j} className="skill-item">
                  <Icon.Check />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
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

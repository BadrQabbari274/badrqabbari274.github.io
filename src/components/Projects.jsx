import React, { useState, useEffect, useRef } from 'react';
import { Icon } from './Icons';
import { useLanguage } from '../context/LanguageContext';
import { DATA } from '../data/portfolioData';
import { useScrollAnimation } from './ScrollAnimation';
import ProjectDetails from './ProjectDetails';
import './Projects.css';

const ProjectCard = ({ project, index, isVisible, setSelectedProject }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`project-card ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: isVisible ? `${index * 100}ms` : '0ms' }}
    >
      <div className="project-image">
        {project.image && !imgError ? (
          <img
            src={project.image}
            alt={project.title}
            className="project-img-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="project-icon">💻</div>
        )}
      </div>

      <div className="project-content">
        <div className="project-info-group">
          <div className="project-header">
            <h3 className="project-title">{project.title}</h3>
            <span className="project-duration">{project.duration}</span>
          </div>
          <p className="project-description">{project.description}</p>
        </div>
        <div className="project-tech">
          {project.tech.slice(0, 4).map((tech, i) => (
            <span key={i} className="tech-tag">{tech}</span>
          ))}
          {project.tech.length > 4 && (
            <span className="tech-tag">+{project.tech.length - 4} more</span>
          )}
        </div>

        <div className="project-buttons">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="project-button project-button-github"
            >
              <Icon.Github />
              GitHub
            </a>
          )}
          <button
            onClick={() => setSelectedProject(project)}
            className="project-button project-button-details"
          >
            <Icon.Eye />
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [elementRef, isVisible] = useScrollAnimation();
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [showAll, setShowAll] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef(null);

  // مصفوفة الفلاتر اللي كانت ناقصة
  const filters = [
    { value: 'all', label: t('projects.filterAll') || 'All' },
    { value: 'web', label: t('projects.filterWeb') || 'Web' },
    { value: 'mobile', label: t('projects.filterMobile') || 'Mobile' },
    { value: 'desktop', label: t('projects.filterDesktop') || 'Desktop' }
  ];

  const filteredProjects =
    filter === 'all'
      ? DATA.projects
      : DATA.projects.filter(p => p.type === filter);

  // منطق السكرول "الدائري" للأسهم
  const scroll = (direction) => {
    if (carouselRef.current && carouselRef.current.children.length > 0) {
      const container = carouselRef.current;
      const itemWidth = container.children[0].offsetWidth + 32; 
      const scrollLeft = Math.ceil(container.scrollLeft);
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      if (direction === 'right') {
        if (scrollLeft >= maxScrollLeft - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
      } else {
        if (scrollLeft <= 10) {
          container.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        }
      }
    }
  };

  // التقليب التلقائي الدائري
  useEffect(() => {
    let interval;
    if (!showAll && !isHovered && filteredProjects.length > 1) {
      interval = setInterval(() => {
        scroll('right');
      }, 3000); 
    }
    return () => clearInterval(interval);
  }, [showAll, isHovered, filteredProjects.length, filter]);

  // نرجع السكرول للصفر لو غيرنا الفلتر
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [filter]);

  return (
    <section id="projects" className="projects-section" ref={elementRef}>
      <div className={`section-header ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h2 className="section-title text-gradient">{t('projects.title') || 'Projects'}</h2>
      </div>

      {/* رجعنا الفلاتر هنا */}
      <div className={`project-filters ${isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => {
              setFilter(f.value);
              setShowAll(false); // لو غير النوع يرجع وضع الكاروسيل أحسن
            }}
            className={`filter-button ${filter === f.value ? 'active' : ''}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="toggle-btn-container">
        <button className="toggle-all-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Hide All Projects' : 'Show All Projects'}
        </button>
      </div>

      <div 
        className="carousel-wrapper" 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
      >
        {!showAll && filteredProjects.length > 1 && (
          <>
            <button className="scroll-arrow left-arrow" onClick={() => scroll('left')} aria-label="Previous">
              &#10094;
            </button>
            <button className="scroll-arrow right-arrow" onClick={() => scroll('right')} aria-label="Next">
              &#10095;
            </button>
          </>
        )}

        <div 
          ref={carouselRef} 
          className={showAll ? 'projects-grid' : 'projects-carousel'}
        >
          {filteredProjects.map((project, index) => (
            <div key={project.id} className={showAll ? '' : 'carousel-item'}>
              <ProjectCard
                project={project}
                index={index}
                isVisible={isVisible}
                setSelectedProject={setSelectedProject}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
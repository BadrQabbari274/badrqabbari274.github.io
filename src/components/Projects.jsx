import React, { useState } from 'react';
import { Icon } from './Icons';
import { useLanguage } from '../context/LanguageContext';
import { DATA } from '../data/portfolioData';
import { useScrollAnimation } from './ScrollAnimation';
import ProjectDetails from './ProjectDetails';
import './Projects.css';

export default function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [elementRef, isVisible] = useScrollAnimation();
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { value: 'all', label: t('projects.filterAll') },
    { value: 'web', label: t('projects.filterWeb') },
    { value: 'mobile', label: t('projects.filterMobile') },
    { value: 'desktop', label: t('projects.filterDesktop') }
  ];

  const filteredProjects = filter === 'all' 
    ? DATA.projects 
    : DATA.projects.filter(p => p.type === filter);

  return (
    <section id="projects" className="projects-section" ref={elementRef}>
      <div className={`section-header ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h2 className="section-title text-gradient">{t('projects.title')}</h2>
      </div>

      {/* Filter Buttons */}
      <div className={`project-filters ${isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`filter-button ${filter === f.value ? 'active' : ''}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className={`project-card ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: isVisible ? `${index * 100 + 200}ms` : '0ms' }}
          >
            <div className="project-image">
              <div className="project-icon">💻</div>
            </div>
            
            <div className="project-content">
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-duration">{project.duration}</span>
              </div>
              
              <p className="project-description">{project.description}</p>
              
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
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetails 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}

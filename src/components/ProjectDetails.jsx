import React, { useEffect } from 'react';
import { Icon } from './Icons';
import './ProjectDetails.css';

export default function ProjectDetails({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="project-details-overlay">
      <div className="project-details-modal">
        {/* Close Button */}
        <button onClick={onClose} className="details-close" aria-label="Close">
          <Icon.Close />
        </button>

        {/* Header */}
        <div className="details-header">
          <div className="details-icon">💻</div>
          <h2 className="details-title">{project.title}</h2>
          <span className="details-duration">{project.duration}</span>
        </div>

        {/* Content */}
        <div className="details-content">
          {/* Description */}
          <div className="details-section">
            <h3 className="details-section-title">
              <Icon.Eye /> Project Overview
            </h3>
            <p className="details-description">{project.description}</p>
          </div>

          {/* Technologies */}
          <div className="details-section">
            <h3 className="details-section-title">
              <Icon.Briefcase /> Technologies Used
            </h3>
            <div className="details-tech-grid">
              {project.tech.map((tech, i) => (
                <div key={i} className="tech-badge">
                  <Icon.Check />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Type */}
          <div className="details-section">
            <h3 className="details-section-title">
              <Icon.Filter /> Project Type
            </h3>
            <div className="project-type-badge">
              {project.type === 'web' && '🌐 Web Application'}
              {project.type === 'mobile' && '📱 Mobile Application'}
              {project.type === 'desktop' && '🖥️ Desktop Application'}
            </div>
          </div>

          {/* Actions */}
          {project.github && (
            <div className="details-actions">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="details-button details-button-github"
              >
                <Icon.Github />
                View on GitHub
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

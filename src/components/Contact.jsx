import React, { useState } from 'react';
import { Icon } from './Icons';
import { useLanguage } from '../context/LanguageContext';
import { DATA } from '../data/portfolioData';
import { useScrollAnimation } from './ScrollAnimation';
import './Contact.css';

export default function Contact() {
  const { t } = useLanguage();
  const [elementRef, isVisible] = useScrollAnimation();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    projectType: '',
    message: '' 
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    // Validation
    if (!formData.name || !formData.email || !formData.projectType || !formData.message) {
      setStatus({ type: 'error', message: 'All fields are required' });
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus({ type: 'error', message: 'Invalid email address' });
      return;
    }

    setIsSubmitting(true);

    try {
      const subject = `🚀 Project Inquiry: ${formData.projectType} from ${formData.name}`;
      const body = `Hello Badr,%0D%0A%0D%0AYou have a new inquiry:%0D%0A%0D%0A👤 Name: ${formData.name}%0D%0A📧 Email: ${formData.email}%0D%0A💻 Project: ${formData.projectType}%0D%0A%0D%0A📝 Message:%0D%0A${formData.message}`;
      
      const mailtoLink = `mailto:${DATA.header.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
      
      // نفتح الرابط في نافذة جديدة عشان نحافظ على حالة الصفحة
      window.open(mailtoLink, '_blank');
      
      setStatus({ type: 'success', message: t('contact.successMessage') || 'Opening your email client...' });
      setFormData({ name: '', email: '', projectType: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section" ref={elementRef}>
      <div className={`contact-container ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="contact-header">
          <h2 className="contact-title">
            {t('contact.title')} <span className="title-accent">{t('contact.titleAccent')}</span>
          </h2>
          <p className="contact-subtitle">{t('contact.subtitle')}</p>
        </div>

        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <h3 className="form-title">{t('contact.formTitle')}</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">{t('contact.nameLabel')} <span className="required-star">*</span></label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">{t('contact.emailLabel')} <span className="required-star">*</span></label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="projectType" className="form-label">
                  Project Type <span className="required-star">*</span>
                </label>
                <div className="select-wrapper">
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="form-input form-select"
                  >
                    <option value="" disabled>Select Project Type</option>
                    <option value="Desktop Application">Desktop Application</option>
                    <option value="Web Application">Web Application</option>
                    <option value="Mobile Application">Mobile Application</option>
                    <option value="Full-Stack Solution">Full-Stack Solution</option>
                    <option value="API Development">API Development</option>
                    <option value="Database Design">Database Design</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">{t('contact.messageLabel')} <span className="required-star">*</span></label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Tell me more about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-input form-textarea"
                ></textarea>
              </div>

              {status.message && (
                <div className={`form-status ${status.type}`}>
                  {status.type === 'success' ? '✅ ' : '❌ '}
                  {status.message}
                </div>
              )}

              <button type="submit" disabled={isSubmitting} className="form-submit">
                {isSubmitting ? (
                  <span className="loader"></span>
                ) : (
                  <>
                    <Icon.Mail />
                    <span>{t('contact.sendButton')}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div className="contact-info-wrapper">
             <div className="social-links-grid">
                {[
                  { href: `mailto:${DATA.header.email}`, icon: <Icon.Mail />, label: t('contact.sendEmail'), color: '#ea4335' },
                  { href: DATA.header.whatsapp, icon: <span>💬</span>, label: 'WhatsApp', color: '#25D366' },
                  { href: DATA.header.linkedin, icon: <Icon.Linkedin />, label: 'LinkedIn', color: '#0077b5' },
                  { href: DATA.header.github, icon: <Icon.Github />, label: 'GitHub', color: '#333' },
                  { href: DATA.header.twitter, icon: <Icon.Twitter />, label: 'Twitter', color: '#1da1f2' },
                  { href: DATA.header.facebook, icon: <Icon.Facebook />, label: 'Facebook', color: '#1877f2' }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="social-card"
                    style={{ '--hover-color': social.color }}
                  >
                    <div className="social-icon">{social.icon}</div>
                    <span className="social-label">{social.label}</span>
                  </a>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
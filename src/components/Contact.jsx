import React, { useState, useRef } from 'react'; // ضفنا useRef
import emailjs from '@emailjs/browser'; // استيراد المكتبة
import { Icon } from './Icons';
import { useLanguage } from '../context/LanguageContext';
import { DATA } from '../data/portfolioData';
import { useScrollAnimation } from './ScrollAnimation';
import './Contact.css';

export default function Contact() {
  const { t } = useLanguage();
  const [elementRef, isVisible] = useScrollAnimation();
  const form = useRef(); // مرجع للفورم

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
    setIsSubmitting(true);
    setStatus({ type: '', message: '' }); // تنظيف أي رسالة قديمة

    try {
      const formDataObj = new FormData();
      // مفتاح الـ Access Key بتاعك
      formDataObj.append("access_key", "b30f07ef-bd1c-4fa2-9b0a-9469c08630f5");
      formDataObj.append("name", formData.name);
      formDataObj.append("email", formData.email);
      formDataObj.append("project", formData.projectType);
      formDataObj.append("message", formData.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataObj
      });

      const data = await response.json();

      if (data.success) {
        // استخدام الترجمة لرسالة النجاح
        setStatus({ 
          type: 'success', 
          message: t('contact.successMessage') || 'Message sent successfully!' 
        });
        // تصفير الفورم
        setFormData({ name: '', email: '', projectType: '', message: '' });
      } else {
        // استخدام الترجمة لرسالة الخطأ
        setStatus({ 
          type: 'error', 
          message: t('contact.errorMessage') || 'Something went wrong. Please try again.' 
        });
      }
    } catch (error) {
      // في حالة وجود مشكلة في الاتصال بالسيرفر
      setStatus({ 
        type: 'error', 
        message: t('contact.errorMessage') || 'Server error. Please try again later.' 
      });
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
          <div className="contact-form-wrapper">
            <h3 className="form-title">{t('contact.formTitle')}</h3>
            <form ref={form} onSubmit={handleSubmit} className="contact-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">{t('contact.nameLabel')} <span className="required-star">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
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
                    name="user_email"
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
                    name="project_type"
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
                  name="message"
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
                  <div className="flex items-center gap-2">
                    <span className="loader"></span> Sending...
                  </div>
                ) : (
                  <>
                    <Icon.Mail />
                    <span>{t('contact.sendButton')}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Social Links بنفس الكود بتاعك... */}
          <div className="contact-info-wrapper">
             <div className="social-links-grid">
                {[
                  { href: DATA.header.whatsapp, icon: <Icon.WhatsApp />, label: 'WhatsApp', color: '#25D366' },
                  { href: DATA.header.linkedin, icon: <Icon.Linkedin />, label: 'LinkedIn', color: '#0077b5' },
                  { href: DATA.header.github, icon: <Icon.Github />, label: 'GitHub', color: '#333' },
                  { href: DATA.header.twitter, icon: <Icon.Twitter />, label: 'Twitter', color: '#1da1f2' },
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
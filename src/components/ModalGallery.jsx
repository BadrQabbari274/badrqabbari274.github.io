import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './ModalGallery.css';

export default function ModalGallery({ images, onClose }) {
  const { t } = useLanguage();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images, onClose]);

  if (!images?.length) {
    return (
      <div className="modal-overlay">
        <div className="modal-empty">
          <button onClick={onClose} className="modal-close">✕</button>
          <div className="empty-icon">📷</div>
          <h3>{t('gallery.empty')}</h3>
          <p>{t('gallery.comingSoon')}</p>
          <button onClick={onClose} className="empty-button">{t('gallery.close')}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <button onClick={onClose} className="modal-close-top">✕</button>
      <div className="modal-content">
        <img src={images[idx]} alt="" className="modal-image" />
        <div className="modal-controls">
          <button onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}>
            ← {t('gallery.prev')}
          </button>
          <button onClick={() => setIdx((i) => (i + 1) % images.length)}>
            {t('gallery.next')} →
          </button>
        </div>
      </div>
    </div>
  );
}

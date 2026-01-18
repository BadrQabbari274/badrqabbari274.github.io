import React, { useState, useEffect } from 'react';
import { Icon } from './Icons';
import './ScrollToTop.css';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <div className="scroll-buttons">
          <button
            onClick={scrollToTop}
            className="scroll-button scroll-to-top"
            aria-label="Scroll to top"
          >
            <Icon.ArrowUp />
          </button>
        </div>
      )}
    </>
  );
}

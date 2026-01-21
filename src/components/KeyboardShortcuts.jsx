import React, { useState, useEffect } from "react";
import "./KeyboardShortcuts.css";

export default function KeyboardShortcuts() {
  const [showMessage, setShowMessage] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobileStatus = window.innerWidth <= 768;
      setIsMobile(mobileStatus);
      if (mobileStatus) setShowHint(false);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    const handleKeyPress = (e) => {
      if (window.innerWidth <= 768) return;

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "B") {
        e.preventDefault();
        setShowMessage(true);
        setShowHint(false);
        setTimeout(() => setShowMessage(false), 10000);
      }

      if (!isTyping(e)) {
        if (e.key.toLowerCase() === "g") {
          e.preventDefault();
          window.open("https://github.com/BadrQabbari274", "_blank");
        }
        if (e.key.toLowerCase() === "p") {
          e.preventDefault();
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        }
        if (e.key.toLowerCase() === "c") {
          e.preventDefault();
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    const isTyping = (e) => {
      const target = e.target;
      return target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {showHint && (
        <div className="keyboard-hint">
          <button className="hint-close" onClick={() => setShowHint(false)}>×</button>
          <div className="hint-content">
            <div className="hint-title">⌨️ Keyboard Shortcuts</div>
            <div className="hint-shortcuts">
              <div className="hint-item"><kbd>G</kbd> → GitHub</div>
              <div className="hint-item"><kbd>P</kbd> → Projects</div>
              <div className="hint-item"><kbd>C</kbd> → Contact</div>
              <div className="hint-item"><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> → Secret</div>
            </div>
          </div>
        </div>
      )}

      {showMessage && (
        <div className="recruiter-message">
          <div className="message-content">
            <div className="message-icon">🎯</div>
            <h3 className="message-title">Welcome!</h3>
            <p className="message-text">
              Hi there! Thanks for visiting my portfolio 🤩
                 I'm excited to share my work with you 🥰
                        Feel free to explore, get inspired 😉,
              and reach out if you'd like to connect or chat about projects and ideas 😄
            </p>
            <p className="message-signature">— Badr Eldin Qabbari</p>
            <button className="message-close" onClick={() => setShowMessage(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

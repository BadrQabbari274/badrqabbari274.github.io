import React, { useState, useEffect } from "react";
import "./KeyboardShortcuts.css";

export default function KeyboardShortcuts() {
  const [showMessage, setShowMessage] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Check for Ctrl + Shift + B (or Cmd + Shift + B on Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "B") {
        e.preventDefault();
        setShowMessage(true);
        setShowHint(false);
        setTimeout(() => setShowMessage(false), 5000);
      }

      // G for GitHub
      if (e.key === "g" || e.key === "G") {
        if (!isTyping(e)) {
          e.preventDefault();
          window.open("https://github.com/BadrQabbari274", "_blank");
        }
      }

      // P for Projects
      if (e.key === "p" || e.key === "P") {
        if (!isTyping(e)) {
          e.preventDefault();
          document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth" });
        }
      }

      // C for Contact
      if (e.key === "c" || e.key === "C") {
        if (!isTyping(e)) {
          e.preventDefault();
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Check if user is typing in an input/textarea
    const isTyping = (e) => {
      const target = e.target;
      return (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      );
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <>
      {/* Hint Box */}
      {showHint && (
        <div className="keyboard-hint">
          <button
            className="hint-close"
            onClick={() => setShowHint(false)}
            aria-label="Close hint"
          >
            ×
          </button>
          <div className="hint-content">
            <div className="hint-title">⌨️ Keyboard Shortcuts</div>
            <div className="hint-shortcuts">
              <div className="hint-item">
                <kbd>G</kbd> → GitHub
              </div>
              <div className="hint-item">
                <kbd>P</kbd> → Projects
              </div>
              <div className="hint-item">
                <kbd>C</kbd> → Contact
              </div>
              <div className="hint-item">
                <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> → Secret
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recruiter Message */}
      {showMessage && (
        <div className="recruiter-message">
          <div className="message-content">
            <div className="message-icon">🎯</div>
            <h3 className="message-title">Welcome!</h3>
            <p className="message-text">
              Hi there! Thanks for visiting my portfolio 🤩 I'm excited to share
              my work with you 🥰 Feel free to explore, get inspired, and reach
              out if you'd like to connect or chat about projects and ideas 😄
            </p>
            <p className="message-signature">— Badr Eldin Qabbari</p>
            <button
              className="message-close"
              onClick={() => setShowMessage(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

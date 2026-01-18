import React, { useState, useEffect } from "react";
import "./KeyboardShortcuts.css";

export default function KeyboardShortcuts() {
  const [showMessage, setShowMessage] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [isMobile, setIsMobile] = useState(false); // حالة جديدة للتأكد من نوع الجهاز

  useEffect(() => {
    // 1. التأكد من حجم الشاشة (لو أصغر من 768px نعتبره موبايل)
    const checkDevice = () => {
      const mobileStatus = window.innerWidth <= 768;
      setIsMobile(mobileStatus);
      if (mobileStatus) setShowHint(false); // إخفاء التلميحات فوراً لو موبايل
    };

    checkDevice(); // تشغيل الفحص عند التحميل
    window.addEventListener("resize", checkDevice); // تحديث الحالة لو المستخدم غير حجم المتصفح

    const handleKeyPress = (e) => {
      // لو موبايل، اخرج من الفانكشن وماتعملش حاجة
      if (window.innerWidth <= 768) return;

      // Ctrl + Shift + B
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "B") {
        e.preventDefault();
        setShowMessage(true);
        setShowHint(false);
        // الرسالة هتختفي بعد 5 ثواني
        setTimeout(() => setShowMessage(false), 5000);
      }

      // باقي الاختصارات (G, P, C)
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

  // لو موبايل، مش هنعرض أي حاجة خالص (Return null)
  if (isMobile) return null;

  return (
    <>
      {/* Hint Box */}
      {showHint && (
        <div className="keyboard-hint">
          {/* ... كود التلميحات زي ما هو ... */}
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
            <button className="message-close" onClick={() => setShowMessage(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
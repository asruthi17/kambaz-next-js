// app/(Kambaz)/layout.tsx
'use client';
import { ReactNode, useState, useEffect } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";

export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
  const [showKambazNav, setShowKambazNav] = useState(false);

  useEffect(() => {
    const handleToggle = () => setShowKambazNav(prev => !prev);
    window.addEventListener('toggleKambazNav', handleToggle);
    return () => window.removeEventListener('toggleKambazNav', handleToggle);
  }, []);

  return (
    <div id="wd-kambaz">
      <div className="d-flex">
        <div className="d-none d-md-block position-fixed" style={{ width: '110px', height: '100vh', zIndex: 2, backgroundColor: 'black' }}>
          <KambazNavigation />
        </div>
        <div className="wd-main-content-offset p-3 flex-fill">
          {children}
        </div>
      </div>

      {showKambazNav && (
        <div className="position-fixed" style={{ width: '100%', height: '100vh', zIndex: 2000, top: 0, left: 0, backgroundColor: 'white' }}>
          <KambazNavigation isMobile={true} onClose={() => setShowKambazNav(false)} />
        </div>
      )}
    </div>
  );
}
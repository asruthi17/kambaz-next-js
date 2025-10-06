// app/(Kambaz)/layout.tsx
'use client';
import { ReactNode, useState } from "react";
import KambazNavigation from "./Navigation";
import { FaBars } from "react-icons/fa";
import "./styles.css";

export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
  const [showKambazNav, setShowKambazNav] = useState(false);

  return (
    <div id="wd-kambaz">
      <div className="d-md-none bg-dark text-white p-3">
        <button onClick={() => setShowKambazNav(!showKambazNav)} className="btn text-white p-0">
          <FaBars size={24} />
        </button>
      </div>

      <div className="d-flex">
        <div className="d-none d-md-block position-fixed" style={{ width: '110px', height: '100vh', zIndex: 2 }}>
          <KambazNavigation />
        </div>
        <div className="wd-main-content-offset p-3 flex-fill">
          {children}
        </div>
      </div>

      {showKambazNav && (
        <div className="position-fixed bg-white d-md-none" style={{ width: '100%', height: '100vh', zIndex: 2000, top: 0, left: 0 }}>
          <KambazNavigation isMobile={true} onClose={() => setShowKambazNav(false)} />
        </div>
      )}
    </div>
  );
}
'use client';
import { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import KambazNavigation from "./Navigation";
import { FaBars } from "react-icons/fa";
import "./styles.css";

export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
  const [showKambazNav, setShowKambazNav] = useState(false);
  const pathname = usePathname();
  const isCoursePage = pathname.includes('/Courses/');

  useEffect(() => {
    const handleToggle = () => setShowKambazNav(prev => !prev);
    window.addEventListener('toggleKambazNav', handleToggle);
    return () => window.removeEventListener('toggleKambazNav', handleToggle);
  }, []);

  return (
    <div id="wd-kambaz" style={{ zoom: '0.85', minHeight: '100vh' }}>
      {!isCoursePage && (
        <div className="d-md-none bg-dark text-white p-3">
          <button onClick={() => setShowKambazNav(!showKambazNav)} className="btn text-white p-0">
            <FaBars size={24} />
          </button>
        </div>
      )}

      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <div className="d-none d-md-block position-fixed" style={{ width: '110px', minHeight: '100vh', height: '100%', zIndex: 2, backgroundColor: 'black', top: 0, left: 0, bottom: 0 }}>
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
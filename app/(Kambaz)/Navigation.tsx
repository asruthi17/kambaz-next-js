// app/(Kambaz)/Navigation.tsx
"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser} from "react-icons/fa6";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdHistory } from "react-icons/md";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTimes } from "react-icons/fa";

export default function KambazNavigation({ isMobile = false, onClose }: { isMobile?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  const links = [
    { href: "/Account", label: "Account", icon: FaRegCircleUser, id: "wd-account-link" },
    { href: "/Dashboard", label: "Dashboard", icon: AiOutlineDashboard, id: "wd-dashboard-link" },
    { href: "/Courses", label: "Courses", icon: LiaBookSolid, id: "wd-course-link" },
    { href: "/Calendar", label: "Calendar", icon: IoCalendarOutline, id: "wd-calendar-link" },
    { href: "/Inbox", label: "Inbox", icon: FaInbox, id: "wd-inbox-link" },
    { href: "/Labs", label: "Labs", icon: LiaCogSolid, id: "wd-labs-link" },
  ];

  // Mobile overlay version
  if (isMobile) {
    return (
      <div className="bg-white h-100 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <svg width="40" height="40" viewBox="0 0 40 40" className="me-2">
              <circle cx="20" cy="20" r="18" fill="none" stroke="#DC143C" strokeWidth="2" strokeDasharray="4 2"/>
            </svg>
            <h2 className="text-danger mb-0 fw-bold">CANVAS</h2>
          </div>
          <button onClick={onClose} className="btn p-0">
            <FaTimes size={24} />
          </button>
        </div>

        <div className="d-flex flex-column gap-3">
          {links.map((link) => {
  const Icon = link.icon;
  return (
    <Link
      key={link.href}
      href={link.href}
      className="d-flex align-items-center text-decoration-none text-danger p-2"
      onClick={onClose}
    >
      <Icon size={28} className="me-3" />
      <span className="fs-5">{link.label}</span>
      <span className="ms-auto">&gt;</span>
    </Link>
  );
})}
        </div>
      </div>
    );
  }

  // Desktop sidebar version
 // Desktop sidebar version
return (
  <ListGroup 
    className="rounded-0 bg-black" 
    style={{ width: 110, minHeight: '100vh' }}
    id="wd-kambaz-navigation"
  >
    <ListGroupItem className="bg-black border-0 text-center py-3" as="a"
      target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
      <img src="/images/NEU.svg" width="75px" alt="Northeastern University" />
    </ListGroupItem>
    
    {links.map((link) => {
      const Icon = link.icon;
      const isActive = pathname.startsWith(link.href);
      const isAccount = link.href === "/Account";
      
      return (
        <ListGroupItem 
          key={`${link.href}-${link.label}`}
          className={`border-0 text-center py-2 ${isActive ? 'bg-white' : 'bg-black'}`}
        >
          <Link 
            href={link.href} 
            id={link.id} 
            className="text-decoration-none d-flex flex-column align-items-center"
          >
            <Icon className={`fs-1 mb-1 ${
              isActive 
                ? 'text-danger' 
                : isAccount 
                  ? 'text-white' 
                  : 'text-danger'
            }`} />
            <span className={`small ${isActive ? 'text-danger' : 'text-white'}`}>
              {link.label}
            </span>
          </Link>
        </ListGroupItem>
      );
    })}
  </ListGroup>

  );
}
"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTimes } from "react-icons/fa";

export default function KambazNavigation({ isMobile = false, onClose }: { isMobile?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/Courses", icon: LiaBookSolid },
    { label: "Calendar", path: "/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid },
  ];

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
          <Link href="/Account" className="d-flex align-items-center text-decoration-none text-danger p-2" onClick={onClose}>
            <FaRegCircleUser size={28} className="me-3" />
            <span className="fs-5">Account</span>
            <span className="ms-auto">&gt;</span>
          </Link>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                href={link.path}
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

  return (
    <ListGroup 
      className="rounded-0 bg-black" 
      style={{ width: 110, minHeight: '100vh' }}
      id="wd-kambaz-navigation"
    >
      <ListGroupItem className="bg-black border-0 text-center py-3" as="a"
        target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
        <img src="/images/neulogo.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>
      
      <ListGroupItem 
        as={Link} 
        href="/Account"
        className={`text-center border-0 ${pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"}`}
      >
        <FaRegCircleUser className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`} />
        <br />
        Account
      </ListGroupItem>

      {links.map((link) => (
        <ListGroupItem 
          key={link.path} 
          as={Link} 
          href={link.path}
          className={`bg-black text-center border-0 ${pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"}`}
        >
          {link.icon({ className: "fs-1 text-danger" })}
          <br />
          {link.label}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
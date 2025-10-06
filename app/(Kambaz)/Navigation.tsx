"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
  const pathname = usePathname();

  const links = [
    { href: "/Account", label: "Account", icon: FaRegCircleUser, id: "wd-account-link" },
    { href: "/Dashboard", label: "Dashboard", icon: AiOutlineDashboard, id: "wd-dashboard-link" },
    { href: "/Courses", label: "Courses", icon: LiaBookSolid, id: "wd-course-link" },
    { href: "/Calendar", label: "Calendar", icon: IoCalendarOutline, id: "wd-calendar-link" },
    { href: "/Inbox", label: "Inbox", icon: FaInbox, id: "wd-inbox-link" },
    { href: "/Labs", label: "Labs", icon: LiaCogSolid, id: "wd-labs-link" },
  ];

  return (
    <ListGroup 
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" 
      style={{ width: 110 }}
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
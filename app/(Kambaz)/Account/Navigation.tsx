/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const pathname = usePathname();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  // Build links array based on user status
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  
  // Add Users link only for ADMIN users
  if (currentUser && currentUser.role === "ADMIN") {
    links.push("Users");
  }
  
  return (
    <div id="wd-account-navigation" className="list-group" style={{ width: "200px" }}>
      {links.map((link) => (
        <Link 
          key={link}
          href={`/Account/${link}`} 
          className={`list-group-item list-group-item-action border-0 ${
            pathname === `/Account/${link}` 
              ? "border-start border-dark border-4 text-dark fw-bold" 
              : "text-danger"
          }`}
          style={{ backgroundColor: 'transparent' }}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
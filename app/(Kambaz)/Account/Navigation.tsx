"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AccountNavigation() {
  const pathname = usePathname();
  
  return (
    <div id="wd-account-navigation" className="list-group" style={{ width: "200px" }}>
      <Link 
        href="/Account/Signin" 
        className={`list-group-item list-group-item-action border-0 ${
          pathname === "/Account/Signin" 
            ? "border-start border-dark border-4 text-dark fw-bold" 
            : "text-danger"
        }`}
        style={{ backgroundColor: 'transparent' }}
      >
        Signin
      </Link>
      <Link 
        href="/Account/Signup" 
        className={`list-group-item list-group-item-action border-0 ${
          pathname === "/Account/Signup" 
            ? "border-start border-dark border-4 text-dark fw-bold" 
            : "text-danger"
        }`}
        style={{ backgroundColor: 'transparent' }}
      >
        Signup
      </Link>
      <Link 
        href="/Account/Profile" 
        className={`list-group-item list-group-item-action border-0 ${
          pathname === "/Account/Profile" 
            ? "border-start border-dark border-4 text-dark fw-bold" 
            : "text-danger"
        }`}
        style={{ backgroundColor: 'transparent' }}
      >
        Profile
      </Link>
    </div>
  );
}

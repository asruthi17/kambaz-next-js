import Link from "next/link";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="list-group" style={{ width: "200px" }}>
      <Link 
        href="/Account/Signin" 
        className="list-group-item list-group-item-action text-danger border-0"
      >
        Signin
      </Link>
      <Link 
        href="/Account/Signup" 
        className="list-group-item list-group-item-action text-danger border-0"
      >
        Signup
      </Link>
      <Link 
        href="/Account/Profile" 
        className="list-group-item list-group-item-action text-danger border-0"
      >
        Profile
      </Link>
    </div>
  );
}
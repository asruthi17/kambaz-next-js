import Link from "next/link";
import { Form} from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h3>Sign in</h3>
      <Form.Control 
        placeholder="username" 
        defaultValue="alice" 
        className="wd-username mb-2" 
      />
      <Form.Control 
        placeholder="password" 
        defaultValue="Alice@123" 
        type="password" 
        className="wd-password mb-2" 
      />
      <Link href="/Dashboard" id="wd-signin-btn" className="btn btn-primary w-100 mb-2">
        Sign in
      </Link>
      <Link href="/Account/Signup" id="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}
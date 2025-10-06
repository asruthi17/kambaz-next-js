import Link from "next/link";
import { Form} from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h3>Sign up</h3>
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
      <Form.Control 
        placeholder="verify password" 
        defaultValue="Alice@123" 
        type="password" 
        className="wd-password-verify mb-2" 
      />
      <Link href="/Dashboard" className="btn btn-primary w-100 mb-2">
        Sign up
      </Link>
      <Link href="/Account/Signin">
        Sign in
      </Link>
    </div>
  );
}
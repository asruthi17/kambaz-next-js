"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) return;
      dispatch(setCurrentUser(user));
      router.push("/Dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signin failed");
    }
  };

  return (
    <div id="wd-signin-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h3>Sign in</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form.Control
        value={credentials.username || ""}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="mb-2"
        placeholder="username"
        id="wd-username"
      />
      <Form.Control
        value={credentials.password || ""}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />
      <Button onClick={signin} id="wd-signin-btn" className="w-100 mb-2">
        Sign in
      </Button>
      <Link href="/Account/Signup" id="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}
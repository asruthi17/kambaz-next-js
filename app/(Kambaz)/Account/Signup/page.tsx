"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/Dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div id="wd-signup-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h3>Sign up</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form.Control
        value={user.username || ""}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
        className="mb-2"
      />
      <Form.Control
        value={user.password || ""}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        type="password"
        className="mb-2"
      />
      <Form.Control
        value={user.firstName || ""}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        placeholder="first name"
        className="mb-2"
      />
      <Form.Control
        value={user.lastName || ""}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        placeholder="last name"
        className="mb-2"
      />
      <Button onClick={signup} className="w-100 mb-2">
        Sign up
      </Button>
      <Link href="/Account/Signin">Sign in</Link>
    </div>
  );
}
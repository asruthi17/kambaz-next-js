"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { Form, Button } from "react-bootstrap";
import * as client from "../client";
import { RootState } from "../../store";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  useEffect(() => {
    if (currentUser) {
      setProfile(currentUser);
    } else {
      router.push("/Account/Signin");
    }
  }, [currentUser]);

  const updateProfile = async () => {
    try {
      const updatedProfile = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedProfile));
    } catch (err: any) {
      console.error("Update failed", err);
    }
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    router.push("/Account/Signin");
  };

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <Form.Control
            id="wd-username"
            className="mb-2"
            value={profile.username || ""}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            placeholder="username"
          />
          <Form.Control
            id="wd-password"
            className="mb-2"
            value={profile.password || ""}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            placeholder="password"
            type="password"
          />
          <Form.Control
            id="wd-firstname"
            className="mb-2"
            value={profile.firstName || ""}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            placeholder="first name"
          />
          <Form.Control
            id="wd-lastname"
            className="mb-2"
            value={profile.lastName || ""}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            placeholder="last name"
          />
          <Form.Control
            id="wd-dob"
            className="mb-2"
            type="date"
            value={profile.dob || ""}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <Form.Control
            id="wd-email"
            className="mb-2"
            value={profile.email || ""}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            placeholder="email"
          />
          <select
            className="form-control mb-2"
            id="wd-role"
            value={profile.role || "USER"}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <Button onClick={updateProfile} className="w-100 mb-2">
            Update Profile
          </Button>
          <Button onClick={signout} variant="danger" className="w-100 mb-2" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
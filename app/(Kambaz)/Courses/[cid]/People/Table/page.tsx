/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Table, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as coursesClient from "../../../client";
import * as accountClient from "../../../../Account/client";
import PeopleDetails from "./Details";

export default function PeopleTable({ 
  users: propUsers, 
  fetchUsers: propFetchUsers 
}: { 
  users?: any[]; 
  fetchUsers?: () => void; 
} = {}) {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [users, setUsers] = useState<any[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "INSTRUCTOR";

  const fetchUsers = async () => {
    if (propFetchUsers) {
      propFetchUsers();
      return;
    }
    const users = await coursesClient.findUsersForCourse(cid as string);
    setUsers(users);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!isFaculty) {
      alert("Only instructors can delete users");
      return;
    }
    if (window.confirm("Are you sure you want to remove this user from the course?")) {
      await accountClient.deleteUser(userId);
      setUsers(users.filter((u) => u._id !== userId));
    }
  };

  useEffect(() => {
    if (propUsers) {
      setUsers(propUsers);
    } else {
      fetchUsers();
    }
  }, [propUsers]);

  const displayUsers = propUsers || users;

  console.log("showDetails:", showDetails);
  console.log("showUserId:", showUserId);

  return (
    <div id="wd-people-table">
      {showDetails && (
        <PeopleDetails
          uid={showUserId}
          onClose={() => {
            console.log("Closing details"); 
            setShowDetails(false);
            fetchUsers();
          }}
        />
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            {isFaculty && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {displayUsers.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    console.log("Clicked user:", user._id, user.firstName, user.lastName); 
                    setShowDetails(true);
                    setShowUserId(user._id);
                  }}
                >
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
                </span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
              {isFaculty && (
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

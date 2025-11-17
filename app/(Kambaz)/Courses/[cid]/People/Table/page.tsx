/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Table, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as coursesClient from "../../../client";
import * as accountClient from "../../../../Account/client";
import { RootState } from "../../../../store";

export default function PeopleTable() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [users, setUsers] = useState<any[]>([]);

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "INSTRUCTOR";

  const fetchUsers = async () => {
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
    fetchUsers();
  }, []);

  return (
    <div id="wd-people-table">
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
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
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
"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { BsGripVertical, BsThreeDotsVertical, BsSearch } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  
  const assignments = useSelector((state: any) =>
    state.assignmentsReducer.assignments.filter(
      (assignment: any) => assignment.course === cid
    )
  );

  const handleDeleteAssignment = (assignmentId: string) => {
    if (window.confirm("Are you sure you want to remove this assignment?")) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="position-relative" style={{ width: "300px" }}>
          <BsSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
          <input
            placeholder="Search for Assignments"
            id="wd-search-assignment"
            className="form-control ps-5 border-dark"
          />
        </div>
        <div>
          <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
            <FaPlus className="me-1" /> Group
          </Button>
          <Link href={`/Courses/${cid}/Assignments/new`}>
            <Button variant="danger" id="wd-add-assignment">
              <FaPlus className="me-1" /> Assignment
            </Button>
          </Link>
        </div>
      </div>

      <div className="wd-module p-0 mb-3 fs-5 border border-dark">
        <div className="wd-title p-3 bg-secondary d-flex align-items-center">
          <BsGripVertical className="me-2 fs-3" />
          <IoMdArrowDropdown className="me-2" />
          <strong>ASSIGNMENTS</strong>
          <div className="ms-auto d-flex align-items-center">
            <span
              className="badge bg-light text-dark border me-2"
              style={{
                fontSize: "14px",
                fontWeight: "normal",
                padding: "8px 16px",
                borderRadius: "20px",
              }}
            >
              40% of Total
            </span>
            <button
              className="btn btn-outline-dark btn-sm me-2"
              style={{
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                padding: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaPlus />
            </button>
            <BsThreeDotsVertical className="fs-4" />
          </div>
        </div>

        <ul id="wd-assignment-list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {assignments.map((assignment: any) => (
            <li
              key={assignment._id}
              className="wd-assignment-list-item p-3 bg-white"
              style={{ borderLeft: "4px solid green" }}
            >
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3 text-muted" />
                <MdEditDocument className="me-3 fs-3 text-success" />
                <div className="flex-grow-1">
                  <Link
                    href={`/Courses/${cid}/Assignments/${assignment._id}`}
                    className="wd-assignment-link text-decoration-none text-dark"
                    style={{ fontSize: "18px", fontWeight: "bold" }}
                  >
                    {assignment.title}
                  </Link>
                  <div className="text-muted" style={{ fontSize: "12px" }}>
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <span>Not available until {assignment.availableDate}</span> |
                    <br />
                    <span>
                      <strong>Due</strong> {assignment.dueDate}
                    </span>{" "}
                    | <span>{assignment.points} pts</span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <FaCheckCircle className="text-success me-3 fs-5" />
                  <button
                    className="btn btn-link text-danger p-0 me-3"
                    onClick={() => handleDeleteAssignment(assignment._id)}
                    title="Delete Assignment"
                  >
                    <FaTrash className="fs-5" />
                  </button>
                  <BsThreeDotsVertical className="fs-5" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
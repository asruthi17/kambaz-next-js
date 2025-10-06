// app/(Kambaz)/Courses/[cid]/Assignments/page.tsx
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { Button } from "react-bootstrap";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input 
          placeholder="Search for Assignments"
          id="wd-search-assignment" 
          className="form-control w-50"
          style={{ marginRight: "10px" }}
        />
        <div>
          <Button variant="secondary" size="lg" className="me-2" id="wd-add-assignment-group">
            <FaPlus className="me-1" /> Group
          </Button>
          <Button variant="danger" size="lg" id="wd-add-assignment">
            <FaPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>

      <div className="wd-module p-0 mb-3 fs-5 border-gray" style={{ border: "1px solid gray" }}>
        <div className="wd-title p-3 bg-secondary d-flex align-items-center">
          <BsGripVertical className="me-2 fs-3" />
          <IoMdArrowDropdown className="me-2" />
          <strong>ASSIGNMENTS</strong>
          <span className="ms-3" style={{ fontSize: "14px", fontWeight: "normal" }}>
            40% of Total
          </span>
          <div className="ms-auto">
            <button className="btn btn-outline-secondary btn-sm me-2" style={{ borderRadius: "20px" }}>
              <FaPlus />
            </button>
            <BsThreeDotsVertical className="fs-4" />
          </div>
        </div>

        <ul id="wd-assignment-list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li className="wd-assignment-list-item p-3" style={{ borderLeft: "3px solid green", borderBottom: "1px solid #e9ecef" }}>
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <MdEditDocument className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link text-decoration-none fw-bold text-dark">
                  A1 - ENV + HTML
                </Link>
                <div className="text-muted" style={{ fontSize: "13px" }}>
                  <span className="text-danger">Multiple Modules</span> | Not available until May 6 at 12:00am | 
                  <br />
                  <strong>Due</strong> May 13 at 11:59pm | 100 pts
                </div>
              </div>
              <div>
                <FaCheckCircle className="text-success me-2" />
                <BsThreeDotsVertical />
              </div>
            </div>
          </li>

          <li className="wd-assignment-list-item p-3" style={{ borderLeft: "3px solid green", borderBottom: "1px solid #e9ecef" }}>
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <MdEditDocument className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link href="/Courses/1234/Assignments/234" className="wd-assignment-link text-decoration-none fw-bold text-dark">
                  A2 - CSS + BOOTSTRAP
                </Link>
                <div className="text-muted" style={{ fontSize: "13px" }}>
                  <span className="text-danger">Multiple Modules</span> | Not available until May 13 at 12:00am | 
                  <br />
                  <strong>Due</strong> May 20 at 11:59pm | 100 pts
                </div>
              </div>
              <div>
                <FaCheckCircle className="text-success me-2" />
                <BsThreeDotsVertical />
              </div>
            </div>
          </li>

          <li className="wd-assignment-list-item p-3" style={{ borderLeft: "3px solid green" }}>
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <MdEditDocument className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link href="/Courses/1234/Assignments/345" className="wd-assignment-link text-decoration-none fw-bold text-dark">
                  A3 - JAVASCRIPT + REACT
                </Link>
                <div className="text-muted" style={{ fontSize: "13px" }}>
                  <span className="text-danger">Multiple Modules</span> | Not available until May 20 at 12:00am | 
                  <br />
                  <strong>Due</strong> May 27 at 11:59pm | 100 pts
                </div>
              </div>
              <div>
                <FaCheckCircle className="text-success me-2" />
                <BsThreeDotsVertical />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import * as client from "./client";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<any>({});

  const fetchAssignment = async () => {
    const assignment = await client.fetchAssignment();
    setAssignment(assignment);
  };

  const updateTitle = async () => {
    const updatedAssignment = await client.updateTitle(assignment.title);
    setAssignment(updatedAssignment);
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>
      <h4>Assignment</h4>
      <Form.Control
        defaultValue={assignment.title}
        className="mb-2"
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <Form.Control
        as="textarea"
        rows={3}
        defaultValue={assignment.description}
        className="mb-2"
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />
      <Form.Control
        type="date"
        className="mb-2"
        value={assignment.due}
        onChange={(e) =>
          setAssignment({ ...assignment, due: e.target.value })
        }
      />
      <div className="form-check form-switch mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="wd-completed"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="wd-completed">
          Completed
        </label>
      </div>
      <button
        className="btn btn-primary me-2"
        onClick={updateTitle}
      >
        Update Title
      </button>
      <button
        className="btn btn-secondary"
        onClick={fetchAssignment}
      >
        Fetch Assignment
      </button>
      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
    </div>
  );
}
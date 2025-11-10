/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form, Button } from "react-bootstrap";
import Select from "react-select";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addAssignment, updateAssignment } from "../reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  // Get current user from Redux state
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  // Check if user is faculty/instructor
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "INSTRUCTOR";

  // Students can view but not edit

  const assignment = useSelector((state: any) =>
    state.assignmentsReducer.assignments.find((a: any) => a._id === aid)
  );

  const isNewAssignment = aid === "new";

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableDate: "",
    availableUntilDate: "",
  });

  useEffect(() => {
    if (!isNewAssignment && assignment) {
      setFormData({
        title: assignment.title || "",
        description: assignment.description || "",
        points: assignment.points || 100,
        dueDate: assignment.dueDate || "",
        availableDate: assignment.availableDate || "",
        availableUntilDate: assignment.availableUntilDate || assignment.dueDate || "",
      });
    }
  }, [assignment, isNewAssignment]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    const fieldName = id.replace("wd-", "").replace(/-./g, (x) => x[1].toUpperCase());
    setFormData((prev) => ({
      ...prev,
      [fieldName]: id === "wd-points" ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    if (!isFaculty) {
      alert("Only instructors can save assignments");
      return;
    }

    if (isNewAssignment) {
      const newAssignment = {
        _id: `A${Date.now()}`,
        course: cid as string,
        ...formData,
      };
      dispatch(addAssignment(newAssignment));
    } else {
      const updatedAssignment = {
        _id: aid as string,
        course: cid as string,
        ...formData,
      };
      dispatch(updateAssignment(updatedAssignment));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  // Don't render the form if user is not faculty
  if (!isFaculty && !assignment && !isNewAssignment) {
    return null;
  }

  // For new assignments, show default form
  const displayTitle = isNewAssignment ? "New Assignment" : formData.title;

  return (
    <div style={{ zoom: "0.85" }}>
      <div id="wd-assignments-editor" className="container-fluid p-3">
        <div className="row mb-3">
          <div className="col-12">
            <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
            <Form.Control
              id="wd-title"
              value={displayTitle}
              onChange={handleInputChange}
              className="border-dark"
              disabled={!isFaculty}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12">
            <Form.Label htmlFor="wd-description">Description</Form.Label>
            <Form.Control
              as="textarea"
              id="wd-description"
              rows={8}
              value={formData.description}
              onChange={handleInputChange}
              className="border-dark"
              placeholder="The assignment is available online"
              disabled={!isFaculty}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12">
            <div className="row">
              <Form.Label className="col-md-3 col-form-label text-md-end">
                Points
              </Form.Label>
              <div className="col-md-9">
                <Form.Control
                  id="wd-points"
                  type="number"
                  value={formData.points}
                  onChange={handleInputChange}
                  className="border-dark"
                  disabled={!isFaculty}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12">
            <div className="row">
              <Form.Label className="col-md-3 col-form-label text-md-end">
                Assignment Group
              </Form.Label>
              <div className="col-md-9">
                <Form.Select
                  id="wd-group"
                  defaultValue="ASSIGNMENTS"
                  className="border-dark"
                  disabled={!isFaculty}
                >
                  <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                  <option value="QUIZZES">QUIZZES</option>
                  <option value="EXAMS">EXAMS</option>
                  <option value="PROJECT">PROJECT</option>
                </Form.Select>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12">
            <div className="row">
              <Form.Label className="col-md-3 col-form-label text-md-end">
                Display Grade as
              </Form.Label>
              <div className="col-md-9">
                <Form.Select
                  id="wd-display-grade-as"
                  defaultValue="Percentage"
                  className="border-dark"
                  disabled={!isFaculty}
                >
                  <option value="Percentage">Percentage</option>
                  <option value="Points">Points</option>
                  <option value="Complete/Incomplete">Complete/Incomplete</option>
                </Form.Select>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12">
            <div className="row">
              <Form.Label className="col-md-3 col-form-label text-md-end">
                Submission Type
              </Form.Label>
              <div className="col-md-9">
                <div className="border border-dark p-3">
                  <div className="row">
                    <div className="col-12">
                      <Form.Select
                        id="wd-submission-type"
                        defaultValue="Online"
                        className="mb-3 border-dark"
                        disabled={!isFaculty}
                      >
                        <option value="Online">Online</option>
                        <option value="On Paper">On Paper</option>
                        <option value="External Tool">External Tool</option>
                      </Form.Select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="mb-2 fw-bold">Online Entry Options</div>
                      <Form.Check
                        type="checkbox"
                        id="wd-text-entry"
                        label="Text Entry"
                        className="mb-1"
                        disabled={!isFaculty}
                      />
                      <Form.Check
                        type="checkbox"
                        id="wd-website-url"
                        label="Website URL"
                        defaultChecked
                        className="mb-1"
                        disabled={!isFaculty}
                      />
                      <Form.Check
                        type="checkbox"
                        id="wd-media-recordings"
                        label="Media Recordings"
                        className="mb-1"
                        disabled={!isFaculty}
                      />
                      <Form.Check
                        type="checkbox"
                        id="wd-student-annotation"
                        label="Student Annotation"
                        className="mb-1"
                        disabled={!isFaculty}
                      />
                      <Form.Check
                        type="checkbox"
                        id="wd-file-upload"
                        label="File Uploads"
                        disabled={!isFaculty}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12">
            <div className="row">
              <Form.Label className="col-md-3 col-form-label text-md-end">
                Assign
              </Form.Label>
              <div className="col-md-9">
                <div className="border border-dark p-3">
                  <div className="row mb-3">
                    <div className="col-12">
                      <Form.Label htmlFor="wd-assign-to" className="fw-bold">
                        Assign to
                      </Form.Label>
                      <Select
                        inputId="wd-assign-to"
                        placeholder="Select..."
                        classNamePrefix="assign"
                        isMulti
                        closeMenuOnSelect={false}
                        defaultValue={[{ value: "everyone", label: "Everyone" }]}
                        options={[
                          { value: "everyone", label: "Everyone" },
                          { value: "students", label: "Students only" },
                          { value: "tas", label: "TA's" },
                        ]}
                        styles={{
                          container: (base) => ({ ...base, width: "100%" }),
                          control: (base) => ({ ...base, borderColor: "black" }),
                        }}
                        isDisabled={!isFaculty}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-12">
                      <Form.Label htmlFor="wd-due-date" className="fw-bold">
                        Due
                      </Form.Label>
                      <Form.Control
                        id="wd-due-date"
                        type="date"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        className="border-dark"
                        style={{ borderColor: "black" }}
                        disabled={!isFaculty}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <Form.Label htmlFor="wd-available-from" className="fw-bold">
                        Available from
                      </Form.Label>
                      <Form.Control
                        id="wd-available-date"
                        type="date"
                        value={formData.availableDate}
                        onChange={handleInputChange}
                        className="border-dark"
                        disabled={!isFaculty}
                      />
                    </div>
                    <div className="col-md-6">
                      <Form.Label htmlFor="wd-available-until" className="fw-bold">
                        Until
                      </Form.Label>
                      <Form.Control
                        id="wd-available-until-date"
                        type="date"
                        value={formData.availableUntilDate}
                        onChange={handleInputChange}
                        className="border-dark"
                        disabled={!isFaculty}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <Button variant="light" className="me-2 border" onClick={handleCancel}>
              Cancel
            </Button>
            {isFaculty && (
              <Button variant="danger" onClick={handleSave}>
                Save
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
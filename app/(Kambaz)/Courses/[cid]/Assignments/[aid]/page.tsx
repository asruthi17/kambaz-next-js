
'use client';
import { Form, Button } from "react-bootstrap";
import Select from "react-select";
import { useParams } from "next/navigation";

export default function AssignmentEditor() {
  const params = useParams();
  const assignmentId = params.aid as string;


  const assignmentDetails: Record<string, { name: string; dueDate: string; availableFrom: string; availableUntil: string }> = {
    "123": {
      name: "A1 - ENV + HTML",
      dueDate: "2024-05-13T23:59",
      availableFrom: "2024-05-06T00:00",
      availableUntil: "2024-05-20T23:59"
    },
    "234": {
      name: "A2 - CSS + BOOTSTRAP",
      dueDate: "2024-05-20T23:59",
      availableFrom: "2024-05-13T00:00",
      availableUntil: "2024-05-27T23:59"
    },
    "345": {
      name: "A3 - JAVASCRIPT + REACT",
      dueDate: "2024-05-27T23:59",
      availableFrom: "2024-05-20T00:00",
      availableUntil: "2024-06-03T23:59"
    }
  };

  const assignment = assignmentDetails[assignmentId] || {
    name: "A1 - ENV + HTML",
    dueDate: "2024-05-13T23:59",
    availableFrom: "2024-05-06T00:00",
    availableUntil: "2024-05-20T23:59"
  };

  return (
    <div style={{ zoom: '0.85' }}>
      <div id="wd-assignments-editor" className="container-fluid p-3">
        <div className="row mb-3">
          <div className="col-12">
            <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
            <Form.Control id="wd-name" defaultValue={assignment.name} className="border-dark" />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12">
            <div className="border border-dark p-3">
              <p className="mb-2">
                The assignment is <span style={{ color: 'red' }}>available online</span>
              </p>
              <p className="mb-2">
                Submit a link to the landing page of your Web application running on Netlify.
              </p>
              <p className="mb-2">The landing page should include the following:</p>
              <ul>
                <li>Your full name and section</li>
                <li>Links to each of the lab assignments</li>
                <li>Link to the Kanbas application</li>
                <li>Links to all relevant source code repositories</li>
              </ul>
              <p className="mb-0">
                The Kanbas application should include a link to navigate back to the landing page.
              </p>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12">
            <div className="row">
              <Form.Label className="col-md-3 col-form-label text-md-end">
                Points
              </Form.Label>
              <div className="col-md-9">
                <Form.Control id="wd-points" type="number" defaultValue={100} className="border-dark" />
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
                <Form.Select id="wd-group" defaultValue="ASSIGNMENTS" className="border-dark">
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
                <Form.Select id="wd-display-grade-as" defaultValue="Percentage" className="border-dark">
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
                      <Form.Select id="wd-submission-type" defaultValue="Online" className="mb-3 border-dark">
                        <option value="Online">Online</option>
                        <option value="On Paper">On Paper</option>
                        <option value="External Tool">External Tool</option>
                      </Form.Select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="mb-2 fw-bold">Online Entry Options</div>
                      <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" className="mb-1" />
                      <Form.Check type="checkbox" id="wd-website-url" label="Website URL" defaultChecked className="mb-1" />
                      <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" className="mb-1" />
                      <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" className="mb-1" />
                      <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
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
              <Form.Label className="col-md-3 col-form-label text-md-end">Assign</Form.Label>
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
                          control: (base) => ({ ...base, borderColor: 'black' })
                        }}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-12">
                      <Form.Label htmlFor="wd-due-date" className="fw-bold">Due</Form.Label>
                      <Form.Control 
                        id="wd-due-date" 
                        type="datetime-local" 
                        defaultValue={assignment.dueDate} 
                        className="border-dark"
                        style={{ borderColor: 'black' }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <Form.Label htmlFor="wd-available-from" className="fw-bold">
                        Available from
                      </Form.Label>
                      <Form.Control 
                        id="wd-available-from" 
                        type="datetime-local" 
                        defaultValue={assignment.availableFrom}
                        className="border-dark" 
                      />
                    </div>
                    <div className="col-md-6">
                      <Form.Label htmlFor="wd-available-until" className="fw-bold">
                        Until
                      </Form.Label>
                      <Form.Control 
                        id="wd-available-until" 
                        type="datetime-local" 
                        defaultValue={assignment.availableUntil}
                        className="border-dark" 
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
            <Button variant="light" className="me-2 border">Cancel</Button>
            <Button variant="danger">Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
// app/(Kambaz)/Courses/[cid]/Assignments/[aid]/page.tsx
import { Form, Button } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div>
    <div className="mb-3 text-muted">
  Course 1234 &gt; Assignments &gt; A1
</div>
    <div id="wd-assignments-editor" className="p-3">
      <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
      <Form.Control id="wd-name" defaultValue="A1 - ENV + HTML" className="mb-3" />

      <Form.Label htmlFor="wd-description">Description</Form.Label>
      <Form.Control
        as="textarea"
        id="wd-description"
        rows={5}
        className="mb-3"
        defaultValue="The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include: your full name and section, links to each lab assignment, link to the Kambaz application, and all relevant source code repositories. The Kambaz application should include a link to navigate back to the landing page."
      />

      <div className="row mb-3">
        <Form.Label htmlFor="wd-points" className="col-sm-3 col-form-label text-end">
          Points
        </Form.Label>
        <div className="col-sm-9">
          <Form.Control id="wd-points" type="number" defaultValue={100} />
        </div>
      </div>

      <div className="row mb-3">
        <Form.Label htmlFor="wd-group" className="col-sm-3 col-form-label text-end">
          Assignment Group
        </Form.Label>
        <div className="col-sm-9">
          <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </Form.Select>
        </div>
      </div>

      <div className="row mb-3">
        <Form.Label htmlFor="wd-display-grade-as" className="col-sm-3 col-form-label text-end">
          Display Grade as
        </Form.Label>
        <div className="col-sm-9">
          <Form.Select id="wd-display-grade-as" defaultValue="Percentage">
            <option value="Percentage">Percentage</option>
            <option value="Points">Points</option>
            <option value="Complete/Incomplete">Complete/Incomplete</option>
          </Form.Select>
        </div>
      </div>

      <div className="row mb-3">
        <Form.Label htmlFor="wd-submission-type" className="col-sm-3 col-form-label text-end">
          Submission Type
        </Form.Label>
        <div className="col-sm-9">
          <div className="border p-3">
            <Form.Select id="wd-submission-type" defaultValue="Online" className="mb-3">
              <option value="Online">Online</option>
              <option value="On Paper">On Paper</option>
              <option value="External Tool">External Tool</option>
            </Form.Select>

            <Form.Label className="fw-bold">Online Entry Options</Form.Label>
            <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" />
            <Form.Check type="checkbox" id="wd-website-url" label="Website URL" />
            <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" />
            <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" />
            <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <Form.Label className="col-sm-3 col-form-label text-end">Assign</Form.Label>
        <div className="col-sm-9">
          <div className="border p-3">
            <Form.Label htmlFor="wd-assign-to">Assign to</Form.Label>
            <Form.Control id="wd-assign-to" defaultValue="Everyone" className="mb-3" />

            <Form.Label htmlFor="wd-due-date">Due</Form.Label>
            <Form.Control id="wd-due-date" type="datetime-local" defaultValue="2024-05-13T23:59" className="mb-3" />

            <div className="row">
              <div className="col-md-6">
                <Form.Label htmlFor="wd-available-from">Available from</Form.Label>
                <Form.Control id="wd-available-from" type="datetime-local" defaultValue="2024-05-06T00:00" />
              </div>
              <div className="col-md-6">
                <Form.Label htmlFor="wd-available-until">Until</Form.Label>
                <Form.Control id="wd-available-until" type="datetime-local" defaultValue="2024-05-20T23:59" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2">Cancel</Button>
        <Button variant="danger">Save</Button>
      </div>
    </div>
    </div>
  );
}
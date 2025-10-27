"use client";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { enrollInCourse, unenrollFromCourse } from "./enrollmentsReducer";
import { Card, CardBody, CardTitle, CardText, CardImg, Button, Row, Col, FormControl } from "react-bootstrap";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const [showAllCourses, setShowAllCourses] = useState(true); // CHANGED FROM false TO true

  const isFaculty = currentUser?.role === "FACULTY";

  const isEnrolled = (courseId: string) => {
    if (!currentUser || !enrollments) return false;
    return enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === courseId
    );
  };

  const handleEnroll = (courseId: string) => {
    if (currentUser) {
      dispatch(enrollInCourse({ userId: currentUser._id, courseId }));
    }
  };

  const handleUnenroll = (courseId: string) => {
    if (currentUser) {
      dispatch(unenrollFromCourse({ userId: currentUser._id, courseId }));
    }
  };

  // Safety check for courses
  const safeCourses = courses || [];

  // Display logic:
  // - If not logged in: show all courses
  // - If logged in and showAllCourses: show all courses
  // - If logged in and !showAllCourses: show only enrolled courses
  const displayedCourses = !currentUser
    ? safeCourses
    : showAllCourses
    ? safeCourses
    : safeCourses.filter((course: any) => isEnrolled(course._id));

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
              id="wd-update-course-click"
            >
              Update
            </button>
            <button
              className="btn btn-primary float-end me-2"
              onClick={() => dispatch(addNewCourse(course))}
              id="wd-add-new-course-click"
            >
              Add
            </button>
          </h5>
          <br />

          <FormControl
            value={course.name}
            className="mb-2"
            placeholder="Course Name"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            value={course.description}
            as="textarea"
            rows={3}
            placeholder="Course Description"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 id="wd-dashboard-published">
          {!currentUser
            ? "All Courses"
            : showAllCourses
            ? "All Courses"
            : "Published Courses"}{" "}
          ({displayedCourses.length})
        </h2>
        {currentUser && (
          <Button
            variant={showAllCourses ? "danger" : "primary"}
            onClick={() => setShowAllCourses(!showAllCourses)}
            id="wd-enrollments-btn"
          >
            {showAllCourses ? "Show My Courses" : "Enrollments"}
          </Button>
        )}
      </div>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
          {displayedCourses.map((course: any) => {
            const enrolled = isEnrolled(course._id);

            return (
              <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card className="h-100">
                  <Link
                    href={
                      !currentUser
                        ? "#"
                        : enrolled || isFaculty
                        ? `/Courses/${course._id}/Home`
                        : "#"
                    }
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    onClick={(e) => {
                      if (!currentUser) {
                        e.preventDefault();
                        alert("Please sign in to access courses.");
                      } else if (!enrolled && !isFaculty) {
                        e.preventDefault();
                        alert("You must enroll in this course to access it.");
                      }
                    }}
                  >
                    <CardImg src={course.image} variant="top" width="100%" height={160} />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </CardText>
                    </CardBody>
                  </Link>

                  <CardBody className="pt-0">
                    {/* Show Go button or Sign In prompt */}
                    {!currentUser ? (
                      <Button
                        variant="secondary"
                        className="w-100 mb-2"
                        as={Link}
                        href="/Account/Signin"
                      >
                        Sign in to Enroll
                      </Button>
                    ) : (enrolled || isFaculty) ? (
                      <Button
                        variant="primary"
                        className="w-100 mb-2"
                        as={Link}
                        href={`/Courses/${course._id}/Home`}
                      >
                        Go
                      </Button>
                    ) : null}

                    {/* Enroll/Unenroll Buttons - Only in "All Courses" view and logged in */}
                    {showAllCourses && currentUser && !isFaculty && (
                      <Button
                        variant={enrolled ? "danger" : "success"}
                        className="w-100 mb-2"
                        onClick={(e) => {
                          e.preventDefault();
                          enrolled ? handleUnenroll(course._id) : handleEnroll(course._id);
                        }}
                      >
                        {enrolled ? "Unenroll" : "Enroll"}
                      </Button>
                    )}

                    {/* Faculty Controls */}
                    {isFaculty && (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-warning flex-fill"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(deleteCourse(course._id));
                          }}
                          className="btn btn-danger flex-fill"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
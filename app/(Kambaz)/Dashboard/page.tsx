/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import * as client from "../Courses/client";
import { Card, CardBody, CardTitle, CardText, CardImg, Button, Row, Col, FormControl } from "react-bootstrap";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/react.png",
    description: "New Description",
  });

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);

  const isFaculty = currentUser?.role === "FACULTY";
  const isAdmin = currentUser?.role === "ADMIN";

  const fetchCourses = async () => {
    try {
      if (currentUser) {
        const myCourses = await client.findMyCourses();
        setEnrolledCourseIds(myCourses.map((c: any) => c._id));
        
        // Admin always sees all courses
        if (isAdmin) {
          const allCourses = await client.fetchAllCourses();
          dispatch(setCourses(allCourses));
        } else {
          // Faculty and Students: default = enrolled, button toggles all
          if (showAllCourses) {
            const allCourses = await client.fetchAllCourses();
            dispatch(setCourses(allCourses));
          } else {
            dispatch(setCourses(myCourses));
          }
        }
      } else {
        // Not logged in - show all courses
        const allCourses = await client.fetchAllCourses();
        dispatch(setCourses(allCourses));
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const onAddNewCourse = async () => {
    try {
      const newCourse = await client.createCourse(course);
      dispatch(setCourses([...courses, newCourse]));
      setCourse({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/react.png",
        description: "New Description",
      });
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const onUpdateCourse = async () => {
    try {
      await client.updateCourse(course);
      dispatch(setCourses(courses.map((c: any) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })));
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleEnroll = async (courseId: string) => {
    if (currentUser) {
      try {
        await client.enrollInCourse(courseId);
        setEnrolledCourseIds([...enrolledCourseIds, courseId]);
        if (!showAllCourses) {
          await fetchCourses();
        }
      } catch (error) {
        console.error("Enroll error:", error);
        alert("Failed to enroll in course");
      }
    }
  };

  const isEnrolled = (courseId: string) => {
    return enrolledCourseIds.includes(courseId);
  };

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    } else {
      const fetchAllCourses = async () => {
        const allCourses = await client.fetchAllCourses();
        dispatch(setCourses(allCourses));
      };
      fetchAllCourses();
    }
  }, [currentUser, showAllCourses]);

  const safeCourses = courses || [];

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
              onClick={onUpdateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
            <button
              className="btn btn-primary float-end me-2"
              onClick={onAddNewCourse}
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
            value={course.number}
            className="mb-2"
            placeholder="Course Number"
            onChange={(e) => setCourse({ ...course, number: e.target.value })}
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
            : isAdmin
            ? "All Courses"
            : showAllCourses
            ? "All Courses"
            : "My Courses"}{" "}
          ({safeCourses.length})
        </h2>
        {currentUser && !isAdmin && (
          <Button
            variant="primary"
            onClick={() => setShowAllCourses(!showAllCourses)}
            id="wd-enrollments-btn"
          >
            {showAllCourses ? "Show My Courses" : "Show All Courses"}
          </Button>
        )}
      </div>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
          {safeCourses.map((c: any) => {
            const enrolled = isEnrolled(c._id);

            return (
              <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card className="h-100">
                  <Link
                    href={
                      !currentUser
                        ? "#"
                        : isAdmin || enrolled || isFaculty
                        ? `/Courses/${c._id}/Home`
                        : "#"
                    }
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    onClick={(e) => {
                      if (!currentUser) {
                        e.preventDefault();
                        alert("Please sign in to access courses.");
                      } else if (!isAdmin && !isFaculty && !enrolled) {
                        e.preventDefault();
                        alert("You must enroll in this course to access it.");
                      }
                    }}
                  >
                    <CardImg 
                      src={c.image} 
                      alt={c.name}
                      variant="top" 
                      width="100%" 
                      height={160}
                      style={{ objectFit: 'cover' }}
                    />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {c.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {c.description}
                      </CardText>
                    </CardBody>
                  </Link>

                  <CardBody className="pt-0">
                    {/* Go Button - Show for all logged in users */}
                    {currentUser && (
                      <Link href={`/Courses/${c._id}/Home`} className="text-decoration-none">
                        <Button variant="primary" className="w-100 mb-2">
                          Go
                        </Button>
                      </Link>
                    )}

                    {/* Sign in button for non-logged in users */}
                    {!currentUser && (
                      <Link href="/Account/Signin" className="text-decoration-none">
                        <Button variant="secondary" className="w-100 mb-2">
                          Sign in to Enroll
                        </Button>
                      </Link>
                    )}

                    {/* Enroll Button - Only for students/faculty who aren't enrolled */}
                    {currentUser && !isAdmin && !enrolled && (
                      <Button
                        variant="success"
                        className="w-100 mb-2"
                        onClick={(e) => {
                          e.preventDefault();
                          handleEnroll(c._id);
                        }}
                      >
                        Enroll
                      </Button>
                    )}

                    {/* Faculty Controls - Edit/Delete */}
                    {isFaculty && (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-warning flex-fill"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            onDeleteCourse(c._id);
                          }}
                          className="btn btn-danger flex-fill"
                        >
                          Delete
                        </button>
                      </div>
                    )}

                    {/* Admin Controls - Edit/Delete (no enroll needed) */}
                    {isAdmin && (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-warning flex-fill"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            onDeleteCourse(c._id);
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
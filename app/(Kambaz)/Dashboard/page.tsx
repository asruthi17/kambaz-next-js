"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import * as client from "../Courses/client";
import { Card, CardBody, CardTitle, CardText, CardImg, Button, Row, Col, FormControl } from "react-bootstrap";
import { RootState } from "../store";

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
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);

  const isFaculty = currentUser?.role === "FACULTY";

  const fetchCourses = async () => {
    try {
      if (currentUser) {
        const myCourses = await client.findMyCourses();
        setEnrolledCourseIds(myCourses.map((c: any) => c._id));
        
        if (showAllCourses) {
          const allCourses = await client.fetchAllCourses();
          dispatch(setCourses(allCourses));
        } else {
          dispatch(setCourses(myCourses));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c) => {
      if (c._id === course._id) {
        return course;
      } else {
        return c;
      }
    })));
  };

  const handleEnroll = async (courseId: string) => {
    if (currentUser) {
      await client.enrollInCourse(courseId);
      setEnrolledCourseIds([...enrolledCourseIds, courseId]);
      if (!showAllCourses) {
        await fetchCourses();
      }
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (currentUser) {
      await client.unenrollFromCourse(courseId);
      setEnrolledCourseIds(enrolledCourseIds.filter(id => id !== courseId));
      if (!showAllCourses) {
        await fetchCourses();
      }
    }
  };

  const isEnrolled = (courseId: string) => {
    return enrolledCourseIds.includes(courseId);
  };

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
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
            : showAllCourses
            ? "All Courses"
            : "My Courses"}{" "}
          ({safeCourses.length})
        </h2>
        {currentUser && !isFaculty && (
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
          {safeCourses.map((course: any) => {
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
                    {!currentUser ? (
                      <Link href="/Account/Signin" className="text-decoration-none">
                        <Button variant="secondary" className="w-100 mb-2">
                          Sign in to Enroll
                        </Button>
                      </Link>
                    ) : (enrolled || isFaculty) ? (
                      <Link href={`/Courses/${course._id}/Home`} className="text-decoration-none">
                        <Button variant="primary" className="w-100 mb-2">
                          Go
                        </Button>
                      </Link>
                    ) : null}

                    {currentUser && !isFaculty && (
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
                            onDeleteCourse(course._id);
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
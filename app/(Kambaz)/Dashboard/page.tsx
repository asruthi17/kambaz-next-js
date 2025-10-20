import Link from "next/link";
import * as db from "../Database";
import { Card, CardBody, CardTitle, CardText, CardImg, Button, Row, Col } from "react-bootstrap";

export default function Dashboard() {
  const courses = db.courses;
  
  const courseImages: { [key: string]: string } = {
    "CS1234": "/images/react.png",
    "CS5678": "/images/java.png",
    "CS9101": "/images/python.png",
    "CS1121": "/images/javascript.png",
    "CS3141": "/images/html css.jpeg",
    "CS4151": "/images/mongodb.png",
    "CS5161": "/images/sql.jpeg",
    "CS6171": "/images/node.png",
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="ps-3">
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
          {courses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card className="h-100">
                <Link 
                  href={`/Courses/${course._id}/Home`} 
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg 
                    variant="top" 
                    src={courseImages[course._id] || "/images/default.png"} 
                    width="100%" 
                    height={160} 
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title">
                      {course.number} {course.name}
                    </CardTitle>
                    <CardText className="wd-dashboard-course-description">
                      {course.description}
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
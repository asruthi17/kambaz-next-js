import Link from "next/link";
import { Card, CardBody, CardTitle, CardText, CardImg, Button, Row, Col } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2>
      <hr />
      <div id="wd-dashboard-courses" className="ps-3">
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
          
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="h-100">
              <Link href="/Courses/CS1234/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/react.png" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS1234 React JS
                  </CardTitle>
                  <CardText className="wd-dashboard-course-description">
                    Full Stack software developer
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="h-100">
              <Link href="/Courses/CS5678/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/java.png" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS5678 Java
                  </CardTitle>
                  <CardText className="wd-dashboard-course-description">
                    Core Java Programming
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="h-100">
              <Link href="/Courses/CS9101/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/python.png" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS9101 Python
                  </CardTitle>
                  <CardText className="wd-dashboard-course-description">
                    Python for Beginners
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="h-100">
              <Link href="/Courses/CS1121/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/javascript.png" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS1121 JavaScript
                  </CardTitle>
                  <CardText className="wd-dashboard-course-description">
                    Modern JavaScript Essentials
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="h-100">
              <Link href="/Courses/CS3141/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/html css.jpeg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS3141 HTML & CSS
                  </CardTitle>
                  <CardText className="wd-dashboard-course-description">
                    Web Design Fundamentals
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="h-100">
              <Link href="/Courses/CS4151/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/mongodb.png" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS4151 MongoDB
                  </CardTitle>
                  <CardText className="wd-dashboard-course-description">
                    NoSQL Database Essentials
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="h-100">
              <Link href="/Courses/CS5161/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/sql.jpeg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS5161 SQL
                  </CardTitle>
                  <CardText className="wd-dashboard-course-description">
                    Relational Database Management
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="h-100">
              <Link href="/Courses/CS6171/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/node.png" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS6171 Node.js
                  </CardTitle>
                  <CardText className="wd-dashboard-course-description">
                    Backend Development with Node.js
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

        </Row>
      </div>
    </div>
  );
}
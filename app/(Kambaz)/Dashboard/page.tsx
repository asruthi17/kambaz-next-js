import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2>
      <hr />
      <div id="wd-dashboard-courses">

        {/* Course 1 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="Course1234" />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">Full Stack Software Developer</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 2 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/2345" className="wd-dashboard-course-link">
            <Image src="/images/javascript.jpg" width={200} height={150} alt="Course2345" />
            <div>
              <h5>CS2345 JavaScript</h5>
              <p className="wd-dashboard-course-title">Front-End Web Development</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 3 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/3456" className="wd-dashboard-course-link">
            <Image src="/images/python.jpg" width={200} height={150} alt="Course3456" />
            <div>
              <h5>CS3456 Python</h5>
              <p className="wd-dashboard-course-title">Programming for Data Science</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 4 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/4567" className="wd-dashboard-course-link">
            <Image src="/images/java.jpg" width={200} height={150} alt="Course4567" />
            <div>
              <h5>CS4567 Java</h5>
              <p className="wd-dashboard-course-title">Object-Oriented Programming</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 5 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/5678" className="wd-dashboard-course-link">
            <Image src="/images/htmlcss.jpg" width={200} height={150} alt="Course5678" />
            <div>
              <h5>CS5678 HTML & CSS</h5>
              <p className="wd-dashboard-course-title">Web Design Basics</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 6 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/6789" className="wd-dashboard-course-link">
            <Image src="/images/nodejs.jpg" width={200} height={150} alt="Course6789" />
            <div>
              <h5>CS6789 Node JS</h5>
              <p className="wd-dashboard-course-title">Server-Side Development</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 7 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/7890" className="wd-dashboard-course-link">
            <Image src="/images/sql.jpg" width={200} height={150} alt="Course7890" />
            <div>
              <h5>CS7890 SQL</h5>
              <p className="wd-dashboard-course-title">Database Management Systems</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 8 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/8901" className="wd-dashboard-course-link">
            <Image src="/images/mongodb.jpg" width={200} height={150} alt="Course8901" />
            <div>
              <h5>CS8901 MongoDB</h5>
              <p className="wd-dashboard-course-title">NoSQL Database Fundamentals</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}

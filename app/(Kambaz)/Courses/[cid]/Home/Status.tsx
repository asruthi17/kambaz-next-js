import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  const courses = [
    { id: "1234", name: "React JS", desc: "Full Stack Software Developer", img: "/images/react.png" },
    { id: "2345", name: "JavaScript", desc: "Front-End Web Development", img: "/images/javascript.png" },
    { id: "3456", name: "Python", desc: "Programming for Data Science", img: "/images/python.png" },
    { id: "4567", name: "Java", desc: "Object-Oriented Programming", img: "/images/java.png" },
    { id: "5678", name: "HTML & CSS", desc: "Web Design Basics", img: "/images/html css.jpeg" },
    { id: "6789", name: "Node JS", desc: "Server-Side Development", img: "/images/node.png" },
    { id: "7890", name: "SQL", desc: "Database Management Systems", img: "/images/sql.jpeg" },
    { id: "8901", name: "MongoDB", desc: "NoSQL Database Fundamentals", img: "/images/mongodb.png" },
  ];

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2>
      <hr />

      <div
        id="wd-dashboard-courses"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {courses.map((course) => (
          <div key={course.id} className="wd-dashboard-course" style={{ border: "1px solid #ccc", padding: "10px" }}>
            <Link href={`/Courses/${course.id}`} className="wd-dashboard-course-link">
              <Image src={course.img} width={200} height={150} alt={`Course ${course.name}`} />
              <div>
                <h5>{course.id} {course.name}</h5>
                <p className="wd-dashboard-course-title">{course.desc}</p>
                <button>Go</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

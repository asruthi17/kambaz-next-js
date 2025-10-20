"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();
  const { cid } = useParams();
  
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People"
  ];
  
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {

        const href = link === "People" 
          ? `/Courses/${cid}/People/Table` 
          : `/Courses/${cid}/${link}`;
        
        return (
          <Link 
            key={link}
            href={href}
            id={`wd-course-${link.toLowerCase()}-link`}
            className={`list-group-item border-0 ${
              pathname.includes(`/${link}`) ? 'active' : 'text-danger'
            }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
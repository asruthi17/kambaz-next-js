'use client';
import { ReactNode, useState, use } from "react";
import { usePathname } from "next/navigation";
import CourseNavigation from "./Navigation";
import { FaAlignJustify, FaTimes, FaBars } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import * as db from "../../Database";

export default function CoursesLayout(
  { children, params }: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>
) {
  const [showCourseNav, setShowCourseNav] = useState(false);
  const pathname = usePathname();
  const { cid } = use(params);
  
  // Find the course from database
  const course = db.courses.find((course) => course._id === cid);
  
  const segments = pathname.split('/');
  const pageName = segments[segments.length - 1] || 'Home';
  const displayName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  const getAssignmentName = (id: string) => {
    const assignmentMap: { [key: string]: string } = {
      '123': 'A1',
      '234': 'A2',
      '345': 'A3'
    };
    return assignmentMap[id] || id;
  };

  const getBreadcrumb = () => {
    const courseName = course?.name || `Course ${cid}`;
    
    if (pathname.includes('/Assignments/')) {
      const assignmentId = segments[segments.length - 1];
      const displayId = getAssignmentName(assignmentId);
      return `${courseName} > Assignments > ${displayId}`;
    } else if (pathname.includes('/Assignments')) {
      return `${courseName} > Assignments`;
    } else if (pathname.includes('/Modules')) {
      return `${courseName} > Modules`;
    } else if (pathname.includes('/Home')) {
      return `${courseName} > Home`;
    } else if (pathname.includes('/Piazza')) {
      return `${courseName} > Piazza`;
    } else if (pathname.includes('/Zoom')) {
      return `${courseName} > Zoom`;
    } else if (pathname.includes('/Quizzes')) {
      return `${courseName} > Quizzes`;
    } else if (pathname.includes('/People')) {
      return `${courseName} > People`;
    } else if (pathname.includes('/Grades')) {
      return `${courseName} > Grades`;
    }
    return courseName;
  };

  return (
    <div id="wd-courses">
      <div className="d-none d-lg-block">
        <h2 className="text-danger">
          <FaAlignJustify className="me-4 fs-4 mb-1" />
          {getBreadcrumb()}
        </h2>
        <hr />
      </div>

      <div className="bg-dark text-white p-3 d-flex align-items-center d-lg-none position-fixed w-100 top-0 start-0" style={{ zIndex: 100 }}>
        <button 
          onClick={() => {
            window.dispatchEvent(new CustomEvent('toggleKambazNav'));
          }}
          className="btn text-white p-0 me-3"
        >
          <FaBars size={20} />
        </button>
        <span className="flex-grow-1">{getBreadcrumb()}</span>
        <button 
          onClick={() => setShowCourseNav(!showCourseNav)} 
          className="btn text-white p-0"
        >
          <IoMdArrowDropdown size={24} />
        </button>
      </div>

      <div className="d-lg-none" style={{ paddingTop: '60px' }}></div>

      <div className="d-flex position-relative">
        <div className="d-none d-lg-block bg-white" style={{ width: '200px' }}>
          <CourseNavigation />
        </div>

        <div className="flex-fill">
          {children}
        </div>
      </div>

      {showCourseNav && (
        <>
          <div 
            className="position-fixed d-lg-none"
            style={{ 
              width: '100%', 
              height: '100vh',
              zIndex: 1050,
              top: 0,
              right: 0,
              backgroundColor: 'white'
            }}
          >
            <div className="bg-dark text-white p-3 d-flex justify-content-between align-items-center">
              <div>
                <div>{course?.name || `Course ${cid}`}</div>
                <div className="small">{displayName}</div>
              </div>
              <button onClick={() => setShowCourseNav(false)} className="btn text-white p-0">
                <FaTimes size={24} />
              </button>
            </div>
            <CourseNavigation />
          </div>
          <div 
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 1040 }}
            onClick={() => setShowCourseNav(false)}
          />
        </>
      )}
    </div>
  );
}
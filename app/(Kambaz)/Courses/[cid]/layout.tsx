// app/(Kambaz)/Courses/[cid]/layout.tsx
'use client';
import { ReactNode, useState, use } from "react";
import { usePathname } from "next/navigation";
import CourseNavigation from "./Navigation";
import { FaAlignJustify, FaTimes } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

export default function CoursesLayout(
  { children, params }: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>
) {
  const [showCourseNav, setShowCourseNav] = useState(false);
  const pathname = usePathname();
  const { cid } = use(params);
  
  const segments = pathname.split('/');
  const pageName = segments[segments.length - 1] || 'Home';
  const displayName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  // Map assignment IDs to display names
  const getAssignmentName = (id: string) => {
    const assignmentMap: { [key: string]: string } = {
      '123': 'A1',
      '234': 'A2',
      '345': 'A3'
    };
    return assignmentMap[id] || id;
  };

  // Build breadcrumb
  const getBreadcrumb = () => {
    if (pathname.includes('/Assignments/')) {
      const assignmentId = segments[segments.length - 1];
      const displayId = getAssignmentName(assignmentId);
      return `Course ${cid} > Assignments > ${displayId}`;
    } else if (pathname.includes('/Assignments')) {
      return `Course ${cid} > Assignments`;
    } else if (pathname.includes('/Modules')) {
      return `Course ${cid} > Modules`;
    } else if (pathname.includes('/Home')) {
      return `Course ${cid} > Home`;
    } else if (pathname.includes('/Piazza')) {
      return `Course ${cid} > Piazza`;
    } else if (pathname.includes('/Quizzes')) {
      return `Course ${cid} > Quizzes`;
    } else if (pathname.includes('/People')) {
      return `Course ${cid} > People`;
    }
    return `Course ${cid}`;
  };

  return (
    <div id="wd-courses">
      {/* Desktop Course Title with Breadcrumb */}
      <div className="d-none d-lg-block">
        <h2 className="text-danger">
          <FaAlignJustify className="me-4 fs-4 mb-1" />
          {getBreadcrumb()}
        </h2>
        <hr />
      </div>

      {/* Mobile Black Header */}
      <div className="bg-dark text-white p-3 d-flex align-items-center justify-content-between d-lg-none">
        <span>Course {cid} - {displayName}</span>
        <button 
          onClick={() => setShowCourseNav(!showCourseNav)} 
          className="btn text-white p-0"
        >
          <IoMdArrowDropdown size={24} />
        </button>
      </div>

      <div className="d-flex position-relative">
        {/* Desktop Course Navigation */}
        <div className="d-none d-lg-block bg-white" style={{ width: '200px' }}>
          <CourseNavigation />
        </div>

        {/* Main Content */}
        <div className="flex-fill">
          {children}
        </div>
      </div>

      {/* Mobile Course Navigation - Full Screen from Right */}
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
                <div>Course {cid}</div>
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
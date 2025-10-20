"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({ 
  course 
}: { 
  course: { name: string } | undefined 
}) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const currentPage = segments[segments.length - 1] || 'Home';
  
  return (
    <span>
      {course?.name || 'Course'} &gt; {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
    </span>
  );
}
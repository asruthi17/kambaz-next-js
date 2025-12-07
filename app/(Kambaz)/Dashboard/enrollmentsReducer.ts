/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

const loadEnrollments = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("enrollments");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return enrollments;
      }
    }
  }
  return enrollments;
};

const initialState = {
  enrollments: loadEnrollments(),
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollInCourse: (state, { payload: { userId, courseId } }) => {
      const newEnrollment = {
        _id: new Date().getTime().toString(),
        user: userId,
        course: courseId,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
      
      if (typeof window !== "undefined") {
        localStorage.setItem("enrollments", JSON.stringify(state.enrollments));
      }
    },
    unenrollFromCourse: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === userId && e.course === courseId)
      );
      
      if (typeof window !== "undefined") {
        localStorage.setItem("enrollments", JSON.stringify(state.enrollments));
      }
    },
  },
});

export const { enrollInCourse, unenrollFromCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
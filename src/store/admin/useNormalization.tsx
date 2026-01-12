import { create } from "zustand";

export const useCourseStore = create((set) => ({
  courses: [],
  addCourse: (course) =>
    set((state) => ({ courses: [...state.courses, course] })),
}));

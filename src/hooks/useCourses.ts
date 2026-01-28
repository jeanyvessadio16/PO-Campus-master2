import { useCallback, useEffect, useState } from "react";
import { Course } from "@/types/courses";

interface CoursesState {
  courses: Course[];
  isLoading: boolean;
  error: string | null;
  selectedCourse: Course | null;
}

export const useCourses = () => {
  const [state, setState] = useState<CoursesState>({
    courses: [],
    isLoading: true,
    error: null,
    selectedCourse: null,
  });

  // Charger tous les cours
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const response = await fetch("/api/courses");
        if (!response.ok) throw new Error("Failed to fetch courses");

        const data = await response.json();
        setState((prev) => ({
          ...prev,
          courses: data,
          isLoading: false,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error ? error.message : "Failed to fetch courses",
          isLoading: false,
        }));
      }
    };

    fetchCourses();
  }, []);

  const getCourseById = useCallback(async (id: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await fetch(`/api/courses/${id}`);
      if (!response.ok) throw new Error("Failed to fetch course");

      const course = await response.json();
      setState((prev) => ({
        ...prev,
        selectedCourse: course,
        isLoading: false,
      }));
      return course;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "Failed to fetch course",
        isLoading: false,
      }));
    }
  }, []);

  const createCourse = useCallback(
    async (courseData: Omit<Course, "id" | "createdAt" | "updatedAt">) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const response = await fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseData),
        });

        if (!response.ok) throw new Error("Failed to create course");

        const newCourse = await response.json();
        setState((prev) => ({
          ...prev,
          courses: [...prev.courses, newCourse],
          isLoading: false,
        }));
        return newCourse;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error ? error.message : "Failed to create course",
          isLoading: false,
        }));
      }
    },
    [],
  );

  const updateCourse = useCallback(
    async (id: string, courseData: Partial<Course>) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const response = await fetch(`/api/courses/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseData),
        });

        if (!response.ok) throw new Error("Failed to update course");

        const updatedCourse = await response.json();
        setState((prev) => ({
          ...prev,
          courses: prev.courses.map((c) => (c.id === id ? updatedCourse : c)),
          selectedCourse:
            prev.selectedCourse?.id === id
              ? updatedCourse
              : prev.selectedCourse,
          isLoading: false,
        }));
        return updatedCourse;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error ? error.message : "Failed to update course",
          isLoading: false,
        }));
      }
    },
    [],
  );

  const deleteCourse = useCallback(async (id: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await fetch(`/api/courses/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete course");

      setState((prev) => ({
        ...prev,
        courses: prev.courses.filter((c) => c.id !== id),
        selectedCourse:
          prev.selectedCourse?.id === id ? null : prev.selectedCourse,
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "Failed to delete course",
        isLoading: false,
      }));
    }
  }, []);

  return {
    courses: state.courses,
    selectedCourse: state.selectedCourse,
    isLoading: state.isLoading,
    error: state.error,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
  };
};

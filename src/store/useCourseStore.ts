import { create } from 'zustand';
import { Course } from '@/types/courses';

interface CourseStore {
    courses: Course[];
    addCourse: (course: Course) => void;
}

const mockCourses: Course[] = [
    { id: 'c1', title: 'Introduction à l\'Informatique', description: 'Bases de l\'informatique', userId: '101', createdAt: new Date('2024-10-01'), updatedAt: new Date('2024-10-01') },
    { id: 'c2', title: 'Mathématiques pour l\'Ingénieur', description: 'Analyse et Algèbre', userId: '102', createdAt: new Date('2024-10-02'), updatedAt: new Date('2024-10-02') },
    { id: 'c3', title: 'Algorithmique Avancée', description: 'Structures de données', userId: '101', createdAt: new Date('2024-10-05'), updatedAt: new Date('2024-10-05') },
    { id: 'c4', title: 'Droit du Numérique', description: 'Aspects légaux', userId: '103', createdAt: new Date('2024-10-10'), updatedAt: new Date('2024-10-10') },
];

export const useCourseStore = create<CourseStore>((set) => ({
    courses: mockCourses,
    addCourse: (course) => set((state) => ({ courses: [...state.courses, course] })),
}));

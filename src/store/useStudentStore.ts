import { create } from 'zustand';
import { User } from '@/types/user';

export type Student = User & { role: 'student'; avatar?: string };

interface StudentStore {
    students: Student[];
    addStudent: (student: Student) => void;
}

const mockStudents: Student[] = [
    {
        id: '1',
        firstName: 'Alice',
        lastName: 'Diop',
        email: 'alice@student.uchk.sn',
        role: 'student',
        passwordHash: 'mock',
        createdAt: new Date('2024-09-01'),
        updatedAt: new Date('2024-09-01')
    },
    {
        id: '2',
        firstName: 'Moussa',
        lastName: 'Ndiaye',
        email: 'moussa@student.uchk.sn',
        role: 'student',
        passwordHash: 'mock',
        createdAt: new Date('2024-09-02'),
        updatedAt: new Date('2024-09-02')
    },
    {
        id: '3',
        firstName: 'Fatou',
        lastName: 'Sow',
        email: 'fatou@student.uchk.sn',
        role: 'student',
        passwordHash: 'mock',
        createdAt: new Date('2024-09-03'),
        updatedAt: new Date('2024-09-03')
    },
    {
        id: '4',
        firstName: 'Jean',
        lastName: 'Gomis',
        email: 'jean@student.uchk.sn',
        role: 'student',
        passwordHash: 'mock',
        createdAt: new Date('2024-09-10'),
        updatedAt: new Date('2024-09-10')
    },
    {
        id: '5',
        firstName: 'Awa',
        lastName: 'Fall',
        email: 'awa@student.uchk.sn',
        role: 'student',
        passwordHash: 'mock',
        createdAt: new Date('2024-09-15'),
        updatedAt: new Date('2024-09-15')
    },
    {
        id: '6',
        firstName: 'Oumar',
        lastName: 'Diallo',
        email: 'oumar@student.uchk.sn',
        role: 'student',
        passwordHash: 'mock',
        createdAt: new Date('2024-10-01'),
        updatedAt: new Date('2024-10-01')
    },
];

export const useStudentStore = create<StudentStore>((set) => ({
    students: mockStudents,
    addStudent: (student) => set((state) => ({ students: [...state.students, student] })),
}));

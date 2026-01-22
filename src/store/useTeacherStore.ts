import { create } from 'zustand';
import { User } from '@/types/user';

export type Teacher = User & { role: 'teacher'; avatar?: string };

interface TeacherStore {
    teachers: Teacher[];
    addTeacher: (teacher: Teacher) => void;
}

const mockTeachers: Teacher[] = [
    {
        id: '101',
        firstName: 'Issa',
        lastName: 'Lo',
        email: 'issa.lo@uchk.sn',
        role: 'teacher',
        passwordHash: 'mock',
        createdAt: new Date('2023-01-10'),
        updatedAt: new Date('2023-01-10')
    },
    {
        id: '102',
        firstName: 'Marie',
        lastName: 'Ba',
        email: 'marie.ba@uchk.sn',
        role: 'teacher',
        passwordHash: 'mock',
        createdAt: new Date('2023-02-15'),
        updatedAt: new Date('2023-02-15')
    },
    {
        id: '103',
        firstName: 'Paul',
        lastName: 'Faye',
        email: 'paul.faye@uchk.sn',
        role: 'teacher',
        passwordHash: 'mock',
        createdAt: new Date('2023-03-20'),
        updatedAt: new Date('2023-03-20')
    },
];

export const useTeacherStore = create<TeacherStore>((set) => ({
    teachers: mockTeachers,
    addTeacher: (teacher) => set((state) => ({ teachers: [...state.teachers, teacher] })),
}));

"use client";

import { useStudentStore } from "@/store/useStudentStore";
import { useTeacherStore } from "@/store/useTeacherStore";
import { useCourseStore } from "@/store/useCourseStore";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Users, GraduationCap, BookOpen } from "lucide-react";

export default function AdminPage() {
  const { students } = useStudentStore();
  const { teachers } = useTeacherStore();
  const { courses } = useCourseStore();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Étudiants"
          value={students.length}
          icon={GraduationCap}
          description="Étudiants inscrits"
        />
        <StatsCard
          title="Total Enseignants"
          value={teachers.length}
          icon={Users}
          description="Professeurs actifs"
        />
        <StatsCard
          title="Total Cours"
          value={courses.length}
          icon={BookOpen}
          description="Cours disponibles"
        />
      </div>
    </div>
  );
}

import { TeacherCoursesCard } from "@/components/dashboard/teacher/TeacherCoursesCard";
import { TeacherAssignmentsCard } from "@/components/dashboard/teacher/TeacherAssignmentsCard";

export default function TeacherPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your courses and assignments effectively.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <TeacherCoursesCard count={3} />
        <TeacherAssignmentsCard count={8} />
      </div>

      {/* Placeholder for future content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 border rounded-xl h-[400px] bg-muted/10 flex items-center justify-center">
          <span className="text-muted-foreground">Statistiques de Performance</span>
        </div>
        <div className="col-span-3 border rounded-xl h-[400px] bg-muted/10 flex items-center justify-center">
          <span className="text-muted-foreground">Activité Récente</span>
        </div>
      </div>
    </div>
  );
}

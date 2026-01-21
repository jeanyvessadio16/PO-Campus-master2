import { StudentCoursesCard } from "@/components/dashboard/student/StudentCoursesCard";
import { StudentAssignmentsCard } from "@/components/dashboard/student/StudentAssignmentsCard";

export default function StudentPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here is an overview of your activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StudentCoursesCard count={5} />
        <StudentAssignmentsCard count={12} />
      </div>

      {/* Placeholder for future content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 border rounded-xl h-[400px] bg-muted/10 flex items-center justify-center">
          <span className="text-muted-foreground">Graphique ou Calendrier</span>
        </div>
        <div className="col-span-3 border rounded-xl h-[400px] bg-muted/10 flex items-center justify-center">
          <span className="text-muted-foreground">Activités Récentes</span>
        </div>
      </div>
    </div>
  );
}

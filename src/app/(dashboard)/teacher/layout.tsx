import { Metadata } from "next";
import { TeacherSidebar } from "@/components/layout/teacher/TeacherSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import TeacherHeader from "@/components/layout/teacher/TeacherHeader";
import { AuthCheck } from "@/components/AuthCheck";

export const metadata: Metadata = {
  title: "Teacher Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthCheck requiredRole="teacher">
      <SidebarProvider>
        <TeacherSidebar />
        <main className="w-full">
          <TeacherHeader />
          {children}
        </main>
      </SidebarProvider>
    </AuthCheck>
  );
}

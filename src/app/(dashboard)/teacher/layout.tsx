import { Metadata } from "next";
import { TeacherSidebar } from "@/components/layout/teacher/TeacherSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import TeacherHeader from "@/components/layout/teacher/TeacherHeader";

export const metadata: Metadata = {
  title: "Teacher Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <TeacherSidebar />
      <main className="w-full">
        <TeacherHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}

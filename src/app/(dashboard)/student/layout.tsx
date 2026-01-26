import { Metadata } from "next";
import { StudentSidebar } from "@/components/layout/student/StudentSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import StudentHeader from "@/components/layout/student/StudentHeader";

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "Student dashboard layout",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <StudentSidebar />
      <main className="w-full">
        <StudentHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}

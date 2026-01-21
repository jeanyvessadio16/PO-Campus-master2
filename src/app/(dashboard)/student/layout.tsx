import { Metadata } from "next";
import { StudentSidebar } from "@/components/layout/student/StudentSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import StudentHeader from "@/components/layout/student/StudentHeader";

export const metadata: Metadata = {
  title: "Student Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <StudentSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <StudentHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}

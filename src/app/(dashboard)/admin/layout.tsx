import { Metadata } from "next";
import { AdminSidebar } from "@/components/layout/admin/AdminSidebar";
import AdminHeader from "@/components/layout/admin/AdminHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthCheck } from "@/components/AuthCheck";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthCheck requiredRole="admin">
      <SidebarProvider>
        <AdminSidebar />
        <main className="w-full">
          <AdminHeader />
          {children}
        </main>
      </SidebarProvider>
    </AuthCheck>
  );
}

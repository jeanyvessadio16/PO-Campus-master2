import { ReactNode } from "react";
import { AuthCheck } from "@/components/AuthCheck";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthCheck requiredRole={["admin", "teacher", "student"]}>
      {children}
    </AuthCheck>
  );
}

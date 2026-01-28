import { useAuth } from "./useAuth";
import { Role } from "@/types/role";

export const usePermission = () => {
  const { role } = useAuth();

  const hasRole = (requiredRole: Role | Role[]): boolean => {
    if (!role) return false;

    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(role as Role);
    }

    return role === requiredRole;
  };

  const isAdmin = (): boolean => hasRole("admin");

  const isTeacher = (): boolean => hasRole("teacher");

  const isStudent = (): boolean => hasRole("student");

  const canEditCourse = (): boolean => {
    return hasRole(["admin", "teacher"]);
  };

  const canDeleteUser = (): boolean => {
    return hasRole("admin");
  };

  const canViewAdminPanel = (): boolean => {
    return hasRole("admin");
  };

  const canViewTeacherPanel = (): boolean => {
    return hasRole(["admin", "teacher"]);
  };

  const canSubmitAssignment = (): boolean => {
    return hasRole("student");
  };

  return {
    hasRole,
    isAdmin,
    isTeacher,
    isStudent,
    canEditCourse,
    canDeleteUser,
    canViewAdminPanel,
    canViewTeacherPanel,
    canSubmitAssignment,
  };
};

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Role } from "@/types/role";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: Role | Role[];
  fallback?: ReactNode;
}

// Composant client pour vérifier la protection
export function ProtectedRouteClient({
  children,
  requiredRole,
  fallback,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, role, isLoading } = useAuth();

  if (isLoading) {
    return fallback || <div>Chargement...</div>;
  }

  if (!user) {
    router.push("/login");
    return fallback || <div>Redirection vers la connexion...</div>;
  }

  if (requiredRole) {
    const requiredRoles = Array.isArray(requiredRole)
      ? requiredRole
      : [requiredRole];

    if (!requiredRoles.includes(role as Role)) {
      router.push(`/${role}`);
      return fallback || <div>Accès refusé...</div>;
    }
  }

  return <>{children}</>;
}

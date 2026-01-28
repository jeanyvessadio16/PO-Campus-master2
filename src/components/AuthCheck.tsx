"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Role } from "@/types/role";

interface AuthCheckProps {
  children: ReactNode;
  requiredRole?: Role | Role[];
}

export function AuthCheck({ children, requiredRole }: AuthCheckProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");

        if (!response.ok) {
          router.push("/login");
          return;
        }

        const data = await response.json();
        setIsAuthenticated(true);

        // Vérifier le rôle si requis
        if (requiredRole) {
          const requiredRoles = Array.isArray(requiredRole)
            ? requiredRole
            : [requiredRole];

          if (requiredRoles.includes(data.role)) {
            setIsAuthorized(true);
          } else {
            // Rediriger vers le dashboard du rôle
            router.push(`/${data.role}`);
            return;
          }
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, requiredRole]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !isAuthorized) {
    return null;
  }

  return <>{children}</>;
}

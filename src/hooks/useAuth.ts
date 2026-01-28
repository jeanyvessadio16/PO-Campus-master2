import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { Role } from "@/types/role";

interface AuthState {
  user: User | null;
  role: Role | null;
  isLoading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    role: null,
    isLoading: true,
    error: null,
  });

  // Vérifier l'authentification au montage
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          setAuth({
            user: data.user,
            role: data.role,
            isLoading: false,
            error: null,
          });
        } else {
          setAuth({
            user: null,
            role: null,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        setAuth({
          user: null,
          role: null,
          isLoading: false,
          error:
            error instanceof Error ? error.message : "Authentication failed",
        });
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string, role: Role) => {
      setAuth((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();
        setAuth({
          user: data.user,
          role: data.role,
          isLoading: false,
          error: null,
        });

        // Redirection basée sur le rôle
        router.push(`/${role}`);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Login failed";
        setAuth({
          user: null,
          role: null,
          isLoading: false,
          error: errorMessage,
        });
      }
    },
    [router],
  );

  const logout = useCallback(async () => {
    setAuth((prev) => ({ ...prev, isLoading: true }));
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setAuth({
        user: null,
        role: null,
        isLoading: false,
        error: null,
      });
      router.push("/login");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Logout failed";
      setAuth((prev) => ({ ...prev, isLoading: false, error: errorMessage }));
    }
  }, [router]);

  const signup = useCallback(
    async (
      email: string,
      password: string,
      firstName: string,
      lastName: string,
      role: Role,
    ) => {
      setAuth((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            firstName,
            lastName,
            role,
          }),
        });

        if (!response.ok) {
          throw new Error("Signup failed");
        }

        const data = await response.json();
        setAuth({
          user: data.user,
          role: data.role,
          isLoading: false,
          error: null,
        });

        router.push(`/${role}`);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Signup failed";
        setAuth({
          user: null,
          role: null,
          isLoading: false,
          error: errorMessage,
        });
      }
    },
    [router],
  );

  return {
    user: auth.user,
    role: auth.role,
    isAuthenticated: !!auth.user,
    isLoading: auth.isLoading,
    error: auth.error,
    login,
    logout,
    signup,
  };
};

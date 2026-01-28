import { useCallback, useEffect, useState } from "react";
import { User } from "@/types/user";

interface UsersState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  selectedUser: User | null;
}

export const useUsers = () => {
  const [state, setState] = useState<UsersState>({
    users: [],
    isLoading: true,
    error: null,
    selectedUser: null,
  });

  // Charger tous les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        setState((prev) => ({
          ...prev,
          users: data,
          isLoading: false,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error ? error.message : "Failed to fetch users",
          isLoading: false,
        }));
      }
    };

    fetchUsers();
  }, []);

  const getUserById = useCallback(async (id: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await fetch(`/api/users/${id}`);
      if (!response.ok) throw new Error("Failed to fetch user");

      const user = await response.json();
      setState((prev) => ({
        ...prev,
        selectedUser: user,
        isLoading: false,
      }));
      return user;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to fetch user",
        isLoading: false,
      }));
    }
  }, []);

  const updateUser = useCallback(
    async (id: string, userData: Partial<User>) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const response = await fetch(`/api/users/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        if (!response.ok) throw new Error("Failed to update user");

        const updatedUser = await response.json();
        setState((prev) => ({
          ...prev,
          users: prev.users.map((u) => (u.id === id ? updatedUser : u)),
          selectedUser:
            prev.selectedUser?.id === id ? updatedUser : prev.selectedUser,
          isLoading: false,
        }));
        return updatedUser;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error ? error.message : "Failed to update user",
          isLoading: false,
        }));
      }
    },
    [],
  );

  const deleteUser = useCallback(async (id: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete user");

      setState((prev) => ({
        ...prev,
        users: prev.users.filter((u) => u.id !== id),
        selectedUser: prev.selectedUser?.id === id ? null : prev.selectedUser,
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to delete user",
        isLoading: false,
      }));
    }
  }, []);

  return {
    users: state.users,
    selectedUser: state.selectedUser,
    isLoading: state.isLoading,
    error: state.error,
    getUserById,
    updateUser,
    deleteUser,
  };
};

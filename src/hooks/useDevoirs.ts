import { useCallback, useEffect, useState } from "react";
import { Devoir } from "@/types/devoirs";

interface DevoirState {
  devoirs: Devoir[];
  isLoading: boolean;
  error: string | null;
  selectedDevoir: Devoir | null;
}

export const useDevoirs = (courseId?: string) => {
  const [state, setState] = useState<DevoirState>({
    devoirs: [],
    isLoading: true,
    error: null,
    selectedDevoir: null,
  });

  // Charger les devoirs
  useEffect(() => {
    const fetchDevoirs = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const url = courseId
          ? `/api/devoirs?courseId=${courseId}`
          : "/api/devoirs";
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch devoirs");

        const data = await response.json();
        setState((prev) => ({
          ...prev,
          devoirs: data,
          isLoading: false,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error ? error.message : "Failed to fetch devoirs",
          isLoading: false,
        }));
      }
    };

    fetchDevoirs();
  }, [courseId]);

  const getDevoirById = useCallback(async (id: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await fetch(`/api/devoirs/${id}`);
      if (!response.ok) throw new Error("Failed to fetch devoir");

      const devoir = await response.json();
      setState((prev) => ({
        ...prev,
        selectedDevoir: devoir,
        isLoading: false,
      }));
      return devoir;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "Failed to fetch devoir",
        isLoading: false,
      }));
    }
  }, []);

  const createDevoir = useCallback(
    async (devoirData: Omit<Devoir, "id" | "createdAt" | "updatedAt">) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const response = await fetch("/api/devoirs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(devoirData),
        });

        if (!response.ok) throw new Error("Failed to create devoir");

        const newDevoir = await response.json();
        setState((prev) => ({
          ...prev,
          devoirs: [...prev.devoirs, newDevoir],
          isLoading: false,
        }));
        return newDevoir;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error ? error.message : "Failed to create devoir",
          isLoading: false,
        }));
      }
    },
    [],
  );

  const updateDevoir = useCallback(
    async (id: string, devoirData: Partial<Devoir>) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const response = await fetch(`/api/devoirs/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(devoirData),
        });

        if (!response.ok) throw new Error("Failed to update devoir");

        const updatedDevoir = await response.json();
        setState((prev) => ({
          ...prev,
          devoirs: prev.devoirs.map((d) => (d.id === id ? updatedDevoir : d)),
          selectedDevoir:
            prev.selectedDevoir?.id === id
              ? updatedDevoir
              : prev.selectedDevoir,
          isLoading: false,
        }));
        return updatedDevoir;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error ? error.message : "Failed to update devoir",
          isLoading: false,
        }));
      }
    },
    [],
  );

  const deleteDevoir = useCallback(async (id: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await fetch(`/api/devoirs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete devoir");

      setState((prev) => ({
        ...prev,
        devoirs: prev.devoirs.filter((d) => d.id !== id),
        selectedDevoir:
          prev.selectedDevoir?.id === id ? null : prev.selectedDevoir,
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "Failed to delete devoir",
        isLoading: false,
      }));
    }
  }, []);

  return {
    devoirs: state.devoirs,
    selectedDevoir: state.selectedDevoir,
    isLoading: state.isLoading,
    error: state.error,
    getDevoirById,
    createDevoir,
    updateDevoir,
    deleteDevoir,
  };
};

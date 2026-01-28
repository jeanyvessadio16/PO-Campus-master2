import { useCallback, useEffect, useState } from "react";
import { Note } from "@/types/note";

interface NotesState {
  notes: Note[];
  isLoading: boolean;
  error: string | null;
  selectedNote: Note | null;
}

export const useNotes = (devoirId?: string) => {
  const [state, setState] = useState<NotesState>({
    notes: [],
    isLoading: true,
    error: null,
    selectedNote: null,
  });

  // Charger les notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const url = devoirId ? `/api/notes?devoirId=${devoirId}` : "/api/notes";
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch notes");

        const data = await response.json();
        setState((prev) => ({
          ...prev,
          notes: data,
          isLoading: false,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error ? error.message : "Failed to fetch notes",
          isLoading: false,
        }));
      }
    };

    fetchNotes();
  }, [devoirId]);

  const getNoteById = useCallback(async (id: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await fetch(`/api/notes/${id}`);
      if (!response.ok) throw new Error("Failed to fetch note");

      const note = await response.json();
      setState((prev) => ({
        ...prev,
        selectedNote: note,
        isLoading: false,
      }));
      return note;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to fetch note",
        isLoading: false,
      }));
    }
  }, []);

  const createNote = useCallback(
    async (noteData: Omit<Note, "id" | "createdAt" | "updatedAt">) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const response = await fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(noteData),
        });

        if (!response.ok) throw new Error("Failed to create note");

        const newNote = await response.json();
        setState((prev) => ({
          ...prev,
          notes: [...prev.notes, newNote],
          isLoading: false,
        }));
        return newNote;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error ? error.message : "Failed to create note",
          isLoading: false,
        }));
      }
    },
    [],
  );

  const updateNote = useCallback(
    async (id: string, noteData: Partial<Note>) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const response = await fetch(`/api/notes/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(noteData),
        });

        if (!response.ok) throw new Error("Failed to update note");

        const updatedNote = await response.json();
        setState((prev) => ({
          ...prev,
          notes: prev.notes.map((n) => (n.id === id ? updatedNote : n)),
          selectedNote:
            prev.selectedNote?.id === id ? updatedNote : prev.selectedNote,
          isLoading: false,
        }));
        return updatedNote;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error ? error.message : "Failed to update note",
          isLoading: false,
        }));
      }
    },
    [],
  );

  const deleteNote = useCallback(async (id: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete note");

      setState((prev) => ({
        ...prev,
        notes: prev.notes.filter((n) => n.id !== id),
        selectedNote: prev.selectedNote?.id === id ? null : prev.selectedNote,
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to delete note",
        isLoading: false,
      }));
    }
  }, []);

  return {
    notes: state.notes,
    selectedNote: state.selectedNote,
    isLoading: state.isLoading,
    error: state.error,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
  };
};

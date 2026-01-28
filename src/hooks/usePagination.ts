import { useCallback, useMemo, useState } from "react";

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

export const usePagination = <T>(items: T[], itemsPerPage: number = 10) => {
  const [state, setState] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage,
  });

  const totalPages = useMemo(
    () => Math.ceil(items.length / state.itemsPerPage),
    [items.length, state.itemsPerPage],
  );

  const paginatedItems = useMemo(() => {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, state.currentPage, state.itemsPerPage]);

  const goToPage = useCallback(
    (page: number) => {
      const pageNumber = Math.max(1, Math.min(page, totalPages || 1));
      setState((prev) => ({ ...prev, currentPage: pageNumber }));
    },
    [totalPages],
  );

  const nextPage = useCallback(() => {
    goToPage(state.currentPage + 1);
  }, [state.currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(state.currentPage - 1);
  }, [state.currentPage, goToPage]);

  const setItemsPerPage = useCallback((itemsPerPage: number) => {
    setState((prev) => ({
      ...prev,
      itemsPerPage,
      currentPage: 1,
    }));
  }, []);

  return {
    currentPage: state.currentPage,
    itemsPerPage: state.itemsPerPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    setItemsPerPage,
    hasNextPage: state.currentPage < totalPages,
    hasPrevPage: state.currentPage > 1,
  };
};

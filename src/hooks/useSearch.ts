import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";

export const useSearch = <T>(
  items: T[],
  searchField: keyof T,
  debounceDelay: number = 500,
) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, debounceDelay);

  const results = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return items;
    }

    const lowercaseQuery = debouncedSearchQuery.toLowerCase();
    return items.filter((item) => {
      const fieldValue = item[searchField];
      if (typeof fieldValue === "string") {
        return fieldValue.toLowerCase().includes(lowercaseQuery);
      }
      return false;
    });
  }, [items, debouncedSearchQuery, searchField]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    results,
    resultCount: results.length,
    isSearching: searchQuery !== debouncedSearchQuery,
    clearSearch,
  };
};

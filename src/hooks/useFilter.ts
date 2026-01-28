import { useCallback, useMemo, useState } from "react";

type FilterPredicate<T> = (item: T) => boolean;

export const useFilter = <T>(items: T[]) => {
  const [filters, setFilters] = useState<Record<string, FilterPredicate<T>>>(
    {},
  );

  const results = useMemo(() => {
    return items.filter((item) => {
      return Object.values(filters).every((predicate) => predicate(item));
    });
  }, [items, filters]);

  const addFilter = useCallback(
    (name: string, predicate: FilterPredicate<T>) => {
      setFilters((prev) => ({
        ...prev,
        [name]: predicate,
      }));
    },
    [],
  );

  const removeFilter = useCallback((name: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[name];
      return newFilters;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const hasFilter = useCallback((name: string) => name in filters, [filters]);

  const getFilterNames = useCallback(() => Object.keys(filters), [filters]);

  return {
    results,
    addFilter,
    removeFilter,
    clearFilters,
    hasFilter,
    getFilterNames,
    filterCount: Object.keys(filters).length,
  };
};

import { useCallback, useMemo, useState } from "react";

type SortOrder = "asc" | "desc";

interface SortConfig<T> {
  key: keyof T | null;
  order: SortOrder;
}

export const useSort = <T>(items: T[]) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    key: null,
    order: "asc",
  });

  const sortedItems = useMemo(() => {
    if (!sortConfig.key) {
      return items;
    }

    const sorted = [...items].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      if (aValue < bValue) {
        return sortConfig.order === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.order === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [items, sortConfig]);

  const sort = useCallback((key: keyof T) => {
    setSortConfig((prev) => ({
      key,
      order: prev.key === key && prev.order === "asc" ? "desc" : "asc",
    }));
  }, []);

  const clearSort = useCallback(() => {
    setSortConfig({
      key: null,
      order: "asc",
    });
  }, []);

  return {
    sortedItems,
    sort,
    clearSort,
    sortKey: sortConfig.key,
    sortOrder: sortConfig.order,
  };
};

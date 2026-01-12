import { GridFiltersState } from "@/components/admin/GridFilters";

/**
 * Debounced search helper
 */
function normalizeString(s?: any) {
  if (s == null) return "";
  return String(s).trim().toLowerCase();
}

export function filterRows<T>({
  rows,
  search,
  filters,
  searchKeys,
}: {
  rows: T[];
  search?: string;
  filters?: GridFiltersState;
  searchKeys?: (keyof T)[];
}) {
  const normalizedSearch = search ? search.toLowerCase() : "";

  return rows.filter((row) => {
    // 🔍 Search (only on searchKeys if provided)
    if (normalizedSearch) {
      const keysToSearch = searchKeys ?? (Object.keys(row) as (keyof T)[]);
      const match = keysToSearch.some((key) => {
        const value = row[key];
        return normalizeString(value).includes(normalizedSearch);
      });
      if (!match) return false;
    }

    // Filters
    if (filters) {
      for (const key in filters) {
        const value = filters[key];
        if (value == null) continue;

        const rowValue = (row as any)[key];
        if (rowValue == null) return false;

        // 🔹 Select / Enum (string)
        if (typeof value === "string") {
          if (normalizeString(rowValue) !== value.trim().toLowerCase()) return false;
        }

        // 🔹 Boolean
        if (typeof value === "boolean") {
          if (rowValue !== value) return false;
        }

        // 🔹 Number range
        if (Array.isArray(value) && typeof value[0] === "number") {
          const [min, max] = value as [number?, number?];
          if ((min !== undefined && rowValue < min) || (max !== undefined && rowValue > max))
            return false;
        }

        // 🔹 Date range
        if (Array.isArray(value) && (value[0] instanceof Date || value[1] instanceof Date)) {
          const [start, end] = value as [Date | undefined, Date | undefined];
          const rowDate = rowValue instanceof Date ? rowValue : new Date(rowValue);
          if (isNaN(rowDate.getTime())) return false;
          if ((start && rowDate < start) || (end && rowDate > end)) return false;
        }
      }
    }

    return true;
  });
}

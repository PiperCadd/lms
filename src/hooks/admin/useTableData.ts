import { useState } from "react";
import { GridRowId, GridRowModel } from "@mui/x-data-grid";

export function useTableData<T extends { id: GridRowId }>(initialRows: T[]) {
  const [rows, setRows] = useState<T[]>(initialRows);

  /**
   * Add a new row with partial fields.
   * The type is safe because we construct a valid T using a factory.
   */
  const addRow = (template: Partial<T> = {}) => {
    const newRow: T = {
      ...(template as T),
      id: Date.now(),
      // You can include any extra default flags
      isNew: true as any, // optional
    };

    setRows((prev) => [...prev, newRow]);
  };

  /**
   * Edit a row by merging partial updates.
   */
  const editRow = (id: GridRowId, updates: Partial<T>) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  };

  /**
   * Save row after editing (GridRowModel is already the full object)
   */
  const saveRow = (updatedRow: GridRowModel) => {
    setRows((prev) =>
      prev.map((r) => (r.id === updatedRow.id ? (updatedRow as T) : r))
    );
  };

  /**
   * Remove row by id
   */
  const deleteRow = (id: GridRowId) => {
    console.log(id);
    
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  return {
    rows,
    setRows,
    addRow,
    editRow,
    saveRow,
    deleteRow,
  };
}

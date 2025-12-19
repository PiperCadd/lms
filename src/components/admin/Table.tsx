import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowModes,
  GridRowModesModel,
  GridRowId,
  GridRowModel,
  GridRowsProp,
  GridToolbarContainer,
  GridRowParams,
  useGridApiRef,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";
import { useConfirmDialogStore } from "@/hooks/admin/useConfirmDialogStore";
import Pagination from "@/ui/Pagination";

interface TableProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  title?: string;
  renderActions?: (
    params: GridRowParams,
    handlers: {
      edit: () => void;
      delete: () => void;
      save: () => void;
      cancel: () => void;
      toggle: () => void;
    }
  ) => React.ReactElement[];
  onSave?: (row: GridRowModel) => void;
  onDelete?: (id: GridRowId) => void;
  onEdit?: (id: GridRowId) => void;
  onCancel?: (id: GridRowId) => void;
  onAdd?: () => void;
  onToggle?: (id: GridRowId, value: boolean) => void;
}

function EditToolbar({ onAdd }: { onAdd?: () => void }) {
  return (
    <GridToolbarContainer>
      {onAdd && (
        <Button startIcon={<AddIcon />} onClick={onAdd}>
          Add
        </Button>
      )}
    </GridToolbarContainer>
  );
}

function findIndexById(rows: GridRowsProp, id: GridRowId) {
  return rows.findIndex((r: any) => r.id === id);
}

const Table: React.FC<TableProps> = ({
  rows,
  columns,
  title,
  renderActions,
  onAdd,
  onEdit,
  onSave,
  onDelete,
  onCancel,
  onToggle,
}) => {
  const apiRef = useGridApiRef();

  // Keep data in state but sync when `rows` prop changes.
  const [data, setData] = React.useState<GridRowsProp>(rows);
  React.useEffect(() => setData(rows), [rows]);

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  // Pull dialog methods once to avoid repeated getter calls.
  const { showDialog, closeDialog, setLoading } = useConfirmDialogStore();

  // Refs for callbacks to avoid stale closures and unnecessary deps
  const onDeleteRef = React.useRef(onDelete);
  React.useEffect(() => {
    onDeleteRef.current = onDelete;
  }, [onDelete]);

  const onEditRef = React.useRef(onEdit);
  React.useEffect(() => {
    onEditRef.current = onEdit;
  }, [onEdit]);

  const onCancelRef = React.useRef(onCancel);
  React.useEffect(() => {
    onCancelRef.current = onCancel;
  }, [onCancel]);

  const onSaveRef = React.useRef(onSave);
  React.useEffect(() => {
    onSaveRef.current = onSave;
  }, [onSave]);

  const onToggleRef = React.useRef(onToggle);
  React.useEffect(() => {
    onToggleRef.current = onToggle;
  }, [onToggle]);

  // Handlers (stable via useCallback)
  const handleEditClick = React.useCallback(
    (id: GridRowId) => () => {
      setRowModesModel((prev) => ({
        ...prev,
        [id]: { mode: GridRowModes.Edit },
      }));
      onEditRef.current?.(id);
    },
    []
  );

  const handleCancelClick = React.useCallback(
    (id: GridRowId) => () => {
      setRowModesModel((prev) => ({
        ...prev,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      }));
      onCancelRef.current?.(id);
    },
    []
  );

  const handleSaveClick = React.useCallback(
    (id: GridRowId) => () => {
      showDialog({
        title: "Save Changes?",
        description: "Do you want to update this record?",
        confirmText: "Save",
        onConfirm: () => {
          // Stop edit mode (this will call processRowUpdate)
          apiRef.current.stopRowEditMode({ id });
          closeDialog();
        },
      });
    },
    [apiRef, showDialog, closeDialog]
  );

  const handleDeleteClick = React.useCallback(
    (id: GridRowId) => () => {
      showDialog({
        title: "Delete Record?",
        description: "This action cannot be undone.",
        confirmText: "Delete",
        isDestructive: true,
        onConfirm: async () => {
          setLoading(true);
          // Optimized remove by index
          setData((prev) => {
            const idx = findIndexById(prev, id);
            if (idx === -1) return prev;
            const clone = [...prev];
            clone.splice(idx, 1);
            return clone;
          });
          onDeleteRef.current?.(id);
          setLoading(false);
          closeDialog();
        },
      });
    },
    [showDialog, setLoading, closeDialog]
  );

  const handleToggleClick = React.useCallback(
    (params: GridRowParams) => (event: React.MouseEvent) => {
      (event.currentTarget as HTMLElement).blur();

      const id = params.id;
      const isActive = params.row.isActive;

      showDialog({
        title: isActive ? "Deactivate Item?" : "Activate Item?",
        description: `Do you want to ${
          isActive ? "deactivate" : "activate"
        } this item?`,
        confirmText: isActive ? "Deactivate" : "Activate",
        onConfirm: async () => {
          setLoading(true);

          setData((prev) =>
            prev.map((item) =>
              item.id === id ? { ...item, isActive: !isActive } : item
            )
          );

          onToggleRef.current?.(id, !isActive);

          setLoading(false);
          closeDialog();
        },
      });
    },
    [showDialog, closeDialog, setLoading]
  );

  // processRowUpdate: minimal work and id-based update for performance
  const processRowUpdate = React.useCallback(
    (newRow: any) => {
      // Basic validation: return previous row if invalid (don't throw)
      if (!newRow.name) {
        // you can integrate toast/notification here instead of throwing
        // keep grid stable by returning the previous state for this row
        const prevIdx = findIndexById(data, newRow.id);
        return data[prevIdx] ?? newRow;
      }

      setData((prev) => {
        const idx = findIndexById(prev, newRow.id);
        if (idx === -1) return prev;
        const clone = [...prev];
        clone[idx] = { ...clone[idx], ...newRow };
        return clone;
      });

      onSaveRef.current?.(newRow);
      return newRow;
    },
    [data]
  );

  // getActions separated and memoized to avoid regenerating entire columns array
  const getActions = React.useCallback(
    (params: GridRowParams) => {
      const isEditing = rowModesModel[params.id]?.mode === GridRowModes.Edit;

      if (isEditing) {
        return [
          <GridActionsCellItem
            key="save"
            icon={<SaveIcon />}
            label="Save"
            onClick={handleSaveClick(params.id)}
          />,
          <GridActionsCellItem
            key="cancel"
            icon={<CancelIcon />}
            label="Cancel"
            onClick={handleCancelClick(params.id)}
          />,
        ];
      }

      if (renderActions) {
        return renderActions(params, {
          edit: handleEditClick(params.id),
          delete: handleDeleteClick(params.id),
          save: handleSaveClick(params.id),
          cancel: handleCancelClick(params.id),
          toggle: handleToggleClick(params),
        });
      }

      return [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={handleEditClick(params.id)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(params.id)}
        />,
      ];
    },
    [
      rowModesModel,
      renderActions,
      handleEditClick,
      handleDeleteClick,
      handleSaveClick,
      handleCancelClick,
      handleToggleClick,
    ]
  );

  const mergedColumns: GridColDef[] = React.useMemo(() => {
    if (!renderActions) return columns;

    return [
      ...columns,
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        flex: 2,
        getActions,
      },
    ];
  }, [columns, renderActions, getActions]);

  // Memoize SX to avoid creating a new object on every render
  const gridSx = React.useMemo(
    () => ({
      backgroundImage: "var(--admin-bgimg)",
      backgroundColor: "var(--admin-card-bg)",
      borderRadius: "var(--border-radius-lg)",
      color: "var(--admin-text-white)",
      border: "none",
      "& .MuiCheckbox-root": { color: "#fff !important" },
      "& .MuiDataGrid-main": {
        borderTopLeftRadius: "var(--border-radius-sm)",
        borderTopRightRadius: "var(--border-radius-sm)",
        overflow: "hidden",
      },
      "& .MuiDataGrid-columnHeader .MuiDataGrid-columnHeaderTitleContainer .MuiCheckbox-root":
        {
          color: "#000 !important",
        },
      "& .MuiDataGrid-columnHeader .Mui-checked": {
        color: "#1976d2 !important",
      },
      "& .Mui-checked": {
        color: "var(--admin-text-white) !important",
      },
      "& .MuiCheckbox-root:hover": {
        backgroundColor: "rgba(255,255,255,0.1) !important",
      },
      "& .Mui-focusVisible": { outline: "none" },
      "& .MuiDataGrid-row.Mui-selected": {
        backgroundColor: "var(--white-10)",
      },
      "& .MuiDataGrid-row.Mui-selected:hover": {
        backgroundColor: "var(--white-20)",
      },
      "& .MuiDataGrid-row:hover": { backgroundColor: "transparent" },
      "& .MuiDataGrid-columnHeader": { color: "#000" },
      "& .MuiDataGrid-columnHeaderTitle": {
        color: "#000",
        fontWeight: 700,
        fontSize: "0.8rem",
        textTransform: "uppercase",
      },
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "#ffffff",
      },
      "& .MuiDataGrid-footerContainer": {
        borderTop: "none !important",
      },
      "& .MuiDataGrid-footerContainer .MuiDataGrid-pagination": {
        borderTop: "none !important",
        color: "var(--admin-text-white)",
      },
      "& .MuiTablePagination-title": { color: "#fff" },
      "& .MuiTablePagination-displayedRows": { color: "#fff" },
      "& .MuiTablePagination-selectLabel": { color: "#fff" },
      "& .MuiTablePagination-select": { color: "#fff" },
      "& .MuiTablePagination-actions svg": { fill: "#fff" },
      // Highest-specificity selector for editing row
      "& .MuiDataGrid-virtualScrollerRenderZone > div.MuiDataGrid-row.MuiDataGrid-row--editing":
        {
          backgroundImage: "var(--admin-bgimg) !important",
          backgroundColor: "var(--white-20) !important",
          transition: "all 300ms ease-out",
          color: "#fff !important",
        },
      "& .MuiDataGrid-virtualScrollerRenderZone > div.MuiDataGrid-row.MuiDataGrid-row--editing:hover":
        {
          backgroundColor: "var(--white-10) !important",
        },
      // Also fix each cell inside edit row (needed in dark themes)
      "& .MuiDataGrid-virtualScrollerRenderZone > div.MuiDataGrid-row.MuiDataGrid-row--editing .MuiDataGrid-cell":
        {
          backgroundColor: "var(--white-20) !important",
          color: "#fff !important",
        },
    }),
    []
  );

  // Memoize toolbar component reference to avoid recreating slot
  const Toolbar = React.useMemo(
    () => (onAdd ? () => <EditToolbar onAdd={onAdd} /> : undefined),
    [onAdd]
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "fit-content",
        minWidth: 0,
        overflow: "hidden",
        padding: "16px",
        backgroundImage: "var(--admin-bgimg)",
        backgroundColor: "var(--admin-card-bg)",
        borderRadius: "var(--border-radius-lg)",
      }}
    >
      {title && <h6 className="mb-4 font-bold">{title}</h6>}
      <DataGrid
        apiRef={apiRef}
        rows={data}
        columns={mergedColumns}
        editMode="row"
        isCellEditable={() => false}
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => console.error(error)}
        disableRowSelectionOnClick
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        pageSizeOptions={[5]}
        sx={gridSx}
        slots={{
          toolbar: Toolbar,
          pagination: Pagination,
        }}
      />
    </Box>
  );
};

export default React.memo(Table);

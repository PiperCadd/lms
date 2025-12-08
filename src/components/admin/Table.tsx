import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

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
  GridRowEditStopParams,
  GridRowEditStopReasons,
  useGridApiRef,
} from "@mui/x-data-grid";
import CrudActions from "@/ui/CurdActions";

interface EditToolbarProps {
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp>>;
  setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>;
}

interface TableProps {
  rows: GridRowsProp;
  columns: GridColDef[];
}

function EditToolbar({ setRows, setRowModesModel }: EditToolbarProps) {
  const handleClick = () => {
    const id = Date.now();

    setRows((prev) => [
      { id, firstName: "", lastName: "", age: null, isNew: true },
      ...prev,
    ]);

    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "firstName" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function Table({ rows, columns }: TableProps) {
  const apiRef = useGridApiRef();

  const [row, setRows] = React.useState(rows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop = (
    params: GridRowEditStopParams,
    event: React.SyntheticEvent
  ) => {
    // prevent edit mode exit on blur
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.Edit },
    }));
  };

  const handleSaveClick = (id: GridRowId) => () => {
    apiRef.current.stopRowEditMode({ id });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));

    const row = apiRef.current.getRow(id);
    if (row?.isNew) {
      setRows((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const processRowUpdate = React.useCallback((newRow: GridRowModel) => {
    const updated = { ...newRow, isNew: false };
    setRows((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    return updated;
  }, []);

  const column: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    { field: "lastName", headerName: "Last name", width: 150, editable: true },
    {
      field: "age",
      headerName: "Age",
      width: 110,
      type: "number",
      editable: true,
    },

    {
      field: "fullName",
      headerName: "Full name",
      width: 160,
      valueGetter: (params) =>
        `${params?.row?.firstName ?? ""} ${params?.row?.lastName ?? ""}`,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 260,
      getActions: ({ id }) => {
        const isEditing = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isEditing) {
          return [
            <GridActionsCellItem
              key="save"
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key="cancel"
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
            />,
          ];
        }

        return [
          <CrudActions
            key="delete"
            edit
            delete
            toggle
            isActive={true}
            onEdit={handleEditClick(id)}
            onDelete={handleDeleteClick(id)}
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: 420, width: "100%" }}>
      <DataGrid
        sx={{
          backgroundImage: "var(--admin-bgimg)",
          backgroundColor: "var(--admin-card-bg)",
          borderRadius: "var(--border-radius-lg)",
          color: "var(--admin-text-white)",
          padding: "16px",
          border: "none",
          "& .MuiCheckbox-root": {
            color: "#fff !important", // unchecked
          },
          "& .MuiDataGrid-main": {
            borderTopLeftRadius: "var(--border-radius-sm)",
            borderTopRightRadius: "var(--border-radius-sm)",
            overflow: "hidden",
          },
          "& .MuiDataGrid-columnHeader .MuiDataGrid-columnHeaderTitleContainer .MuiCheckbox-root":
            {
              color: "#000 !important", // unchecked color
            },
          "& .MuiDataGrid-columnHeader .Mui-checked": {
            color: "#1976d2 !important", // checked color
          },
          "& .Mui-checked": {
            color: "var(--admin-text-white) !important", // checked
          },
          // Hide the blue ripple highlight
          "& .MuiCheckbox-root:hover": {
            backgroundColor: "rgba(255,255,255,0.1) !important",
          },
          // Optional: hide focus ring
          "& .Mui-focusVisible": {
            outline: "none",
          },
          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: "var(--white-10)",
          },
          "& .MuiDataGrid-row.Mui-selected:hover": {
            backgroundColor: "var(--white-20)",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "transparent",
            cursor: "pointer",
          },
          "& .MuiDataGrid-columnHeader": {
            color: "#000",
          },
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
            borderTop: "none !important", // removes bottom container border
          },
          "& .MuiDataGrid-footerContainer .MuiDataGrid-pagination": {
            borderTop: "none !important",
            color: "var(--admin-text-white)",
          },
          "& .MuiTablePagination-title": {
            color: "#fff",
          },

          // Page number text
          "& .MuiTablePagination-displayedRows": {
            color: "#fff",
          },

          // Page size dropdown text
          "& .MuiTablePagination-selectLabel": {
            color: "#fff",
          },

          // Dropdown options text
          "& .MuiTablePagination-select": {
            color: "#fff",
          },

          // Pagination buttons (arrows)
          "& .MuiTablePagination-actions svg": {
            fill: "#fff",
          },
        }}
        apiRef={apiRef}
        rows={rows}
        columns={column}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        checkboxSelection
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}

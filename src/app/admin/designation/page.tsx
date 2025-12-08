"use client";
import Table from "@/components/admin/Table";
import Button from "@/ui/Button";
import SearchBar from "@/ui/SearchBar";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowEditStopParams,
  GridRowId,
  GridRowModesModel,
  GridRowsProp,
  useGridApiRef,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@/ui/Dialog";
import { useUIStore } from "@/store/admin/useUIStore";
import { addDesignationFormFields } from "@/config/admin";
import CrudActions from "@/ui/CurdActions";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import React from "react";

const initialRows: GridRowsProp = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 28 },
  { id: 6, lastName: "Melisandre", firstName: "Unknown", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const Page = () => {
  const { setIsDialogOpen } = useUIStore();
  // const apiRef = useGridApiRef();

  // const [row, setRows] = React.useState(initialRows);
  // const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
  //   {}
  // );

  // const handleRowEditStop = (
  //   params: GridRowEditStopParams,
  //   event: React.SyntheticEvent
  // ) => {
  //   // prevent edit mode exit on blur
  //   if (params.reason === GridRowEditStopReasons.rowFocusOut) {
  //     event.defaultMuiPrevented = true;
  //   }
  // };
  // const handleEditClick = (id: GridRowId) => () => {
  //   setRowModesModel((prev) => ({
  //     ...prev,
  //     [id]: { mode: GridRowModes.Edit },
  //   }));
  // };

  // const handleSaveClick = (id: GridRowId) => () => {
  //   apiRef.current.stopRowEditMode({ id });
  // };

  // const handleDeleteClick = (id: GridRowId) => () => {
  //   setRows((prev) => prev.filter((row) => row.id !== id));
  // };

  // const handleCancelClick = (id: GridRowId) => () => {
  //   setRowModesModel((prev) => ({
  //     ...prev,
  //     [id]: { mode: GridRowModes.View, ignoreModifications: true },
  //   }));

    const columns: GridColDef[] = [
      { field: "id", headerName: "ID", width: 90 },
      {
        field: "firstName",
        headerName: "First name",
        width: 150,
        editable: true,
      },
      {
        field: "lastName",
        headerName: "Last name",
        width: 150,
        editable: true,
      },
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

  //   const row = apiRef.current.getRow(id);
  //   if (row?.isNew) {
  //     setRows((prev) => prev.filter((r) => r.id !== id));
  //   }
  // };

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Designation</h1>
      <div className="flex justify-between mb-8">
        <SearchBar />
        <Button
          sx={{
            width: "fit-content",
            fontSize: "0.8rem",
            display: "flex",
            gap: "4px",
          }}
          onClick={() => setIsDialogOpen(true)}
          size="small"
        >
          <AddIcon sx={{ fontSize: "1.2rem" }} />
          <span>Add Designation</span>
        </Button>
        <Dialog
          title="Add Category"
          supportText="Enter the new designation to proceed"
          formFields={addDesignationFormFields}
          apiEndPoint="/"
        />
      </div>
      <Table rows={initialRows} columns={columns} />
    </main>
  );
};

export default Page;

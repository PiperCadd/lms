"use client";
import Table from "@/components/admin/Table";
import Button from "@/ui/Button";
import SearchBar from "@/ui/SearchBar";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowsProp,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@/ui/Dialog";
import { useUIStore } from "@/store/admin/useUIStore";
import { addDesignationFormFields, addSubCategoryFormFields } from "@/config/admin";
import CrudActions from "@/ui/Actions";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

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

    const columns: GridColDef[] = [
      { field: "id", headerName: "SL.No", width: 100 },
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
    ];

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Sub Categories</h1>
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
          sizeVariant="small"
        >
          <AddIcon sx={{ fontSize: "1.2rem" }} />
          <span>Add Sub Categories</span>
        </Button>
        <Dialog
          title="Add Sub Category"
          formFields={addSubCategoryFormFields}
          apiEndPoint="/"
        />
      </div>
        <Table
        rows={initialRows}
        columns={columns}
        renderActions={(params, handlers) => [
          <CrudActions
            key="crud"
            edit
            delete
            isActive={params.row.isActive}
            onEdit={handlers.edit}
            onDelete={handlers.delete}
          />,
        ]}
      />
    </main>
  );
};

export default Page;

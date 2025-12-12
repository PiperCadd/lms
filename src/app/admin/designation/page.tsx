"use client";
import Table from "@/components/admin/Table";
import Button from "@/ui/Button";
import SearchBar from "@/ui/SearchBar";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@/ui/Dialog";
import { useUIStore } from "@/store/admin/useUIStore";
import { addDesignationFormFields } from "@/config/admin";
import CrudActions from "@/ui/CurdActions";
import { mockDesignations } from "@/mockData";
import { useTableData } from "@/hooks/admin/useTableData";

const Page = () => {
  const { setIsDialogOpen } = useUIStore();
  const { rows, deleteRow, editRow } = useTableData(mockDesignations);

  const columns: GridColDef[] = [
    { field: "id", headerName: "SL.No", width: 100 },
    {
      field: "designationName",
      headerName: "Designation name",
      width: 550,
      editable: true,
    },
  ];

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
          title="Add Designation"
          supportText="Enter the new designation to proceed"
          formFields={addDesignationFormFields}
          apiEndPoint="/"
        />
      </div>
      <Table
        rows={rows}
        columns={columns}
        renderActions={(params, handlers) => [
          <CrudActions
            key="crud"
            edit
            delete
            toggle
            isActive={params.row.isActive}
            onEdit={handlers.edit}
            onDelete={handlers.delete}
            onToggle={handlers.toggle}
          />,
        ]}
      />
    </main>
  );
};

export default Page;

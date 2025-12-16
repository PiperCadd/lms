"use client";
import Table from "@/components/admin/Table";
import Button from "@/ui/Button";
import SearchBar from "@/ui/SearchBar";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@/ui/Dialog";
import { useUIStore } from "@/store/admin/useUIStore";
import { addLanguagesFormFields } from "@/config/admin";
import { mockLanguages } from "@/mockData";
import CrudActions from "@/ui/Actions";

const Page = () => {
  const { setIsDialogOpen } = useUIStore();

  const columns: GridColDef[] = [
    { field: "id", headerName: "SL.No", width: 100 },
    {
      field: "code",
      headerName: "Language Code",
      width: 300,
      editable: true,
    },
    {
      field: "name",
      headerName: "Language Name",
      width: 300,
      editable: true,
    },
  ];

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Languages</h1>
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
          <span>Add Languages</span>
        </Button>
        <Dialog
          title="Add Languages"
          formFields={addLanguagesFormFields}
          apiEndPoint="/"
        />
      </div>
      <Table
        rows={mockLanguages}
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

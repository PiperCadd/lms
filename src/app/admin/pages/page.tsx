"use client";
import Table from "@/components/admin/Table";
import Button from "@/ui/Button";
import SearchBar from "@/ui/SearchBar";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@/ui/Dialog";
import { useUIStore } from "@/store/admin/useUIStore";
import { addPageFormFields } from "@/config/admin";
import CrudActions from "@/ui/Actions";
import { mockPages } from "@/mockData";


const Page = () => {
  const { openDialog } = useUIStore();

  const columns: GridColDef[] = [
    { field: "id", headerName: "SL.No", flex: 1 },
    {
      field: "pageName",
      headerName: "Page Name",
      flex: 2.5,
    },
    {
      field: "content",
      headerName: "Content",
      flex: 3,
    },
  ];

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Pages</h1>
      <div className="flex justify-between mb-8">
        <SearchBar gridKey="pages" />
        <Button
          sx={{
            width: "fit-content",
            fontSize: "0.8rem",
            display: "flex",
            gap: "4px",
          }}
          onClick={() => openDialog("pages")}
          sizeVariant="small"
        >
          <AddIcon sx={{ fontSize: "1.2rem" }} />
          <span>Add Page</span>
        </Button>
        <Dialog
          title="Page"
          formFields={addPageFormFields}
          apiEndPoint="/"
        />
      </div>
      <Table
        rows={mockPages}
        columns={columns}
        gridKey="pages"
        onEdit={(id) => openDialog("pages", id)}
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

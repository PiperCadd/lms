"use client";
import Table from "@/components/admin/Table";
import Button from "@/ui/Button";
import SearchBar from "@/ui/SearchBar";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@/ui/Dialog";
import { useUIStore } from "@/store/admin/useUIStore";
import { addCategoryFormFields } from "@/config/admin";
import { mockCourseCategories } from "@/mockData";
import CrudActions from "@/ui/Actions";

const Page = () => {
  const { openDialog } = useUIStore();
  const columns: GridColDef[] = [
    { field: "id", headerName: "SL.No", flex: 1 },
    {
      field: "categoryName",
      headerName: "Category Name",
      flex: 3,
    },
  ];

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Categories</h1>
      <div className="flex justify-between mb-8">
        <SearchBar gridKey="category" />
        <Button
          sx={{
            width: "fit-content",
            fontSize: "0.8rem",
            display: "flex",
            gap: "4px",
          }}
          onClick={() => openDialog("category")}
          size="small"
        >
          <AddIcon sx={{ fontSize: "1.2rem" }} />
          <span>Add Category</span>
        </Button>
        <Dialog
          title="Category"
          formFields={addCategoryFormFields}
          apiEndPoint="/"
        />
      </div>
      <Table
        rows={mockCourseCategories}
        columns={columns}
        gridKey="category"
        onEdit={(id) => openDialog("category", id)}
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

"use client";
import Table from "@/components/admin/Table";
import Button from "@/ui/Button";
import SearchBar from "@/ui/SearchBar";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@/ui/Dialog";
import { useUIStore } from "@/store/admin/useUIStore";
import { addSubCategoryFormFields } from "@/config/admin";
import CrudActions from "@/ui/Actions";
import { mockSubCategories } from "@/mockData";
import { GridFilters } from "@/components/admin/GridFilters";

const Page = () => {
  const { openDialog } = useUIStore();

  const columns: GridColDef[] = [
    {
      field: "slno",
      headerName: "SL.NO",
      width: 90,
      renderCell: (params) => (params.row.showCategory ? params.value : null),
      cellClassName: (params) =>
        params.row.showCategory ? "group-cell" : "hidden-cell",
    },
    {
      field: "category",
      headerName: "CATEGORY",
      flex: 1,
      renderCell: (params) => (params.row.showCategory ? params.value : null),
      cellClassName: (params) =>
        params.row.showCategory ? "group-cell" : "hidden-cell",
    },
    {
      field: "subcategory",
      headerName: "SUBCATEGORY",
      flex: 1,
    },
  ];

  const rows = mockSubCategories.flatMap((item, index) =>
    item.subCategory.map((sub, subIndex) => ({
      id: `${item.id}-${subIndex}`,
      slno: index + 1,
      category: item.category,
      subcategory: sub,
      showCategory: subIndex === 0,
    }))
  );

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Sub Categories</h1>
      <div className="flex justify-between mb-8">
        <div className="flex gap-2">
          <SearchBar gridKey="subcategory" />
          <GridFilters
            gridKey="subcategory"
            filters={[
              {
                type: "select",
                field: "category",
                placeholder: "Category",
                optionsKey: "categories",
              },
            ]}
          />
        </div>
        <Button
          sx={{
            width: "fit-content",
            fontSize: "0.8rem",
            display: "flex",
            gap: "4px",
          }}
          onClick={() => openDialog("subCategory")}
          sizeVariant="small"
        >
          <AddIcon sx={{ fontSize: "1.2rem" }} />
          <span>Add Sub Categories</span>
        </Button>
        <Dialog
          title="Sub Category"
          formFields={addSubCategoryFormFields}
          apiEndPoint="/"
        />
      </div>
      <Table
        rows={rows}
        columns={columns}
        gridKey="subcategory"
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

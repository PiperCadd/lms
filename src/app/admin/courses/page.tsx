"use client";
import Table from "@/components/admin/Table";
import SearchBar from "@/ui/SearchBar";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@/ui/Dialog";
import { addDesignationFormFields } from "@/config/admin";
import { mockCourses } from "@/mockData";
import Actions from "@/ui/Actions";
import Button from "@/ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GridFilters } from "@/components/admin/GridFilters";

const Page = () => {
  const router = useRouter();

  const columns: GridColDef[] = [
    { field: "id", headerName: "SL.No", width: 80 },
    {
      field: "courseName",
      headerName: "Course Name",
      flex: 2,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "subCategory",
      headerName: "Sub Category",
      flex: 1.5,
    },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center w-full h-full">
          <div className="relative w-16 h-16">
            <Image
              src={params.row.value ?? "/admin/images/python.png"}
              alt=""
              fill
              sizes="64px"
              className="object-contain"
            />
          </div>
        </div>
      ),
    },
    {
      field: "numberOfChapters",
      headerName: "No.Of Chapters",
      flex: 1,
    },
  ];

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Courses</h1>
      <div className="flex justify-between mb-8">
        <div className="flex gap-2">
          <SearchBar gridKey="courses" />
          <GridFilters
            gridKey="courses"
            filters={[
              {
                type: "select",
                field: "category",
                placeholder: "Category",
                optionsKey: "categories",
              },
              {
                type: "select",
                field: "subCategory",
                placeholder: "Sub Chapter",
                optionsKey: "",
              },
            ]}
          />
        </div>
        <Button
          LinkComponent={"a"}
          href="/admin/courses/add"
          sx={{ width: "content-width" }}
        >
          <AddIcon sx={{ fontSize: "1.2rem" }} />
          <span>Add Courses</span>
        </Button>
        <Dialog
          title="Add Category"
          formFields={addDesignationFormFields}
          apiEndPoint="/"
        />
      </div>
      <Table
        rowHeight={70}
        rows={mockCourses}
        columns={columns}
        gridKey="courses"
        onEdit={(id) => {
          router.push(`/admin/courses/${id}/edit`);
        }}
        renderActions={(params, handlers) => [
          <Actions
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

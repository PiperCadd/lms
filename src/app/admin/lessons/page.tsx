"use client";
import Table from "@/components/admin/Table";
import Button from "@/ui/Button";
import SearchBar from "@/ui/SearchBar";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@/ui/Dialog";
import { addDesignationFormFields } from "@/config/admin";
import CrudActions from "@/ui/Actions";
import { mockLessons } from "@/mockData";
import { useRouter } from "next/navigation";
import { GridFilters } from "@/components/admin/GridFilters";

const Page = () => {
  const router = useRouter();

  const columns: GridColDef[] = [
    { field: "id", headerName: "SL.No", flex: 1 },
    {
      field: "lessonName",
      headerName: "Lesson name",
      flex: 3,
    },
    {
      field: "course",
      headerName: "Course",
      flex: 3,
    },
    {
      field: "availableLanguages",
      headerName: "Available Languages",
      flex: 3,
    },
  ];

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Lessons</h1>
      <div className="flex justify-between mb-8">
        <div className="flex gap-2">
          <SearchBar gridKey="lessons" />
          <GridFilters
            gridKey="lessons"
            filters={[
              {
                type: "select",
                field: "course",
                placeholder: "Course",
                options: [
                  "Web Development",
                  "Frontend Development",
                  "Data Science",
                  "Backend Development",
                  "Artificial Intelligence",
                  "Cloud & DevOps",
                ],
              },
              {
                type: "select",
                field: "chapter",
                placeholder: "Chapter",
                options: [
                  "Web Development",
                  "Frontend Development",
                  "Data Science",
                  "Backend Development",
                  "Artificial Intelligence",
                  "Cloud & DevOps",
                ],
              },
            ]}
          />
        </div>
        <Button
          LinkComponent={"a"}
          href="/admin/lessons/add"
          sx={{ width: "content-width" }}
        >
          <AddIcon sx={{ fontSize: "1.2rem" }} />
          <span>Add Lessons</span>
        </Button>
        <Dialog
          title="Add Designation"
          formFields={addDesignationFormFields}
          apiEndPoint="/"
        />
      </div>
      <Table
        rows={mockLessons}
        columns={columns}
        gridKey="lessons"
        onEdit={(id) => {
          router.push(`/admin/lessons/${id}/edit`);
        }}
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

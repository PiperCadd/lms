"use client";
import Table from "@/components/admin/Table";
import Button from "@/ui/Button";
import SearchBar from "@/ui/SearchBar";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@/ui/Dialog";
import { addDesignationFormFields } from "@/config/admin";
import CrudActions from "@/ui/Actions";
import { quizzesMockData } from "@/mockData";
import { IconButton, Tooltip } from "@mui/material";
import { VisibilityOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GridFilters } from "@/components/admin/GridFilters";

const RowLinkAction = ({ href }: { href: string }) => {
  return (
    <Tooltip title="View">
      <IconButton
        component={Link}
        href={href}
        size="small"
        onClick={(e) => e.stopPropagation()}
        aria-label="View"
        sx={{
          backgroundColor: "#0D6EFD", // Primary Blue
          color: "#fff",
          padding: "0.45rem",
          borderRadius: "var(--border-radius-md)",
          transition: "0.2s",
          "&:hover": {
            backgroundColor: "#0B5ED7", // Darker Blue (consistent hover style)
          },
        }}
      >
        <VisibilityOutlined fontSize="small" sx={{ color: "#fff" }} />{" "}
      </IconButton>
    </Tooltip>
  );
};

const Page = () => {
  const router = useRouter();

  const columns: GridColDef[] = [
    { field: "id", headerName: "SL.No", flex: 1 },
    {
      field: "quizTitle",
      headerName: "Quiz Title",
      flex: 3,
    },
    {
      field: "course",
      headerName: "Course",
      flex: 3,
    },
    {
      field: "noOfQuestions",
      headerName: "No. Of Questions",
      flex: 3,
    },
  ];

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Quizzes</h1>
      <div className="flex justify-between mb-8">
        <div className="flex gap-2">
          <SearchBar gridKey="quizzes" />
          <GridFilters
            gridKey="quizzes"
            filters={[
              {
                type: "select",
                field: "course",
                placeholder: "Course",
                options: ["Web Development", "Frontend Development", "Data Science", "Backend Development", "Artificial Intelligence", "Cloud & DevOps" ],
              },
            ]}
          />
        </div>
        <Button
          LinkComponent={"a"}
          href="/admin/quizzes/add"
          sx={{ width: "content-width" }}
        >
          <AddIcon sx={{ fontSize: "1.2rem" }} />
          <span>Add Quiz</span>
        </Button>
        <Dialog
          title="Add Designation"
          formFields={addDesignationFormFields}
          apiEndPoint="/"
        />
      </div>
      <Table
        rows={quizzesMockData}
        columns={columns}
        gridKey="quizzes"
        onEdit={(id) => {
          router.push(`/admin/quizzes/${id}/edit`);
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
          <RowLinkAction key="view" href={`/admin/quizzes/${params.id}`} />,
        ]}
      />
    </main>
  );
};

export default Page;

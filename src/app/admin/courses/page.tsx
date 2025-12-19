"use client";
import Table from "@/components/admin/Table";
import SearchBar from "@/ui/SearchBar";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@/ui/Dialog";
import { addDesignationFormFields } from "@/config/admin";
import { mockTeamMembers } from "@/mockData";
import Actions from "@/ui/Actions";
import Link from "next/link";
import Button from "@/ui/Button";

const Page = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "SL.No", width: 80 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: true,
    },
    {
      field: "email",
      headerName: "E-Mail",
      width: 300,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      editable: true,
    },

    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
  ];

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Courses</h1>
      <div className="flex justify-between mb-8">
        <SearchBar />
        <Button
          LinkComponent={"a"}
          href="/admin/courses/add-course"
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
        rows={mockTeamMembers}
        columns={columns}
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

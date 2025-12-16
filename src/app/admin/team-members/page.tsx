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
import { IconButton, Tooltip } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const RowLinkAction = ({ href }: { href: string }) => {
  return (
    <Tooltip title="Permissions">
      <IconButton
        component={Link}
        href={href}
        size="small"
        onClick={(e) => e.stopPropagation()}
        aria-label="View"
        sx={{
          backgroundColor: "#28A745",
          color: "#fff",
          padding: "0.45rem",
          borderRadius: "var(--border-radius-md)",
          transition: "0.2s",
          "&:hover": {
            backgroundColor: "#218838",
          },
        }}
      >
        <AdminPanelSettingsIcon fontSize="small" sx={{ color: "#fff" }} />{" "}
        <span className="text-xs">Permissions</span>
      </IconButton>
    </Tooltip>
  );
};

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
      <h1 className="text-2xl mb-4">Team Members</h1>
      <div className="flex justify-between mb-8">
        <SearchBar />
        <Link
          // sx={{
          //   width: "fit-content",
          //   fontSize: "0.8rem",
          //   display: "flex",
          //   gap: "4px",
          // }}
          // onClick={() => setIsDialogOpen(true)}
          // sizeVariant="small"
          href={"/admin/team-members/add-team-member"}
        >
          <AddIcon sx={{ fontSize: "1.2rem" }} />
          <span>Add Team Members</span>
        </Link>
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
            isActive={params.row.isActive}
            onEdit={handlers.edit}
            onDelete={handlers.delete}
          />,
          <RowLinkAction
            key="view"
            href={`/admin/team-members/permissions/${params.id}`}
          />,
        ]}
      />
    </main>
  );
};

export default Page;

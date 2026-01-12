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
import Button from "@/ui/Button";
import React from "react";
import { useRouter } from "next/navigation";

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
            backgroundColor: "var(--admin-green)",
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
  const router = useRouter();

  const columns: GridColDef[] = [
    { field: "id", headerName: "SL.No", width: 80 },
    {
      field: "name",
      headerName: "Name",
      flex: 2,
    },
    {
      field: "email",
      headerName: "E-Mail",
      flex: 2,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
  ];

  const handleEdit = React.useCallback(
    (id: number | string) => {
      router.push(`/admin/team-members/${id}/edit`);
    },
    [router]
  );

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Team Members</h1>
      <div className="flex justify-between mb-8">
        <SearchBar gridKey="teamMembers" />
        <Button
          LinkComponent={"a"}
          href="/admin/team-members/add"
          sx={{ width: "content-width" }}
        >
          <AddIcon sx={{ fontSize: "1.2rem" }} />
          <span>Add Team Members</span>
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
        gridKey="teamMembers"
        onEdit={handleEdit}
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

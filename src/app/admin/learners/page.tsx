"use client";
import Table from "@/components/admin/Table";
import Button from "@/ui/Button";
import SearchBar from "@/ui/SearchBar";
import { GridColDef } from "@mui/x-data-grid";
import Dialog from "@/ui/Dialog";
import { useUIStore } from "@/store/admin/useUIStore";
import { addLanguagesFormFields } from "@/config/admin";
import { mokeUsers } from "@/mockData";
import { IconButton, Tooltip } from "@mui/material";
import { VisibilityOutlined, ExitToAppOutlined } from "@mui/icons-material";
import Link from "next/link";

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
  const { setIsDialogOpen } = useUIStore();

  const columns: GridColDef[] = [
    { field: "id", headerName: "SL.No", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 300,
      editable: true,
    },
  ];

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Learners</h1>
      <div className="flex justify-between mb-8">
        <SearchBar />
        <Button
          sizeVariant="small"
          sx={{
            background: "#181f4a",
            border: "1px solid var(--border-color)",
            width: "fit-content",
            fontSize: "0.8rem",
            display: "flex",
            gap: "4px",
          }}
        >
          <ExitToAppOutlined sx={{ fontSize: "1.2rem" }} />
          <span>Export</span>{" "}
        </Button>

        <Dialog
          title="Add Languages"
          formFields={addLanguagesFormFields}
          apiEndPoint="/"
        />
      </div>
      <Table
        rows={mokeUsers}
        columns={columns}
        renderActions={(params) => [
          <RowLinkAction
            key="view"
            href={`/admin/learners/${params.id}`}
          />,
        ]}
      />
    </main>
  );
};

export default Page;

"use client";
import Table from "@/components/admin/Table";
import Button from "@/ui/Button";
import SearchBar from "@/ui/SearchBar";
import { GridColDef } from "@mui/x-data-grid";
import { mokeUsers } from "@/mockData";
import { IconButton, Tooltip } from "@mui/material";
import { VisibilityOutlined, ExitToAppOutlined } from "@mui/icons-material";
import Link from "next/link";
import { exportToCSV } from "@/utils/exportToCSV";

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
  const columns: GridColDef[] = [
    { field: "id", headerName: "SL.No", width: 60 },
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
      editable: true,
    },
  ];

  return (
    <main className="text-white p-6 flex-1">
      <h1 className="text-2xl mb-4">Learners</h1>
      <div className="flex justify-between mb-8">
        <SearchBar gridKey="learners" />
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
          onClick={() => exportToCSV(mokeUsers, "users.csv")}
        >
          <ExitToAppOutlined sx={{ fontSize: "1.2rem" }} />
          <span>Export</span>{" "}
        </Button>
      </div>
      <Table
        rows={mokeUsers}
        columns={columns}
        gridKey="learners"
        renderActions={(params) => [
          <RowLinkAction key="view" href={`/admin/learners/${params.id}`} />,
        ]}
      />
    </main>
  );
};

export default Page;

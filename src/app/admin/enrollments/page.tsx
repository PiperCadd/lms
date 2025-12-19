"use client";
import Table from "@/components/admin/Table";
import Button from "@/ui/Button";
import SearchBar from "@/ui/SearchBar";
import { GridColDef } from "@mui/x-data-grid";
import Dialog from "@/ui/Dialog";
import { useUIStore } from "@/store/admin/useUIStore";
import { addDesignationFormFields } from "@/config/admin";
import { mockEnrollments } from "@/mockData";
import ProgressCell from "@/ui/ProgressCell";
import { IconButton, Tooltip } from "@mui/material";
import { ExitToAppOutlined, VisibilityOutlined, DownloadOutlined } from "@mui/icons-material";
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

const CertificateLinkAction = ({ href }: { href: string }) => {
  return (
    <Tooltip title="Download">
      <IconButton
        component={Link}
        href={href}
        size="small"
        onClick={(e) => e.stopPropagation()}
        aria-label="View"
        sx={{
          backgroundColor: "#0D6EFD",
          color: "#fff",
          padding: "0.45rem",
          borderRadius: "var(--border-radius-md)",
          transition: "0.2s",
          "&:hover": { backgroundColor: "#0B5ED7" },
        }}
      >
        <DownloadOutlined fontSize="small" sx={{ color: "#fff" }} />
      </IconButton>
    </Tooltip>
  );
};

const Page = () => {
  const { setIsDialogOpen } = useUIStore();

  const columns: GridColDef[] = [
    { field: "id", headerName: "SL.No", flex: 1 },
    {
      field: "course",
      headerName: "Course",
      flex: 3,
      editable: true,
    },
    {
      field: "userName",
      headerName: "User Name",
      flex: 2,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 2,
      editable: true,
      renderCell: (params) => <ProgressCell value={params.value} />,
    },
    {
      field: "certificate",
      headerName: "Certificate",
      align: "center",
      flex: 1.5,
      renderCell: (params) => {
        const href = params.row?.certificate;

        if (!href) {
          return <span className="font-medium text-gray-400">Not Published</span>;
        }

        return <CertificateLinkAction href={href} />;
      },
    },
  ];

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Enrollments</h1>
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
          title="Add Designation"
          formFields={addDesignationFormFields}
          apiEndPoint="/"
        />
      </div>
      <Table
        rows={mockEnrollments}
        columns={columns}
        renderActions={(params) => [
          <RowLinkAction key="view" href={`/admin/enrollments/${params.id}`} />,
        ]}
      />
    </main>
  );
};

export default Page;

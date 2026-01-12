"use client";
import Table from "@/components/admin/Table";
import Button from "@/ui/Button";
import SearchBar from "@/ui/SearchBar";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@/ui/Dialog";
import { useUIStore } from "@/store/admin/useUIStore";
import { addAnnouncementFormFields } from "@/config/admin";
import CrudActions from "@/ui/Actions";
import { mockAnnouncements } from "@/mockData";
import { IconButton, Tooltip } from "@mui/material";
import { VisibilityOutlined } from "@mui/icons-material";


const RowViewAction = ({ row }: { row: any }) => {
  const { openDialog } = useUIStore();

  return (
    <Tooltip title="View">
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          openDialog("banner", row.id, "view");
        }}
        sx={{
          backgroundColor: "#0D6EFD",
          color: "#fff",
          padding: "0.45rem",
          borderRadius: "var(--border-radius-md)",
          "&:hover": { backgroundColor: "#0B5ED7" },
        }}
      >
        <VisibilityOutlined fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

const Page = () => {
  const { openDialog } = useUIStore();

  const columns: GridColDef[] = [
    { field: "id", headerName: "SL.No", flex: 1 },
    {
      field: "title",
      headerName: "Title",
      flex: 2.5,
    },
    {
      field: "content",
      headerName: "Content",
      flex: 3,
    },
    {
      field: "fromDate",
      headerName: "From Date",
      flex: 1.5,
    },
    {
      field: "toDate",
      headerName: "To Date",
      flex: 1.5,
    },
  ];

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Announcements</h1>
      <div className="flex justify-between mb-8">
        <SearchBar gridKey="announcements" />
        <Button
          sx={{
            width: "fit-content",
            fontSize: "0.8rem",
            display: "flex",
            gap: "4px",
          }}
          onClick={() => openDialog("announcements")}
          sizeVariant="small"
        >
          <AddIcon sx={{ fontSize: "1.2rem" }} />
          <span>Add Announcement</span>
        </Button>
        <Dialog
          title="Announcement"
          formFields={addAnnouncementFormFields}
          apiEndPoint="/"
        />
      </div>
      <Table
        rows={mockAnnouncements}
        columns={columns}
        gridKey="announcements"
        onEdit={(id) => openDialog("announcements", id)}
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
          <RowViewAction key="view" row={params.row} />,
        ]}
      />
    </main>
  );
};

export default Page;

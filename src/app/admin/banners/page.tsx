"use client";
import Table from "@/components/admin/Table";
import SearchBar from "@/ui/SearchBar";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@/ui/Dialog";
import { addBannerFormFields } from "@/config/admin";
import { mockBanners } from "@/mockData";
import Actions from "@/ui/Actions";
import Button from "@/ui/Button";
import Image from "next/image";
import { VisibilityOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useUIStore } from "@/store/admin/useUIStore";

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
    { field: "id", headerName: "SL.No", width: 80 },
    {
      field: "bannerName",
      headerName: "Banner Name",
      flex: 2,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
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
  ];

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Banners</h1>
      <div className="flex justify-between mb-8">
        <SearchBar gridKey="banner" />
        <Button
          sx={{
            width: "fit-content",
            fontSize: "0.8rem",
            display: "flex",
            gap: "4px",
          }}
          onClick={() => openDialog("banner")}
          sizeVariant="small"
        >
          <AddIcon sx={{ fontSize: "1.2rem" }} />
          <span>Add Banner</span>
        </Button>
        <Dialog
          title="Banner"
          formFields={addBannerFormFields}
          apiEndPoint="/"
        />
      </div>
      <Table
        rowHeight={70}
        rows={mockBanners}
        columns={columns}
        gridKey="banner"
        onEdit={(id) => openDialog("banner", id)}
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
          <RowViewAction key="view" row={params.row} />,
        ]}
      />
    </main>
  );
};

export default Page;

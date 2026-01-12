"use client";
import Table from "@/components/admin/Table";
import Button from "@/ui/Button";
import SearchBar from "@/ui/SearchBar";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@/ui/Dialog";
import { useUIStore } from "@/store/admin/useUIStore";
import { addCouponFormFields } from "@/config/admin";
import CrudActions from "@/ui/Actions";
import { couponMockData } from "@/mockData";
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
      field: "couponName",
      headerName: "Coupon Name",
      flex: 2.5,
    },
    {
      field: "couponCode",
      headerName: "Coupon Code",
      flex: 3,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1.5,
    },
  ];

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Coupons</h1>
      <div className="flex justify-between mb-8">
        <SearchBar gridKey="coupons" />
        <Button
          sx={{
            width: "fit-content",
            fontSize: "0.8rem",
            display: "flex",
            gap: "4px",
          }}
          onClick={() => openDialog("coupon")}
          sizeVariant="small"
        >
          <AddIcon sx={{ fontSize: "1.2rem" }} />
          <span>Add Coupon</span>
        </Button>
        <Dialog
          title="Coupon"
          formFields={addCouponFormFields}
          apiEndPoint="/"
        />
      </div>
      <Table
        rows={couponMockData}
        columns={columns}
        gridKey="coupons"
        onEdit={(id) => openDialog("coupon", id)}
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

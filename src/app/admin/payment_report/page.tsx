"use client";
import Table from "@/components/admin/Table";
import Button from "@/ui/Button";
import SearchBar from "@/ui/SearchBar";
import { GridColDef } from "@mui/x-data-grid";
import Dialog from "@/ui/Dialog";
import { addDesignationFormFields } from "@/config/admin";
import { payment_report } from "@/mockData";
import { ExitToAppOutlined } from "@mui/icons-material";
import { exportToCSV } from "@/utils/exportToCSV";
import Chip from "@/ui/Chip";
import { GridFilters } from "@/components/admin/GridFilters";

const Page = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "SL.No", flex: 1 },
    {
      field: "paymentId",
      headerName: "Payment Id",
      flex: 2,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 2,
    },
    {
      field: "user",
      headerName: "User",
      flex: 2,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 2,
      renderCell: (params) => <Chip value={params.value} />,
    },
    {
      field: "paidAt",
      headerName: "Paid At",
      flex: 2,
    },
  ];

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Payment Report</h1>
      <div className="flex justify-between mb-8">
        <div className="flex gap-2">
          <SearchBar gridKey="payment_report" />
          <GridFilters
            gridKey="payment_report"
            filters={[
              {
                type: "select",
                field: "status",
                placeholder: "Status",
                options: ["Pending", "Success", "Failed"],
              },
              {
                type: "dateRange",
                field: "paidAt",
                label: "Paid At",
              },
            ]}
          />
        </div>
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
          onClick={() => exportToCSV(payment_report, "payment_report.csv")}
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
      <Table rows={payment_report} columns={columns} gridKey="payment_report" />
    </main>
  );
};

export default Page;

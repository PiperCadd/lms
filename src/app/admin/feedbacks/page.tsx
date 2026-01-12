"use client";
import Table from "@/components/admin/Table";
import Button from "@/ui/Button";
import SearchBar from "@/ui/SearchBar";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@/ui/Dialog";
import { useUIStore } from "@/store/admin/useUIStore";
import { addFeedbackFormFields } from "@/config/admin";
import CrudActions from "@/ui/Actions";
import { feedbackMockData } from "@/mockData";
import StarRating from "@/ui/StarRating";

const Page = () => {
  const { openDialog } = useUIStore();

  const columns: GridColDef[] = [
    { field: "id", headerName: "SL.No", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 2.5,
    },
    {
      field: "feedbackContent",
      headerName: "Feedback Content",
      flex: 3,
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 1.5,
      cellClassName: "rating-cell",
      renderCell: (params) => <StarRating value={params.value} />,
    },
  ];

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Feedback</h1>
      <div className="flex justify-between mb-8">
        <SearchBar gridKey="announcements" />
        <Button
          sx={{
            width: "fit-content",
            fontSize: "0.8rem",
            display: "flex",
            gap: "4px",
          }}
          onClick={() => openDialog("feedback")}
          sizeVariant="small"
        >
          <AddIcon sx={{ fontSize: "1.2rem" }} />
          <span>Add Feedback</span>
        </Button>
        <Dialog
          title="Feedback"
          formFields={addFeedbackFormFields}
          apiEndPoint="/"
        />
      </div>
      <Table
        rows={feedbackMockData}
        columns={columns}
        gridKey="feedback"
        onEdit={(id) => openDialog("feedback", id)}
        renderActions={(params, handlers) => [
          <CrudActions
            key="crud"
            edit
            delete
            isActive={params.row.isActive}
            onEdit={handlers.edit}
            onDelete={handlers.delete}
          />,
        ]}
      />
    </main>
  );
};

export default Page;

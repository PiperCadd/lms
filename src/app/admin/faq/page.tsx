"use client";
import Table from "@/components/admin/Table";
import Button from "@/ui/Button";
import SearchBar from "@/ui/SearchBar";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@/ui/Dialog";
import { useUIStore } from "@/store/admin/useUIStore";
import { addFaqFormFields } from "@/config/admin";
import CrudActions from "@/ui/Actions";
import { faqMockData } from "@/mockData";


const Page = () => {
  const { openDialog } = useUIStore();

  const columns: GridColDef[] = [
    { field: "id", headerName: "SL.No", flex: 1 },
    {
      field: "question",
      headerName: "Question",
      flex: 2.5,
    },
    {
      field: "answer",
      headerName: "Answer",
      flex: 3,
    },
  ];

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">FAQ</h1>
      <div className="flex justify-between mb-8">
        <SearchBar gridKey="faqs" />
        <Button
          sx={{
            width: "fit-content",
            fontSize: "0.8rem",
            display: "flex",
            gap: "4px",
          }}
          onClick={() => openDialog("faq")}
          sizeVariant="small"
        >
          <AddIcon sx={{ fontSize: "1.2rem" }} />
          <span>Add FAQ</span>
        </Button>
        <Dialog
          title="FAQ"
          formFields={addFaqFormFields}
          apiEndPoint="/"
        />
      </div>
      <Table
        rows={faqMockData}
        columns={columns}
        gridKey="faqs"
        onEdit={(id) => openDialog("faq", id)}
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
        ]}
      />
    </main>
  );
};

export default Page;

"use client";
import { GridColDef } from "@mui/x-data-grid";
import { useUIStore } from "@/store/admin/useUIStore";
import { addTeamMembers } from "@/config/admin";
import CustomForm from "@/components/common/CustomForm";

const Page = () => {
  const { setIsDialogOpen } = useUIStore();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: true,
    },
    {
      field: "email",
      headerName: "E-Mail",
      width: 300,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      editable: true,
    },

    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
  ];

  //   const row = apiRef.current.getRow(id);
  //   if (row?.isNew) {
  //     setRows((prev) => prev.filter((r) => r.id !== id));
  //   }
  // };

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Add Team Members</h1>
      <div className="flex justify-between mb-8 [background-image:var(--admin-bgimg)] bg-[var(--admin-card-bg)]  text-white rounded-xl p-10">
        <CustomForm fields={addTeamMembers} apiEndpoint="/" buttonName="Save" />
      </div>
    </main>
  );
};

export default Page;

"use client";
import Table from "@/components/admin/Table";
import Button from "@/ui/Button";
import SearchBar from "@/ui/SearchBar";
import {
  GridColDef,
  GridRowsProp,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@/ui/Dialog";
import { useUIStore } from "@/store/admin/useUIStore";
import { addDesignationFormFields, addTeamMembers } from "@/config/admin";
import { mockTeamMembers } from "@/mockData";
import CrudActions from "@/ui/CurdActions";
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

      // {
      //   field: "actions",
      //   type: "actions",
      //   headerName: "Actions",
      //   width: 260,
      //   getActions: ({ id }) => {
      //     const isEditing = rowModesModel[id]?.mode === GridRowModes.Edit;

      //     if (isEditing) {
      //       return [
      //         <GridActionsCellItem
      //           key="save"
      //           icon={<SaveIcon />}
      //           label="Save"
      //           onClick={handleSaveClick(id)}
      //         />,
      //         <GridActionsCellItem
      //           key="cancel"
      //           icon={<CancelIcon />}
      //           label="Cancel"
      //           onClick={handleCancelClick(id)}
      //         />,
      //       ];
      //     }

      //     return [
      //       <CrudActions
      //         key="delete"
      //         edit
      //         delete
      //         onEdit={handleEditClick(id)}
      //         onDelete={handleDeleteClick(id)}
      //       />,
      //     ];
      //   },
      // },
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
        <CustomForm fields={addTeamMembers} apiEndpoint="/" />
      </div>
    </main>
  );
};

export default Page;

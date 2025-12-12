"use client";
import Table from "@/components/admin/Table";
import SearchBar from "@/ui/SearchBar";
import {
  GridColDef,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@/ui/Dialog";
import { addDesignationFormFields } from "@/config/admin";
import { mockTeamMembers } from "@/mockData";
import CrudActions from "@/ui/CurdActions";
import Link from "next/link";


const Page = () => {
    const columns: GridColDef[] = [
      { field: "id", headerName: "SL.No", width: 100 },
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

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Team Members</h1>
      <div className="flex justify-between mb-8">
        <SearchBar />
        <Link
          // sx={{
          //   width: "fit-content",
          //   fontSize: "0.8rem",
          //   display: "flex",
          //   gap: "4px",
          // }}
          // onClick={() => setIsDialogOpen(true)}
          // size="small"
          href={'/admin/team-members/add-team-member'}
        >
          <AddIcon sx={{ fontSize: "1.2rem" }} />
          <span>Add Team Members</span>
        </Link>
        <Dialog
          title="Add Category"
          supportText="Enter the new designation to proceed"
          formFields={addDesignationFormFields}
          apiEndPoint="/"
        />
      </div>
      <Table
        rows={mockTeamMembers}
        columns={columns}
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

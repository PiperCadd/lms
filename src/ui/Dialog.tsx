import * as React from "react";
import { IconButton, Dialog as MuiDialog } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { useUIStore } from "@/store/admin/useUIStore";
import CustomForm, { FieldDefinition } from "@/components/common/CustomForm";

interface DialogProps {
  title: string;
  formFields: FieldDefinition[];
  apiEndPoint: string;
  initialValues?: Record<string, any>; // EDIT SUPPORT
}

export default function Dialog({
  title,
  formFields,
  apiEndPoint,
  initialValues,
}: DialogProps) {
  const { isDialogOpen, closeDialog, editingId, mode } = useUIStore();

  const dialogTitleMap = {
    add: `Add ${title}`,
    edit: `Edit ${title}`,
    view: `View ${title}`,
  };

  return (
    <MuiDialog
      open={isDialogOpen}
      onClose={() => closeDialog()}
      sx={{
        "& .MuiPaper-root": {
          backgroundImage: "var(--admin-bgimg)",
          backgroundColor: "var(--admin-card-bg)",
          color: "var(--admin-text-white)",
          width: "30rem",
          borderRadius: "var(--border-radius-lg)",
        },
      }}
    >
      <DialogTitle
        sx={{
          mb: 2.5,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundImage: "var(--admin-bgimg-blue)",
        }}
      >
        {dialogTitleMap[mode]}

        <IconButton
          onClick={() => closeDialog()}
          sx={{
            color: "var(--admin-text-white)",
            padding: "4px",
            "&:hover": { opacity: 0.7 },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <CustomForm
          fields={formFields}
          apiEndpoint={apiEndPoint}
          initialValues={initialValues}
          readOnly={mode === "view"}
        />
      </DialogContent>

      {/* <DialogActions sx={{gap:"5px"}}>
        <Button sx={{width:"auto"}} size="medium" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
        <Button sx={{width:"auto"}} size="medium" type="submit" form="subscription-form">Submit</Button>
      </DialogActions> */}
    </MuiDialog>
  );
}

import * as React from "react";
import { IconButton, Dialog as MuiDialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { useUIStore } from "@/store/admin/useUIStore";
import CustomForm, { FieldDefinition } from "@/components/common/CustomForm";

interface DialogProps {
  title: string;
  supportText: string;
  formFields: FieldDefinition[];
  apiEndPoint: string;
}

export default function Dialog({ title, supportText, formFields, apiEndPoint }: DialogProps) {
  const { isDialogOpen, setIsDialogOpen } = useUIStore();

  return (
    <MuiDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} sx={{
    "& .MuiPaper-root": {
      backgroundImage: "var(--admin-bgimg)",
          backgroundColor: "var(--admin-card-bg)",
          color: "var(--admin-text-white)",
          width: "30rem",
          borderRadius: "var(--border-radius-lg)",
    },
  }} >
<DialogTitle
  sx={{
    m: 0,
    p: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  {title}

  <IconButton
    onClick={() => setIsDialogOpen(false)}
    sx={{
      color: "var(--admin-text-white)",
      padding: "4px",
      "&:hover": { opacity: 0.7 }
    }}
  >
    <CloseIcon />
  </IconButton>
</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{color:"var(--admin-gray)", marginBottom:"20px" }}>{supportText}</DialogContentText>
        <CustomForm fields={formFields} apiEndpoint={apiEndPoint} />
      </DialogContent>

      {/* <DialogActions sx={{gap:"5px"}}>
        <Button sx={{width:"auto"}} size="medium" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
        <Button sx={{width:"auto"}} size="medium" type="submit" form="subscription-form">Submit</Button>
      </DialogActions> */}
    </MuiDialog>
  );
}

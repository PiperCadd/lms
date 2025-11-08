'use client'

import {
  Alert,
  AlertProps,
  Snackbar as MuiSnackbar, SnackbarCloseReason, SnackbarProps
} from "@mui/material";
import { useAppStore } from '@/store/admin/useAppStore'

const Snackbar = ({ sx, ...props }: AlertProps) => {
  const { tost, setTost} = useAppStore();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setTost(false);
  };
  return (
    <MuiSnackbar open={tost} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        This is a success Alert inside a Snackbar!
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;

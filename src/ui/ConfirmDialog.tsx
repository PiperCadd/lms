"use client";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import { CheckCircleOutline, ErrorOutline, Close } from "@mui/icons-material";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  description = "Please confirm your action.",
  confirmText = "Yes",
  cancelText = "Cancel",
  isDestructive = false,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onCancel}
      maxWidth="xs"
      fullWidth
    >
      {/* Close Icon */}
      {!loading && (
        <IconButton
          aria-label="close"
          onClick={onCancel}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <Close />
        </IconButton>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        {isDestructive ? (
          <ErrorOutline
            sx={{ fontSize: "50px", color: "var(--admin-orange)" }}
          />
        ) : (
          <CheckCircleOutline
            sx={{ fontSize: "50px", color: "var(--admin-green)" }}
          />
        )}

        <DialogTitle sx={{ m: 0, pt: 1, pb: 0 }}>{title}</DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>

        <DialogActions sx={{ pt: 2.5 }}>
          <Button
            onClick={onCancel}
            color="inherit"
            disabled={loading}
            sx={{ textTransform: "none" }}
          >
            {cancelText}
          </Button>

          <Button
            onClick={onConfirm}
            variant="contained"
            color={isDestructive ? "error" : "primary"}
            autoFocus
            disabled={loading}
            sx={{ minWidth: 90, textTransform: "none" }}
          >
            {loading ? <CircularProgress size={20} /> : confirmText}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

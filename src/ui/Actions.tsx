import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

interface CrudActionsProps {
  edit?: boolean;
  delete?: boolean;
  toggle?: boolean;

  onEdit?: () => void;
  onDelete?: () => void;
  onToggle?: () => void;

  isActive?: boolean;
  size?: "small" | "medium";
}

const CrudActions = ({
  edit = false,
  delete: del = false,
  toggle = false,

  onEdit,
  onDelete,
  onToggle,

  isActive = false,
  size = "small",
}: CrudActionsProps) => {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {edit && (
        <Tooltip title="Edit">
          <IconButton
            size={size}
            onClick={onEdit}
            sx={{
              backgroundColor: "#0D6EFD",          // Primary Blue
              color: "#fff",
              padding: "0.45rem",
              borderRadius: "var(--border-radius-md)",
              transition: "0.2s",
              "&:hover": {
                backgroundColor: "#0B5ED7",        // Darker Blue (consistent hover style)
              },
            }}
          >
            <EditIcon fontSize={size} />
          </IconButton>
        </Tooltip>
      )}

      {del && (
        <Tooltip title="Delete">
          <IconButton
            size={size}
            onClick={onDelete}
            sx={{
              backgroundColor: "#DC3545",          // Bootstrap Danger
              color: "#fff",
              padding: "0.45rem",
              borderRadius: "var(--border-radius-md)",
              transition: "0.2s",
              "&:hover": {
                backgroundColor: "#BB2D3B",        // Darker Red
              },
            }}
          >
            <DeleteIcon fontSize={size} />
          </IconButton>
        </Tooltip>
      )}

      {toggle && (
        <Tooltip title={isActive ? "Deactivate" : "Activate"}>
          <IconButton
            size={size}
            onClick={onToggle}
            sx={{
              backgroundColor: isActive ? "#28A745" : "#6C757D", // Success or Secondary
              color: "#fff",
              padding: "0.45rem",
              borderRadius: "var(--border-radius-md)",
              transition: "0.2s",
              "&:hover": {
                backgroundColor: isActive ? "#218838" : "#5A6268", // Darker for both
              },
            }}
          >
            {isActive ? (
              <ToggleOnIcon fontSize={size} />
            ) : (
              <ToggleOffIcon fontSize={size} />
            )}
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};


export default CrudActions;

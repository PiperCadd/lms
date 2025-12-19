import React from "react";
import { Chip as MuiChip } from "@mui/material";

interface StatusCellProps {
  value: string;
}

const Chip: React.FC<StatusCellProps> = ({ value }) => {
  const status = value;

  // chip color logic
  const getColor = () => {
    switch (status) {
      case "Paid":
      case "Completed":
        return "var(--admin-green)";
      case "Pending":
        return "goldenrod";
      case "Failed":
        return "red";
      case "Refunded":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <MuiChip
      label={status}
      sx={{
        backgroundColor: getColor(),
        color: "#fff",
        fontWeight: 600,
        textTransform: "capitalize",
        height: "auto",
        "& .MuiChip-label": {
          paddingY: "4px",
          paddingX: "14px",
          lineHeight: "1.2",
        },
      }}
    />
  );
};

export default React.memo(Chip);

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import Chip from "./Chip";

interface ProgressCellProps {
  value: number;
}

const ProgressCell: React.FC<ProgressCellProps> = ({ value }) => {
  const progress = Number(value);

  // bar color logic
  const getBarColor = () => {
    if (progress < 40) return "red";
    if (progress < 75) return "orange";
    return "green";
  };

  if (progress >= 100) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Chip value="Completed" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",                 // allow centering vertically inside row
        display: "flex",
        justifyContent: "center",
        alignItems: "center",           // vertical + horizontal center
      }}
    >
      <Box sx={{ width: "70%", position: "relative" }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 18,
            borderRadius: 3,
            backgroundColor: "var(--white-10)",
            [`& .${linearProgressClasses.bar}`]: {
              backgroundColor: getBarColor(), // change bar color
            },
          }}
        />

        <Typography
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: 700,
            color: "#fff",
            pointerEvents: "none",
            fontSize: "0.75rem",
          }}
        >
          {progress}%
        </Typography>
      </Box>
    </Box>
  );
};

export default React.memo(ProgressCell);

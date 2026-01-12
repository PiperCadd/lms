import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box, Typography } from "@mui/material";

const StarRating = ({ value }: { value: number }) => {
  const rating = Math.max(0, Math.min(5, value)); // clamp 0–5

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", gap: "2px" }}>
        {[1, 2, 3, 4, 5].map((star) =>
          star <= rating ? (
            <StarIcon
              key={star}
              sx={{ color: "#FFD700", fontSize: "1.1rem" }}
            />
          ) : (
            <StarBorderIcon
              key={star}
              sx={{ color: "#FFD700", fontSize: "1.1rem" }}
            />
          )
        )}
      </Box>

      <Typography
        variant="caption"
        sx={{ color: "#9CA3AF", fontWeight: 500 }}
      >
        ({rating}/5)
      </Typography>
    </Box>
  );
};

export default StarRating;
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "300px",
        background: "var(--admin-body-bg)",
        padding: "8px 14px",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(8px)",
        transition: "all 300ms ease",
        "&:focus-within": {
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 0 0 4px rgba(255,255,255,0.05)",
        },
      }}
    >
      <SearchIcon sx={{ color: "var(--admin-gray)" }} />

      <InputBase
        placeholder="Search..."
        sx={{
          ml: 1,
          flex: 1,
          color: "#fff",
          "& input::placeholder": { color: "var(--admin-gray)" },
        }}
      />
    </Box>
  );
}

import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useGridStore } from "@/store/admin/useGridStore";

interface SearchBarProps {
  gridKey: string;
}

export default function SearchBar({ gridKey }: SearchBarProps) {
  const store = useGridStore(gridKey);
  const search = store((s) => s.search);
  const setSearch = store((s) => s.setSearch);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "300px",
        background: "var(--admin-body-bg)",
        padding: "2px 16px",
        borderRadius: "6px",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(8px)",
        transition: "all 300ms ease",
        "&:focus-within": {
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 0 0 4px rgba(255,255,255,0.05)",
        },
      }}
    >
      <SearchIcon sx={{ fontSize:"20px", color: "var(--admin-gray)" }} />

      <InputBase
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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

import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";

type DropdownProps = {
  options: string[];
  label?: string;
  sx?: object;
};

export default function Dropdown({
  options,
  label = "Select",
  sx,
}: DropdownProps) {
  return (
    <Autocomplete
      disablePortal
      disableClearable
      freeSolo={false}
      options={options}
      sx={{
        width: 150,

        // Border styling
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "rgba(255,255,255,0.15)",
          },
          "&:hover fieldset": {
            borderColor: "blue",
          },
          "&.Mui-focused fieldset": {
            borderColor: "green",
          },
        },

        // Dropdown arrow
        "& .MuiAutocomplete-popupIndicator": {
          color: "gray",
        },

        // Input text styling
        "& .MuiAutocomplete-input": {
          color: "#fff",
          cursor: "pointer",
        },

        ...sx,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={label}
          size="small"
          InputProps={{
            ...params.InputProps,
            readOnly: true,  // This is enough — prevents typing but allows interaction
          }}
          sx={{
            "& .MuiInputBase-input::placeholder": {
              color: "gray",
            },
          }}
        />
      )}
    />
  );
}

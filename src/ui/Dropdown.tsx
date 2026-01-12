import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useDropdownDataStore } from "@/store/common/useDropdownDataStore";

type DropdownProps = {
  options: string[];
  optionsKey?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value?: string) => void;
  sx?: object;
};

export default function Dropdown({
  options,
  optionsKey,
  label,
  placeholder = "Select",
  value,
  onChange,
  sx,
}: DropdownProps) {
  const { data, fetchKeys } = useDropdownDataStore();

  useEffect(() => {
    if (optionsKey) {
      fetchKeys([optionsKey]);
    }
  }, [optionsKey, fetchKeys]);

  const resolvedOptions = useMemo(() => {
    if (optionsKey) return data[optionsKey] ?? [];
    return options ?? [];
  }, [optionsKey, options, data]);

  return (
    <div>
      {label && (
        <label className="text-sm text-[#e6ecf0] mb-2 block">{label}</label>
      )}
      <Autocomplete
        id={label}
        disablePortal
        freeSolo={false}
        options={resolvedOptions}
        value={value ?? null} // controlled value
        isOptionEqualToValue={(option, v) => option === v} // how to compare values
        onChange={(_, newValue) => {
          onChange?.(newValue ?? undefined);
        }}
        sx={{
          minWidth: "150px",

          "& .MuiOutlinedInput-root": {
            marginTop: 0,
            borderRadius: "var(--border-radius-md)",
            backgroundColor: "var(--admin-body-bg)",
            "& fieldset": {
              borderWidth: "1.5px",
              borderColor: "var(--border-color)",
            },
            "&:hover fieldset": {
              borderColor: "var(--border-focus-color)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--border-focus-color)",
            },
            "& input::-webkit-calendar-picker-indicator": {
              filter: "invert(1) brightness(0.5)", // white color
              cursor: "pointer",
            },
            ".MuiSelect-icon": {
              color: "var(--white-40)",
            },
          },

          "& .MuiAutocomplete-clearIndicator": {
            color: "var(--admin-gray)",
            "&:hover": {
              color: "var(--border-focus-color)",
            },
          },

          "& .MuiAutocomplete-popupIndicator": {
            color: "gray",
          },

          "& .MuiAutocomplete-input": {
            color: "#fff",
            cursor: "pointer",
          },

          ...sx,
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            size="small"
            InputProps={{
              ...params.InputProps,
              readOnly: true, // prevents typing but allows opening
            }}
            sx={{
              background: "var(--admin-body-bg)",
              borderRadius: "var(--border-radius-md)",
              "& .MuiInputBase-input::placeholder": {
                color: "gray",
              },
            }}
          />
        )}
      />
    </div>
  );
}

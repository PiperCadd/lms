import { Box, TextField } from "@mui/material";

type DateRangePickerProps = {
  label: string;
  value?: [Date | undefined, Date | undefined];
  onChange?: (value?: [Date | undefined, Date | undefined]) => void;
};

export default function DateRangePicker({
  label,
  value,
  onChange,
}: DateRangePickerProps) {
  const [start, end] = value ?? [undefined, undefined];

  return (
    <Box display="flex" gap={1}>
      <TextField
        size="small"
        type="date"
        label={`${label} From`}
        value={start ? start.toISOString().slice(0, 10) : ""}
        onChange={(e) =>
          onChange?.([
            e.target.value ? new Date(e.target.value) : undefined,
            end,
          ])
        }
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            sx: { color: "#fff" }, // input text color
          },
        }}
        sx={{
          width: "100%",
          borderColor: "var(--border-color)",
          borderWidth: "2px",
          "& .MuiInputLabel-root": {
            color: "var(--admin-gray)",
          },
          "& .MuiFormHelperText-root": {
            color: "var(--border-color)", // helper text color
            marginLeft: 0,
          },
          "&:hover .MuiInputLabel-root": {
            color: "var(--border-focus-color)", // label when hovered
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "var(--border-focus-color) !important", // label when focused
          },
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
        }}
      />
      <TextField
        size="small"
        type="date"
        label={`${label} To`}
        value={end ? end.toISOString().slice(0, 10) : ""}
        onChange={(e) =>
          onChange?.([
            start,
            e.target.value ? new Date(e.target.value) : undefined,
          ])
        }
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            sx: { color: "#fff" }, // input text color
          },
        }}
        sx={{
          width: "100%",
          borderColor: "var(--border-color)",
          borderWidth: "2px",
          "& .MuiInputLabel-root": {
            color: "var(--admin-gray)",
          },
          "& .MuiFormHelperText-root": {
            color: "var(--border-color)", // helper text color
            marginLeft: 0,
          },
          "&:hover .MuiInputLabel-root": {
            color: "var(--border-focus-color)", // label when hovered
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "var(--border-focus-color) !important", // label when focused
          },
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
        }}
      />
    </Box>
  );
}

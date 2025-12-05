import React from "react";
import {
  TextField as MuiTextField,
  TextFieldProps,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Upload } from "@mui/icons-material";


interface FileFieldProps extends Omit<TextFieldProps, "type"> {
  onFileSelect?: (file: File | null) => void;
}

const FileField = ({ sx, onFileSelect, ...props }: FileFieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (onFileSelect) onFileSelect(file);
  };

  return (
    <MuiTextField
      {...props}
      type="file"
      variant="outlined"
      size="small"
      onChange={handleChange}
      InputLabelProps={{ shrink: true }}
      sx={{
        width: "100%",
        marginBottom: "16px",
        "& .MuiInputLabel-root": {
          position: "static",
          transform: "none",
          fontSize: "0.875rem",
          color: "#e6ecf0",
          marginBottom: "4px",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderWidth: "1.5px",
            borderColor: "rgba(255, 255, 255, 0.15)",
          },
          "&:hover fieldset": {
            borderColor: "blue",
          },
          "&.Mui-focused fieldset": {
            borderColor: "green",
          },
        },
        ...sx,
      }}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton component="span">
                <Upload />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default FileField;

import React, { useEffect } from "react";
import {
  TextField as MuiTextField,
  TextFieldProps,
  Box,
  Typography,
} from "@mui/material";
import { Upload } from "@mui/icons-material";

interface FileFieldProps extends Omit<TextFieldProps, "type"> {
  onFileSelect?: (file: File | null) => void;
  previewHeight?: number;
  existingPreviewUrl?: string;
  accept?: string;
}

const FileField = ({
  sx,
  onChange,
  onFileSelect,
  inputRef,
  previewHeight = 120,
  existingPreviewUrl,
  accept,
  ...props
}: FileFieldProps) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    if (!input.files) return;

    const selectedFile = input.files[0] ?? null;

    setFile(selectedFile);

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }

    onFileSelect?.(selectedFile);
    onChange?.(event);
  };

  // Cleanup object URL
  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
  if (existingPreviewUrl) {
    setPreviewUrl(existingPreviewUrl);
  }
}, [existingPreviewUrl]);


  return (
    <div>
      <MuiTextField
        {...props}
        type="file"
        variant="outlined"
        size="small"
        inputRef={inputRef}
        onChange={handleChange}
        sx={{
          width: "100%",
          borderColor: "var(--border-color)",
          /* label above input */
          "& .MuiInputLabel-root": {
            position: "static",
            transform: "none",
            fontSize: "0.875rem",
            lineHeight: "calc(1.25 / 0.875)",
            color: "#e6ecf0",
            mb: "4px",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#fff",
          },
          /* input box */
          "& .MuiOutlinedInput-root": {
            mt: 0,
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
          },

          "& input::file-selector-button": {
            height: "100%",
            backgroundColor: "var(--white-10)",
            color: "var(--admin-text-white)",
            borderRight: "1px solid var(--border-color)",
            paddingX: "8px",
            marginRight: "8px",
            cursor: "pointer",
          },
          "& input::file-selector-button:hover": {
            backgroundColor: "#c5c9cd",
          },

          ...sx,
        }}
        slotProps={{
          inputLabel: { shrink: false },
          input: {
            sx: { color: "#fff" },
          },
          htmlInput: {
            accept,
          },
        }}
      />

      {/* Preview Section */}
      {(file || existingPreviewUrl) && (
        <Box
          sx={{
            mt: 1,
            p: 0.5,
            width: "fit-content",
            borderRadius: 1,
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {previewUrl || existingPreviewUrl ? (
            <Box
              component="img"
              src={previewUrl || existingPreviewUrl}
              alt="Preview"
              sx={{
                height: previewHeight,
                maxWidth: "100%",
                borderRadius: 1,
                objectFit: "contain",
              }}
            />
          ) : (
            <Typography
              variant="body2"
              sx={{ color: "#e6ecf0", wordBreak: "break-all" }}
            >
              {file?.name}
            </Typography>
          )}
        </Box>
      )}
    </div>
  );
};

export default FileField;

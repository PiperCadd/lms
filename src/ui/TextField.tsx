import React, { useState } from "react";
import {
  TextField as MuiTextField,
  TextFieldProps,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Eye, EyeClosed } from "lucide-react";

const TextField = ({
  sx,
  type = "text",
  multiline = false,
  rows,
  ...props
}: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  // Only toggle password visibility if it's a password type
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <>
      <MuiTextField
        {...props}
        type={!multiline ? inputType : undefined}
        multiline={multiline}
        rows={multiline ? rows ?? 3 : undefined}
        variant="outlined"
        size="small"
        sx={{
          width: "100%",
          marginBottom: "16px",
          borderColor: "rgba(255, 255, 255, 0.15)",
          borderWidth: "2px",
          "& .MuiInputLabel-root": {
            position: "static",
            transform: "none",
            fontWeight: 500,
            color: "#e6ecf0",
            marginBottom: "4px",
          },
          "& .MuiOutlinedInput-root": {
            marginTop: 0,
            "& fieldset": {
              borderWidth: "1.5px",
              borderColor: "rgba(255, 255, 255, 0.15)", // default border
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
          // Add eye icon only for password fields
          inputLabel: { shrink: false },
          input: {
            endAdornment: isPassword ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </IconButton>
              </InputAdornment>
            ) : undefined,
          },
        }}
      />
    </>
  );
};

export default TextField;
// #d3d7dc - input bg
// rgba(255, 255, 255, 0.15) - border
// #e6ecf0 - heading
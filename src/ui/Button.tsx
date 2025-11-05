import { Button as MuiButton, ButtonProps } from "@mui/material";

const Button = ({ sx, ...props }: ButtonProps) => {
  return (
    <MuiButton
      {...props}
      sx={{
        width: "100%",
        background: "linear-gradient(310deg, #7928ca, #ff0080)",
        color: "#fff",
        fontWeight: 600,
        "&:hover": {
          background: "linear-gradient(310deg, #ff0080, #7928ca)",
        },
        ...sx,
      }}
    />
  );
};

export default Button;

import { Button as MuiButton, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  variantColor?: "gradient" | "blue" | "pink";
}

const Button = ({
  sx,
  variantColor = "gradient",
  ...props
}: CustomButtonProps) => {
  const variants = {
    gradient: {
      background: "linear-gradient(310deg, #7928ca, #ff0080)",
      "&:hover": {
        background: "linear-gradient(310deg, #ff0080, #7928ca)",
      },
    },
    blue: {
      background: "#1976d2",
      "&:hover": {
        background: "#115293",
      },
    },
    pink: {
      background: "#e91e63",
      "&:hover": {
        background: "#c2185b",
      },
    },
  };

  return (
    <MuiButton
      {...props}
      sx={{
        width: "100%",
        color: "#fff",
        fontWeight: 600,
        transition: "all 500ms ease-in",
        ...variants[variantColor],
        ...sx,
      }}
    />
  );
};

export default Button;

import { Button as MuiButton, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  variantColor?: "gradient" | "blue" | "pink";
  sizeVariant?: "small" | "medium" | "large" | "custom";
  padding?: string | number;
}

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

const Button = ({
  sx,
  variantColor = "gradient",
  sizeVariant = "medium",
  padding,
  ...props
}: CustomButtonProps) => {
  const sizes = {
    small: {
      px: 2,
      py: 0.5,
      fontSize: "0.5rem",
    },
    medium: {
      px: 3.8,
      py: 1,
      fontSize: "0.875rem",
    },
    large: {
      px: 4,
      py: 1.5,
      fontSize: "1rem",
    },
    custom: {
      padding,
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
        ...sizes[sizeVariant],
        ...sx,
      }}
    />
  );
};

export default Button;

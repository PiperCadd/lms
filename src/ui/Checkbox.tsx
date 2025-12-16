import { Checkbox as MuiCheckBox, CheckboxProps } from "@mui/material";

const Checkbox = ({ sx, ...props }: CheckboxProps) => {
  return (
    <MuiCheckBox
      {...props}
      sx={{
        color: "var(--admin-gray)",
      }}
    />
  );
};

export default Checkbox;

import { Box, TextField } from "@mui/material";

type NumberRangeInputProps = {
  label: string;
  value?: [number, number];
  onChange?: (value?: [number, number]) => void;
};

export default function NumberRangeInput({
  label,
  value,
  onChange,
}: NumberRangeInputProps) {
  const [min, max] = value ?? ["", ""];

  return (
    <Box display="flex" gap={1}>
      <TextField
        size="small"
        placeholder={`${label} Min`}
        type="number"
        value={min}
        onChange={(e) =>
          onChange?.([
            e.target.value === "" ? undefined : Number(e.target.value),
            value?.[1],
          ] as [number, number])
        }
      />
      <TextField
        size="small"
        placeholder={`${label} Max`}
        type="number"
        value={max}
        onChange={(e) =>
          onChange?.([
            value?.[0],
            e.target.value === "" ? undefined : Number(e.target.value),
          ] as [number, number])
        }
      />
    </Box>
  );
}

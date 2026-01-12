import Radio from "@mui/material/Radio";
import {FormHelperText, RadioGroup as MuiRadioGroup} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string; disabled?: boolean }[];
  error?: string;
};

export default function RadioGroup({
  label,
  value,
  onChange,
  options,
  error,
}: Props) {
  return (
    <FormControl error={!!error}>
      <FormLabel>{label}</FormLabel>

      <MuiRadioGroup
        row
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options?.map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={<Radio />}
            label={opt.label}
            disabled={opt.disabled}
          />
        ))}
      </MuiRadioGroup>

            {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

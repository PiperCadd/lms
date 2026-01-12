import {
  Checkbox as MuiCheckbox,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  FormControl,
} from "@mui/material";

type CheckboxOption = string | { label: string; value: boolean };

type Props = {
  label: string;
  value: string[];
  onChange: (val: any) => void;
  options?: CheckboxOption[];
  error?: string;
  row?: boolean;
};

export default function Checkbox({
  label,
  value,
  onChange,
  options,
  error,
  row,
}: Props) {
  return (
    <FormControl component="fieldset" error={!!error}>
      <FormGroup row={!!row}>
        {options?.length ? (
          options.map((opt) => {
            const val = typeof opt === "object" ? opt.value : opt;
            const lab = typeof opt === "object" ? opt.label : opt;

            return (
              <FormControlLabel
                key={val}
                control={
                  <MuiCheckbox
                    sx={{
                      "& .MuiSvgIcon-root": {
                        color: "var(--border-color)",
                        backgroundColor: "var(--admin-body-bg)",
                      },
                      "&.Mui-checked .MuiSvgIcon-root": {
                        color: "#1976d2",
                      },
                    }}
                    checked={
                      Array.isArray(value) ? value.includes(val) : !!value
                    }
                    onChange={(e) => {
                      if (Array.isArray(value)) {
                        if (e.target.checked) onChange([...value, val]);
                        else onChange(value.filter((v) => v !== val));
                      } else onChange(e.target.checked);
                    }}
                  />
                }
                label={lab}
              />
            );
          })
        ) : (
          <FormControlLabel
            control={
              <MuiCheckbox
                sx={{
                  "& .MuiSvgIcon-root": {
                    color: "var(--border-color)",
                    backgroundColor: "var(--admin-body-bg)",
                  },
                  "&.Mui-checked .MuiSvgIcon-root": {
                    color: "#1976d2",
                  },
                }}
                checked={!!value}
                onChange={(e) => onChange(e.target.checked)}
              />
            }
            label={label}
          />
        )}
      </FormGroup>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

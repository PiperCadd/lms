import { Box } from "@mui/material";
import Dropdown from "@/ui/Dropdown";
import { useGridStore } from "@/store/admin/useGridStore";
import DateRangePicker from "@/ui/DateRangePicker";
import NumberRangeInput from "@/ui/NumberRangeInput";
import useFormOptions from "@/hooks/admin/useFormOptions";

export type GridFilterValue =
  | string
  | number
  | boolean
  | [number, number]
  | [Date | undefined, Date | undefined]
  | undefined;

export type GridFiltersState = Record<string, GridFilterValue>;

export type FilterConfig<T> =
  | {
      type: "select";
      field: keyof T;
      placeholder: string;
      optionsKey?: string;
      selectOptions?: string | string[];
    }
  | {
      type: "dateRange";
      field: keyof T;
      label: string;
    }
  | {
      type: "numberRange";
      field: keyof T;
      label: string;
    }
  | {
      type: "boolean";
      field: keyof T;
      label: string;
    };

export function GridFilters<T>({
  gridKey,
  filters,
}: {
  gridKey: string;
  filters: FilterConfig<T>[];
}) {
  const store = useGridStore(gridKey);

  /** READ + WRITE from store */
  const { filters: values, setFilter } = store();

  return (
    <Box display="flex" gap={2}>
      {filters.map((filter) => {
        const key = String(filter.field);

        switch (filter.type) {
          case "select":
            return (
              <Dropdown
                key={key}
                placeholder={filter.placeholder}
                optionsKey={filter.optionsKey}
                options={filter.selectOptions as string[]}
                value={values[key] as string | undefined} // CONTROLLED
                onChange={(v) => setFilter(key, v)}
              />
            );

          case "dateRange":
            return (
              <DateRangePicker
                key={key}
                label={filter.label}
                value={values[key] as [Date | undefined, Date | undefined]}
                onChange={(range) => setFilter(key, range)}
              />
            );

          case "numberRange":
            return (
              <NumberRangeInput
                key={key}
                label={filter.label}
                value={values[key] as [number, number] | undefined}
                onChange={(range) => setFilter(key, range)}
              />
            );

          default:
            return null;
        }
      })}
    </Box>
  );
}

"use client";

import { useEffect, useCallback, useRef } from "react";
import { useFieldArray, Control, FieldErrors } from "react-hook-form";
import { FieldDefinition, FormField } from "./CustomForm";
import Button from "@/ui/Button";
import { IconButton, Tooltip } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

type InnerDynamicFieldsProps<T = any> = {
  control: Control<any>;
  name: string;
  label: string;
  itemFields: FieldDefinition[];
  register: any;
  errors?: FieldErrors<T>;
  initialValues?: any;
  readOnly?: boolean;
};

export default function InnerDynamicFields({
  control,
  name,
  label,
  itemFields,
  register,
  errors,
  initialValues = {},
  readOnly = false,
}: InnerDynamicFieldsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const arrayErrors = errors?.[name] as FieldErrors<T>[] | undefined;

  /** Prevent double append in React 18 Strict Mode */
  const initializedRef = useRef(false);

  /** Build default object from config */
  const buildDefaultItem = useCallback(() => {
    return itemFields.reduce<Record<string, any>>((acc, field) => {
      acc[field.name] = field.defaultValue ?? "";
      return acc;
    }, {});
  }, [itemFields]);

  /** Ensure EXACTLY one item on first mount */
  useEffect(() => {
    if (initializedRef.current) return;

    if (fields.length === 0) {
      append(buildDefaultItem());
    }

    initializedRef.current = true;
  }, []); // intentionally empty

  const handleAdd = () => append(buildDefaultItem());

  const handleRemove = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="space-y-4 border border-(--border-color) rounded-md p-4">
      {fields.map((item, index) => (
        <div key={item.id} className="flex gap-3 items-end">
          {itemFields.map((field) => (
            <FormField
              key={field.name}
              field={{
                ...field,
                name: `${name}.${index}.${field.name}`,
              }}
              initialValues={initialValues}
              control={control}
              register={register}
              errors={arrayErrors?.[index]}
              readOnly={readOnly}
            />
          ))}

          {/* Always show delete button, disable if only one item */}
          <Tooltip
            title={
              fields.length === 1 ? "Cannot delete the last item" : "Delete"
            }
          >
            <span>
              <IconButton
                onClick={() => handleRemove(index)}
                disabled={fields.length === 1}
                sx={{
                  color: fields.length === 1 ? "#aaa" : "#DC3545",
                  padding: "0.45rem",
                  borderRadius: "var(--border-radius-md)",
                  transition: "0.2s",
                  "&:hover": {
                    color:
                      fields.length === 1 ? "var(--admin-gray)" : "#BB2D3B",
                  },
                  "&.Mui-disabled": {
                    color: "var(--admin-gray)", // Ensures gray color when disabled
                  },
                }}
              >
                <Delete />
              </IconButton>
            </span>
          </Tooltip>
        </div>
      ))}

      <Button
        variant="outlined"
        variantColor="transparent"
        sizeVariant="small"
        sx={{
          width: "fit-content",
          color: "var(--admin-blue)",
          ":hover": {
            color: "var(--admin-blue-hover)",
          },
        }}
        onClick={handleAdd}
      >
        <Add sx={{ fontSize: 18 }} /> Add {label}
      </Button>
    </div>
  );
}

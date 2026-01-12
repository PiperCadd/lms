"use client";

import { useEffect, useCallback } from "react";
import { useFieldArray, Control, FieldErrors } from "react-hook-form";
import { FieldDefinition, FormField } from "./CustomForm";
import Button from "@/ui/Button";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { IconButton, Tooltip } from "@mui/material";

type DynamicFieldsProps<T = any> = {
  control: Control<any>;
  name: string;
  label: string;
  itemFields: FieldDefinition[];
  register: any;
  errors?: FieldErrors<T>;
  minItems?: number;
  initialValues?: any;
  readOnly?: boolean;
};

export default function DynamicFields({
  control,
  name,
  label,
  itemFields,
  register,
  errors,
  minItems = 1,
  initialValues = {},
  readOnly = false,
}: DynamicFieldsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const arrayErrors = errors?.[name] as FieldErrors<T>[] | undefined;

  /** Build default object from config */
  const buildDefaultItem = useCallback(() => {
    return itemFields.reduce<Record<string, any>>((acc, field) => {
      acc[field.name] = field.defaultValue ?? "";
      return acc;
    }, {});
  }, [itemFields]);

  /** Ensure minimum initial fields */
  useEffect(() => {
    if (fields.length < minItems) {
      append(buildDefaultItem());
    }
  }, [fields.length, minItems, append, buildDefaultItem]);

  const handleAdd = () => append(buildDefaultItem());

  const handleRemove = (index: number) => {
    if (fields.length > minItems) {
      remove(index);
    }
  };

  return (
    <div className="space-y-6">
      {fields.map((item, index) => (
        <div
          key={item.id} // stable key
          className="border border-(--border-color) rounded-md p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">
              {label} {index + 1}
            </h3>

            {fields.length > minItems && (
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => handleRemove(index)}
                  sx={{
                    color: "#DC3545",
                    padding: "0.45rem",
                    borderRadius: "var(--border-radius-md)",
                    transition: "0.2s",
                    "&:hover": { color: "#BB2D3B" },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>

          <div className="flex flex-col gap-4">
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
          </div>
        </div>
      ))}

      <div className="flex justify-end pt-6">
        <Button
          variantColor="blue"
          sx={{ width: "fit-content" }}
          onClick={handleAdd}
        >
          Add {label}
        </Button>
      </div>
    </div>
  );
}

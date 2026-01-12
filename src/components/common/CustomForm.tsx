import React, { useCallback, useEffect, useMemo } from "react";
import { useForm, Controller, SubmitHandler, FieldPath } from "react-hook-form";
import { z, ZodType, ZodObject, ZodString } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/ui/Button";
import TextField from "@/ui/TextField";
import Link from "next/link";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import Checkbox from "@/ui/Checkbox";
import FileField from "@/ui/FileField";
import { useFormHandler } from "@/hooks/admin/customHooks";
import useFormOptions from "@/hooks/admin/useFormOptions";
import { useAppStore } from "@/store/admin/useAppStore";
import RadioGroup from "@/ui/RadioGroup";
import DynamicFields from "./DynamicFields";
import InnerDynamicFields from "./InnerDynamicFields";
import MuiCheckbox from "@mui/material/Checkbox";
import { useUIStore } from "@/store/admin/useUIStore";
import Dropdown from "@/ui/Dropdown";

// -----------------------------
// Types
// -----------------------------
export type FieldType =
  | "text"
  | "email"
  | "password"
  | "textarea"
  | "select"
  | "number"
  | "file"
  | "date"
  | "checkbox"
  | "radio"
  | "dynamic-array"
  | "dynamic-inner-array"
  | "chooseOne";

export type PrimitiveOption = string | number | boolean;

export type FieldOption =
  | PrimitiveOption
  | {
      label: string;
      value: PrimitiveOption;
    };

export type FieldDefinition = {
  name: string;
  label?: string;
  type: FieldType;
  itemFields?: FieldDefinition[];
  placeholder?: string;
  required?: boolean;
  fileFormatsToAccept?: string;
  min?: number;
  max?: number;
  options?: FieldOption[];
  optionsKey?: string;
  selectOptions?: string | string[];
  defaultValue?: string | boolean;
  helperText?: string;
  row?: number;
  colSpan?: number;
};

export type ExternalLink = {
  text: string;
  href: string;
  destination?: "above" | "below";
};

export type CustomFormProps<T extends ZodType = ZodType> = {
  title?: string;
  fields: FieldDefinition[];
  buttonName?: string;
  apiEndpoint: string;
  method?: "POST" | "PUT" | "PATCH";
  submitLabel?: string;
  className?: string;
  zodSchema?: ZodObject<any> | null; // optional override
  externalLink?: ExternalLink[] | [];
  initialValues?: Record<string, any>; // EDIT SUPPORT
  readOnly?: boolean;
};

// Utility: build dynamic zod schema from fields
const buildZodSchema = (fields: FieldDefinition[]) => {
  const shape: Record<string, ZodType> = {};

  fields.forEach((f) => {
    const name = f.name;
    const required = !!f.required;

    let schema: ZodType;

    switch (f.type) {
      case "email": {
        const s = z.email({ message: "Invalid email address" });
        schema = s;
        break;
      }
      case "password":
      case "text":
      case "textarea": {
        let s = z.string();
        if (f.min) s = s.min(f.min, `Minimum ${f.min} characters`);
        if (f.max) s = s.max(f.max, `Maximum ${f.max} characters`);
        schema = s;
        break;
      }
      case "number": {
        let s = z.number();
        if (typeof f.min === "number") s = s.gte(f.min, `Minimum ${f.min}`);
        if (typeof f.max === "number") s = s.lte(f.max, `Maximum ${f.max}`);

        schema = z.preprocess((val) => {
          if (val === "" || val === null || val === undefined) return undefined;
          return Number(val);
        }, s);
        break;
      }
      case "select":
        schema = z.union([z.string(), z.number()]);
        break;
      case "file":
        schema = z
          .instanceof(File)
          .optional()
          .refine((f) => f instanceof File, {
            message: "File is required",
          });
        break;
      // case "checkbox": {
      //   const hasMultiple = Array.isArray(f.options) && f.options.length > 1;

      //   if (hasMultiple) {
      //     // array of selected values
      //     schema = z.array(z.string());

      //     if (required) {
      //       schema = schema.refine(
      //         (arr) => Array.isArray(arr) && arr.length > 0,
      //         { message: `${f.label || name} is required` }
      //       );
      //     }
      //   } else {
      //     // single checkbox boolean
      //     schema = z.boolean();

      //     if (required) {
      //       schema = schema.refine((v) => v === true, {
      //         message: `${f.label || name} is required`,
      //       });
      //     }
      //   }

      //   break;
      // }

      case "dynamic-array": {
        const subShape: Record<string, ZodType> = {};

        f.itemFields?.forEach((sub) => {
          let s = z.string().min(1, `${sub.label} required`);
          subShape[sub.name] = s;
        });

        schema = z.array(z.object(subShape));

        if (required) {
          schema = schema.min(1, `${f.label || name} is required`);
        }

        break;
      }

      case "chooseOne": {
        schema = z
          .object({
            checked: z.boolean(),
            value: z.string().optional(),
          })
          .refine(
            (v) => !v.checked || (v.checked && v.value && v.value.length > 0),
            {
              message: `${f.label || name} is required`,
              path: ["value"],
            }
          );
        break;
      }

      default:
        schema = z.any();
    }

    if (required) {
      // ensure empty strings are caught
      if (schema instanceof ZodString) {
        schema = (schema as any).min(1, `${f.label || name} is required`);
      }
      schema = schema.refine(
        (val: any) => val !== undefined && val !== null && val !== "",
        {
          message: `${f.label || name} is required`,
        }
      );
    } else {
      schema = schema.optional();
    }

    shape[name] = schema;
  });

  return z.object(shape);
};

// Form Fields
export const FormField = React.memo(
  ({
    field,
    initialValues,
    control,
    register,
    errors,
    readOnly,
  }: {
    field: FieldDefinition;
    initialValues: any;
    control: any;
    register: any;
    errors: any;
    readOnly: any;
  }) => {
    const name = field.name;
    const error = errors?.[name];
    const isView = readOnly === true;

    switch (field.type) {
      case "textarea":
        return (
          <Controller
            name={name}
            control={control}
            defaultValue={field.defaultValue ?? ""}
            render={({ field: ctrlField }) => (
              <TextField
                id={field.name}
                {...ctrlField}
                type={field.type}
                label={field.label}
                placeholder={field.placeholder}
                InputProps={{ readOnly: isView }}
                multiline={true}
                error={!!error}
                helperText={error?.message || field.helperText}
              />
            )}
          />
        );
      case "select": {
        return (
          <Controller
            name={name}
            control={control}
            defaultValue={field.defaultValue ?? ""}
            render={({ field: ctrlField }) => (
              <Dropdown
                // {...ctrlField}
                label={field.label}
                placeholder={field.placeholder}
                value={ctrlField.value}
                onChange={ctrlField.onChange}
                optionsKey={field.optionsKey}
                options={field.selectOptions as string[]}
              />
            )}
          />
        );
      }
      case "number":
        return (
          <Controller
            name={name}
            control={control}
            defaultValue={field.defaultValue ?? ""}
            render={({ field: ctrlField }) => (
              <TextField
                id={field.name}
                {...ctrlField}
                type="number"
                label={field.label}
                placeholder={field.placeholder}
                error={!!error}
                helperText={error?.message || field.helperText}
                inputProps={{
                  readOnly: isView,
                  min: field.min,
                  max: field.max,
                  step: 1, // integers only
                }}
              />
            )}
          />
        );
      case "file":
        return (
          <Controller
            name={name}
            control={control}
            render={({ field: ctrlField }) => (
              <FileField
                id={field.name}
                label={field.label}
                error={!!error}
                helperText={error?.message || field.helperText}
                existingPreviewUrl={initialValues?.profileImageUrl}
                accept={field.fileFormatsToAccept}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.currentTarget.files?.[0] ?? null;
                  ctrlField.onChange(file);
                }}
                disabled={isView}
                // hideUpload={isView}
                inputRef={ctrlField.ref}
              />
            )}
          />
        );
      case "checkbox": {
        const hasMultiple =
          Array.isArray(field.options) && field.options.length > 1;

        return (
          <Controller
            name={name}
            control={control}
            defaultValue={hasMultiple ? [] : false}
            render={({ field: ctrlField }) => (
              <FormControl error={!!error}>
                <Checkbox
                  label={field.label}
                  value={ctrlField.value}
                  disabled={isView}
                  onChange={ctrlField.onChange}
                  options={field.options}
                  row={field.row}
                />
                {error && (
                  <FormHelperText>{error.message || error}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        );
      }

      case "radio":
        return (
          <Controller
            name={name}
            control={control}
            defaultValue={field.defaultValue ?? (false || "")}
            render={({ field: ctrlField }) => (
              <RadioGroup
                label={field.label}
                value={ctrlField.value}
                disabled={isView}
                onChange={ctrlField.onChange}
                options={field.options}
                error={error?.message}
              />
            )}
          />
        );

      case "dynamic-array":
        return (
          <DynamicFields
            control={control}
            name={field.name}
            itemFields={field.itemFields}
            label={field.label}
            errors={errors}
            register={register}
          />
        );

      case "dynamic-inner-array":
        return (
          <InnerDynamicFields
            control={control}
            name={field.name}
            itemFields={field.itemFields}
            label={field.label}
            errors={errors}
            register={register}
          />
        );

      case "chooseOne":
        return (
          <Controller
            name={name}
            control={control}
            defaultValue={{ checked: false, value: "" }}
            render={({ field: ctrlField }) => {
              const { checked, value } = ctrlField.value || {};

              return (
                <FormControl error={!!error} fullWidth>
                  <div className="flex items-center gap-3">
                    {/* Checkbox */}
                    <MuiCheckbox
                      checked={!!checked}
                      onChange={(e) =>
                        ctrlField.onChange({
                          ...ctrlField.value,
                          checked: e.target.checked,
                        })
                      }
                      sx={{
                        "& .MuiSvgIcon-root": {
                          color: "var(--border-color)",
                        },
                        "&.Mui-checked .MuiSvgIcon-root": {
                          color: "#1976d2",
                        },
                      }}
                    />

                    {/* Text Input */}
                    <TextField
                      value={value}
                      onChange={(e) =>
                        ctrlField.onChange({
                          ...ctrlField.value,
                          value: e.target.value,
                        })
                      }
                      placeholder={field.placeholder}
                      error={!!error}
                      InputProps={{ readOnly: isView }}
                      helperText={error?.message || field.helperText}
                      sx={{ flex: 1 }}
                    />
                  </div>

                  {error && <FormHelperText>{error.message}</FormHelperText>}
                </FormControl>
              );
            }}
          />
        );

      default:
        // text / email/ password
        return (
          <Controller
            name={name}
            control={control}
            defaultValue={field.defaultValue ?? ""}
            render={({ field: ctrlField }) => (
              <TextField
                id={field.name}
                {...ctrlField}
                InputProps={{ readOnly: isView }}
                type={field.type}
                label={field.label}
                placeholder={field.placeholder}
                error={!!error}
                helperText={error?.message || field.helperText}
                sx={{ color: "black" }}
              />
            )}
          />
        );
    }
  }
);

// Custom Form
export default function CustomForm({
  fields,
  buttonName = "Submit",
  method = "POST",
  apiEndpoint,
  externalLink,
  className = "",
  zodSchema = null,
  initialValues,
  readOnly,
}: CustomFormProps) {
  const { setTost } = useAppStore();
  const { editingId, mode, editingType } = useUIStore();

  const renderLinks = useCallback(
    (destination: "above" | "below") => {
      if (!externalLink) return null;
      return (
        <div
          className={`flex ${
            destination === "above"
              ? "justify-end mb-4"
              : "justify-start mt-4 space-x-2"
          }`}
        >
          {externalLink
            .filter((link) => link.destination === destination)
            .map((link, index) =>
              destination === "above" ? (
                <Link
                  key={index}
                  href={link.href}
                  className="text-blue-500 hover:underline text-sm font-medium"
                >
                  {link.text}
                </Link>
              ) : (
                <Button
                  key={index}
                  onClick={() => (window.location.href = link.href)}
                  sx={{
                    background: "#181f4a",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  {link.text}
                </Button>
              )
            )}
        </div>
      );
    },
    [externalLink]
  );
  // build or use provided zod schema
  const schema = useMemo(
    () => zodSchema ?? buildZodSchema(fields),
    [fields, zodSchema]
  );

  type SchemaType = z.infer<typeof schema>;

  // const defaultValues = useMemo(
  //   () =>
  //     fields.reduce(
  //       (a, f) => ({ ...a, [f.name]: f.defaultValue ?? undefined }),
  //       {}
  //     ),
  //   [fields]
  // );

  const defaultValues = useMemo(() => {
    if (initialValues) return initialValues;

    return fields.reduce((acc, f) => {
      acc[f.name] = f.type === "dynamic-array" ? [] : f.defaultValue ?? "";
      return acc;
    }, {} as Record<string, any>);
  }, [fields, initialValues]);

  const { control, handleSubmit, register, formState, setFocus, reset } =
    useForm<SchemaType>({
      resolver: zodResolver(schema as any),
      defaultValues,
    });

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && editingId) {
      // fetch data ONCE
      fetch(`/api/${editingType}/${editingId}`)
        .then((res) => res.json())
        .then((data) => reset(data));
    }
  }, [editingId, mode, editingType, reset]);

  const { errors, isSubmitting } = formState;

  /* -------------------- EDIT MODE RESET -------------------- */
  useEffect(() => {
    if (initialValues) reset(initialValues);
  }, [initialValues, reset]);

  /* -------------------- AUTO FOCUS ERROR -------------------- */
  useEffect(() => {
    const firstErrorField = Object.keys(errors)[0] as
      | FieldPath<SchemaType>
      | undefined;

    if (firstErrorField) {
      const el = document.querySelector(
        `[name="${firstErrorField}"]`
      ) as HTMLElement | null;

      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      setFocus(firstErrorField); // fully typed
    }
  }, [errors, setFocus]);

  const { handleApiSubmit, loading, error, success } = useFormHandler({
    apiEndpoint,
    method,
    // onError: () => setTost(true),
  });

  // const { addCourse } = useCourseStore();

  const submitHandler: SubmitHandler<SchemaType> = useCallback(
    async (data) => {
      // file fields will be FileList objects; convert if needed
      console.log("✅ Raw form data before normalization:", data);
      //     const normalized = {
      //   ...data,
      //   chapters: data.chapters.map((c) => ({
      //     title: c.title,
      //     description: c.description,
      //     material: c.material instanceof File ? c.material : null,
      //   })),
      // };

      // addCourse(normalized);

      const normalized = { ...data } as any;

      fields.forEach((f) => {
        if (f.type === "file") {
          // already a File
          normalized[f.name] = data[f.name];
        }
      });

      console.log("📦 Normalized data being sent to parent:", normalized);
      await handleApiSubmit(normalized);
    },
    [fields, handleApiSubmit]
  );

  const rows = fields.reduce((acc, f) => {
    if (f.row) {
      if (!acc[f.row]) acc[f.row] = [];
      acc[f.row].push(f);
    }
    return acc;
  }, {} as Record<number, FieldDefinition[]>);

  return (
    <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col gap-4">
        {fields.map((field) => {
          // If field is part of a row group, skip here (we will render it later)
          if (field.row) return null;
          return (
            <FormField
              key={field.name}
              field={field}
              initialValues={initialValues}
              control={control}
              register={register}
              errors={errors}
            />
          );
        })}

        {/* Render all rows */}
        {Object.keys(rows)
          .sort((a, b) => Number(a) - Number(b))
          .map((rowKey) => {
            const rowFields = rows[+rowKey];

            return (
              <div key={rowKey} className="grid grid-cols-12 gap-4">
                {rowFields.map((field) => {
                  // Determine span
                  const span: number =
                    field.type === "dynamic-array" ? 12 : field.colSpan ?? 12;
                  const limitedSpan = Math.min(span, 12) as
                    | 1
                    | 2
                    | 3
                    | 4
                    | 5
                    | 6
                    | 7
                    | 8
                    | 9
                    | 10
                    | 11
                    | 12;

                  // Map to Tailwind class
                  const spanClassMap: Record<typeof limitedSpan, string> = {
                    1: "col-span-1",
                    2: "col-span-2",
                    3: "col-span-3",
                    4: "col-span-4",
                    5: "col-span-5",
                    6: "col-span-6",
                    7: "col-span-7",
                    8: "col-span-8",
                    9: "col-span-9",
                    10: "col-span-10",
                    11: "col-span-11",
                    12: "col-span-12",
                  };

                  return (
                    <div key={field.name} className={spanClassMap[limitedSpan]}>
                      <FormField
                        field={field}
                        initialValues={initialValues}
                        control={control}
                        register={register}
                        errors={errors}
                        readOnly={readOnly}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
      {renderLinks("above")}
      {!readOnly && (
        <Button
          sx={{ mt: "16px", width: "fit-content", float: "right" }}
          type="submit"
          disabled={isSubmitting}
          sizeVariant="medium"
          variant="contained"
        >
          {buttonName}
        </Button>
      )}
      {renderLinks("below")}
    </form>
  );
}
FormField.displayName = "FormField";

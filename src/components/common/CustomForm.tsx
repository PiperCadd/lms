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
  | "checkbox";

export type PrimitiveOption = string | number;

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
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  options?: FieldOption[];
  optionsKey?: string;
  defaultValue?: string | boolean;
  helperText?: string;
  row?: number;
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
      case "checkbox":
        schema = z.boolean();
        break;
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
const FormField = React.memo(
  ({
    field,
    initialValues,
    control,
    register,
    errors,
    optionsMap,
  }: {
    field: FieldDefinition;
    initialValues: any;
    control: any;
    register: any;
    errors: any;
    optionsMap?: FieldOption[];
  }) => {
    const name = field.name;
    const error = errors?.[name];

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
                multiline={true}
                error={!!error}
                helperText={error?.message || field.helperText}
              />
            )}
          />
        );
      case "select": {
        const resolvedOptions =
          field.options ??
          (field.optionsKey ? optionsMap?.[field.optionsKey] : []);

        const hasOptions =
          Array.isArray(resolvedOptions) && resolvedOptions.length > 0;

        return (
          <Controller
            name={name}
            control={control}
            defaultValue={field.defaultValue ?? ""}
            render={({ field: ctrlField }) => (
              <TextField
                id={field.name}
                {...ctrlField}
                select
                label={field.label}
                error={!!error}
                helperText={error?.message || field.helperText}
                disabled={!hasOptions}
              >
                {/* ALWAYS pass children */}
                {!hasOptions && (
                  <MenuItem value="" disabled>
                    Loading...
                  </MenuItem>
                )}

                {hasOptions &&
                  resolvedOptions.map((option, i) => {
                    const value =
                      typeof option === "object" ? option.value : option;
                    const label =
                      typeof option === "object" ? option.label : option;

                    return (
                      <MenuItem key={i} value={value}>
                        {label}
                      </MenuItem>
                    );
                  })}
              </TextField>
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
                type={field.type}
                label={field.label}
                placeholder={field.placeholder}
                error={!!error}
                helperText={error?.message || field.helperText}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.currentTarget.files?.[0] ?? null;
                  ctrlField.onChange(file);
                }}
                inputRef={ctrlField.ref}
              />
            )}
          />
        );
      case "checkbox":
        return (
          <Controller
            name={name}
            control={control}
            defaultValue={field.defaultValue ?? false}
            render={({ field: ctrlField }) => (
              <FormControl error={!!error}>
                <FormControlLabel
                  control={
                    <Checkbox {...ctrlField} checked={ctrlField.value} />
                  }
                  label={field.label}
                />
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
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
}: CustomFormProps) {
  const { setTost } = useAppStore();

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

  const defaultValues = useMemo(
    () =>
      fields.reduce(
        (a, f) => ({ ...a, [f.name]: f.defaultValue ?? undefined }),
        {}
      ),
    [fields]
  );

  const { control, handleSubmit, register, formState, setFocus, reset } =
    useForm<SchemaType>({
      resolver: zodResolver(schema as any),
      defaultValues,
    });

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
    onError: () => setTost(true),
  });

  const submitHandler: SubmitHandler<SchemaType> = useCallback(
    async (data) => {
      // file fields will be FileList objects; convert if needed
      console.log("✅ Raw form data before normalization:", data);

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

  const optionKeys = useMemo(
    () =>
      Array.from(
        new Set(fields.map((f) => f.optionsKey).filter(Boolean) as string[])
      ),
    [fields]
  );

  const { optionsMap } = useFormOptions(optionKeys);

  return (
    <form className="" onSubmit={handleSubmit(submitHandler)}>
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
              optionsMap={optionsMap}
            />
          );
        })}

        {/* Render all rows */}
        {Object.keys(rows).map((rowKey) => (
          <div key={rowKey} className="grid grid-cols-3 gap-4">
            {rows[+rowKey].map((field) => (
              <FormField
                key={field.name}
                field={field}
                initialValues={initialValues}
                control={control}
                register={register}
                errors={errors}
                optionsMap={optionsMap}
              />
            ))}
          </div>
        ))}
      </div>
      {renderLinks("above")}
      <Button
        sx={{ mt: "16px", width: "fit-content", float: "right" }}
        type="submit"
        disabled={isSubmitting}
        sizeVariant="medium"
        variant="contained"
      >
        {buttonName}
      </Button>
      {renderLinks("below")}
    </form>
  );
}
FormField.displayName = "FormField";

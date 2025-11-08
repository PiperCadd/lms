import React, { useCallback, useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
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
  | "checkbox";

export type FieldOption = { label: string; value: string | number };

export type FieldDefinition = {
  name: string;
  label?: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  options?: Array<string> | FieldOption[];
  defaultValue?: any;
  helperText?: string;
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
  submitLabel?: string;
  className?: string;
  zodSchema?: ZodObject<any> | null; // optional override
  externalLink?: ExternalLink[] | [];
};

// -----------------------------
// Utility: build dynamic zod schema from fields
// -----------------------------
const buildZodSchema = (fields: FieldDefinition[]) => {
  const shape: Record<string, ZodType> = {};

  fields.forEach((f) => {
    const name = f.name;
    const required = !!f.required;

    let schema: ZodType;

    switch (f.type) {
      case "email": {
        let s = z.email({ message: "Invalid email address" });
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
        // We'll validate files minimally here; advanced validation should be in onSubmit
        schema = z.any();
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

// -----------------------------
// FormField - small helper for rendering each field type
// -----------------------------
const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];
// const FormField: React.FC<{
//   field: FieldDefinition;
//   control: any;
//   register: any;
//   errors: any;
// }> = ({ field, control, register, errors }) => {
const FormField = React.memo(
  ({
    field,
    control,
    register,
    errors,
  }: {
    field: FieldDefinition;
    control: any;
    register: any;
    errors: any;
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
                {...ctrlField}
                type={field.type}
                label={field.label}
                multiline={true}
                error={!!error}
                helperText={error?.message || field.helperText}
              />
            )}
          />
        );
      case "select":
        return (
          <Controller
            name={name}
            control={control}
            defaultValue={field.defaultValue ?? ""}
            render={({ field: ctrlField }) => (
              <TextField
                {...ctrlField}
                select
                label={field.label}
                error={!!error}
                helperText={error?.message || field.helperText}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        );
      case "number":
        return (
          <Controller
            name={name}
            control={control}
            defaultValue={field.defaultValue ?? ""}
            render={({ field: ctrlField }) => (
              <TextField
                {...ctrlField}
                type={field.type}
                label={field.label}
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
            defaultValue={field.defaultValue ?? null}
            render={({ field: ctrlField }) => (
              <FileField
                {...ctrlField}
                label={field.label}
                error={!!error}
                helperText={error?.message || field.helperText}
              />
            )}
          />
        );
      case "checkbox":
        return (
          <Controller
            name={name}
            control={control}
            defaultValue={!!field.defaultValue}
            render={({ field: ctrlField }) => (
              <FormControl error={!!error}>
                <FormControlLabel
                  control={
                    <Checkbox {...ctrlField} checked={field.defaultValue} />
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
                {...ctrlField}
                type={field.type}
                label={field.label}
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

export default function CustomForm({
  fields,
  buttonName = "Submit",
  apiEndpoint,
  externalLink,
  className = "",
  zodSchema = null,
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
                  className="text-blue-500 hover:underline"
                >
                  {link.text}
                </Link>
              ) : (
                <Button
                  key={index}
                  onClick={() => (window.location.href = link.href)}
                  sx={{
                    background: "#181f4a",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
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

  const { control, handleSubmit, register, formState } = useForm<SchemaType>({
    resolver: zodResolver(schema as any),
    defaultValues: useMemo(
      () =>
        fields.reduce(
          (acc, f) => ({ ...acc, [f.name]: f.defaultValue ?? undefined }),
          {} as Record<string, any>
        ),
      [fields]
    ),
  });

  const { errors, isSubmitting } = formState;

  const { handleApiSubmit, loading, error, success } = useFormHandler({
    apiEndpoint,
    onError: () => setTost(true),
  });

  const submitHandler: SubmitHandler<SchemaType> = useCallback(
    async (data) => {
      // file fields will be FileList objects; convert if needed
      console.log("✅ Raw form data before normalization:", data);

      const normalized = { ...data } as any;

      fields.forEach((f) => {
        if (f.type === "file" && data[f.name]) {
          // convert FileList to File or array depending on single/multiple
          const files = (data as any)[f.name] as FileList;
          if (files && files.length === 1) normalized[f.name] = files[0];
          else if (files && files.length > 1)
            normalized[f.name] = Array.from(files);
        }
      });
      console.log("📦 Normalized data being sent to parent:", normalized);
      await handleApiSubmit(normalized);
    },
    [fields, handleApiSubmit]
  );
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="">
        {fields.map((f) => (
          <FormField
            key={f.name}
            field={f}
            control={control}
            register={register}
            errors={errors}
          />
        ))}
      </div>
      {renderLinks("above")}
      <Button type="submit" disabled={isSubmitting} variant="contained">
        {buttonName}
      </Button>
      {renderLinks("below")}
    </form>
  );
}

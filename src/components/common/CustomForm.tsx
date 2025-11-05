import Button from "@/ui/Button";
import TextField from "@/ui/TextField";
import Link from "next/link";
import React from "react";
import { SubmitHandler } from "react-hook-form";

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
  destination?: 'above' | 'below';
};

export type CustomFormProps = {
  //<T extends ZodTypeAny = ZodTypeAny>
  title?: string;
  fields: FieldDefinition[];
  buttonName?: string;
  onSubmit: (values: any) => void | Promise<void>;
  submitLabel?: string;
  className?: string;
  //zodSchema?: ZodObject<any> | null; // optional override
  externalLink?: ExternalLink[];
};

// -----------------------------
// FormField - small helper for rendering each field type
// -----------------------------

const FormField: React.FC<{
  field: FieldDefinition;
  control: any;
  register: any;
  errors: any;
}> = ({ field, control, register, errors }) => {
  const name = field.name;
  const error = errors?.[name];

  switch (field.type) {
    case "textarea":
      return <TextField type={field.type} />;
    case "select":
      return <></>;
    case "number":
      return <></>;
    case "file":
      return <></>;
    case "checkbox":
      return <></>;
    default:
      // text / email/ password
      return (
        <TextField
          type={field.type}
          label={field.label}
          sx={{ color: "black" }}
        />
      );
  }
};

const submitHandler: SubmitHandler<FieldType> = () => {};

export default function CustomForm({
  fields,
  buttonName = "Submit",
  externalLink,
}: CustomFormProps) {
  return (
    <form onSubmit={() => {}}>
      <div className="mb-4">
        {fields.map((f) => (
          <FormField
            key={f.name}
            field={f}
            control={"control"}
            register={"register"}
            errors={"errors"}
          />
        ))}
      </div>
      {externalLink?.map(({ text, href, destination }, index) => {
        if (destination === "above") {
          return (
            <Link
              key={index}
              href={href}
              className="text-blue-500 hover:underline ms-auto"
            >
              {text}
            </Link>
          );
        }
        return null;
      })}
      <Button variant="contained">{buttonName}</Button>
    </form>
  );
}

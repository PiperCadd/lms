import { addDesignationFormFields } from "@/config/admin";

export const ENTITY_DIALOG_CONFIG = {
  course: {
    label: "Course",
    endpoint: "/courses",
    fields: addDesignationFormFields,
  },
} as const;
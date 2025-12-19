import { NavItem } from "@/components/admin/Drawer";
import { FieldDefinition } from "@/components/common/CustomForm";
import {
  Campaign,
  Category,
  Dashboard,
  Badge,
  Description,
  Feedback,
  Group,
  Help,
  Language,
  LocalOffer,
  MenuBook,
  People,
  Quiz,
  ReceiptLong,
  Slideshow,
  ViewModule,
  CheckCircle,
  Image,
} from "@mui/icons-material";

export const loginFormFields = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "example@user.com",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "password",
    required: true,
  },
] as const satisfies FieldDefinition[];

export const forgotPasswordFormFields = [
  {
    name: "email",
    label: "Email id",
    type: "text",
    placeholder: "example@user.com",
    required: true,
  },
] as const satisfies FieldDefinition[];

export const resetPasswordFormFields = [
  {
    name: "newPassword",
    label: "New Password",
    type: "password",
    placeholder: "Enter new password",
    required: true,
  },
  {
    name: "password",
    label: "Confirm Password",
    type: "password",
    placeholder: "confirm password",
    required: true,
  },
] as const satisfies FieldDefinition[];

export const quickNavigations: NavItem[] = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Dashboard },
  // { name: "Admin Portal", href: "/admin/designation", icon: AdminPanelSettings },
  { name: "Designation", href: "/admin/designation", icon: Badge },
  { name: "Categories", href: "/admin/categories", icon: Category },
  { name: "Sub Categories", href: "/admin/sub-categories", icon: ViewModule },
  { name: "Languages", href: "/admin/languages", icon: Language },
  { name: "Team Members", href: "/admin/team-members", icon: Group },
];

export const courseManagementNavigations: NavItem[] = [
  { name: "Courses", href: "/admin/courses", icon: MenuBook },
  { name: "Lessons", href: "/", icon: Slideshow },
  { name: "Quizzes", href: "/", icon: Quiz },
];

export const userManagementNavigations: NavItem[] = [
  { name: "Learners", href: "/admin/learners", icon: People },
  { name: "Enrollments", href: "/admin/enrollments", icon: CheckCircle },
];

export const generalNavigations: NavItem[] = [
  { name: "Banner", href: "/", icon: Image },
  { name: "Announcements", href: "/", icon: Campaign },
  { name: "Coupons", href: "/", icon: LocalOffer },
  { name: "Feedback", href: "/", icon: Feedback },
  { name: "FAQ", href: "/", icon: Help },
  { name: "Pages", href: "/", icon: Description },
];

export const reportsNavigations: NavItem[] = [
  { name: "Payment Report", href: "/", icon: ReceiptLong },
];

export const addDesignationFormFields = [
  {
    name: "designationName",
    label: "Designation Name",
    type: "text",
    placeholder: "Enter Designation Name",
    required: true,
  },
] as const satisfies FieldDefinition[];

export const addLanguagesFormFields = [
  {
    name: "languageCode",
    label: "Language Code",
    type: "text",
    placeholder: "Enter Language Code",
    required: true,
  },
   {
    name: "languageName",
    label: "Language Name",
    type: "text",
    placeholder: "Enter Language Name",
    required: true,
  },
] as const satisfies FieldDefinition[];

export const addCategoryFormFields = [
  {
    name: "categoryName",
    label: "Category Name",
    type: "text",
    placeholder: "Enter Category Name",
    required: true,
  },
] as const satisfies FieldDefinition[];

export const addSubCategoryFormFields = [
  {
    name: "category",
    label: "Category",
    type: "select",
    optionsKey: "categories",
    placeholder: "Choose Category",
    required: true,
  },
   {
    name: "subCategoryName",
    label: "Sub Category Name",
    type: "text",
    placeholder: "Enter Sub Category Name",
    required: true,
  },
] as const satisfies FieldDefinition[];

export const addTeamMembers = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "enter name",
    required: true,
    row: 1,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "enter email",
    required: true,
    row: 1,
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "enter ph.no",
    required: true,
    row: 1,
  },
  {
    name: "designation",
    label: "Designation",
    type: "select",
    optionsKey: "designations",
    placeholder: "select designation",
    required: true,
    row: 1,
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: ["Male", "Female", "Other"],
    placeholder: "Select Gender",
    required: true,
    row: 1,
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    required: true,
    row: 1,
  },
  {
    name: "profileImage",
    label: "Profile Image",
    type: "file",
    required: true,
    row: 1,
  },
  {
    name: "joiningDate",
    label: "Joining Date",
    type: "date",
    required: true,
    row: 1,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["Active", "Inactive"],
    defaultValue: "Active",
    required: true,
    row: 1,
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",
    placeholder: "enter address",
    required: true,
    row: 1,
  },
] as const satisfies FieldDefinition[];

export const permissions = [
  {
    name: "dashboard",
    label: "Dashboard",
    type: "checkbox",
    row: 1,
  },
  {
    name: "employees",
    label: "Employees",
    type: "checkbox",
    row: 1,
  },
  {
    name: "courses",
    label: "Courses",
    type: "checkbox",
    row: 1,
  },
  {
    name: "lessons",
    label: "Lessons",
    type: "checkbox",
    row: 1,
  },
  {
    name: "reports",
    label: "Reports",
    type: "checkbox",
    row: 1,
  },
  {
    name: "settings",
    label: "Settings",
    type: "checkbox",
    row: 1,
  },
] as const satisfies FieldDefinition[];

export const addCourses = [
  {
    name: "courseName",
    label: "Course Name",
    type: "text",
    placeholder: "Enter Course Name",
    required: true,
    row: 1,
  },
  {
    name: "courseDescription",
    label: "Course Description",
    type: "textarea",
    placeholder: "Enter Course Description",
    required: true,
    row: 1,
  },
  {
    name: "courseImage",
    label: "Course Image",
    type: "file",
    placeholder: "Enter Course Description",
    required: true,
    row: 1,
  },
] as const satisfies FieldDefinition[];
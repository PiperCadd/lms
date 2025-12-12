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
  { name: "Courses", href: "/", icon: MenuBook },
  { name: "Lessons", href: "/", icon: Slideshow },
  { name: "Quizzes", href: "/", icon: Quiz },
];

export const userManagementNavigations: NavItem[] = [
  { name: "Learners", href: "/", icon: People },
  { name: "Enrollments", href: "/", icon: CheckCircle },
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
    placeholder: "Eg: Marketing",
    required: true,
  },
] as const satisfies FieldDefinition[];

export const addTeamMembers = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "example@user.com",
    required: true,
    row: 1,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "example@user.com",
    required: true,
    row: 1,
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "example@user.com",
    required: true,
    row: 1,
  },
  {
    name: "designation",
    label: "Designation",
    type: "text",
    placeholder: "example@user.com",
    required: true,
    row: 1,
  },
  {
    name: "gender",
    label: "Gender",
    type: "text",
    placeholder: "example@user.com",
    required: true,
    row: 1,
  },
     {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    placeholder: "example@user.com",
    required: true,
    row: 1,
  },
     {
    name: "profileImage",
    label: "Profile Image",
    type: "file",
    placeholder: "example@user.com",
    required: true,
    row: 1,
  },
    {
    name: "joiningDate",
    label: "Joining Date",
    type: "date",
    placeholder: "example@user.com",
    required: true,
    row: 1,
  },
   {
    name: "status",
    label: "Status",
    type: "text",
    placeholder: "example@user.com",
    required: true,
    row: 1,
  },
   {
    name: "address",
    label: "Address",
    type: "textarea",
    placeholder: "example@user.com",
    required: true,
    row: 1,
  },
]as const satisfies FieldDefinition[];

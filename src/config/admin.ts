import { NavItem } from "@/components/admin/Drawer";
import { FieldDefinition } from "@/components/common/CustomForm";
import { AdminPanelSettings, Campaign, Category, Dashboard, Badge, Description, Feedback, Group, Help, Language, LocalOffer, MenuBook, People, Quiz, ReceiptLong, Slideshow, ViewModule, CheckCircle, Image } from "@mui/icons-material";

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

export const quickNavigations:NavItem[] = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Dashboard },
  { name: "Admin Portal", href: "/", icon: AdminPanelSettings },
  { name: "Designation", href: "/", icon: Badge },
  { name: "Categories", href: "/", icon: Category },
  { name: "Sub Categories", href: "/", icon: ViewModule },
  { name: "Languages", href: "/",icon: Language },
  { name: "Team Members", href: "/", icon: Group },
];

export const courseManagementNavigations:NavItem[] = [
  { name: "Courses", href: "/", icon: MenuBook },
  { name: "Lessons", href: "/", icon: Slideshow },
  { name: "Quizzes", href: "/", icon: Quiz },
];

export const userManagementNavigations:NavItem[] = [
  { name: "Learners", href: "/", icon: People },
  { name: "Enrollments", href: "/", icon: CheckCircle },
];

export const generalNavigations:NavItem[] = [
  { name: "Banner", href: "/", icon: Image },
  { name: "Announcements", href: "/", icon: Campaign },
  { name: "Coupons", href: "/", icon: LocalOffer },
  { name: "Feedback", href: "/", icon: Feedback },
  { name: "FAQ", href: "/", icon: Help },
  { name: "Pages", href: "/", icon: Description },
];

export const reportsNavigations:NavItem[] = [
  { name: "Payment Report", href: "/", icon: ReceiptLong },
];
import { FieldDefinition } from "@/components/common/CustomForm";
import {
  LayoutDashboard,
  BrickWallShield,
  IdCardLanyard,
  SquaresSubtract,
  Shapes,
  Languages,
  UsersRound,
  BookOpenText,
  Presentation,
  NotebookPen,
  Users,
  UserRoundCheck,
  Image,
  Megaphone,
  TicketCheck,
  MessageSquareMore,
  CircleQuestionMark,
  StickyNote,
  Scroll,
} from "lucide-react";

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

export const quickNavigations = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Admin Portal", icon: BrickWallShield },
  { name: "Designation", icon: IdCardLanyard },
  { name: "Categories", icon: Shapes },
  { name: "Sub Categories", icon: SquaresSubtract },
  { name: "Languages", icon: Languages },
  { name: "Team Members", icon: UsersRound },
];

export const courseManagementNavigations = [
  { name: "Courses", icon: BookOpenText },
  { name: "Lessons", icon: Presentation },
  { name: "Quizzes", icon: NotebookPen },
];

export const userManagementNavigations = [
  { name: "Learners", icon: Users },
  { name: "Enrollments", icon: UserRoundCheck },
]

export const generalNavigations =[
  { name: "Banner", icon: Image },
  { name: "Announcements", icon: Megaphone },
  { name: "Coupons", icon: TicketCheck },
  { name: "Feedback", icon: MessageSquareMore },
  { name: "FAQ", icon: CircleQuestionMark },
  { name: "Pages", icon: StickyNote },
];

export const reportsNavigations = [{ name: "Payment Report", icon: Scroll }];

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
  { name: "Lessons", href: "/admin/lessons", icon: Slideshow },
  { name: "Quizzes", href: "/admin/quizzes", icon: Quiz },
];

export const userManagementNavigations: NavItem[] = [
  { name: "Learners", href: "/admin/learners", icon: People },
  { name: "Enrollments", href: "/admin/enrollments", icon: CheckCircle },
];

export const generalNavigations: NavItem[] = [
  { name: "Banner", href: "/admin/banners", icon: Image },
  { name: "Announcements", href: "/admin/announcements", icon: Campaign },
  { name: "Coupons", href: "/admin/coupons", icon: LocalOffer },
  { name: "Feedback", href: "/admin/feedbacks", icon: Feedback },
  { name: "FAQ", href: "/admin/faq", icon: Help },
  { name: "Pages", href: "/admin/pages", icon: Description },
];

export const reportsNavigations: NavItem[] = [
  { name: "Payment Report", href: "/admin/payment_report", icon: ReceiptLong },
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
    placeholder: "Enter Name",
    required: true,
    row: 1,
    colSpan: 4,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter Email",
    required: true,
    row: 1,
    colSpan: 4,
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "Enter Phone Number",
    required: true,
    row: 1,
    colSpan: 4,
  },
  {
    name: "designation",
    label: "Designation",
    type: "select",
    optionsKey: "designations",
    placeholder: "Select Designation",
    required: true,
    row: 2,
    colSpan: 4,
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    selectOptions: ["Male", "Female", "Other"],
    placeholder: "Select Gender",
    required: true,
    row: 2,
    colSpan: 4,
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    required: true,
    row: 2,
    colSpan: 4,
  },
  {
    name: "profileImage",
    label: "Profile Image",
    type: "file",
    fileFormatsToAccept:"image/*",
    required: true,
    row: 3,
    colSpan: 4,
  },
  {
    name: "joiningDate",
    label: "Joining Date",
    type: "date",
    required: true,
    row: 3,
    colSpan: 4,
  },
  {
    name: "status",
    label: "Status",
    placeholder: "Select Status",
    type: "select",
    selectOptions: ["Active", "Inactive"],
    defaultValue: "Active",
    required: true,
    row: 3,
    colSpan: 4,
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",
    placeholder: "Enter Address",
    required: true,
    row: 4,
    colSpan: 8,
  },
] as const satisfies FieldDefinition[];

export const permissions = [
  {
    name: "dashboard",
    label: "Dashboard",
    type: "checkbox",
    defaultValue: false,
    row: 1,
    colSpan: 4,
  },
  {
    name: "employees",
    label: "Employees",
    type: "checkbox",
    row: 1,
    colSpan: 4,
  },
  {
    name: "courses",
    label: "Courses",
    type: "checkbox",
    row: 1,
    colSpan: 4,
  },
  {
    name: "lessons",
    label: "Lessons",
    type: "checkbox",
    row: 2,
    colSpan: 4,
  },
  {
    name: "reports",
    label: "Reports",
    type: "checkbox",
    row: 2,
    colSpan: 4,
  },
  {
    name: "settings",
    label: "Settings",
    type: "checkbox",
    row: 2,
    colSpan: 4,
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
    colSpan: 4,
  },
  {
    name: "courseDescription",
    label: "Course Description",
    type: "textarea",
    placeholder: "Enter Course Description",
    required: true,
    row: 1,
    colSpan: 4,
  },
  {
    name: "courseImage",
    label: "Course Image",
    type: "file",
    placeholder: "Enter Course Description",
    required: true,
    row: 1,
    colSpan: 4,
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    optionsKey: "categories",
    placeholder: "Select Category",
    required: true,
    row: 2,
    colSpan: 4,
  },
  {
    name: "subCategory",
    label: "Sub Category",
    type: "select",
    optionsKey: "categories",
    placeholder: "Select Sub Category",
    required: true,
    row: 2,
    colSpan: 4,
  },
  {
    name: "availableLanguage",
    label: "Available Languages",
    type: "select",
    optionsKey: "categories",
    placeholder: "Select Languages",
    required: true,
    row: 2,
    colSpan: 4,
  },
  {
    name: "salePrice",
    label: "Sale Price",
    type: "number",
    placeholder: "Enter Sale Price",
    required: true,
    row: 3,
    colSpan: 4,
  },
  {
    name: "offerPrice",
    label: "Offer Price",
    type: "number",
    placeholder: "Enter Offer Price",
    required: true,
    row: 3,
    colSpan: 4,
  },
  {
    name: "keyword",
    label: "Keyword",
    type: "text",
    placeholder: "Enter Key Words",
    required: true,
    row: 3,
    colSpan: 4,
  },
  {
    name: "certificateType",
    label: "Certifiate Type",
    type: "checkbox",
    options: [
      { label: "Own", value: "own" },
      { label: "official", value: "offical" },
    ],
    required: true,
    row: 4,
  },
  {
    name: "chapters",
    type: "dynamic-array",
    label: "Chapter",
    required: true,
    row: 5,
    itemFields: [
      { name: "title", label: "Chapter Title", type: "text", required: true },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
      },
    ],
  },
] as const satisfies FieldDefinition[];

export const addLessons = [
  {
    name: "course",
    label: "Course",
    type: "select",
    optionsKey: "categories",
    placeholder: "Select Course",
    required: true,
    row: 1,
    colSpan: 6,
  },
  {
    name: "chapter",
    label: "Chapter",
    type: "select",
    optionsKey: "categories",
    placeholder: "Select Chapter",
    required: true,
    row: 1,
    colSpan: 6,
  },
  {
    name: "chapters",
    type: "dynamic-array",
    label: "Lesson",
    required: true,
    row: 2,
    itemFields: [
      {
        name: "title",
        label: "Lesson Title",
        type: "text",
        placeholder: "Lesson Name",
        required: true,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Lesson Description",
        required: true,
      },
      {
        name: "videoFile",
        label: "Upload Video File",
        type: "file",
        required: true,
      },
      {
        name: "options",
        label: "Options",
        type: "dynamic-inner-array",
        required: true,
        itemFields: [
          {
            name: "audioFile",
            label: "Upload Audio File",
            type: "file",
            required: true,
          },
        ],
      },
    ],
  },
] as const satisfies FieldDefinition[];

export const addQuizzes = [
  {
    name: "courses",
    label: "Courses",
    type: "select",
    optionsKey: "categories",
    placeholder: "Select Courses",
    required: true,
    row: 1,
    colSpan: 6, // half width
  },
  {
    name: "lessons",
    label: "Lessons",
    type: "select",
    optionsKey: "categories",
    placeholder: "Select Lessons",
    required: true,
    row: 1,
    colSpan: 6, // half width
  },
  {
    name: "timeDuration",
    label: "Time Duration",
    type: "number",
    placeholder: "Enter Time Duration",
    required: true,
    row: 2,
    colSpan: 6, // half width
  },
  {
    name: "quizTitle",
    label: "Quiz Title",
    type: "text",
    placeholder: "Enter Quiz Title",
    required: true,
    row: 2,
    colSpan: 6, // half width
  },
  {
    name: "description",
    label: "Description / Instructions",
    type: "textarea",
    placeholder: "Enter Description",
    required: true,
    row: 3,
    colSpan: 12, // full width
  },
  {
    name: "question",
    type: "dynamic-array",
    label: "Question",
    required: true,
    row: 4,
    colSpan: 12, // dynamic-array always full width
    itemFields: [
      {
        name: "question",
        label: "Question",
        type: "text",
        placeholder: "Enter your question",
        helperText: "Choose the correct answer",
        required: true,
      },
      {
        name: "options",
        label: "Options",
        type: "dynamic-inner-array",
        required: true,
        itemFields: [
          {
            name: "label",
            label: "Option",
            type: "chooseOne",
            required: true,
          },
          // {
          //   name: "isCorrect",
          //   label: "Correct",
          //   type: "checkbox",
          //   required: false,
          // },
        ],
      },
    ],
  },
] as const satisfies FieldDefinition[];

export const addBannerFormFields = [
  {
    name: "bannerName",
    label: "Banner Name",
    type: "text",
    placeholder: "Enter Banner Name",
    required: true,
  },
  {
    name: "bannerType",
    label: "Banner Type",
    type: "select",
    optionsKey: "categories",
    placeholder: "Select Type",
    required: true,
  },
  {
    name: "bannerImage",
    label: "Banner Image",
    type: "file",
    required: true,
  },
] as const satisfies FieldDefinition[];

export const addAnnouncementFormFields = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter Title",
    required: true,
  },
  {
    name: "content",
    label: "Content",
    type: "textarea",
    placeholder: "Enter Annuncement",
    required: true,
  },
  {
    name: "fromDate",
    label: "From Date",
    type: "date",
    required: true,
  },
  {
    name: "toDate",
    label: "To Date",
    type: "date",
    required: true,
  },
] as const satisfies FieldDefinition[];

export const addCouponFormFields = [
  {
    name: "couponName",
    label: "Coupon Name",
    type: "text",
    placeholder: "Enter Title",
    required: true,
    row: 1,
    colSpan: 6,
  },
  {
    name: "couponCode",
    label: "Coupon Code",
    type: "textarea",
    placeholder: "Enter Annuncement",
    required: true,
    row: 1,
    colSpan: 6,
  },
  {
    name: "fromDate",
    label: "From Date",
    type: "date",
    required: true,
    row: 2,
    colSpan: 6,
  },
  {
    name: "toDate",
    label: "To Date",
    type: "date",
    required: true,
    row: 2,
    colSpan: 6,
  },
  {
    name: "type",
    label: "Type",
    type: "select",
    placeholder: "Select Type",
    required: true,
    row: 3,
    colSpan: 6,
  },
  {
    name: "for",
    label: "For",
    type: "select",
    placeholder: "Select recipient",
    required: true,
    row: 3,
    colSpan: 6,
  },
  {
    name: "discountValue",
    label: "Discount Value",
    type: "text",
    placeholder: "Enter Value (e.g., 30 for 30%or 500 for flat)",
    required: true,
    row: 4,
    colSpan: 6,
  },
] as const satisfies FieldDefinition[];

export const addFaqFormFields = [
  {
    name: "question",
    label: "Question",
    type: "text",
    placeholder: "Enter Question",
    required: true,
  },
  {
    name: "answer",
    label: "Answer",
    placeholder: "Enter Answer",
    type: "textarea",
    required: true,
  },
] as const satisfies FieldDefinition[];

export const addPageFormFields = [
  {
    name: "pageName",
    label: "Page Name",
    type: "text",
    placeholder: "Enter Page Name",
    required: true,
  },
  {
    name: "content",
    label: "Content",
    type: "textarea",
    placeholder: "Enter Page Content",
    required: true,
  },
] as const satisfies FieldDefinition[];

export const addFeedbackFormFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter Name",
    required: true,
  },
  {
    name: "rating",
    label: "Rating",
    type: "number",
    placeholder: "Enter Rating (0–5)",
    required: true,
    min: 0,
    max: 5,
    helperText: "Rating must be between 0 to 5",
  },
  {
    name: "feedback",
    label: "Feedback",
    type: "text",
    placeholder: "Enter Feedback",
    required: true,
  },
] as const satisfies FieldDefinition[];

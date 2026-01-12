export const mockDesignations = [
  {
    id: "des-001",
    designationName: "Chief Executive Officer",
    shortName: "CEO",
    level: 1,
    department: "Executive",
    description:
      "Responsible for overall strategic direction and company leadership.",
    createdAt: "2024-01-12T09:30:00Z",
  },
  {
    id: "des-002",
    designationName: "Chief Technology Officer",
    shortName: "CTO",
    level: 2,
    department: "Technology",
    description: "Oversees technological development and technical teams.",
    createdAt: "2024-02-20T11:15:00Z",
  },
  {
    id: "des-003",
    designationName: "Senior Software Engineer",
    shortName: "Sr. SE",
    level: 5,
    department: "Engineering",
    description: "Designs and develops complex software systems.",
    createdAt: "2024-03-05T14:50:00Z",
  },
  {
    id: "des-004",
    designationName: "Junior Software Engineer",
    shortName: "Jr. SE",
    level: 7,
    department: "Engineering",
    description:
      "Responsible for implementing features and assisting senior developers.",
    createdAt: "2024-03-18T10:10:00Z",
  },
  {
    id: "des-005",
    designationName: "Human Resources Manager",
    shortName: "HR Manager",
    level: 4,
    department: "HR",
    description: "Manages hiring, onboarding, and employee relations.",
    createdAt: "2024-04-01T08:00:00Z",
  },
  {
    id: "des-006",
    designationName: "Finance Analyst",
    shortName: "FA",
    level: 6,
    department: "Finance",
    description: "Analyzes budgeting, forecasting, and financial data.",
    createdAt: "2024-04-12T13:45:00Z",
  },
  {
    id: "des-007",
    designationName: "Product Manager",
    shortName: "PM",
    level: 4,
    department: "Product",
    description: "Ensures product success from planning to execution.",
    createdAt: "2024-05-03T16:20:00Z",
  },
];

export const mockCourseCategories = [
  {
    id: "cat-001",
    categoryName: "IT & Software",
    description:
      "Covers programming, networking, cybersecurity, and software technologies.",
    createdAt: "2024-01-10T09:00:00Z",
  },
  {
    id: "cat-002",
    categoryName: "Mechanical Engineering",
    description:
      "Covers mechanical systems, thermodynamics, robotics, and manufacturing.",
    createdAt: "2024-01-15T11:20:00Z",
  },
  {
    id: "cat-003",
    categoryName: "Electrical Engineering",
    description:
      "Covers circuits, power systems, embedded systems, and electronics.",
    createdAt: "2024-01-18T08:40:00Z",
  },
  {
    id: "cat-004",
    categoryName: "Business & Management",
    description:
      "Covers strategy, operations, leadership, and organizational management.",
    createdAt: "2024-01-22T14:10:00Z",
  },
  {
    id: "cat-005",
    categoryName: "Civil Engineering",
    description:
      "Covers construction, structural analysis, design, and infrastructure.",
    createdAt: "2024-01-28T10:55:00Z",
  },
];

export const mockSubCategories = [
  {
    id: 1,
    category: "IT & Software",
    subCategory: ["Web Development", "Mobile Development", "Data Science"],
  },
  {
    id: 2,
    category: "Mechanical Engineering",
    subCategory: [
      "Automobile Engineering",
      "Thermodynamics",
      "Robotics",
      "CAD/CAM",
      "Manufacturing Tech",
    ],
  },
  {
    id: 4,
    category: "Business & Management",
    subCategory: [
      "Project Management",
      "Entrepreneurship",
      "Finance",
      "Accounting",
      "Leadership",
      "Marketing",
    ],
  },
  {
    id: 5,
    category: "Design",
    subCategory: [
      "UI/UX Design",
      "Graphic Design",
      "Interior Design",
      "Animation",
      "Game Design",
    ],
  },
  {
    id: 6,
    category: "Languages",
    subCategory: ["English", "Spanish", "German", "French", "Mandarin Chinese"],
  },
];

export const mockLanguages = [
  {
    id: "lang-001",
    name: "English",
    code: "en",
    nativeName: "English",
    direction: "ltr",
    createdAt: "2024-01-05T10:00:00Z",
  },
  {
    id: "lang-002",
    name: "Hindi",
    code: "hi",
    nativeName: "हिन्दी",
    direction: "ltr",
    createdAt: "2024-01-06T09:45:00Z",
  },
  {
    id: "lang-003",
    name: "Tamil",
    code: "ta",
    nativeName: "தமிழ்",
    direction: "ltr",
    createdAt: "2024-01-07T11:10:00Z",
  },
  {
    id: "lang-004",
    name: "Telugu",
    code: "te",
    nativeName: "తెలుగు",
    direction: "ltr",
    createdAt: "2024-01-08T12:30:00Z",
  },
  {
    id: "lang-005",
    name: "Malayalam",
    code: "ml",
    nativeName: "മലയാളം",
    direction: "ltr",
    createdAt: "2024-01-09T14:00:00Z",
  },
  {
    id: "lang-006",
    name: "Kannada",
    code: "kn",
    nativeName: "ಕನ್ನಡ",
    direction: "ltr",
    createdAt: "2024-01-10T15:10:00Z",
  },
  {
    id: "lang-007",
    name: "Arabic",
    code: "ar",
    nativeName: "العربية",
    direction: "rtl",
    createdAt: "2024-01-11T10:20:00Z",
  },
  {
    id: "lang-008",
    name: "French",
    code: "fr",
    nativeName: "Français",
    direction: "ltr",
    createdAt: "2024-01-12T09:15:00Z",
  },
  {
    id: "lang-009",
    name: "Spanish",
    code: "es",
    nativeName: "Español",
    direction: "ltr",
    createdAt: "2024-01-13T13:45:00Z",
  },
  {
    id: "lang-010",
    name: "German",
    code: "de",
    nativeName: "Deutsch",
    direction: "ltr",
    createdAt: "2024-01-14T16:00:00Z",
  },
];

export const mockTeamMembers = [
  {
    id: "tm-001",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91-9876543210",
    gender: "Male",
    dob: "1995-04-18",
    joiningDate: "2022-06-01",
    role: "Admin",
    designation: "Tech Lead",
    status: "Active",
    createdAt: "2022-06-01T09:30:00Z",
    address: "Bangalore, Karnataka, India",
    profileImageUrl: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "tm-002",
    name: "Neha Verma",
    email: "neha.verma@example.com",
    phone: "+91-9123456789",
    gender: "Female",
    dob: "1998-09-05",
    joiningDate: "2023-01-15",
    role: "User",
    designation: "Software Engineer",
    status: "Active",
    createdAt: "2023-01-15T10:00:00Z",
    address: "Pune, Maharashtra, India",
    profileImageUrl: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: "tm-003",
    name: "Rohit Mehta",
    email: "rohit.mehta@example.com",
    phone: "+91-9988776655",
    gender: "Male",
    dob: "1993-12-22",
    joiningDate: "2021-08-10",
    role: "Manager",
    designation: "Product Manager",
    status: "Inactive",
    createdAt: "2021-08-10T08:45:00Z",
    address: "Delhi, India",
    profileImageUrl: "https://i.pravatar.cc/150?img=54",
  },
  {
    id: "tm-004",
    name: "Sneha Iyer",
    email: "sneha.iyer@example.com",
    phone: "+91-9012345678",
    gender: "Female",
    dob: "1996-02-14",
    joiningDate: "2024-03-05",
    role: "User",
    designation: "UI/UX Designer",
    status: "Pending",
    createdAt: "2024-03-05T11:20:00Z",
    address: "Chennai, Tamil Nadu, India",
    profileImageUrl: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "tm-005",
    name: "Kunal Patel",
    email: "kunal.patel@example.com",
    phone: "+91-9090909090",
    gender: "Male",
    dob: "1992-07-30",
    joiningDate: "2020-11-02",
    role: "User",
    designation: "Senior Developer",
    status: "Active",
    createdAt: "2020-11-02T09:00:00Z",
    address: "Ahmedabad, Gujarat, India",
    profileImageUrl: "https://i.pravatar.cc/150?img=61",
  },
  {
    id: "tm-006",
    name: "Priya Nair",
    email: "priya.nair@example.com",
    phone: "+91-9345678123",
    gender: "Female",
    dob: "1994-03-11",
    joiningDate: "2019-05-20",
    role: "Manager",
    designation: "Project Manager",
    status: "Active",
    createdAt: "2019-05-20T08:30:00Z",
    address: "Kochi, Kerala, India",
    profileImageUrl: "https://i.pravatar.cc/150?img=25",
  },
];


export const mokeUsers = [
  {
    id: 1,
    name: "Lal",
    email: "lal@gmail.com",
    phoneNumber: "+91 98765 43210",
  },
  {
    id: 2,
    name: "Rohit Sharma",
    email: "rohit.sharma@gmail.com",
    phoneNumber: "+91 91234 56789",
  },
  {
    id: 3,
    name: "Sneha Iyer",
    email: "sneha.iyer@gmail.com",
    phoneNumber: "+91 99887 66554",
  },
  {
    id: 4,
    name: "Karthik R",
    email: "karthik.r@gmail.com",
    phoneNumber: "+91 90123 45678",
  },
  {
    id: 5,
    name: "Neha Patel",
    email: "neha.patel@gmail.com",
    phoneNumber: "+91 90909 80808",
  },
];

export const mockCourseDetails = [
  {
    id: 1,
    course: "React Fundamentals",
    progress: 80,
    date: "2025-01-10",
  },
  {
    id: 2,
    course: "Node.js API Development",
    progress: 60,
    date: "2025-01-08",
  },
  {
    id: 3,
    course: "Data Structures & Algorithms",
    progress: 45,
    date: "2025-01-05",
  },
  {
    id: 4,
    course: "Machine Learning Basics",
    progress: 20,
    date: "2025-01-03",
  },
  {
    id: 5,
    course: "UI/UX Wireframing",
    progress: 100,
    date: "2024-12-28",
  },
  {
    id: 6,
    course: "Database Fundamentals",
    progress: 70,
    date: "2024-12-20",
  },
];

export const mockPaymentHistory = [
  {
    id: 1,
    amount: 499.0,
    status: "Paid",
    date: "2025-01-10",
  },
  {
    id: 2,
    amount: 1299.0,
    status: "Failed",
    date: "2025-01-08",
  },
  {
    id: 3,
    amount: 799.0,
    status: "Pending",
    date: "2025-01-07",
  },
  {
    id: 4,
    amount: 1599.0,
    status: "Paid",
    date: "2025-01-04",
  },
  {
    id: 5,
    amount: 2499.0,
    status: "Refunded",
    date: "2025-01-02",
  },
  {
    id: 6,
    amount: 999.0,
    status: "Paid",
    date: "2024-12-30",
  },
];

export const mockEnrollments = [
  {
    id: 1,
    course: "Full-Stack Web Development",
    userName: "Arun Kumar",
    status: 75,
    certificate: null,
  },
  {
    id: 2,
    course: "UI/UX Design Masterclass",
    userName: "Priya Singh",
    status: 100,
    certificate: "/certificates/uiux-priya.pdf",
  },
  {
    id: 3,
    course: "Data Science & Machine Learning",
    userName: "Rahul Sharma",
    status: 30,
    certificate: null,
  },
  {
    id: 4,
    course: "Python Programming",
    userName: "Shreya Patel",
    status: 100,
    certificate: "/certificates/python-shreya.pdf",
  },
  {
    id: 5,
    course: "Cloud Computing (AWS)",
    userName: "Manish Reddy",
    status: 45,
    certificate: null,
  },
  {
    id: 6,
    course: "Cyber Security Essentials",
    userName: "Deepak Gupta",
    status: 20,
    certificate: null,
  },
  {
    id: 7,
    course: "React + Redux",
    userName: "Sneha Roy",
    status: 100,
    certificate: "/certificates/react-sneha.pdf",
  },
  {
    id: 8,
    course: "DevOps Fundamentals",
    userName: "Sanjay Verma",
    status: 0,
    certificate: null,
  },
  {
    id: 9,
    course: "Blockchain Developer Program",
    userName: "Aditi Sharma",
    status: 55,
    certificate: null,
  },
  {
    id: 10,
    course: "Mobile App Development (Flutter)",
    userName: "Vikram Singh",
    status: 100,
    certificate: "/certificates/flutter-vikram.pdf",
  },
];

export const courseDetailsMock = {
  id: 1,
  courseName: "Full Stack Web Development",
  status: "Completed",
  officialCertificateRequired: true,
  userName: "Ajay Prashanth",
  certificateLink: "https://example.com/certificates/fullstack.pdf",
  lessons: [
    { lessonName: "HTML Basics", progress: 100, date: "2025-01-02" },
    { lessonName: "CSS Layouts", progress: 10, date: "2025-01-03" },
    { lessonName: "React Hooks", progress: 50, date: "2025-01-05" },
  ],
};

export const mockCourses = [
  {
    id: 1,
    courseName: "Full Stack Web Development",
    category: "IT & Software",
    subCategory: "Web Development",
    image:
      "https://toppng.com/uploads/preview/react-logo-icon-11609374122d9vkbptqap.png",
    numberOfChapters: 18,
  },
  {
    id: 2,
    courseName: "Python for Data Science",
    category: "IT & Software",
    subCategory: "Data Science",
    image:
      "https://www.vhv.rs/dpng/d/521-5216236_python-programming-language-logo-hd-png-download.png",
    numberOfChapters: 24,
  },
  {
    id: 3,
    courseName: "Machine Design",
    category: "Mechanical",
    subCategory: "Machine Engineering",
    image:
      "https://www.vhv.rs/dpng/d/521-5216236_python-programming-language-logo-hd-png-download.png",
    numberOfChapters: 12,
  },
  {
    id: 4,
    courseName: "Introduction to CAD",
    category: "Mechanical",
    subCategory: "CAD Modeling",
    image:
      "https://www.vhv.rs/dpng/d/521-5216236_python-programming-language-logo-hd-png-download.png",
    numberOfChapters: 15,
  },
  {
    id: 5,
    courseName: "UI/UX Design Fundamentals",
    category: "Design",
    subCategory: "UI/UX",
    image:
      "https://www.vhv.rs/dpng/d/521-5216236_python-programming-language-logo-hd-png-download.png",
    numberOfChapters: 20,
  },
];

export const mockLessons = [
  {
    id: 1,
    lessonName: "Introduction to Web Development",
    course: "IT and Software",
    availableLanguages: ["English", "Spanish", "French"],
  },
  {
    id: 2,
    lessonName: "Advanced JavaScript",
    course: "IT and Software",
    availableLanguages: ["English", "German"],
  },
  {
    id: 3,
    lessonName: "Data Science Basics",
    course: "IT and Software",
    availableLanguages: ["English", "Spanish"],
  },
  {
    id: 4,
    lessonName: "Mechanical Engineering Fundamentals",
    course: "Mechanical",
    availableLanguages: ["English"],
  },
  {
    id: 5,
    lessonName: "Thermodynamics",
    course: "Mechanical",
    availableLanguages: ["English", "French"],
  },
  {
    id: 6,
    lessonName: "Web Development with React",
    course: "IT and Software",
    availableLanguages: ["English", "Hindi", "Spanish"],
  },
  {
    id: 7,
    lessonName: "Database Management",
    course: "IT and Software",
    availableLanguages: ["English"],
  },
  {
    id: 8,
    lessonName: "Fluid Mechanics",
    course: "Mechanical",
    availableLanguages: ["English", "German"],
  },
];


export const quizzesMockData = [
  {
    id: 1,
    quizTitle: "JavaScript Basics Quiz",
    course: "Web Development",
    noOfQuestions: 10,
  },
  {
    id: 2,
    quizTitle: "Advanced React Concepts",
    course: "Frontend Development",
    noOfQuestions: 15,
  },
  {
    id: 3,
    quizTitle: "Python Fundamentals Test",
    course: "Data Science",
    noOfQuestions: 12,
  },
  {
    id: 4,
    quizTitle: "SQL & Database Design",
    course: "Backend Development",
    noOfQuestions: 20,
  },
  {
    id: 5,
    quizTitle: "Machine Learning Introduction",
    course: "Artificial Intelligence",
    noOfQuestions: 18,
  },
  {
    id: 6,
    quizTitle: "DevOps Basics Assessment",
    course: "Cloud & DevOps",
    noOfQuestions: 14,
  },
];

export const mockBanners = [
  {
    id: 1,
    bannerName: "React Course Promotion",
    type: "homepage",
    image: "https://www.vhv.rs/dpng/d/521-5216236_python-programming-language-logo-hd-png-download.png",
  },
  {
    id: 2,
    bannerName: "JavaScript Mastery",
    type: "course",
    image: "https://www.vhv.rs/dpng/d/521-5216236_python-programming-language-logo-hd-png-download.png",
  },
  {
    id: 3,
    bannerName: "New UI/UX Batch",
    type: "homepage",
    image: "https://www.vhv.rs/dpng/d/521-5216236_python-programming-language-logo-hd-png-download.png",
  },
  {
    id: 4,
    bannerName: "Backend with FastAPI",
    type: "course",
    image: "https://www.vhv.rs/dpng/d/521-5216236_python-programming-language-logo-hd-png-download.png",
  },
];

export const mockAnnouncements = [
  {
    id: 1,
    title: "New React Course Launched",
    content: "We are excited to announce the launch of our new React Fundamentals course. Enroll now to get early access benefits.",
    fromDate: "2025-01-01",
    toDate: "2025-01-31",
  },
  {
    id: 2,
    title: "Platform Maintenance",
    content: "The platform will undergo scheduled maintenance on Sunday from 12:00 AM to 4:00 AM. Please plan accordingly.",
    fromDate: "2025-02-05",
    toDate: "2025-02-06",
  },
  {
    id: 3,
    title: "New Batch Enrollment Open",
    content: "Enrollment for the March batch is now open. Limited seats available. Register early to secure your spot.",
    fromDate: "2025-02-10",
    toDate: "2025-03-10",
  },
  {
    id: 4,
    title: "Holiday Notice",
    content: "Our offices will remain closed on account of the public holiday. Support services will resume the next working day.",
    fromDate: "2025-03-29",
    toDate: "2025-03-29",
  },
];


export const couponMockData = [
  {
    id: 1,
    couponName: "New User Discount",
    couponCode: "WELCOME10",
    type: "Percentage",
  },
  {
    id: 2,
    couponName: "Festive Offer",
    couponCode: "FESTIVE25",
    type: "Percentage",
  },
  {
    id: 3,
    couponName: "Flat ₹500 Off",
    couponCode: "FLAT500",
    type: "Flat",
  },
  {
    id: 4,
    couponName: "Summer Sale",
    couponCode: "SUMMER15",
    type: "Percentage",
  },
  {
    id: 5,
    couponName: "Clearance Deal",
    couponCode: "CLEAR300",
    type: "Flat",
  },
];

export const faqMockData = [
  {
    id: 1,
    question: "How do I apply a coupon code?",
    answer:
      "You can apply a coupon code at checkout by entering it in the 'Coupon Code' field and clicking Apply.",
  },
  {
    id: 2,
    question: "Can I use more than one coupon at a time?",
    answer:
      "No, only one coupon can be applied per order. Multiple coupons cannot be combined.",
  },
  {
    id: 3,
    question: "Why is my coupon code not working?",
    answer:
      "The coupon may have expired, reached its usage limit, or may not be applicable to the selected products.",
  },
  {
    id: 4,
    question: "Do coupons work on discounted items?",
    answer:
      "Some coupons cannot be used on already discounted items. Please check the coupon terms and conditions.",
  },
  {
    id: 5,
    question: "Can I use a coupon after placing an order?",
    answer:
      "Coupons must be applied before completing the checkout. They cannot be added after an order is placed.",
  },
];

export const mockPages = [
  {
    id: 1,
    pageName: "Home",
    content: "Welcome to our website. Explore our features and latest updates."
  },
  {
    id: 2,
    pageName: "About Us",
    content: "We are a team dedicated to building high-quality web applications."
  },
  {
    id: 3,
    pageName: "Services",
    content: "We offer web development, UI/UX design, and backend solutions."
  },
  {
    id: 4,
    pageName: "Contact",
    content: "Reach out to us via email or phone for any inquiries."
  }
];


export const feedbackMockData = [
  {
    id: 1,
    name: "Arjun Kumar",
    feedbackContent: "The billing system is very smooth and easy to use. Reports are clear and accurate.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    feedbackContent: "Overall good experience, but loading time can be improved on slower networks.",
    rating: 4,
  },
  {
    id: 3,
    name: "Rahul Verma",
    feedbackContent: "UI is clean, but I faced issues while exporting invoices to PDF.",
    rating: 3,
  },
  {
    id: 4,
    name: "Sneha Patel",
    feedbackContent: "Customer support was responsive and helpful. The app works reliably.",
    rating: 5,
  },
  {
    id: 5,
    name: "Amit Singh",
    feedbackContent: "Basic features are good, but I would like more customization options.",
    rating: 3,
  },
];

export const payment_report = [
  {
    id: 1,
    paymentId: "PAY-1001",
    amount: "₹1,499.00",
    user: "Rahul Sharma",
    status: "Success",
    paidAt: "01 Jan 2025, 10:15 AM",
  },
  {
    id: 2,
    paymentId: "PAY-1002",
    amount: "₹2,999.50",
    user: "Anita Verma",
    status: "Pending",
    paidAt: "02 Jan 2025, 02:42 PM",
  },
  {
    id: 3,
    paymentId: "PAY-1003",
    amount: "₹799.99",
    user: "Mohammed Ali",
    status: "Failed",
    paidAt: "03 Jan 2025, 09:05 AM",
  },
  {
    id: 4,
    paymentId: "PAY-1004",
    amount: "₹4,999.00",
    user: "Sneha Patel",
    status: "Success",
    paidAt: "04 Jan 2025, 06:21 PM",
  },
  {
    id: 5,
    paymentId: "PAY-1005",
    amount: "₹1,200.00",
    user: "Arjun Kumar",
    status: "Success",
    paidAt: "05 Jan 2025, 11:30 AM",
  },
];


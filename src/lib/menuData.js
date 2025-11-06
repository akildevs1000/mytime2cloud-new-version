// menuData.js

// 1️⃣ Reusable menu groups
const attendanceMenu = [
  { href: "shift", icon: "event", label: "Shift" },
  { href: "schedule", icon: "schedule", label: "Schedule" },
  { href: "attendance", icon: "event_note", label: "Leave Requests" },
  { href: "reports", icon: "event_note", label: "Leave Requests--" },
  { href: "logs", icon: "history", label: "Device Logs" },
  { href: "access_control_logs", icon: "lock", label: "Access Control Logs" },
];

const companyMenu = [
  { href: "company", icon: "domain", label: "Company" },
  { href: "branch", icon: "event", label: "Branch" },
  { href: "department-tabs", icon: "event", label: "Department" },
  { href: "department-tabs", icon: "event", label: "Automation" },
  { href: "department-tabs", icon: "event", label: "Roles" },
  { href: "device", icon: "event", label: "Device" },
  { href: "department-tabs", icon: "event", label: "Holidays" },
  { href: "department-tabs", icon: "event", label: "Leaves" },
  { href: "department-tabs", icon: "event", label: "Announcements" },
  { href: "department-tabs", icon: "event", label: "Activity" },
  { href: "department-tabs", icon: "event", label: "Payroll" },
];

const employeesMenu = [
  { href: "/employees", icon: "people", label: "Employee List" },
  { href: "/employees/employee_photo_upload", icon: "apartment", label: "Employee Upload" },
];

// 2️⃣ Centralized navigation object
export const leftNavLinks = {
  "/": [
    { href: "#", icon: "home", label: "Overview" },
  ],

  "/employees": employeesMenu,

  "/attendance": attendanceMenu,
  "/reports": attendanceMenu,
  "/shift": attendanceMenu,
  "/schedule": attendanceMenu,

  "/company": companyMenu,
};

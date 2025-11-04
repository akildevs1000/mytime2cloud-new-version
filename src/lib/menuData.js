// menuData.js

// 1️⃣ Reusable menu groups
const attendanceMenu = [
  { href: "shift", icon: "event", label: "Shift" },
  { href: "schedule", icon: "schedule", label: "Schedule" },
  { href: "attendance", icon: "event_note", label: "Leave Requests" },
  { href: "logs", icon: "history", label: "Device Logs" },
  { href: "access_control_logs", icon: "lock", label: "Access Control Logs" },
];

const companyMenu = [
  { href: "company", icon: "event", label: "Company" },
  { href: "device", icon: "event", label: "Device" },
  { href: "department-tabs", icon: "event", label: "Department" },
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
  "/shift": attendanceMenu,
  "/schedule": attendanceMenu,

  "/company": companyMenu,
};

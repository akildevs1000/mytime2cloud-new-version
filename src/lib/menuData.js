// menuData.js
import {
  Home,
  Users,
  Building,
  Clock,
  CalendarDays,
  FileText,
  History,
  Lock,
  Briefcase,
  Megaphone,
  ActivitySquare,
  DollarSign,
  Upload,
  Layers,
  Workflow,
  Shield,
  Group,
} from "lucide-react";

// 1️⃣ Reusable menu groups
const attendanceMenu = [
  { href: "/shift", icon: Clock, label: "Shift" },
  { href: "/schedule", icon: CalendarDays, label: "Schedule" },
  { href: "/attendance", icon: FileText, label: "Leave Requests" },
  { href: "/reports", icon: FileText, label: "Reports" },
  { href: "/logs", icon: History, label: "Device Logs" },
  { href: "/access_control_logs", icon: Lock, label: "Access Control Logs" },
];

const companyMenu = [
  { href: "/company", icon: Building, label: "Company" },
  { href: "/branch", icon: Briefcase, label: "Branch" },
  { href: "/group-login", icon: Group, label: "Group Login" },
  { href: "/department-tabs", icon: Layers, label: "Department" },
  { href: "/automation", icon: Workflow, label: "Automation" },
  { href: "/roles", icon: Shield, label: "Roles" },
  { href: "/device", icon: Briefcase, label: "Device" },
  { href: "/holidays", icon: CalendarDays, label: "Holidays" },
  { href: "/leaves", icon: FileText, label: "Leaves" },
  { href: "/announcements", icon: Megaphone, label: "Announcements" },
  { href: "/activity", icon: ActivitySquare, label: "Activity" },
  { href: "/payroll", icon: DollarSign, label: "Payroll" },
];

const employeesMenu = [
  { href: "/employees", icon: Users, label: "Employee List" },
  { href: "/employees/employee_photo_upload", icon: Upload, label: "Employee Upload" },
];

// 2️⃣ Centralized navigation object
export const leftNavLinks = {
  "/": [{ href: "#", icon: Home, label: "Home" }],

  "/employees": employeesMenu,

  "/attendance": attendanceMenu,
  "/reports": attendanceMenu,
  "/shift": attendanceMenu,
  "/schedule": attendanceMenu,

  "/company": companyMenu,
  "/branch": companyMenu,
  "/group-login": companyMenu,
  "/department-tabs": companyMenu,
  "/device": companyMenu,
  
};

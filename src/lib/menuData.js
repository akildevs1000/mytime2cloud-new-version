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
  Calendar,
  DoorClosedIcon,
  LogInIcon,
  Settings,
} from "lucide-react";

// 1️⃣ Reusable menu groups
const attendanceMenu = [
  { href: "/shift", icon: Clock, label: "Shift" },
  { href: "/schedule", icon: CalendarDays, label: "Schedule" },
  { href: "/attendance", icon: FileText, label: "Reports" },
  { href: "/logs", icon: History, label: "Device Logs" },
  { href: "/access_control_logs", icon: Lock, label: "Access Control Logs" },
];

const companyMenu = [
  { href: "/setup", icon: Settings, label: "Setup" },
  { href: "/company", icon: Building, label: "Company" },
  { href: "/branch", icon: Briefcase, label: "Branch" },
  { href: "/department-tabs", icon: Layers, label: "Department" },
  { href: "/login/manager-login", icon: LogInIcon, label: "Login" },
  { href: "/device", icon: DoorClosedIcon, label: "Device" },
  { href: "/automation", icon: Workflow, label: "Automation" },
  { href: "/roles", icon: Shield, label: "Roles" },
  { href: "/holiday", icon: CalendarDays, label: "Holidays" },
  { href: "/leaves", icon: FileText, label: "Leaves" },
  { href: "/announcements", icon: Megaphone, label: "Announcements" },
  { href: "/activity", icon: ActivitySquare, label: "Activity" },
  { href: "/payslips", icon: DollarSign, label: "Payroll" },
];

const employeesMenu = [
  { href: "/employees", icon: Users, label: "Employee List" },
  { href: "/employees/employee_photo_upload", icon: Upload, label: "Employee Upload" },
];

const visitorMenu = [
  { href: "/visitor", icon: Users, label: "Visitor" },
];

const dashboardMenu = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/employees", icon: Users, label: "Employees" },
  { href: "/shift", icon: FileText, label: "Attendance" },
  { href: "/attendance", icon: Calendar, label: "Reports" },
];

export const leftNavLinks = {
  "/": dashboardMenu,


  "/visitor": visitorMenu,
  "/employees": employeesMenu,
  "/employee_photo_upload": employeesMenu,

  "/shift": attendanceMenu,
  "/schedule": attendanceMenu,
  "/attendance": attendanceMenu,
  "/reports": attendanceMenu,
  "/logs": attendanceMenu,
  "/access_control_logs": attendanceMenu,

  
  "/setup": companyMenu,
  "/company": companyMenu,
  "/branch": companyMenu,
  "/login/manager-login": companyMenu,
  "/department-tabs": companyMenu,
  "/device": companyMenu,
  "/payslips": companyMenu,

};

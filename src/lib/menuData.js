
// menuData.js
export const leftNavLinks = {
  '/': [ // Corresponds to the DASHBOARD top link
    { href: "#", icon: "home", label: "Overview" },
    { href: "#", icon: "insert_chart", label: "Analytics" },
    // Add other dashboard-related links
  ],
  '/employees': [ // Corresponds to the EMPLOYEES top link
    { href: "/employees", icon: "people", label: "Employee List" },
    { href: "/employees/add", icon: "person_add", label: "Add Employee" },
    { href: "/employees/employee_photo_upload", icon: "apartment", label: "Employee Upload" },
    { href: "/employees/departments", icon: "apartment", label: "Departments" },
    // Add other employee-related links
  ],


  '/attendance': [
    { href: "shift", icon: "event", label: "Shift" },
    { href: "schedule", icon: "schedule", label: "Schedule" },
    { href: "attendance", icon: "event_note", label: "Leave Requests" },

    { href: "logs", icon: "history", label: "Device Logs" },
    { href: "access_control_logs", icon: "lock", label: "Access Control Logs" },

  ],
  '/shift': [
    { href: "shift", icon: "event", label: "Shift" },
    { href: "schedule", icon: "schedule", label: "Schedule" },
    { href: "attendance", icon: "event_note", label: "Leave Requests" },

    { href: "logs", icon: "history", label: "Device Logs" },

  ],
  '/schedule': [
    { href: "shift", icon: "event", label: "Shift" },
    { href: "schedule", icon: "schedule", label: "Schedule" },
    { href: "attendance", icon: "event_note", label: "Leave Requests" },

    { href: "logs", icon: "history", label: "Device Logs" },
  ],
  '/settings': [
    { href: "company", icon: "domain", label: "Company" },
  ],
};
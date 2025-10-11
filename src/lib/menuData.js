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
    { href: "/employees/departments", icon: "apartment", label: "Departments" },
    // Add other employee-related links
  ],
  '/attendance': [ // Corresponds to the ATTENDANCE top link
    { href: "#", icon: "event_available", label: "Time Logs" },
    { href: "#", icon: "event_note", label: "Leave Requests" },
    // Add other attendance-related links
  ],
  // ... continue for other top-level links like '/payroll', '/reports', etc.
};
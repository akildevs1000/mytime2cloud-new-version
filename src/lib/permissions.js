export const PERMISSION_TYPES = [
    { key: 'access', label: 'Access' },
    { key: 'view', label: 'View' },
    { key: 'create', label: 'Create' },
    { key: 'edit', label: 'Edit' },
    { key: 'delete', label: 'Delete' },
];

export const modules = [
    { id: 'dashboard', title: 'Dashboard', desc: 'Real-time overview of key metrics and stats.', icon: 'dashboard', color: 'indigo' },
    { id: 'employees', title: 'Employees', desc: 'Manage staff records, profiles, and roles.', icon: 'person', color: 'blue' },
    { id: 'attendance', title: 'Attendance', desc: 'Track daily clock-ins, shifts, and leave requests.', icon: 'schedule', color: 'emerald' },
    { id: 'payroll', title: 'Payroll', desc: 'Process salaries, bonuses, and tax deductions.', icon: 'payments', color: 'amber' },
    { id: 'report', title: 'Reports', desc: 'Generate insightful data exports and summaries.', icon: 'assessment', color: 'cyan' },
    { id: 'settings', title: 'Settings', desc: 'Configure system preferences and permissions.', icon: 'admin_panel_settings', color: 'rose' },
];

export const active_module = {
    dashboard: true,
    employees: true,
    attendance: true,
    payroll: true,
    report: true,
    settings: true,
}

export const card_content = {
    dashboard: {
        title: "Dashboard",
        desc: "Dashboard overview and quick insights",
        sub_modules: [
            {
                id: "dashboard",
                title: "Dashboard",
                desc: "Dashboard",
                icon: "dashboard",
            },
        ],
    },

    employees: {
        title: "Employees",
        desc: "Manage employee information and activities",
        sub_modules: [
            {
                id: "employee_directory",
                title: "Employee Directory",
                desc: "Personal profiles & contact info",
                icon: "people_outline",
            },
            {
                id: "time_tracking",
                title: "Time Tracking",
                desc: "Daily logs and attendance correction",
                icon: "timer",
            },
            {
                id: "company_reports",
                title: "Company Reports",
                desc: "Financial and operational analytics",
                icon: "analytics",
            },
        ],
    },

    attendance: {
        title: "Attendance",
        desc: "Track and manage employee attendance",
        sub_modules: [
            {
                id: "mark_attendance",
                title: "Mark Attendance",
                desc: "Employee check-in / check-out",
                icon: "how_to_reg",
            },
            {
                id: "attendance_corrections",
                title: "Attendance Corrections",
                desc: "Edit and approve attendance",
                icon: "edit_calendar",
            },
            {
                id: "attendance_reports",
                title: "Attendance Reports",
                desc: "Attendance analytics",
                icon: "analytics",
            },
        ],
    },

    payroll: {
        title: "Payroll",
        desc: "Salary processing and payroll management",
        sub_modules: [
            {
                id: "salary_processing",
                title: "Salary Processing",
                desc: "Generate and process salaries",
                icon: "payments",
            },
            {
                id: "payslips",
                title: "Payslips",
                desc: "Employee payslips",
                icon: "receipt_long",
            },
            {
                id: "payroll_reports",
                title: "Payroll Reports",
                desc: "Payroll analytics",
                icon: "analytics",
            },
        ],
    },

    report: {
        title: "Reports",
        desc: "Company-wide analytics and reports",
        sub_modules: [
            {
                id: "employee_reports",
                title: "Employee Reports",
                desc: "Employee performance & stats",
                icon: "people_outline",
            },
            {
                id: "attendance_reports",
                title: "Attendance Reports",
                desc: "Attendance analytics",
                icon: "analytics",
            },
            {
                id: "finance_reports",
                title: "Finance Reports",
                desc: "Financial insights",
                icon: "bar_chart",
            },
        ],
    },

    settings: {
        title: "Settings",
        desc: "Application and system configurations",
        sub_modules: [
            {
                id: "role_management",
                title: "Role Management",
                desc: "Manage roles & permissions",
                icon: "admin_panel_settings",
            },
            {
                id: "user_management",
                title: "User Management",
                desc: "Manage users",
                icon: "manage_accounts",
            },
            {
                id: "system_settings",
                title: "System Settings",
                desc: "Application configurations",
                icon: "settings",
            },
        ],
    },
};

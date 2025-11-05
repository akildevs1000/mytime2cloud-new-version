const setStatusLabel = (status) => {
    const statuses = {
        A: "Absent",
        P: "Present",
        M: "Missed",
        LC: "Present",
        EG: "Present",
        O: "Week Off",
        L: "Leave",
        H: "Holiday",
        V: "Vacation",
    };
    return statuses[status];
};

const getBgColor = (status) => {
    const colors = {
        A: "#dc2626", // light orange
        P: "#bbf7d0", // light green
        M: "#e5e7eb", // light gray
        LC: "#bbf7d0",
        EG: "#bbf7d0",
        O: "#fed7aa",
        L: "#fef08a", // light yellow
        H: "#c7d2fe", // light indigo
        V: "#c7d2fe",
    };
    return colors[status] || "#f3f4f6";
};

const getTextColor = (status) => {
    const colors = {
        A: "#fee2e2", // dark orange
        P: "#15803d", // dark green
        M: "#374151", // dark gray
        LC: "#15803d",
        EG: "#15803d",
        O: "#c2410c",
        L: "#854d0e", // dark yellow-brown
        H: "#3730a3", // dark indigo
        V: "#3730a3",
    };
    return colors[status] || "#111827";
};


export default (shiftTypeId) => {
    // Base columns
    const columns = [
        {
            key: "name",
            header: "Name",
            render: ({ employee }) => (
                <div className="flex items-center space-x-3">
                    <img
                        alt={employee.full_name}
                        className="w-10 h-10 rounded-full object-cover shadow-sm"
                        src={
                            employee.profile_picture ||
                            `https://placehold.co/40x40/6946dd/ffffff?text=${employee.full_name.charAt(0)}`
                        }
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/40x40/6946dd/ffffff?text=${employee.full_name.charAt(0)}`;
                        }}
                    />
                    <div>
                        <p className="font-medium text-gray-800">{employee.full_name}</p>
                        <p className="text-sm text-gray-500">{employee.designation?.title || employee.last_name}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "emp_device",
            header: "Emp Id / Device Id",
            render: ({ employee }) => (
                <>
                    <p className="text-gray-800">{employee.employee_id || "—"}</p>
                    <p className="text-sm text-gray-500">Device ID: {employee.system_user_id || "—"}</p>
                </>
            ),
        },
        { key: "branch", header: "Branch", render: ({ employee }) => employee.branch?.branch_name || "N/A" },
        { key: "department", header: "Department", render: ({ employee }) => employee.department?.name || "N/A" },
        { key: "date", header: "Date", render: (log) => `${log?.date}` },
    ];

    // Define in/out columns
    const inOutColumns = [];
    const totalShifts = 7; // For example, 7 in/out pairs
    for (let i = 1; i <= totalShifts; i++) {
        inOutColumns.push({
            key: `in${i}`,
            header: `In${i}`,
            render: (log) => `${log[`in${i}`] || "—"}`,
        });
        inOutColumns.push({
            key: `out${i}`,
            header: `Out${i}`,
            render: (log) => `${log[`out${i}`] || "—"}`,
        });
    }

    // Other columns
    const otherColumns = [
        { key: "ot", header: "OT", render: (log) => `${log?.ot}` },
        { key: "total_hrs", header: "Total Hrs", render: (log) => `${log?.total_hrs}` },
        {
            key: "status",
            header: "Status",
            render: (log) => (
                <span
                    style={{
                        color: getTextColor(log?.status),
                        backgroundColor: getBgColor(log?.status),
                        padding: "4px 14px",
                        borderRadius: "50px",
                    }}
                >
                    {setStatusLabel(log?.status)}
                </span>
            ),
        },
    ];

    // If shiftTypeId == 2, use dynamic in/out columns
    return shiftTypeId == '2'
        ? [...columns, ...inOutColumns, ...otherColumns]
        : [
            ...columns,
            {
                key: "in",
                header: "In",
                render: (log) => `${log?.in}`,
            },
            {
                key: "out",
                header: "Out",
                render: (log) => `${log?.out}`,
            },
            {
                key: "late_coming",
                header: "Late In",
                render: (log) => `${log?.late_coming}`,
            },
            {
                key: "early_going",
                header: "Early Out",
                render: (log) => `${log?.early_going}`,
            },
            ...otherColumns,
        ];
};

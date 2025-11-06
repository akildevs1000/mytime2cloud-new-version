import { getBgColor, getTextColor, setStatusLabel } from "@/lib/utils";

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
                        <p className="font-medium text-gray-800 max-w-[150] truncate">{employee.display_name} {employee.employee_id}</p>
                        <p className="text-sm text-gray-500">{employee.branch?.branch_name}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "department", header: "Dept",
            render: ({ employee }) => (
                <p className="text-sm text-gray-500">{employee.department?.name}</p>
            ),
        },
        {
            key: "shift", header: "Shift",
            render: (log) => (

                <p className="text-sm text-gray-500">{log.shift?.name}</p>
            ),
        },
        {
            key: "date", header: "Date",
            render: (log) => (<p className="text-sm text-gray-500">{log.date}</p>)
        },

    ];

    // Define in/out columns
    const inOutColumns = [];
    const totalShifts = 7; // For example, 7 in/out pairs
    for (let i = 1; i <= totalShifts; i++) {
        inOutColumns.push({
            key: `in${i}`,
            header: `In${i}`,
            render: (log) => (<p className="text-sm text-gray-500">{`${log[`in${i}`] || "—"}`}</p>)

        });
        inOutColumns.push({
            key: `out${i}`,
            header: `Out${i}`,
            render: (log) => (<p className="text-sm text-gray-500">{`${log[`out${i}`] || "—"}`}</p>)
        });
    }

    // Other columns
    const otherColumns = [
        { key: "ot", header: "OT", render: (log) => (<p className="text-sm text-gray-500">{log.ot}</p>) },
        { key: "total_hrs", header: "Total Hrs", render: (log) => (<p className="text-sm text-gray-500">{log.total_hrs}</p>) },
        {
            key: "status",
            header: "Status",
            render: (log) => (
                <span className="text-sm"
                    style={{
                        color: getTextColor(log?.status),
                        backgroundColor: getBgColor(log?.status),
                        padding: "2px 10px",
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

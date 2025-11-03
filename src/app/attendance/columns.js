export default [
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
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/40x40/6946dd/ffffff?text=${employee.full_name.charAt(0)}`; }}
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
    { key: "date", header: "Date", render: (log) => `${log?.time} ${log?.date}` },
    { key: "device", header: "Device", render: (log) => log?.device?.name || "—" },
    {
        key: "type",
        header: "In/Out",
        render: (log) => {
            const type = log?.log_type === "Out" ? "text-red-600" : log?.log_type === "In" ? "text-green-600" : "text-gray-600";
            return <span className={type}>{log?.log_type || "—"}</span>;
        },
    },
];

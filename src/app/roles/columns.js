export default [
  {
    key: "employee",
    header: "Name",
    render: ({ employee }) => (
      <div
        onClick={() => handleRowClick(employee.id)}
        className="flex items-center space-x-3 cursor-pointer"
      >
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
          <p className="text-sm text-gray-500">
            {employee.designation?.title || employee.last_name}
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "emp_device",
    header: "Emp Id / Device Id",
    render: ({ employee }) => (
      <div onClick={() => handleRowClick(employee.id)} className="cursor-pointer">
        <p className="text-gray-800">{employee.employee_id || "—"}</p>
        <p className="text-sm text-gray-500">
          Device ID: {employee.system_user_id || "—"}
        </p>
      </div>
    ),
  },
  {
    key: "branch",
    header: "Branch",
    render: ({ employee }) => (
      <span
        onClick={() => handleRowClick(employee.id)}
        className="text-gray-800 cursor-pointer"
      >
        {employee.branch?.branch_name || "N/A"}
      </span>
    ),
  },
  {
    key: "department",
    header: "Department",
    render: ({ employee }) => {
      return (<span
        onClick={() => handleRowClick(employee.id)}
        className="text-gray-800 cursor-pointer"
      >
        {employee.department?.name || "N/A"}
      </span >)
    }
    ,
  },
  {
    key: "datetime",
    header: "Date",
    render: (log) => (
      <span
        onClick={() => handleRowClick(log.employee.id)}
        className="text-gray-800 cursor-pointer"
      >
        {log?.time} {log?.date}
      </span>
    ),
  },
  {
    key: "device",
    header: "Device",
    render: (log) => (
      <span
        onClick={() => handleRowClick(log.employee.id)}
        className="text-gray-800 cursor-pointer"
      >
        {log?.device?.name || "—"}
      </span>
    ),
  },
  {
    key: "type",
    header: "In/Out",
    render: (log) => {
      const typeClass =
        log?.log_type === "Out"
          ? "text-red-600"
          : log?.log_type === "In"
            ? "text-green-600"
            : "text-gray-600";
      return (
        <span
          onClick={() => handleRowClick(log.employee.id)}
          className={`font-medium cursor-pointer ${typeClass}`}
        >
          {log?.log_type || "—"}
        </span>
      );
    },
  },
  {
    key: "location",
    header: "Location",
    render: (log) => (
      <span
        onClick={() => handleRowClick(log.employee.id)}
        className="text-gray-800 cursor-pointer"
      >
        {log?.device?.location || "—"}
      </span>
    ),
  },
];

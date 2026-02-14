import ProfilePicture from "@/components/ProfilePicture";

export default [
  {
    key: "employee",
    header: "Personnel",
    render: ({ employee }) => (
      <div className="flex items-center space-x-3">

        <ProfilePicture src={employee.profile_picture} />

        <div>
          <p className="font-medium text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">{employee?.first_name}</p>
          <p className="text-sm text-gray-500">
            ID: {employee.employee_id}
          </p>
        </div>
      </div>
    ),
  },

  {
    key: "branch",
    header: "Branch / Department",
    render: ({ employee }) => (
      <p className="font-medium text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">{employee?.branch?.branch_name || "N/A"} / {employee?.department?.name || "N/A"}</p>
    ),
  },
  {
    key: "datetime",
    header: "Date Time",
    render: (log) => (
      <p className="font-medium text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">{log?.date} {log?.time} </p>
    ),
  },
  {
    key: "log_type",
    header: "Log Type",
    render: (log) => (
      <p className="font-medium text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">{log?.log_type || "—"}</p>
    ),
  },
  {
    key: "device",
    header: "Device",
    render: (log) => (
      <p className="font-medium text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">{log?.device?.name || "—"}</p>
    ),
  },

  {
    key: "location",
    header: "Location",
    render: (log) => (
      <p className="font-medium text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">{log?.device?.location || "—"}</p>
    ),
  },
];

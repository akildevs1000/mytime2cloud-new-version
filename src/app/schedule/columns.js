// columns.js
import {
    MoreVertical,
    Pencil,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";


export default (handleRowClick) => {
    return [
        {
            key: "employee",
            header: "Name",
            render: (employee) => (

                <div className="flex items-center space-x-3" onClick={() => handleRowClick(employee)}>
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
            render: (employee) => (
                <>
                    <p onClick={() => handleRowClick(employee)} className="text-gray-800">{employee.employee_id || "—"}</p>
                    <p className="text-sm text-gray-500">
                        Device ID: {employee.system_user_id || "—"}
                    </p>
                </>
            ),
        },
        {
            key: "branch",
            header: "Branch",
            render: (employee) => (
                <p onClick={() => handleRowClick(employee)} className="text-gray-800">{employee.branch?.name || "N/A"}</p>
            ),
        },
        {
            key: "department",
            header: "Department",
            render: (employee) => (
                <p onClick={() => handleRowClick(employee)} className="text-gray-800">{employee.department?.name || "N/A"}</p>
            ),
        },
        {
            key: "mobile_email",
            header: "Mobile / Email",
            render: (employee) => (
                <div onClick={() => handleRowClick(employee)}>
                    <p className="text-gray-800">{employee.phone_number || "—"}</p>
                    <p className="text-sm text-gray-500">{employee.user?.email || "—"}</p>
                </div>
            ),
        },
        {
            key: "schedule_status",
            header: "Schedule",
            render: (employee) => (
                <div onClick={() => handleRowClick(employee)} className="flex flex-col text-gray-500">
                    {!employee.schedule?.shift && employee.schedule_all?.length > 0 ? (
                        <div className="text-red-500">Expired</div>
                    ) : (
                        <div>
                            {employee.schedule?.isAutoShift
                                ? "Auto"
                                : employee.schedule?.shift
                                    ? employee.schedule.shift.name
                                    : "---"}
                        </div>
                    )}

                    {employee.schedule?.from_date && (
                        <div className="text-sm text-gray-400" title="Schedule Date Range">
                            {employee.schedule.from_date} - {employee.schedule.to_date}
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: "schedule_count",
            header: "All Schedules",
            render: (employee) => (
                <div onClick={() => handleRowClick(employee)} className="flex flex-col text-gray-500">{employee.schedule_all.length}</div>
            ),
        },
        {
            key: "actions",
            header: "Actions",
            render: (employee) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <MoreVertical
                            className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-700 transition-colors"
                            title="More Options"
                        />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-30 bg-white shadow-md rounded-md py-1">
                        <DropdownMenuItem
                            onClick={() => console.log("Edit", employee.id)}
                            className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            <Pencil className="w-4 h-4 text-primary" /> <span className="text-primary">Edit</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ]
};

// columns.js
import {
    AlertCircle,
    Check,
    MoreVertical,
    Pencil,
    Trash,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import ProfilePicture from "@/components/ProfilePicture";


export default (deleteItem) => {
    return [
        {
            key: "employee",
            header: "Personnel",
            render: (e) => (
                <div className="flex items-center space-x-3" onClick={() => handleRowClick(e)}>

                    <ProfilePicture src={e.profile_picture} />

                    <div>
                        <p className="font-medium text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">{e?.first_name}</p>
                        <p className="text-sm text-gray-500">
                            ID: {e.employee_id}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            key: "branch",
            header: "Branch / Dept",
            render: (e) => (
                <p onClick={() => handleRowClick(e)} className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">
                    {e.branch?.branch_name || "N/A"} / {e.department?.name || "N/A"}
                </p>
            ),
        },

        {
            key: "schedule_status",
            header: "Active Interval",
            render: (e) => (
                <div onClick={() => handleRowClick(e)} className="flex flex-col text-slate-500 dark:text-slate-400">
                    {!e.schedule?.shift && e.schedule_all?.length > 0 ? (
                        <div className="text-slate-500 dark:text-slate-400 text-sm">Expired</div>
                    ) : (
                        <div>
                            {e.schedule?.isAutoShift
                                ? "Auto"
                                : e.schedule?.shift
                                    ? e.schedule.shift.name
                                    : "---"}
                        </div>
                    )}

                    {e.schedule?.from_date && (
                        <div className="text-sm text-gray-400" title="Schedule Date Range">
                            {e.schedule.from_date} - {e.schedule.to_date}
                        </div>
                    )}
                </div>
            ),
        },

        {
            key: "status",
            header: "Status",
            render: (e) => (
                <div className="flex flex-col text-slate-500 dark:text-slate-400">
                    {!e.schedule?.shift && e.schedule_all?.length > 0 ? (
                        <div className="  dark:text-slate-400 text-sm"><AlertCircle className="text-red-700" /></div>
                    ) : (
                        <div>
                            <Check className="text-green-500" />
                        </div>
                    )}
                </div>
            ),
        },

        // {
        //     key: "schedule_count",
        //     header: "All Schedules",
        //     render: (e) => (
        //         <div onClick={() => handleRowClick(e)} className="flex flex-col text-gray-500">{e.schedule_all.length}</div>
        //     ),
        // },
        {
            key: "actions",
            header: "Actions",
            render: (employee) => (
                <DropdownMenu>
                    <DropdownMenuTrigger
                        asChild
                        /* This prevents the dropdown trigger itself from triggering the row click */
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-2 rounded-full cursor-pointer w-fit">
                            <MoreVertical className="w-5 h-5 text-gray-400" />
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        className="w-32 bg-white dark:bg-gray-900 shadow-md rounded-md py-1"
                        /* This prevents clicking inside the menu from triggering the row click */
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation(); // Stop row redirect
                                deleteItem(employee.employee_id);
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        >
                            <Trash className="w-4 h-4 text-red-500" />
                            <span className="text-red-500 font-medium">Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ]
};

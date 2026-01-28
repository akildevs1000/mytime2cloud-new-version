// columns.js
import {
    AlertCircle,
    Check,
    MoreVertical,
    Pencil,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { getRandomItem } from "@/lib/utils";


export default (handleRowClick) => {

    return [

        {
            key: "name",
            header: "Announcement",

            render: (e) => {

                // Use the helper: pass the array and the unique ID
                const randomMsg = getRandomItem([
                    "Please remember to clock out for lunch breaks.",
                    "Holiday shift schedule is now posted.",
                    "Reminder: Submit overtime requests by Thursday.",
                    "New: Geo-fencing enabled for mobile clock-ins.",
                    "System Maintenance: Punch-in portal offline at 11 PM.",
                    "Late arrival grace period reduced to 5 minutes.",
                ]);

                return (
                    <p
                        onClick={() => handleRowClick(e)}
                        className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono cursor-pointer hover:text-primary transition-colors"
                    >
                        {randomMsg}
                    </p>
                );
            },

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
            key: "employee",
            header: "Author",
            render: (e) => (

                <div className="flex items-center space-x-3" onClick={() => handleRowClick(e)}>
                    <img
                        alt={e.first_name}
                        className="w-10 h-10 rounded-full object-cover shadow-sm"
                        src={
                            e.profile_picture ||
                            `https://placehold.co/40x40/6946dd/ffffff?text=${e?.first_name.charAt(0)}`
                        }
                    // onError={(e) => {
                    //     e.target.onerror = null;
                    //     e.target.src = `https://placehold.co/40x40/6946dd/ffffff?text=${e?.first_name.charAt(0)}`;
                    // }}
                    />
                    <div>
                        <p className="font-medium text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">{e?.first_name}</p>
                        <p className="text-sm text-gray-500">
                            {e?.department?.name}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            key: "created_at",
            header: "Date Posted",
            render: (e) => (
                <p onClick={() => handleRowClick(e)} className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">
                    {e.created_at || "N/A"}
                </p>
            ),
        },
        {
            key: "status",
            header: "Status",
            render: (emp) => {
                // 1. Define the status options with their specific Tailwind classes
                const statusConfig = {
                    Published: {
                        container: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300 dark:border-green-500/50 dark:shadow-[0_0_8px_rgba(34,197,94,0.15)]",
                        dot: "bg-green-600 dark:bg-green-400 dark:shadow-[0_0_5px_#4ade80]"
                    },
                    Scheduled: {
                        container: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/50 dark:shadow-[0_0_8px_rgba(59,130,246,0.15)]",
                        dot: "bg-blue-600 dark:bg-blue-400 dark:shadow-[0_0_5px_#60a5fa]"
                    },
                    Draft: {
                        container: "bg-slate-100 text-slate-700 dark:bg-slate-700/30 dark:text-slate-400 dark:border-slate-600/50",
                        dot: "bg-slate-500 dark:bg-slate-500"
                    }
                };

                const statusKeys = Object.keys(statusConfig);

                // 2. Deterministic selection: ensures status stays the same for each employee 
                // during re-renders (like when clicking checkboxes).
                const charSum = emp.id.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                const selectedStatus = statusKeys[charSum % statusKeys.length];
                const style = statusConfig[selectedStatus];

                return (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium dark:border ${style.container}`}>
                        <span className={`size-1.5 rounded-full ${style.dot}`}></span>
                        {selectedStatus}
                    </span>
                );
            }
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

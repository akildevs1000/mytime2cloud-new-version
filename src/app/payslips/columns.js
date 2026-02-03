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
            header: "Employee",
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
            key: "branch",
            header: "Branch / Dept",
            render: (e) => (
                <p onClick={() => handleRowClick(e)} className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">
                    {e.branch?.branch_name || "N/A"} / {e.department?.name || "N/A"}
                </p>
            ),
        },

        {
            key: "basic_salary",
            header: "Basic Salary",
            render: (e) => (
                <p onClick={() => handleRowClick(e)} className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">
                    {e.basic_salary || "N/A"}
                </p>
            ),
        },

        {
            key: "net_salary",
            header: "Net Salary",
            render: (e) => (
                <p onClick={() => handleRowClick(e)} className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">
                    {e.net_salary || "N/A"}
                </p>
            ),
        },

        {
            key: "payslip",
            header: "Payslip",
            render: (e) => (
                <p onClick={() => handleRowClick(e)} className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">
                    {e.payslip || "N/A"}
                </p>
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

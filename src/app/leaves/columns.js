// columns.js
import {
  ScanFace,
  QrCode,
  Fingerprint,
  Hand,
  Lock,
  MoreVertical,
  Pencil,
  Trash
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { getRandomItem } from "@/lib/utils";

export default (deleteEmployee) => [
  {
    key: "employee",
    header: "Name",
    render: (employee) => (
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            alt={employee.full_name}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-700 shadow-sm"
            src={
              employee.profile_picture ||
              `https://placehold.co/40x40/6946dd/ffffff?text=${employee.full_name.charAt(0)}`
            }
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/40x40/6946dd/ffffff?text=${employee.full_name.charAt(0)}`;
            }} />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
        </div>
        <div>
          <div className="font-medium text-slate-800 dark:text-slate-100">
            {employee.full_name}
          </div>
          <div className="text-xs text-slate-400">
            {employee.designation?.title || employee.last_name}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "leave_type",
    header: "Leave Type",
    render: (employee) => (
      <div className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">
        {getRandomItem(["CL", "SL", "AL"])}
      </div>
    ),
  },

  {
    key: "from",
    header: "From",
    render: (employee) => (
      <div className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">
        {getRandomItem(["12 Feb 2025", "13 Feb 2025", "14 Feb 2025", "15 Feb 2025", "16 Feb 2025"])}
      </div>
    ),
  },

  {
    key: "to",
    header: "To",
    render: (employee) => (
      <div className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">
        {getRandomItem(["17 Feb 2025", "18 Feb 2025", "19 Feb 2025", "20 Feb 2025", "21 Feb 2025"])}
      </div>
    ),
  },

  {
    key: "days",
    header: "Days",
    render: (employee) => (
      <div className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">
        {getRandomItem([2, 3, 4, 5, 6, 7, 8, 9])}
      </div>
    ),
  },


  {
    key: "actions",
    header: "Actions",
    render: (employee) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreVertical className="w-5 h-5 text-gray-400 hover:text-gray-700 cursor-pointer" title="More Options" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-30 bg-white shadow-md rounded-md py-1">
          <DropdownMenuItem
            onClick={() => console.log("Edit", employee.id)}
            className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Pencil className="w-4 h-4 text-primary" /> <span className="text-primary">Edit</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => deleteEmployee(employee.id)}
            className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Trash className="w-4 h-4 text-gray-500" /> <span className="text-gray-500">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

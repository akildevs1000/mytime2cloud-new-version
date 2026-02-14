// columns.js
import { MoreVertical, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const safe = (v, fallback = "—") => (v === null || v === undefined || v === "" ? fallback : v);

export default function (handleRowClick, onEdit, onDelete) {
  return [
    {
      key: "name",
      header: "Shift Name",
      render: (shift) => (
        <p onClick={() => handleRowClick(shift)} className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">
          {safe(shift?.name)}
        </p>
      ),
    },
    {
      key: "shift_type",
      header: "Type",
      render: (shift) => (
        <p onClick={() => handleRowClick(shift)} className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">
          {safe(shift?.shift_type?.name)}
        </p>
      ),
    },
    {
      key: "duty",
      header: "On / Off Duty",
      render: (shift) => (
        <p onClick={() => handleRowClick(shift)} className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">
          {safe(shift?.on_duty_time)}{shift?.off_duty_time ? " - " : ""}{safe(shift?.off_duty_time, "")}
          {
            shift.shift_type_id == 5 ? <>
              <br />
              {safe(shift?.on_duty_time1)}{shift?.off_duty_time1 ? " - " : ""}{safe(shift?.off_duty_time1, "")}
            </>
              : null
          }
        </p>
      ),
    },
    {
      key: "working_hours",
      header: "Total Hrs",
      render: (shift) => (
        <p onClick={() => handleRowClick(shift)} className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">
          {safe(shift?.working_hours, "")}
        </p>
      ),
    },
    {
      key: "break_duration",
      header: "Auto-Deduct Break",
      render: (shift) => (
        <p onClick={() => handleRowClick(shift)} className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">
          {safe(shift?.break_duration, "")}
        </p>
      ),
    },
    // {
    //   key: "weekoff_rules",
    //   header: "Weekoff Config",
    //   render: (shift) => (
    //     <div onClick={() => handleRowClick(shift)} className="flex items-center gap-1 flex-nowrap whitespace-nowrap hidden xl:flex cursor-pointer">
    //       <span className="text-sm text-slate-400 mr-1">{safe(shift?.weekoff_rules?.type, "")}: </span>
    //       {shift?.weekoff_rules?.days?.map((day, i) => (
    //         <span key={i} className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-medium border border-slate-200 dark:border-slate-700 shrink-0">
    //           {day}
    //         </span>
    //       ))}
    //     </div>
    //   ),
    // },
    {
      key: "auto",
      header: "Auto Shift",
      render: (shift) => (
        <p onClick={() => handleRowClick(shift)} className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">
          {shift?.isAutoShift ? "Yes" : "No"}
        </p>
      ),
    },
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
                onEdit(employee.id)
              }}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <Pencil className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">Edit</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation(); // Stop row redirect
                onDelete(employee.id);
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
  ];
}

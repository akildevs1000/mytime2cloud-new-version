// columns.js
import { MoreVertical, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const safe = (v, fallback = "—") => (v === null || v === undefined || v === "" ? fallback : v);

export default function(handleRowClick, onEdit, onDelete) {
  return [
    {
      key: "name",
      header: "Shift Name",
      render: (shift) => (
        <p onClick={() => handleRowClick(shift)} className="text-gray-800">
          {safe(shift?.name)}
        </p>
      ),
    },
    {
      key: "shift_type",
      header: "Type",
      render: (shift) => (
        <p onClick={() => handleRowClick(shift)} className="text-gray-800">
          {safe(shift?.shift_type?.name)}
        </p>
      ),
    },
    {
      key: "duty",
      header: "On / Off Duty",
      render: (shift) => (
        <p onClick={() => handleRowClick(shift)} className="text-gray-800">
          {safe(shift?.on_duty_time)}{shift?.off_duty_time ? " - " : ""}{safe(shift?.off_duty_time, "")}
        </p>
      ),
    },
    {
      key: "auto",
      header: "Auto Shift",
      render: (shift) => (
        <p onClick={() => handleRowClick(shift)} className="text-gray-800">
          {shift?.isAutoShift ? "Yes" : "No"}
        </p>
      ),
    },
    {
      key: "halfday",
      header: "Halfday",
      render: (shift) => (
        <p onClick={() => handleRowClick(shift)} className="text-gray-800">
          {safe(shift?.halfday)}
        </p>
      ),
    },
    {
      key: "halfday_working_hours",
      header: "Halfday Hours",
      render: (shift) => (
        <p onClick={() => handleRowClick(shift)} className="text-gray-800">
          {safe(shift?.halfday_working_hours)}
        </p>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (shift) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical
              className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-700 transition-colors"
              title="More Options"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-32 bg-white shadow-md rounded-md py-1">
            <DropdownMenuItem
              onClick={() => (onEdit ? onEdit(shift) : handleRowClick(shift))}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <Pencil className="w-4 h-4 text-primary" />
              <span className="text-primary">Edit</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onDelete && onDelete(shift.id)}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <Trash className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}

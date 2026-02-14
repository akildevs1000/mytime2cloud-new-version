import { AlarmClock, MoreVertical, Pencil, Trash, } from "lucide-react";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function Columns(deleteEmployee, editEmployee) {

  return [
    {
      key: "branch",
      header: "Branch",
      render: (device) => (
        <span
          className="text-slate-500 dark:text-slate-400 cursor-pointer block max-w-[150px] truncate"
          title={device.name || "—"}

        >
          {device.branch?.branch_name || "—"}
        </span>
      ),
    },
    {
      key: "name",
      header: "Name",
      render: (device) => (
        <span
          className="text-slate-500 dark:text-slate-400 cursor-pointer block max-w-[150px] truncate"
          title={device.name || "—"}

        >
          {device.name || "—"} - {device.device_id || "—"}
        </span>
      ),
    },
   
    {
      key: "function",
      header: "Function",
      render: (device) => (
        <span
          className="text-slate-500 dark:text-slate-400 cursor-pointer block max-w-[100px] truncate"
          title={device.function || "—"}

        >
          {device.function || "—"}
        </span>
      ),
    },
    
    {
      key: "door_open",
      header: "Door Open",
      render: (device) => (
        <span
          title={device.door_open || "—"}
          onClick={() => console.log(device.id)}
        >
          <img src="/icons/door_open.png" className="w-7" />
        </span>
      ),
    },
    {
      key: "door_close",
      header: "Door Close",
      render: (device) => (
        <span
          title={device.door_close || "—"}
          onClick={() => console.log(device.id)}
        >
          <img src="/icons/door_close.png" className="w-7" />
        </span>
      ),
    },
    {
      key: "always_open",
      header: "Always Open",
      render: (device) => (
        <span
          title={device.always_open ? "Yes" : "No"}
          onClick={() => console.log(device.id)}
          className="inline-block"
        >
          <img
            src="/icons/always_open.png"
            alt={device.always_open ? "Yes" : "No"}
            className="w-7" // small size
          />
        </span>
      ),
    }
    ,
    {
      key: "alarm",
      header: "Alarm",
      render: (device) => (
        <span className="text-center text-slate-500 dark:text-slate-400">
          <AlarmClock size={25} />
        </span>
      ),
    },
    {
      key: "sync_date_time",
      header: "Time Sync",
      render: (device) => (
        <span
          className="text-slate-500 dark:text-slate-400 cursor-pointer block max-w-[150px] truncate"
          title={device.sync_date_time || "—"}
          onClick={() => console.log(device.id)}
        >
          <img src="/icons/sync_date_time.png" className="w-7" />

        </span>
      ),
    },
    {
      key: "status_id",
      header: "Status",
      render: (device) => {
        const isActive = device.status_id == 1;

        return (
          <div className="flex items-center justify-center space-x-2">
            <img
              src={`/icons/device_status_${isActive ? 'open' : 'close'}.png`}
              alt={isActive ? "Active" : "Inactive"}
              className="w-7 h-7 object-contain"
            />
          </div>
        );
      },
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
                editEmployee(employee.id)
              }}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <Pencil className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">Edit</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation(); // Stop row redirect
                deleteEmployee(employee.id);
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

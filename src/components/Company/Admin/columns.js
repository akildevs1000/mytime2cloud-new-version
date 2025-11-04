import { useState } from "react";
import { AlarmClock, MoreVertical, PenBox, Trash2 } from "lucide-react";


export default (handleRowClick) => [
  {
    key: "name",
    header: "Name",
    render: (admin) => (
      <span
        className="text-gray-800 cursor-pointer block max-w-[150px] truncate"
        title={admin.name || "—"}
        onClick={() => handleRowClick(admin.id)}
      >
        {admin.name || "—"}
      </span>
    ),
  },
  {
    key: "email",
    header: "Email",
    render: (admin) => (
      <span
        className="text-gray-800 cursor-pointer block max-w-[150px] truncate"
        title={admin.email || "—"}
        onClick={() => handleRowClick(admin.id)}
      >
        {admin.email || "—"}
      </span>
    ),
  },
  {
    key: "role",
    header: "Role",
    render: (admin) => (
      <span
        className="text-gray-800 cursor-pointer block max-w-[150px] truncate"
        title={admin.role?.name || "—"}
        onClick={() => handleRowClick(admin.id)}
      >
        {admin.role?.name || "—"}
      </span>
    ),
  },
  {
    key: "options",
    header: "Options",
    render: (device) => {
      const [open, setOpen] = useState(false);

      return (
        <div className="relative">
          {/* Three dots button */}
          <MoreVertical className="text-gray-600 hover:text-gray-800" onClick={() => setOpen(!open)} />

          {/* Dropdown menu */}
          {open && (
            <div className="absolute mt-2 w-24 bg-white border rounded shadow-lg z-10">
              <button
                onClick={() => {
                  editDevice(device.id);
                  setOpen(false);
                }}
                className="flex items-center gap-2 text-sm w-full text-left px-3 py-2 hover:bg-gray-100 text-gray-600"
              >
                <PenBox size={14} /> Edit
              </button>
              <button
                onClick={() => {
                  deleteDevice(device.id);
                  setOpen(false);
                }}
                className="flex items-center gap-2 w-full text-sm text-left px-3 py-2 hover:bg-gray-100 text-gray-600"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>
      );
    },
  },
];

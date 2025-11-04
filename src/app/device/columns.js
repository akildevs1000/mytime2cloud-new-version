import { useState } from "react";
import { AlarmClock, MoreVertical, PenBox, Trash2 } from "lucide-react";


export default (handleRowClick) => [
  {
    key: "name",
    header: "Name",
    render: (device) => (
      <span
        className="text-gray-800 cursor-pointer block max-w-[150px] truncate"
        title={device.name || "—"}
        onClick={() => handleRowClick(device.id)}
      >
        {device.name || "—"}
      </span>
    ),
  },
  {
    key: "utc_time_zone",
    header: "Time zone",
    render: (device) => (
      <span
        className="text-gray-800 cursor-pointer block max-w-[100px] truncate"
        title={device.utc_time_zone || "—"}
        onClick={() => handleRowClick(device.id)}
      >
        {device.utc_time_zone || "—"}
      </span>
    ),
  },
  {
    key: "device_id",
    header: "Serial Number",
    render: (device) => (
      <span
        className="text-gray-800 cursor-pointer block max-w-[120px] truncate"
        title={device.device_id || "—"}
        onClick={() => handleRowClick(device.id)}
      >
        {device.device_id || "—"}
      </span>
    ),
  },
  {
    key: "function",
    header: "Function",
    render: (device) => (
      <span
        className="text-gray-800 cursor-pointer block max-w-[100px] truncate"
        title={device.function || "—"}
        onClick={() => handleRowClick(device.id)}
      >
        {device.function || "—"}
      </span>
    ),
  },
  {
    key: "device_type",
    header: "Type",
    render: (device) => (
      <span
        className="text-gray-800 cursor-pointer block max-w-[100px] truncate"
        title={device.device_type || "—"}
        onClick={() => handleRowClick(device.id)}
      >
        {device.device_type || "—"}
      </span>
    ),
  },
  {
    key: "door_open",
    header: "Door Open",
    render: (device) => (
      <span
        title={device.door_open || "—"}
        onClick={() => handleRowClick(device.id)}
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
        onClick={() => handleRowClick(device.id)}
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
        onClick={() => handleRowClick(device.id)}
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
      <span className="text-center text-gray-800">
        <AlarmClock size={25} />
      </span>
    ),
  },
  {
    key: "sync_date_time",
    header: "Time Sync",
    render: (device) => (
      <span
        className="text-gray-800 cursor-pointer block max-w-[150px] truncate"
        title={device.sync_date_time || "—"}
        onClick={() => handleRowClick(device.id)}
      >
        <img src="/icons/sync_date_time.png" className="w-7" />

      </span>
    ),
  },
  {
    key: "status_id",
    header: "Status",
    render: (device) => (
      <span className="text-center text-gray-800 block max-w-[80px] truncate">
        <img src="/icons/device_status_open.png" className="w-7" />
        {/* <img src="/icons/device_status_close.png" /> */}
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

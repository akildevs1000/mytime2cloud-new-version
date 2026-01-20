import React from "react";
import { useDarkMode } from "@/context/DarkModeContext";

const feedData = [
  {
    id: "8842-A",
    name: "Sarah Jenkins",
    dept: "Marketing",
    location: "Main Lobby",
    method: "face",
    methodTitle: "Face Scan",
    time: "10:41:22",
    type: "Entry",
    punctuality: "On Time",
    punctualityColor: "text-emerald-600",
    punctualityDot: "bg-emerald-500",
    status: "Authorized",
    statusType: "success",
    initials: "MJ",
  },
  {
    id: "9931-B",
    name: "David Chen",
    dept: "IT Infra",
    location: "Server Room",
    method: "fingerprint",
    methodTitle: "Biometric",
    time: "10:38:45",
    type: "Entry",
    punctuality: "Late (+15m)",
    punctualityColor: "text-amber-600",
    punctualityDot: "bg-amber-500",
    status: "Flagged Late",
    statusType: "warning",
    initials: "MJ",
  },
  {
    id: "4421-C",
    name: "Elena Rodriguez",
    dept: "HR Dept",
    location: "West Wing",
    method: "badge",
    methodTitle: "Smart Card",
    time: "10:35:12",
    type: "Entry",
    punctuality: "Early (-10m)",
    punctualityColor: "text-cyan-600",
    punctualityDot: "bg-cyan-500",
    status: "Authorized",
    statusType: "success",
    initials: "MJ",
  },
  {
    id: "1102-X",
    name: "Michael Jones",
    dept: "Ops",
    location: "Load Bay",
    method: "nfc",
    methodTitle: "NFC Tag",
    time: "10:32:05",
    type: "Exit",
    punctuality: "On Time",
    punctualityColor: "text-emerald-600",
    punctualityDot: "bg-emerald-500",
    status: "Logged",
    statusType: "neutral",
    initials: "MJ",
  },
  {
    id: "1102-X",
    name: "Michael Jones",
    dept: "Ops",
    location: "Load Bay",
    method: "nfc",
    methodTitle: "NFC Tag",
    time: "10:32:05",
    type: "Exit",
    punctuality: "On Time",
    punctualityColor: "text-emerald-600",
    punctualityDot: "bg-emerald-500",
    status: "Logged",
    statusType: "neutral",
    initials: "MJ",
  },
  {
    id: "1102-X",
    name: "Michael Jones",
    dept: "Ops",
    location: "Load Bay",
    method: "nfc",
    methodTitle: "NFC Tag",
    time: "10:32:05",
    type: "Exit",
    punctuality: "On Time",
    punctualityColor: "text-emerald-600",
    punctualityDot: "bg-emerald-500",
    status: "Logged",
    statusType: "neutral",
    initials: "MJ",
  },
  {
    id: "1102-X",
    name: "Michael Jones",
    dept: "Ops",
    location: "Load Bay",
    method: "nfc",
    methodTitle: "NFC Tag",
    time: "10:32:05",
    type: "Exit",
    punctuality: "On Time",
    punctualityColor: "text-emerald-600",
    punctualityDot: "bg-emerald-500",
    status: "Logged",
    statusType: "neutral",
    initials: "MJ",
  },
  {
    id: "1102-X",
    name: "Michael Jones",
    dept: "Ops",
    location: "Load Bay",
    method: "nfc",
    methodTitle: "NFC Tag",
    time: "10:32:05",
    type: "Exit",
    punctuality: "On Time",
    punctualityColor: "text-emerald-600",
    punctualityDot: "bg-emerald-500",
    status: "Logged",
    statusType: "neutral",
    initials: "MJ",
  },
  {
    id: "1102-X",
    name: "Michael Jones",
    dept: "Ops",
    location: "Load Bay",
    method: "nfc",
    methodTitle: "NFC Tag",
    time: "10:32:05",
    type: "Exit",
    punctuality: "On Time",
    punctualityColor: "text-emerald-600",
    punctualityDot: "bg-emerald-500",
    status: "Logged",
    statusType: "neutral",
    initials: "MJ",
  },
];

function LiveFeed({ branch_id }) {
  const { isDark } = useDarkMode();

  // Helper to determine Status Badge Styles
  const getStatusStyles = (type) => {
    const themes = {
      success: isDark
        ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
        : "bg-emerald-50 border-emerald-200 text-emerald-600",
      warning: "bg-amber-500/5 border-amber-500/20 text-amber-400",
      neutral: isDark
        ? "bg-slate-500/50 border-slate-600/50 text-slate-100"
        : "bg-slate-100 border-slate-200 text-slate-500",
    };
    return themes[type] || themes.neutral;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
        <div className="flex items-center gap-3">
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <h3 className="text-base font-bold text-gray-600 dark:text-gray-300 font-display tracking-wide">
            Live Recognition Feed
          </h3>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-[11px] text-slate-400 font-mono">
            Refreshing in 5s...
          </span>
          <button className="text-xs font-bold text-primary hover:text-gray-600 dark:text-gray-300 transition-colors uppercase tracking-wider">
            View Full Log
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 px-6 py-3 border-y border-gray-200 dark:border-white/5 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-white/[0.02]">
        <div className="col-span-3 pl-2">Identity</div>
        <div className="col-span-1">Dept</div>
        <div className="col-span-2">Loc</div>
        <div className="col-span-1">Method</div>
        <div className="col-span-1">Time</div>
        <div className="col-span-2">Punctuality</div>
        <div className="col-span-2 text-right pr-2">Status</div>
      </div>

      {/* List Body */}
      <div className="flex-1 overflow-y-auto px-2">
        {feedData.map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-12 py-4 items-center cursor-pointer group gap-2 transition-colors hover:bg-slate-50 dark:hover:bg-white/5 ${
              index !== feedData.length - 1
                ? "border-b border-gray-100 dark:border-white/5"
                : ""
            }`}
          >
            {/* Identity */}
            <div className="col-span-3 flex items-center gap-3 pl-2">
              <div className="size-8 rounded-full bg-slate-200 overflow-hidden relative border border-slate-300 flex items-center justify-center">
                {item.img ? (
                  <img
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    src={`http://googleusercontent.com/profile/picture/${item.img}`}
                    alt={item.name}
                  />
                ) : (
                  <span className="text-xs font-bold text-slate-500">
                    {item.initials}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-600 dark:text-gray-300 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                  {item.name}
                </span>
                <span className="text-[9px] text-slate-500">ID: {item.id}</span>
              </div>
            </div>

            {/* Dept */}
            <div
              className="col-span-1 text-[11px] text-slate-500 truncate"
              title={item.dept}
            >
              {item.dept}
            </div>

            {/* Location */}
            <div
              className="col-span-2 text-[11px] text-slate-500 truncate"
              title={item.location}
            >
              {item.location}
            </div>

            {/* Method */}
            <div className="col-span-1 flex items-center text-slate-400">
              <span
                className="material-symbols-outlined text-[16px]"
                title={item.methodTitle}
              >
                {item.method}
              </span>
            </div>

            {/* Time */}
            <div className="col-span-1 text-[11px] font-mono text-slate-500">
              {item.time}
            </div>
           

            {/* Punctuality */}
            <div className="col-span-2">
              <span
                className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${item.punctualityColor}`}
              >
                <span
                  className={`size-1 rounded-full ${item.punctualityDot}`}
                ></span>
                {item.punctuality}
              </span>
            </div>

            {/* Status */}
            <div className="col-span-2 text-right pr-2">
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full font-medium text-[9px] border ${getStatusStyles(item.statusType)}`}
              >
                {item.statusType !== "neutral" && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${item.statusType === "success" ? "bg-emerald-500" : "bg-amber-500"}`}
                  ></span>
                )}
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveFeed;

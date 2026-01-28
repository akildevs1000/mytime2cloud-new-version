import React, { useState, useRef, useEffect } from "react";

import {
  Settings2,
  Contrast,
  PartyPopper,
  Hourglass,
  CircleDollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
const AttendanceRules = ({
  value = "",
  onChange = () => {},
  placeholder = "Select Time",
  width = "w-full",
}) => {
  const [validDays, setValidDays] = useState(["F", "S"]);
  const days = [
    { label: "M", full: "Monday" },
    { label: "T", full: "Tuesday" },
    { label: "W", full: "Wednesday" },
    { label: "T", full: "Thursday" },
    { label: "F", full: "Friday" },
    { label: "S", full: "Saturday" },
    { label: "S", full: "Sunday" },
  ];

  const toggleDay = (dayLabel) => {
    setValidDays((prev) =>
      prev.includes(dayLabel)
        ? prev.filter((d) => d !== dayLabel)
        : [...prev, dayLabel],
    );
  };

  return (
    <section className="space-y-4">
      {/* Header */}
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <Settings2 className="w-5 h-5 text-emerald-400" />
        Policies & Exceptions
      </h3>

      {/* Main Container */}
      <div className="dark:bg-[#1e293b]/50 border border-white/10 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm">
        {/* Row 1: Half Day */}
        <div className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors group">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-[200px]">
              <div className="size-9 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Contrast size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Half Day</p>
                <p className="text-xs text-slate-400">Weekly short duration</p>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select className="w-full rounded-lg bg-[#0f172a] border border-white/10 text-white text-sm p-2 outline-none focus:border-emerald-500">
                <option>Saturday</option>
                <option>Friday</option>
                <option>Sunday</option>
              </select>
              <input
                type="time"
                defaultValue="09:00"
                className="w-full rounded-lg bg-[#0f172a] border border-white/10 text-slate-300 text-sm p-2 outline-none"
              />
              <input
                type="time"
                defaultValue="13:00"
                className="w-full rounded-lg bg-[#0f172a] border border-white/10 text-slate-300 text-sm p-2 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Flexi-Holidays */}
        <div className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-[200px]">
              <div className="size-9 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <PartyPopper size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Flexi-Holidays
                </p>
                <p className="text-xs text-slate-400">Allowance & Validity</p>
              </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:items-center">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  defaultValue="2"
                  className="w-16 rounded-lg bg-[#0f172a] border border-white/10 text-white text-sm p-2 text-center outline-none"
                />
                <span className="text-sm text-slate-400">days /</span>
                <select className="w-28 rounded-lg bg-[#0f172a] border border-white/10 text-white text-sm p-2 outline-none">
                  <option>Monthly</option>
                  <option>Weekly</option>
                </select>
              </div>

              <div className="hidden lg:block w-px h-6 bg-white/10 mx-2"></div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  Valid on:
                </span>
                <div className="flex gap-1">
                  {days.map((day, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleDay(day.label)}
                      className={`size-7 flex items-center justify-center rounded border text-[10px] font-bold transition-all ${
                        validDays.includes(day.label)
                          ? "border-purple-500 bg-purple-500/20 text-purple-400"
                          : "border-white/10 bg-[#0f172a] text-slate-500 hover:border-slate-400"
                      }`}
                      title={day.full}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Late Threshold */}
        <div className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-[200px]">
              <div className="size-9 rounded bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <Hourglass size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Late Threshold
                </p>
                <p className="text-xs text-slate-400">
                  Action after grace period
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">After</span>
                <input
                  type="number"
                  defaultValue="15"
                  className="w-16 rounded-lg bg-[#0f172a] border border-white/10 text-white text-sm p-2 text-center outline-none"
                />
                <span className="text-sm text-slate-400">mins</span>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <span className="text-sm text-slate-400 whitespace-nowrap">
                  Mark as
                </span>
                <select className="w-full max-w-[200px] rounded-lg bg-[#0f172a] border border-white/10 text-white text-sm p-2 outline-none">
                  <option>Late In</option>
                  <option>Absent</option>
                  <option>Half Day</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Row 4: Overtime Rules */}
        <div className="p-4 hover:bg-white/5 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-[200px]">
              <div className="size-9 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CircleDollarSign size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Overtime Rules
                </p>
                <p className="text-xs text-slate-400">Eligible hours</p>
              </div>
            </div>

            <div className="flex-1 flex gap-3">
              {["Pre-shift", "After Duty"].map((label) => (
                <label
                  key={label}
                  className="flex-1 sm:flex-none cursor-pointer flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-[#0f172a] transition-all has-[:checked]:border-emerald-500/50 has-[:checked]:bg-emerald-500/10 group"
                >
                  <input type="checkbox" defaultChecked className="hidden" />
                  {label === "Pre-shift" ? (
                    <ChevronLeft
                      size={16}
                      className="text-slate-500 group-has-[:checked]:text-emerald-400"
                    />
                  ) : (
                    <ChevronRight
                      size={16}
                      className="text-slate-500 group-has-[:checked]:text-emerald-400"
                    />
                  )}
                  <span className="text-sm font-medium text-slate-300 group-has-[:checked]:text-white">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttendanceRules;

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
import TimePicker from "../ui/TimePicker";
import DropDown from "@/components/ui/DropDown";

const AttendanceRules = ({ schedule, handleChange }) => {
  const [validDays, setValidDays] = useState(["Fri", "Sat", "Sun"]);

  const [lateTimeMinutes, setLateTimeMinutes] = useState(15);

  const [preShift, setPreShiftShift] = useState(true);
  const [afterShift, setAfterShiftShift] = useState(true);
  const [selectedOverTimeType, setSelectedOverTimeType] = useState("");

  const days = [
    { label: "Mon", full: "Monday" },
    { label: "Tue", full: "Tuesday" },
    { label: "Wed", full: "Wednesday" },
    { label: "Thu", full: "Thursday" },
    { label: "Fri", full: "Friday" },
    { label: "Sat", full: "Saturday" },
    { label: "Sun", full: "Sunday" },
  ];

  const toggleDay = (dayLabel) => {
    setValidDays((prev) =>
      prev.includes(dayLabel)
        ? prev.filter((d) => d !== dayLabel)
        : [...prev, dayLabel],
    );
  };

  useEffect(() => {
    handleChange("late_time", `00:${lateTimeMinutes}`);
  }, [lateTimeMinutes]);

  useEffect(() => {
    handleChange("weekoff_days", validDays);
  }, [validDays]);

  useEffect(() => {
    if (preShift && afterShift) {
      setSelectedOverTimeType("Both");
    }
    else if (!preShift && !afterShift) {
      setSelectedOverTimeType("None");
    }

    else if (preShift) {
      setSelectedOverTimeType("BeforeDuty");
    }

    else if (afterShift) {
      setSelectedOverTimeType("AfterDuty");
    }
  }, [preShift, afterShift]);

  useEffect(() => {
    handleChange("overtime_type", selectedOverTimeType);
  }, [selectedOverTimeType]);

  return (
    <section className="space-y-4">
      {/* Header */}
      <h3 className="text-lg font-bold text-gray-600 dark:text-slate-300 flex items-center gap-2">
        <Settings2 className="w-5 h-5 " />
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
                <p className="text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Half Day
                </p>
                <p className="text-xs text-slate-400">Weekly short duration</p>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <DropDown
                items={[
                  { id: "Saturday", name: "Saturday" },
                  { id: "Friday", name: "Friday" },
                  { id: "Sunday", name: "Sunday" },
                ]}
                value={schedule.halfday}
                onChange={(id) => handleChange("halfday", id)}
                placeholder="Select Day"
                width="w-full"
              />
              <TimePicker
                defaultValue={schedule.halfday_in_time}
                onChange={(val) => handleChange("halfday_in_time", val)}
              />
              <TimePicker
                defaultValue={schedule.halfday_out_time}
                onChange={(val) => handleChange("halfday_out_time", val)}
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
                <p className="text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Week Off
                </p>
                <p className="text-xs text-slate-400">Allowance & Validity</p>
              </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:items-center">
              <div className="flex items-center gap-3">
                <div className="w-[200px]">
                  <DropDown
                    items={[
                      { id: "Fixed", name: "Fixed" },
                      { id: "Flexible", name: "Flexible" },
                    ]}
                    placeholder="Select Weekoff Type"
                    value={schedule.weekoff_type}
                    onChange={(e) => handleChange("weekoff_type", e)}
                  />
                </div>
                <input
                  value={schedule.weekoff_count || 0}
                  onChange={(e) => handleChange("weekoff_count", e)}
                  className="w-16 rounded-lg bg-white dark:bg-slate-900 border border-border text-gray-600 dark:text-slate-300 text-sm p-2 text-center outline-none"
                />

                <div className="flex gap-1">
                  {days.map((day, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleDay(day.label)}
                      className={`size-7 flex items-center justify-center rounded border text-[10px] font-bold transition-all ${
                        validDays.includes(day.label)
                          ? "border-purple-500 bg-purple-500/20 text-purple-400"
                          : "border-border text-slate-500 hover:border-slate-400"
                      }`}
                      title={day.full}
                    >
                      {day.label?.charAt(0)}
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
                <p className="text-sm font-semibold text-gray-600 dark:text-slate-300">
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
                  value={lateTimeMinutes || 15}
                  onChange={(e) => setLateTimeMinutes(e.target.value)}
                  className="w-16 rounded-lg bg-white dark:bg-slate-900 border border-border text-gray-600 dark:text-slate-300 text-sm p-2 text-center outline-none"
                />
                <span className="text-sm text-slate-400">mins</span>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <span className="text-sm text-slate-400 whitespace-nowrap">
                  Mark as
                </span>
                <div>
                  <DropDown
                    items={[
                      { id: "LC", name: "Late In" },
                      { id: "L", name: "Absent" },
                      { id: "HD", name: "Half Day" },
                    ]}
                    placeholder="Select Action"
                    value={schedule.attendance_status || 0}
                    onChange={(e) => handleChange("attendance_status", e)}
                  />
                </div>
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
                <p className="text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Overtime Rules
                </p>
                <p className="text-xs text-slate-400">Eligible hours</p>
              </div>
            </div>

            <div className="flex-1 flex gap-3">
              <label className="flex-1 sm:flex-none cursor-pointer flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-[#0f172a] transition-all has-[:checked]:border-emerald-500/50 has-[:checked]:bg-emerald-500/10 group">
                <input
                  value={preShift || false}
                  onChange={(e) => setPreShiftShift(!preShift)}
                  type="checkbox"
                  defaultChecked
                  className="hidden"
                />
                <ChevronLeft
                  size={16}
                  className="text-slate-500 group-has-[:checked]:text-emerald-400"
                />
                <span className="text-sm font-medium text-slate-300 group-has-[:checked]:text-gray-600 dark:text-slate-300">
                  Pre-shift
                </span>
              </label>

              <label className="flex-1 sm:flex-none cursor-pointer flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-[#0f172a] transition-all has-[:checked]:border-emerald-500/50 has-[:checked]:bg-emerald-500/10 group">
                <input
                  value={afterShift || false}
                  onChange={(e) => setAfterShiftShift(!afterShift)}
                  type="checkbox"
                  defaultChecked
                  className="hidden"
                />
                <ChevronRight
                  size={16}
                  className="text-slate-500 group-has-[:checked]:text-emerald-400"
                />
                <span className="text-sm font-medium text-slate-300 group-has-[:checked]:text-gray-600 dark:text-slate-300">
                  After Duty
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttendanceRules;

import React, { useState } from 'react';

const WorkingSchedule = () => {
  // Initial state for the 7 days of the week
  const [schedule, setSchedule] = useState([
    { day: "Monday", active: true, start: "09:00", end: "18:00" },
    { day: "Tuesday", active: true, start: "09:00", end: "18:00" },
    { day: "Wednesday", active: true, start: "09:00", end: "18:00" },
    { day: "Thursday", active: true, start: "09:00", end: "18:00" },
    { day: "Friday", active: true, start: "09:00", end: "17:00" },
    { day: "Saturday", active: false, start: "", end: "" },
    { day: "Sunday", active: false, start: "", end: "" },
  ]);

  const [weekendConfig, setWeekendConfig] = useState({
    off1: "Sunday",
    off2: "Saturday"
  });

  const toggleDay = (index) => {
    const newSchedule = [...schedule];
    newSchedule[index].active = !newSchedule[index].active;
    setSchedule(newSchedule);
  };

  const updateTime = (index, field, value) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    setSchedule(newSchedule);
  };

  return (
    <div className="mx-auto flex flex-col gap-8">
        
        {/* Standard Office Hours Section */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 relative overflow-hidden">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <span className="material-symbols-outlined">schedule</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Standard Office Hours</h2>
              <p className="text-sm text-slate-500">Configure your default weekly operations</p>
            </div>
          </div>

          <div className="space-y-1">
            {/* Header Labels */}
            <div className="grid grid-cols-12 gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
              <div className="col-span-4">Day</div>
              <div className="col-span-8 flex gap-4">
                <span className="w-1/2">Start Time</span>
                <span className="w-1/2">End Time</span>
              </div>
            </div>

            {/* Daily Rows */}
            {schedule.map((item, index) => (
              <div 
                key={item.day}
                className={`flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-4 p-4 rounded-xl transition-colors border border-transparent ${
                  item.active 
                  ? "bg-white/40 hover:bg-indigo-50/30 hover:border-indigo-100" 
                  : "bg-slate-50/50 hover:bg-slate-100/50"
                }`}
              >
                <div className="col-span-4 flex items-center gap-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={item.active}
                      onChange={() => toggleDay(index)}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                  <span className={`font-semibold ${item.active ? "text-slate-700" : "text-slate-400"}`}>
                    {item.day}
                  </span>
                </div>

                <div className={`col-span-8 flex gap-4 ${!item.active && "opacity-50 pointer-events-none"}`}>
                  <input
                    type="time"
                    className={`w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${!item.active ? "bg-slate-100" : "bg-white"}`}
                    value={item.start}
                    onChange={(e) => updateTime(index, 'start', e.target.value)}
                  />
                  <input
                    type="time"
                    className={`w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${!item.active ? "bg-slate-100" : "bg-white"}`}
                    value={item.end}
                    onChange={(e) => updateTime(index, 'end', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekend Configuration Section */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 relative overflow-hidden">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-red-50 text-red-500 rounded-xl">
              <span className="material-symbols-outlined">weekend</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Weekend Configuration</h2>
              <p className="text-sm text-slate-500">Define standard weekly time-off policies</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Weekly Off 1</label>
              <select 
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                value={weekendConfig.off1}
                onChange={(e) => setWeekendConfig({...weekendConfig, off1: e.target.value})}
              >
                <option>Saturday</option>
                <option>Sunday</option>
                <option>Monday</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Weekly Off 2</label>
              <select 
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                value={weekendConfig.off2}
                onChange={(e) => setWeekendConfig({...weekendConfig, off2: e.target.value})}
              >
                <option>Saturday</option>
                <option>Sunday</option>
                <option>None</option>
              </select>
            </div>
          </div>
        </div>

      </div>
  );
};

export default WorkingSchedule;
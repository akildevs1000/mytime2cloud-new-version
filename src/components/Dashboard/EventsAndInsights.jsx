import React, { useState, useMemo } from "react";

const MOCK_DATA = {
  Visitors: [
    {
      id: 1,
      event: "Unauthorized Access",
      location: "Server Room B",
      source: "Security AI",
      time: "10:41 AM",
      type: "error",
    },
    {
      id: 2,
      event: "Protocol Compliance",
      location: "Shift Change A",
      source: "Ops Monitor",
      time: "10:30 AM",
      type: "success",
    },
    {
      id: 3,
      event: "Capacity Warning",
      location: "Cafeteria Zone",
      source: "Crowd Sense",
      time: "10:15 AM",
      type: "warning",
    },
  ],
  Announcements: [
    {
      id: 4,
      event: "Town Hall Meeting",
      location: "Main Hall",
      source: "HR Dept",
      time: "09:00 AM",
      type: "info",
    },
  ],
  Holidays: [],
  Spotlight: [],
  Weather: [
    {
      id: 5,
      event: "Heavy Rain Alert",
      location: "External Parking",
      source: "Meteo Station",
      time: "08:45 AM",
      type: "warning",
    },
  ],
};

const TYPE_COLORS = {
  error: "bg-rose-500",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  info: "bg-blue-500",
};

function EventsAndInsights({ branch_id }) {
  const [activeTab, setActiveTab] = useState("Visitors");
  const tabs = [
    "Visitors",
    "Announcements",
    "Holidays",
    "Spotlight",
    "Weather",
  ];

  // In a real app, you might fetch data based on activeTab and branch_id
  const currentData = useMemo(() => MOCK_DATA[activeTab] || [], [activeTab]);

  return (
    <div className="flex flex-col h-full">
      {/* Header Section */}
      <div className="p-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-600 dark:text-gray-300 font-bold font-display flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-400">
              assistant
            </span>
            Insights & Events
          </h3>
          <button className="material-symbols-outlined text-slate-500 hover:text-gray-600 dark:text-gray-300 text-sm">
            more_vert
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-black/20 p-1 rounded-lg overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 px-3 text-[10px] font-bold rounded transition-all duration-200 outline-none focus:outline-none ${
                activeTab === tab
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm border border-white/5"
                  : "text-slate-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 relative flex flex-col min-h-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          {/* Table Header */}
          <div className="grid grid-cols-12 px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="col-span-6">Event</div>
            <div className="col-span-3">Source</div>
            <div className="col-span-3 text-right">Time</div>
          </div>

          {/* Table Body */}
          {currentData.length > 0 ? (
            currentData.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 items-center px-3 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors rounded-lg group cursor-pointer"
              >
                <div className="col-span-6 flex items-center gap-3">
                  <div
                    className={`size-2 shrink-0 rounded-full ${TYPE_COLORS[item.type] || "bg-slate-400"}`}
                  ></div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-gray-600 dark:text-gray-300 truncate">
                      {item.event}
                    </p>
                    <p className="text-[9px] text-slate-500 truncate">
                      {item.location}
                    </p>
                  </div>
                </div>
                <div className="col-span-3 text-[10px] text-gray-600 dark:text-gray-300 truncate">
                  {item.source}
                </div>
                <div className="col-span-3 text-right">
                  <span className="text-[10px] font-mono text-gray-600 dark:text-gray-300">
                    {item.time}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 opacity-50">
              <span className="material-symbols-outlined text-4xl mb-2">
                inbox
              </span>
              <p className="text-[10px] font-bold uppercase tracking-widest">
                No Events Found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsAndInsights;

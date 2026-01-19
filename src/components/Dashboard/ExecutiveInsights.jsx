function ExecutiveInsights({}) {
  return (
    <>
      <div className="p-4 border-b border-slate-200 bg-white/40">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-500">
              insights
            </span>
            Executive Insights
          </h3>
          <button className="material-symbols-outlined text-slate-400 hover:text-slate-800 text-sm">
            more_vert
          </button>
        </div>
        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg overflow-x-auto no-scrollbar">
          <button className="flex-shrink-0 px-3 py-1.5 text-[10px] font-bold rounded text-slate-500 hover:text-slate-700 hover:bg-white/50 transition-colors whitespace-nowrap">
            Alerts
          </button>
          <button className="flex-shrink-0 px-3 py-1.5 text-[10px] font-bold rounded text-slate-500 hover:text-slate-700 hover:bg-white/50 transition-colors whitespace-nowrap">
            Visitors
          </button>
          <button className="flex-shrink-0 px-3 py-1.5 text-[10px] font-bold rounded text-slate-500 hover:text-slate-700 hover:bg-white/50 transition-colors whitespace-nowrap">
            Announcements
          </button>
          <button className="flex-shrink-0 px-3 py-1.5 text-[10px] font-bold rounded text-slate-500 hover:text-slate-700 hover:bg-white/50 transition-colors whitespace-nowrap">
            Holidays
          </button>
          <button className="flex-shrink-0 px-3 py-1.5 text-[10px] font-bold rounded text-slate-500 hover:text-slate-700 hover:bg-white/50 transition-colors whitespace-nowrap flex items-center gap-1">
            Spotlight
            <span className="size-1.5 bg-yellow-400 rounded-full"></span>
          </button>
          <button className="flex-shrink-0 px-3 py-1.5 text-[10px] font-bold rounded bg-white text-slate-800 border border-slate-200 shadow-sm transition-colors whitespace-nowrap">
            Weather
          </button>
        </div>
      </div>
      <div className="flex-1 p-0 relative flex flex-col h-full overflow-hidden">
        <div className="px-5 py-4 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border-b border-blue-100/50 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600/80 mb-1">
              <span className="material-symbols-outlined text-[14px]">
                location_on
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Global HQ Campus
              </span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-slate-800 font-display leading-none">
                72°
              </span>
              <span className="text-xs font-bold text-slate-500 pb-1">
                Sunny
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="material-symbols-outlined text-5xl text-amber-500 drop-shadow-sm">
              sunny
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-3 w-1/3">
                <span className="text-[10px] font-bold text-slate-900 uppercase">
                  Today
                </span>
              </div>
              <div className="flex items-center gap-2 justify-center w-1/3">
                <span className="material-symbols-outlined text-amber-500 text-[18px]">
                  sunny
                </span>
                <span className="text-[10px] font-medium text-slate-500">
                  Clear
                </span>
              </div>
              <div className="flex items-center justify-end gap-3 w-1/3 text-[10px]">
                <span className="font-bold text-slate-900">72°</span>
                <span className="text-slate-400">58°</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
              <div className="flex items-center gap-3 w-1/3">
                <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-800 uppercase transition-colors">
                  Wed
                </span>
              </div>
              <div className="flex items-center gap-2 justify-center w-1/3">
                <span className="material-symbols-outlined text-amber-400 text-[18px]">
                  partly_cloudy_day
                </span>
                <span className="text-[10px] font-medium text-slate-500">
                  Clouds
                </span>
              </div>
              <div className="flex items-center justify-end gap-3 w-1/3 text-[10px]">
                <span className="font-bold text-slate-900">68°</span>
                <span className="text-slate-400">55°</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
              <div className="flex items-center gap-3 w-1/3">
                <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-800 uppercase transition-colors">
                  Thu
                </span>
              </div>
              <div className="flex items-center gap-2 justify-center w-1/3">
                <span className="material-symbols-outlined text-slate-400 text-[18px]">
                  cloud
                </span>
                <span className="text-[10px] font-medium text-slate-500">
                  Overcast
                </span>
              </div>
              <div className="flex items-center justify-end gap-3 w-1/3 text-[10px]">
                <span className="font-bold text-slate-900">65°</span>
                <span className="text-slate-400">52°</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
              <div className="flex items-center gap-3 w-1/3">
                <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-800 uppercase transition-colors">
                  Fri
                </span>
              </div>
              <div className="flex items-center gap-2 justify-center w-1/3">
                <span className="material-symbols-outlined text-blue-400 text-[18px]">
                  rainy
                </span>
                <span className="text-[10px] font-medium text-slate-500">
                  Showers
                </span>
              </div>
              <div className="flex items-center justify-end gap-3 w-1/3 text-[10px]">
                <span className="font-bold text-slate-900">62°</span>
                <span className="text-slate-400">50°</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
              <div className="flex items-center gap-3 w-1/3">
                <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-800 uppercase transition-colors">
                  Sat
                </span>
              </div>
              <div className="flex items-center gap-2 justify-center w-1/3">
                <span className="material-symbols-outlined text-amber-500 text-[18px]">
                  clear_day
                </span>
                <span className="text-[10px] font-medium text-slate-500">
                  Sunny
                </span>
              </div>
              <div className="flex items-center justify-end gap-3 w-1/3 text-[10px]">
                <span className="font-bold text-slate-900">70°</span>
                <span className="text-slate-400">56°</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExecutiveInsights;

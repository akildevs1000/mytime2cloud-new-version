function AttendanceCard({}) {
  return (
    <>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-display">
            Attendance Volume
          </h3>
          <p className="text-[10px] text-slate-500">Weekly Distribution</p>
        </div>
        <button className="text-slate-400 hover:text-slate-800 transition-colors">
          <span className="material-symbols-outlined text-sm">more_horiz</span>
        </button>
      </div>
      <div className="flex-1 w-full min-h-0 pt-2 flex items-end justify-between gap-2">
        <div className="w-full h-full flex items-end justify-between px-2 pb-6 border-b border-slate-200 relative">
          <div className="absolute left-0 top-0 h-full w-full flex flex-col justify-between pointer-events-none">
            <div className="w-full h-px bg-slate-100"></div>
            <div className="w-full h-px bg-slate-100"></div>
            <div className="w-full h-px bg-slate-100"></div>
            <div className="w-full h-px bg-slate-100"></div>
          </div>
          <div className="group relative flex flex-col items-center gap-1 w-[12%] h-full justify-end z-10">
            <div className="w-full bg-teal-500 rounded-t-sm h-[60%] chart-bar shadow-sm"></div>
            <span className="text-[9px] text-slate-500 absolute -bottom-5">
              M
            </span>
          </div>
          <div className="group relative flex flex-col items-center gap-1 w-[12%] h-full justify-end z-10">
            <div className="w-full bg-cyan-500 rounded-t-sm h-[85%] chart-bar shadow-sm"></div>
            <span className="text-[9px] text-slate-500 absolute -bottom-5">
              T
            </span>
          </div>
          <div className="group relative flex flex-col items-center gap-1 w-[12%] h-full justify-end z-10">
            <div className="w-full bg-emerald-500 rounded-t-sm h-[75%] chart-bar shadow-sm"></div>
            <span className="text-[9px] text-slate-900 font-bold absolute -bottom-5">
              W
            </span>
          </div>
          <div className="group relative flex flex-col items-center gap-1 w-[12%] h-full justify-end z-10">
            <div className="w-full bg-indigo-500 rounded-t-sm h-[70%] chart-bar shadow-sm"></div>
            <span className="text-[9px] text-slate-500 absolute -bottom-5">
              T
            </span>
          </div>
          <div className="group relative flex flex-col items-center gap-1 w-[12%] h-full justify-end z-10">
            <div className="w-full bg-purple-500 rounded-t-sm h-[65%] chart-bar shadow-sm"></div>
            <span className="text-[9px] text-slate-500 absolute -bottom-5">
              F
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default AttendanceCard;

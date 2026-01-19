function WelnessCard({}) {
  return (
    <>
      <div className="absolute top-5 left-5 z-10">
        <h3 className="text-sm font-bold text-slate-900 font-display">
          Workforce Wellness
        </h3>
        <p className="text-[10px] text-slate-500">Burnout Risk Monitor</p>
      </div>
      <button className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 transition-colors">
        <span className="material-symbols-outlined text-sm">more_horiz</span>
      </button>
      <div className="relative w-40 h-40 mt-4 group">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle className="gauge-bg" cx="50" cy="50" r="40"></circle>
          <circle
            className="gauge-value"
            cx="50"
            cy="50"
            r="40"
            strokeDashoffset="30"
            style={{ stroke: "#10b981" }}
          ></circle>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-slate-900 font-display tracking-tight group-hover:scale-110 transition-transform">
            88%
          </span>
          <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200 mt-1">
            Optimal
          </span>
        </div>
      </div>
      <div className="mt-4 w-full px-1">
        <div className="flex items-start gap-2 bg-slate-50 border border-slate-200 p-2 rounded-lg">
          <div className="bg-rose-100 p-1 rounded-md text-rose-600 flex-shrink-0">
            <span className="material-symbols-outlined text-[14px]">
              warning
            </span>
          </div>
          <div>
            <p className="text-[10px] text-slate-700 font-medium leading-tight">
              Attention Required
            </p>
            <p className="text-[9px] text-slate-500 mt-0.5">
              3 Teams at High Burnout Risk
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default WelnessCard;

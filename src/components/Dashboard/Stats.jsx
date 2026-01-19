function Stats({}) {
  return (
    <>
      <div className="glass-card darks:glass-card  p-4 rounded-xl relative overflow-hidden group">
        <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
          <span className="material-symbols-outlined text-4xl text-slate-900">
            groups
          </span>
        </div>
        <p className="text-slate-500 text-xs font-medium mb-1">Total Headcount</p>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-slate-900 font-display">
            950
          </span>
          <span className="text-[10px] text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded flex items-center mb-1">
            <span className="material-symbols-outlined text-sm mr-0.5">
              arrow_upward
            </span>
            1%
          </span>
        </div>
      </div>
      <div className="glass-card darks:glass-card p-4 rounded-xl relative overflow-hidden group border-l-2 border-l-emerald-500/50">
        <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
          <span className="material-symbols-outlined text-4xl text-emerald-600">
            check_circle
          </span>
        </div>
        <p className="text-emerald-700 text-xs font-medium mb-1">Present Today</p>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-slate-900 font-display">
            842
          </span>
          <span className="text-[10px] text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded flex items-center mb-1">
            <span className="material-symbols-outlined text-[10px] mr-0.5">
              arrow_upward
            </span>
            2%
          </span>
        </div>
      </div>
      <div className="glass-card darks:glass-card p-4 rounded-xl relative overflow-hidden group">
        <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
          <span className="material-symbols-outlined text-4xl text-rose-500">
            cancel
          </span>
        </div>
        <p className="text-rose-600 text-xs font-medium mb-1">Unplanned Absence</p>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-slate-900 font-display">45</span>
          <span className="text-[10px] text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded flex items-center mb-1">
            <span className="material-symbols-outlined text-[10px] mr-0.5">
              arrow_downward
            </span>
            5%
          </span>
        </div>
      </div>
      <div className="glass-card darks:glass-card p-4 rounded-xl relative overflow-hidden group">
        <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
          <span className="material-symbols-outlined text-4xl text-purple-500">
            event
          </span>
        </div>
        <p className="text-purple-600 text-xs font-medium mb-1">Scheduled Leave</p>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-slate-900 font-display">12</span>
          <span className="text-[10px] text-slate-600 bg-slate-200 px-1.5 py-0.5 rounded flex items-center mb-1">
            Stable
          </span>
        </div>
      </div>
      <div className="glass-card darks:glass-card p-4 rounded-xl relative overflow-hidden group">
        <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
          <span className="material-symbols-outlined text-4xl text-indigo-400">
            flight
          </span>
        </div>
        <p className="text-indigo-600 text-xs font-medium mb-1">Vacation</p>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-slate-900 font-display">38</span>
          <span className="text-[10px] text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded flex items-center mb-1">
            <span className="material-symbols-outlined text-[10px] mr-0.5">
              arrow_upward
            </span>
            1%
          </span>
        </div>
      </div>
      <div className="glass-card darks:glass-card p-4 rounded-xl relative overflow-hidden group border-l-2 border-l-amber-500/50">
        <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
          <span className="material-symbols-outlined text-4xl text-amber-500">
            schedule
          </span>
        </div>
        <p className="text-amber-600 text-xs font-medium mb-1">Late Arrivals</p>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-slate-900 font-display">13</span>
          <span className="text-[10px] text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded flex items-center mb-1">
            <span className="material-symbols-outlined text-[10px] mr-0.5">
              arrow_upward
            </span>
            8%
          </span>
        </div>
      </div>
      <div className="glass-card darks:glass-card p-4 rounded-xl relative overflow-hidden group border-l-2 border-l-orange-500/50">
        <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
          <span className="material-symbols-outlined text-4xl text-orange-400">
            cloud_off
          </span>
        </div>
        <p className="text-orange-600 text-xs font-medium mb-1">Offline Nodes</p>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-slate-900 font-display">5</span>
          <span className="text-[10px] text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded flex items-center mb-1">
            <span className="material-symbols-outlined text-[10px] mr-0.5">
              warning
            </span>
            Alert
          </span>
        </div>
      </div>
    </>
  );
}

export default Stats;

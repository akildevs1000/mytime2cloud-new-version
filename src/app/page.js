"use client"

const App = () => {
  return (
    <>
      <div className="px-2 mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-600 dark:text-gray-300 font-display tracking-tight">Executive Overview</h2>
        <div className="filter-glass px-1 py-1 rounded-xl flex items-center gap-1.5 max-w-sm">
          <div className="h-6 w-px bg-white/10"></div>
          <div className="relative group">
            <select
              className="appearance-none rounded-md bg-transparent border-none text-sm text-gray-600 dark:text-gray-300 font-medium pl-2 pr-8 py-1.5 focus:ring-0 cursor-pointer w-40 hover:text-primary transition-colors">
              <option value="all">Global HQ</option>
              <option value="engineering">Engineering Wing</option>
              <option value="sales">Sales Floor</option>
            </select>
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-500 group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 pb-6 custom-scrollbar flex flex-col gap-5">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-3">
          <div className="glass-card p-4 rounded-xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-4xl text-gray-600 dark:text-gray-300">groups</span>
            </div>
            <p className="text-slate-400 text-xs font-medium mb-1">Total Headcount</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-600 dark:text-gray-300 font-display">950</span>
              <span
                className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center mb-1">
                <span className="material-symbols-outlined text-[10px] mr-0.5">arrow_upward</span>1%
              </span>
            </div>
          </div>
          <div
            className="glass-card p-4 rounded-xl relative overflow-hidden group border-l-2 border-l-emerald-500/50">
            <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-4xl text-emerald-500">check_circle</span>
            </div>
            <p className="text-emerald-400/80 text-xs font-medium mb-1">Present Today</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-600 dark:text-gray-300 font-display">842</span>
              <span
                className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center mb-1">
                <span className="material-symbols-outlined text-[10px] mr-0.5">arrow_upward</span>2%
              </span>
            </div>
          </div>
          <div className="glass-card p-4 rounded-xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-4xl text-rose-500">cancel</span>
            </div>
            <p className="text-rose-400/80 text-xs font-medium mb-1">Unplanned Absence</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-600 dark:text-gray-300 font-display">45</span>
              <span
                className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center mb-1">
                <span className="material-symbols-outlined text-[10px] mr-0.5">arrow_downward</span>5%
              </span>
            </div>
          </div>
          <div className="glass-card p-4 rounded-xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-4xl text-purple-500">event</span>
            </div>
            <p className="text-purple-400/80 text-xs font-medium mb-1">Scheduled Leave</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-600 dark:text-gray-300 font-display">12</span>
              <span
                className="text-[10px] text-slate-500 bg-white/5 px-1.5 py-0.5 rounded flex items-center mb-1">
                Stable
              </span>
            </div>
          </div>
          <div className="glass-card p-4 rounded-xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-4xl text-indigo-400">flight</span>
            </div>
            <p className="text-indigo-300 text-xs font-medium mb-1">Vacation</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-600 dark:text-gray-300 font-display">38</span>
              <span
                className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center mb-1">
                <span className="material-symbols-outlined text-[10px] mr-0.5">arrow_upward</span>1%
              </span>
            </div>
          </div>
          <div
            className="glass-card p-4 rounded-xl relative overflow-hidden group border-l-2 border-l-amber-500/50">
            <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-4xl text-amber-500">schedule</span>
            </div>
            <p className="text-amber-400/80 text-xs font-medium mb-1">Late Arrivals</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-600 dark:text-gray-300 font-display">13</span>
              <span
                className="text-[10px] text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded flex items-center mb-1">
                <span className="material-symbols-outlined text-[10px] mr-0.5">arrow_upward</span>8%
              </span>
            </div>
          </div>
          <div
            className="glass-card p-4 rounded-xl relative overflow-hidden group border-l-2 border-l-orange-500/50">
            <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-4xl text-orange-400">cloud_off</span>
            </div>
            <p className="text-orange-400/80 text-xs font-medium mb-1">Offline Nodes</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-600 dark:text-gray-300 font-display">5</span>
              <span
                className="text-[10px] text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded flex items-center mb-1">
                <span className="material-symbols-outlined text-[10px] mr-0.5">warning</span>Alert
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-[340px]">
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="glass-panel rounded-2xl p-5 relative overflow-hidden flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-sm font-bold text-gray-600 dark:text-gray-300 font-display">Attendance Volume</h3>
                  <p className="text-[10px] text-slate-400">Weekly Distribution</p>
                </div>
                <button className="text-slate-500 hover:text-gray-600 dark:text-gray-300 transition-colors"><span
                  className="material-symbols-outlined text-sm">more_horiz</span></button>
              </div>
              <div className="flex-1 w-full min-h-0 pt-2 flex items-end justify-between gap-2">
                <div
                  className="w-full h-full flex items-end justify-between px-2 pb-6 border-b border-white/5 relative">
                  <div
                    className="absolute left-0 top-0 h-full w-full flex flex-col justify-between pointer-events-none">
                    <div className="w-full h-px bg-white/5"></div>
                    <div className="w-full h-px bg-white/5"></div>
                    <div className="w-full h-px bg-white/5"></div>
                    <div className="w-full h-px bg-white/5"></div>
                  </div>
                  <div
                    className="group relative flex flex-col items-center gap-1 w-[12%] h-full justify-end z-10">
                    <div className="w-full bg-slate-700/30 rounded-t-sm h-[60%] chart-bar"></div>
                    <span className="text-[9px] text-slate-500 absolute -bottom-5">M</span>
                  </div>
                  <div
                    className="group relative flex flex-col items-center gap-1 w-[12%] h-full justify-end z-10">
                    <div className="w-full bg-slate-700/30 rounded-t-sm h-[85%] chart-bar"></div>
                    <span className="text-[9px] text-slate-500 absolute -bottom-5">T</span>
                  </div>
                  <div
                    className="group relative flex flex-col items-center gap-1 w-[12%] h-full justify-end z-10">
                    <div
                      className="w-full bg-slate-700/30 rounded-t-sm h-[75%] chart-bar !fill-emerald-500 !opacity-90">
                    </div>
                    <span
                      className="text-[9px] text-slate-500 absolute -bottom-5 font-bold text-gray-600 dark:text-gray-300">W</span>
                  </div>
                  <div
                    className="group relative flex flex-col items-center gap-1 w-[12%] h-full justify-end z-10">
                    <div className="w-full bg-slate-700/30 rounded-t-sm h-[70%] chart-bar"></div>
                    <span className="text-[9px] text-slate-500 absolute -bottom-5">T</span>
                  </div>
                  <div
                    className="group relative flex flex-col items-center gap-1 w-[12%] h-full justify-end z-10">
                    <div className="w-full bg-slate-700/30 rounded-t-sm h-[65%] chart-bar"></div>
                    <span className="text-[9px] text-slate-500 absolute -bottom-5">F</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="glass-panel rounded-2xl p-5 relative overflow-hidden flex flex-col h-full items-center justify-center">
              <div className="absolute top-5 left-5 z-10">
                <h3 className="text-sm font-bold text-gray-600 dark:text-gray-300 font-display">Workforce Wellness</h3>
                <p className="text-[10px] text-slate-400">Burnout Risk Monitor</p>
              </div>
              <button className="absolute top-5 right-5 text-slate-500 hover:text-gray-600 dark:text-gray-300 transition-colors">
                <span className="material-symbols-outlined text-sm">more_horiz</span>
              </button>
              <div className="relative w-40 h-40 mt-4 group">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle className="gauge-bg" cx="50" cy="50" r="40"></circle>
                  <circle className="gauge-value" cx="50" cy="50" r="40" stroke-dashoffset="30"
                    style={{ stroke: '#10b981' }}></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className="text-3xl font-bold text-gray-600 dark:text-gray-300 font-display tracking-tight group-hover:scale-110 transition-transform">88%</span>
                  <span
                    className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 mt-1">Optimal</span>
                </div>
              </div>
              <div className="mt-4 w-full px-1">
                <div
                  className="flex items-start gap-2 bg-white/[0.03] border border-white/5 p-2 rounded-lg">
                  <div className="bg-rose-500/20 p-1 rounded-md text-rose-400 flex-shrink-0">
                    <span className="material-symbols-outlined text-[14px]">warning</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-300 font-medium leading-tight">Attention
                      Required</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">3 Teams at High Burnout Risk</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="glass-panel rounded-2xl p-0 relative overflow-hidden flex flex-col h-[340px]">
            <div className="p-4 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-600 dark:text-gray-300 font-display flex items-center gap-2">
                  <span className="material-symbols-outlined text-purple-400">insights</span>
                  Executive Insights
                </h3>
                <button
                  className="material-symbols-outlined text-slate-500 hover:text-gray-600 dark:text-gray-300 text-sm">more_vert</button>
              </div>
              <div className="flex gap-1 bg-black/20 p-1 rounded-lg overflow-x-auto">
                <button
                  className="flex-1 py-1.5 text-[10px] font-bold rounded bg-white/10 text-gray-600 dark:text-gray-300 border border-white/5 shadow-sm transition-colors">Alerts</button>
                <button
                  className="flex-1 py-1.5 text-[10px] font-bold rounded text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors">VIPS</button>
                <button
                  className="flex-1 py-1.5 text-[10px] font-bold rounded text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors">Audit</button>
              </div>
            </div>
            <div className="flex-1 p-0 relative flex flex-col h-full overflow-hidden">
              <div className="px-4 pt-3 pb-2">
                <div
                  className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/20 rounded-lg p-3 flex items-start gap-3 relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-24 h-full bg-purple-500/10 blur-xl"></div>
                  <div className="bg-purple-500/20 p-1.5 rounded-lg text-purple-300 flex-shrink-0 z-10">
                    <span className="material-symbols-outlined text-[18px]">diamond</span>
                  </div>
                  <div className="z-10 flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-purple-100">VIP Arrival Imminent</h4>
                      <span className="text-[9px] text-purple-300 font-mono">2m</span>
                    </div>
                    <p className="text-[10px] text-purple-200/70 mt-0.5 leading-tight">Board Member
                      <strong className="text-gray-600 dark:text-gray-300">A. Sterling</strong> approaching North Gate.
                      Priority access enabled.</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                <div
                  className="grid grid-cols-12 px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <div className="col-span-6">Event</div>
                  <div className="col-span-3">Source</div>
                  <div className="col-span-3 text-right">Time</div>
                </div>
                <div
                  className="grid grid-cols-12 items-center px-3 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors rounded-lg group cursor-pointer">
                  <div className="col-span-6 flex items-center gap-3">
                    <div className="size-2 rounded-full bg-rose-500"></div>
                    <div>
                      <p
                        className="text-xs font-bold text-slate-200 group-hover:text-gray-600 dark:text-gray-300 transition-colors">
                        Unauthorized Access</p>
                      <p className="text-[9px] text-slate-500">Server Room B</p>
                    </div>
                  </div>
                  <div className="col-span-3 text-[10px] text-slate-400">Security AI</div>
                  <div className="col-span-3 text-right">
                    <span className="text-[10px] font-mono text-slate-300">10:41 AM</span>
                  </div>
                </div>
                <div
                  className="grid grid-cols-12 items-center px-3 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors rounded-lg group cursor-pointer">
                  <div className="col-span-6 flex items-center gap-3">
                    <div className="size-2 rounded-full bg-emerald-500"></div>
                    <div>
                      <p
                        className="text-xs font-bold text-slate-200 group-hover:text-gray-600 dark:text-gray-300 transition-colors">
                        Protocol Compliance</p>
                      <p className="text-[9px] text-slate-500">Shift Change A</p>
                    </div>
                  </div>
                  <div className="col-span-3 text-[10px] text-slate-400">Ops Monitor</div>
                  <div className="col-span-3 text-right">
                    <span className="text-[10px] font-mono text-slate-300">10:30 AM</span>
                  </div>
                </div>
                <div
                  className="grid grid-cols-12 items-center px-3 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors rounded-lg group cursor-pointer">
                  <div className="col-span-6 flex items-center gap-3">
                    <div className="size-2 rounded-full bg-amber-500"></div>
                    <div>
                      <p
                        className="text-xs font-bold text-slate-200 group-hover:text-gray-600 dark:text-gray-300 transition-colors">
                        Capacity Warning</p>
                      <p className="text-[9px] text-slate-500">Cafeteria Zone</p>
                    </div>
                  </div>
                  <div className="col-span-3 text-[10px] text-slate-400">Crowd Sense</div>
                  <div className="col-span-3 text-right">
                    <span className="text-[10px] font-mono text-slate-300">10:15 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-2xl flex-1 flex flex-col min-h-[300px]">
          <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <h3 className="text-base font-bold text-gray-600 dark:text-gray-300 font-display tracking-wide">Live Recognition Feed
              </h3>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-[10px] text-slate-400 font-mono">Refreshing in 5s...</span>
              <button
                className="text-xs font-bold text-primary hover:text-gray-600 dark:text-gray-300 transition-colors uppercase tracking-wider">View
                Full Log</button>
            </div>
          </div>
          <div
            className="grid grid-cols-12 px-6 py-3 border-b border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-white/[0.02]">
            <div className="col-span-3">Identity</div>
            <div className="col-span-2">Department</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-2">Method</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-right">Time</div>
          </div>
          <div className="flex-1 overflow-y-auto px-2">
            <div className="grid grid-cols-12 px-4 py-4 minimal-table-row items-center cursor-pointer group">
              <div className="col-span-3 flex items-center gap-3">
                <div
                  className="size-8 rounded-full bg-slate-700 overflow-hidden relative border border-slate-600">
                  <img className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVtMhp_XykLj5h5NN1k2TqpsP11CIW25W0Vi7tAxLKwAG1Ll1yu44ufhxY26WC7W9hMgwx2Dc4Whh1MdK4sYUsRUEZ6MfMUhaSDZ8sSBWQdblGwGZvQ_YxLJOtiUJU3lLcQE5GCmofuM5_WWjT-psEJ6TlSs7GMv73SyqYIo1ybgAPo_7FBHPcUBpYIHUaF-QW9Bcrg8J2mAbZFBpy7z36K4ZhpiRmB3Pq9H_NAIsflzQqo4Vz5yBsHY6ykIZLp8hqeF3_QTc5GCGZ" />
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-sm font-bold text-slate-200 group-hover:text-gray-600 dark:text-gray-300 transition-colors">Sarah
                    Jenkins</span>
                  <span className="text-[10px] text-slate-500">ID: 8842-A</span>
                </div>
              </div>
              <div className="col-span-2 text-xs text-slate-400">Marketing</div>
              <div className="col-span-2 text-xs text-slate-400">Main Lobby</div>
              <div className="col-span-2 flex items-center gap-2 text-xs text-slate-500">
                <span className="material-symbols-outlined text-[14px]">face</span> Face Scan
              </div>
              <div className="col-span-2">
                <span
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-[10px] font-medium text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500"></span> Authorized
                </span>
              </div>
              <div
                className="col-span-1 text-right text-xs font-mono text-slate-500 group-hover:text-slate-300">
                10:41</div>
            </div>
            <div className="grid grid-cols-12 px-4 py-4 minimal-table-row items-center cursor-pointer group">
              <div className="col-span-3 flex items-center gap-3">
                <div
                  className="size-8 rounded-full bg-slate-700 overflow-hidden relative border border-slate-600">
                  <img className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2O5JDgooB62yd_6-Kf3jYQLoXwhV3DvjsC4I1ri87iTfAeZdkWoJepYeMEx92BYNFPJb4MB4a-XCwt2Ql6e8zXoWpS4Bg8BjuuQmdjCbQiKUIeFVbMVLAq7ZtTCC06s4eQ2lV1gXqs_mJA29AEtxC5T7UUz7cphtlYBtDEPV3SFgbPEtHoHOgRiO6gkPVzDef5Li9HgUp5JGVupezTfcOfx-cvao4eG3LcyK13sz5T62LyYpfFg8RyP9BbDQVz5sPBsG-lMzcXFsN" />
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-sm font-bold text-slate-200 group-hover:text-gray-600 dark:text-gray-300 transition-colors">David
                    Chen</span>
                  <span className="text-[10px] text-slate-500">ID: 9931-B</span>
                </div>
              </div>
              <div className="col-span-2 text-xs text-slate-400">IT Infra</div>
              <div className="col-span-2 text-xs text-slate-400">Server Room</div>
              <div className="col-span-2 flex items-center gap-2 text-xs text-slate-500">
                <span className="material-symbols-outlined text-[14px]">fingerprint</span> Biometric
              </div>
              <div className="col-span-2">
                <span
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-500/5 border border-amber-500/20 text-[10px] font-medium text-amber-400">
                  <span className="size-1.5 rounded-full bg-amber-500"></span> Flagged Late
                </span>
              </div>
              <div
                className="col-span-1 text-right text-xs font-mono text-slate-500 group-hover:text-slate-300">
                10:38</div>
            </div>
            <div className="grid grid-cols-12 px-4 py-4 minimal-table-row items-center cursor-pointer group">
              <div className="col-span-3 flex items-center gap-3">
                <div
                  className="size-8 rounded-full bg-slate-700 overflow-hidden relative border border-slate-600">
                  <img className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9JEVJfEbjna3nGBIOfQrNlQ0HErlAzZphj4H8HHpYc_qKKAg69zwhAUZGzsk2oCNu57H6WrOGQHegEucKTU360aoeMaDwVqAPEikpzO3wgCRWg9CH6zK6efTeoIKlrHtlko3k7TPjPxO0ifsMul2MV9AozVVGdj6GCo8Li2L92YhUJyoG5JsVf8Z08yc3KdPmoyWNfjcH2v1laJ18y3sO485gK61sdhraOV4-iZTVC26kiVlRYmGz1XMMbEgIJgAtms7XK6nUf6Ta" />
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-sm font-bold text-slate-200 group-hover:text-gray-600 dark:text-gray-300 transition-colors">Elena
                    Rodriguez</span>
                  <span className="text-[10px] text-slate-500">ID: 4421-C</span>
                </div>
              </div>
              <div className="col-span-2 text-xs text-slate-400">HR Dept</div>
              <div className="col-span-2 text-xs text-slate-400">West Wing</div>
              <div className="col-span-2 flex items-center gap-2 text-xs text-slate-500">
                <span className="material-symbols-outlined text-[14px]">badge</span> Smart Card
              </div>
              <div className="col-span-2">
                <span
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-cyan-500/5 border border-cyan-500/20 text-[10px] font-medium text-cyan-400">
                  <span className="size-1.5 rounded-full bg-cyan-500"></span> Early Entry
                </span>
              </div>
              <div
                className="col-span-1 text-right text-xs font-mono text-slate-500 group-hover:text-slate-300">
                10:35</div>
            </div>
            <div
              className="grid grid-cols-12 px-4 py-4 minimal-table-row items-center cursor-pointer group border-none">
              <div className="col-span-3 flex items-center gap-3">
                <div
                  className="size-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-xs font-bold text-slate-400">
                  MJ
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-sm font-bold text-slate-200 group-hover:text-gray-600 dark:text-gray-300 transition-colors">Michael
                    Jones</span>
                  <span className="text-[10px] text-slate-500">ID: 1102-X</span>
                </div>
              </div>
              <div className="col-span-2 text-xs text-slate-400">Operations</div>
              <div className="col-span-2 text-xs text-slate-400">Loading Bay</div>
              <div className="col-span-2 flex items-center gap-2 text-xs text-slate-500">
                <span className="material-symbols-outlined text-[14px]">nfc</span> NFC Tag
              </div>
              <div className="col-span-2">
                <span
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-500/5 border border-slate-500/20 text-[10px] font-medium text-slate-400">
                  <span className="size-1.5 rounded-full bg-slate-500"></span> Exit Scan
                </span>
              </div>
              <div
                className="col-span-1 text-right text-xs font-mono text-slate-500 group-hover:text-slate-300">
                10:32</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

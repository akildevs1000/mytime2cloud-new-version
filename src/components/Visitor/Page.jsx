import React from "react";

const VisitorHub = () => {
  return (
    <div className="flex-1 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Visitors Today */}
        <div className="glass-panel bg-white dark:bg-slate-900/50 rounded-xl p-5 flex flex-col gap-1 relative overflow-hidden group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all duration-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/20 shadow-sm dark:shadow-none">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Visitors Today
              </p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 drop-shadow-sm dark:drop-shadow-md">
                42
              </h3>
            </div>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              <span className="material-symbols-outlined">groups</span>
            </div>
          </div>
          <div className="flex items-center mt-3 text-sm">
            <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center bg-emerald-500/10 dark:bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-500/20 dark:border-emerald-500/10">
              <span className="material-symbols-outlined text-sm mr-0.5">
                trending_up
              </span>
              12%
            </span>
            <span className="text-slate-500 dark:text-slate-500 ml-2">
              vs yesterday
            </span>
          </div>
        </div>

        {/* Currently On-site */}
        <div className="glass-panel bg-white dark:bg-slate-900/50 rounded-xl p-5 flex flex-col gap-1 relative overflow-hidden group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all duration-300 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Currently On-site
              </p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 drop-shadow-sm dark:drop-shadow-md">
                18
              </h3>
            </div>
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <span className="material-symbols-outlined">
                domain_verification
              </span>
            </div>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden border border-slate-300/50 dark:border-slate-700/50">
            <div
              className="bg-indigo-500 h-full rounded-full shadow-[0_0_10px_rgba(99,102,241,0.3)] dark:shadow-[0_0_10px_rgba(99,102,241,0.5)]"
              style={{ width: "45%" }}
            ></div>
          </div>
        </div>

        {/* Expected */}
        <div className="glass-panel bg-white dark:bg-slate-900/50 rounded-xl p-5 flex flex-col gap-1 relative overflow-hidden group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all duration-300 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Expected
              </p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 drop-shadow-sm dark:drop-shadow-md">
                5
              </h3>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400 border border-purple-500/20">
              <span className="material-symbols-outlined">schedule</span>
            </div>
          </div>
          <div className="flex -space-x-2 mt-3 overflow-hidden pl-1">
            <img
              alt="Expected visitor"
              className="inline-block size-6 rounded-full ring-2 ring-white dark:ring-[#1e293b]"
              src="https://i.pravatar.cc/150?u=0"
            />
            <img
              alt="Expected visitor"
              className="inline-block size-6 rounded-full ring-2 ring-white dark:ring-[#1e293b]"
              src="https://i.pravatar.cc/150?u=1"
            />
            <div className="size-6 rounded-full bg-slate-100 dark:bg-slate-800 ring-2 ring-white dark:ring-[#1e293b] flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
              +3
            </div>
          </div>
        </div>

        {/* Pending Approval */}
        <div className="glass-panel bg-white dark:bg-slate-900/50 rounded-xl p-5 flex flex-col gap-1 relative overflow-hidden group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all duration-300 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Pending Approval
              </p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 drop-shadow-sm dark:drop-shadow-md">
                3
              </h3>
            </div>
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
          </div>
          <div className="flex items-center mt-3 text-sm">
            <span className="text-amber-700 dark:text-amber-400 font-medium flex items-center bg-amber-500/10 dark:bg-amber-500/5 px-1.5 py-0.5 rounded border border-amber-500/20 dark:border-amber-500/10">
              <span className="material-symbols-outlined text-sm mr-0.5">
                error
              </span>
              Action needed
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-xl p-6 relative overflow-hidden border-t-2 border-t-indigo-500 bg-white dark:bg-slate-900 shadow-xl dark:shadow-none">
            {/* Ambient Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none"></div>

            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span className="p-1 rounded bg-indigo-500/10 dark:bg-indigo-500/20">
                  <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-sm">
                    how_to_reg
                  </span>
                </span>
                Quick Check-in
              </h3>
              <button className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium flex items-center gap-1 transition-colors">
                Full Registration
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* Scan Button */}
            <button className="w-full mb-6 relative group px-6 py-4 rounded-xl border border-indigo-500/30 dark:border-indigo-500/40 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-500 text-indigo-600 dark:text-indigo-400 hover:text-white shadow-sm dark:shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(129,140,248,0.6)] font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all duration-300 z-10">
              <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
                document_scanner
              </span>
              <span>Scan ID Card</span>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined">arrow_forward</span>
              </span>
            </button>

            <div className="flex flex-col md:flex-row gap-6 relative z-10">
              {/* Image Preview Area */}
              <div className="w-full md:w-36 shrink-0">
                <div className="h-32 md:h-full min-h-[160px] rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-500 hover:border-indigo-500/50 transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-3xl">
                    id_card
                  </span>
                  <span className="text-[10px] font-semibold uppercase text-center">
                    ID Image
                    <br />
                    Preview
                  </span>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
                {[
                  {
                    label: "Visitor Name",
                    icon: "person",
                    placeholder: "Enter full name",
                  },
                  {
                    label: "Phone Number",
                    icon: "call",
                    placeholder: "(555) 000-0000",
                  },
                  {
                    label: "ID Number",
                    icon: "pin",
                    placeholder: "Enter ID number",
                  },
                ].map((field, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      {field.label}
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 transition-colors text-[20px]">
                          {field.icon}
                        </span>
                      </div>
                      <input
                        className="block w-full pl-10 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm h-11 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 transition-all"
                        placeholder={field.placeholder}
                        type="text"
                      />
                    </div>
                  </div>
                ))}

                {/* Select fields need similar logic */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    ID Type
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 transition-colors text-[20px]">
                        badge
                      </span>
                    </div>
                    <select className="block w-full pl-10 pr-10 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm h-11 text-slate-900 dark:text-white transition-all appearance-none">
                      <option defaultValue="">
                        Select ID Type...
                      </option>
                      <option>National ID</option>
                      <option>Passport</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-slate-400 text-sm">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                {/* ... repeat for Host/Purpose following the pattern above ... */}
              </div>
            </div>

            {/* Final Action Button */}
            <div className="mt-8 flex justify-end relative z-10">
              <button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white dark:text-slate-900 font-bold py-3 px-8 rounded-lg flex items-center gap-2 transform active:scale-95 uppercase tracking-wide text-xs shadow-md dark:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all">
                <span className="material-symbols-outlined text-lg">
                  check_circle
                </span>
                Check-in Visitor
              </button>
            </div>
          </div>
          <div className="glass-panel rounded-xl overflow-hidden flex flex-col h-auto min-h-[400px] bg-white dark:bg-slate-900 shadow-xl dark:shadow-none border border-slate-200 dark:border-slate-800">
            {/* Header Section */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-700/50 flex items-center justify-between bg-slate-50 dark:bg-slate-800/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">
                  table_rows
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Live Visitor Log
                </h3>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-transparent hover:border-indigo-200 dark:hover:border-slate-600">
                  <span className="material-symbols-outlined text-[20px]">
                    filter_list
                  </span>
                </button>
                <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-transparent hover:border-indigo-200 dark:hover:border-slate-600">
                  <span className="material-symbols-outlined text-[20px]">
                    download
                  </span>
                </button>
              </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-100/80 dark:bg-slate-900/50 text-xs uppercase text-slate-500 dark:text-slate-500 font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                      Visitor Name
                    </th>
                    <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                      Host
                    </th>
                    <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                      Check-in Time
                    </th>
                    <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right border-b border-slate-200 dark:border-slate-800">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {/* Row 1: Active (Indigo Highlight) */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="size-9 rounded-full bg-cover bg-center border border-slate-200 dark:border-slate-600"
                          style={{
                            backgroundImage:
                              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5szMB1W0NjFZwXSYcfJJT-HgEqvj5WQiqGOuYK6bG92t42nrokNO7ZSO4PMecW4BGCxziqzc7nU3xCOY1vjpFBERXq1HyuxiKc94moadzvTLaV4wvI7P3bI_ONFUbBGqM-3SXSmWyoWbQd39FU4NIezzH3ikexnn_soxCsufbBPki76_2Zaqf5_uuUZUKtP1Reh0F-lM3Omq46xvxlTycx2otWipIxcpZQHTFXfZYEEyniHbc4NKW9eJlXTD7IbQDUYUkgxbKa9tX")',
                          }}
                        ></div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            Michael Chen
                          </div>
                          <div className="text-xs text-slate-500">
                            Tech Solutions Inc.
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-[18px]">
                          person_outline
                        </span>
                        <span className="text-slate-700 dark:text-slate-300">
                          Sarah Connor
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-500 dark:text-slate-400 font-mono text-xs">
                        10:45 AM
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
                        <span className="size-1.5 rounded-full bg-indigo-600 dark:bg-indigo-500 animate-pulse"></span>
                        On-site
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-slate-500 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-all">
                          <span className="material-symbols-outlined text-[20px]">
                            print
                          </span>
                        </button>
                        <button className="p-1.5 text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-all">
                          <span className="material-symbols-outlined text-[20px]">
                            logout
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 2: Overstayed (Red) */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center font-bold text-sm">
                          EL
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            Emma Larson
                          </div>
                          <div className="text-xs text-slate-500">
                            Freelance
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-[18px]">
                          person_outline
                        </span>
                        <span className="text-slate-700 dark:text-slate-300">
                          David Miller
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono text-xs">
                      09:30 AM
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20">
                        <span className="material-symbols-outlined text-[14px]">
                          warning
                        </span>
                        Overstayed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-slate-500 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-all">
                          <span className="material-symbols-outlined text-[20px]">
                            print
                          </span>
                        </button>
                        <button className="p-1.5 text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-all">
                          <span className="material-symbols-outlined text-[20px]">
                            logout
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="glass-panel rounded-xl p-5 h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-none">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400">
                  notifications_active
                </span>
                Activity Feed
              </h3>
              <button className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-500 uppercase tracking-wide transition-colors">
                View All
              </button>
            </div>

            {/* Timeline */}
            <div className="relative pl-4 border-l border-slate-200 dark:border-slate-800 space-y-8">
              {/* Overstay Alert - Always Red for urgency */}
              <div className="relative group">
                <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-4 ring-white dark:ring-slate-900 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
                <div className="flex flex-col gap-1 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-red-600 dark:text-red-400">
                      Overstay Alert
                    </p>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                      2 mins ago
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Visitor{" "}
                    <span className="font-bold text-slate-900 dark:text-white">
                      Emma Larson
                    </span>{" "}
                    has exceeded the 4-hour limit.
                  </p>
                </div>
              </div>

              {/* New Request - Indigo Theme */}
              <div className="relative group">
                <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-slate-900 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></span>
                <div className="flex flex-col gap-1 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                      New Request
                    </p>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                      15 mins ago
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <span className="font-bold text-slate-900 dark:text-white">
                      Robert Fox
                    </span>{" "}
                    requested a visit for tomorrow at 2:00 PM.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button className="px-3 py-1.5 text-[10px] font-bold bg-indigo-100 dark:bg-indigo-600/20 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-600/30 rounded hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600/30 transition-all uppercase tracking-wide">
                      Approve
                    </button>
                    <button className="px-3 py-1.5 text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-all uppercase tracking-wide">
                      Deny
                    </button>
                  </div>
                </div>
              </div>

              {/* Generic Activity */}
              <div className="relative group">
                <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-slate-400 dark:bg-slate-500 ring-4 ring-white dark:ring-slate-900"></span>
                <div className="flex flex-col gap-1 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      Check-out
                    </p>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                      1 hour ago
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <span className="font-bold text-slate-900 dark:text-white">
                      James Wilson
                    </span>{" "}
                    checked out from the main gate.
                  </p>
                </div>
              </div>
            </div>

            {/* Upgrade Card - Indigo Style */}
            <div className="mt-8 p-4 bg-gradient-to-br from-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-lg text-slate-900 dark:text-white relative overflow-hidden group cursor-pointer border border-indigo-100 dark:border-slate-700 shadow-md">
              <div className="absolute right-[-20px] top-[-20px] size-24 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all duration-500"></div>
              <h4 className="text-sm font-bold relative z-10 text-indigo-900 dark:text-indigo-100">
                Upgrade Security
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 relative z-10 mb-3 leading-relaxed">
                Enable facial recognition for faster check-ins.
              </p>
              <button className="text-[10px] font-bold bg-white dark:bg-slate-700/50 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500/20 dark:hover:text-indigo-300 px-3 py-1.5 rounded border border-indigo-200 dark:border-slate-600 transition-all uppercase tracking-wide shadow-sm">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-4"></div>
    </div>
  );
};

export default VisitorHub;

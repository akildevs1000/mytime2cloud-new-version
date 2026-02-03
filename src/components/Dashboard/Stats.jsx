import { getAttendanceCount } from "@/lib/endpoint/dashboard";
import { useEffect, useState } from "react";

function Stats({ branch_id }) {
  const [stats, setStats] = useState({
    employeeCount: 0,
    presentCount: 0,
    absentCount: 0,
    leaveCount: 0,
    vaccationCount: 0,
    offlineDevices: 0,
  });

  useEffect(() => {
    const fetchAttendanceCounts = async () => {
      setStats(await getAttendanceCount(branch_id));
      console.log(branch_id);
    };

    fetchAttendanceCounts();
  }, [branch_id]);

  return (
    <>
      <div className="glass-card p-4 rounded-xl relative overflow-hidden group">
        <p className="text-slate-400 text-xs font-medium mb-1">
          Total Headcount
        </p>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-gray-600 dark:text-gray-300 font-display">
            {stats.employeeCount}
          </span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center mb-1">
            <span className="material-symbols-outlined text-[10px] mr-0.5">
              arrow_upward
            </span>
            1%
          </span>
        </div>
      </div>
      <div className="glass-card p-4 rounded-xl relative overflow-hidden group border-l-2 border-l-emerald-500/50">
        <p className="text-emerald-400/80 text-xs font-medium mb-1">
          Present Today
        </p>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-gray-600 dark:text-gray-300 font-display">
            {stats.presentCount}
          </span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center mb-1">
            <span className="material-symbols-outlined text-[10px] mr-0.5">
              arrow_upward
            </span>
            2%
          </span>
        </div>
      </div>
      <div className="glass-card p-4 rounded-xl relative overflow-hidden group">
        <p className="text-rose-400/80 text-xs font-medium mb-1">
          Unplanned Absence
        </p>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-gray-600 dark:text-gray-300 font-display">
            {stats.absentCount}
          </span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center mb-1">
            <span className="material-symbols-outlined text-[10px] mr-0.5">
              arrow_downward
            </span>
            5%
          </span>
        </div>
      </div>
      <div className="glass-card p-4 rounded-xl relative overflow-hidden group">
        <p className="text-purple-400/80 text-xs font-medium mb-1">
          Scheduled Leave
        </p>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-gray-600 dark:text-gray-300 font-display">
            {stats.leaveCount}
          </span>
          <span className="text-[10px] text-slate-500 bg-white/5 px-1.5 py-0.5 rounded flex items-center mb-1">
            Stable
          </span>
        </div>
      </div>
      <div className="glass-card p-4 rounded-xl relative overflow-hidden group">
        <p className="text-indigo-300 text-xs font-medium mb-1">Vacation</p>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-gray-600 dark:text-gray-300 font-display">
            {stats.vaccationCount}
          </span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center mb-1">
            <span className="material-symbols-outlined text-[10px] mr-0.5">
              arrow_upward
            </span>
            1%
          </span>
        </div>
      </div>
      {/* <div className="glass-card p-4 rounded-xl relative overflow-hidden group border-l-2 border-l-amber-500/50">
        <p className="text-amber-400/80 text-xs font-medium mb-1">
          Late Arrivals
        </p>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-gray-600 dark:text-gray-300 font-display">
            {stats.presentCount}
          </span>
          <span className="text-[10px] text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded flex items-center mb-1">
            <span className="material-symbols-outlined text-[10px] mr-0.5">
              arrow_upward
            </span>
            8%
          </span>
        </div>
      </div> */}
      <div className="glass-card p-4 rounded-xl relative overflow-hidden group border-l-2 border-l-orange-500/50">
        <p className="text-orange-400/80 text-xs font-medium mb-1">
          Offline Nodes
        </p>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-gray-600 dark:text-gray-300 font-display">
            {stats.offlineDevices}
          </span>
          <span className="text-[10px] text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded flex items-center mb-1">
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

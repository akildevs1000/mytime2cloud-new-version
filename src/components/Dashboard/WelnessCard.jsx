import { useDarkMode } from "@/context/DarkModeContext";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

const wellnessValue = 88;

function WelnessCard({ branch_id }) {
  const { isDark } = useDarkMode();

  return (
    <>
      <div className="absolute top-5 left-5 z-10">
        <h3 className="text-sm font-bold text-gray-600 dark:text-gray-300 font-display">
          Workforce Wellness
        </h3>
        <p className="text-[10px] text-slate-400">Burnout Risk Monitor</p>
      </div>

      <button className="absolute top-5 right-5 text-slate-500 hover:text-gray-600 dark:text-gray-300 transition-colors">
        <span className="material-symbols-outlined text-sm">more_horiz</span>
      </button>

      <div className="relative w-40 h-40 mt-4 group">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Base ring (light gray, full circle) */}
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              innerRadius={60}
              outerRadius={75}
              fill={isDark ? "#2f3848" : "#e5e7eb"}
              stroke="none"
              isAnimationActive={false}
            />

            {/* Active value ring (green progress) */}
            <Pie
              data={[{ value: wellnessValue }]}
              dataKey="value"
              innerRadius={60}
              outerRadius={75}
              startAngle={90}
              endAngle={90 - (wellnessValue / 100) * 360}
              fill="#10b981" // emerald
              stroke="none"
              cornerRadius={20} // smooth rounded ends
              isAnimationActive
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-gray-600 dark:text-gray-300 font-display tracking-tight group-hover:scale-110 transition-transform">
            {wellnessValue}%
          </span>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 mt-1">
            Optimal
          </span>
        </div>
      </div>

      <div className="mt-4 w-full px-1">
        <div className="flex items-start gap-2 bg-white/[0.03] border border-white/5 p-2 rounded-lg">
          <div className="bg-rose-500/20 p-1 rounded-md text-rose-400 flex-shrink-0">
            <span className="material-symbols-outlined text-[14px]">
              warning
            </span>
          </div>
          <div>
            <p className="text-[10px] text-slate-300 font-medium leading-tight">
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

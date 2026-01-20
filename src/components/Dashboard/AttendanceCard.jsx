import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { day: "M", value: 60, fill: "#14b8a6" }, // Mon
  { day: "T", value: 85, fill: "#06b6d4" }, // Tue
  { day: "W", value: 75, fill: "#10b981" }, // Wed
  { day: "T", value: 70, fill: "#6366f1" }, // Thu
  { day: "F", value: 65, fill: "#a855f7" }, // Fri
  { day: "S", value: 50, fill: "#f59e0b" }, // Sat
  { day: "S", value: 40, fill: "#ef4444" }, // Sun
];

function AttendanceCard({ branch_id }) {
  return (
    <>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-sm font-bold text-gray-600 dark:text-gray-300 font-display">
            Attendance Volume
          </h3>
          <p className="text-[10px] text-slate-500">Weekly Distribution</p>
        </div>
        <button className="text-slate-400 hover:text-slate-800 transition-colors">
          <span className="material-symbols-outlined text-sm">
            more_horiz
          </span>
        </button>
      </div>

      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#e5e7eb"
              strokeDasharray="2 2"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#64748b" }}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              contentStyle={{
                fontSize: "12px",
                borderRadius: "6px",
              }}
            />
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              barSize={18}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default AttendanceCard;

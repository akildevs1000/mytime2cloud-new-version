"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function DataTable({
  columns = [],
  data = [],
  isLoading = false,
  error = null,
  emptyMessage = "No data found.",
  onRowClick = () => {},
  pagination = null,
  className = "",
}) {
  return (
    <div className="glass-panel rounded-xl shadow-soft overflow-hidden">
      <div className="overflow-x-auto h-full max-h-[700px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
            <>
              {data.map((item, i) => (
                <tr
                  key={item.id || i}
                  className="hover:bg-white/50 dark:hover:bg-slate-700/30 transition-colors group cursor-pointer"
                  onClick={() => onRowClick(item)}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="py-4 px-6">
                      {col.render ? col.render(item) : item[col.key] || "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </>
          </tbody>
        </table>
      </div>
      {pagination && <div className="">{pagination}</div>}
    </div>
  );
}

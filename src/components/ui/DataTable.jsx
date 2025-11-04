"use client";

import { Loader2 } from "lucide-react";

export default function DataTable({
  columns = [],
  data = [],
  isLoading = false,
  error = null,
  emptyMessage = "No data found.",
  onRowClick = () => {},
  pagination = null,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 min-h-[800px] max-h-[400px] flex flex-col">
      {/* Table wrapper */}
      <div className="overflow-x-auto overflow-y-auto flex-1">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-12 text-center text-primary font-medium"
                >
                  <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin" />
                  Loading data...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-12 text-center text-red-600 font-medium bg-red-50"
                >
                  <p>Error: {error}</p>
                  <p className="mt-2 text-sm text-red-500">
                    Please check the console or refresh the page.
                  </p>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-12 text-center text-gray-500 font-medium"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, i) => (
                <tr
                  key={item.id || i}
                  className="border-b border-gray-200 hover:bg-indigo-50 transition-colors cursor-pointer"
                  onClick={() => onRowClick(item)}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="p-4 whitespace-nowrap text-gray-800"
                    >
                      {col.render ? col.render(item) : item[col.key] || "—"}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination sticky at bottom */}
      {pagination && (
        <div className="">
          {pagination}
        </div>
      )}
    </div>
  );
}

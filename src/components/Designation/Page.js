"use client";

import React, { useState, useEffect } from "react";
import { UserLock } from "lucide-react";
import { getDesignations } from "@/lib/api";

import Pagination from "@/lib/Pagination";
import DataTable from "@/components/ui/DataTable";
import Columns from "./columns";
import Create from "@/components/Designation/Create";
import { parseApiError } from "@/lib/utils";

export default function Designation() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchRecords();
  }, [currentPage, perPage]);

  const fetchRecords = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await getDesignations({
        page: currentPage,
        per_page: perPage,
      });

      if (result && Array.isArray(result.data)) {
        setRecords(result.data);
        setCurrentPage(result.current_page || 1);
        setTotal(result.total || 0);
      } else {
        throw new Error("Invalid data structure from API.");
      }
    } catch (error) {
      setError(parseApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const columns = Columns({
    onSuccess: fetchRecords, // refresh after edit
  });

  return (
    <>
      <div
        className="p-5 border-b border-gray-200 dark:border-white/20 flex items-center justify-between bg-white dark:bg-slate-900"
      >
        <div className="flex items-center gap-3">
          <div
            className="bg-emerald-500/10 p-2 rounded-lg text-emerald-400"
          >
            <span className="material-symbols-outlined">badge</span>
          </div>
          <h3 className="font-bold text-white text-lg">Designations</h3>
        </div>

        <Create onSuccess={fetchRecords} />

     
      </div>
      <div className="p-4 bg-surface-card">
        <div className="relative group">
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary material-symbols-outlined text-[20px] transition-colors"
          >search</span
          >
          <input
            className="w-full bg-background-dark text-white pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-slate-600 text-sm transition-all"
            placeholder="Search designations..."
            type="text"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto max-h-[500px] bg-white dark:bg-slate-900 p-2 space-y-1">
        <div
          className="group flex items-center justify-between p-3 rounded-lg hover:bg-background-dark/80 border border-transparent hover:border-gray-200 dark:border-white/20 transition-all cursor-pointer"
        >
          <div>
            <span className="text-gray-600 dark:text-gray-300 font-semibold text-sm block"
            >Senior Product Designer</span
            >
            <span
              className="inline-flex mt-1 items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            >
              Level L4
            </span>
          </div>
          <div className="flex items-center gap-1 opacity-100">
            <button
              className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                edit
              </span>
            </button>

            <button
              className="p-1.5 rounded-md hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                delete
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div className="flex flex-wrap items-center space-x-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <UserLock className="mr-3 h-6 w-6 text-primary" />
            Designation
          </h2>
        </div>

        
      </div>

      <DataTable
        className="bg-slate-50 overflow-hidden min-h-[300px]"
        columns={columns}
        data={records}
        isLoading={isLoading}
        error={error}
        pagination={
          <Pagination
            page={currentPage}
            perPage={perPage}
            total={total}
            onPageChange={setCurrentPage}
            onPerPageChange={(n) => {
              setPerPage(n);
              setCurrentPage(1);
            }}
            pageSizeOptions={[10, 25, 50]}
          />
        }
      />
    </>
  );
}

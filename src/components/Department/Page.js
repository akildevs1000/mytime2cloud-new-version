"use client";

import React, { useState, useEffect } from "react";
import { UserLock } from "lucide-react";
import { getDepartmentsForTable } from "@/lib/api";

import Pagination from "@/lib/Pagination";
import DataTable from "@/components/ui/DataTable";
import Columns from "./columns";
import Create from "./Create";
import SubDepartmentCreate from "../SubDepartment/Create";
import { parseApiError } from "@/lib/utils";

export default function Department() {
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

      const result = await getDepartmentsForTable({
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
        className="p-5 border-b border-gray-200 dark:border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900"
      >
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-400">
            <span className="material-symbols-outlined">domain</span>
          </div>
          <h3 className="font-bold text-white text-lg">Departments</h3>
        </div>
        <div className="flex items-center gap-3">
          {/* <button
            className="bg-primary hover:bg-blue-600 text-white text-sm font-semibold py-2 px-3 rounded-lg flex items-center gap-1 transition-all shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-[18px]"
            >add</span
            >
            Add Sub Department
          </button> */}

          <SubDepartmentCreate onSuccess={fetchRecords} />


          <Create onSuccess={fetchRecords} />

        </div>
      </div>
      <div
        className="p-4 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-white/20 flex items-center gap-4"
      >
        <div className="relative group flex-1">
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary material-symbols-outlined text-[20px] transition-colors"
          >search</span
          >
          <input
            className="w-full bg-background-dark text-white pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-slate-600 text-sm transition-all"
            placeholder="Search departments by name or code..."
            type="text"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto max-h-[500px] bg-white dark:bg-slate-900">
        <table
          className="w-full text-left border-collapse whitespace-nowrap"
        >
          <thead className="sticky top-0 z-10 bg-white dark:bg-slate-900">
            <tr
              className="text-xs text-slate-400 border-b border-gray-200 dark:border-white/20"
            >
              <th className="font-semibold py-3 px-6 w-1/3">Name</th>
              <th className="font-semibold py-3 px-4">Code</th>
              <th className="font-semibold py-3 px-4">Parent Dept</th>
              <th className="font-semibold py-3 px-4 text-center">
                Employees
              </th>
              <th className="font-semibold py-3 px-4">Last Modified</th>
              <th className="font-semibold py-3 px-4 w-12 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr
              className="group border-b border-gray-200 dark:border-white/10 transition-colors"
            >
              <td className="py-3 px-6">
                <div className="flex items-center gap-3  relative">


                  <div
                    className="w-8 h-8 rounded flex items-center justify-center bg-indigo-500/10 text-indigo-400"
                  >
                    <span className="material-symbols-outlined text-[18px]"
                    >apartment</span
                    >
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium"
                    >Frontend Development</span
                    >
                  </div>
                </div>
              </td>
              <td
                className="py-3 px-4 font-mono text-xs text-slate-500 group-hover:text-slate-400"
              >
                SUB-FE-01
              </td>
              <td className="py-3 px-4 text-blue-400 text-xs font-medium">
                -
              </td>
              <td className="py-3 px-4 text-center text-slate-300">45</td>
              <td className="py-3 px-4 text-slate-500 text-xs">
                Oct 26, 2023
              </td>
              <td className="py-3 px-4 text-center">
                <button
                  className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]"
                  >edit</span
                  >
                </button>
                <button
                  className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]"
                  >delete</span
                  >
                </button>
              </td>
            </tr>


            <tr
              className="group border-b border-gray-200 dark:border-white/10 transition-colors"
            >
              <td className="py-3 px-6">
                <div className="flex items-center gap-3  relative">


                  <div
                    className="w-8 h-8 rounded flex items-center justify-center bg-gray-500/10 text-indigo-400"
                  >

                  </div>
                  <div>
                    <span className="text-slate-400 font-medium"
                    >Frontend Development</span
                    >
                  </div>
                </div>
              </td>
              <td
                className="py-3 px-4 font-mono text-xs text-slate-500 group-hover:text-slate-400"
              >
                SUB-FE-01
              </td>
              <td className="py-3 px-4 text-blue-400 text-xs font-medium">
                Engineering
              </td>
              <td className="py-3 px-4 text-center text-slate-300">45</td>
              <td className="py-3 px-4 text-slate-500 text-xs">
                Oct 26, 2023
              </td>
              <td className="py-3 px-4 text-center">
                <button
                  className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]"
                  >edit</span
                  >
                </button>
                <button
                  className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]"
                  >delete</span
                  >
                </button>
              </td>
            </tr>


          </tbody>
        </table>
      </div>
    </>
  )

  return (
    <>
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div className="flex flex-wrap items-center space-x-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <UserLock className="mr-3 h-6 w-6 text-primary" />
            Department
          </h2>
        </div>

        <DepartmentCreate onSuccess={fetchRecords} />
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

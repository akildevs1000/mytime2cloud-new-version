"use client";

import React, { useState, useEffect } from "react";
import { getActivity } from "@/lib/api";

import Pagination from "@/lib/Pagination";
import DataTable from "@/components/ui/DataTable";
import Columns from "./columns";
import { parseApiError } from "@/lib/utils";
import DateRangeSelect from "../ui/DateRange";

export default function Activity() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [total, setTotal] = useState(0);


  useEffect(() => {
    fetchRecords();
  }, [currentPage, perPage, from, to]);

  const fetchRecords = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await getActivity({
        page: currentPage,
        per_page: perPage,
        from: from,
        to: to,
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
    pageTitle: "Activity"
  });

  return (
    <>
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div className="flex flex-wrap items-center space-x-3 space-y-2 sm:space-y-0">
          <h2 className="text-2xl font-extrabold text-gray-900 flex items-center">
            Activity
          </h2>

          <div className="flex flex-col">
            <DateRangeSelect
              value={{ from, to }}
              onChange={({ from, to }) => {
                setFrom(from);
                setTo(to);
              }
              } />
          </div>
        </div>

      </div>

      <DataTable
        className="bg-slate-50 overflow-hidden min-h-[700px]"
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

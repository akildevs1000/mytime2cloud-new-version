// Admin.jsx
"use client";

import React, { useState, useEffect } from "react";
import { UserLock } from "lucide-react";
import { getAdmins, parseApiError } from "@/lib/api";

import Pagination from "@/lib/Pagination";
import DataTable from "@/components/ui/DataTable";
import Columns from "./columns";
import AdminFormDialog from "@/components/Company/Admin/Create";

export default function Admin() {
  const [admins, setAdmins] = useState([]);
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

      const result = await getAdmins({
        page: currentPage,
        per_page: perPage,
      });

      if (result && Array.isArray(result.data)) {
        setAdmins(result.data);
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
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div className="flex flex-wrap items-center space-x-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <UserLock className="mr-3 h-6 w-6 text-primary" />
            Admin
          </h2>
        </div>

        {/* Add Admin Dialog */}
        <AdminFormDialog onSuccess={fetchRecords} />
      </div>

      <DataTable
        className="bg-slate-50 overflow-hidden min-h-[300px]"
        columns={columns}
        data={admins}
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

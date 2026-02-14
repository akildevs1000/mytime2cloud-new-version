"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getBranchesForTable } from "@/lib/api";

import Pagination from "@/lib/Pagination";
import DataTable from "@/components/ui/DataTable";
import Columns from "./columns";
import Create from "@/components/Branch/Create";
import { useRouter } from "next/navigation";
import { parseApiError } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Branch() {
  const [open, setOpen] = useState(false);
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

      const result = await getBranchesForTable({
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

  const router = useRouter();

  const handleRowClick = (employee) => {
    console.log(employee);
    // You can customize per row
    router.push(`/branch/short-list`);
  };

  const handleSuccess = () => {
    setOpen(false);
    fetchRecords();
  }

  const columns = Columns({
    onSuccess: fetchRecords,
    handleRowClick: handleRowClick,
  });

  return (
    <>
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div className="flex flex-wrap items-center space-x-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            Branches
          </h2>
        </div>


        <Button onClick={() => setOpen(true)}>Add Branch</Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="!w-[600px] !max-w-[90%] p-7 ">
            <DialogHeader>
              <DialogTitle>New Branch</DialogTitle>
            </DialogHeader>

            <Create setOpen={setOpen} onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
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

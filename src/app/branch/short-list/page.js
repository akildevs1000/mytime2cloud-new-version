"use client";


import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

import { getBranches, getBranchesForTable } from '@/lib/api';
import { EmployeeExtras } from '@/components/Employees/Extras';
import { Input } from '@/components/ui/input';
import { useRouter } from "next/navigation";
import BranchSingle from "@/components/Branch/Single";
import { parseApiError } from '@/lib/utils';

export default function EmployeeShortList() {

  const router = useRouter();


  const [searchTerm, setSearchTerm] = useState("");

  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [globalError, setGlobalError] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10); // Default to 10 for a cleaner table, even if the API suggests 100
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [open, setOpen] = useState(false);
  const [branches, setBranches] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSelectBranch = (currentValue) => {
    if (currentValue === "Select All") {
      setSelectedBranch(null);
    } else {
      const selectedBranchItem = branches.find((b) => b.name === currentValue);
      if (selectedBranchItem) {
        setSelectedBranch(
          selectedBranchItem.id === selectedBranch ? null : selectedBranchItem.id
        );
      }
    }
    setOpen(false);
  };

  // Fetch branches
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setBranches(await getBranches());
      } catch (error) {
        setGlobalError(parseApiError(error));
      }
    };
    fetchBranches();
  }, []);


  const fetchEmployees = useCallback(async (page, perPage) => {
    setError(null);

    try {
      const params = {
        page: page,
        per_page: perPage,
        sortDesc: 'false',
        branch_id: selectedBranch,
        search: searchTerm || null, // Only include search if it's not empty
      };
      const result = await getBranchesForTable(params);

      // Check if result has expected structure before setting state
      if (result && Array.isArray(result.data)) {
        setEmployees(result.data);
        setCurrentPage(result.current_page || 1);
        setTotalPages(result.last_page || 1);
        setTotalEmployees(result.total || 0);
        setSelectedEmployee(result.data[0] || null); // Select the first employee by default
        return; // Success, exit
      } else {
        // If the API returned a 2xx status but the data structure is wrong
        throw new Error('Invalid data structure received from API.');
      }

    } catch (error) {
      setGlobalError(parseApiError(error));
    }
  }, [perPage, selectedBranch, searchTerm]);



  useEffect(() => {
    fetchEmployees(currentPage, perPage);
  }, [currentPage, perPage, fetchEmployees]); // Re-fetch when page or perPage changes

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
  }

  const renderEmployeeRow = (employee) => {
    return (
      <li key={employee.id}
        className="p-4 flex items-center space-x-4 hover:bg-primary/10 cursor-pointer bg-white"
        onClick={() => handleRowClick(employee)}
      >
        <img
          alt="avatar of jane cooper"
          className="w-10 h-10 rounded-full"
          src={`https://placehold.co/40x40/6946dd/ffffff?text=${employee.branch_name.charAt(0)}`}
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/40x40/6946dd/ffffff?text=${employee.full_name.charAt(0)}`; }}
        />
        <div>
          <p className="font-medium text-text-light dark:text-text-dark">
            {employee.branch_name}
          </p>
          <p className="text-sm text-subtext-light dark:text-subtext-dark">
            {employee.address || 'N/A'}
          </p>
        </div>
      </li>
    );
  };

  return (
    <>
      <div className="flex flex-1 gap-6">
        <div
          className="w-80 bg-surface-light dark:bg-surface-dark border-r border-border flex flex-col"
        >
          <div
            className="p-4 border-b border-border-light dark:border-border-dark flex justify-between items-center"
          >
            <h2 className="text-lg font-semibold">Branches</h2>
            <Link href="/employees/create">
              <button className="p-2 rounded-lg bg-primary text-white">
                <span className="material-icons">add</span>
              </button>
            </Link>
          </div>
          <div className="p-4 space-y-4">

            <div className="flex items-center space-x-2">


              <div className="relative flex-grow">
                <span
                  className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark"
                >search</span
                >
                <Input
                  className="w-full  pl-10 pr-4 py-2 rounded-lg border border-border-light dark:border-border-dark   focus:ring-primary focus:border-primary"
                  placeholder="Search Branch"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-border-light dark:divide-border-dark">
              {employees.map(renderEmployeeRow)}
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <BranchSingle initialData={selectedEmployee} />
        </div>
      </div>
    </>
  );
}

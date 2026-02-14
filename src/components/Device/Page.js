"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Plus, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { deleteDevice, getBranches, getDevices, removeEmployee } from '@/lib/api';

import Columns from "./columns";
import DataTable from '@/components/ui/DataTable';
import Pagination from '@/lib/Pagination';
import { parseApiError } from '@/lib/utils';
import MultiDropDown from '@/components/ui/MultiDropDown';

export default function EmployeeDataTable() {

  const router = useRouter();

  const [branches, setBranches] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedBranchIds, setSelectedBranchIds] = useState([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotalEmployees] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    const fetchBranches = async () => {
      try {
        setBranches(await getBranches());
      } catch (error) {
        setError(parseApiError(error));
      }
    };

    fetchBranches();
  }, []);



  const fetchEmployees = useCallback(async (page, perPage) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = {
        page: page,
        per_page: perPage,
        sortDesc: 'false',
        branch_ids: selectedBranchIds.length > 0 ? selectedBranchIds : [],
        search: searchTerm || null, // Only include search if it's not empty
      };
      const result = await getDevices(params);

      // Check if result has expected structure before setting state
      if (result && Array.isArray(result.data)) {
        setEmployees(result.data);
        setCurrentPage(result.current_page || 1);
        setTotalEmployees(result.total || 0);
        setIsLoading(false);
      } else {
        // If the API returned a 2xx status but the data structure is wrong
        throw new Error('Invalid data structure received from API.');
      }

    } catch (error) {
      setError(parseApiError(error));
      setIsLoading(false);
    }
  }, [perPage, selectedBranchIds, searchTerm]);


  useEffect(() => {
    fetchEmployees(currentPage, perPage);
  }, [currentPage, perPage, fetchEmployees]); // Re-fetch when page or perPage changes

  const handleRefresh = () => {
    fetchEmployees(currentPage, perPage);
  }

  const deleteEmployee = async (id) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteDevice(id);
        fetchEmployees(currentPage, perPage);
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  }

  const editEmployee = async (id) => {
    router.push(`/employees/edit?id=${id}`)
  }

  return (
    <div className='overflow-y-auto max-h-[calc(100vh-100px)]'>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6  sm:space-y-0">
        <h1 className="text-2xl font-extrabold text-gray-600 dark:text-gray-300 flex items-center">
          {/* <User className="w-7 h-7 mr-3 text-indigo-600" /> */}
          Devices
        </h1>
        <div className="flex flex-wrap items-center space-x-3 space-y-2 sm:space-y-0">
          <div className="relative">
            <MultiDropDown
              placeholder={'Select Branch'}
              items={branches}
              value={selectedBranchIds}
              onChange={setSelectedBranchIds}
              badgesCount={1}
              width='w-[220px]'
            />
          </div>
          {/* <div className="relative">
                        <Input
                            placeholder="Search by name or ID"
                            icon="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <IconButton
                        icon={RefreshCw}
                        onClick={handleRefresh}
                        isLoading={isLoading}
                        title="Refresh Data"
                    /> */}

          {/* New Employee Button */}
          <Link href="/device/create">
            <button className="bg-primary text-white px-4 py-1 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all flex items-center space-x-2 whitespace-nowrap">
              <Plus className="w-4 h-4" />
              <span>New</span>
            </button>
          </Link>
        </div>
      </div>

      <DataTable
        columns={Columns(deleteEmployee, editEmployee)}
        data={employees}
        isLoading={isLoading}
        error={error}
        onRowClick={(item) => {}}
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
    </div>
  );
}

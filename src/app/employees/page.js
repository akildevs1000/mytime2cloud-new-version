"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Plus, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { getEmployees, removeEmployee } from '@/lib/api';
import { EmployeeExtras } from '@/components/Employees/Extras';
import BranchSelect from '@/components/ui/BranchSelect';

import Columns from "./columns";
import DataTable from '@/components/ui/DataTable';
import Pagination from '@/lib/Pagination';
import { parseApiError } from '@/lib/utils';

export default function EmployeeDataTable() {

    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotalEmployees] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedBranch, setSelectedBranch] = useState(null);


    const fetchEmployees = useCallback(async (page, perPage) => {
        setIsLoading(true);
        setError(null);

        try {
            const params = {
                page: page,
                per_page: perPage,
                sortDesc: 'false',
                branch_id: selectedBranch,
                search: searchTerm || null, // Only include search if it's not empty
            };
            const result = await getEmployees(params);

            // Check if result has expected structure before setting state
            if (result && Array.isArray(result.data)) {
                setEmployees(result.data);
                setCurrentPage(result.current_page || 1);
                setTotalEmployees(result.total || 0);
                setIsLoading(false);
                return; // Success, exit
            } else {
                // If the API returned a 2xx status but the data structure is wrong
                throw new Error('Invalid data structure received from API.');
            }

        } catch (error) {
            setError(parseApiError(error));
            setIsLoading(false);
        }
    }, [perPage, selectedBranch, searchTerm]);

    const router = useRouter();


    useEffect(() => {
        fetchEmployees(currentPage, perPage);
    }, [currentPage, perPage, fetchEmployees]); // Re-fetch when page or perPage changes

    const handleRefresh = () => {
        fetchEmployees(currentPage, perPage);
    }

    const deleteEmployee = async (id) => {
        if (confirm("Are you sure you want to delete this employee?")) {
            try {
                await removeEmployee(id);
                fetchEmployees(currentPage, perPage);
            } catch (error) {
                console.error("Error deleting employee:", error);
            }
        }
    }

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6  sm:space-y-0">
                <h1 className="text-2xl font-extrabold text-gray-900 flex items-center">
                    {/* <User className="w-7 h-7 mr-3 text-indigo-600" /> */}
                    Employees
                </h1>
                <div className="flex flex-wrap items-center space-x-3 space-y-2 sm:space-y-0">
                    <div className="relative">
                        <BranchSelect
                            selectedBranchId={selectedBranch}
                            onSelect={(id) => { setSelectedBranch(id); setCurrentPage(1); }}
                        />
                    </div>


                    {/* Search Input */}
                    <div className="relative">
                        <Input
                            className="pl-10 bg-white h-9 w-full" // Increased left padding (pl-10) for the icon
                            placeholder="Search by name or ID"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>

                    {/* Refresh Button */}
                    <button
                        onClick={handleRefresh}
                        disabled={isLoading}
                        className="p-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
                        title="Refresh Data"
                    >
                        <RefreshCw className={`w-4 h-4  ${isLoading ? 'animate-spin' : ''}`} />
                    </button>

                    <EmployeeExtras data={employees} onUploadSuccess={fetchEmployees} />


                    {/* New Employee Button */}
                    <Link href="/employees/create">
                        <button className="bg-primary text-white px-4 py-1 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all flex items-center space-x-2 whitespace-nowrap">
                            <Plus className="w-4 h-4" />
                            <span>New</span>
                        </button>
                    </Link>
                </div>
            </div>

            <DataTable
                columns={Columns(deleteEmployee)}
                data={employees}
                isLoading={isLoading}
                error={error}
                onRowClick={(item) => router.push('/employees-short-list')}
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

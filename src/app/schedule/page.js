"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Plus, RefreshCw } from 'lucide-react';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { getScheduleEmployees } from '@/lib/api';
import BranchSelect from '@/components/ui/BranchSelect';
import DataTable from '@/components/ui/DataTable';
import Pagination from '@/lib/Pagination';
import { useRouter } from "next/navigation";

import Columns from "./columns";
import { parseApiError } from '@/lib/utils';

export default function List() {

    const router = useRouter();

    const handleRowClick = (employee) => {
        console.log(employee);
        // You can customize per row
        router.push(`/schedule/short-list`);
    };


    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10); // Default to 10 for a cleaner table, even if the API suggests 100
    const [total, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedBranch, setSelectedBranch] = useState(null);

    const fetchRecords = useCallback(async (page, perPage) => {
        setIsLoading(true);
        setError(null);

        try {
            const params = {
                page: page,
                per_page: perPage,
                sortDesc: 'false',
                branch_id: selectedBranch,
                common_search: searchTerm || null, // Only include search if it's not empty
            };
            const result = await getScheduleEmployees(params);

            // Check if result has expected structure before setting state
            if (result && Array.isArray(result.data)) {
                setRecords(result.data);
                setCurrentPage(result.current_page || 1);
                setTotalPages(result.last_page || 1);
                setIsLoading(false);
                return; // Success, exit
            } else {
                // If the API returned a 2xx status but the data structure is wrong
                throw new Error('Invalid data structure received from API.');
            }

        } catch (error) {
            setError(parseApiError(error))
            setIsLoading(false); // Make sure loading state is turned off on error
        }
    }, [perPage, selectedBranch, searchTerm]);


    useEffect(() => {
        fetchRecords(currentPage, perPage);
    }, [currentPage, perPage, fetchRecords]); // Re-fetch when page or perPage changes

    const handleRefresh = () => {
        fetchRecords(currentPage, perPage);
    }

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6  sm:space-y-0">
                <h1 className="text-2xl font-extrabold text-gray-900 flex items-center">
                    {/* <User className="w-7 h-7 mr-3 text-indigo-600" /> */}
                    Schedule Employees
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

                    {/* <EmployeeExtras data={records} onUploadSuccess={fetchRecords} /> */}


                    {/* New Employee Button */}
                    <Link href="/schedule/create">
                        <button className="bg-primary text-white px-4 py-1 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all flex items-center space-x-2 whitespace-nowrap">
                            <Plus className="w-4 h-4" />
                            <span>New</span>
                        </button>
                    </Link>
                </div>
            </div>

            <DataTable
                columns={Columns(handleRowClick)}
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

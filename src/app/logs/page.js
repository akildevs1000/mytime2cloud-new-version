"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Search, RefreshCw } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { getDeviceLogs, parseApiError } from '@/lib/api';
import BranchSelect from '@/components/ui/BranchSelect';
import DeviceSelect from '@/components/ui/DeviceSelect';
import Pagination from '@/lib/Pagination';
import DataTable from '@/components/ui/DataTable';
import Columns from './columns';

export default function EmployeeDataTable() {

    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10); // Default to 10 for a cleaner table, even if the API suggests 100
    const [total, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);

    const fetchRecords = useCallback(async (page, perPage) => {
        setIsLoading(true);
        setError(null);

        try {
            const params = {
                page: page,
                per_page: perPage,
                sortDesc: 'false',
                branch_id: selectedBranch,
                device: selectedDevice,
                UserID: searchTerm || null, // Only include search if it's not empty
            };
            const result = await getDeviceLogs(params);

            // Check if result has expected structure before setting state
            if (result && Array.isArray(result.data)) {
                setEmployees(result.data);
                setCurrentPage(result.current_page || 1);
                setTotalPages(result.last_page || 1);
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
    }, [perPage, selectedDevice, searchTerm]);


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
                    Device Logs
                </h1>
                <div className="flex flex-wrap items-center space-x-3 space-y-2 sm:space-y-0">
                    <div className="relative">
                        {selectedBranch}
                        <BranchSelect
                            selectedBranchId={selectedBranch}
                            onSelect={(id) => { setSelectedBranch(id); }}
                        />
                    </div>

                    <div className="flex flex-col">
                        <DeviceSelect
                            selectedBranchId={selectedBranch}
                            value={selectedDevice}
                            onChange={(device_id) => { setSelectedDevice(device_id); setCurrentPage(1); }}
                        />
                    </div>

                    <div className="flex flex-col">
                        <Input
                            className="pl-10 bg-white h-9 w-full" // Increased left padding (pl-10) for the icon
                            placeholder="Search by Employee ID"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>

                    <button
                        onClick={handleRefresh}
                        disabled={isLoading}
                        className="p-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
                        title="Refresh Data"
                    >
                        <RefreshCw className={`w-4 h-4  ${isLoading ? 'animate-spin' : ''}`} />
                    </button>

                    {/* <EmployeeExtras data={employees} onUploadSuccess={fetchEmployees} /> */}
                </div>
            </div>

            <DataTable
                columns={Columns}
                data={employees}
                isLoading={isLoading}
                error={error}
                onRowClick={(item) => console.log("Clicked:", item)}
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

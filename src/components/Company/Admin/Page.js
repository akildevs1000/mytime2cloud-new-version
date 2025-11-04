"use client";

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

import { getAdmins, parseApiError } from '@/lib/api';

import DropDown from '@/components/ui/DropDown';
import Pagination from '@/lib/Pagination';
import DataTable from '@/components/ui/DataTable';
import Columns from "./columns";

export default function Admin() {

    const [employees, setAttendance] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [total, setTotalAttendance] = useState(0);

  

    const handleRowClick = async () => {
        console.log(`Row clicked`)
    };


    useEffect(() => {
        fetchRecords();
    }, [currentPage, perPage]);

    const fetchRecords = async () => {
        try {
            setIsLoading(true);

            const params = {
                page: currentPage,
                per_page: perPage,
            };

            const result = await getAdmins(params);

            console.log(result.data);

            // Check if result has expected structure before setting state
            if (result && Array.isArray(result.data)) {
                setAttendance(result.data);
                setCurrentPage(result.current_page || 1);
                setTotalAttendance(result.total || 0);
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
    };

    return (
        <>
            <div className="flex flex-wrap items-center justify-between mb-6">
                {/* Left side: Title + Dropdown */}
                <div className="flex flex-wrap items-center space-x-3 space-y-2 sm:space-y-0">
                    <h1 className="text-2xl font-extrabold text-gray-900 flex items-center">
                        Admins
                    </h1>
                </div>

                {/* Right side: Refresh Button */}
                <button
                    onClick={fetchRecords}
                    className="bg-primary text-white px-4 py-1 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all flex items-center space-x-2 whitespace-nowrap"
                >
                    <Plus className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                    New Device
                </button>
            </div>


            <DataTable
                className="bg-slate-50  overflow-hidden min-h-[300px]"
                columns={Columns(handleRowClick)}
                data={employees}
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

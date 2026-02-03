"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Plus, RefreshCw } from 'lucide-react';
import Link from 'next/link';

import Input from '@/components/Theme/Input';
import { getBranches, getDepartments, getScheduleEmployees } from '@/lib/api';

import DataTable from '@/components/ui/DataTable';
import Pagination from '@/lib/Pagination';
import { useRouter } from "next/navigation";

import Columns from "./columns";
import { parseApiError } from '@/lib/utils';
import Dropdown from '@/components/Theme/DropDown';
import IconButton from '@/components/Theme/IconButton';
import DateRangeSelect from '@/components/ui/DateRange';

export default function List() {

    const router = useRouter();

    const handleRowClick = (employee) => {
        console.log(employee);
        // You can customize per row
        router.push(`/payslips/short-list`);
    };


    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10); // Default to 10 for a cleaner table, even if the API suggests 100
    const [total, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedBranch, setSelectedBranch] = useState({ name: "Select Branch", id: "" });
    const [selectedDepartment, setSelectedDepartment] = useState({ name: "Select Department", id: "" });
    const [selectedStatus, setSelectedStatus] = useState({ name: "Select Status", id: "" });


    const [branches, setBranches] = useState([]);
    const [departments, setDepartments] = useState([]);

    const fetchDropdowns = async () => {
        try {
            setBranches([{ name: "Select All", id: "" }, ...await getBranches()]);
            setDepartments([{ name: "Select All", id: "" }, ...await getDepartments()]);
        } catch (error) {
            setError(parseApiError(error));
        }
    };

    useEffect(() => {
        fetchDropdowns();
    }, []);

    const fetchRecords = useCallback(async (page, perPage) => {
        setIsLoading(true);
        setError(null);

        try {
            const params = {
                page: page,
                per_page: perPage,
                sortDesc: 'false',
                branch_id: selectedBranch.id,
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
        <div className='p-10'>


            <div className='space-y-5'>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6  sm:space-y-0">
                    <h1 className="text-2xl font-extrabold text-gray-600 dark:text-gray-300 flex items-center">
                        {/* <User className="w-7 h-7 mr-3 text-indigo-600" /> */}
                        Payslips
                    </h1>
                    <div className="flex flex-wrap items-center space-x-3 space-y-2 sm:space-y-0">
                        <div className="relative">
                            <Dropdown
                                items={branches}
                                selectedItem={selectedBranch}
                                onSelect={(item) => {
                                    setSelectedBranch(item);
                                    setCurrentPage(1); // Any extra logic goes here
                                }}
                                placeholder="Select Branch"
                                width="w-[250px]"
                            />
                        </div>

                        <div className="relative">
                            <Dropdown
                                items={departments}
                                selectedItem={selectedDepartment}
                                onSelect={(item) => {
                                    setSelectedDepartment(item);
                                    setCurrentPage(1); // Any extra logic goes here
                                }}
                                placeholder="Select Department"
                                width="w-[250px]"
                            />
                        </div>



                        <div className="relative">
                            <Dropdown
                                items={[
                                    {
                                        id: "November 2026", name: "November 2026",

                                    },
                                    {
                                        id: "October 2026", name: "October 2026",

                                    },
                                    { id: "September 2026", name: "September 2026", }
                                ]}
                                placeholder="December 2026"
                                width="w-[250px]"
                            />
                        </div>

                        <IconButton
                            icon={RefreshCw}
                            onClick={handleRefresh}
                            isLoading={isLoading}
                            title="Refresh Data"
                        />

                        <div className="h-8 w-px bg-border mx-1"></div>
                        <button className="p-2 text-gray-600 dark:text-slate-300 hover:text-indigo-500 rounded-lg transition-colors">
                            <span className="material-symbols-outlined">print</span>
                        </button>
                        <button className="p-2 text-gray-600 dark:text-slate-300 hover:text-indigo-500 rounded-lg transition-colors">
                            <span className="material-symbols-outlined">mail</span>
                        </button>
                        <button className="ml-2 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg transition-all active:scale-95">
                            <span className="material-symbols-outlined text-[20px]">download</span>
                            <span className="text-sm font-semibold">Download</span>
                        </button>

                        {/* <EmployeeExtras data={records} onUploadSuccess={fetchRecords} /> */}

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
            </div>
        </div>
    );
}

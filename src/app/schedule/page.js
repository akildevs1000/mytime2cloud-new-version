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
import Create from '@/components/Schedule/Create';

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

    const [selectedBranch, setSelectedBranch] = useState({ name: "Select Branch", id: "" });
    const [selectedDepartment, setSelectedDepartment] = useState({ name: "Select Department", id: "" });
    const [selectedShiftStatus, setSelectedShiftStatus] = useState({ name: "Select Scheduled / Un Scheduled", id: "" });


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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Visitors Today */}
                    <div className="glass-panel bg-white dark:bg-slate-900/50 rounded-xl p-5 flex flex-col gap-1 relative overflow-hidden group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all duration-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/20 shadow-sm dark:shadow-none">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                                    Total Workforce
                                </p>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 drop-shadow-sm dark:drop-shadow-md">
                                    42
                                </h3>
                            </div>
                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                                <span className="material-symbols-outlined">groups</span>
                            </div>
                        </div>
                    </div>

                    {/* Currently On-site */}
                    <div className="glass-panel bg-white dark:bg-slate-900/50 rounded-xl p-5 flex flex-col gap-1 relative overflow-hidden group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all duration-300 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                                    Shift Assigned
                                </p>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 drop-shadow-sm dark:drop-shadow-md">
                                    18
                                </h3>
                            </div>
                            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                                <span className="material-symbols-outlined">
                                    domain_verification
                                </span>
                            </div>
                        </div>
                        {/* <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden border border-slate-300/50 dark:border-slate-700/50">
                            <div
                                className="bg-indigo-500 h-full rounded-full shadow-[0_0_10px_rgba(99,102,241,0.3)] dark:shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                style={{ width: "45%" }}
                            ></div>
                        </div> */}
                    </div>

                    {/* Expected */}
                    <div className="glass-panel bg-white dark:bg-slate-900/50 rounded-xl p-5 flex flex-col gap-1 relative overflow-hidden group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all duration-300 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                                    Unscheduled
                                </p>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 drop-shadow-sm dark:drop-shadow-md">
                                    5
                                </h3>
                            </div>
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400 border border-purple-500/20">
                                <span className="material-symbols-outlined">schedule</span>
                            </div>
                        </div>
                        {/* <div className="flex -space-x-2 mt-3 overflow-hidden pl-1">
                            <img
                                alt="Expected visitor"
                                className="inline-block size-6 rounded-full ring-2 ring-white dark:ring-[#1e293b]"
                                src="https://i.pravatar.cc/150?u=0"
                            />
                            <img
                                alt="Expected visitor"
                                className="inline-block size-6 rounded-full ring-2 ring-white dark:ring-[#1e293b]"
                                src="https://i.pravatar.cc/150?u=1"
                            />
                            <div className="size-6 rounded-full bg-slate-100 dark:bg-slate-800 ring-2 ring-white dark:ring-[#1e293b] flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                                +3
                            </div>
                        </div> */}
                    </div>

                    {/* Pending Approval */}
                    <div className="glass-panel bg-white dark:bg-slate-900/50 rounded-xl p-5 flex flex-col gap-1 relative overflow-hidden group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all duration-300 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                                    Upcoming Expiry
                                </p>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 drop-shadow-sm dark:drop-shadow-md">
                                    3
                                </h3>
                            </div>
                            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                <span className="material-symbols-outlined">pending_actions</span>
                            </div>
                        </div>
                        {/* <div className="flex items-center mt-3 text-sm">
                            <span className="text-amber-700 dark:text-amber-400 font-medium flex items-center bg-amber-500/10 dark:bg-amber-500/5 px-1.5 py-0.5 rounded border border-amber-500/20 dark:border-amber-500/10">
                                <span className="material-symbols-outlined text-sm mr-0.5">
                                    error
                                </span>
                                Action needed
                            </span>
                        </div> */}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6  sm:space-y-0">
                    <h1 className="text-2xl font-extrabold text-gray-600 dark:text-gray-300 flex items-center">
                        {/* <User className="w-7 h-7 mr-3 text-indigo-600" /> */}
                        Schedule Employees
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
                                width="w-[320px]"
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
                                width="w-[320px]"
                            />
                        </div>


                        <div className="relative">
                            <Dropdown
                                items={[
                                    { id: "Schedule", name: "Schedule" },
                                    { id: "Un Schedule", name: "Un Schedule" },
                                ]}
                                selectedItem={selectedShiftStatus}
                                onSelect={(item) => {
                                    setSelectedShiftStatus(item);
                                    setCurrentPage(1); // Any extra logic goes here
                                }}
                                placeholder="Select Schedule/Un Schedule"
                                width="w-[320px]"
                            />
                        </div>


                        {/* Search Input */}
                        <div className="relative">
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
                        />

                        {/* <EmployeeExtras data={records} onUploadSuccess={fetchRecords} /> */}


                        {/* New Employee Button */}
                        <Create onSuccess={fetchRecords} />
                        {/* <Link href="/schedule/create">
                            <button className="bg-primary text-white px-4 py-1 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all flex items-center space-x-2 whitespace-nowrap">
                                <Plus className="w-4 h-4" />
                                <span>New</span>
                            </button>
                        </Link> */}
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

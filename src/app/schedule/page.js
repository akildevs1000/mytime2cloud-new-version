"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

import Input from '@/components/Theme/Input';
import { getBranches, getDepartmentsByBranchIds, getScheduleEmployees, getScheduleStats, removeEmployeeSchedule } from '@/lib/api';

import DataTable from '@/components/ui/DataTable';
import Pagination from '@/lib/Pagination';

import Columns from "./columns";
import { parseApiError } from '@/lib/utils';
import IconButton from '@/components/Theme/IconButton';
import Create from '@/components/Schedule/Create';
import MultiDropDown from '@/components/ui/MultiDropDown';
import { SCHEDULE_STATS } from '@/lib/dropdowns';

export default function SchedulePage() {

    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedBranchIds, setSelectedBranchIds] = useState([]);
    const [selectedDepartmentIds, setSelectedDepartmentIds] = useState([]);

    const [stats, setStats] = useState(SCHEDULE_STATS);

    const [branches, setBranches] = useState([]);
    const [departments, setDepartments] = useState([]);

    const fetchDropdowns = async () => {
        try {
            setBranches(await getBranches());
            setStats(await getScheduleStats());
        } catch (error) {
            setError(parseApiError(error));
        }
    };

    useEffect(() => {
        const fetchDepartmentIds = async (selectedBranchIds) => {
            try {
                setDepartments(await getDepartmentsByBranchIds(selectedBranchIds));
            } catch (error) {
                setError(parseApiError(error));
            }
        };

        fetchDepartmentIds(selectedBranchIds)

    }, [selectedBranchIds]);


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
                branch_ids: selectedBranchIds,
                common_search: searchTerm || null, // Only include search if it's not empty
            };
            const result = await getScheduleEmployees(params);

            // Check if result has expected structure before setting state
            if (result && Array.isArray(result.data)) {
                setRecords(result.data);
                setCurrentPage(result.current_page || 1);
                setTotalPages(result.total || 1);
                setIsLoading(false);
                return;
            } else {
                // If the API returned a 2xx status but the data structure is wrong
                throw new Error('Invalid data structure received from API.');
            }

        } catch (error) {
            setError(parseApiError(error))
            setIsLoading(false); // Make sure loading state is turned off on error
        }
    }, [perPage, selectedBranchIds, searchTerm]);


    useEffect(() => {
        fetchRecords(currentPage, perPage);
    }, [currentPage, perPage, fetchRecords]); // Re-fetch when page or perPage changes

    const handleRefresh = async () => {
        setStats(await getScheduleStats());
        fetchRecords(currentPage, perPage);
    }


    const deleteItem = async (id) => {
        if (confirm("Are you sure you want to delete this employee?")) {
            try {
                await removeEmployeeSchedule(id);
                handleRefresh();
            } catch (error) {
                console.error("Error deleting employee:", error);
            }
        }
    }

    return (
        <div className='p-4 pb-24 overflow-y-auto max-h-[calc(100vh-100px)]'>
            <div className='space-y-5'>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="glass-panel bg-white dark:bg-slate-900/50 rounded-xl p-5 flex flex-col gap-1 relative overflow-hidden group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all duration-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/20 shadow-sm dark:shadow-none"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                                        {stat.label}
                                    </p>
                                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 drop-shadow-sm dark:drop-shadow-md">
                                        {stat.value}
                                    </h3>
                                </div>

                                {/* Dynamic Color Container */}
                                <div className={` p-2 rounded-lg border shadow-sm ${stat.class}`}>
                                    <span className="material-symbols-outlined">
                                        {stat.icon}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6  sm:space-y-0">
                    <h1 className="text-2xl font-extrabold text-gray-600 dark:text-gray-300 flex items-center">
                        {/* <User className="w-7 h-7 mr-3 text-indigo-600" /> */}
                        Schedule Employees
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

                        <div className="relative">
                            <MultiDropDown
                                placeholder={'Select Department'}
                                items={departments}
                                value={selectedDepartmentIds}
                                onChange={setSelectedDepartmentIds}
                                badgesCount={1}
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

                        <Create onSuccess={handleRefresh} />

                    </div>
                </div>

                <DataTable
                    columns={Columns(deleteItem)}
                    data={records}
                    isLoading={isLoading}
                    error={error}
                    onRowClick={(item) => console.log(`${item}`)}
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

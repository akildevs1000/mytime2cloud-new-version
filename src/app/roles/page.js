"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

import { getBranches, getDeviceList, getDeviceLogs } from '@/lib/api';

import DropDown from '@/components/ui/DropDown';
import DateRangeSelect from "@/components/ui/DateRange";
import Pagination from '@/lib/Pagination';
import { EmployeeExtras } from '@/components/Employees/Extras';
import DataTable from '@/components/ui/DataTable';
import Columns from "./columns";
import { parseApiError } from '@/lib/utils';
import Input from '@/components/Theme/Input';
import Dropdown from '@/components/Theme/DropDown';
import Link from 'next/link';



export default function AttendanceTable() {

    // filters
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedDeviceId, setSelectedDevice] = useState(null);

    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);

    const [employees, setAttendance] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [total, setTotalAttendance] = useState(0);

    const [branches, setBranches] = useState([]);
    const [devices, setDevices] = useState([]);

    const fetchBranches = async () => {
        try {
            setBranches(await getBranches());
        } catch (error) {
            setError(parseApiError(error));
        }
    };

    const fetchDevices = async () => {
        if (!selectedBranch) return;
        try {
            let result = await getDeviceList(selectedBranch);
            setDevices(result.map((e) => ({ name: e.name, id: e.device_id })));
        } catch (error) {
            setError(parseApiError(error));
        }
    };


    useEffect(() => {
        fetchBranches();
    }, []);


    useEffect(() => {
        fetchDevices();
    }, [selectedBranch]);

    useEffect(() => {
        fetchRecords();
    }, [currentPage, perPage]);

    const fetchRecords = async () => {
        try {
            setIsLoading(true);

            const params = {
                page: currentPage,
                per_page: perPage,
                sortDesc: 'false',
                device: selectedDeviceId,
                branch_id: selectedBranch,
                from_date: from,
                to_date: to,
            };

            const result = await getDeviceLogs(params);

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
            {/* <div className="flex flex-wrap items-center space-x-3 space-y-2 mb-6 sm:space-y-0">
                <h1 className="text-2xl font-extrabold text-gray-900 flex items-center">
                    Device Logs
                </h1>

                <div className="flex flex-col">
                    <DropDown
                        placeholder={'Select Branch'}
                        onChange={setSelectedBranch}
                        value={selectedBranch}
                        items={branches}
                    />
                </div>

                <div className="flex flex-col">
                    <DropDown
                        placeholder={'Select Device'}
                        onChange={setSelectedDevice}
                        value={selectedDeviceId}
                        items={devices}
                    />
                </div>


                <div className="flex flex-col">
                    <DateRangeSelect
                        value={{ from, to }}
                        onChange={({ from, to }) => {
                            setFrom(from);
                            setTo(to);
                        }
                        } />
                </div>

                <button onClick={fetchRecords} className="bg-primary text-white px-4 py-1 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all flex items-center space-x-2 whitespace-nowrap">
                    <RefreshCw className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} /> Submit
                </button>

            </div> */}

            <div className="p-10">
                <div
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
                >
                    <div>

                        <h1 className="text-3xl font-bold text-gray-600 dark:text-gray-300 tracking-tight mb-2">
                            Role Management Directory
                        </h1>
                        <p className="text-slate-500 max-w-2xl text-base leading-relaxed">
                            Define user roles, configure permissions across modules, and manage
                            access levels for your organization's workforce.
                        </p>
                    </div>
                    <Link href="/roles/create">
                        <button
                            className="group px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/30 transition-all duration-200 flex items-center gap-2 transform active:scale-95 whitespace-nowrap"
                        >
                            <span
                                className="material-icons-outlined text-xl group-hover:rotate-90 transition-transform"
                            >add</span
                            >
                            CREATE NEW ROLE
                        </button>
                    </Link>

                </div>
                <div
                    className="glass-panel rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm"
                >
                    <div
                        className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto"
                    >
                        <div className="relative w-full md:w-80 group">
                            <Input
                                placeholder="Search by name or ID"
                                icon="search"
                                onChange={(e) => { }}
                            />

                        </div>
                        <div className="relative w-full md:w-64 group">
                            <span
                                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                            >
                                <span
                                    className="material-icons-outlined text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                                >filter_alt</span
                                >
                            </span>

                            <Dropdown
                                items={[
                                    {
                                        "id": "hr",
                                        "name": "Human Resources"
                                    },
                                    {
                                        "id": "it",
                                        "name": "IT & Security"
                                    },
                                    {
                                        "id": "ops",
                                        "name": "Operations"
                                    },
                                    {
                                        "id": "finance",
                                        "name": "Finance"
                                    }
                                ]}

                                onSelect={(item) => { }}

                                placeholder="Select a Departments"
                                width="w-[320px]"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span className="hidden md:inline font-medium">Sort by:</span>
                        <div className="relative">

                            <Dropdown
                                items={[
                                    {
                                        "id": "1",
                                        "name": "Last Modified"
                                    },
                                    {
                                        "id": "2",
                                        "name": "Role Name (A-Z)"
                                    },
                                    {
                                        "id": "3",
                                        "name": "User Count"
                                    },

                                ]}

                                onSelect={(item) => { }}

                                placeholder="Select a Departments"
                                width="w-[320px]"
                            />

                        </div>
                    </div>
                </div>
                <div
                    className="hidden md:grid grid-cols-12 gap-6 px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2"
                >
                    <div className="col-span-3">Role Name</div>
                    <div className="col-span-4">Description</div>
                    <div className="col-span-2 text-center">Total Users</div>
                    <div className="col-span-2 text-right">Last Modified</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>
                <div className="space-y-3">
                    <div
                        className="glass-card rounded-xl p-5 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center group"
                    >
                        <div className="col-span-3 flex items-center gap-4">
                            {/* Icon Container */}
                            <div
                                className="p-2.5 bg-rose-50 dark:bg-rose-900/20 rounded-lg border border-rose-100 dark:border-rose-800/50 group-hover:border-rose-200 dark:group-hover:border-rose-700 transition-colors"
                            >
                                <span className="material-icons-outlined text-rose-500 dark:text-rose-400">
                                    admin_panel_settings
                                </span>
                            </div>

                            {/* Text Content */}
                            <div>
                                <h3 className="font-bold text-gray-700 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    Super Administrator
                                </h3>
                                <span
                                    className="inline-block mt-1 text-[10px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 px-2 py-0.5 rounded border border-rose-100 dark:border-rose-800/50"
                                >
                                    SYSTEM CRITICAL
                                </span>
                            </div>
                        </div>
                        <div className="col-span-4">
                            <p className="text-sm text-slate-500 truncate">
                                Full access to all system modules, settings, and audit logs.
                            </p>
                        </div>
                        <div className="col-span-2 flex justify-center">
                            <div
                                className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition-colors"
                            >
                                <span className="material-icons-outlined text-xs text-indigo-500 dark:text-indigo-400">
                                    people
                                </span>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    142
                                </span>
                            </div>
                        </div>
                        <div className="col-span-2 text-right">
                            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Oct 24, 2023</p>
                            <p className="text-xs text-slate-400">by Alex Morgan</p>
                        </div>
                        <div
                            className="col-span-1 flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity"
                        >
                            <button
                                className="p-2 hover:bg-indigo-50 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                                title="Edit Role"
                            >
                                <span className="material-icons-outlined text-lg">edit</span>
                            </button>
                            <button
                                className="p-2 rounded-lg text-slate-300 cursor-not-allowed"
                                disabled=""
                                title="Cannot delete system role"
                            >
                                <span className="material-icons-outlined text-lg">delete</span>
                            </button>
                        </div>
                    </div>
                    <div
                        className="glass-card rounded-xl p-5 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center group"
                    >
                        <div className="col-span-3 flex items-center gap-4">
                            {/* Icon Container */}
                            <div
                                className="p-2.5 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800/50 group-hover:border-purple-200 dark:group-hover:border-purple-700 transition-colors"
                            >
                                <span className="material-icons-outlined text-purple-600 dark:text-purple-400">
                                    badge
                                </span>
                            </div>

                            {/* Text Content */}
                            <div>
                                <h3
                                    className="font-bold text-gray-700 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                                >
                                    HR Manager
                                </h3>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                    Department: HR
                                </span>
                            </div>
                        </div>
                        <div className="col-span-4">
                            <p className="text-sm text-slate-500 truncate">
                                Manage employee records, onboarding, and basic payroll access.
                            </p>
                        </div>
                        <div className="col-span-2 flex justify-center">
                            <div
                                className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition-colors"
                            >
                                <span className="material-icons-outlined text-xs text-indigo-500 dark:text-indigo-400">
                                    people
                                </span>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    142
                                </span>
                            </div>
                        </div>
                        <div className="col-span-2 text-right">
                            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Nov 02, 2023</p>
                            <p className="text-xs text-slate-400">by Sarah Jenkins</p>
                        </div>
                        <div
                            className="col-span-1 flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity"
                        >
                            <button
                                className="p-2 hover:bg-indigo-50 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                                title="Edit Role"
                            >
                                <span className="material-icons-outlined text-lg">edit</span>
                            </button>
                            <button
                                className="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                                title="Delete Role"
                            >
                                <span className="material-icons-outlined text-lg">delete</span>
                            </button>
                        </div>
                    </div>
                    <div
                        className="glass-card rounded-xl p-5 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center group"
                    >
                        <div className="col-span-3 flex items-center gap-4">
                            {/* Icon Container */}
                            <div
                                className="p-2.5 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/50 group-hover:border-amber-200 dark:group-hover:border-amber-700 transition-colors"
                            >
                                <span className="material-icons-outlined text-amber-500 dark:text-amber-400">
                                    schedule
                                </span>
                            </div>

                            {/* Text Content */}
                            <div>
                                <h3
                                    className="font-bold text-gray-700 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                                >
                                    Shift Supervisor
                                </h3>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                    Department: Operations
                                </span>
                            </div>
                        </div>
                        <div className="col-span-4">
                            <p className="text-sm text-slate-500 truncate">
                                Shift scheduling, attendance approval, and overtime monitoring.
                            </p>
                        </div>
                        <div className="col-span-2 flex justify-center">
                            <div
                                className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition-colors"
                            >
                                <span className="material-icons-outlined text-xs text-indigo-500 dark:text-indigo-400">
                                    people
                                </span>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    28
                                </span>
                            </div>
                        </div>
                        <div className="col-span-2 text-right">
                            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Yesterday</p>
                            <p className="text-xs text-slate-400">by Alex Morgan</p>
                        </div>
                        <div
                            className="col-span-1 flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity"
                        >
                            <button
                                className="p-2 hover:bg-indigo-50 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                                title="Edit Role"
                            >
                                <span className="material-icons-outlined text-lg">edit</span>
                            </button>
                            <button
                                className="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                                title="Delete Role"
                            >
                                <span className="material-icons-outlined text-lg">delete</span>
                            </button>
                        </div>
                    </div>
                    <div
                        className="glass-card rounded-xl p-5 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center group"
                    >
                        <div className="col-span-3 flex items-center gap-4">
                            {/* Icon Container */}
                            <div
                                className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800/50 group-hover:border-emerald-200 dark:group-hover:border-emerald-700 transition-colors"
                            >
                                <span className="material-icons-outlined text-emerald-600 dark:text-emerald-400">
                                    payments
                                </span>
                            </div>

                            {/* Text Content */}
                            <div>
                                <h3
                                    className="font-bold text-gray-700 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                                >
                                    Accountant
                                </h3>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                    Department: Finance
                                </span>
                            </div>
                        </div>
                        <div className="col-span-4">
                            <p className="text-sm text-slate-500 truncate">
                                Full access to Payroll module, Tax reporting, and Expense
                                approvals.
                            </p>
                        </div>
                        <div className="col-span-2 flex justify-center">
                            <div
                                className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition-colors"
                            >
                                <span className="material-icons-outlined text-xs text-indigo-500 dark:text-indigo-400">
                                    people
                                </span>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    3
                                </span>
                            </div>
                        </div>
                        <div className="col-span-2 text-right">
                            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Sep 15, 2023</p>
                            <p className="text-xs text-slate-400">by System</p>
                        </div>
                        <div
                            className="col-span-1 flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity"
                        >
                            <button
                                className="p-2 hover:bg-indigo-50 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                                title="Edit Role"
                            >
                                <span className="material-icons-outlined text-lg">edit</span>
                            </button>
                            <button
                                className="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                                title="Delete Role"
                            >
                                <span className="material-icons-outlined text-lg">delete</span>
                            </button>
                        </div>
                    </div>
                    <div
                        className="glass-card rounded-xl p-5 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center group"
                    >
                        <div className="col-span-3 flex items-center gap-4">
                            {/* Icon Container */}
                            <div
                                className="p-2.5 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-100 dark:border-cyan-800/50 group-hover:border-cyan-200 dark:group-hover:border-cyan-700 transition-colors"
                            >
                                <span className="material-icons-outlined text-cyan-600 dark:text-cyan-400">
                                    assignment_ind
                                </span>
                            </div>

                            {/* Text Content */}
                            <div>
                                <h3
                                    className="font-bold text-gray-700 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                                >
                                    General Staff
                                </h3>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                    Global Default
                                </span>
                            </div>
                        </div>
                        <div className="col-span-4">
                            <p className="text-sm text-slate-500 truncate">
                                Limited access to personal dashboard, time logging, and payslip
                                viewing.
                            </p>
                        </div>
                        <div className="col-span-2 flex justify-center">
                            <div
                                className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition-colors"
                            >
                                <span className="material-icons-outlined text-xs text-indigo-500 dark:text-indigo-400">
                                    people
                                </span>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    142
                                </span>
                            </div>
                        </div>
                        <div className="col-span-2 text-right">
                            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Aug 10, 2023</p>
                            <p className="text-xs text-slate-400">by System</p>
                        </div>
                        <div
                            className="col-span-1 flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity"
                        >
                            <button
                                className="p-2 hover:bg-indigo-50 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                                title="Edit Role"
                            >
                                <span className="material-icons-outlined text-lg">edit</span>
                            </button>
                            <button
                                className="p-2 rounded-lg text-slate-300 cursor-not-allowed"
                                disabled=""
                                title="Default role cannot be deleted"
                            >
                                <span className="material-icons-outlined text-lg">delete</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className="flex items-center justify-between mt-8 text-sm text-slate-500"
                >
                    <div>
                        Showing <span className="text-gray-600 dark:text-gray-300 font-bold">1</span> to
                        <span className="text-gray-600 dark:text-gray-300 font-bold"> 5</span> of
                        <span className="text-gray-600 dark:text-gray-300 font-bold"> 12</span> roles
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="px-4 py-2 rounded-lg  bg-indigo-600 text-white transition-colors disabled:opacity-50 shadow-sm"
                            disabled=""
                        >
                            Previous
                        </button>
                        <button
                            className="px-4 py-2 rounded-lg  bg-indigo-600 text-white transition-colors shadow-sm"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

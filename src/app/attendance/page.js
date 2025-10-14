"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Plus, MoreVertical, QrCode, Fingerprint, ChevronLeft, ChevronRight, Loader2, RefreshCw, Download, Upload, Pencil, Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



import axios from 'axios'; // Ensure you import axios at the top of your file
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getShifts, removeEmployee } from '@/lib/api';
import { EmployeeExtras } from '@/components/Employees/Extras';
import BranchSelect from '@/components/ui/BranchSelect';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set up a timer to update the debounced value after the delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup function: clears the previous timer if the value changes
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Re-run effect if value or delay changes

    return debouncedValue;
};


export default function EmployeeDataTable() {

    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10); // Default to 10 for a cleaner table, even if the API suggests 100
    const [totalPages, setTotalPages] = useState(1);
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedBranch, setSelectedBranch] = useState(null);


    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const handleSearchChange = useCallback((event) => {
        const newQuery = event.target.value;

        // 1. Check if the input is cleared
        if (newQuery === "") {
            // 2. Reset to null instead of an empty string
            setSearchQuery(null);
        } else {
            // 3. Otherwise, set the new string value
            setSearchQuery(newQuery);
        }
    }, []);

    // Effect to trigger the actual search/API call when the DEBOUNCED value changes.
    useEffect(() => {
        // This log will only run 500ms after the user stops typing
        if (debouncedSearchQuery !== '') {
            console.log('API call or Data Filtering triggered for:', debouncedSearchQuery);
            // Example: api.fetchData(debouncedSearchQuery);
        } else if (debouncedSearchQuery === '') {
            console.log('Search query cleared. Resetting results.');
        }

    }, [debouncedSearchQuery]);

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
            const result = await getShifts(params);

            // Check if result has expected structure before setting state
            if (result && Array.isArray(result.data)) {
                setEmployees(result.data);
                setCurrentPage(result.current_page || 1);
                setTotalPages(result.last_page || 1);
                setTotalEmployees(result.total || 0);
                setIsLoading(false);
                return; // Success, exit
            } else {
                // If the API returned a 2xx status but the data structure is wrong
                throw new Error('Invalid data structure received from API.');
            }

        } catch (err) {
            // Axios error handling is robust:
            // - HTTP errors (non-2xx) are caught here.
            // - Network errors are caught here.
            // - The custom 'Invalid data structure' error is caught here.
            if (axios.isAxiosError(err) && err.response) {
                // Server responded with a status code outside of 2xx
                console.error(`Employee Page: HTTP error! status: ${err.response.status}`);
                setError(`Failed to fetch data: ${err.response.statusText}`);
            } else {
                // A non-Axios error or a network/request error (e.g., the custom error)
                console.error(`Employee Page: `, err.message);
                setError(err.message || 'An unknown error occurred.');
            }
            setIsLoading(false); // Make sure loading state is turned off on error
        }
    }, [perPage, selectedBranch, searchTerm]);

    const router = useRouter();


    useEffect(() => {
        fetchEmployees(currentPage, perPage);
    }, [currentPage, perPage, fetchEmployees]); // Re-fetch when page or perPage changes

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

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

    const handleRowClick = () => {
        router.push('/employees-short-list');
    }

    const renderEmployeeRow = (employee) => {
        console.log("🚀 ~ renderEmployeeRow ~ employee:", employee)
        // Fallback for nested objects that might be empty ({}) in the API sample
        const branchName = employee.branch?.branch_name || 'N/A';
        const departmentName = employee.department?.name || 'N/A';
        const designationTitle = employee.designation?.title || employee.last_name; // Using last_name as a fallback title
        const employeeEmail = employee.user?.email || 'N/A';

        return (
            <tr key={employee.id} className="border-b border-gray-200 hover:bg-indigo-50 transition-colors"
            >

                <td className="p-4 whitespace-nowrap">
                    <p className="text-gray-800">{employee.name || '—'}</p>
                </td>

                <td className="p-4 whitespace-nowrap">
                    <p className="text-gray-800">{employee?.shift_type?.name}</p>
                </td>

                <td className="p-4 whitespace-nowrap">
                    <p className="text-gray-800">{employee?.on_duty_time} - {employee.off_duty_time}</p>
                </td>

                <td className="p-4 whitespace-nowrap">
                    <p className="text-gray-800">{employee?.isAutoShift ? "Yes" : "No"}</p>
                </td>

                <td className="p-4 whitespace-nowrap">
                    <p className="text-gray-800">{employee?.halfday}</p>
                </td>

                <td className="p-4 whitespace-nowrap">
                    <p className="text-gray-800">{employee?.halfday_working_hours}</p>
                </td>




                {/* Options/Security */}

                {/* Actions */}
                <td className="p-4 whitespace-nowrap">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-700 transition-colors" title="More Options" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className="w-30 bg-white shadow-md rounded-md py-1"
                        >
                            <DropdownMenuItem
                                onClick={() => handleRowClick(employee.id)}
                                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                                <Pencil className="w-4 h-4 text-primary" /> <span className='text-primary'>Edit</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => deleteEmployee(employee.id)}
                                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                                <Trash className="w-4 h-4 text-gray-500" /> <span className='text-gray-500'>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>


                    </DropdownMenu>
                </td>
            </tr>
        );
    };

    /**
     * Renders the pagination controls.
     */
    const renderPagination = () => {
        const start = (currentPage - 1) * perPage + 1;
        // Ensure 'end' does not exceed the total number of employees
        const end = Math.min(currentPage * perPage, totalEmployees);

        return (
            <div className="flex justify-between items-center px-4 py-3 bg-white border-t border-gray-200 rounded-b-lg flex-col sm:flex-row space-y-3 sm:space-y-0">
                <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold">{start}</span> to <span className="font-semibold">{end}</span> of <span className="font-semibold">{totalEmployees}</span> results
                </p>
                <div className="flex space-x-2">
                    {/* Previous Button */}
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || isLoading}
                        className="p-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Previous
                    </button>

                    {/* Current Page Indicator (Simplified) */}
                    <span className="p-2 px-4 border border-indigo-600 bg-primary text-white rounded-md text-sm font-semibold flex items-center">
                        {currentPage} / {totalPages}
                    </span>

                    {/* Next Button */}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || isLoading}
                        className="p-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                    >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </button>

                    {/* Per Page Selector */}
                    <select
                        value={perPage}
                        onChange={(e) => setPerPage(Number(e.target.value))}
                        className="ml-4 p-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value={10}>10 / page</option>
                        <option value={25}>25 / page</option>
                        <option value={50}>50 / page</option>
                    </select>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6  sm:space-y-0">
                <h1 className="text-2xl font-extrabold text-gray-900 flex items-center">
                    {/* <User className="w-7 h-7 mr-3 text-indigo-600" /> */}
                    Shifts
                </h1>
                <div className="flex flex-wrap items-center space-x-3 space-y-2 sm:space-y-0">

                    {/* Branch Filter Dropdown */}
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

                    {/* <EmployeeExtras data={employees} onUploadSuccess={fetchEmployees} /> */}


                    {/* New Employee Button */}
                    <Link href="/attendance/create">
                        <button className="bg-primary text-white px-4 py-1 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all flex items-center space-x-2 whitespace-nowrap">
                            <Plus className="w-4 h-4" />
                            <span>New</span>
                        </button>
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-left table-auto">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider min-w-[150px]">Name of Schedule</th>
                                <th className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider min-w-[150px]">Type Schedule</th>
                                <th className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider min-w-[150px]">Scheduled Time</th>
                                <th className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider min-w-[150px]">Auto Shift</th>
                                <th className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider min-w-[150px]">Half Day</th>
                                <th className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider min-w-[100px]">Half Day Working Hours</th>
                                <th className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider min-w-[100px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="9" className="p-12 text-center text-primary font-medium">
                                        <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin" />
                                        Loading employee data...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="9" className="p-12 text-center text-red-600 font-medium bg-red-50">
                                        <p>Error: {error}</p>
                                        <p className='mt-2 text-sm text-red-500'>Please check the console for details or refresh the page.</p>
                                    </td>
                                </tr>
                            ) : employees.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="p-12 text-center text-gray-500 font-medium">
                                        No employees found for the current filter/page.
                                    </td>
                                </tr>
                            ) : (
                                // Render rows dynamically
                                employees.map(renderEmployeeRow)
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                {!isLoading && employees.length > 0 && renderPagination()}
            </div>
        </>
    );
}

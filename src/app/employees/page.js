"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Plus, MoreVertical, QrCode, Fingerprint, ChevronLeft, ChevronRight, Loader2, RefreshCw, Download, Upload } from 'lucide-react';
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



import axios from 'axios'; // Ensure you import axios at the top of your file
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getBranches, getEmployees } from '@/lib/api';
import { EmployeeExtras } from '@/components/Employees/Extras';

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
    const [open, setOpen] = useState(false);
    const [branches, setBranches] = useState([]);


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


    const handleSelectBranch = (currentValue) => {
        if (currentValue === "Select All") {
            setSelectedBranch(null);
        } else {
            const selectedBranchItem = branches.find((b) => b.name === currentValue);
            if (selectedBranchItem) {
                setSelectedBranch(
                    selectedBranchItem.id === selectedBranch ? null : selectedBranchItem.id
                );
            }
        }
        setOpen(false);
    };


    useEffect(() => {
        const fetchBranches = async () => {
            try {
                setBranches(await getBranches());
            } catch (error) {
                console.error("Error fetching branches:", error);
                setBranches([]);
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
                branch_id: selectedBranch,
                search: searchTerm || null, // Only include search if it's not empty
            };
            const result = await getEmployees(params);

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

    const handleRowClick = () => {
        router.push('/employees-short-list');
    }

    const renderEmployeeRow = (employee) => {
        // Fallback for nested objects that might be empty ({}) in the API sample
        const branchName = employee.branch?.branch_name || 'N/A';
        const departmentName = employee.department?.name || 'N/A';
        const designationTitle = employee.designation?.title || employee.last_name; // Using last_name as a fallback title
        const employeeEmail = employee.user?.email || 'N/A';

        return (
            <tr key={employee.id} className="border-b border-gray-200 hover:bg-indigo-50 transition-colors" onClick={() => handleRowClick(employee.id)}
            >
                {/* Name & Designation */}
                <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                        <img
                            alt={employee.full_name}
                            className="w-10 h-10 rounded-full object-cover shadow-sm"
                            src={employee.profile_picture || `https://placehold.co/40x40/6946dd/ffffff?text=${employee.full_name.charAt(0)}`}
                            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/40x40/6946dd/ffffff?text=${employee.full_name.charAt(0)}`; }}
                        />
                        <div>
                            <p className="font-medium text-gray-800">{employee.full_name}</p>
                            <p className="text-sm text-gray-500">{designationTitle}</p>
                        </div>
                    </div>
                </td>

                {/* Emp Id / Device Id */}
                <td className="p-4 whitespace-nowrap">
                    <p className="text-gray-800">{employee.employee_id || '—'}</p>
                    <p className="text-sm text-gray-500">Device ID: {employee.system_user_id || '—'}</p>
                </td>

                {/* Branch */}
                <td className="p-4 whitespace-nowrap">
                    <p className="text-gray-800">{branchName}</p>
                    {/* Placeholder for Branch Owner/Role */}
                    {/* <p className="text-sm text-gray-500">(Branch Owner)</p> */}
                </td>

                {/* Department */}
                <td className="p-4 whitespace-nowrap text-gray-800">{departmentName}</td>

                {/* Mobile / Email */}
                <td className="p-4 whitespace-nowrap">
                    <p className="text-gray-800">{employee.phone_number || '—'}</p>
                    <p className="text-sm text-gray-500">{employeeEmail}</p>
                </td>

                {/* Timezone */}
                <td className="p-4 whitespace-nowrap text-gray-800">{employee.timezone_id || '—'}</td>

                {/* Access */}
                <td className="p-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Full Access
                    </span>
                </td>

                {/* Options/Security */}
                <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 text-gray-500">
                        <QrCode className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors" title="QR Code Access" />
                        <Fingerprint className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors" title="Fingerprint Setup" />
                    </div>
                </td>

                {/* Actions */}
                <td className="p-4 whitespace-nowrap">
                    <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-700 transition-colors" title="More Options" />
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
                    Employees
                </h1>
                <div className="flex flex-wrap items-center space-x-3 space-y-2 sm:space-y-0">

                    {/* Branch Filter Dropdown */}
                    <div className="relative">

                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-50 justify-between py-4 text-gray-500 border border-gray-300 rounded-lg bg-white hover:bg-gray-100"
                                >
                                    {selectedBranch
                                        ? branches.find((b) => b.id === selectedBranch)?.name
                                        : "Select Branch"}

                                    {/* Arrow icon */}
                                    <span className="material-icons text-gray-400">
                                        expand_more
                                    </span>
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-[320px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search branch..." />
                                    <CommandEmpty>No branch found.</CommandEmpty>
                                    <CommandGroup>
                                        <CommandItem
                                            className="text-gray-500"
                                            value="Select All"
                                            onSelect={handleSelectBranch}
                                        >
                                            Select All
                                        </CommandItem>
                                        {branches.map((branch) => (
                                            <CommandItem
                                                className="text-gray-500"
                                                key={branch.id}
                                                value={branch.name}
                                                onSelect={handleSelectBranch}
                                            >
                                                {branch.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
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

            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-left table-auto">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider min-w-[150px]">Name</th>
                                <th className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider min-w-[150px]">Emp Id / Device Id</th>
                                <th className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider min-w-[150px]">Branch</th>
                                <th className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider min-w-[150px]">Department</th>
                                <th className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider min-w-[150px]">Mobile / Email</th>
                                <th className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider min-w-[100px]">Timezone</th>
                                <th className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider min-w-[100px]">Access</th>
                                <th className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider min-w-[120px]">Security</th>
                                <th className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider min-w-[50px]">Actions</th>
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

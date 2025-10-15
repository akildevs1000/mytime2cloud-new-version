"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Plus, MoreVertical, QrCode, Fingerprint, ChevronLeft, ChevronRight, Loader2, RefreshCw, Download, Upload, Pencil, Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



import axios from 'axios'; // Ensure you import axios at the top of your file
import { Input } from '@/components/ui/input';
import { getShifts, removeShift } from '@/lib/api';

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


export default function DataTable() {

    const [shifts, setShifts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10); // Default to 10 for a cleaner table, even if the API suggests 100
    const [totalPages, setTotalPages] = useState(1);
    const [totalShifts, setTotalShifts] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

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

    const fetchShifts = useCallback(async (page, perPage) => {
        setIsLoading(true);
        setError(null);

        try {
            const params = {
                page: page,
                per_page: perPage,
                sortDesc: 'false',
                search: searchTerm || null, // Only include search if it's not empty
            };
            const result = await getShifts(params);

            // Check if result has expected structure before setting state
            if (result && Array.isArray(result.data)) {
                setShifts(result.data);
                setCurrentPage(result.current_page || 1);
                setTotalPages(result.last_page || 1);
                setTotalShifts(result.total || 0);
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
                console.error(`Shift Page: HTTP error! status: ${err.response.status}`);
                setError(`Failed to fetch data: ${err.response.statusText}`);
            } else {
                // A non-Axios error or a network/request error (e.g., the custom error)
                console.error(`Shift Page: `, err.message);
                setError(err.message || 'An unknown error occurred.');
            }
            setIsLoading(false); // Make sure loading state is turned off on error
        }
    }, [perPage, searchTerm]);

    const router = useRouter();


    useEffect(() => {
        fetchShifts(currentPage, perPage);
    }, [currentPage, perPage, fetchShifts]); // Re-fetch when page or perPage changes

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleRefresh = () => {
        fetchShifts(currentPage, perPage);
    }

    const deleteShift = async (id) => {
        if (confirm("Are you sure you want to delete this shift?")) {
            try {
                await removeShift(id);
                fetchShifts(currentPage, perPage);
            } catch (error) {
                console.error("Error deleting shift:", error);
            }
        }
    }

    const handleRowClick = (shift) => {
        localStorage.setItem("selectedShift", JSON.stringify(shift));
        router.push('/attendance/short-list');
    }

    const renderRow = (shift) => {

        return (
            <tr key={shift.id} className="border-b border-gray-200 hover:bg-indigo-50 transition-colors"
            >

                <td onClick={() => handleRowClick(shift)} className="p-4 whitespace-nowrap">
                    <p className="text-gray-800">{shift.name || '—'}</p>
                </td>

                <td onClick={() => handleRowClick(shift)} className="p-4 whitespace-nowrap">
                    <p className="text-gray-800">{shift?.shift_type?.name}</p>
                </td>

                <td onClick={() => handleRowClick(shift)} className="p-4 whitespace-nowrap">
                    <p className="text-gray-800">{shift?.on_duty_time} - {shift.off_duty_time}</p>
                </td>

                <td onClick={() => handleRowClick(shift)} className="p-4 whitespace-nowrap">
                    <p className="text-gray-800">{shift?.isAutoShift ? "Yes" : "No"}</p>
                </td>

                <td onClick={() => handleRowClick(shift)} className="p-4 whitespace-nowrap">
                    <p className="text-gray-800">{shift?.halfday}</p>
                </td>

                <td onClick={() => handleRowClick(shift)} className="p-4 whitespace-nowrap">
                    <p className="text-gray-800">{shift?.halfday_working_hours}</p>
                </td>

                {/* Actions */}
                <td onClick={() => handleRowClick(shift)} className="p-4 whitespace-nowrap">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-700 transition-colors" title="More Options" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className="w-30 bg-white shadow-md rounded-md py-1"
                        >
                            <DropdownMenuItem
                                onClick={() => handleRowClick(shift)}
                                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                                <Pencil className="w-4 h-4 text-primary" /> <span className='text-primary'>Edit</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => deleteShift(shift.id)}
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
        // Ensure 'end' does not exceed the total number of shifts
        const end = Math.min(currentPage * perPage, totalShifts);

        return (
            <div className="flex justify-between items-center px-4 py-3 bg-white border-t border-gray-200 rounded-b-lg flex-col sm:flex-row space-y-3 sm:space-y-0">
                <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold">{start}</span> to <span className="font-semibold">{end}</span> of <span className="font-semibold">{totalShifts}</span> results
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
                                        Loading shift data...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="9" className="p-12 text-center text-red-600 font-medium bg-red-50">
                                        <p>Error: {error}</p>
                                        <p className='mt-2 text-sm text-red-500'>Please check the console for details or refresh the page.</p>
                                    </td>
                                </tr>
                            ) : shifts.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="p-12 text-center text-gray-500 font-medium">
                                        No shift found for the current filter/page.
                                    </td>
                                </tr>
                            ) : (
                                // Render rows dynamically
                                shifts.map(renderRow)
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                {!isLoading && shifts.length > 0 && renderPagination()}
            </div>
        </>
    );
}

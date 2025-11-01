"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Plus, MoreVertical, QrCode, Fingerprint, ChevronLeft, ChevronRight, Loader2, RefreshCw, Pencil, Trash, Palmtree, Hand, Lock, ScanFace } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { getDeviceLogs, parseApiError, removeEmployee } from '@/lib/api';
import BranchSelect from '@/components/ui/BranchSelect';
import DeviceSelect from '@/components/ui/DeviceSelect';

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
    const [selectedDevice, setSelectedDevice] = useState(null);


    const debouncedSearchQuery = useDebounce(searchQuery, 500);


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
                device: selectedDevice,
                UserID: searchTerm || null, // Only include search if it's not empty
            };
            const result = await getDeviceLogs(params);

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

        } catch (error) {
            setError(parseApiError(error))

            setIsLoading(false); // Make sure loading state is turned off on error
        }
    }, [perPage, selectedDevice, searchTerm]);

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
        router.push('/schedule/short-list');
    }

    const renderEmployeeRow = ({ employee, ...log }) => {

        // Fallback for nested objects that might be empty ({}) in the API sample
        const branchName = employee.branch?.branch_name || 'N/A';
        const departmentName = employee.department?.name || 'N/A';
        const designationTitle = employee.designation?.title || employee.last_name; // Using last_name as a fallback title
        let type = log?.log_type == 'Out' ? 'red' : log?.log_type == 'In' ? 'green' : 'gray';

        return (
            <tr key={employee.id} className="border-b border-gray-200 hover:bg-indigo-50 transition-colors"
            >
                {/* Name & Designation */}
                <td onClick={() => handleRowClick(employee.id)} className="p-4 whitespace-nowrap">
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
                <td onClick={() => handleRowClick(employee.id)} className="p-4 whitespace-nowrap">
                    <p className="text-gray-800">{employee.employee_id || '—'}</p>
                    <p className="text-sm text-gray-500">Device ID: {employee.system_user_id || '—'}</p>
                </td>

                {/* Branch */}
                <td onClick={() => handleRowClick(employee.id)} className="p-4 whitespace-nowrap">
                    <p className="text-gray-800">{branchName}</p>
                </td>

                {/* Department */}
                <td onClick={() => handleRowClick(employee.id)} className="p-4 whitespace-nowrap text-gray-800">{departmentName}</td>
                <td onClick={() => handleRowClick(employee.id)} className="p-4 whitespace-nowrap text-gray-800">{log?.time} {log?.date}</td>
                <td onClick={() => handleRowClick(employee.id)} className="p-4 whitespace-nowrap text-gray-800">{log?.device?.name}</td>
                <td onClick={() => handleRowClick(employee.id)} className={`p-4 whitespace-nowrap text-${type}-800`}>{log?.log_type}</td>
                <td onClick={() => handleRowClick(employee.id)} className="p-4 whitespace-nowrap text-gray-800">{log?.device?.location}</td>


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
                    Device Logs
                </h1>
                <div className="flex flex-wrap items-center space-x-3 space-y-2 sm:space-y-0">

                    {/* Branch Filter Dropdown */}
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


                    {/* Search Input */}
                    <div className="relative">
                        <Input
                            className="pl-10 bg-white h-9 w-full" // Increased left padding (pl-10) for the icon
                            placeholder="Search by Employee ID"
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
                                <th className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider min-w-[150px]">Date</th>
                                <th className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider min-w-[150px]">Device</th>
                                <th className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider min-w-[120px]">In/Out</th>
                                <th className="p-4 font-semibold text-xs text-gray-600 uppercase tracking-wider min-w-[120px]">Location</th>
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

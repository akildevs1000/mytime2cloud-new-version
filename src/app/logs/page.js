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
import MultiDropDown from '@/components/ui/MultiDropDown';



export default function AttendanceTable() {

    // filters
    const [selectedBranchIds, setSelectedBranchIds] = useState([]);
    const [selectedDeviceIds, setSelectedDeviceIds] = useState([]);

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
        if (!selectedBranchIds.length) return;
        try {
            let result = await getDeviceList(selectedBranchIds);
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
    }, [selectedBranchIds]);

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
                device: selectedDeviceIds,
                branch_ids: selectedBranchIds,
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
        <div className='p-4 pb-24 overflow-y-auto max-h-[calc(100vh-100px)]'>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6  sm:space-y-0">
                <h1 className="text-2xl font-extrabold text-gray-600 dark:text-gray-300 flex items-center">
                    Logs
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
                            placeholder={'Select Device'}
                            items={devices}
                            value={selectedDeviceIds}
                            onChange={setSelectedDeviceIds}
                            badgesCount={1}
                            width='w-[220px]'
                        />

                    </div>

                    <div className="relative">
                        <DateRangeSelect
                            value={{ from, to }}
                            onChange={({ from, to }) => {
                                setFrom(from);
                                setTo(to);
                            }
                            } />
                    </div>


                    <div className="relative">
                        {/* <MultiDropDown
                            placeholder={'Select Department'}
                            items={departments}
                            value={selectedDepartmentIds}
                            onChange={setSelectedDepartmentIds}
                            badgesCount={1}
                        /> */}
                    </div>
                    <div className="relative">
                        {/* <Input
                            placeholder="Search by name or ID"
                            icon="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        /> */}
                    </div>

                    {/* <IconButton
                        icon={RefreshCw}
                        onClick={handleRefresh}
                        isLoading={isLoading}
                        title="Refresh Data"
                    /> */}

                    {/* <EmployeeExtras data={employees} onUploadSuccess={fetchEmployees} /> */}

                    <button onClick={fetchRecords} className="bg-primary text-white px-4 py-1 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all flex items-center space-x-2 whitespace-nowrap">
                        <RefreshCw className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} /> Submit
                    </button>
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
        </div>
    );
}

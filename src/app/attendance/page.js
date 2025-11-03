"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { getDeviceLogs, getStatuses, parseApiError } from '@/lib/api';
import BranchSelect from '@/components/ui/BranchSelect';

import DepartmentSelect from '@/components/ui/DepartmentSelect';
import EmployeeMultiSelect from '@/components/ui/EmployeeMultiSelect';
import DropDown from '@/components/ui/DropDown';
import DateRangeSelect from "@/components/ui/DateRange";
import Pagination from '@/lib/Pagination';
import { EmployeeExtras } from '@/components/Employees/Extras';
import DataTable from '@/components/ui/DataTable';
import Columns from "./columns"; // 👈 import here



export default function AttendanceTable() {

    const [employees, setAttendance] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [total, setTotalAttendance] = useState(0);

    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedDepartmentId, setSelectedDepartment] = useState(null);
    const [employeeIds, setEmployeeIds] = useState([]);

    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);

    const [statusses, setStatusses] = useState([]);

    const fetchRecords = useCallback(async (page, perPage) => {
        setIsLoading(true);
        setError(null);

        try {
            const params = {
                page: page,
                per_page: perPage,
                sortDesc: 'false',
                branch_id: selectedBranch,
                department_id: selectedDepartmentId,
                employee_ids: employeeIds,
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
    }, [perPage]);

    const router = useRouter();


    const fetchStatuses = async () => {
        try {
            setIsLoading(true);
            let result = await getStatuses();
            console.log(result);
            setStatusses(result);
            setIsLoading(false);
        } catch (error) {
            setError(parseApiError(error));
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStatuses();
    }, []);

    useEffect(() => {
        fetchRecords(currentPage, perPage);
    }, [currentPage, perPage, fetchRecords]); // Re-fetch when page or perPage changes

    const handleRefresh = () => {
        fetchRecords(currentPage, perPage);
    }

    return (
        <>
            <div className="flex flex-wrap items-center space-x-3 space-y-2 mb-6 sm:space-y-0">
                <h1 className="text-2xl font-extrabold text-gray-900 flex items-center">
                    {/* <User className="w-7 h-7 mr-3 text-indigo-600" /> */}
                    Attendance Report
                </h1>

                <div className="flex flex-col">
                    <DropDown
                        placeholder={'Select Report Template'}
                        items={statusses}
                    />
                </div>


                <div className="flex flex-col">
                    <BranchSelect
                        selectedBranchId={selectedBranch}
                        onSelect={(id) => { setSelectedBranch(id); }}
                    />
                </div>

                <div className="flex flex-col">
                    <DepartmentSelect
                        selectedBranchId={selectedBranch}
                        value={selectedDepartmentId}
                        onChange={(device_id) => { setSelectedDepartment(device_id); }}
                    />
                </div>

                <div className="flex flex-col">
                    <EmployeeMultiSelect
                        selectedBranchId={selectedBranch}
                        selectedDepartmentId={selectedDepartmentId}
                        value={employeeIds}
                        onChange={(ids) => { setEmployeeIds(ids); }}
                    />
                </div>

                <div className="flex flex-col">
                    <DropDown
                        placeholder={'Select Report Template'}
                        items={
                            [
                                { id: `Monthly Report Format A`, name: `Monthly Report Format A` },
                                { id: `Monthly Report Format B`, name: `Monthly Report Format B` },
                                { id: `Daily`, name: `Daily` },
                            ]}
                    />
                </div>

                <div className="flex flex-col">
                    <DateRangeSelect
                        value={{ from, to }}
                        onRangeChange={({ from, to }) => {
                            setFrom(from);
                            setTo(to);
                        }

                        } />
                </div>

                {/* Refresh Button */}
                <button onClick={handleRefresh} className="bg-primary text-white px-4 py-1 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all flex items-center space-x-2 whitespace-nowrap">
                    <RefreshCw className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} /> Submit
                </button>

                {/* <EmployeeExtras data={employees} onUploadSuccess={fetchRecords} /> */}
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
        </>
    );
}

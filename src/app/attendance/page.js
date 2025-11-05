"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

import { getBranches, getDepartments, getDeviceLogs, getScheduledEmployeeList, getStatuses, parseApiError } from '@/lib/api';

import DropDown from '@/components/ui/DropDown';
import DateRangeSelect from "@/components/ui/DateRange";
import Pagination from '@/lib/Pagination';
import { EmployeeExtras } from '@/components/Employees/Extras';
import DataTable from '@/components/ui/DataTable';
import Columns from "./columns";
import MultiDropDown from '@/components/ui/MultiDropDown';



export default function AttendanceTable() {

    // filters
    const [shiftTypeId, setShiftTypeId] = useState(2);
    const [selectedStatusIds, setSelectedStatusIds] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedDepartmentId, setSelectedDepartment] = useState(null);
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
    const [selectedReportTemplate, setSelectedReportTemplate] = useState(null);


    const [reportTemplates, setReportTemplates] = useState([
        { id: `Template1`, name: `Monthly Report Format A` },
        { id: `Template2`, name: `Monthly Report Format B` },
        { id: `Template3`, name: `Daily` },
    ]);

    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);



    const [employees, setAttendance] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [total, setTotalAttendance] = useState(0);



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
                employee_ids: selectedEmployeeIds,
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

    const [statusses, setStatusses] = useState([]);
    const [branches, setBranches] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [scheduledEmployees, setScheduledEmployees] = useState([]);




    const fetchStatuses = async () => {
        try {
            setStatusses(await getStatuses());
        } catch (error) {
            setError(parseApiError(error));
        }
    };

    const fetchBranches = async () => {
        try {
            setBranches(await getBranches());
        } catch (error) {
            setError(parseApiError(error));
        }
    };

    const fetchDepartments = async () => {
        try {
            setDepartments(await getDepartments(selectedBranch));
        } catch (error) {
            setError(parseApiError(error));
        }
    };

    const fetchScheduledEmployees = async () => {
        try {
            let result = await getScheduledEmployeeList(selectedBranch, [selectedDepartmentId]);

            setScheduledEmployees(result.map((e) => ({ ...e, name: e.full_name, id: e.system_user_id })));
        } catch (error) {
            setError(parseApiError(error));
        }
    };

    useEffect(() => {
        fetchStatuses();
        fetchBranches();
    }, []);


    useEffect(() => {
        fetchDepartments();
    }, [selectedBranch]);

    useEffect(() => {
        fetchScheduledEmployees();
    }, [selectedDepartmentId]);


    useEffect(() => {
        fetchRecords(currentPage, perPage);
    }, [currentPage, perPage, fetchRecords]); // Re-fetch when page or perPage changes

    const handleSubmit = () => {

        console.log(selectedStatusIds, selectedBranch, selectedDepartmentId, selectedEmployeeIds, selectedReportTemplate, from, to);

        return;
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
                    <MultiDropDown
                        placeholder={'Select Status'}
                        items={statusses}
                        value={selectedStatusIds}
                        onChange={setSelectedStatusIds}
                        badgesCount={1}
                    />
                </div>

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
                        placeholder={'Select Department'}
                        onChange={setSelectedDepartment}
                        value={selectedDepartmentId}
                        items={departments}
                    />
                </div>

                <div className="flex flex-col">
                    <MultiDropDown
                        placeholder={'Select Employees'}
                        items={scheduledEmployees}
                        value={selectedEmployeeIds}
                        onChange={setSelectedEmployeeIds}
                        badgesCount={1}
                    />
                </div>

                <div className="flex flex-col">
                    <DropDown
                        placeholder={'Select Report Template'}
                        onChange={setSelectedReportTemplate}
                        value={selectedReportTemplate}
                        items={reportTemplates}
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

                {/* Refresh Button */}
                <button onClick={handleSubmit} className="bg-primary text-white px-4 py-1 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all flex items-center space-x-2 whitespace-nowrap">
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

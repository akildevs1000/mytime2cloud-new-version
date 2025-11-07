"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getAttendanceReports, getBranches, getDepartments, getDeviceLogs, getScheduledEmployeeList, getStatuses } from '@/lib/api';

import DropDown from '@/components/ui/DropDown';
import DateRangeSelect from "@/components/ui/DateRange";
import Pagination from '@/lib/Pagination';
import { EmployeeExtras } from '@/components/Employees/Extras';
import DataTable from '@/components/ui/DataTable';
import Columns from "./columns";
import MultiDropDown from '@/components/ui/MultiDropDown';
import { formatDate, formatDateDubai, parseApiError } from '@/lib/utils';

const reportTemplates = [
    { id: `Template1`, name: `Monthly Report Format A` },
    { id: `Template2`, name: `Monthly Report Format B` },
    { id: `Template3`, name: `Daily` },
];

const ShiftTypes = [
    { id: `0`, name: `General` },
    { id: `2`, name: `Multi` },
];

export default function AttendanceTable() {

    // filters
    const [shiftTypeId, setShiftTypeId] = useState(`2`);
    const [selectedStatusIds, setSelectedStatusIds] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedDepartmentIds, setSelectedDepartment] = useState([]);
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
    const [selectedReportTemplate, setSelectedReportTemplate] = useState(null);

    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);

    const [records, setAttendance] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [total, setTotalAttendance] = useState(0);


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
            let result = await getScheduledEmployeeList(selectedBranch, selectedDepartmentIds);

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
    }, [selectedDepartmentIds]);

    const fetchRecords = async () => {

        if (
            !selectedEmployeeIds?.length
        ) {
            alert("Please select employee(s)");
            return;
        }

        if (
            !selectedReportTemplate
        ) {
            alert("Please select template.");
            return;
        }


        setIsLoading(true);
        setError(null);

        try {
            const params = {
                page: currentPage,
                per_page: perPage,
                shift_type_id: shiftTypeId,
                report_template: selectedReportTemplate,
                from_date: formatDateDubai(from),
                to_date: formatDateDubai(to),
                employee_id: selectedEmployeeIds,
                statuses: selectedStatusIds,
                branch_id: selectedBranch,
                department_ids: selectedDepartmentIds,
                showTabs: JSON.stringify({ single: true, dual: false, multi: true }),
            };
            console.log(params);

            const result = await getAttendanceReports(params);

            if (result && Array.isArray(result.data)) {
                setAttendance(result.data);
                setCurrentPage(result.current_page || 1);
                setTotalAttendance(result.total || 0);
            } else {
                throw new Error("Invalid data structure received from API.");
            }

        } catch (error) {
            setError(parseApiError(error));
        } finally {
            setIsLoading(false); // Always turn off loading
        }
    };


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
                    <MultiDropDown
                        placeholder={'Select Department'}
                        items={departments}
                        value={selectedDepartmentIds}
                        onChange={setSelectedDepartment}
                        badgesCount={1}
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
                <button onClick={fetchRecords} className="bg-primary text-white px-4 py-1 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all flex items-center space-x-2 whitespace-nowrap">
                    <RefreshCw className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} /> Submit
                </button>

                {/* <EmployeeExtras data={records} onUploadSuccess={fetchRecords} /> */}
            </div>

            <div className='flex'>
                <Tabs
                    value={shiftTypeId} // controlled tab
                    onValueChange={(value) => setShiftTypeId(value)} // update on click
                    className="w-full"
                >
                    {/* --- Tabs Header aligned Right --- */}
                    <div className="flex justify-start mb-4">
                        <div className="p-2 bg-white w-full rounded-lg shadow">
                            <TabsList className="flex bg-white   p-1">
                                {ShiftTypes.map((shift) => (
                                    <TabsTrigger
                                        key={shift.id}
                                        value={shift.id}
                                        className="px-4 py-2 text-sm font-medium rounded-md 
                data-[state=active]:bg-primary/10 
                data-[state=active]:text-primary 
                data-[state=active]:shadow-sm 
                transition-all duration-200"
                                    >
                                        {shift.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                    </div>

                    {/* --- Tabs Content --- */}
                    {ShiftTypes.map((shift) => (
                        <TabsContent key={shift.id} value={shift.id} className="space-y-2 rounded-lg">
                            <DataTable
                                columns={Columns(shiftTypeId)}
                                data={records}
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
                        </TabsContent>
                    ))}
                </Tabs>
            </div>


        </>
    );
}

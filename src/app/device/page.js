"use client";

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

import { getBranches, getDevices } from '@/lib/api';

import DropDown from '@/components/ui/DropDown';
import Pagination from '@/lib/Pagination';
import DataTable from '@/components/ui/DataTable';
import Columns from "./columns";
import { parseApiError } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SuccessDialog } from '@/components/SuccessDialog';

export default function AttendanceTable() {

    // filters
    const [selectedBranch, setSelectedBranch] = useState(null);


    const [employees, setAttendance] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [total, setTotalAttendance] = useState(0);

    const [branches, setBranches] = useState([]);

    const fetchBranches = async () => {
        try {
            setBranches(await getBranches());
        } catch (error) {
            setError(parseApiError(error));
        }
    };

    const router = useRouter();
    const handleRowClick = async () => {
        router.push("device/short-list")
    };


    useEffect(() => {
        fetchBranches();
    }, []);


    useEffect(() => {
        fetchRecords();
    }, [selectedBranch, currentPage, perPage]);

    const fetchRecords = async () => {
        try {
            setIsLoading(true);

            const params = {
                page: currentPage,
                per_page: perPage,
                branch_id: selectedBranch
            };

            const result = await getDevices(params);

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

    const [sucessObject, setSucessObject] = useState({ title: "", description: "" });
    const [successOpen, setSuccessOpen] = useState(false);

    const handleSuccess = (e) => {
        setSuccessOpen(true);
        setSucessObject(e);
        fetchRecords();
    }

    const columns = Columns({
        onSuccess: handleSuccess,
        handleRowClick: handleRowClick,
        pageTitle: "Device"
    });

    return (
        <>
            <div className="flex flex-wrap items-center justify-between mb-6">
                {/* Left side: Title + Dropdown */}
                <div className="flex flex-wrap items-center space-x-3 space-y-2 sm:space-y-0">
                    <h1 className="text-2xl font-extrabold text-gray-900 flex items-center">
                        Devices
                    </h1>

                    <div className="flex flex-col">
                        <DropDown
                            placeholder={'Select Branch'}
                            onChange={setSelectedBranch}
                            value={selectedBranch}
                            items={branches}
                        />
                    </div>
                </div>

                <Link href="/device/create">
                    <button className="bg-primary text-white px-4 py-1 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all flex items-center space-x-2 whitespace-nowrap">
                        <Plus className="w-4 h-4" />
                        <span>New</span>
                    </button>
                </Link>
            </div>

            <SuccessDialog
                open={successOpen}
                onOpenChange={setSuccessOpen}
                title={sucessObject.title}
                description={sucessObject.description}
            />

            <DataTable
                columns={columns}
                data={employees}
                isLoading={isLoading}
                error={error}
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

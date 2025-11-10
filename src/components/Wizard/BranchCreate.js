"use client";


import React, { useState, useEffect, useCallback } from 'react';

import { createBranch, getBranchesForTable } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { parseApiError } from '@/lib/utils';
import { Button } from '../ui/button';
import { AnimatePresence, motion } from "framer-motion";

let initialPayload = {
    branch_name: "",
    branch_code: "",
    address: "",
    user_id: 0,
};

export default function BranchCreate() {

    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [globalError, setGlobalError] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10); // Default to 10 for a cleaner table, even if the API suggests 100
    const [loading, setLoading] = useState(false);

    const fetchEmployees = useCallback(async (page, perPage) => {
        setError(null);

        try {
            const params = {
                page: page,
                per_page: perPage,
                sortDesc: 'false',
                branch_id: null,
            };
            const result = await getBranchesForTable(params);

            // Check if result has expected structure before setting state
            if (result && Array.isArray(result.data)) {
                setItems(result.data);
                setCurrentPage(result.current_page || 1);
                return; // Success, exit
            } else {
                // If the API returned a 2xx status but the data structure is wrong
                throw new Error('Invalid data structure received from API.');
            }

        } catch (error) {
            setGlobalError(parseApiError(error));
        }
    }, [perPage]);

    const [form, setForm] = useState(initialPayload);

    useEffect(() => {
        fetchEmployees(currentPage, perPage);
    }, [currentPage, perPage, fetchEmployees]); // Re-fetch when page or perPage changes

    const handleRowClick = (item) => {
        console.log(item);
    }

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const onSubmit = async () => {
        setGlobalError(null);
        setLoading(true);
        try {
            let { data } = await createBranch(form);

            if (data?.status == false) {

                if (data.errors) {
                    const firstKey = Object.keys(data.errors)[0]; // get the first key
                    setGlobalError(firstKey);
                    return;
                } else {
                    setGlobalError(data.message);
                    return;
                }

            }
            fetchEmployees(currentPage, perPage);
            setForm(initialPayload);
        } catch (error) {
            setGlobalError(parseApiError(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Make sure the parent (e.g. CardContent) has controlled padding */}
            {/* <CardContent className="md:col-span-2 p-0"> */}

            <div className="flex justify-center items-center w-full">
                {/* LEFT: Branch list */}

                <div
                    className="px-5 border-r border-l shrink-0 h-full flex flex-col"
                >
                    {items.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center min-h-[60vh] text-center text-subtext-light dark:text-subtext-dark">
                            No branch created yet
                        </div>
                    ) : (

                        <>
                            <div className="text-xl  font-bold text-text-light dark:text-text-dark">
                                Branch List
                            </div>

                            <div className='flex-1 flex items-center min-h-[60vh] min-w-60'>
                                <motion.ul
                                    className="divide-y divide-border-light dark:divide-border-dark flex-1 overflow-y-auto"
                                    initial={false}
                                >
                                    <AnimatePresence>
                                        {items.map((item) => (
                                            <motion.li
                                                key={item.id}
                                                className="px-3 py-3 flex items-center gap-3 hover:bg-primary/10 cursor-pointer transition-colors"
                                                onClick={() => handleRowClick(item)}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                layout
                                                transition={{ duration: 0.3 }}
                                            >
                                                <img
                                                    alt={item.branch_name}
                                                    className="w-9 h-9 rounded-full flex-shrink-0"
                                                    src={`https://placehold.co/40x40/6946dd/ffffff?text=${item.branch_name.charAt(0)}`}
                                                    onError={(e) => {
                                                        e.currentTarget.onerror = null;
                                                        e.currentTarget.src = `https://placehold.co/40x40/6946dd/ffffff?text=${item.branch_name.charAt(0)}`;
                                                    }}
                                                />
                                                <div className="overflow-hidden">
                                                    <p className="font-medium text-text-light dark:text-text-dark truncate">
                                                        {item.branch_name}
                                                    </p>
                                                    <p className="text-sm text-subtext-light dark:text-subtext-dark truncate">
                                                        {item.branch_code || "N/A"}
                                                    </p>
                                                </div>
                                            </motion.li>
                                        ))}
                                    </AnimatePresence>
                                </motion.ul>
                            </div>
                        </>

                    )}
                </div>

                {/* RIGHT: Branch details */}
                <div className="flex-1 p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Form Fields */}
                        <div className="lg:col-span-2 lg:pl-4 space-y-4">
                            <div className="text-2xl font-bold text-text-light dark:text-text-dark">
                                Branch Information
                            </div>
                            <p className="text-sm text-text-light/60 dark:text-text-dark/60">
                                Fill in the basic details of the branch to get started.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium mb-1">Name</label>
                                    <Input
                                        value={form.branch_name}
                                        onChange={(e) => handleChange("branch_name", e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium mb-1">Short Name</label>
                                    <Input
                                        value={form.branch_code}
                                        onChange={(e) => handleChange("branch_code", e.target.value)}
                                    />
                                </div>
                            </div>


                            <div>
                                <label className="block text-xs font-medium mb-1">Address</label>
                                <textarea
                                    value={form.address}
                                    onChange={(e) => handleChange("address", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                    rows={4}
                                />
                            </div>

                            {globalError && (
                                <div className="mb-4 p-3 border border-red-500 bg-red-50 text-red-700 rounded-lg" role="alert">
                                    {globalError}
                                </div>
                            )}

                            {/* Buttons Right Aligned */}
                            <div className="flex justify-end gap-3 mt-4">
                                <Button
                                    onClick={onSubmit}
                                    disabled={loading}
                                    className="bg-primary text-white"
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

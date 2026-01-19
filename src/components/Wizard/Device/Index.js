"use client";


import React, { useState, useEffect, useCallback } from 'react';

import { getDevices, } from '@/lib/api';
import { parseApiError } from '@/lib/utils';
import { AnimatePresence, motion } from "framer-motion";
import Create from './Create';


export default function Index() {

    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [globalError, setGlobalError] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10); // Default to 10 for a cleaner table, even if the API suggests 100
    const [loading, setLoading] = useState(false);

    const fetchItems = useCallback(async (page, perPage) => {
        setError(null);

        try {
            const params = {
                page: page,
                per_page: perPage,
                sortDesc: 'false',
            };
            const result = await getDevices(params);

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

    useEffect(() => {
        fetchItems(currentPage, perPage);
    }, [currentPage, perPage, fetchItems]); // Re-fetch when page or perPage changes

    const handleRowClick = (item) => {
        console.log(item);
    }

    return (
        <>
            <div className="flex justify-center items-center w-full">
                <div
                    className="px-5 border-r border-l shrink-0 h-full flex flex-col"
                >
                    {items.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center min-h-[60vh] text-center text-subtext-light dark:text-subtext-dark">
                            No device created yet
                        </div>
                    ) : (

                        <>
                            <div className="text-xl  font-bold text-text-light dark:text-text-dark">
                                Device List
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
                                                <div className="overflow-hidden">
                                                    <p className="font-medium text-text-light dark:text-text-dark truncate">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-sm text-subtext-light dark:text-subtext-dark">
                                                        {item.device_id || 'N/A'}
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
                                Device Information
                            </div>
                            <p className="text-sm text-text-light/60 dark:text-text-dark/60">
                                Fill in the basic details of the device to get started.
                            </p>

                            <Create onSuccess={fetchItems} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

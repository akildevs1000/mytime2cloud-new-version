"use client";

import React, { useEffect, useState } from 'react';
import { notify, parseApiError } from "@/lib/utils";
import { useSearchParams, useRouter } from 'next/navigation';

import { shiftDetails, storeShift, updateShift } from '@/lib/api';
import LiveInsightSidebar from '@/components/Shift/LiveInsightSidebar';
import AttendanceRules from '@/components/Shift/AttendanceRules';
import PAYLOAD from './payload';
import ShiftIdentity from '@/components/Shift/ShiftIdentity';
import ShiftHeader from '@/components/Shift/Header';
import MultiAndFlexible from '@/components/Shift/MultiAndFlexible';
import SingleAndNight from '@/components/Shift/SingleAndNight';
import Dual from '@/components/Shift/Dual';
import { Loader } from '@/components/Loader';

const ShiftCreate = () => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');

    const handleGoBack = () => router.push("/shift");

    const [shift, setshift] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const renderShiftTypeComponent = () => {
        const typeId = Number(shift.shift_type_id);

        switch (typeId) {
            case 1:
            case 2:
                return <MultiAndFlexible shift={shift} handleChange={handleChange} />;
            case 4:
            case 6:
                return <SingleAndNight shift={shift} handleChange={handleChange} />;
            case 5:
                return <Dual shift={shift} handleChange={handleChange} />;
            default:
                return null; // Renders nothing if ID doesn't match
        }
    };

    const handleChange = (key, value) => {
        console.log(key, value);
        setshift((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const onSubmit = async () => {
        setIsSubmitting(true);

        try {
            // 1. Determine action (Update vs Store)
            const action = shift?.id ? updateShift(shift, shift.id) : storeShift(shift);
            const response = await action;

            // 2. Handle API-level validation errors
            if (!response.status) {
                // Safer way to extract the first error message
                const firstError = response.errors
                    ? Object.values(response.errors).flat()[0]
                    : "An unknown validation error occurred.";

                notify("Error", firstError, "error");
                setIsSubmitting(false); // Stop loading here since we aren't redirecting
                return;
            }

            // 3. Handle Success
            await notify("Success", "Shift information saved successfully.", "success");
            router.push(`/shift`);

        } catch (error) {
            // 4. Handle Network/Unexpected errors
            console.error("Submission failed:", error);
            notify("Error", parseApiError(error), "error");
            setIsSubmitting(false);
        }
        // Note: We don't use .finally() here because we want to keep 
        // the loading state active during the router.push transition.
    };

    // 2. Fetch only if ID exists (Edit Mode)
    useEffect(() => {
        if (id) {
            fetchShift(id);
        } else {
            setshift(PAYLOAD);
        }
    }, [id]);

    const fetchShift = async (id) => {
        try {
            const response = await shiftDetails(id);
            // Standardize based on whether your API returns { data: {...} } or just {...}
            const shiftData = response.data || response;
            setshift(shiftData);
        } catch (error) {
            console.error(error);
            notify("Error", "Failed to load shift details", "error");
        }
    };

    if (!shift) return <Loader />;

    return (
        <div className="p-5 overflow-y-auto max-h-[calc(100vh-100px)]">
            <ShiftHeader />
            <div className="flex flex-col lg:flex-row">

                <div className="w-full lg:w-[70%] p-6 pb-24 overflow-y-auto max-h-[calc(100vh-100px)]">
                    <div className="mx-auto lg:mx-0 space-y-8">

                        <ShiftIdentity shift={shift} handleChange={handleChange} />

                        {renderShiftTypeComponent()}

                        <AttendanceRules shift={shift} handleChange={handleChange} />

                        <div className="w-full flex justify-end gap-3">
                            <button type="button" onClick={handleGoBack} className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                                Cancel
                            </button>
                            <button type="button" onClick={onSubmit} className="px-6 py-2.5 rounded-lg bg-indigo-600 text-gray-600 dark:text-slate-300 font-medium shadow-lg hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center gap-2">
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-[30%] bg-white dark:bg-slate-900 border-l border-gray-200 dark:dark:border-white/10 p-6 flex flex-col gap-6 lg:min-h-full backdrop-blur-sm">
                    <LiveInsightSidebar shift={shift} />
                </div>
            </div>


        </div>
    );
};

export default ShiftCreate;
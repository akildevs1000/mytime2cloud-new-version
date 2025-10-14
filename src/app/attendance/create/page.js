"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form"; // Used for standard form handling
import { SuccessDialog } from "@/components/SuccessDialog"; // Import the new component

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Clock,
    Coffee,
    AlarmClock,
    CheckCircle2,
    FileText,
    Briefcase, Phone, ArrowLeft, Upload, Calendar as CalenddarIcon, CalendarIcon
} from "lucide-react";
import { cn, convertFileToBase64 } from "@/lib/utils";
import { useRouter } from 'next/navigation';

import { getBranches, getDepartments, storeEmployee } from '@/lib/api';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { user } from '@/config';
import { format } from 'date-fns';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';


const EmployeeProfileForm = () => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false) // ✅ renamed
    const router = useRouter();
    const handleUploadClick = () => fileInputRef.current.click();
    const handleGoBack = () => router.push(`/employees`);
    const handleCancel = () => router.push(`/employees`);
    const fileInputRef = useRef(null);
    const form = useForm({
        defaultValues: {
            // Personal Details
            title: "Mr.",
            first_name: null, // Initial value
            last_name: null, // Initial value
            full_name: null,
            display_name: null,
            // Employment Details
            employee_id: null,
            joining_date: null,
            branch_id: null, // null for no selection
            // Contact Information
            phone_number: "",
            whatsapp_number: "",
            // Other payload fields not tied to a visible input
            system_user_id: null,
            department_id: null,
            // Field present in original JSX but not in final payload keys (kept for form use)
            employee_device_id: null,
        },
    });
    const { watch, setValue, handleSubmit, formState: { isSubmitting } } = form;

    const [isBranchPopoverOpen, setIsBranchPopoverOpen] = useState(false);

    const [open, setOpen] = useState(false);
    const [globalError, setGlobalError] = useState(null);
    const [branches, setBranches] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const selectedBranchId = watch("branch_id");

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                setBranches(await getBranches());
            } catch (error) {
                console.error("Error fetching branches:", error);
                setBranches([]);
            }
        };
        fetchBranches();
    }, []);

    useEffect(() => {
        // Reset departments and department_id if no branch is selected
        if (!selectedBranchId) {
            setDepartments([]);
            setValue("department_id", null);
            return;
        }

        const fetchDepartments = async () => {
            try {

                let data = await getDepartments(selectedBranchId)
                setDepartments(data);

                const currentDeptId = watch("department_id");
                if (currentDeptId && !data.some(d => d.id === currentDeptId)) {
                    setValue("department_id", null);
                }

            } catch (error) {
                console.error("Error fetching departments:", error);
                setDepartments([]); // Clear departments on error
            }
        };
        fetchDepartments();
    }, [selectedBranchId]); // 👈 Depend on selectedBranchId and setValue

    const selectedBranchName = branches.find((b) => b.id === selectedBranchId)?.name || "Select Branch";
    // 2. Function triggered when a file is selected (on file input change)
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Basic file validation
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                setGlobalError("File size exceeds 2MB limit.");
                return;
            }
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                setGlobalError("Only JPG and PNG formats are supported.");
                return;
            }

            try {
                const base64String = await convertFileToBase64(file);
                setImagePreview(base64String); // Set for preview
                setImageFile(file);           // Store the file object for final payload processing
            } catch (error) {
                setGlobalError("Error converting file to Base64.");
                setImagePreview(null);
                setImageFile(null);
            }
        }
    };

    const onSubmit = async (data) => {

        setGlobalError(null); // 👈 CRITICAL: Clear previous errors on new submission

        // Map the collected form data to the final required employee payload structure
        const finalPayload = {
            title: data.title,
            joining_date: data.joining_date,
            // Construct full_name if not explicitly entered
            full_name: data.full_name || `${data.first_name || ''} ${data.last_name || ''}`.trim(),
            display_name: data.display_name,
            first_name: data.first_name,
            last_name: data.last_name,
            employee_id: data.employee_id,
            system_user_id: data.system_user_id, // Empty string if no input field exists
            phone_number: data.phone_number,
            whatsapp_number: data.whatsapp_number,
            branch_id: data.branch_id,
            department_id: data.department_id,
        };

        if (imageFile) {
            finalPayload.profile_image_base64 = await convertFileToBase64(imageFile);
        }

        try {

            await storeEmployee(finalPayload);

            setOpen(true);

            await new Promise(resolve => setTimeout(resolve, 2000));

            setOpen(false);

            router.push(`/employees`);

        } catch (error) {
            if (error.response) {

                const status = error.response.status;
                const responseData = error.response.data;

                if (status === 422) {
                    // 💥 422: Set a concise global error message.
                    setGlobalError(
                        responseData.message || "Validation failed. Please check the form fields for errors."
                    );

                    // You may also want to integrate responseData.errors with react-hook-form's setError here

                } else if (status >= 500) {
                    // 500: Server error
                    setGlobalError("A critical server error occurred. Please try again later.");
                } else {
                    // Other errors (401, 403, 404, etc.)
                    setGlobalError(responseData.message || `An error occurred with status ${status}.`);
                }

            } else {
                // Network error
                setGlobalError("Network error: Could not connect to the API.");
            }
        }
    };

    return (
        <div className="">
            <div
                className="relative  dark:bg-card-dark px-12  rounded-lg "
            >
                <div className="flex justify-between items-center  px-5">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">

                    </h1>
                    <Button
                        onClick={handleGoBack}
                        variant="default"
                        className="bg-primary text-white hover:bg-indigo-700 transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        BACK
                    </Button>
                </div>

                <div
                    className=" sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"
                >
                    <div
                        className="lg:col-span-3 bg-card-light dark:bg-card-dark p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm"
                    >
                        <header className="flex justify-between items-center mb-8">
                            <h1 className="text-xl font-bold text-text-strong-light dark:text-text-strong-dark">
                                Shift &amp; Schedule Management
                            </h1>

                            <div className="flex items-center space-x-3">
                                <Switch id="auto-shift" />
                                <Label
                                    htmlFor="auto-shift"
                                    className="text-sm font-medium text-text-light dark:text-text-dark"
                                >
                                    Auto Shift
                                </Label>
                            </div>
                        </header>
                        <div className="space-y-8">
                            <div
                                className="border-b border-border-light dark:border-border-dark pb-8"
                            >
                                <h3
                                    className="text-base font-semibold text-text-strong-light dark:text-text-strong-dark mb-4"
                                >
                                    Shift Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            for="type-of-schedule"
                                        >Type of Schedule*</Label>
                                        <Select>
                                            <SelectTrigger
                                                id="type-of-schedule"
                                                className="w-full rounded-lg text-sm"
                                            >
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="single">Single</SelectItem>
                                                <SelectItem value="double">Double</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            for="name-of-schedule"
                                        >Name of Schedule*</Label
                                        >
                                        <Input
                                            className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-sm transition-all"
                                            id="name-of-schedule"
                                            type="text"
                                            value="Day Duty"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                className="border-b border-border-light dark:border-border-dark pb-8"
                            >
                                <h3
                                    className="text-base font-semibold text-text-strong-light dark:text-text-strong-dark mb-4"
                                >
                                    Time Configuration
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            for="on-duty-time"
                                        >On Duty Time</Label
                                        >
                                        <div className="relative">
                                            <Input
                                                className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] pr-10 text-sm transition-all"
                                                id="on-duty-time"
                                                type="text"
                                                value="09:00"
                                            /><span
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                            ><span
                                                className="material-symbols-outlined text-text-light dark:text-text-dark text-base"
                                            >schedule</span
                                                ></span
                                            >
                                        </div>
                                    </div>
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            for="off-duty-time"
                                        >Off Duty Time</Label
                                        >
                                        <div className="relative">
                                            <Input
                                                className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] pr-10 text-sm transition-all"
                                                id="off-duty-time"
                                                type="text"
                                                value="18:00"
                                            /><span
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                            ><span
                                                className="material-symbols-outlined text-text-light dark:text-text-dark text-base"
                                            >schedule</span
                                                ></span
                                            >
                                        </div>
                                    </div>
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            for="min-working-hrs"
                                        >Min working hrs</Label
                                        >
                                        <div className="relative">
                                            <Input
                                                className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] pr-10 text-sm transition-all"
                                                id="min-working-hrs"
                                                type="text"
                                                value="09:00"
                                            /><span
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                            ><span
                                                className="material-symbols-outlined text-text-light dark:text-text-dark text-base"
                                            >schedule</span
                                                ></span
                                            >
                                        </div>
                                    </div>
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            for="ot-start"
                                        >OT start after</Label
                                        >
                                        <div className="relative">
                                            <Input
                                                className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] pr-10 text-sm transition-all"
                                                id="ot-start"
                                                type="text"
                                                value="00:30"
                                            /><span
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                            ><span
                                                className="material-symbols-outlined text-text-light dark:text-text-dark text-base"
                                            >schedule</span
                                                ></span
                                            >
                                        </div>
                                    </div>
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            for="beginning-in"
                                        >Beginning In</Label
                                        >
                                        <div className="relative">
                                            <Input
                                                className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] pr-10 text-sm transition-all"
                                                id="beginning-in"
                                                type="text"
                                                value="06:00"
                                            /><span
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                            ><span
                                                className="material-symbols-outlined text-text-light dark:text-text-dark text-base"
                                            >schedule</span
                                                ></span
                                            >
                                        </div>
                                    </div>
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            for="beginning-out"
                                        >Beginning Out</Label
                                        >
                                        <div className="relative">
                                            <Input
                                                className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] pr-10 text-sm transition-all"
                                                id="beginning-out"
                                                type="text"
                                                value="13:00"
                                            /><span
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                            ><span
                                                className="material-symbols-outlined text-text-light dark:text-text-dark text-base"
                                            >schedule</span
                                                ></span
                                            >
                                        </div>
                                    </div>
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            for="ending-in"
                                        >Ending In</Label
                                        >
                                        <div className="relative">
                                            <Input
                                                className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] pr-10 text-sm transition-all"
                                                id="ending-in"
                                                type="text"
                                                value="15:00"
                                            /><span
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                            ><span
                                                className="material-symbols-outlined text-text-light dark:text-text-dark text-base"
                                            >schedule</span
                                                ></span
                                            >
                                        </div>
                                    </div>
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            for="ending-out"
                                        >Ending Out</Label
                                        >
                                        <div className="relative">
                                            <Input
                                                className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] pr-10 text-sm transition-all"
                                                id="ending-out"
                                                type="text"
                                                value="23:00"
                                            /><span
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                            ><span
                                                className="material-symbols-outlined text-text-light dark:text-text-dark text-base"
                                            >schedule</span
                                                ></span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="border-b border-border-light dark:border-border-dark pb-8"
                            >
                                <h3
                                    className="text-base font-semibold text-text-strong-light dark:text-text-strong-dark mb-4"
                                >
                                    Half Day Configuration
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                                    <div className="md:col-span-1">
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            for="half-day-weekdays"
                                        >Half Day Setting</Label
                                        >
                                        <Select defaultValue="saturday">
                                            <SelectTrigger
                                                id="half-day-weekdays"
                                                className="w-full rounded-lg text-sm"
                                            >
                                                <SelectValue placeholder="Select day" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="monday">Monday</SelectItem>
                                                <SelectItem value="tuesday">Tuesday</SelectItem>
                                                <SelectItem value="wednesday">Wednesday</SelectItem>
                                                <SelectItem value="thursday">Thursday</SelectItem>
                                                <SelectItem value="friday">Friday</SelectItem>
                                                <SelectItem value="saturday">Saturday</SelectItem>
                                                <SelectItem value="sunday">Sunday</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="md:col-span-2 grid grid-cols-2 gap-6">
                                        <div>
                                            <Label
                                                className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                                for="half-day-in-time"
                                            >In Time</Label
                                            >
                                            <div className="relative">
                                                <Input
                                                    className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] pr-10 text-sm transition-all"
                                                    id="half-day-in-time"
                                                    type="text"
                                                    value="09:00"
                                                />
                                                <span
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                                ><span
                                                    className="material-symbols-outlined text-text-light dark:text-text-dark text-base"
                                                >schedule</span
                                                    ></span
                                                >
                                            </div>
                                        </div>
                                        <div>
                                            <Label
                                                className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                                for="half-day-out-time"
                                            >Out Time</Label
                                            >
                                            <div className="relative">
                                                <Input
                                                    className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] pr-10 text-sm transition-all"
                                                    id="half-day-out-time"
                                                    type="text"
                                                    value="13:00"
                                                />
                                                <span
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                                ><span
                                                    className="material-symbols-outlined text-text-light dark:text-text-dark text-base"
                                                >schedule</span
                                                    ></span
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="border-b border-border-light dark:border-border-dark pb-8"
                            >
                                <h3
                                    className="text-base font-semibold text-text-strong-light dark:text-text-strong-dark mb-4"
                                >
                                    Working Days Status
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                                    <div
                                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-background-light dark:bg-gray-800/50 border border-border-light dark:border-border-dark"
                                    >
                                        <span className="font-medium text-sm">MON</span>
                                        <div className="relative">
                                            <Input
                                                checked=""
                                                className="sr-only toggle-checkbox"
                                                id="mon-toggle"
                                                type="checkbox"
                                            />
                                            <Label
                                                className="toggle-Label flex items-center w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition-colors"
                                                for="mon-toggle"
                                            >
                                                <div
                                                    className="toggle-dot w-4 h-4 bg-white rounded-full shadow-md transform transition-transform"
                                                ></div>
                                            </Label>
                                        </div>
                                    </div>
                                    <div
                                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-background-light dark:bg-gray-800/50 border border-border-light dark:border-border-dark"
                                    >
                                        <span className="font-medium text-sm">TUE</span>
                                        <div className="relative">
                                            <Input
                                                checked=""
                                                className="sr-only toggle-checkbox"
                                                id="tue-toggle"
                                                type="checkbox"
                                            />
                                            <Label
                                                className="toggle-Label flex items-center w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition-colors"
                                                for="tue-toggle"
                                            >
                                                <div
                                                    className="toggle-dot w-4 h-4 bg-white rounded-full shadow-md transform transition-transform"
                                                ></div>
                                            </Label>
                                        </div>
                                    </div>
                                    <div
                                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-background-light dark:bg-gray-800/50 border border-border-light dark:border-border-dark"
                                    >
                                        <span className="font-medium text-sm">WED</span>
                                        <div className="relative">
                                            <Input
                                                checked=""
                                                className="sr-only toggle-checkbox"
                                                id="wed-toggle"
                                                type="checkbox"
                                            />
                                            <Label
                                                className="toggle-Label flex items-center w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition-colors"
                                                for="wed-toggle"
                                            >
                                                <div
                                                    className="toggle-dot w-4 h-4 bg-white rounded-full shadow-md transform transition-transform"
                                                ></div>
                                            </Label>
                                        </div>
                                    </div>
                                    <div
                                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-background-light dark:bg-gray-800/50 border border-border-light dark:border-border-dark"
                                    >
                                        <span className="font-medium text-sm">THU</span>
                                        <div className="relative">
                                            <Input
                                                checked=""
                                                className="sr-only toggle-checkbox"
                                                id="thu-toggle"
                                                type="checkbox"
                                            />
                                            <Label
                                                className="toggle-Label flex items-center w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition-colors"
                                                for="thu-toggle"
                                            >
                                                <div
                                                    className="toggle-dot w-4 h-4 bg-white rounded-full shadow-md transform transition-transform"
                                                ></div>
                                            </Label>
                                        </div>
                                    </div>
                                    <div
                                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-background-light dark:bg-gray-800/50 border border-border-light dark:border-border-dark"
                                    >
                                        <span className="font-medium text-sm">FRI</span>
                                        <div className="relative">
                                            <Input
                                                checked=""
                                                className="sr-only toggle-checkbox"
                                                id="fri-toggle"
                                                type="checkbox"
                                            />
                                            <Label
                                                className="toggle-Label flex items-center w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition-colors"
                                                for="fri-toggle"
                                            >
                                                <div
                                                    className="toggle-dot w-4 h-4 bg-white rounded-full shadow-md transform transition-transform"
                                                ></div>
                                            </Label>
                                        </div>
                                    </div>
                                    <div
                                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-red-100/50 dark:bg-red-900/40 border border-red-200 dark:border-red-800/60"
                                    >
                                        <span className="font-medium text-sm text-red-700 dark:text-red-300"
                                        >SAT</span
                                        >
                                        <div className="relative">
                                            <Input
                                                className="sr-only toggle-checkbox"
                                                id="sat-toggle"
                                                type="checkbox"
                                            />
                                            <Label
                                                className="toggle-Label flex items-center w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition-colors"
                                                for="sat-toggle"
                                            >
                                                <div
                                                    className="toggle-dot w-4 h-4 bg-white rounded-full shadow-md transform transition-transform"
                                                ></div>
                                            </Label>
                                        </div>
                                    </div>
                                    <div
                                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-red-100/50 dark:bg-red-900/40 border border-red-200 dark:border-red-800/60"
                                    >
                                        <span className="font-medium text-sm text-red-700 dark:text-red-300"
                                        >SUN</span
                                        >
                                        <div className="relative">
                                            <Input
                                                className="sr-only toggle-checkbox"
                                                id="sun-toggle"
                                                type="checkbox"
                                            />
                                            <Label
                                                className="toggle-Label flex items-center w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition-colors"
                                                for="sun-toggle"
                                            >
                                                <div
                                                    className="toggle-dot w-4 h-4 bg-white rounded-full shadow-md transform transition-transform"
                                                ></div>
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="border-b border-border-light dark:border-border-dark pb-8"
                            >
                                <h3
                                    className="text-base font-semibold text-text-strong-light dark:text-text-strong-dark mb-4"
                                >
                                    Grace Period &amp; Overtime
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            for="grace-period-cin"
                                        >Grace Period for Check-in (CIN)</Label
                                        >
                                        <div className="relative">
                                            <Input
                                                className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] pr-16 text-sm transition-all"
                                                id="grace-period-cin"
                                                type="number"
                                                value="15"
                                            />
                                            <span
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-sm text-text-light dark:text-text-dark"
                                            >minutes</span
                                            >
                                        </div>
                                    </div>
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            for="grace-period-cout"
                                        >Grace Period for Check-out (COUT)</Label
                                        >
                                        <div className="relative">
                                            <Input
                                                className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] pr-16 text-sm transition-all"
                                                id="grace-period-cout"
                                                type="number"
                                                value="15"
                                            />
                                            <span
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-sm text-text-light dark:text-text-dark"
                                            >minutes</span
                                            >
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 space-y-4">
                                        <div>
                                            <Label
                                                className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                                for="overtime-threshold"
                                            >Calculate Overtime after</Label
                                            >
                                            <div className="relative">
                                                <Input
                                                    className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] pr-16 text-sm transition-all"
                                                    id="overtime-threshold"
                                                    type="number"
                                                    value="30"
                                                />
                                                <span
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-sm text-text-light dark:text-text-dark"
                                                >minutes</span
                                                >
                                            </div>
                                        </div>
                                        <div>
                                            <Label
                                                className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            >Apply Overtime to</Label
                                            >
                                            <div className="flex items-center space-x-6">
                                                <div className="flex items-center">
                                                    <Input
                                                        checked=""
                                                        className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)] border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-offset-gray-800"
                                                        id="ot-before"
                                                        name="ot-apply"
                                                        type="radio"
                                                    />
                                                    <Label
                                                        className="ml-2 block text-sm text-text-strong-light dark:text-text-strong-dark"
                                                        for="ot-before"
                                                    >Before Duty</Label
                                                    >
                                                </div>
                                                <div className="flex items-center">
                                                    <Input
                                                        className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)] border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-offset-gray-800"
                                                        id="ot-after"
                                                        name="ot-apply"
                                                        type="radio"
                                                    />
                                                    <Label
                                                        className="ml-2 block text-sm text-text-strong-light dark:text-text-strong-dark"
                                                        for="ot-after"
                                                    >After Duty</Label
                                                    >
                                                </div>
                                                <div className="flex items-center">
                                                    <Input
                                                        className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)] border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-offset-gray-800"
                                                        id="ot-both"
                                                        name="ot-apply"
                                                        type="radio"
                                                    />
                                                    <Label
                                                        className="ml-2 block text-sm text-text-strong-light dark:text-text-strong-dark"
                                                        for="ot-both"
                                                    >Both</Label
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <h3
                                    className="text-base font-semibold text-text-strong-light dark:text-text-strong-dark mb-4"
                                >
                                    Conditional Rules
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between gap-4">
                                        <Label
                                            className="flex-grow text-sm text-text-strong-light dark:text-text-strong-dark whitespace-nowrap"
                                            for="absent-for-in-threshold"
                                        >Mark as Absent for In after</Label
                                        >
                                        <div className="relative w-48">
                                            <Input
                                                className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] pr-16 text-sm transition-all"
                                                id="absent-for-in-threshold"
                                                type="number"
                                                value="60"
                                            />
                                            <span
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-sm text-text-light dark:text-text-dark"
                                            >minutes</span
                                            >
                                        </div>
                                        <div className="relative">
                                            <Input
                                                checked=""
                                                className="sr-only toggle-checkbox"
                                                id="late-exceeds-absent"
                                                type="checkbox"
                                            />
                                            <Label
                                                className="toggle-Label flex items-center w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition-colors"
                                                for="late-exceeds-absent"
                                            >
                                                <div
                                                    className="toggle-dot w-4 h-4 bg-white rounded-full shadow-md transform transition-transform"
                                                ></div>
                                            </Label>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <Label
                                            className="flex-grow text-sm text-text-strong-light dark:text-text-strong-dark whitespace-nowrap"
                                            for="absent-for-out-threshold"
                                        >Mark as Absent for Out before</Label
                                        >
                                        <div className="relative w-48">
                                            <Input
                                                className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] pr-16 text-sm transition-all"
                                                id="absent-for-out-threshold"
                                                type="number"
                                                value="60"
                                            />
                                            <span
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-sm text-text-light dark:text-text-dark"
                                            >minutes</span
                                            >
                                        </div>
                                        <div className="relative">
                                            <Input
                                                checked=""
                                                className="sr-only toggle-checkbox"
                                                id="early-exceeds-absent"
                                                type="checkbox"
                                            />
                                            <Label
                                                className="toggle-Label flex items-center w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition-colors"
                                                for="early-exceeds-absent"
                                            >
                                                <div
                                                    className="toggle-dot w-4 h-4 bg-white rounded-full shadow-md transform transition-transform"
                                                ></div>
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-8">
                            <button
                                className="bg-[var(--primary)] text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all text-sm transform hover:scale-105 active:scale-95 flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-xl">save</span> SAVE
                                CHANGES
                            </button>
                        </div>
                    </div>
                    <Card className="lg:col-span-2 bg-card-light dark:bg-card-dark border-border-light dark:border-border-dark shadow-sm rounded-2xl">
                        <CardHeader className="flex justify-between items-center">
                            <CardTitle className="text-lg font-semibold text-text-strong-light dark:text-text-strong-dark">
                                Shift Details
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800/60">
                                {/* Title & Time */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                                            Day Duty
                                        </h3>
                                        <p className="text-sm text-text-light dark:text-text-dark">
                                            A standard daytime work schedule.
                                        </p>
                                    </div>
                                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 py-1 px-2 rounded-full">
                                        09:00 - 18:00
                                    </span>
                                </div>

                                {/* Key Statistics */}
                                <div className="mt-6 border-t border-blue-200 dark:border-blue-800/60 pt-4">
                                    <h4 className="font-semibold text-sm mb-3 text-text-strong-light dark:text-text-strong-dark">
                                        Key Statistics
                                    </h4>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-green-500" />
                                            <div>
                                                <p className="text-xs text-text-light dark:text-text-dark">
                                                    Start Time
                                                </p>
                                                <p className="font-medium">09:00</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-red-500" />
                                            <div>
                                                <p className="text-xs text-text-light dark:text-text-dark">
                                                    End Time
                                                </p>
                                                <p className="font-medium">18:00</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-blue-500" />
                                            <div>
                                                <p className="text-xs text-text-light dark:text-text-dark">
                                                    Work Hours
                                                </p>
                                                <p className="font-medium">8h</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Coffee className="w-4 h-4 text-yellow-500" />
                                            <div>
                                                <p className="text-xs text-text-light dark:text-text-dark">
                                                    Break
                                                </p>
                                                <p className="font-medium">1h</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <AlarmClock className="w-4 h-4 text-violet-500" />
                                            <div>
                                                <p className="text-xs text-text-light dark:text-text-dark">
                                                    OT Start
                                                </p>
                                                <p className="font-medium">18:30</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-gray-500" />
                                            <div>
                                                <p className="text-xs text-text-light dark:text-text-dark">
                                                    Grace Period
                                                </p>
                                                <p className="font-medium">15 min</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Associated Policies */}
                                <div className="mt-6 border-t border-blue-200 dark:border-blue-800/60 pt-4">
                                    <h4 className="font-semibold text-sm mb-3 text-text-strong-light dark:text-text-strong-dark">
                                        Associated Policies
                                    </h4>

                                    <ul className="space-y-2 text-sm text-text-light dark:text-text-dark">
                                        <li className="flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-[var(--primary)]" />
                                            <span>Standard Attendance Policy applies.</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-[var(--primary)]" />
                                            <span>Overtime after 30 mins (Before Duty).</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Monthly Flexible Holiday */}
                                <div className="mt-6 border-t border-blue-200 dark:border-blue-800/60 pt-4">
                                    <h4 className="text-base font-semibold text-text-strong-light dark:text-text-strong-dark mb-3">
                                        Monthly Flexible Holiday
                                    </h4>

                                    <div>
                                        <Label
                                            htmlFor="flexible-holiday-count"
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                        >
                                            Number of Days
                                        </Label>
                                        <div className="relative bg-white">
                                            <Input
                                                id="flexible-holiday-count"
                                                type="number"
                                                defaultValue="2"
                                                className="w-full pr-12 text-sm"
                                            />
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-sm text-text-light dark:text-text-dark">
                                                days
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfileForm;
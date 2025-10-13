"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form"; // Used for standard form handling
import { SuccessDialog } from "@/components/SuccessDialog"; // Import the new component
import { Calendar } from "@/components/ui/calendar"


// --- SHADCN/UI & Icon Imports (lucide-react is the standard for shadcn) ---
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";

import { Check, ChevronsUpDown, User, Briefcase, Phone, ArrowLeft, Upload, Calendar as CalenddarIcon, CheckCircle2, CalendarIcon } from "lucide-react";
import { cn, convertFileToBase64 } from "@/lib/utils";
import { useRouter } from 'next/navigation';

import { getBranches, getDepartments, storeEmployee } from '@/lib/api';


import { user } from '@/config';
import { format } from 'date-fns';


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
            first_name: "John", // Initial value
            last_name: "Doe", // Initial value
            full_name: "",
            display_name: "",
            // Employment Details
            employee_id: "",
            joining_date: "2023-10-11",
            branch_id: null, // null for no selection
            // Contact Information
            phone_number: "",
            whatsapp_number: "",
            // Other payload fields not tied to a visible input
            system_user_id: "",
            department_id: null,
            // Field present in original JSX but not in final payload keys (kept for form use)
            employee_device_id: "",
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
                className="relative  dark:bg-card-dark px-13  rounded-lg "
            >
                <div className="flex justify-between items-center  px-5">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Employees
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
                    className="relative dark:bg-card-dark p-8 pt-20 rounded-lg" // pt-24 provides space for the absolutely positioned image section
                >
                    {/* Profile Image and Upload Controls - Absolutely positioned to overlap the top border */}
                    <div
                        className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center" // Changed -top-2 to -top-4 for slightly more overlap, but -top-2 was also fine.
                    >
                        {/* Image Preview Area */}
                        <div className="w-48 h-48 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-6 border-4 border-dashed border-indigo-200 dark:border-indigo-700 overflow-hidden">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Profile Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User className="text-6xl text-primary h-24 w-24" />
                            )}
                        </div>

                        {/* File Name Display */}
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
                            {imageFile ? imageFile.name : "No Image Selected"}
                        </p>

                        {/* Upload Button */}
                        <Button
                            onClick={handleUploadClick}
                            className="bg-primary text-white hover:bg-indigo-700"
                        >
                            <Upload className="mr-2 h-4 w-4" />
                            {imageFile ? "CHANGE IMAGE" : "UPLOAD IMAGE"}
                        </Button>

                        {/* Hidden File Input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".jpg, .jpeg, .png"
                            className="hidden"
                        />

                        {/* Constraints Text */}
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                            * Upload JPG or PNG only. <br />
                            Maximum file size 2MB.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg pt-50">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Columns 2 & 3: Main Form Fields (No separate background/padding) */}
                            <div className="lg:col-span-2 lg:pl-4"> {/* Added left padding for separation */}
                                <Form {...form}>
                                    {/* Use handleSubmit from useForm */}
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                                        {/* Personal Details Section */}
                                        {/* ... (rest of your form fields are here) ... */}
                                        <section>
                                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                                                <User className="mr-3 h-6 w-6 text-primary" />
                                                Personal Details
                                            </h2>

                                            {/* Row 1: Title, First Name, Last Name */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {/* Title Select */}
                                                <FormField
                                                    control={form.control}
                                                    name="title"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Title</FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Select Title" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {['Mr.', 'Mrs.', 'Ms.'].map((option) => (
                                                                        <SelectItem key={option} value={option}>
                                                                            {option}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                {/* First Name Input */}
                                                <FormField
                                                    control={form.control}
                                                    name="first_name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>First Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter first name" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                {/* Last Name Input */}
                                                <FormField
                                                    control={form.control}
                                                    name="last_name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Last Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter last name" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            {/* Row 2: Full Legal Name, Display Name */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                                <FormField
                                                    control={form.control}
                                                    name="full_name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Full Legal Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter employee's full legal name" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="display_name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Display Name / Nickname</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Nickname or preferred display name" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </section>

                                        <hr className="border-gray-200 dark:border-gray-700" />

                                        {/* Employment Details Section */}
                                        <section>
                                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                                                <Briefcase className="mr-3 h-6 w-6 text-primary" />
                                                Employment Details
                                            </h2>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {/* Branch Dropdown (using Popover/Command for combobox) */}
                                                <FormField
                                                    control={form.control}
                                                    name="branch_id"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col">
                                                            <FormLabel>Branch</FormLabel>
                                                            <Popover open={isBranchPopoverOpen} onOpenChange={setIsBranchPopoverOpen}>
                                                                <PopoverTrigger asChild>
                                                                    <FormControl>
                                                                        <Button
                                                                            variant="outline"
                                                                            role="combobox"
                                                                            className={cn(
                                                                                "justify-between w-full",
                                                                                !field.value && "text-muted-foreground"
                                                                            )}
                                                                            onClick={() => setIsBranchPopoverOpen(true)} // Manually control open on click
                                                                        >
                                                                            {/* Assuming selectedBranchName is defined elsewhere */}
                                                                            {selectedBranchName}
                                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                                                                    <Command>
                                                                        <CommandInput placeholder="Search branch..." />
                                                                        <CommandEmpty>No branch found.</CommandEmpty>
                                                                        <CommandGroup>
                                                                            {/* Assuming 'branches' and 'setValue' are defined elsewhere */}
                                                                            {branches.map((branch) => (
                                                                                <CommandItem
                                                                                    value={branch.name}
                                                                                    key={branch.id}
                                                                                    onSelect={() => {
                                                                                        setValue("branch_id", branch.id);
                                                                                        // 2. Close the popover after selection
                                                                                        setIsBranchPopoverOpen(false);
                                                                                    }}
                                                                                >
                                                                                    <Check
                                                                                        className={cn(
                                                                                            "mr-2 h-4 w-4",
                                                                                            branch.id === field.value ? "opacity-100" : "opacity-0"
                                                                                        )}
                                                                                    />
                                                                                    {branch.name}
                                                                                </CommandItem>
                                                                            ))}
                                                                        </CommandGroup>
                                                                    </Command>
                                                                </PopoverContent>
                                                            </Popover>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                {/* Department Select (dependent on Branch) */}
                                                <FormField
                                                    control={form.control}
                                                    name="department_id"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Department</FormLabel>
                                                            <Select
                                                                onValueChange={(value) => field.onChange(parseInt(value))}
                                                                value={field.value !== null ? field.value.toString() : ""}
                                                                disabled={!selectedBranchId || departments.length === 0}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Select Department" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {departments.map((department) => (
                                                                        <SelectItem
                                                                            key={department.id}
                                                                            value={department.id.toString()}
                                                                        >
                                                                            {department.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                {/* Joining Date Input */}
                                                <FormField
                                                    control={form.control}
                                                    name="joining_date"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col">
                                                            <FormLabel>Joining Date</FormLabel>
                                                            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                                                                <PopoverTrigger asChild>
                                                                    <FormControl>
                                                                        <Button
                                                                            variant="outline"
                                                                            className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"
                                                                                }`}
                                                                        >
                                                                            {field.value ? (
                                                                                format(field.value, "yyyy-MM-dd")
                                                                            ) : (
                                                                                <span>Pick a date</span>
                                                                            )}
                                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={field.value}
                                                                        onSelect={(date) => {
                                                                            field.onChange(date)
                                                                            setIsDatePickerOpen(false) // ✅ closes after selection
                                                                        }}
                                                                        initialFocus
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />


                                                {/* Employee ID Input */}
                                                <FormField
                                                    control={form.control}
                                                    name="employee_id"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Employee ID</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Unique ID (e.g., EMP001)" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                {/* System User ID Input (Device ID) */}
                                                <FormField
                                                    control={form.control}
                                                    name="system_user_id"
                                                    render={({ field }) => (
                                                        <FormItem className="md:col-span-1">
                                                            <FormLabel>System User ID (Device Id)</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Asset Tracking ID (Optional)" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </section>

                                        <hr className="border-gray-200 dark:border-gray-700" />

                                        {/* Contact Information Section */}
                                        <section>
                                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                                                <Phone className="mr-3 h-6 w-6 text-primary" />
                                                Contact Information
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Primary Mobile Input */}
                                                <FormField
                                                    control={form.control}
                                                    name="phone_number"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Primary Mobile</FormLabel>
                                                            <FormControl>
                                                                <Input type="tel" placeholder="e.g., +1 555-123-4567" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                {/* Whatsapp Number Input */}
                                                <FormField
                                                    control={form.control}
                                                    name="whatsapp_number"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Whatsapp Number</FormLabel>
                                                            <FormControl>
                                                                <Input type="tel" placeholder="e.g., same as mobile (Optional)" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </section>

                                        {globalError && (
                                            <div className="mb-4 p-3 border border-red-500 bg-red-50 text-red-700 rounded-lg" role="alert">
                                                {globalError}
                                            </div>
                                        )}

                                        {/* Form Actions */}
                                        <div className="flex justify-end space-x-4 pt-4">
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                onClick={handleCancel}
                                            >
                                                CANCEL
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="bg-primary hover:bg-indigo-700"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                                            </Button>
                                        </div>
                                    </form>
                                </Form>

                                <SuccessDialog
                                    open={open}
                                    onOpenChange={setOpen}
                                    title="Profile Saved"
                                    description="Your profile information has been inserted successfully."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfileForm;
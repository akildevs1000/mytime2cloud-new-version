"use client";

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form"; // Used for standard form handling

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

import { Check, ChevronsUpDown, User, Briefcase, Phone, ArrowLeft, Upload, Calendar } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming a utility for class merging
import { useRouter } from 'next/navigation';


// --- CONSTANTS ---
const API_BASE_URL = 'https://mytime2cloud-backend.test/api';
const COMPANY_ID = 22;


/**
 * Main Employee Profile Form Component.
 */
const EmployeeProfileForm = () => {

    const router = useRouter();

    // Inside your component function:
    const [globalError, setGlobalError] = useState(null);

    // State for fetching branches
    const [branches, setBranches] = useState([]);
    const [departments, setDepartments] = useState([]); // 👈 NEW state for departments

    // Inside EmployeeProfileForm component:
    const [imagePreview, setImagePreview] = useState(null); // Holds the Base64 string for display
    const [imageFile, setImageFile] = useState(null);       // Holds the actual file object
    const fileInputRef = useRef(null); // 👈 NEW: Use a ref to control the hidden file input
    // ... other states (branches, departments)

    // 1. Initialize useForm with default values matching the desired payload structure
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

    // Destructure necessary methods and properties
    const { watch, setValue, handleSubmit, formState: { isSubmitting } } = form;

    // Watch the branch_id field to display the selected name
    const selectedBranchId = watch("branch_id");

    // --- EFFECT: Fetch branches ---
    useEffect(() => {
        if (!COMPANY_ID) return;
        const fetchBranches = async () => {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/branch-list`, {
                    params: {
                        company_id: COMPANY_ID,
                        order_by: 'name',
                    }
                });
                setBranches(data);
            } catch (error) {
                console.error("Error fetching branches:", error);
            }
        };
        fetchBranches();
    }, []);

    // --- EFFECT: Fetch departments on branch change ---
    useEffect(() => {
        // Reset departments and department_id if no branch is selected
        if (!selectedBranchId) {
            setDepartments([]);
            setValue("department_id", null);
            return;
        }

        const fetchDepartments = async () => {
            try {
                // 💡 API endpoint for departments
                const { data } = await axios.get(`${API_BASE_URL}/department-list`, {
                    params: {
                        company_id: COMPANY_ID,
                        branch_id: selectedBranchId, // 💡 Pass the selected branch ID
                        order_by: 'name',
                    }
                });
                setDepartments(data);

                // Optional: If the previously selected department is not in the new list, reset it
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


    // Helper to get the selected branch's name
    const selectedBranchName = branches.find((b) => b.id === selectedBranchId)?.name || "Select Branch";

    // Add this helper function outside or inside the component
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Inside EmployeeProfileForm component:

    // 1. Function triggered by the visible Button click
    const handleUploadClick = () => {
        // Programmatically click the hidden file input
        fileInputRef.current.click();
    };

    // 2. Function triggered when a file is selected (on file input change)
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Basic file validation
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert("File size exceeds 2MB limit.");
                return;
            }
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                alert("Only JPG and PNG formats are supported.");
                return;
            }

            try {
                const base64String = await convertFileToBase64(file);
                setImagePreview(base64String); // Set for preview
                setImageFile(file);           // Store the file object for final payload processing
            } catch (error) {
                console.error("Error converting file to Base64:", error);
                setImagePreview(null);
                setImageFile(null);
            }
        }
    };



    // ... existing handleSubmit function

    // --- HANDLER: Form Submission ---
    const onSubmit = async (data) => {

        console.log('Form data collected by react-hook-form:', data);

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
            department_id: data.department_id, // null if no input field exists
            company_id: COMPANY_ID
        };

        if (imageFile) {
            finalPayload.profile_image_base64 = await convertFileToBase64(imageFile);
        }

        try {

            await axios.post(`${API_BASE_URL}/employee-store-new`, finalPayload);

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

    const handleGoBack = () => {
        router.push(`/employees`);
        // Implement actual navigation logic here
    };

    const handleCancel = () => {
        router.push(`/employees`);
    };

    // --- RENDER ---
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form Fields */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                    <Form {...form}>
                        {/* Use handleSubmit from useForm */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                            {/* Personal Details Section */}
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
                                                        {/* 💡 FIX APPLIED HERE: Add the w-full class to SelectTrigger */}
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
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className={cn(
                                                                    "justify-between",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {selectedBranchName}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[250px] p-0">
                                                        <Command>
                                                            <CommandInput placeholder="Search branch..." />
                                                            <CommandEmpty>No branch found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {branches.map((branch) => (
                                                                    <CommandItem
                                                                        value={branch.name}
                                                                        key={branch.id}
                                                                        // Use setValue to update the form state
                                                                        onSelect={() => {
                                                                            setValue("branch_id", branch.id);
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

                                    <FormField
                                        control={form.control}
                                        name="department_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Department</FormLabel>
                                                <Select
                                                    onValueChange={(value) => field.onChange(parseInt(value))}
                                                    value={field.value !== null ? field.value.toString() : ""}
                                                    disabled={!selectedBranchId || departments.length === 0} // 💡 Disable if no branch is selected/departments loaded
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
                                                                value={department.id.toString()} // Select expects string value
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

                                    <FormField
                                        control={form.control}
                                        name="joining_date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Joining Date (YYYY-MM-DD)</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input type="text" placeholder="YYYY-MM-DD" {...field} />
                                                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                                    </div>
                                                </FormControl>
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

                                    {/* Employee Device ID Input */}
                                    <FormField
                                        control={form.control}
                                        name="system_user_id"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-1">
                                                <FormLabel>Employee Device Id</FormLabel>
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
                </div>

                {/* Right Column: Profile Image Upload */}

                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg self-start">
                    {/* 💡 NEW: Hidden File Input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".jpg, .jpeg, .png"
                        className="hidden" // Hides the input element
                    />

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                        Profile Image
                    </h2>
                    <div className="flex flex-col items-center">
                        <div className="w-48 h-48 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-6 border-4 border-dashed border-indigo-200 dark:border-indigo-700 overflow-hidden">
                            {imagePreview ? (
                                // 💡 Show image preview if available
                                <img
                                    src={imagePreview}
                                    alt="Profile Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                // 💡 Show default User icon if no image is selected
                                <User className="text-6xl text-primary h-24 w-24" />
                            )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            {imageFile ? imageFile.name : "No Image Selected"} {/* 💡 Show filename */}
                        </p>
                        <Button
                            onClick={handleUploadClick} // 💡 Use the new handler to click the hidden input
                            className="bg-primary text-white hover:bg-indigo-700"
                        >
                            <Upload className="mr-2 h-4 w-4" />
                            {imageFile ? "CHANGE IMAGE" : "UPLOAD IMAGE"}
                        </Button>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                            * Upload JPG or PNG only. <br />
                            Maximum file size 2MB.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfileForm;
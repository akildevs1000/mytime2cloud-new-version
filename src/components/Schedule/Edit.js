"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form"; // Used for standard form handling
import { SuccessDialog } from "@/components/SuccessDialog"; // Import the new component
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

import { Check, ChevronsUpDown, User, Briefcase, Phone, ArrowLeft, Upload, Calendar as CalenddarIcon, CheckCircle2, CalendarIcon } from "lucide-react";
import { cn, convertFileToBase64 } from "@/lib/utils";
import { useRouter } from 'next/navigation';

import { getBranches, getDepartments, parseApiError, storeEmployee } from '@/lib/api';


import { user } from '@/config';
import { format } from 'date-fns';
import BranchSelect from '@/components/ui/BranchSelect';
import DatePicker from '@/components/ui/DatePicker';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';


const EmployeeScheduleEdit = () => {
    const router = useRouter();
    const fileInputRef = useRef(null);
    const handleCancel = () => router.push(`/schedule`);
    const form = useForm({
        defaultValues: {
            department_id: "",
            from_date: null,
            to_date: null,
        },
    });
    const { watch, setValue, handleSubmit, formState: { isSubmitting } } = form;

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
            setGlobalError(parseApiError(error));
        }
    };

    return (
        <div
            className="relative dark:bg-card-dark   rounded-lg" // pt-24 provides space for the absolutely positioned image section
        >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl ">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Columns 2 & 3: Main Form Fields (No separate background/padding) */}
                    <div className="lg:col-span-2 lg:pl-4"> {/* Added left padding for separation */}
                        <Form {...form}>
                            {/* Use handleSubmit from useForm */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                                {/* Employment Details Section */}
                                <section>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                                        <Briefcase className="mr-3 h-6 w-6 text-primary" />
                                        Employee Schedule Details
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="branch_id"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Branch</FormLabel>

                                                    <BranchSelect
                                                        onSelect={(id) => { setValue("branch_id", id); }}
                                                    />

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

                                        <FormField
                                            control={form.control}
                                            name="department_id"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Employees</FormLabel>
                                                    <Select
                                                        onValueChange={(value) => field.onChange(parseInt(value))}
                                                        value={field.value !== null ? field.value.toString() : ""}
                                                        disabled={!selectedBranchId || departments.length === 0}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select Employees" />
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

                                        <FormField
                                            control={form.control}
                                            name="department_id"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Shift</FormLabel>
                                                    <Select
                                                        onValueChange={(value) => field.onChange(parseInt(value))}
                                                        value={field.value !== null ? field.value.toString() : ""}
                                                        disabled={!selectedBranchId || departments.length === 0}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select Shift" />
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

                                        <FormField
                                            control={form.control}
                                            name="from_date"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>From Date</FormLabel>
                                                    <FormControl>
                                                        <DatePicker
                                                            value={field.value}
                                                            onChange={(date) => field.onChange(date)}
                                                            placeholder="From Date"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="to_date"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>To Date</FormLabel>
                                                    <FormControl>
                                                        <DatePicker
                                                            value={field.value}
                                                            onChange={(date) => field.onChange(date)}
                                                            placeholder="To Date"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="flex items-center space-x-3">
                                            <Switch id="auto-shift" />
                                            <Label
                                                htmlFor="auto-shift"
                                                className="text-sm font-medium text-text-light dark:text-text-dark"
                                            >
                                                Over Time
                                            </Label>
                                        </div>
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
    );
};

export default EmployeeScheduleEdit;
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SuccessDialog } from "@/components/SuccessDialog";
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";


import { Calendar } from "@/components/ui/calendar"
import { useRouter } from "next/navigation";
import { CalendarIcon, IdCard, Plane } from "lucide-react";
import { updateEmirate } from "@/lib/api";
import { format } from "date-fns";

const Emirate = ({ employee_id, emirate }) => {

    console.log("🚀 ~ emirate ~ employee_id, emirate:", employee_id, emirate)
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [globalError, setGlobalError] = useState(null);

    const [isIssueDatePickerOpen, setIsIssueDatePickerOpen] = useState(false);
    const [isExpiryDatePickerOpen, setIsExpiryDatePickerOpen] = useState(false);
    const [isDOBDatePickerOpen, setIsDOBDatePickerOpen] = useState(false);

    const form = useForm({
        defaultValues: {
            emirate_id: emirate?.emirate_id || "",
            nationality: emirate?.nationality || "",
            issue: emirate?.issue || "",
            expiry: emirate?.expiry || "",
            date_of_birth: emirate?.date_of_birth || "",
        },
    });

    const { handleSubmit, formState } = form;
    const { isSubmitting } = formState;

    const handleCancel = () => router.push(`/employees`);

    const onSubmit = async (data) => {


        setGlobalError(null);
        try {
            const finalPayload = {
                emirate_id: data?.emirate_id || "",
                nationality: data?.nationality || "",
                issue: data?.issue || "",
                expiry: data?.expiry || "",
                date_of_birth: data?.date_of_birth || "",

                employee_id: employee_id || "",

            };

            await updateEmirate(finalPayload);

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
        <div className="bg-white dark:bg-gray-800 py-8">
           <div className="">
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                                <IdCard className="mr-3 h-6 w-6 text-primary" />
                                Emirate Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <FormField
                                    control={form.control}
                                    name="emirate_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Emirates Id</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Emirates Id" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="nationality"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nationality</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Nationality" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="issue"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Issue Date</FormLabel>
                                            <Popover open={isIssueDatePickerOpen} onOpenChange={setIsIssueDatePickerOpen}>
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
                                                            setIsIssueDatePickerOpen(false) // ✅ closes after selection
                                                        }}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="expiry"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Expiry Date</FormLabel>
                                            <Popover open={isExpiryDatePickerOpen} onOpenChange={setIsExpiryDatePickerOpen}>
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
                                                            setIsExpiryDatePickerOpen(false) // ✅ closes after selection
                                                        }}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                 <FormField
                                    control={form.control}
                                    name="date_of_birth"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Date of Birth</FormLabel>
                                            <Popover open={isDOBDatePickerOpen} onOpenChange={setIsDOBDatePickerOpen}>
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
                                                            setIsDOBDatePickerOpen(false) // ✅ closes after selection
                                                        }}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>

                            {globalError && (
                                <div
                                    className="mb-4 p-3 border border-red-500 bg-red-50 text-red-700 rounded-lg"
                                    role="alert"
                                >
                                    {globalError}
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex justify-end space-x-4 pt-4">
                                <Button type="button" variant="secondary" onClick={handleCancel}>
                                    CANCEL
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-primary hover:bg-indigo-700"
                                    disabled={isSubmitting} a
                                >
                                    {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                                </Button>
                            </div>
                        </form>
                    </Form>

                    <SuccessDialog
                        open={open}
                        onOpenChange={setOpen}
                        title="Contact Saved"
                        description="Contact details have been saved successfully."
                    />
                </div>

        </div>
    );
};

export default Emirate;

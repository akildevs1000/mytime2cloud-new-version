"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { useRouter } from "next/navigation";

// shadcn/ui
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { storePayroll } from "@/lib/api";
import DatePicker from "@/components/ui/DatePicker";
import { SuccessDialog } from "@/components/SuccessDialog";
import { parseApiError } from "@/lib/utils";


export default function Payroll({ employee_id, payroll }) {

    const router = useRouter();

    const form = useForm({
        defaultValues: {
            effective_date: payroll?.effective_date || null,  // Date or string okay
            basic_salary: payroll?.basic_salary ?? "",
            // Corrected line: Use optional chaining on payroll and payroll.earnings,
            // then provide an empty array as a fallback if payroll.earnings is null/undefined.
            earnings: payroll?.earnings?.map((e) => ({
                label: e.label ?? "",
                value: e.value ?? "",
            })) ?? [], // Use an empty array if payroll.earnings is null or undefined
        },
    });

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        setError,
        reset,
        formState: { isSubmitting },
    } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "earnings",
    });

    const [open, setOpen] = useState(false);
    const [editForm, setEditForm] = useState(true);
    const [loading, setLoading] = useState(false);
    const [globalError, setGlobalError] = useState("");

    useEffect(() => {
        const initialEarnings = payroll?.earnings?.map((e) => ({
            label: e.label ?? "",
            value: e.value ?? "",
        })) ?? [];

        reset({
            effective_date: payroll?.effective_date || null,
            basic_salary: payroll?.basic_salary ?? "",
            earnings: initialEarnings, // Use the prepared initial data
        });

        if (initialEarnings.length == 0) {
            append({ label: "Add Item", value: 100 });
        }

    }, [reset, payroll, append]);

    // Compute net salary like your Vue computed
    const net_salary = useMemo(() => {
        const basic = parseFloat(watch("basic_salary")) || 0;
        const earnings = watch("earnings") || [];
        const sum = earnings.reduce((acc, it) => acc + (parseFloat(it.value) || 0), 0);
        return basic + sum;
    }, [watch("basic_salary"), watch("earnings")]);

    const handleCancel = () => router.push(`/employees`);

    const onSubmit = async (values) => {
        setGlobalError("");
        setLoading(true);
        try {
            const payload = {
                ...values,
                effective_date: values.effective_date,
                employee_id: employee_id,
                net_salary,
            };

            await storePayroll(payload);

            setOpen(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
            setOpen(false);

            router.push(`/employees`);

        } catch (error) {
            setGlobalError(parseApiError(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col rounded-lg py-4">
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Effective Date + Basic Salary */}
                    <div className="overflow-hidden rounded-lg">
                        <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2">
                            {/* Effective Date */}
                            <FormField
                                control={control}
                                name="effective_date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Effective Date</FormLabel>
                                        <DatePicker
                                            value={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            placeholder="Pick a date"
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Basic Salary */}
                            <FormField
                                control={control}
                                name="basic_salary"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Basic Salary</FormLabel>
                                        <FormControl>
                                            {editForm ? (
                                                <Input
                                                    type="number"
                                                    placeholder="Enter Basic Salary"
                                                    {...field}
                                                />
                                            ) : (
                                                <div className="rounded-md border bg-background px-3 py-2 text-sm">
                                                    {field.value}
                                                </div>
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Earnings Table */}
                    <div className="overflow-hidden rounded-lg border mx-4">
                        <div className="flex items-center justify-between bg-gray-50 px-3">
                            <h4 className="text-sm font-medium">Particulars</h4>
                            <Button
                                type="button"
                                variant="ghost"
                                disabled={!editForm}
                                onClick={() => append({ label: "Add Item", value: 100 })}
                                className="inline-flex disabled:opacity-50"
                            >
                                <span className="material-icons text-sm text-primary">add_circle</span>
                            </Button>
                        </div>

                        <div className="divide-y">
                            {fields.map((item, index) => (
                                <div className="flex flex-col md:flex-row md:items-end gap-3 p-3">
                                    {/* Label */}
                                    <div className="flex-1">
                                        <FormField
                                            control={control}
                                            name={`earnings.${index}.label`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs">Label</FormLabel>
                                                    <FormControl>
                                                        {editForm ? (
                                                            <Input placeholder="Label" {...field} />
                                                        ) : (
                                                            <div className="rounded-md border bg-background px-3 py-2 text-sm">
                                                                {field.value}
                                                            </div>
                                                        )}
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Value */}
                                    <div className="flex-1 md:w-1/3">
                                        <FormField
                                            control={control}
                                            name={`earnings.${index}.value`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs">Value</FormLabel>
                                                    <FormControl>
                                                        {editForm ? (
                                                            <Input type="number" placeholder="0" {...field} />
                                                        ) : (
                                                            <div className="rounded-md border bg-background px-3 py-2 text-sm">
                                                                {field.value}
                                                            </div>
                                                        )}
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Remove */}
                                    <div className="flex items-end justify-end">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            className="text-red-600 hover:bg-red-50"
                                            disabled={!editForm}
                                            onClick={() => remove(index)}
                                            title="Remove"
                                        >
                                            <span className="material-icons text-sm">close</span>
                                        </Button>
                                    </div>
                                </div>

                            ))}

                            {/* Net Salary Row */}
                            <div className="flex items-center justify-between bg-gray-50 p-3">
                                <div className="text-sm font-medium">Net Salary</div>
                                <div className="text-sm">{net_salary}</div>
                            </div>
                        </div>
                    </div>

                    {/* Global error */}
                    {globalError ? (
                        <div
                            className="rounded-lg border border-red-500 bg-red-50 p-3 text-red-700"
                            role="alert"
                        >
                            {globalError}
                        </div>
                    ) : null}

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="secondary"
                            disabled={!editForm}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-primary hover:bg-indigo-700"
                            disabled={!editForm || isSubmitting || loading}
                        >
                            {isSubmitting || loading ? "Submit..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </Form>

            <SuccessDialog
                open={open}
                onOpenChange={setOpen}
                title="Payroll Info Saved"
                description="Payroll Info details have been saved successfully."
            />
        </div>
    );
}

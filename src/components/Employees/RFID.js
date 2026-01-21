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
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { updateAccessSettings } from "@/lib/api";
import { parseApiError } from "@/lib/utils";

const RFID = ({ employee_id, rfid_card_number = "", rfid_card_password = "" }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [globalError, setGlobalError] = useState(null);

    const form = useForm({
        defaultValues: {
            rfid_card_number: rfid_card_number || "",
            rfid_card_password: rfid_card_password || "",
        },
    });

    const { handleSubmit, formState } = form;
    const { isSubmitting } = formState;

    const handleCancel = () => router.push(`/employees`);

    const onSubmit = async (data) => {
        console.log("🚀 ~ onSubmit ~ data:", data)
        setGlobalError(null);
        try {
            const finalPayload = {
                rfid_card_number: data.rfid_card_number,
                rfid_card_password: data.rfid_card_password,

                employee_id: employee_id || "",
            };

            await updateAccessSettings(finalPayload);

            setOpen(true);

            await new Promise(resolve => setTimeout(resolve, 2000));

            setOpen(false);

            router.push(`/employees`);
        } catch (error) {
            setGlobalError(parseApiError(error));
        }
    };

    return <><section
        className="glass-card bg-card-light dark:bg-card-dark border border-white/50 dark:border-slate-700/50 rounded-2xl p-6 md:p-8 scroll-mt-28"
        id="hardware"
    >
        <div
            className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-slate-700 pb-4"
        >
            <span
                className="material-icons text-primary bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg"
            >badge</span
            >
            <h3
                className="text-xl font-semibold text-slate-800 dark:text-slate-100"
            >
                Hardware Access
            </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
                <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >RFID Card Number</label
                >
                <div className="relative rounded-md shadow-sm">
                    <div
                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                        <span className="material-icons text-slate-400 text-lg"
                        >nfc</span
                        >
                    </div>
                    <input
                        className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-slate-300 dark:border-slate-600 rounded-lg bg-white/50 dark:bg-slate-800/50 py-2.5 text-slate-900 dark:text-white tracking-widest"
                        placeholder="XXXX-XXXX-XXXX"
                        type="text"
                        value="8843-2219-0043"
                    />
                    <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        <span
                            className="material-icons text-green-500 text-lg cursor-help"
                            title="Active"
                        >check_circle</span
                        >
                    </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    Linked to physical access badge #B-102
                </p>
            </div>
            <div className="space-y-3">
                <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >Door Access PIN</label
                >
                <div className="relative rounded-md shadow-sm">
                    <div
                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                        <span className="material-icons text-slate-400 text-lg"
                        >dialpad</span
                        >
                    </div>
                    <input
                        className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-slate-300 dark:border-slate-600 rounded-lg bg-white/50 dark:bg-slate-800/50 py-2.5 text-slate-900 dark:text-white tracking-widest"
                        placeholder="****"
                        type="password"
                        value="1234"
                    />
                    <button
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        type="button"
                    >
                        <span className="material-icons text-lg">visibility_off</span>
                    </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    Used for keypad entry at main entrances.
                </p>
            </div>
        </div>
    </section></>;

    return (
        <div className="bg-white dark:bg-gray-800 py-8">
            <div className="">
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                            <Lock className="mr-3 h-6 w-6 text-primary" />
                            RFID Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Phone Relative Number */}
                            <FormField
                                control={form.control}
                                name="rfid_card_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>RFID</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter RFID" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Relation */}
                            <FormField
                                control={form.control}
                                name="rfid_card_password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>PIN</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter PIN" {...field} />
                                        </FormControl>
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
                    title="Settings Saved"
                    description="Settings details have been saved successfully."
                />
            </div>
        </div>
    );
};

export default RFID;

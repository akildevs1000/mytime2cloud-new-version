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
import { LogIn } from "lucide-react";
import { updateLogin } from "@/lib/api";
import { parseApiError } from "@/lib/utils";

const Login = ({ employee_id, user }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [globalError, setGlobalError] = useState(null);

    const form = useForm({
        defaultValues: {
            email: user?.email || "",
            password: user?.password || "",
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
                email: data.email,
                password: data.password,

                employee_id: employee_id || "",
            };

            await updateLogin(finalPayload);

            setOpen(true);

            await new Promise(resolve => setTimeout(resolve, 2000));

            setOpen(false);

            router.push(`/employees`);
        } catch (error) {
            setGlobalError(parseApiError(error));
        }
    };

    return <>
        <section
            className="glass-card bg-card-light dark:bg-card-dark border border-white/50 dark:border-slate-700/50 rounded-2xl p-6 md:p-8 relative overflow-hidden scroll-mt-28"
            id="security"
        >
            <div
                className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none"
            >
                <span className="material-icons text-8xl text-slate-400">lock</span>
            </div>
            <div
                className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-slate-700 pb-4"
            >
                <span
                    className="material-icons text-primary bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg"
                >security</span
                >
                <h3
                    className="text-xl font-semibold text-slate-800 dark:text-slate-100"
                >
                    Security &amp; Credentials
                </h3>
            </div>
            <div className="space-y-6 max-w-2xl">
                <div className="space-y-2">
                    <label
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >Account Email</label
                    >
                    <div className="flex rounded-md shadow-sm">
                        <span
                            className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 sm:text-sm"
                        >
                            <span className="material-icons text-sm">email</span>
                        </span>
                        <input
                            className="flex-1 min-w-0 block w-full px-3 py-2.5 rounded-none rounded-r-md border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 sm:text-sm focus:ring-0 focus:border-slate-300"
                            readonly=""
                            type="email"
                            value="alex.morris@enterprise.com"
                        />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                        Contact admin to change primary email address.
                    </p>
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <h4
                        className="text-md font-medium text-slate-900 dark:text-white mb-4"
                    >
                        Update Password
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label
                                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                            >New Password</label
                            >
                            <input
                                className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5"
                                placeholder="••••••••"
                                type="password"
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                            >Confirm Password</label
                            >
                            <input
                                className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5"
                                placeholder="••••••••"
                                type="password"
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center space-x-2">
                        <div className="h-1.5 w-16 bg-red-400 rounded-full"></div>
                        <div
                            className="h-1.5 w-16 bg-slate-200 dark:bg-slate-700 rounded-full"
                        ></div>
                        <div
                            className="h-1.5 w-16 bg-slate-200 dark:bg-slate-700 rounded-full"
                        ></div>
                        <span className="text-xs text-red-500 font-medium ml-2"
                        >Weak</span
                        >
                    </div>
                </div>
            </div>
        </section>
    </>;

    return (
        <div className="bg-white dark:bg-gray-800 py-8">
            <div className="">
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <h2 className="text-xl font-semibold mb-6 flex items-center">
                            <LogIn className="mr-3 h-6 w-6 text-primary" />
                            Login
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Phone Relative Number */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Relation */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Password" {...field} />
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

export default Login;

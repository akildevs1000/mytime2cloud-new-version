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
import {  parseApiError, updateLogin } from "@/lib/api";

const Login = ({ employee_id, user}) => {
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

    return (
        <div className="bg-white dark:bg-gray-800 py-8">
            <div className="">
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
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

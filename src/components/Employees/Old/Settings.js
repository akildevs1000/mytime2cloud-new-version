"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SuccessDialog } from "@/components/SuccessDialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Settings2 } from "lucide-react";
import { updateSettings, getLeaveManagers, getLeaveGroups } from "@/lib/api";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { parseApiError } from "@/lib/utils";

const Settings = ({ employee_id, leave_group_id, reporting_manager_id, status, web_login_access, mobile_app_login_access, tracking_status, user_id }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [globalError, setGlobalError] = useState(null);
    const [leaveGroups, setLeaveGroups] = useState([]);
    const [leaveManagers, setLeaveManagers] = useState([]);

    const form = useForm({
        defaultValues: {
            leave_group_id: leave_group_id || "",
            reporting_manager_id: reporting_manager_id || "",
            status: status || "",

            web_login_access: web_login_access || "",
            mobile_app_login_access: mobile_app_login_access || "",
            tracking_status: tracking_status || "",
            user_id: user_id || "",
        },
    });

    const { handleSubmit, formState } = form;
    const { isSubmitting } = formState;

    const handleCancel = () => router.push(`/employees`);

    useEffect(() => {
        const fetchLeaveManagers = async () => {
            try {
                setLeaveManagers(await getLeaveManagers());
            } catch (error) {
                setLeaveManagers([]);
            }
        };
        fetchLeaveManagers();
    }, []);

    useEffect(() => {
        const fetchLeaveGroups = async () => {
            try {
                setLeaveGroups(await getLeaveGroups());
            } catch (error) {
                setLeaveGroups([]);
            }
        };
        fetchLeaveGroups();
    }, []);

    const onSubmit = async (data) => {
        console.log("🚀 ~ onSubmit ~ data:", data)
        setGlobalError(null);
        try {
            const finalPayload = {

                leave_group_id: data.leave_group_id,
                reporting_manager_id: data.reporting_manager_id,
                status: data.status,

                employee_id: employee_id || "",

                web_login_access: data.web_login_access || "",
                mobile_app_login_access: data.mobile_app_login_access || "",
                tracking_status: data.tracking_status || "",
                user_id: data.user_id || "",
            };

            await updateSettings(finalPayload);

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
                            <Settings2 className="mr-3 h-6 w-6 text-primary" />
                            Settings
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="reporting_manager_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Leave Manager / Reporting Manager</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className={'w-full'}>
                                                    <SelectValue placeholder="" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {leaveManagers.map((group) => (
                                                    <SelectItem key={group.id} value={String(group.id)}>
                                                        {group.first_name}
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
                                name="leave_group_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Leave Group</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className={'w-full'}>
                                                    <SelectValue placeholder="" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {leaveManagers.map((group) => (
                                                    <SelectItem key={group.id} value={String(group.id)}>
                                                        {group.first_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Employee Status</FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value === 1}
                                                onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="web_login_access"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Web Login Access</FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value === 1}
                                                onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="mobile_app_login_access"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mobile Login Access</FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value === 1}
                                                onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="tracking_status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tracking Status</FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value === 1}
                                                onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                                            />
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

export default Settings;

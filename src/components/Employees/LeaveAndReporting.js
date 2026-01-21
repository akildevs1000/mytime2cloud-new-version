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

const LeaveAndReporting = ({ employee_id, leave_group_id, reporting_manager_id, status, web_login_access, mobile_app_login_access, tracking_status, user_id }) => {
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
                employee_id: employee_id || "",
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
        <section
            className="glass-card bg-card-light dark:bg-card-dark border border-white/50 dark:border-slate-700/50 rounded-2xl p-6 md:p-8 scroll-mt-28"
            id="general"
        >
            <div
                className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-slate-700 pb-4"
            >
                <span
                    className="material-icons text-primary bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg"
                >tune</span
                >
                <h3
                    className="text-xl font-semibold text-slate-800 dark:text-slate-100"
                >
                    Leave & Reporting
                </h3>
            </div>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label
                            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                        >Leave Group</label
                        >
                        <div className="relative">
                            <select
                                className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5"
                            >
                                <option>Engineering - Team Alpha</option>
                                <option>Design - Creative Unit</option>
                                <option>Marketing - Growth</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label
                            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                        >Reporting Manager</label
                        >
                        <div className="relative">
                            <select
                                className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5"
                            >
                                <option>Sarah Connor</option>
                                <option>John Doe</option>
                                <option>Jane Smith</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
        ;
};

export default LeaveAndReporting;

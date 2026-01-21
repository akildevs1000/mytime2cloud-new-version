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

    return <section
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
                General Preferences
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
            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 pt-4"
            >
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span
                            className="text-sm font-medium text-slate-900 dark:text-white"
                        >Employee Status</span
                        >
                        <span className="text-xs text-slate-500 dark:text-slate-400"
                        >Active account status</span
                        >
                    </div>
                    <div
                        className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in"
                    >
                        <input
                            checked=""
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:border-secondary transition-all duration-300 ease-in-out left-0"
                            id="toggle1"
                            name="toggle"
                            type="checkbox"
                        />
                        <label
                            className="toggle-label block overflow-hidden h-6 rounded-full bg-secondary cursor-pointer"
                            for="toggle1"
                        ></label>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span
                            className="text-sm font-medium text-slate-900 dark:text-white"
                        >Web Login Access</span
                        >
                        <span className="text-xs text-slate-500 dark:text-slate-400"
                        >Allow browser dashboard access</span
                        >
                    </div>
                    <div
                        className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in"
                    >
                        <input
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:border-secondary transition-all duration-300 ease-in-out left-0"
                            id="toggle2"
                            name="toggle"
                            type="checkbox"
                        />
                        <label
                            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-slate-600 cursor-pointer"
                            for="toggle2"
                        ></label>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span
                            className="text-sm font-medium text-slate-900 dark:text-white"
                        >Mobile App Login Access</span
                        >
                        <span className="text-xs text-slate-500 dark:text-slate-400"
                        >Allow iOS/Android app access</span
                        >
                    </div>
                    <div
                        className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in"
                    >
                        <input
                            checked=""
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:border-secondary transition-all duration-300 ease-in-out left-0"
                            id="toggle3"
                            name="toggle"
                            type="checkbox"
                        />
                        <label
                            className="toggle-label block overflow-hidden h-6 rounded-full bg-secondary cursor-pointer"
                            for="toggle3"
                        ></label>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span
                            className="text-sm font-medium text-slate-900 dark:text-white"
                        >Overtime Calculation</span
                        >
                        <span className="text-xs text-slate-500 dark:text-slate-400"
                        >Include extra hours in payroll</span
                        >
                    </div>
                    <div
                        className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in"
                    >
                        <input
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:border-secondary transition-all duration-300 ease-in-out left-0"
                            id="toggle4"
                            name="toggle"
                            type="checkbox"
                        />
                        <label
                            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-slate-600 cursor-pointer"
                            for="toggle4"
                        ></label>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span
                            className="text-sm font-medium text-slate-900 dark:text-white"
                        >WhatsApp OTP</span
                        >
                        <span className="text-xs text-slate-500 dark:text-slate-400"
                        >Send login codes via WhatsApp</span
                        >
                    </div>
                    <div
                        className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in"
                    >
                        <input
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:border-secondary transition-all duration-300 ease-in-out left-0"
                            id="toggle5"
                            name="toggle"
                            type="checkbox"
                        />
                        <label
                            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-slate-600 cursor-pointer"
                            for="toggle5"
                        ></label>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span
                            className="text-sm font-medium text-slate-900 dark:text-white"
                        >Location Tracking</span
                        >
                        <span className="text-xs text-slate-500 dark:text-slate-400"
                        >GPS tracking for mobile punch-in</span
                        >
                    </div>
                    <div
                        className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in"
                    >
                        <input
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:border-secondary transition-all duration-300 ease-in-out left-0"
                            id="toggle6"
                            name="toggle"
                            type="checkbox"
                        />
                        <label
                            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-slate-600 cursor-pointer"
                            for="toggle6"
                        ></label>
                    </div>
                </div>
            </div>
        </div>
    </section>;
};

export default Settings;

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
        <>
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
            </section></>);

    return (
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
            <aside className="hidden lg:block lg:col-span-3 sticky top-28">
                <div
                    className="glass-card bg-card-light dark:bg-card-dark border border-white/50 dark:border-slate-700/50 rounded-2xl p-4 shadow-sm"
                >
                    <h3
                        className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2"
                    >
                        Quick Navigation
                    </h3>
                    <nav className="space-y-1">
                        <a
                            className="group flex items-center px-4 py-3 text-sm font-medium bg-indigo-50 dark:bg-indigo-900/20 text-primary border-l-4 border-primary rounded-r-md transition-all"
                            href="#general"
                        >
                            <span className="material-icons text-lg mr-3">tune</span>
                            General Preferences
                        </a>
                        <a
                            className="group flex items-center px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border-l-4 border-transparent hover:border-slate-300 dark:hover:border-slate-600 rounded-r-md transition-all"
                            href="#security"
                        >
                            <span className="material-icons text-lg mr-3">security</span>
                            Security &amp; Credentials
                        </a>
                        <a
                            className="group flex items-center px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border-l-4 border-transparent hover:border-slate-300 dark:hover:border-slate-600 rounded-r-md transition-all"
                            href="#hardware"
                        >
                            <span className="material-icons text-lg mr-3">badge</span>
                            Hardware Access
                        </a>
                    </nav>
                </div>
            </aside>
            <div className="lg:col-span-9 space-y-8">
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
                </section>
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
                <section
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
                </section>
            </div>
        </div>
    );
};

export default Settings;

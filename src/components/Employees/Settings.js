"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SuccessDialog } from "@/components/SuccessDialog";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { Settings2 } from "lucide-react";
import { updateSettings, getLeaveManagers, getLeaveGroups } from "@/lib/api";
import { parseApiError } from "@/lib/utils";

const Settings = ({ employee_id, status, web_login_access, mobile_app_login_access, tracking_status, user_id }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [globalError, setGlobalError] = useState(null);

    const [employeeStatus, setEmployeeStatus] = useState(true);
    const [webAccess, setWebAccess] = useState(false);
    const [mobileAccess, setMobileAccess] = useState(true);
    const [overtime, setOvertime] = useState(false);
    const [whatsapp, setWhatsapp] = useState(false);
    const [location, setLocation] = useState(false);

    // Common classes to keep the code cleaner
    const toggleTrackClass = "block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300";
    const toggleKnobClass = "absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300 ease-in-out left-0 z-10";

    const form = useForm({
        defaultValues: {
            status: status || "",
            web_login_access: web_login_access || "",
            mobile_app_login_access: mobile_app_login_access || "",
            tracking_status: tracking_status || "",
            user_id: user_id || "",
        },
    });

    const { handleSubmit, formState } = form;
    const { isSubmitting } = formState;



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

    return <>
        <div className="">
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

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 pt-4"
                    >
                        {/* 1. Employee Status */}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">Employee Status</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">Active account status</span>
                            </div>
                            <div className="relative inline-block w-12 mr-2 align-middle select-none">
                                <input
                                    type="checkbox"
                                    id="toggle1"
                                    checked={employeeStatus}
                                    onChange={() => setEmployeeStatus(!employeeStatus)}
                                    className={`${toggleKnobClass} ${employeeStatus ? 'translate-x-6 border-blue-600' : 'border-gray-300'}`}
                                />
                                <label
                                    htmlFor="toggle1"
                                    className={`${toggleTrackClass} ${employeeStatus ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-600'}`}
                                />
                            </div>
                        </div>

                        {/* 2. Web Login Access */}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">Web Login Access</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">Allow browser dashboard access</span>
                            </div>
                            <div className="relative inline-block w-12 mr-2 align-middle select-none">
                                <input
                                    type="checkbox"
                                    id="toggle2"
                                    checked={webAccess}
                                    onChange={() => setWebAccess(!webAccess)}
                                    className={`${toggleKnobClass} ${webAccess ? 'translate-x-6 border-blue-600' : 'border-gray-300'}`}
                                />
                                <label
                                    htmlFor="toggle2"
                                    className={`${toggleTrackClass} ${webAccess ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-600'}`}
                                />
                            </div>
                        </div>

                        {/* 3. Mobile App Login Access */}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">Mobile App Login Access</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">Allow iOS/Android app access</span>
                            </div>
                            <div className="relative inline-block w-12 mr-2 align-middle select-none">
                                <input
                                    type="checkbox"
                                    id="toggle3"
                                    checked={mobileAccess}
                                    onChange={() => setMobileAccess(!mobileAccess)}
                                    className={`${toggleKnobClass} ${mobileAccess ? 'translate-x-6 border-blue-600' : 'border-gray-300'}`}
                                />
                                <label
                                    htmlFor="toggle3"
                                    className={`${toggleTrackClass} ${mobileAccess ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-600'}`}
                                />
                            </div>
                        </div>

                        {/* 4. Overtime Calculation */}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">Overtime Calculation</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">Include extra hours in payroll</span>
                            </div>
                            <div className="relative inline-block w-12 mr-2 align-middle select-none">
                                <input
                                    type="checkbox"
                                    id="toggle4"
                                    checked={overtime}
                                    onChange={() => setOvertime(!overtime)}
                                    className={`${toggleKnobClass} ${overtime ? 'translate-x-6 border-blue-600' : 'border-gray-300'}`}
                                />
                                <label
                                    htmlFor="toggle4"
                                    className={`${toggleTrackClass} ${overtime ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-600'}`}
                                />
                            </div>
                        </div>

                        {/* 5. WhatsApp OTP */}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">WhatsApp OTP</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">Send login codes via WhatsApp</span>
                            </div>
                            <div className="relative inline-block w-12 mr-2 align-middle select-none">
                                <input
                                    type="checkbox"
                                    id="toggle5"
                                    checked={whatsapp}
                                    onChange={() => setWhatsapp(!whatsapp)}
                                    className={`${toggleKnobClass} ${whatsapp ? 'translate-x-6 border-blue-600' : 'border-gray-300'}`}
                                />
                                <label
                                    htmlFor="toggle5"
                                    className={`${toggleTrackClass} ${whatsapp ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-600'}`}
                                />
                            </div>
                        </div>

                        {/* 6. Location Tracking */}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">Location Tracking</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">GPS tracking for mobile punch-in</span>
                            </div>
                            <div className="relative inline-block w-12 mr-2 align-middle select-none">
                                <input
                                    type="checkbox"
                                    id="toggle6"
                                    checked={location}
                                    onChange={() => setLocation(!location)}
                                    className={`${toggleKnobClass} ${location ? 'translate-x-6 border-blue-600' : 'border-gray-300'}`}
                                />
                                <label
                                    htmlFor="toggle6"
                                    className={`${toggleTrackClass} ${location ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-600'}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>;
};

export default Settings;

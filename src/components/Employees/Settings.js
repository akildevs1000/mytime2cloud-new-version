"use client";

import React, { useEffect, useRef, useState } from "react";
import { updateGeneralSettings } from "@/lib/api";
import { notify, parseApiError } from "@/lib/utils";

const Settings = ({ id, status, web_login_access, mobile_app_login_access, tracking_status }) => {
    // 1. Refs for Lifecycle Management
    const isInitialMount = useRef(true);
    const isUpdating = useRef(false);

    // 2. Local State
    const [employeeStatus, setEmployeeStatus] = useState(status);
    const [webAccess, setWebAccess] = useState(web_login_access);
    const [mobileAccess, setMobileAccess] = useState(mobile_app_login_access);
    const [location, setLocation] = useState(tracking_status);

    // Styling Classes
    const toggleTrackClass = "block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300";
    const toggleKnobClass = "absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300 ease-in-out left-0 z-10";

    // 3. Effect for Auto-Saving
    useEffect(() => {
        if (!id) return;

        // Prevent API call on the very first page load
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const onSubmit = async () => {
            // Guard against concurrent overlapping requests
            if (isUpdating.current) return;

            try {
                const payload = {};

                // CRITICAL: Compare current state vs. initial props to build the delta
                if (employeeStatus !== status) payload.status = employeeStatus;
                if (webAccess !== web_login_access) payload.web_login_access = webAccess;
                if (mobileAccess !== mobile_app_login_access) payload.mobile_app_login_access = mobileAccess;
                if (location !== tracking_status) payload.tracking_status = location;

                // If no fields actually changed, don't ping the server
                if (Object.keys(payload).length === 0) return;

                isUpdating.current = true;
                
                await updateGeneralSettings(payload, id);
                notify(`Success`, "Settings updated successfully", 'success');
            } catch (error) {
                notify(`Error`, parseApiError(error), 'error');
            } finally {
                isUpdating.current = false;
            }
        };

        // Debounce: Wait 400ms after the last click before saving
        // This allows the user to toggle multiple items and send them in one request
        const delayDebounce = setTimeout(() => {
            onSubmit();
        }, 400);

        return () => clearTimeout(delayDebounce);

    }, [employeeStatus, webAccess, mobileAccess, location, id]);

    return (
        <div className="w-full">
            <section
                className="glass-card bg-card-light dark:bg-card-dark border border-white/50 dark:border-slate-700/50 rounded-2xl p-6 md:p-8 scroll-mt-28"
                id="general"
            >
                <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
                    <span className="material-icons text-primary bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg">
                        tune
                    </span>
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                        General Preferences
                    </h3>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 pt-4">
                        
                        {/* 1. Employee Status */}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">Employee Status</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">Active account status</span>
                            </div>
                            <div className="relative inline-block w-12 mr-2 align-middle select-none">
                                <input
                                    type="checkbox"
                                    id="toggle-status"
                                    checked={employeeStatus}
                                    onChange={() => setEmployeeStatus(prev => !prev)}
                                    className={`${toggleKnobClass} ${employeeStatus ? 'translate-x-6 border-blue-600' : 'border-gray-300'}`}
                                />
                                <label
                                    htmlFor="toggle-status"
                                    className={`${toggleTrackClass} ${employeeStatus ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-600'}`}
                                />
                            </div>
                        </div>

                        {/* 2. Location Tracking */}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">Location Tracking</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">GPS tracking for mobile punch-in</span>
                            </div>
                            <div className="relative inline-block w-12 mr-2 align-middle select-none">
                                <input
                                    type="checkbox"
                                    id="toggle-location"
                                    checked={location}
                                    onChange={() => setLocation(prev => !prev)}
                                    className={`${toggleKnobClass} ${location ? 'translate-x-6 border-blue-600' : 'border-gray-300'}`}
                                />
                                <label
                                    htmlFor="toggle-location"
                                    className={`${toggleTrackClass} ${location ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-600'}`}
                                />
                            </div>
                        </div>

                        {/* 3. Web Login Access */}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">Web Login Access</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">Allow browser dashboard access</span>
                            </div>
                            <div className="relative inline-block w-12 mr-2 align-middle select-none">
                                <input
                                    type="checkbox"
                                    id="toggle-web"
                                    checked={webAccess}
                                    onChange={() => setWebAccess(prev => !prev)}
                                    className={`${toggleKnobClass} ${webAccess ? 'translate-x-6 border-blue-600' : 'border-gray-300'}`}
                                />
                                <label
                                    htmlFor="toggle-web"
                                    className={`${toggleTrackClass} ${webAccess ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-600'}`}
                                />
                            </div>
                        </div>

                        {/* 4. Mobile App Login Access */}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">Mobile App Login Access</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">Allow iOS/Android app access</span>
                            </div>
                            <div className="relative inline-block w-12 mr-2 align-middle select-none">
                                <input
                                    type="checkbox"
                                    id="toggle-mobile"
                                    checked={mobileAccess}
                                    onChange={() => setMobileAccess(prev => !prev)}
                                    className={`${toggleKnobClass} ${mobileAccess ? 'translate-x-6 border-blue-600' : 'border-gray-300'}`}
                                />
                                <label
                                    htmlFor="toggle-mobile"
                                    className={`${toggleTrackClass} ${mobileAccess ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-600'}`}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Settings;
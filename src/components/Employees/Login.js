"use client";

import React, { useState, useEffect, useRef } from "react";
import { updateLogin } from "@/lib/api";
import { notify, getStrength, parseApiError } from "@/lib/utils";
import Input from "../Theme/Input";

const Login = ({ employee_id, email }) => {
    
    const [isInputChanged, setInputChanged] = useState(false);

    const [form, setForm] = useState({
        email: email || "",
        password: "",
        password_confirmation: "",
    });


    // 2. Update state when user actually types
    const handleEmailChange = (e) => {
        setForm((prev) => ({ ...prev, email: e.target.value || "" }))
        setInputChanged(true);
    };

    const handlePasswordChange = (e) => {
        setForm((prev) => ({ ...prev, password: e.target.value || ""  }))
        setInputChanged(true);
    };

    const handlePasswordConfirmationChange = (e) => {
        setForm((prev) => ({ ...prev, password_confirmation: e.target.value || "" }))
        setInputChanged(true);
    };

    // Derive strength for the UI
    const strength = getStrength(form.password);

    useEffect(() => {

        if (!isInputChanged || !employee_id) return;

        const autoSave = async () => {
            // Logic Guard: Don't save if password fields are being typed but don't match yet
            if (form.password && form.password !== form.password_confirmation) {
                return;
            }

            // Logic Guard: Don't save if password is too weak (optional, based on your needs)
            if (form.password && strength.score < 2) {
                return;
            }

            try {
                setInputChanged(true);
                const finalPayload = {
                    email: form.email,
                };

                // Only include password if it's fully validated and confirmed
                if (form.password && form.password === form.password_confirmation) {
                    finalPayload.password = form.password;
                }

                await updateLogin(finalPayload, employee_id);
                notify("Success", "Login details has been added", "success");
            } catch (error) {
                notify("Error", parseApiError(error), "error");

            } finally {
                setInputChanged(false);
            }
        };

        // Debounce: Wait 800ms (slightly longer for security fields)
        const timeout = setTimeout(() => {
            autoSave();
        }, 800);

        return () => clearTimeout(timeout);
    }, [form.email, form.password, form.password_confirmation, isInputChanged]);

    return (
        <section
            className="glass-card bg-card-light dark:bg-card-dark border border-white/50 dark:border-slate-700/50 rounded-2xl p-6 md:p-8 relative overflow-hidden scroll-mt-28"
            id="security"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <span className="material-icons text-8xl text-slate-400">lock</span>
            </div>

            <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
                <span className="material-icons text-primary bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg">security</span>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                    Security & Credentials
                </h3>
            </div>

            <div className="space-y-6 max-w-2xl">
                {/* Email Field */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Account Email</label>
                    <Input
                        type="email"
                        value={form.email}
                        onChange={handleEmailChange}
                        placeholder="email@company.com"
                    />
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="text-md font-medium text-slate-900 dark:text-white mb-4">Update Password</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">New Password</label>
                            <Input
                                placeholder="••••••••"
                                type="password"
                                value={form.password}
                                onChange={handlePasswordChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Confirm Password</label>
                            <Input
                                placeholder="••••••••"
                                type="password"
                                value={form.password_confirmation}
                                onChange={handlePasswordConfirmationChange}
                            />
                        </div>
                    </div>

                    {/* Password Strength and Validation Messaging */}
                    {form.password && (
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${strength.text}`}>
                                    Security: {strength.label}
                                </span>
                                {form.password !== form.password_confirmation && form.password_confirmation !== "" && (
                                    <span className="text-[10px] text-red-500 font-bold uppercase">Passwords don't match</span>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <div className={`h-1.5 w-16 rounded-full transition-all ${strength.score >= 1 ? 'bg-red-400' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                                <div className={`h-1.5 w-16 rounded-full transition-all ${strength.score >= 2 ? 'bg-orange-400' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                                <div className={`h-1.5 w-16 rounded-full transition-all ${strength.score >= 3 ? 'bg-green-400' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Login;
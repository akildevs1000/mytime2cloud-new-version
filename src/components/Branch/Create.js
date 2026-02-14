"use client";


import React, { useState } from 'react';

import { createBranch } from '@/lib/api';
import { notify, parseApiError } from '@/lib/utils';
import Input from '../Theme/Input';
import TextArea from '../Theme/TextArea';

let initialPayload = {
    branch_name: "",
    branch_code: "",
    address: "",
    user_id: 0,
};

export default function Create({ setOpen = () => { }, onSuccess = () => { } }) {

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(initialPayload);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let { data } = await createBranch(form);

            if (data?.status == false) {

                if (data.errors) {
                    const firstKey = Object.keys(data.errors)[0]; // get the first key
                    notify("Error", firstKey, "error");
                    return;
                } else {
                    notify("Error", data.message, "error");
                    return;
                }

            }

            await notify("Success", "Branch Created Successfully", "success");

            setForm(initialPayload);
            onSuccess();
        } catch (error) {
            notify("Error", parseApiError(error), "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {open && (
                <div
                    aria-modal="true"
                    role="dialog"
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                >
                    {/* Backdrop/Overlay */}
                    <div
                        className="absolute inset-0 bg-black/70 frosted-glass transition-opacity animate-in fade-in duration-300"
                    ></div>

                    {/* Modal Card */}
                    <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 w-full max-w-lg overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">

                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-gray-600 dark:text-gray-300">Add Department</h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Create a new department in the system
                                </p>
                            </div>
                            <button onClick={() => setOpen(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors rounded-full p-1"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Form Content */}
                        <form onSubmit={onSubmit}>
                            <div className="p-6 space-y-5 bg-white/50 dark:bg-gray-900">
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-slate-400">
                                        Branc Name <span className="text-red-400">*</span>
                                    </label>
                                    <Input
                                        value={form.branch_name}
                                        onChange={(e) => handleChange("branch_name", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-slate-400">
                                        Branch Code <span className="text-red-400">*</span>
                                    </label>
                                    <Input
                                        value={form.branch_code}
                                        onChange={(e) => handleChange("branch_code", e.target.value)}
                                    />
                                </div>



                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-slate-400">
                                        Branch Address
                                    </label>

                                    <TextArea
                                        placeholder="Brief description of the department..."
                                        rows={3}
                                        value={form.address}
                                        onChange={(e) => handleChange("address", e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="px-6 py-4 border-t border-gray-200 dark:border-white/10  flex justify-end gap-3">
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-blue-600 transition-all text-sm font-bold shadow-lg shadow-primary/20"
                                >
                                    {loading ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )


}

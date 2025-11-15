"use client";


import React, { useState } from 'react';

import { createBranch } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { parseApiError } from '@/lib/utils';

let initialPayload = {
    branch_name: "",
    branch_code: "",
    address: "",
    user_id: 0,
};

export default function Create({ onSuccess = () => { } }) {

    const [globalError, setGlobalError] = useState(null);

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState(initialPayload);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const onSubmit = async () => {
        setGlobalError(null);
        setLoading(true);
        try {
            let { data } = await createBranch(form);

            if (data?.status == false) {

                if (data.errors) {
                    const firstKey = Object.keys(data.errors)[0]; // get the first key
                    setGlobalError(firstKey);
                    return;
                } else {
                    setGlobalError(data.message);
                    return;
                }

            }
            setForm(initialPayload);
            onSuccess();
        } catch (error) {
            setGlobalError(parseApiError(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium mb-1">Name</label>
                    <Input
                        value={form.branch_name}
                        onChange={(e) => handleChange("branch_name", e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium mb-1">Short Name</label>
                    <Input
                        value={form.branch_code}
                        onChange={(e) => handleChange("branch_code", e.target.value)}
                    />
                </div>
            </div>


            <div>
                <label className="block text-xs font-medium mb-1">Address</label>
                <textarea
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    rows={4}
                />
            </div>

            {
                globalError && (
                    <div className="mb-4 p-3 border border-red-500 bg-red-50 text-red-700 rounded-lg" role="alert">
                        {globalError}
                    </div>
                )
            }

            {/* Buttons Right Aligned */}
            <div className="flex justify-end gap-3 mt-4">
                <Button
                    onClick={onSubmit}
                    disabled={loading}
                    className="bg-primary text-white"
                >
                    {loading ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </>
    );
}

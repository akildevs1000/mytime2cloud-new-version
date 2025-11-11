"use client";


import React, { useState } from 'react';

import { createDepartment } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { parseApiError } from '@/lib/utils';

let initialPayload = {
    name: "",
    branch_id: 0,
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
            let { data } = await createDepartment(form);

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
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                    <label className="block text-xs font-medium mb-1">Name</label>
                    <Input
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                </div>
            </div>

            {globalError && (
                <div className="mb-4 p-3 border border-red-500 bg-red-50 text-red-700 rounded-lg" role="alert">
                    {globalError}
                </div>
            )}

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

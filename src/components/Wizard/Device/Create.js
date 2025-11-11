"use client";


import React, { useState, useEffect } from 'react';

import { createDevice, getBranches } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DropDown from '@/components/ui/DropDown';
import { parseApiError } from '@/lib/utils';
import { DEVICE_TYPES, FUNCTIONS, MODEL_NUMBERS, STATUSSES } from '@/lib/dropdowns';
import timezones from '@/lib/timezones';


let initialPayload = {
    branch_id: "",
    device_type: "",
    name: "",
    short_name: "",
    model_number: "",
    device_id: "",
    utc_time_zone: "",
    location: "",
    function: "",
    status_id: "",
    ip: "0.0.0.0"
};

export default function Create({ onSuccess = () => { } }) {

    const [globalError, setGlobalError] = useState(null);
    const [form, setForm] = useState(initialPayload);

    const [loading, setLoading] = useState(false);

    const [branches, setBranches] = useState([]);

    const fetchBranches = async () => {
        try {
            setBranches(await getBranches());
        } catch (error) {
            setGlobalError(parseApiError(error));
        }
    };

    useEffect(() => {
        fetchBranches();
    }, []);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const onSubmit = async (e) => {

        e.preventDefault();
        setGlobalError(null);
        setLoading(true);

        try {
            let { data } = await createDevice(form);
            if (data?.status == false) {
                if (data.errors) {
                    const firstKey = Object.keys(data.errors); // get the first key
                    setGlobalError(data.errors[firstKey[0]][0]);
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Branch</label>
                    <DropDown
                        placeholder="Select Branch"
                        value={form.branch_id}
                        items={branches}
                        onChange={(val) => handleChange("branch_id", val)}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-medium mb-1">Device Type</label>
                    <DropDown
                        value={form.device_type}
                        items={DEVICE_TYPES}
                        onChange={(val) => handleChange("device_type", val)}
                    />
                </div>


                <div className="flex flex-col">
                    <label className="font-medium mb-1">Name</label>
                    <Input
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-medium mb-1">Short Name</label>
                    <Input
                        value={form.short_name}
                        onChange={(e) => handleChange("short_name", e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-medium mb-1">Model Number</label>
                    <DropDown
                        value={form.model_number}
                        items={MODEL_NUMBERS}
                        onChange={(val) => handleChange("model_number", val)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Serial Number</label>
                    <Input
                        value={form.device_id}
                        onChange={(e) => handleChange("device_id", e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Timezone</label>
                    <DropDown
                        value={form.utc_time_zone}
                        items={timezones}
                        onChange={(val) => handleChange("utc_time_zone", val)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Location</label>
                    <Input
                        value={form.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Function</label>
                    <DropDown
                        value={form.function}
                        items={FUNCTIONS}
                        onChange={(val) => handleChange("function", val)}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-medium mb-1">Status</label>
                    <DropDown
                        value={form.status_id}
                        items={STATUSSES}
                        onChange={(val) => handleChange("status_id", val)}
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
                    {loading ? "Saving..." : "Submit"}
                </Button>
            </div>
        </>
    );
}

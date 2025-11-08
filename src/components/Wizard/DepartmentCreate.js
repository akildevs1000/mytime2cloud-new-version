// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DropDown from "@/components/ui/DropDown";

import { getBranches, createDepartment } from "@/lib/api";
import { parseApiError } from "@/lib/utils";
import { Briefcase, Layers } from "lucide-react";

let defaultPayload = {
    name: "",
    branch_id: "",
};

const DepartmentCreate = ({ onSuccess = () => { }, goBack = () => { }, stepIndex = 1 }) => {

    const [successOpen, setSuccessOpen] = useState(false);
    const [globalError, setGlobalError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(defaultPayload);

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

    const onSubmit = async () => {
        setGlobalError(null);
        setLoading(true);
        try {

            await createDepartment(form);
            onSuccess();

        } catch (error) {
            setGlobalError(parseApiError(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="space-y-4">
                <div>
                    <div className="flex items-center">
                        <div className="flex items-center justify-center h-8 w-8">
                            <Layers className="h-6 w-6 mt-5 text-primary" />
                        </div>
                        <div className="leading-none ml-2">Create Department</div>
                    </div>
                    <div className="text-sm text-gray-500 ml-10">
                        Select the branch and enter departemnt name for empoyees.
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-medium mb-1">Branch</label>
                    <DropDown
                        placeholder="Select Branch"
                        onChange={(val) => handleChange("branch_id", val)}
                        value={form.branch_id}
                        items={branches}
                    />
                </div>
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

            <div className="flex justify-end space-x-4 pt-4">
                {
                    !stepIndex == 0 && <Button
                        type="button"
                        variant="secondary"
                        onClick={goBack}
                    >
                        Back
                    </Button>
                }

                <Button
                    onClick={onSubmit}
                    className="bg-primary hover:bg-indigo-700"
                >
                    {loading ? "Submit..." : "Submit"}
                </Button>
            </div>
        </>
    );
};

export default DepartmentCreate;

// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DropDown from "@/components/ui/DropDown";

import { createBranch, getBranches } from "@/lib/api";
import DatePicker from "../ui/DatePicker";
import { parseApiError } from "@/lib/utils";
import { Briefcase } from "lucide-react";

let defaultPayload = {
    user_id: 0, // dont changedefault 

    branch_name: "",
    licence_number: "",
    licence_issue_by_department: "",
    licence_expiry: "",
    lat: "",
    lon: "",
    address: "",
};

const BranchCreate = ({ onSuccess = () => { }, goBack = () => { }, stepIndex = 1 }) => {
    const [open, setOpen] = useState(true);
    const [successOpen, setSuccessOpen] = useState(false);
    const [globalError, setGlobalError] = useState(null);
    const [loading, setLoading] = useState(false);


    const [form, setForm] = useState(defaultPayload);

    const handleChange = (field, value) => {
        console.log(field, value);
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const onSubmit = async () => {
        setGlobalError(null);
        setLoading(true);
        try {

            let { data } = await createBranch(form);

            if (data?.status == false) {
                setGlobalError(data.message);
                return;
            }
            onSuccess();
        } catch (error) {
            setGlobalError(parseApiError(error));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setForm(defaultPayload);
    }, []);

    return (
        <>
            <div className="space-y-4">
                <div>
                    <div className="flex items-center">
                        <div className="flex items-center justify-center h-8 w-8">
                            <Briefcase className="h-6 w-6 mt-5 text-primary" />
                        </div>
                        <div className="leading-none ml-2">Create Branch Info</div>
                    </div>
                    <div className="text-sm text-gray-500 ml-10">
                        Enter the required details to set up a new branch.
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-medium mb-1">Name</label>
                    <Input
                        value={form.branch_name}
                        onChange={(e) => handleChange("branch_name", e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                        <label className="block text-xs font-medium mb-1">Licence</label>
                        <Input
                            value={form.licence_number}
                            onChange={(e) => handleChange("licence_number", e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">Issued By Department</label>
                        <Input
                            value={form.licence_issue_by_department}
                            onChange={(e) => handleChange("licence_issue_by_department", e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">Licence Expiry</label>
                        <DatePicker
                            value={form.licence_expiry}
                            onChange={(value) => handleChange("licence_expiry", value)}
                            placeholder="Pick a date"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium mb-1">Lat</label>
                        <Input
                            value={form.lat}
                            onChange={(e) => handleChange("lat", e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">Lon</label>
                        <Input
                            value={form.lon}
                            onChange={(e) => handleChange("lon", e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-medium mb-1">Address</label>
                    <textarea
                        value={form.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        rows={3} // adjust height
                    />
                </div>


            </div>

            {globalError && (
                <div className="mb-4 p-3 border border-red-500 bg-red-50 text-red-700 rounded-lg" role="alert">
                    {globalError}
                </div>
            )}

            <div className="flex justify-end gap-3 mt-5">
                {
                    !stepIndex == 0 && <Button variant="outline" onClick={() => goBack()}>
                        Cancel
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

export default BranchCreate;

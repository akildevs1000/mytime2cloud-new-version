// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { SuccessDialog } from "@/components/SuccessDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { User, ArrowLeft, Upload, Image, Briefcase, Badge, BaggageClaim, Building, Building2, Building2Icon, Info, Settings } from "lucide-react";
import { convertFileToBase64 } from "@/lib/utils";
import { parseApiError, getCompanyInfo } from "@/lib/api";
import { set } from "date-fns";
import { ca } from "date-fns/locale";

const CompanyContact = () => {

    const [isLoading, setIsLoading] = useState(true);

    // Simple local form state
    const [formData, setFormData] = useState({
        company_code: "",
        name: "",
        email: "", // from user object
        member_from: "",
        expiry: "",
        max_branches: "",
        max_employee: "",
        max_devices: "",
    });

    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await getCompanyInfo();
                console.log(data);
                // Fetch initial data or perform any setup
                setFormData({
                    company_code: data.company_code,
                    name: data.name,
                    email: data.user?.email,
                    member_from: data.member_from,
                    expiry: data.expiry,
                    max_branches: data.max_branches,
                    max_employee: data.max_employee,
                    max_devices: data.max_devices,
                });
            } catch (error) {
                console.error("Error fetching company info:", parseApiError(error));
            }
        };

        fetchData().finally(() => setIsLoading(false));

    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-2 lg:pl-4">
                <form className="space-y-8">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                            <Building2Icon className="mr-3 h-6 w-6 text-primary" />
                            Profile Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Company Code
                                </label>
                                <Input className="bg-white"
                                    name="company_code"
                                    value={formData.company_code}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Name
                                </label>
                                <Input className="bg-white"
                                    name="name"
                                    value={formData.name}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Email
                                </label>
                                <Input className="bg-white"
                                    name="email"
                                    value={formData.email}
                                    readOnly
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Max Branches
                                </label>
                                <Input className="bg-white"
                                    name="max_branches"
                                    value={formData.max_branches}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Max Employees
                                </label>
                                <Input className="bg-white"
                                    name="max_employee"
                                    value={formData.max_employee}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Max Devices
                                </label>
                                <Input className="bg-white"
                                    name="max_devices"
                                    value={formData.max_devices}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Memeber From
                                </label>
                                <Input className="bg-white"
                                    name="member_from"
                                    value={formData.member_from}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Expiry Date
                                </label>
                                <Input className="bg-white"
                                    name="expiry"
                                    value={formData.expiry}
                                    readOnly
                                />
                            </div>
                        </div>
                    </section>
                </form>


            </div>
        </div>
    );
};

export default CompanyContact;

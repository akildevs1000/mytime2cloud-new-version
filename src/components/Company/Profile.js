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

const CompanyProfile = ({ profile, isLoading }) => {

    if (isLoading) {
        return <p className="text-sm text-gray-500">Loading company info...</p>;
    }

    if (!profile) {
        return <p className="text-sm text-gray-500">No company data available.</p>;
    }

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
                                    value={profile.company_code}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Name
                                </label>
                                <Input className="bg-white"
                                    name="name"
                                    value={profile.name}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Email
                                </label>
                                <Input className="bg-white"
                                    name="email"
                                    value={profile.email}
                                    readOnly
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Max Branches
                                </label>
                                <Input className="bg-white"
                                    name="max_branches"
                                    value={profile.max_branches}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Max Employees
                                </label>
                                <Input className="bg-white"
                                    name="max_employee"
                                    value={profile.max_employee}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Max Devices
                                </label>
                                <Input className="bg-white"
                                    name="max_devices"
                                    value={profile.max_devices}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Memeber From
                                </label>
                                <Input className="bg-white"
                                    name="member_from"
                                    value={profile.member_from}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Expiry Date
                                </label>
                                <Input className="bg-white"
                                    name="expiry"
                                    value={profile.expiry}
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

export default CompanyProfile;

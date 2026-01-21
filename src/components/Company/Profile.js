// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { SuccessDialog } from "@/components/SuccessDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { User, ArrowLeft, Upload, Image, Briefcase, Badge, BaggageClaim, Building, Building2, Building2Icon, Info, Settings } from "lucide-react";
import { convertFileToBase64 } from "@/lib/utils";
import { getCompanyInfo } from "@/lib/api";
import { set } from "date-fns";
import { ca } from "date-fns/locale";

const CompanyProfile = ({ profile, isLoading }) => {

    if (isLoading) {
        return <p className="text-sm text-gray-500">Loading company info...</p>;
    }

    if (!profile) {
        return <p className="text-sm text-gray-500">No company data available.</p>;
    }

    return (<>

        <div className="w-full bg-white animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT COLUMN: Identity & Contact */}
                <div className="lg:col-span-7 flex flex-col gap-8">

                    {/* Company Identity Card */}
                    <section className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl shadow-glass p-6 md:p-8 relative overflow-hidden group hover:shadow-soft transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                <span className="material-symbols-outlined">badge</span>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">Company Identity</h2>
                                <p className="text-sm text-slate-500">Legal information and public profile</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Company Name</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className="w-full bg-white/60 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 font-semibold focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                />
                            </div>
                            {/* ... other identity inputs ... */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Industry</label>
                                <select className="w-full bg-white/60 border border-slate-200 rounded-lg px-4 py-3 text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all">
                                    <option>Technology & Software</option>
                                    <option>Manufacturing</option>
                                    <option>Healthcare</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Website</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50/50 text-slate-500 text-sm font-medium">https://</span>
                                    <input type="text" value={formData.website} className="w-full bg-white/60 border border-slate-200 rounded-r-lg px-4 py-3 text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Location & Contact Card */}
                    <section className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl shadow-glass p-6 md:p-8 hover:shadow-soft transition-all">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                                <span className="material-symbols-outlined">business</span>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">Location & Contact</h2>
                                <p className="text-sm text-slate-500">Headquarters and contact points</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Map Placeholder */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">HQ Location</label>
                                <div className="rounded-xl overflow-hidden border border-slate-200 h-48 w-full bg-slate-100 relative group">
                                    <iframe
                                        title="HQ Map"
                                        className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 w-full h-full"
                                        src="about:blank" // Replace with actual maps integration
                                    />
                                    <div className="absolute top-3 right-3 flex gap-2">
                                        <button className="bg-white/90 hover:bg-white text-slate-600 text-xs font-semibold py-1.5 px-3 rounded-lg shadow-sm border border-slate-200 backdrop-blur-md flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[16px]">pin_drop</span> Copy Code
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <textarea
                                className="w-full bg-white/60 border border-slate-200 rounded-lg px-4 py-3 text-slate-700 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                                rows="2"
                                value={formData.address}
                                readOnly
                            />
                        </div>
                    </section>
                </div>

                {/* RIGHT COLUMN: Branding & Settings */}
                <div className="lg:col-span-5 flex flex-col gap-8">

                    {/* QR Code Card */}
                    <section className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl shadow-glass p-6 md:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                <span className="material-symbols-outlined">qr_code_2</span>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">Company QR Code</h2>
                                <p className="text-sm text-slate-500">Scan for mobile access</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center p-6 bg-white/50 border border-slate-200 rounded-xl group cursor-pointer transition-all">
                            <div className="w-32 h-32 bg-slate-200 rounded-lg mb-4 flex items-center justify-center">
                                <span className="text-slate-400">QR Image</span>
                            </div>
                            <button className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">download</span> Download QR
                            </button>
                        </div>
                    </section>

                    {/* Branding Card */}
                    <section className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl shadow-glass p-6 md:p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                <span className="material-symbols-outlined">palette</span>
                            </div>
                            <h2 className="text-lg font-bold text-slate-800">Corporate Branding</h2>
                        </div>

                        {/* Logo Upload */}
                        <div className="border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/50 hover:bg-white transition-all cursor-pointer p-8 flex flex-col items-center gap-3">
                            <div className="w-16 h-16 bg-white shadow-md rounded-lg flex items-center justify-center text-indigo-600">
                                <span className="material-symbols-outlined text-4xl">cloud_circle</span>
                            </div>
                            <p className="text-sm text-center">
                                <span className="text-indigo-600 font-semibold">Click to upload</span> or drag and drop
                            </p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    </>)

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

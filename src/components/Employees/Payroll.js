"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SuccessDialog } from "@/components/SuccessDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Banknote } from "lucide-react";
import { updateBank } from "@/lib/api";
import { parseApiError } from "@/lib/utils";

const Bank = ({ employee_id, bank }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [globalError, setGlobalError] = useState(null);

    const form = useForm({
        defaultValues: {
            account_title: bank?.account_title || "",
            bank_name: bank?.bank_name || "",
            account_no: bank?.account_no || "",
            iban: bank?.iban || "",
            address: bank?.address || "",
        },
    });

    const { handleSubmit, formState } = form;
    const { isSubmitting } = formState;

    const handleCancel = () => router.push(`/employees`);

    const onSubmit = async (data) => {
        setGlobalError(null);
        try {
            const finalPayload = {
                account_title: data.account_title,
                bank_name: data.bank_name,
                account_no: data.account_no,
                iban: data.iban,
                address: data.address,

                employee_id: employee_id || "",
            };

            await updateBank(finalPayload);

            setOpen(true);

            await new Promise(resolve => setTimeout(resolve, 2000));

            setOpen(false);

            router.push(`/employees`);
        } catch (error) {
            setGlobalError(parseApiError(error));
        }
    };

    return (<>
        <div
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
            <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Payroll Details
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Manage salary structures, tax classifications, and deductions.
                </p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-[minmax(140px,auto)]">
            <div
                className="glass-card col-span-1 md:col-span-2 lg:col-span-2 row-span-2 p-8 flex flex-col relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent pointer-events-none">
                </div>
                <div className="flex justify-between items-center mb-6 relative z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-600 dark:text-gray-300 tracking-tight">Salary Breakdown</h2>
                        <p className="text-sm text-[#9db0b9]">Monthly Earnings Structure</p>
                    </div>
                    <button
                        className="p-2 rounded-full hover:bg-white/5 text-[#9db0b9] hover:text-white transition-colors">
                        <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                </div>
                <div
                    className="flex flex-col sm:flex-row items-center justify-around gap-8 flex-1 relative z-10">
                    <div className="relative size-48 shrink-0 rounded-full shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)]"
                        style={{ background: 'conic-gradient(#6366f1 0% 45%, #2dd4bf 45% 75%, #0ea5e9 75% 100%)' }}
                    >
                        <div
                            className="absolute inset-4 bg-[#162025] rounded-full flex flex-col items-center justify-center">
                            <span
                                className="text-xs font-semibold text-[#9db0b9] uppercase tracking-wider">Gross
                                Pay</span>
                            <span className="text-3xl font-bold text-white tracking-tight">$8,500</span>
                            <span className="text-[10px] text-green-400 mt-1 flex items-center gap-0.5">
                                <span className="material-symbols-outlined text-[12px]">trending_up</span> +2.5%
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full max-w-[240px]">
                        <div className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div
                                    className="size-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                                </div>
                                <div className="flex flex-col">
                                    <span
                                        className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-indigo-400 transition-colors">Basic
                                        Salary</span>
                                    <span className="text-xs text-[#5f717a]">45% of total</span>
                                </div>
                            </div>
                            <span className="text-sm font-bold text-gray-600 dark:text-gray-300">$3,825</span>
                        </div>
                        <div className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div
                                    className="size-3 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]">
                                </div>
                                <div className="flex flex-col">
                                    <span
                                        className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-teal-400 transition-colors">HRA</span>
                                    <span className="text-xs text-[#5f717a]">30% of total</span>
                                </div>
                            </div>
                            <span className="text-sm font-bold text-gray-600 dark:text-gray-300">$2,550</span>
                        </div>
                        <div className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div
                                    className="size-3 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]">
                                </div>
                                <div className="flex flex-col">
                                    <span
                                        className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-sky-400 transition-colors">Allowances</span>
                                    <span className="text-xs text-[#5f717a]">25% of total</span>
                                </div>
                            </div>
                            <span className="text-sm font-bold text-gray-600 dark:text-gray-300">$2,125</span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="glass-card col-span-1 md:col-span-1 lg:col-span-2 row-span-2 flex flex-col overflow-hidden relative">
                <div
                    className="p-6 pb-2 flex justify-between items-center z-10 ">
                    <h3 className="text-lg font-bold text-gray-600 dark:text-gray-300">Payment History</h3>
                    <button className="text-xs font-medium text-primary hover:text-white transition-colors">View
                        All</button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                    <div className="flex flex-col gap-1">
                        <div
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div
                                    className="size-10 rounded-lg glass-card border border-gray-300 dark:border-[#283339] flex items-center justify-center text-indigo-400 group-hover:border-indigo-500/30 transition-colors">
                                    <span className="material-symbols-outlined">account_balance</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Salary - Oct 2023</span>
                                    <span className="text-xs text-[#9db0b9]">Oct 30, 2023</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-sm font-bold text-gray-600 dark:text-gray-300">$4,250.00</span>
                                <span
                                    className="text-[10px] bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full border border-orange-500/20 flex items-center gap-1">
                                    <div className="size-1 bg-orange-400 rounded-full animate-pulse"></div>
                                    Processing
                                </span>
                            </div>
                        </div>
                        <div
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div
                                    className="size-10 rounded-lg glass-card border border-gray-300 dark:border-[#283339] flex items-center justify-center text-teal-400 group-hover:border-teal-500/30 transition-colors">
                                    <span className="material-symbols-outlined">check_circle</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Salary - Sep 2023</span>
                                    <span className="text-xs text-[#9db0b9]">Sep 29, 2023</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-sm font-bold text-gray-600 dark:text-gray-300">$4,250.00</span>
                                <span
                                    className="text-[10px] bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded-full border border-teal-500/20 flex items-center gap-1">
                                    Completed
                                </span>
                            </div>
                        </div>
                        <div
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div
                                    className="size-10 rounded-lg glass-card border border-gray-300 dark:border-[#283339] flex items-center justify-center text-teal-400 group-hover:border-teal-500/30 transition-colors">
                                    <span className="material-symbols-outlined">check_circle</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Perf. Bonus</span>
                                    <span className="text-xs text-[#9db0b9]">Sep 15, 2023</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-sm font-bold text-gray-600 dark:text-gray-300">$1,500.00</span>
                                <span
                                    className="text-[10px] bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded-full border border-teal-500/20 flex items-center gap-1">
                                    Completed
                                </span>
                            </div>
                        </div>
                        <div
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div
                                    className="size-10 rounded-lg glass-card border border-gray-300 dark:border-[#283339] flex items-center justify-center text-teal-400 group-hover:border-teal-500/30 transition-colors">
                                    <span className="material-symbols-outlined">check_circle</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Salary - Aug 2023</span>
                                    <span className="text-xs text-[#9db0b9]">Aug 30, 2023</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-sm font-bold text-gray-600 dark:text-gray-300">$4,100.00</span>
                                <span
                                    className="text-[10px] bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded-full border border-teal-500/20 flex items-center gap-1">
                                    Completed
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="glass-card col-span-1 p-6 flex flex-col justify-between group relative overflow-hidden">
                <div
                    className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-[40px] pointer-events-none group-hover:bg-indigo-500/30 transition-colors">
                </div>
                <div className="flex justify-between items-start z-10">
                    <span className="text-sm font-bold text-[#9db0b9] uppercase tracking-wider">Tax
                        Summary</span>
                    <span className="material-symbols-outlined text-indigo-400">receipt_long</span>
                </div>
                <div className="flex flex-col gap-1 mt-4 z-10">
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-light text-gray-600 dark:text-gray-300">$12,400</span>
                        <span className="text-xs text-[#9db0b9] mb-1.5">YTD Tax</span>
                    </div>
                    <div
                        className="w-full bg-gray-300 dark:bg-gray-900 h-2 rounded-full mt-3 overflow-hidden border border-white/5">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[65%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                        </div>
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-[#5f717a]">
                        <span>Paid: 65%</span>
                        <span>Proj: $19k</span>
                    </div>
                </div>
            </div>
            <div className="glass-card col-span-1 p-6 flex flex-col justify-between group">
                <div className="flex justify-between items-start">
                    <span className="text-sm font-bold text-[#9db0b9] uppercase tracking-wider">Net
                        Earnings</span>
                    <span className="material-symbols-outlined text-teal-400">savings</span>
                </div>
                <div className="mt-4">
                    <span className="text-3xl font-light text-gray-600 dark:text-gray-300 block">$54,250</span>
                    <span className="text-xs text-green-400 mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">trending_up</span>
                        +12% vs last year
                    </span>
                </div>
            </div>
            <div
                className="glass-card col-span-1 md:col-span-2 lg:col-span-2 p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-600 dark:text-gray-300">Deductions &amp; Benefits</h3>
                    <span className="text-xs text-[#9db0b9]">Active Plans</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div
                        className="dark:bg-white/5 rounded-lg p-3 border dark:border-white/5 border-gray-300 hover:border-indigo-500/30 transition-colors flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-indigo-300">
                            <span className="material-symbols-outlined text-[18px]">health_and_safety</span>
                            <span className="text-xs font-bold uppercase">Health</span>
                        </div>
                        <span className="text-lg font-bold text-white">$150<span
                            className="text-xs font-normal text-[#5f717a]">/mo</span></span>
                    </div>
                    <div
                        className="dark:bg-white/5 rounded-lg p-3 border dark:border-white/5 border-gray-300 hover:border-teal-500/30 transition-colors flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-teal-300">
                            <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
                            <span className="text-xs font-bold uppercase">401k</span>
                        </div>
                        <span className="text-lg font-bold text-white">5%<span
                            className="text-xs font-normal text-[#5f717a]"> match</span></span>
                    </div>
                    <div
                        className="dark:bg-white/5 rounded-lg p-3 border dark:border-white/5 border-gray-300 hover:border-sky-500/30 transition-colors flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sky-300">
                            <span className="material-symbols-outlined text-[18px]">directions_car</span>
                            <span className="text-xs font-bold uppercase">Parking</span>
                        </div>
                        <span className="text-lg font-bold text-white">$0<span
                            className="text-xs font-normal text-[#5f717a]"> covered</span></span>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default Bank;

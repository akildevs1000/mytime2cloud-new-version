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
                    Leaves
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Track leave balances, monitor absence trends, and manage time-off requests.
                </p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[minmax(160px,auto)]">
            <div
                className="glass-card p-6 flex flex-col items-center justify-center rounded-lg relative overflow-hidden group">
                <div className="w-full flex justify-between items-start absolute top-4 left-0 px-5">
                    <span className="text-xs font-bold text-[#9db0b9] uppercase tracking-wider">Annual</span>
                    <span className="material-symbols-outlined text-[#5f717a]">beach_access</span>
                </div>
                <div className="relative size-24 mt-4">
                    <div className="size-full rounded-full"
                        style={{
                            background: "conic-gradient(#13a4ec 270deg, #283339 0deg)",
                        }}
                    ></div>
                    <div
                        className="absolute inset-2 bg-[#141d22] rounded-full flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-white">15</span>
                        <span className="text-[10px] text-[#9db0b9] uppercase">Left</span>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <span className="text-sm text-[#9db0b9]">of 20 Days</span>
                </div>
            </div>
            <div
                className="glass-card p-6 flex flex-col items-center justify-center rounded-lg relative overflow-hidden group">
                <div className="w-full flex justify-between items-start absolute top-4 left-0 px-5">
                    <span className="text-xs font-bold text-[#9db0b9] uppercase tracking-wider">Sick</span>
                    <span className="material-symbols-outlined text-[#5f717a]">medication</span>
                </div>
                <div className="relative size-24 mt-4">
                    <div className="size-full rounded-full"
                        style={{
                            background: "conic-gradient(#ec4899 180deg, #283339 0deg)",
                        }}
                    ></div>
                    <div
                        className="absolute inset-2 bg-[#141d22] rounded-full flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-white">5</span>
                        <span className="text-[10px] text-[#9db0b9] uppercase">Left</span>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <span className="text-sm text-[#9db0b9]">of 10 Days</span>
                </div>
            </div>
            <div
                className="glass-card p-6 flex flex-col items-center justify-center rounded-lg relative overflow-hidden group">
                <div className="w-full flex justify-between items-start absolute top-4 left-0 px-5">
                    <span className="text-xs font-bold text-[#9db0b9] uppercase tracking-wider">Casual</span>
                    <span className="material-symbols-outlined text-[#5f717a]">event_busy</span>
                </div>
                <div className="relative size-24 mt-4">
                    <div className="size-full rounded-full"

                        style={{
                            background: "conic-gradient(#f59e0b 90deg, #283339 0deg)",
                        }}

                    ></div>
                    <div
                        className="absolute inset-2 bg-[#141d22] rounded-full flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-white">2</span>
                        <span className="text-[10px] text-[#9db0b9] uppercase">Left</span>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <span className="text-sm text-[#9db0b9]">of 8 Days</span>
                </div>
            </div>
            <div
                className="glass-card p-6 flex flex-col items-center justify-center rounded-lg relative overflow-hidden group cursor-pointer hover:bg-primary/5 transition-colors border border-dashed border-primary/20 hover:border-primary/50">
                <div
                    className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[32px]">add</span>
                </div>
                <span className="text-lg font-bold text-white">New Request</span>
                <span className="text-xs text-[#9db0b9] text-center mt-1">Submit a new leave application</span>
            </div>
            <div
                className="glass-card col-span-1 md:col-span-2 lg:col-span-2 row-span-2 p-6 rounded-lg flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">calendar_month</span>
                        Leave Calendar
                    </h3>
                    <div
                        className="flex items-center gap-2 bg-[#111618] rounded-md p-1 border border-[#283339]">
                        <button className="p-1 hover:text-white text-[#9db0b9] transition-colors"><span
                            className="material-symbols-outlined text-[16px]">chevron_left</span></button>
                        <span className="text-xs font-bold text-white px-2">Nov 2024</span>
                        <button className="p-1 hover:text-white text-[#9db0b9] transition-colors"><span
                            className="material-symbols-outlined text-[16px]">chevron_right</span></button>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-1 flex-1 text-center">
                    <div className="text-[10px] font-bold text-[#5f717a] uppercase py-2">Su</div>
                    <div className="text-[10px] font-bold text-[#5f717a] uppercase py-2">Mo</div>
                    <div className="text-[10px] font-bold text-[#5f717a] uppercase py-2">Tu</div>
                    <div className="text-[10px] font-bold text-[#5f717a] uppercase py-2">We</div>
                    <div className="text-[10px] font-bold text-[#5f717a] uppercase py-2">Th</div>
                    <div className="text-[10px] font-bold text-[#5f717a] uppercase py-2">Fr</div>
                    <div className="text-[10px] font-bold text-[#5f717a] uppercase py-2">Sa</div>
                    <div className="p-2 text-sm text-[#283339]">28</div>
                    <div className="p-2 text-sm text-[#283339]">29</div>
                    <div className="p-2 text-sm text-[#283339]">30</div>
                    <div className="p-2 text-sm text-[#283339]">31</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">1</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">2</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">3</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">4</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">5</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">6</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">7</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">8</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">9</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">10</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">11</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">12</div>
                    <div
                        className="relative p-2 rounded bg-primary/20 text-white font-bold cursor-pointer border border-primary/30">
                        13
                        <div
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-1 bg-primary rounded-full">
                        </div>
                    </div>
                    <div
                        className="relative p-2 rounded bg-primary/20 text-white font-bold cursor-pointer border border-primary/30">
                        14
                        <div
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-1 bg-primary rounded-full">
                        </div>
                    </div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">15</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">16</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">17</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">18</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">19</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">20</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">21</div>
                    <div
                        className="p-2 text-sm font-bold text-white bg-white/10 rounded cursor-pointer border border-white/20">
                        22</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">23</div>
                    <div
                        className="relative p-2 text-sm text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 rounded cursor-pointer">
                        24
                        <div
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-1 bg-amber-500 rounded-full">
                        </div>
                    </div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">25</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">26</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">27</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">28</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">29</div>
                    <div className="p-2 text-sm text-[#9db0b9] hover:bg-white/5 rounded cursor-pointer">30</div>
                </div>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#283339] text-xs">
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-primary"></div>
                        <span className="text-[#9db0b9]">Annual</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-amber-500"></div>
                        <span className="text-[#9db0b9]">Holiday</span>
                    </div>
                </div>
            </div>
            <div
                className="glass-card col-span-1 md:col-span-2 lg:col-span-2 row-span-2 rounded-lg flex flex-col overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-[#283339]">
                    <h3 className="text-lg font-bold text-white">Recent Requests</h3>
                    <button className="text-xs text-primary hover:text-primary/80 transition-colors">View
                        History</button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-xs text-[#5f717a] border-b border-[#283339] bg-[#141d22]">
                                <th className="px-6 py-3 font-semibold uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 font-semibold uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 font-semibold uppercase tracking-wider">Days</th>
                                <th className="px-6 py-3 font-semibold uppercase tracking-wider text-right">
                                    Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#283339]">
                            <tr className="group hover:bg-white/5 transition-colors cursor-pointer">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="size-8 rounded bg-primary/10 text-primary flex items-center justify-center">
                                            <span
                                                className="material-symbols-outlined text-[18px]">beach_access</span>
                                        </div>
                                        <span className="text-sm font-medium text-white">Annual Leave</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#9db0b9]">Nov 13 - Nov 14</td>
                                <td className="px-6 py-4 text-sm text-white">2</td>
                                <td className="px-6 py-4 text-right">
                                    <span
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                        Pending
                                    </span>
                                </td>
                            </tr>
                            <tr className="group hover:bg-white/5 transition-colors cursor-pointer">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="size-8 rounded bg-pink-500/10 text-pink-500 flex items-center justify-center">
                                            <span
                                                className="material-symbols-outlined text-[18px]">medication</span>
                                        </div>
                                        <span className="text-sm font-medium text-white">Sick Leave</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#9db0b9]">Oct 02</td>
                                <td className="px-6 py-4 text-sm text-white">1</td>
                                <td className="px-6 py-4 text-right">
                                    <span
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                                        Approved
                                    </span>
                                </td>
                            </tr>
                            <tr className="group hover:bg-white/5 transition-colors cursor-pointer">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="size-8 rounded bg-orange-500/10 text-orange-500 flex items-center justify-center">
                                            <span
                                                className="material-symbols-outlined text-[18px]">event_busy</span>
                                        </div>
                                        <span className="text-sm font-medium text-white">Casual Leave</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#9db0b9]">Sep 15</td>
                                <td className="px-6 py-4 text-sm text-white">1</td>
                                <td className="px-6 py-4 text-right">
                                    <span
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                                        Approved
                                    </span>
                                </td>
                            </tr>
                            <tr className="group hover:bg-white/5 transition-colors cursor-pointer">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="size-8 rounded bg-primary/10 text-primary flex items-center justify-center">
                                            <span
                                                className="material-symbols-outlined text-[18px]">beach_access</span>
                                        </div>
                                        <span className="text-sm font-medium text-white">Annual Leave</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#9db0b9]">Aug 20 - Aug 25</td>
                                <td className="px-6 py-4 text-sm text-white">5</td>
                                <td className="px-6 py-4 text-right">
                                    <span
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                                        Rejected
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>);
};

export default Bank;

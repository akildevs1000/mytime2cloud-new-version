"use client";

import React, { useState } from 'react';
import { SuccessDialog } from "@/components/SuccessDialog"; // Import the new component
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Button } from "@/components/ui/button";
import Input from "@/components/Theme/Input";

import { BadgeCheck, ArrowLeft, Clock, Sunrise, Moon, Fingerprint, TimerIcon } from "lucide-react";
import { parseApiError } from "@/lib/utils";
import { useRouter } from 'next/navigation';

import { storeShift } from '@/lib/api';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import TimePicker from '@/components/ui/TimePicker';


import DaysSelector from "@/components/DaysSelector";
import LiveInsightSidebar from '@/components/Shift/LiveInsightSidebar';
import Dropdown from '@/components/Theme/DropDown';
import AttendanceRules from '@/components/Shift/AttendanceRules';

const ShiftCreate = () => {

    const [isUnlimited, setIsUnlimited] = useState(true);
    const [isAutoShift, setIsAutoShift] = useState({});
    const [selectedShiftType, setSelectedShiftType] = useState({ id: "", name: "" });


    const [schedule, setSchedule] = useState({
        "shift_type_id": 6,
        "branch_id": 0,
        "on_duty_time": "09:00",
        "off_duty_time": "18:00",
        "working_hours": "09:00",
        "overtime_interval": "00:30",
        "days": [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ],
        "weekend1": "Not Applicable",
        "weekend2": "Not Applicable",
        "monthly_flexi_holidays": 0,
        "beginning_in": "06:00",
        "beginning_out": "13:00",
        "ending_in": "15:00",
        "ending_out": "21:00",
        "late_time": "00:15",
        "early_time": "00:15",
        "absent_min_in": "01:00",
        "absent_min_out": "01:00",
        "halfday": "Not Applicable",
        "halfday_working_hours": "HH:MM",
        "name": "test",
        "overtime_type": "Both",
        "company_id": 2,
        "from_date": "2025-10-14T15:54:18.428Z",
        "to_date": "2026-10-14T15:54:18.428Z",

        "attendanc_rule_late_coming": "present",
        "attendanc_rule_early_going": "present",
    });

    const handleChange = (key, value) => {
        setSchedule((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const router = useRouter();
    const handleGoBack = () => router.push(`/attendance`);
    const handleCancel = () => router.push(`/attendance`);

    const [open, setOpen] = useState(false);
    const [globalError, setGlobalError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setGlobalError(null);
        setIsSubmitting(true);
        console.log("Full Schedule Object:", schedule);
        try {
            let r = await storeShift(schedule);

            if (!r.status) {
                setGlobalError((Object.values(r.errors)[0][0]));
                setIsSubmitting(false);
                return;
            }

            setOpen(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
            setOpen(false);
            setIsSubmitting(false);
            router.push(`/attendance`);

        } catch (error) {
            setGlobalError(parseApiError(error));
            setIsSubmitting(false);
        }
    };

    return (
        <>

            <SuccessDialog
                open={open}
                onOpenChange={setOpen}
                title="Shift Saved"
                description="Your Shift information has been inserted successfully."
            />

            <div className="p-5">
                <header className="h-16 border-b border-border  dark:bg-slate-900 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-600 dark:text-gray-300 tracking-tight">
                            Shift Configuration
                        </h2>
                        <p className="text-xs text-gray-600 dark:text-slate-300 hidden sm:block">
                            Manage timings, policies, and attendance rules for "General Shift A"
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center justify-center gap-2 h-9 px-4 rounded-lg border border-border  text-gray-600 dark:text-slate-300 text-sm font-medium transition-all hover:bg-slate-700">
                            <span className="material-symbols-outlined text-[18px]">history</span>
                            <span className="hidden sm:inline">History</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-sm font-bold hover:bg-emerald-500/20 transition-all">
                            <span className="material-symbols-outlined text-[18px]">ios_share</span>
                            <span className="hidden sm:inline">Export</span>
                        </button>
                    </div>
                </header>

                {/* Main Content Wrapper - Set to flex-row on lg screens */}
                <div className="flex flex-col lg:flex-row">

                    {/* LEFT AREA: 70% Width */}
                    <div className="w-full lg:w-[70%] p-6 pb-24 overflow-y-auto max-h-[calc(100vh-100px)]">
                        <div className="mx-auto lg:mx-0 space-y-8">
                            <section className="space-y-4">
                                <h3 className="text-lg font-bold text-gray-600 dark:text-slate-300 flex items-center gap-2">
                                    <BadgeCheck className="w-5 h-5 text-emerald-400" />
                                    Shift Identity
                                </h3>

                                <div className="relative z-30  bg-white dark:bg-[#1e293b]/50 border dark:border-white/10 rounded-xl p-5 shadow-lg backdrop-blur-sm">
                                    <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                                        <div className='w-full'>
                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Shift Type</span>
                                            <div className="relative z-20">
                                                <Dropdown
                                                    items={[
                                                        { "id": "1", "name": "Flexible" },
                                                        { "id": "6", "name": "Single" },
                                                        { "id": "2", "name": "Multi" },
                                                        { "id": "4", "name": "Night" },
                                                        { "id": "5", "name": "Dual" }
                                                    ]
                                                    }
                                                    selectedItem={selectedShiftType}
                                                    onSelect={(item) => {
                                                        handleChange("shift_type_id", item.id)
                                                        setSelectedShiftType(item)
                                                    }}
                                                    placeholder="Select Shift Type"
                                                    width="w-full"
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className= "bg-white dark:bg-[#1e293b]/50 border dark:border-white/10 rounded-xl p-5 shadow-lg backdrop-blur-sm">
                                    <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                                        {/* Shift Name Input */}
                                        <label className="flex flex-col w-full sm:w-2/3 gap-2">
                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Shift Name</span>
                                            <Input
                                                defaultValue={schedule.name}
                                                onChange={(e) => handleChange("name", e.target.value)} // ✅ fixed
                                                placeholder="Enter shift name"
                                            />
                                        </label>

                                        {/* Auto-Shift Toggle */}
                                        <div className="flex flex-col gap-2 w-full sm:w-auto">
                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Auto-Shift Mode</span>
                                            <label className="relative flex items-center cursor-pointer gap-3 p-2 rounded-lg  border border-border w-full sm:w-auto hover:bg-[#161e31] transition-colors">
                                                <div
                                                    onClick={() => setIsAutoShift(!isAutoShift)}
                                                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${isAutoShift ? 'bg-emerald-500' : 'bg-slate-700'}`}
                                                >
                                                    <input type="checkbox" className="sr-only" checked={isAutoShift} readOnly />
                                                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAutoShift ? 'translate-x-5' : 'translate-x-0'}`} />
                                                </div>
                                                <span className="text-sm text-gray-600 dark:text-slate-300 font-medium select-none">{isAutoShift ? 'Enabled' : 'Disabled'}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {
                                schedule.shift_type_id == 1 || schedule.shift_type_id == 2
                                    ?
                                    <section className="space-y-4">
                                        {/* Section Header */}
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-gray-600 dark:text-slate-300 flex items-center gap-2">
                                                <Clock className="w-5 h-5 text-emerald-400" />
                                                Flexible Work Window
                                            </h3>
                                        </div>

                                        <div className= "bg-white dark:bg-[#1e293b]/50 border dark:border-white/10 rounded-xl p-5 shadow-lg flex flex-col gap-6 backdrop-blur-sm">
                                            {/* Global Availability Range Card */}
                                            <div className="p-4 bg-[#0f172a]/50 border border-white/5 rounded-lg relative overflow-hidden">
                                                {/* Background Decorative Icon */}
                                                <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
                                                    <TimerIcon size={96} className="text-emerald-400" />
                                                </div>

                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 relative z-10">
                                                    <div>
                                                        <h4 className="text-gray-600 dark:text-slate-300 font-semibold text-base">
                                                            Global Availability Range
                                                        </h4>
                                                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                                                            Define the open window during which staff can clock in and out.
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                                        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                                        <span className="text-xs font-medium text-emerald-400 uppercase tracking-wide">
                                                            Active Window
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                                                    {/* Window Open */}
                                                    <div className="space-y-2">
                                                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                                                            <Sunrise size={16} /> Window Open
                                                        </label>
                                                        <div className="relative group">
                                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                <Clock
                                                                    size={18}
                                                                    className="text-slate-500 group-focus-within:text-gray-600 dark:text-slate-300 transition-colors"
                                                                />
                                                            </div>
                                                            <TimePicker />
                                                        </div>
                                                        <p className="text-[10px] text-slate-500 pl-1">
                                                            Earliest allowed start time
                                                        </p>
                                                    </div>

                                                    {/* Window Close */}
                                                    <div className="space-y-2">
                                                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                                            <Moon size={16} /> Window Close
                                                        </label>
                                                        <div className="relative group">
                                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                <Clock
                                                                    size={18}
                                                                    className="text-slate-500 group-focus-within:text-gray-600 dark:text-slate-300 transition-colors"
                                                                />
                                                            </div>
                                                            <TimePicker />
                                                        </div>
                                                        <p className="text-[10px] text-slate-500 pl-1">
                                                            Latest allowed end time
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Multi-Punch Policy Card */}
                                            <div className="bg-[#0f172a]/30 border border-white/5 rounded-lg p-5">
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                                                    <h4 className="text-gray-600 dark:text-slate-300 font-semibold flex items-center gap-2">
                                                        <Fingerprint size={20} className="text-emerald-400" />
                                                        Multi-Punch Policy
                                                    </h4>

                                                    {/* Toggle Switch */}
                                                    <label className="relative flex items-center cursor-pointer gap-2 p-1.5 pr-3 rounded-full bg-[#1e293b] border dark:border-white/10 hover:border-slate-500 transition-colors">
                                                        <div className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out bg-slate-700">
                                                            <input
                                                                type="checkbox"
                                                                className="peer sr-only"
                                                                checked={isUnlimited}
                                                                onChange={() => setIsUnlimited(!isUnlimited)}
                                                            />
                                                            <span
                                                                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${isUnlimited ? "translate-x-4 bg-emerald-400" : "translate-x-0"} ${isUnlimited ? "bg-white" : "bg-slate-400"}`}
                                                            />
                                                        </div>
                                                        <span className="text-xs text-gray-600 dark:text-slate-300 font-medium select-none">
                                                            Allow Unlimited In/Out
                                                        </span>
                                                    </label>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                                                    {/* Target Daily Hours */}
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-medium text-slate-600 dark:text-slate-300 block">
                                                            Target Daily Hours
                                                        </label>
                                                        <div className="relative">
                                                            <Input
                                                                defaultValue="8"
                                                            />
                                                            <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-medium">
                                                                HRS
                                                            </span>
                                                        </div>
                                                        <p className="text-[10px] text-slate-500">
                                                            Expected total duration per day
                                                        </p>
                                                    </div>

                                                    {/* Min Session Duration */}
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-medium text-slate-600 dark:text-slate-300 block">
                                                            Minimum Session Duration
                                                        </label>
                                                        <div className="relative">
                                                            <Input
                                                                defaultValue="30"
                                                            />
                                                            <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-medium">
                                                                MIN
                                                            </span>
                                                        </div>
                                                        <p className="text-[10px] text-slate-500">
                                                            Prevent accidental short punches
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    : null
                            }

                            {
                                schedule.shift_type_id == 4 || schedule.shift_type_id == 6
                                    ?
                                    <section className="space-y-4">
                                        <h3
                                            className="text-lg font-bold text-gray-600 dark:text-slate-300 flex items-center gap-2"
                                        >
                                            <span className="material-symbols-outlined text-primary"
                                            >schedule</span
                                            >
                                            Clock-In/Out Configuration
                                        </h3>
                                        <div
                                            className= "bg-white dark:bg-[#1e293b]/50 border border-gray-200 dark:dark:border-white/10 rounded-xl p-6 shadow-lg space-y-6"
                                        >
                                            <div
                                                className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-200 dark:dark:border-white/10"
                                            >
                                                <div className="space-y-2">
                                                    <label
                                                        className="flex items-center gap-2 text-sm font-medium text-primary"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]"
                                                        >login</span
                                                        >
                                                        On Duty Time
                                                    </label>
                                                    <TimePicker />
                                                </div>
                                                <div className="space-y-2">
                                                    <label
                                                        className="flex items-center gap-2 text-sm font-medium text-red-400"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]"
                                                        >logout</span
                                                        >
                                                        Off Duty Time
                                                    </label>
                                                    <TimePicker />

                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <span
                                                        className="text-xs uppercase tracking-wider font-bold text-gray-600 dark:text-slate-300"
                                                    >Beginning Window</span
                                                    >
                                                    <div className="grid grid-cols-2 gap-3 mt-5">
                                                        <div>
                                                            <span className="text-xs text-gray-600 dark:text-slate-300 mb-1 block"
                                                            >Start</span
                                                            >
                                                            <TimePicker defaultValue={"07:00"} />
                                                        </div>
                                                        <div>
                                                            <span className="text-xs text-gray-600 dark:text-slate-300 mb-1 block"
                                                            >End</span
                                                            >
                                                            <TimePicker defaultValue={"10:00"} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <span
                                                        className="text-xs uppercase tracking-wider font-bold text-gray-600 dark:text-slate-300"
                                                    >Ending Window</span
                                                    >
                                                    <div className="grid grid-cols-2 gap-3 mt-5">
                                                        <div>
                                                            <span className="text-xs text-gray-600 dark:text-slate-300 mb-1 block"
                                                            >Start</span
                                                            >

                                                            <TimePicker defaultValue={"17:00"} />
                                                        </div>
                                                        <div>
                                                            <span className="text-xs text-gray-600 dark:text-slate-300 mb-1 block"
                                                            >End</span
                                                            >
                                                            <TimePicker defaultValue={"23:00"} />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    : null
                            }

                            {
                                schedule.shift_type_id == 5 ?
                                    <section className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3
                                                className="text-lg font-bold text-gray-600 dark:text-slate-300 flex items-center gap-2"
                                            >
                                                <span className="material-symbols-outlined text-primary"
                                                >calendar_clock</span
                                                >
                                                Session Schedule
                                            </h3>
                                            <span
                                                className="text-xs font-mono bg-surface-dark border border-gray-200 dark:dark:border-white/10 px-2 py-1 rounded text-gray-600 dark:text-slate-300"
                                            >Multiple IN/OUT</span
                                            >
                                        </div>
                                        <div
                                            className="bg-surface-dark border border-gray-200 dark:dark:border-white/10 rounded-xl p-5 shadow-lg flex flex-col gap-4"
                                        >
                                            <div
                                                className= "bg-white dark:bg-[#1e293b]/50 border border-gray-200 dark:dark:border-white/10 rounded-lg p-4 group hover:border-gray-200 dark:dark:border-white/10/80 transition-all"
                                            >
                                                <div
                                                    className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-4 border-b border-gray-200 dark:dark:border-white/10 pb-4"
                                                >
                                                    <div className="flex items-center gap-3 w-full">
                                                        <div
                                                            className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20"
                                                        >
                                                            <span className="text-xs font-bold">S1</span>
                                                        </div>
                                                        <div className="flex flex-col w-full">
                                                            <label
                                                                className="text-[10px] uppercase font-bold text-gray-600 dark:text-slate-300 tracking-wider"
                                                            >Session Name</label
                                                            >
                                                            <Input
                                                                placeholder="e.g. Morning"
                                                                type="text"
                                                                defaultValue="Morning Block"
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <label
                                                            className="flex items-center gap-1.5 text-xs font-medium text-primary"
                                                        >
                                                            <span className="material-symbols-outlined text-[14px]"
                                                            >login</span
                                                            >
                                                            On Duty
                                                        </label>
                                                        <TimePicker value="09:00" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label
                                                            className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-slate-300"
                                                        >
                                                            <span className="material-symbols-outlined text-[14px]"
                                                            >logout</span
                                                            >
                                                            Off Duty
                                                        </label>
                                                        <TimePicker value="13:00" />
                                                    </div>
                                                </div>
                                                <details className="mt-4 group/details">
                                                    <summary
                                                        className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-slate-300 cursor-pointer select-none hover:text-gray-600 dark:text-slate-300 transition-colors py-1"
                                                    >
                                                        <span
                                                            className="material-symbols-outlined text-[16px] transition-transform group-open/details:rotate-90"
                                                        >chevron_right</span
                                                        >
                                                        Advanced Window Settings
                                                    </summary>
                                                    <div
                                                        className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 p-3 rounded-lg bg-surface-dark border border-gray-200 dark:dark:border-white/10"
                                                    >
                                                        <div className="space-y-2">
                                                            <span
                                                                className="text-[10px] uppercase font-bold text-gray-600 dark:text-slate-300 block"
                                                            >Clock-In Window</span
                                                            >
                                                            <div className="flex gap-2">
                                                                <div className="w-full">
                                                                    <span
                                                                        className="text-[10px] text-gray-600 dark:text-slate-300 block mb-0.5"
                                                                    >Start</span
                                                                    >
                                                                    <TimePicker value="08:30" />
                                                                </div>
                                                                <div className="w-full">
                                                                    <span
                                                                        className="text-[10px] text-gray-600 dark:text-slate-300 block mb-0.5"
                                                                    >End</span
                                                                    >
                                                                    <TimePicker value="09:30" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <span
                                                                className="text-[10px] uppercase font-bold text-gray-600 dark:text-slate-300 block"
                                                            >Clock-Out Window</span
                                                            >
                                                            <div className="flex gap-2">
                                                                <div className="w-full">
                                                                    <span
                                                                        className="text-[10px] text-gray-600 dark:text-slate-300 block mb-0.5"
                                                                    >Start</span
                                                                    >
                                                                    <TimePicker value="12:30" />
                                                                </div>
                                                                <div className="w-full">
                                                                    <span
                                                                        className="text-[10px] text-gray-600 dark:text-slate-300 block mb-0.5"
                                                                    >End</span
                                                                    >
                                                                    <TimePicker value="13:30" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </details>
                                            </div>
                                            <div
                                                className= "bg-white dark:bg-[#1e293b]/50 border border-gray-200 dark:dark:border-white/10 rounded-lg p-4 group hover:border-gray-200 dark:dark:border-white/10/80 transition-all"
                                            >
                                                <div
                                                    className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-4 border-b border-gray-200 dark:dark:border-white/10 pb-4"
                                                >
                                                    <div className="flex items-center gap-3 w-full">
                                                        <div
                                                            className="size-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20"
                                                        >
                                                            <span className="text-xs font-bold">S2</span>
                                                        </div>
                                                        <div className="flex flex-col w-full">
                                                            <label
                                                                className="text-[10px] uppercase font-bold text-gray-600 dark:text-slate-300 tracking-wider"
                                                            >Session Name</label
                                                            >
                                                            <Input
                                                                placeholder="e.g. Afternoon"
                                                                type="text"
                                                                defaultValue="Afternoon Block"
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <label
                                                            className="flex items-center gap-1.5 text-xs font-medium text-primary"
                                                        >
                                                            <span className="material-symbols-outlined text-[14px]"
                                                            >login</span
                                                            >
                                                            On Duty
                                                        </label>
                                                        <TimePicker value="14:30" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label
                                                            className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-slate-300"
                                                        >
                                                            <span className="material-symbols-outlined text-[14px]"
                                                            >logout</span
                                                            >
                                                            Off Duty
                                                        </label>
                                                        <TimePicker value="18:30" />
                                                    </div>
                                                </div>
                                                <details className="mt-4 group/details">
                                                    <summary
                                                        className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-slate-300 cursor-pointer select-none hover:text-gray-600 dark:text-slate-300 transition-colors py-1"
                                                    >
                                                        <span
                                                            className="material-symbols-outlined text-[16px] transition-transform group-open/details:rotate-90"
                                                        >chevron_right</span
                                                        >
                                                        Advanced Window Settings
                                                    </summary>
                                                    <div
                                                        className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 p-3 rounded-lg bg-surface-dark border border-gray-200 dark:dark:border-white/10"
                                                    >
                                                        <div className="space-y-2">
                                                            <span
                                                                className="text-[10px] uppercase font-bold text-gray-600 dark:text-slate-300 block"
                                                            >Clock-In Window</span
                                                            >
                                                            <div className="flex gap-2">
                                                                <div className="w-full">
                                                                    <span
                                                                        className="text-[10px] text-gray-600 dark:text-slate-300 block mb-0.5"
                                                                    >Start</span
                                                                    >
                                                                    <TimePicker value="13:30" />
                                                                </div>
                                                                <div className="w-full">
                                                                    <span
                                                                        className="text-[10px] text-gray-600 dark:text-slate-300 block mb-0.5"
                                                                    >End</span
                                                                    >
                                                                    <TimePicker value="14:15" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <span
                                                                className="text-[10px] uppercase font-bold text-gray-600 dark:text-slate-300 block"
                                                            >Clock-Out Window</span
                                                            >
                                                            <div className="flex gap-2">
                                                                <div className="w-full">
                                                                    <span
                                                                        className="text-[10px] text-gray-600 dark:text-slate-300 block mb-0.5"
                                                                    >Start</span
                                                                    >
                                                                    <TimePicker value="17:15" />
                                                                </div>
                                                                <div className="w-full">
                                                                    <span
                                                                        className="text-[10px] text-gray-600 dark:text-slate-300 block mb-0.5"
                                                                    >End</span
                                                                    >
                                                                    <TimePicker value="19:00" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </details>
                                            </div>
                                        </div>
                                    </section> : null
                            }

                            <AttendanceRules />

                            <div className="w-full flex justify-end gap-3">
                                {/* Cancel Button */}
                                <button
                                    onClick={() => { }}
                                    className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                                    type="button"
                                >
                                    Cancel
                                </button>

                                {/* Save Button */}
                                <button
                                    onClick={() => { }}
                                    className="px-6 py-2.5 rounded-lg bg-indigo-600 text-gray-600 dark:text-slate-300 font-medium shadow-lg hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center gap-2"
                                    type="button"
                                >
                                    Submit
                                </button>
                            </div>


                        </div>


                    </div>

                    {/* RIGHT AREA: 30% Width */}
                    <div className="w-full lg:w-[30%] bg-white dark:bg-slate-900 border-l border-gray-200 dark:dark:border-white/10 p-6 flex flex-col gap-6 lg:min-h-full backdrop-blur-sm">
                        <LiveInsightSidebar />
                    </div>

                </div>


            </div>
        </>
    );

    return (
        <div className="">
            <div
                className="relative  dark:bg-card-dark px-12  rounded-lg "
            >
                <div className="flex justify-between items-center  px-5">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">

                    </h1>
                    <Button
                        onClick={handleGoBack}
                        variant="default"
                        className="bg-primary text-gray-600 dark:text-slate-300 hover:bg-indigo-700 transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        BACK
                    </Button>
                </div>

                <div
                    className=" sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-1 gap-8 items-start"
                >
                    <div
                        className="lg:col-span-3 bg-white p-6 rounded-2xl border border-border-light dark:border-gray-200 dark:dark:border-white/10 shadow-sm"
                    >
                        <header className="flex justify-between items-center mb-8">
                            <h1 className="text-xl font-bold text-text-strong-light dark:text-text-strong-dark">
                                Shift &amp; Schedule Management
                            </h1>

                            <div className="flex items-center space-x-3">
                                <Switch id="auto-shift" />
                                <Label
                                    htmlFor="auto-shift"
                                    className="text-sm font-medium text-text-light dark:text-text-dark"
                                >
                                    Auto Shift
                                </Label>
                            </div>
                        </header>
                        <div className="space-y-8">
                            <div
                                className="border-b border-border-light dark:border-gray-200 dark:dark:border-white/10 pb-8"
                            >
                                <h3
                                    className="text-base font-semibold text-text-strong-light dark:text-text-strong-dark mb-4"
                                >
                                    Shift Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            htmlFor="type-of-schedule"
                                        >Type of Schedule*</Label>
                                        <Select onValueChange={(value) => handleChange("shift_type_id", Number(value))}>
                                            <SelectTrigger
                                                id="type-of-schedule"
                                                className="w-full rounded-lg text-sm"
                                            >
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem defaultValue="1">Flexible</SelectItem>
                                                <SelectItem defaultValue="6">Single</SelectItem>
                                                <SelectItem defaultValue="2">Multi</SelectItem>
                                                <SelectItem defaultValue="4">Night</SelectItem>
                                                <SelectItem defaultValue="5">Dual</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            htmlFor="name-of-schedule"
                                        >Name of Schedule*</Label>
                                        <Input
                                            className="w-full rounded-lg border-border-light dark:border-gray-200 dark:dark:border-white/10 bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-sm transition-all"
                                            id="name-of-schedule"
                                            type="text"
                                            defaultValue={schedule.name}
                                            onChange={(e) => handleChange("name", e.target.value)} // ✅ fixed
                                        />
                                    </div>
                                </div>
                            </div>
                            {
                                schedule.shift_type_id === 4 || schedule.shift_type_id === 6 ?
                                    (
                                        <div
                                            className="border-b border-border-light dark:border-gray-200 dark:dark:border-white/10 pb-8"
                                        >
                                            <h3
                                                className="text-base font-semibold text-text-strong-light dark:text-text-strong-dark mb-4"
                                            >
                                                Timing Parameters
                                            </h3>
                                            <div className="grid grid-cols-3 sm:grid-cols3 gap-6">
                                                <div>
                                                    <Label
                                                        className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                                        htmlFor="on-duty-time"
                                                    >Scheduled Start Time</Label
                                                    >
                                                    <div className="relative">

                                                        <TimePicker
                                                            defaultValue={schedule.on_duty_time}
                                                            onChange={(val) => handleChange("on_duty_time", val)}
                                                        />


                                                    </div>
                                                </div>
                                                <div>
                                                    <Label
                                                        className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                                        htmlFor="beginning-in"
                                                    >Clock-in Start Window</Label>
                                                    <div className="relative">
                                                        <TimePicker
                                                            defaultValue={schedule.beginning_in}
                                                            onChange={(val) => handleChange("beginning_in", val)}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label
                                                        className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                                        htmlFor="beginning-out"
                                                    >Clock-in End Window</Label
                                                    >
                                                    <div className="relative">
                                                        <TimePicker
                                                            defaultValue={schedule.beginning_out}
                                                            onChange={(val) => handleChange("beginning_out", val)}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label
                                                        className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                                        htmlFor="off-duty-time"
                                                    >Scheduled Start End</Label
                                                    >
                                                    <div className="relative">
                                                        <TimePicker
                                                            defaultValue={schedule.off_duty_time}
                                                            onChange={(val) => handleChange("off_duty_time", val)}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label
                                                        className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                                        htmlFor="ending-in"
                                                    >Clock-out Start Window</Label>
                                                    <div className="relative">
                                                        <TimePicker
                                                            defaultValue={schedule.ending_in}
                                                            onChange={(val) => handleChange("ending_in", val)}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label
                                                        className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                                        htmlFor="ending-out"
                                                    >Clock-out End Window</Label>
                                                    <div className="relative">
                                                        <TimePicker
                                                            defaultValue={schedule.ending_out}
                                                            onChange={(val) => handleChange("ending_out", val)}
                                                        />
                                                    </div>
                                                </div>
                                                {/* <div>
                                                    <Label
                                                        className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                                        htmlFor="min-working-hrs"
                                                    >Min working hrs</Label
                                                    >
                                                    <div className="relative">
                                                        <TimePicker
                                                            defaultValue={schedule.working_hours}
                                                            onChange={(val) => handleChange("working_hours", val)}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label
                                                        className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                                        htmlFor="ot-start"
                                                    >OT start after</Label
                                                    >
                                                    <div className="relative">
                                                        <TimePicker
                                                            defaultValue={schedule.overtime_interval}
                                                            onChange={(val) => handleChange("overtime_interval", val)}
                                                        />
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    )
                                    : null
                            }


                            <div
                                className="border-b border-border-light dark:border-gray-200 dark:dark:border-white/10 pb-8"
                            >
                                <h3
                                    className="text-base font-semibold text-text-strong-light dark:text-text-strong-dark mb-4"
                                >
                                    Half Day Configuration
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                                    <div className="md:col-span-1">
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            htmlFor="half-day-weekdays"
                                        >Applicable Day</Label>

                                        <Select defaultValue="Not Applicable" onValueChange={(value) => handleChange("halfday", value)}>
                                            <SelectTrigger
                                                id="half-day-weekdays"
                                                className="w-full rounded-lg text-sm"
                                            >
                                                <SelectValue placeholder="Select day" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem defaultValue="Not Applicable">Not Applicable</SelectItem>
                                                <SelectItem defaultValue="monday">Monday</SelectItem>
                                                <SelectItem defaultValue="tuesday">Tuesday</SelectItem>
                                                <SelectItem defaultValue="wednesday">Wednesday</SelectItem>
                                                <SelectItem defaultValue="thursday">Thursday</SelectItem>
                                                <SelectItem defaultValue="friday">Friday</SelectItem>
                                                <SelectItem defaultValue="saturday">Saturday</SelectItem>
                                                <SelectItem defaultValue="sunday">Sunday</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="md:col-span-2 grid grid-cols-2 gap-6">
                                        <div>
                                            <Label
                                                className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                                htmlFor="half-day-in-time"
                                            >Start Time</Label>
                                            <div className="relative">
                                                <TimePicker
                                                    defaultValue={schedule.halfday_in_time}
                                                    onChange={(val) => handleChange("halfday_in_time", val)}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label
                                                className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                                htmlFor="half-day-out-time"
                                            >End Time</Label>
                                            <div className="relative">
                                                <TimePicker
                                                    defaultValue={schedule.halfday_out_time}
                                                    onChange={(val) => handleChange("halfday_out_time", val)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="border-b border-border-light dark:border-gray-200 dark:dark:border-white/10 pb-8"
                            >
                                <h3
                                    className="text-base font-semibold text-text-strong-light dark:text-text-strong-dark mb-4"
                                >
                                    Workday Configuration
                                </h3>
                                <div className="">
                                    <DaysSelector schedule={schedule} setSchedule={setSchedule} />
                                </div>
                            </div>
                            <div
                                className="border-b border-border-light dark:border-gray-200 dark:dark:border-white/10 pb-8"
                            >
                                <h3
                                    className="text-base font-semibold text-text-strong-light dark:text-text-strong-dark mb-4"
                                >
                                    Monthly Flexible Holiday
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            htmlFor="grace-period-cin"
                                        >Monthly Allowance</Label>
                                        <div className="relative">
                                            <Select
                                                defaultValue={String(schedule.monthly_flexi_holidays)}                // number -> string
                                                onValueChange={(val) =>
                                                    handleChange("monthly_flexi_holidays", parseInt(val, 10))    // string -> number
                                                }
                                            >
                                                <SelectTrigger className="w-full rounded-lg text-sm">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem defaultValue="0">Not Applicable</SelectItem>
                                                    <SelectItem defaultValue="1">1</SelectItem>
                                                    <SelectItem defaultValue="2">2</SelectItem>
                                                    <SelectItem defaultValue="3">3</SelectItem>
                                                    <SelectItem defaultValue="4">4</SelectItem>
                                                    <SelectItem defaultValue="5">5</SelectItem>
                                                    <SelectItem defaultValue="6">6</SelectItem>
                                                    <SelectItem defaultValue="7">7</SelectItem>
                                                    <SelectItem defaultValue="8">8</SelectItem>
                                                    <SelectItem defaultValue="9">9</SelectItem>
                                                    <SelectItem defaultValue="10">10</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <span
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-sm text-text-light dark:text-text-dark"
                                            >Days</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="border-b border-border-light dark:border-gray-200 dark:dark:border-white/10 pb-8"
                            >
                                <h3
                                    className="text-base font-semibold text-text-strong-light dark:text-text-strong-dark mb-4"
                                >
                                    Grace Period &amp; Overtime
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            htmlFor="grace-period-cin"
                                        >Grace Period for Check-in (CIN)</Label
                                        >
                                        <div className="relative">
                                            <TimePicker
                                                defaultValue={schedule.overtime_interval}
                                                onChange={(val) => handleChange("late_time", val)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            htmlFor="grace-period-cout"
                                        >Grace Period for Check-out (COUT)</Label
                                        >
                                        <div className="relative">
                                            <TimePicker
                                                defaultValue={schedule.overtime_interval}
                                                onChange={(val) => handleChange("late_time", val)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            htmlFor="grace-period-cout"
                                        >OT start after</Label>
                                        <div className="relative">
                                            <TimePicker
                                                defaultValue={schedule.overtime_interval}
                                                onChange={(val) => handleChange("overtime_interval", val)}
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 space-y-4">
                                        {/* <div>
                                            <Label
                                                className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                                htmlFor="overtime-threshold"
                                            >Calculate Overtime after</Label
                                            >
                                            <div className="relative">
                                                <Input
                                                    className="w-full rounded-lg border-border-light dark:border-gray-200 dark:dark:border-white/10 bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] pr-16 text-sm transition-all"
                                                    id="overtime-threshold"
                                                    type="number"
                                                    defaultValue="30"
                                                />
                                                <span
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-sm text-text-light dark:text-text-dark"
                                                >minutes</span
                                                >
                                            </div>
                                        </div> */}
                                        <div>
                                            <Label
                                                className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            >Apply Overtime to</Label
                                            >
                                            <div className="flex items-center space-x-6">
                                                <div className="flex items-center mt-5">
                                                    <RadioGroup
                                                        defaultValue={schedule.overtime_type} // 👈 controlled value
                                                        onValueChange={(value) => handleChange("overtime_type", value)} // 👈 gets selected option
                                                        className="flex flex-row items-center gap-6"
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem defaultValue="None" id="None" />
                                                            <Label htmlFor="None">None</Label>
                                                        </div>

                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem defaultValue="Both" id="Both" />
                                                            <Label htmlFor="Both">Both</Label>
                                                        </div>

                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem defaultValue="Before Duty" id="BeforeDuty" />
                                                            <Label htmlFor="BeforeDuty">Before Duty</Label>
                                                        </div>

                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem defaultValue="After Duty" id="AfterDuty" />
                                                            <Label htmlFor="AfterDuty">After Duty</Label>
                                                        </div>
                                                    </RadioGroup>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-8">
                                <h3
                                    className="text-base font-semibold text-text-strong-light dark:text-text-strong-dark mb-6"
                                >
                                    Attendance Rules
                                </h3>
                                <div className="space-y-4">
                                    <div
                                        className="bg-background-light dark:bg-gray-800/50 p-4 rounded-xl border border-border-light dark:border-gray-200 dark:dark:border-white/10 transition-all hover:shadow-lg hover:border-[var(--primary)]/50"
                                    >
                                        <div
                                            className="flex items-center justify-between gap-4 flex-wrap mb-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/40"
                                                >
                                                    <span
                                                        className="material-icons text-lg text-orange-500 dark:text-orange-400"
                                                    >running_with_errors</span
                                                    >
                                                </div>
                                                <div>
                                                    <p
                                                        className="font-semibold text-text-strong-light dark:text-text-strong-dark"
                                                    >
                                                        Tardiness Threshold
                                                    </p>
                                                    <p className="text-xs text-text-light dark:text-text-dark">
                                                        Mark as absent if clock-in is late.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="bg-white dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-gray-200 dark:dark:border-white/10 space-y-4"
                                        >
                                            <div className="flex items-center gap-4 flex-wrap">
                                                <p className="text-sm text-text-light dark:text-text-dark">
                                                    If late by more than
                                                </p>
                                                <div className="relative w-44">
                                                    <TimePicker
                                                        defaultValue={schedule.absent_min_in}
                                                        onChange={(val) => handleChange("absent_min_in", val)}
                                                    />
                                                </div>
                                                <p className="text-sm text-text-light dark:text-text-dark">
                                                    , mark status as
                                                </p>
                                                <div className="relative">
                                                    <Select defaultValue={schedule.attendanc_rule_late_coming} onChange={(e) => handleChange("attendanc_rule_late_coming", e.target.value)}>
                                                        <SelectTrigger className="w-full rounded-lg text-sm">
                                                            <SelectValue placeholder="Select type" />
                                                        </SelectTrigger>

                                                        <SelectContent>
                                                            <SelectItem defaultValue="absent">Absent</SelectItem>
                                                            <SelectItem defaultValue="present">Present</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <span
                                                        className="material-icons absolute right-2 top-1/2 -translate-y-1/2 text-text-light dark:text-text-dark pointer-events-none text-base"
                                                    >expand_more</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="bg-background-light dark:bg-gray-800/50 p-4 rounded-xl border border-border-light dark:border-gray-200 dark:dark:border-white/10 transition-all hover:shadow-lg hover:border-[var(--primary)]/50"
                                    >
                                        <div
                                            className="flex items-center justify-between gap-4 flex-wrap mb-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-900/40"
                                                >
                                                    <span
                                                        className="material-icons text-lg text-sky-500 dark:text-sky-400"
                                                    >directions_walk</span
                                                    >
                                                </div>
                                                <div>
                                                    <p
                                                        className="font-semibold text-text-strong-light dark:text-text-strong-dark"
                                                    >
                                                        Early Departure Threshold
                                                    </p>
                                                    <p className="text-xs text-text-light dark:text-text-dark">
                                                        Mark as absent if clock-out is early.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="bg-white dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-gray-200 dark:dark:border-white/10 space-y-4"
                                        >
                                            <div className="flex items-center gap-4 flex-wrap">
                                                <p className="text-sm text-text-light dark:text-text-dark">
                                                    If early by more than
                                                </p>
                                                <div className="relative w-44">
                                                    <TimePicker
                                                        defaultValue={schedule.absent_min_out}
                                                        onChange={(val) => handleChange("absent_min_out", val)}
                                                    />
                                                </div>
                                                <p className="text-sm text-text-light dark:text-text-dark">
                                                    , mark status as
                                                </p>
                                                <div className="relative">

                                                    <Select defaultValue={schedule.attendanc_rule_early_going} onChange={(e) => handleChange("attendanc_rule_early_going", e.target.value)}>
                                                        <SelectTrigger className="w-full rounded-lg text-sm">
                                                            <SelectValue placeholder="Select type" />
                                                        </SelectTrigger>

                                                        <SelectContent>
                                                            <SelectItem defaultValue="absent">Absent</SelectItem>
                                                            <SelectItem defaultValue="present">Present</SelectItem>
                                                        </SelectContent>
                                                    </Select>


                                                    <span
                                                        className="material-icons absolute right-2 top-1/2 -translate-y-1/2 text-text-light dark:text-text-dark pointer-events-none text-base"
                                                    >expand_more</span
                                                    >
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {globalError && (
                            <div className="p-3 mt-5 border border-red-500 bg-red-50 text-red-700 rounded-lg" role="alert">
                                {globalError}
                            </div>
                        )}

                        <div className="mt-5 flex justify-end space-x-4">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleCancel}
                            >
                                CANCEL
                            </Button>
                            <Button
                                type="submit"
                                className="bg-primary hover:bg-indigo-700"
                                disabled={isSubmitting}
                                onClick={onSubmit}
                            >
                                {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ShiftCreate;
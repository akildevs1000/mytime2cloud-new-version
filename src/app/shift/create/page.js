"use client";

import React, { useState } from 'react';
import { SuccessDialog } from "@/components/SuccessDialog"; // Import the new component
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Button } from "@/components/ui/button";
import Input from "@/components/Theme/Input";

import {
    BadgeCheck, ArrowLeft, Clock,
    Sunrise,
    Moon,
    Fingerprint,
    Settings2,
    Contrast,
    PartyPopper,
    Hourglass,
    CircleDollarSign,
    ChevronLeft,
    ChevronRight,
    TimerIcon

} from "lucide-react";
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
import TimePicker from '@/components/Theme/TimePicker';


import DaysSelector from "@/components/DaysSelector";
import LiveInsightSidebar from '@/components/Shift/LiveInsightSidebar';
import Dropdown from '@/components/Theme/DropDown';


const ShiftCreate = () => {

    const [selectedBranch, setSelectedBranch] = useState({ name: "Select All", id: "" });
    const [currentPage, setCurrentPage] = useState({ name: "Select All", id: "" });


    const [shiftType, selectedShiftType] = useState({ id: "", name: "" });

    const [validDays, setValidDays] = useState(['F', 'S']);
    const days = [
        { label: 'M', full: 'Monday' },
        { label: 'T', full: 'Tuesday' },
        { label: 'W', full: 'Wednesday' },
        { label: 'T', full: 'Thursday' },
        { label: 'F', full: 'Friday' },
        { label: 'S', full: 'Saturday' },
        { label: 'S', full: 'Sunday' },
    ];

    const toggleDay = (dayLabel) => {
        setValidDays(prev =>
            prev.includes(dayLabel)
                ? prev.filter(d => d !== dayLabel)
                : [...prev, dayLabel]
        );
    };

    const [shiftName, setShiftName] = useState("General Shift A - Morning");
    const [isAutoShift, setIsAutoShift] = useState(true);

    const [isUnlimited, setIsUnlimited] = useState(true);

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
            <div className="p-5 overflow-y-auto  max-h-[900px]">
                <header className="h-16 border-b border-gray-200 dark:border-white/20 bg-white dark:bg-slate-900 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-600 dark:text-gray-300 tracking-tight">
                            Shift Configuration
                        </h2>
                        <p className="text-xs text-gray-400 hidden sm:block">
                            Manage timings, policies, and attendance rules for "General Shift A"
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center justify-center gap-2 h-9 px-4 rounded-lg border border-gray-200 dark:border-white/20 bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-300 text-sm font-medium transition-all hover:bg-primary dark:hover:bg-primary hover:text-white dark:text-white">
                            <span className="material-symbols-outlined text-[18px]">history</span>
                            <span className="hidden sm:inline">History</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 h-9 px-4 rounded-lg border border-gray-200 dark:border-white/20 bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-300 text-sm font-medium transition-all hover:bg-primary dark:hover:bg-primary hover:text-white dark:text-white">
                            <span className="material-symbols-outlined text-[18px]">ios_share</span>
                            <span className="hidden sm:inline">Export</span>
                        </button>
                    </div>
                </header>

                {/* Main Content Wrapper - Set to flex-row on lg screens */}
                <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-white dark:bg-slate-900">

                    {/* LEFT AREA: 70% Width */}
                    <div className="w-full lg:w-[70%] p-6 pb-24">
                        <div className="mx-auto lg:mx-0 space-y-8">

                            <section className="space-y-4">
                                <h3 className="text-lg font-bold text-gray-600 dark:text-slate-300 flex items-center gap-2">
                                    <BadgeCheck className="w-5 h-5 text-primary" />
                                    Shift Identity
                                </h3>

                                <div className="border dark:border-white/10 rounded-xl p-5">
                                    <label className="flex flex-col w-full gap-2">
                                        <span className="text-sm font-medium text-slate-400">Shift Type</span>
                                    </label>

                                    <div className='mt-3'>
                                        <Dropdown
                                            items={[
                                                { "id": "1", "name": "Flexible" },
                                                { "id": "6", "name": "Single" },
                                                { "id": "2", "name": "Multi" },
                                                { "id": "4", "name": "Night" },
                                                { "id": "5", "name": "Dual" }
                                            ]
                                            }
                                            selectedItem={shiftType}
                                            onSelect={(item) => {
                                                selectedShiftType(item);
                                            }}
                                            placeholder="Select Shift Type"
                                            width="w-full"
                                        />
                                    </div>

                                    <div className="mt-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">


                                        {/* Shift Name Input */}
                                        <label className="flex flex-col w-full sm:w-2/3 gap-2">
                                            <span className="text-sm font-medium text-slate-400">Shift Name</span>

                                            <Input
                                                type="text"
                                                value={shiftName}
                                                onChange={(e) => setShiftName(e.target.value)}
                                                placeholder="Enter shift name"
                                            />
                                        </label>

                                        {/* Auto-Shift Toggle */}
                                        <div className="flex flex-col gap-2 w-full sm:w-auto">
                                            <span className="text-sm font-medium text-slate-400">Auto-Shift Mode</span>
                                            <label className="relative flex items-center cursor-pointer gap-3 p-2 rounded-lg bg-[#0f172a] border border-white/10 w-full sm:w-auto hover:bg-[#161e31] transition-colors">
                                                <div
                                                    onClick={() => setIsAutoShift(!isAutoShift)}
                                                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${isAutoShift ? 'bg-emerald-500' : 'bg-slate-700'}`}
                                                >
                                                    <input type="checkbox" className="sr-only" checked={isAutoShift} readOnly />
                                                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAutoShift ? 'translate-x-5' : 'translate-x-0'}`} />
                                                </div>
                                                <span className="text-sm text-white font-medium select-none">{isAutoShift ? 'Enabled' : 'Disabled'}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="space-y-4">
                                {/* Section Header */}
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-gray-600 dark:text-slate-300 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-primary" />
                                        Flexible Work Window
                                    </h3>
                                    {/* <span className="text-xs font-mono bg-[#1e293b] border border-white/10 px-2 py-1 rounded text-slate-400">
                                        Open Window
                                    </span> */}
                                </div>

                                <div className="border dark:border-white/10 rounded-xl p-5">

                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 relative z-10">
                                        <div>
                                            <h4 className="text-gray-600 dark:text-slate-900 font-semibold text-lg tracking-tight">Global Availability Range</h4>
                                            <p className="text-sm text-slate-400 mt-1 max-w-md">
                                                Define the operational window for staff clock-in and clock-out activities.
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 mt-4 sm:mt-0 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                                                System Active
                                            </span>
                                        </div>
                                    </div>
                                    {/* Added "gap-8" for spacing and "items-start" for alignment */}
                                    <div className="flex w-full gap-8">

                                        {/* Each child gets "flex-1" to consume exactly 50% of the available space */}
                                        <div className="space-y-3 flex-1">
                                            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/80">
                                                <Sunrise size={16} className="text-primary" /> Window Open
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Clock size={18} className="text-slate-500 group-focus-within:text-primary transition-colors" />
                                                </div>
                                                <TimePicker
                                                    value={schedule.on_duty_time}
                                                    onChange={(val) => handleChange("on_duty_time", val)}
                                                />
                                            </div>
                                            <p className="text-[10px] text-slate-500 italic">Earliest allowed start time for shifts</p>
                                        </div>

                                        <div className="space-y-3 flex-1">
                                            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                                                <Moon size={16} /> Window Close
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Clock size={18} className="text-slate-500 group-focus-within:text-white transition-colors" />
                                                </div>
                                                <TimePicker
                                                    value={schedule.off_duty_time}
                                                    onChange={(val) => handleChange("off_duty_time", val)}
                                                />
                                            </div>
                                            <p className="text-[10px] text-slate-500 italic">Latest allowed end time for shifts</p>
                                        </div>
                                    </div>



                                </div>

                                <div className="border dark:border-white/10 rounded-xl p-5  flex flex-col gap-6">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                                        <h4 className="text-gray-600 dark:text-slate-300 font-semibold flex items-center gap-2">
                                            <Fingerprint size={20} className="text-primary" />
                                            Multi-Punch Policy
                                        </h4>

                                        {/* Toggle Switch */}
                                        <label className="relative flex items-center cursor-pointer gap-2 p-1.5 pr-3 rounded-full  border border-gray-200 dark:border-white/10 hover:border-slate-500 transition-colors">
                                            <div className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${isUnlimited ? 'bg-primary' : 'bg-gray-400'}`}>
                                                <Input
                                                    type="checkbox"
                                                    className="peer sr-only"
                                                    checked={isUnlimited}
                                                    onChange={() => setIsUnlimited(!isUnlimited)}
                                                />
                                                <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${isUnlimited ? 'translate-x-4 bg-emerald-400' : 'translate-x-0'} ${isUnlimited ? 'bg-white' : 'bg-slate-400'}`} />
                                            </div>
                                            <span className="text-xs text-gray-600 dark:text-slate-300 font-medium select-none">Allow Unlimited In/Out</span>
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                                        {/* Target Daily Hours */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-slate-400 block">Target Daily Hours</label>
                                            <div className="relative">
                                                <Input defaultValue="8" />
                                                <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-medium">HRS</span>
                                            </div>
                                            <p className="text-[10px] text-slate-500">Expected total duration per day</p>
                                        </div>

                                        {/* Min Session Duration */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-slate-400 block">Minimum Session Duration</label>
                                            <div className="relative">
                                                <Input defaultValue="30" />
                                                <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-medium">MIN</span>
                                            </div>
                                            <p className="text-[10px] text-slate-500">Prevent accidental short punches</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="space-y-4">
                                {/* Header */}
                                <h3 className="text-lg font-bold text-gray-600 dark:text-slate-300 flex items-center gap-2">
                                    <Settings2 className="w-5 h-5 text-primary" />
                                    Policies & Exceptions
                                </h3>

                                {/* Main Container */}
                                <div className="border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">

                                    {/* Row 1: Half Day */}
                                    <div className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors group">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 min-w-[200px]">
                                                <div className="size-9 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                                    <Contrast size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-600 dark:text-slate-300">Half Day</p>
                                                    <p className="text-xs text-slate-400">Weekly short duration</p>
                                                </div>
                                            </div>

                                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <Dropdown
                                                    items={[
                                                        { "id": "1", "name": "Saturday" },
                                                        { "id": "2", "name": "Friday" },
                                                        { "id": "3", "name": "Sunday" },
                                                    ]
                                                    }
                                                    selectedItem={shiftType}
                                                    onSelect={(item) => {
                                                        selectedShiftType(item);
                                                    }}
                                                    placeholder="Select Shift Type"
                                                    width="w-full"
                                                />

                                                <Input
                                                    type="text"
                                                    value={"09:00"}
                                                    onChange={(e) => setShiftName(e.target.value)}
                                                    placeholder="Enter shift name"
                                                />



                                                <TimePicker
                                                    value={"09:00"}
                                                    onChange={(val) => handleChange("off_duty_time", val)}
                                                />

                                                <TimePicker
                                                    value={"13:00"}
                                                    onChange={(val) => handleChange("off_duty_time", val)}
                                                />

                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 2: Flexi-Holidays */}
                                    <div className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 min-w-[200px]">
                                                <div className="size-9 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center">
                                                    <PartyPopper size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-600 dark:text-slate-300">Flexi-Holidays</p>
                                                    <p className="text-xs text-slate-400">Allowance & Validity</p>
                                                </div>
                                            </div>

                                            <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:items-center">
                                                <div className="flex items-center gap-3">
                                                    <Input width="w-[80px]" type="number" defaultValue="2" />
                                                    <span className="text-sm text-slate-400">days /</span>

                                                    <Dropdown
                                                        items={[
                                                            { "id": "1", "name": "Monthly" },
                                                            { "id": "2", "name": "Weekly" },
                                                        ]
                                                        }
                                                        selectedItem={shiftType}
                                                        onSelect={(item) => {
                                                            selectedShiftType(item);
                                                        }}
                                                        placeholder="Select Shift Type"
                                                        width="w-full"
                                                    />


                                                </div>

                                                <div className="hidden lg:block w-px h-6 bg-white/10 mx-2"></div>

                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Valid on:</span>
                                                    <div className="flex gap-1">
                                                        {days.map((day, idx) => (
                                                            <button
                                                                key={idx}
                                                                onClick={() => toggleDay(day.label)}
                                                                className={`size-7 flex items-center justify-center rounded border text-[10px] font-bold transition-all ${validDays.includes(day.label)
                                                                    ? 'border-purple-500 bg-purple-500/20 text-purple-400'
                                                                    : 'border-white/10 bg-[#0f172a] text-slate-500 hover:border-slate-400'
                                                                    }`}
                                                                title={day.full}
                                                            >
                                                                {day.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 3: Late Threshold */}
                                    <div className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 min-w-[200px]">
                                                <div className="size-9 rounded bg-orange-500/20 text-orange-400 flex items-center justify-center">
                                                    <Hourglass size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-600 dark:text-slate-300">Late Threshold</p>
                                                    <p className="text-xs text-slate-400">Action after grace period</p>
                                                </div>
                                            </div>

                                            <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-slate-400">After</span>
                                                    <input type="number" defaultValue="15" className="w-16 rounded-lg bg-[#0f172a] border border-white/10 text-white text-sm p-2 text-center outline-none" />
                                                    <span className="text-sm text-slate-400">mins</span>
                                                </div>
                                                <div className="flex items-center gap-2 flex-1">
                                                    <span className="text-sm text-slate-400 whitespace-nowrap">Mark as</span>
                                                    <select className="w-full max-w-[200px] rounded-lg bg-[#0f172a] border border-white/10 text-white text-sm p-2 outline-none">
                                                        <option>Late In</option>
                                                        <option>Absent</option>
                                                        <option>Half Day</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 4: Overtime Rules */}
                                    <div className="p-4 hover:bg-white/5 transition-colors">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 min-w-[200px]">
                                                <div className="size-9 rounded bg-emerald-500/20 text-primary flex items-center justify-center">
                                                    <CircleDollarSign size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-600 dark:text-slate-300">Overtime Rules</p>
                                                    <p className="text-xs text-slate-400">Eligible hours</p>
                                                </div>
                                            </div>

                                            <div className="flex-1 flex gap-3">
                                                {['Pre-shift', 'After Duty'].map((label) => (
                                                    <label key={label} className="flex-1 sm:flex-none cursor-pointer flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-[#0f172a] transition-all has-[:checked]:border-emerald-500/50 has-[:checked]:bg-emerald-500/10 group">
                                                        <input type="checkbox" defaultChecked className="hidden" />
                                                        {label === 'Pre-shift' ? <ChevronLeft size={16} className="text-slate-500 group-has-[:checked]:text-primary" /> : <ChevronRight size={16} className="text-slate-500 group-has-[:checked]:text-primary" />}
                                                        <span className="text-sm font-medium text-slate-300 group-has-[:checked]:text-white">{label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </section>
                        </div>
                    </div>

                    {/* RIGHT AREA: 30% Width */}
                    <div className="w-full lg:w-[30%] bg-slate-900/50 border-l border-gray-200 dark:border-white/10 p-6 flex flex-col gap-6 lg:min-h-full backdrop-blur-sm">
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
                        className="bg-primary text-white hover:bg-indigo-700 transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        BACK
                    </Button>
                </div>

                <div
                    className=" sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-1 gap-8 items-start"
                >
                    <div
                        className="lg:col-span-3 bg-white p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm"
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
                                className="border-b border-border-light dark:border-border-dark pb-8"
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
                                                <SelectItem value="1">Flexible</SelectItem>
                                                <SelectItem value="6">Single</SelectItem>
                                                <SelectItem value="2">Multi</SelectItem>
                                                <SelectItem value="4">Night</SelectItem>
                                                <SelectItem value="5">Dual</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            htmlFor="name-of-schedule"
                                        >Name of Schedule*</Label>
                                        <Input
                                            className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-sm transition-all"
                                            id="name-of-schedule"
                                            type="text"
                                            value={schedule.name}
                                            onChange={(e) => handleChange("name", e.target.value)} // ✅ fixed
                                        />
                                    </div>
                                </div>
                            </div>
                            {
                                schedule.shift_type_id === 4 || schedule.shift_type_id === 6 ?
                                    (
                                        <div
                                            className="border-b border-border-light dark:border-border-dark pb-8"
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
                                                            value={schedule.on_duty_time}
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
                                                            value={schedule.beginning_in}
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
                                                            value={schedule.beginning_out}
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
                                                            value={schedule.off_duty_time}
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
                                                            value={schedule.ending_in}
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
                                                            value={schedule.ending_out}
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
                                                            value={schedule.working_hours}
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
                                                            value={schedule.overtime_interval}
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
                                className="border-b border-border-light dark:border-border-dark pb-8"
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
                                                <SelectItem value="Not Applicable">Not Applicable</SelectItem>
                                                <SelectItem value="monday">Monday</SelectItem>
                                                <SelectItem value="tuesday">Tuesday</SelectItem>
                                                <SelectItem value="wednesday">Wednesday</SelectItem>
                                                <SelectItem value="thursday">Thursday</SelectItem>
                                                <SelectItem value="friday">Friday</SelectItem>
                                                <SelectItem value="saturday">Saturday</SelectItem>
                                                <SelectItem value="sunday">Sunday</SelectItem>
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
                                                    value={schedule.halfday_in_time}
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
                                                    value={schedule.halfday_out_time}
                                                    onChange={(val) => handleChange("halfday_out_time", val)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="border-b border-border-light dark:border-border-dark pb-8"
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
                                className="border-b border-border-light dark:border-border-dark pb-8"
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
                                                value={String(schedule.monthly_flexi_holidays)}                // number -> string
                                                onValueChange={(val) =>
                                                    handleChange("monthly_flexi_holidays", parseInt(val, 10))    // string -> number
                                                }
                                            >
                                                <SelectTrigger className="w-full rounded-lg text-sm">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="0">Not Applicable</SelectItem>
                                                    <SelectItem value="1">1</SelectItem>
                                                    <SelectItem value="2">2</SelectItem>
                                                    <SelectItem value="3">3</SelectItem>
                                                    <SelectItem value="4">4</SelectItem>
                                                    <SelectItem value="5">5</SelectItem>
                                                    <SelectItem value="6">6</SelectItem>
                                                    <SelectItem value="7">7</SelectItem>
                                                    <SelectItem value="8">8</SelectItem>
                                                    <SelectItem value="9">9</SelectItem>
                                                    <SelectItem value="10">10</SelectItem>
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
                                className="border-b border-border-light dark:border-border-dark pb-8"
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
                                                value={schedule.overtime_interval}
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
                                                value={schedule.overtime_interval}
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
                                                value={schedule.overtime_interval}
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
                                                    className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] pr-16 text-sm transition-all"
                                                    id="overtime-threshold"
                                                    type="number"
                                                    value="30"
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
                                                        value={schedule.overtime_type} // 👈 controlled value
                                                        onValueChange={(value) => handleChange("overtime_type", value)} // 👈 gets selected option
                                                        className="flex flex-row items-center gap-6"
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="None" id="None" />
                                                            <Label htmlFor="None">None</Label>
                                                        </div>

                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="Both" id="Both" />
                                                            <Label htmlFor="Both">Both</Label>
                                                        </div>

                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="Before Duty" id="BeforeDuty" />
                                                            <Label htmlFor="BeforeDuty">Before Duty</Label>
                                                        </div>

                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="After Duty" id="AfterDuty" />
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
                                        className="bg-background-light dark:bg-gray-800/50 p-4 rounded-xl border border-border-light dark:border-border-dark transition-all hover:shadow-lg hover:border-[var(--primary)]/50"
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
                                            className="bg-white dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-border-dark space-y-4"
                                        >
                                            <div className="flex items-center gap-4 flex-wrap">
                                                <p className="text-sm text-text-light dark:text-text-dark">
                                                    If late by more than
                                                </p>
                                                <div className="relative w-44">
                                                    <TimePicker
                                                        value={schedule.absent_min_in}
                                                        onChange={(val) => handleChange("absent_min_in", val)}
                                                    />
                                                </div>
                                                <p className="text-sm text-text-light dark:text-text-dark">
                                                    , mark status as
                                                </p>
                                                <div className="relative">
                                                    <Select value={schedule.attendanc_rule_late_coming} onChange={(e) => handleChange("attendanc_rule_late_coming", e.target.value)}>
                                                        <SelectTrigger className="w-full rounded-lg text-sm">
                                                            <SelectValue placeholder="Select type" />
                                                        </SelectTrigger>

                                                        <SelectContent>
                                                            <SelectItem value="absent">Absent</SelectItem>
                                                            <SelectItem value="present">Present</SelectItem>
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
                                        className="bg-background-light dark:bg-gray-800/50 p-4 rounded-xl border border-border-light dark:border-border-dark transition-all hover:shadow-lg hover:border-[var(--primary)]/50"
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
                                            className="bg-white dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-border-dark space-y-4"
                                        >
                                            <div className="flex items-center gap-4 flex-wrap">
                                                <p className="text-sm text-text-light dark:text-text-dark">
                                                    If early by more than
                                                </p>
                                                <div className="relative w-44">
                                                    <TimePicker
                                                        value={schedule.absent_min_out}
                                                        onChange={(val) => handleChange("absent_min_out", val)}
                                                    />
                                                </div>
                                                <p className="text-sm text-text-light dark:text-text-dark">
                                                    , mark status as
                                                </p>
                                                <div className="relative">

                                                    <Select value={schedule.attendanc_rule_early_going} onChange={(e) => handleChange("attendanc_rule_early_going", e.target.value)}>
                                                        <SelectTrigger className="w-full rounded-lg text-sm">
                                                            <SelectValue placeholder="Select type" />
                                                        </SelectTrigger>

                                                        <SelectContent>
                                                            <SelectItem value="absent">Absent</SelectItem>
                                                            <SelectItem value="present">Present</SelectItem>
                                                        </SelectContent>
                                                    </Select>


                                                    <span
                                                        className="material-icons absolute right-2 top-1/2 -translate-y-1/2 text-text-light dark:text-text-dark pointer-events-none text-base"
                                                    >expand_more</span
                                                    >
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 flex-wrap pl-1.5">
                                                <p className="text-sm text-text-light dark:text-text-dark">
                                                    Hours early:
                                                </p>
                                                <div
                                                    className="flex items-center gap-2 p-2 rounded-lg bg-background-light dark:bg-gray-800/50 border border-border-light dark:border-border-dark"
                                                >
                                                    <span
                                                        className="material-icons text-base text-sky-500"
                                                    >hourglass_top</span
                                                    >
                                                    <p
                                                        className="text-sm font-medium text-text-strong-light dark:text-text-strong-dark"
                                                    >
                                                        1.0 hr
                                                    </p>
                                                    <span className="text-xs text-text-light dark:text-text-dark"
                                                    >(calculated)</span
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
                    <SuccessDialog
                        open={open}
                        onOpenChange={setOpen}
                        title="Shift Saved"
                        description="Your Shift information has been inserted successfully."
                    />
                </div>
            </div>
        </div>
    );
};

export default ShiftCreate;
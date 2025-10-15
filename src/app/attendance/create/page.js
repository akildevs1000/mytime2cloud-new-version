"use client";

import React, { useEffect, useRef, useState } from 'react';
import { SuccessDialog } from "@/components/SuccessDialog"; // Import the new component

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Clock,
    Coffee,
    AlarmClock,
    CheckCircle2,
    FileText,
    Briefcase, Phone, ArrowLeft, Upload, Calendar as CalenddarIcon, CalendarIcon
} from "lucide-react";
import { addTimes, cn, convertFileToBase64 } from "@/lib/utils";
import { useRouter } from 'next/navigation';

import { getBranches, getDepartments, parseApiError, storeEmployee, storeShift } from '@/lib/api';
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


const EmployeeProfileForm = () => {

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
        "to_date": "2026-10-14T15:54:18.428Z"
    });

    const handleChange = (key, value) => {
        console.log("🚀 ~ handleChange ~ key, value:", key, value)
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
                    className=" sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"
                >
                    <div
                        className="lg:col-span-3 bg-card-light dark:bg-card-dark p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm"
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
                                        <Select>
                                            <SelectTrigger
                                                id="type-of-schedule"
                                                className="w-full rounded-lg text-sm"
                                            >
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="single">Single</SelectItem>
                                                <SelectItem value="double">Double</SelectItem>
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
                            <div
                                className="border-b border-border-light dark:border-border-dark pb-8"
                            >
                                <h3
                                    className="text-base font-semibold text-text-strong-light dark:text-text-strong-dark mb-4"
                                >
                                    Time Configuration
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            htmlFor="on-duty-time"
                                        >On Duty Time</Label
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
                                            htmlFor="off-duty-time"
                                        >Off Duty Time</Label
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
                                    </div>
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            htmlFor="beginning-in"
                                        >Beginning In</Label
                                        >
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
                                        >Beginning Out</Label
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
                                            htmlFor="ending-in"
                                        >Ending In</Label
                                        >
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
                                        >Ending Out</Label
                                        >
                                        <div className="relative">
                                            <TimePicker
                                                value={schedule.ending_out}
                                                onChange={(val) => handleChange("ending_out", val)}
                                            />
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
                                    Half Day Configuration
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                                    <div className="md:col-span-1">
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            htmlFor="half-day-weekdays"
                                        >Half Day Setting</Label
                                        >

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
                                            >In Time</Label
                                            >
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
                                            >Out Time</Label
                                            >
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
                                    Working Days Status
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
                                            <Input
                                                className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] pr-16 text-sm transition-all"
                                                id="grace-period-cin"
                                                type="number"
                                                value={schedule.late_time}
                                                onChange={(e) => handleChange("late_time", e.target.value)} // ✅ fixed
                                            />
                                            <span
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-sm text-text-light dark:text-text-dark"
                                            >minutes</span>
                                        </div>
                                    </div>
                                    <div>
                                        <Label
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                            htmlFor="grace-period-cout"
                                        >Grace Period for Check-out (COUT)</Label
                                        >
                                        <div className="relative">
                                            <Input
                                                className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] pr-16 text-sm transition-all"
                                                id="grace-period-cout"
                                                type="number"
                                                value={schedule.early_time}
                                                onChange={(e) => handleChange("early_time", e.target.value)} // ✅ fixed
                                            />
                                            <span
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-sm text-text-light dark:text-text-dark"
                                            >minutes</span
                                            >
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
                                                <div className="flex items-center">
                                                    <Input
                                                        checked=""
                                                        className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)] border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-offset-gray-800"
                                                        id="ot-before"
                                                        name="ot-apply"
                                                        type="radio"
                                                    />
                                                    <Label
                                                        className="ml-2 block text-sm text-text-strong-light dark:text-text-strong-dark"
                                                        htmlFor="ot-before"
                                                    >Before Duty</Label
                                                    >
                                                </div>
                                                <div className="flex items-center">
                                                    <Input
                                                        className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)] border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-offset-gray-800"
                                                        id="ot-after"
                                                        name="ot-apply"
                                                        type="radio"
                                                    />
                                                    <Label
                                                        className="ml-2 block text-sm text-text-strong-light dark:text-text-strong-dark"
                                                        htmlFor="ot-after"
                                                    >After Duty</Label
                                                    >
                                                </div>
                                                <div className="flex items-center">
                                                    <Input
                                                        className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)] border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-offset-gray-800"
                                                        id="ot-both"
                                                        name="ot-apply"
                                                        type="radio"
                                                    />
                                                    <Label
                                                        className="ml-2 block text-sm text-text-strong-light dark:text-text-strong-dark"
                                                        htmlFor="ot-both"
                                                    >Both</Label
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <h3
                                    className="text-base font-semibold text-text-strong-light dark:text-text-strong-dark mb-4"
                                >
                                    Conditional Rules
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between gap-4">
                                        <Label
                                            className="flex-grow text-sm text-text-strong-light dark:text-text-strong-dark whitespace-nowrap"
                                            htmlFor="absent-for-in-threshold"
                                        >Mark as Absent for In after</Label
                                        >
                                        <div className="relative w-48">
                                            <TimePicker
                                                value={schedule.absent_min_in}
                                                onChange={(val) => handleChange("absent_min_in", val)}
                                            />
                                        </div>
                                        <div className="relative">
                                            <Switch id="late-exceeds-absent" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <Label
                                            className="flex-grow text-sm text-text-strong-light dark:text-text-strong-dark whitespace-nowrap"
                                            htmlFor="absent-for-out-threshold"
                                        >Mark as Absent for Out before</Label
                                        >
                                        <div className="relative w-48">
                                             <TimePicker
                                                value={schedule.absent_min_out}
                                                onChange={(val) => handleChange("absent_min_out", val)}
                                            />
                                        </div>
                                        <div className="relative">
                                            <Switch id="early-exceeds-absent" />
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
                    <Card className="lg:col-span-2 bg-card-light dark:bg-card-dark border-border-light dark:border-border-dark shadow-sm rounded-2xl">
                        <CardHeader className="flex justify-between items-center">
                            <CardTitle className="text-lg font-semibold text-text-strong-light dark:text-text-strong-dark">
                                Shift Details
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800/60">
                                {/* Title & Time */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                                            {schedule.name}
                                        </h3>
                                        <p className="text-sm text-text-light dark:text-text-dark">
                                            A standard daytime work schedule.
                                        </p>
                                    </div>
                                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 py-1 px-2 rounded-full">
                                        {schedule.on_duty_time} - {schedule.off_duty_time}
                                    </span>
                                </div>

                                {/* Key Statistics */}
                                <div className="mt-6 border-t border-blue-200 dark:border-blue-800/60 pt-4">
                                    <h4 className="font-semibold text-sm mb-3 text-text-strong-light dark:text-text-strong-dark">
                                        Key Statistics
                                    </h4>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-green-500" />
                                            <div>
                                                <p className="text-xs text-text-light dark:text-text-dark">
                                                    Start Time
                                                </p>
                                                <p className="font-medium">{schedule.on_duty_time}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-red-500" />
                                            <div>
                                                <p className="text-xs text-text-light dark:text-text-dark">
                                                    End Time
                                                </p>
                                                <p className="font-medium">{schedule.off_duty_time}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-blue-500" />
                                            <div>
                                                <p className="text-xs text-text-light dark:text-text-dark">
                                                    Work Hours
                                                </p>
                                                <p className="font-medium">8h</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Coffee className="w-4 h-4 text-yellow-500" />
                                            <div>
                                                <p className="text-xs text-text-light dark:text-text-dark">
                                                    Break
                                                </p>
                                                <p className="font-medium">1h</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <AlarmClock className="w-4 h-4 text-violet-500" />
                                            <div>
                                                <p className="text-xs text-text-light dark:text-text-dark">
                                                    OT Start
                                                </p>
                                                <p className="font-medium">{addTimes(schedule.off_duty_time, schedule.overtime_interval)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-gray-500" />
                                            <div>
                                                <p className="text-xs text-text-light dark:text-text-dark">
                                                    Grace Period
                                                </p>
                                                <p className="font-medium">{schedule.late_time} min</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Associated Policies */}
                                <div className="mt-6 border-t border-blue-200 dark:border-blue-800/60 pt-4">
                                    <h4 className="font-semibold text-sm mb-3 text-text-strong-light dark:text-text-strong-dark">
                                        Associated Policies
                                    </h4>

                                    <ul className="space-y-2 text-sm text-text-light dark:text-text-dark">
                                        <li className="flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-[var(--primary)]" />
                                            <span>Standard Attendance Policy applies.</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-[var(--primary)]" />
                                            <span>Overtime after 30 mins (Before Duty).</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Monthly Flexible Holiday */}
                                <div className="mt-6 border-t border-blue-200 dark:border-blue-800/60 pt-4">
                                    <h4 className="text-base font-semibold text-text-strong-light dark:text-text-strong-dark mb-3">
                                        Monthly Flexible Holiday
                                    </h4>

                                    <div>
                                        <Label
                                            htmlFor="flexible-holiday-count"
                                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                        >
                                            Number of Days
                                        </Label>
                                        <div className="relative bg-white">
                                            <Input
                                                id="flexible-holiday-count"
                                                type="number"
                                                defaultValue="2"
                                                className="w-full pr-12 text-sm"
                                            />
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-sm text-text-light dark:text-text-dark">
                                                days
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfileForm;
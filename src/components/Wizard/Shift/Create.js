"use client";


import React, { useState } from 'react';

import { storeShift } from '@/lib/api';
import { parseApiError } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from '@/components/ui/label';
import TimePicker from '@/components/ui/TimePicker';

import DaysSelector from "@/components/DaysSelector";
import DropDown from '@/components/ui/DropDown';
import { DAYS_LIST, ONE_TO_TEN_NUMBERS, SHIFT_TYPES } from '@/lib/dropdowns';

let initialPayload = {
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
};

export default function Create({ onSuccess = () => { } }) {

    const [globalError, setGlobalError] = useState(null);

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState(initialPayload);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const onSubmit = async () => {
        setGlobalError(null);
        setLoading(true);
        try {
            let data = await storeShift(form);

            if (data?.status == false) {

                if (data.errors) {
                    const firstKey = Object.keys(data.errors); // get the first key
                    setGlobalError(data.errors[firstKey][0]);
                    return;
                } else {
                    setGlobalError(data.message);
                    return;
                }
            }

            setForm(initialPayload);
            onSuccess();
        } catch (error) {
            setGlobalError(parseApiError(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="space-y-8 overflow-y-auto max-h-[500px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label
                            className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                            htmlFor="type-of-schedule"
                        >Type of Schedule*</Label>

                        <DropDown
                            placeholder="Select type"
                            value={form.shift_type_id}
                            items={SHIFT_TYPES}
                            onChange={(val) => handleChange("shift_type_id", val)}
                        />
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
                            value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)} // ✅ fixed
                        />
                    </div>
                </div>
                {
                    form.shift_type_id === 4 || form.shift_type_id === 6 ?
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
                                                value={form.on_duty_time}
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
                                                value={form.beginning_in}
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
                                                value={form.beginning_out}
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
                                                value={form.off_duty_time}
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
                                                value={form.ending_in}
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
                                                value={form.ending_out}
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
                                                            value={form.working_hours}
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
                                                            value={form.overtime_interval}
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

                            <DropDown
                                placeholder="Select day"
                                value={form.halfday}
                                items={DAYS_LIST}
                                onChange={(val) => handleChange("halfday", val)}
                            />
                        </div>
                        <div className="md:col-span-2 grid grid-cols-2 gap-6">
                            <div>
                                <Label
                                    className="block text-xs font-medium text-text-light dark:text-text-dark mb-1.5"
                                    htmlFor="half-day-in-time"
                                >Start Time</Label>
                                <div className="relative">
                                    <TimePicker
                                        value={form.halfday_in_time}
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
                                        value={form.halfday_out_time}
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
                        <DaysSelector schedule={form} setSchedule={setForm} />
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
                                <DropDown
                                    placeholder="Select type"
                                    value={form.monthly_flexi_holidays}
                                    items={ONE_TO_TEN_NUMBERS}
                                    onChange={(val) => handleChange("monthly_flexi_holidays", val)}
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
                                    value={form.overtime_interval}
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
                                    value={form.overtime_interval}
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
                                    value={form.overtime_interval}
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
                                            value={form.overtime_type} // 👈 controlled value
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
                                            value={form.absent_min_in}
                                            onChange={(val) => handleChange("absent_min_in", val)}
                                        />
                                    </div>
                                    <p className="text-sm text-text-light dark:text-text-dark">
                                        , mark status as
                                    </p>
                                    <div className="relative">
                                        <DropDown
                                            placeholder="Select type"
                                            value={form.attendanc_rule_late_coming}
                                            items={[
                                                { id: "absent", name: "Absent" },
                                                { id: "present", name: "Present" },
                                            ]}
                                            onChange={(val) => handleChange("attendanc_rule_late_coming", val)}
                                        />
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
                                            value={form.absent_min_out}
                                            onChange={(val) => handleChange("absent_min_out", val)}
                                        />
                                    </div>
                                    <p className="text-sm text-text-light dark:text-text-dark">
                                        , mark status as
                                    </p>
                                    <div className="relative">

                                        <DropDown
                                            placeholder="Select type"
                                            value={form.attendanc_rule_early_going}
                                            items={[
                                                { id: "absent", name: "Absent" },
                                                { id: "present", name: "Present" },
                                            ]}
                                            onChange={(val) => handleChange("attendanc_rule_early_going", val)}
                                        />
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
                <div className="mb-4 p-3 border border-red-500 bg-red-50 text-red-700 rounded-lg" role="alert">
                    {globalError}
                </div>
            )}

            {/* Buttons Right Aligned */}
            <div className="flex justify-end gap-3 mt-4">
                <Button
                    onClick={onSubmit}
                    disabled={loading}
                    className="bg-primary text-white"
                >
                    {loading ? "Saving..." : "Submit"}
                </Button>
            </div>
        </>
    );
}

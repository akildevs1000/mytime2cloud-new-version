"use client";

import React, { useEffect, useState, useCallback } from 'react';

import { SuccessDialog } from "@/components/SuccessDialog"; // Import the new component
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  ArrowLeft
} from "lucide-react";
import { addTimes, cn, parseApiError } from "@/lib/utils";
import { useRouter } from 'next/navigation';

import { storeShift, getShifts } from '@/lib/api';
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


import Link from 'next/link';

import axios from 'axios'; // Ensure you import axios at the top of your file

const DEFAULT_SCHEDULE = {
  shift_type_id: 6,
  branch_id: 0,
  on_duty_time: "09:00",
  off_duty_time: "18:00",
  working_hours: "09:00",
  overtime_interval: "00:30",
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  weekend1: "Not Applicable",
  weekend2: "Not Applicable",
  monthly_flexi_holidays: 0,
  beginning_in: "06:00",
  beginning_out: "13:00",
  ending_in: "15:00",
  ending_out: "21:00",
  late_time: "00:15",
  early_time: "00:15",
  absent_min_in: "01:00",
  absent_min_out: "01:00",
  halfday: "Not Applicable",
  halfday_working_hours: "00:00", // avoid "HH:MM" placeholder
  name: "test",
  overtime_type: "Both",
  company_id: 2,
  from_date: "2025-10-14T15:54:18.428Z",
  to_date: "2026-10-14T15:54:18.428Z",
};



export default function Home() {

  const [searchTerm, setSearchTerm] = useState("");


  const [shifts, setShifts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10); // Default to 10 for a cleaner table, even if the API suggests 100
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);


  const fetchShifts = useCallback(async (page, perPage) => {
    setIsLoading(true);
    setError(null);



    try {
      const params = {
        page: page,
        per_page: perPage,
        sortDesc: 'false',
        search: searchTerm || null, // Only include search if it's not empty
      };
      const result = await getShifts(params);

      // Check if result has expected structure before setting state
      if (result && Array.isArray(result.data)) {
        setShifts(result.data);
        setCurrentPage(result.current_page || 1);
        setTotalPages(result.last_page || 1);
        setTotal(result.total || 0);
        setIsLoading(false);
        return; // Success, exit
      } else {
        // If the API returned a 2xx status but the data structure is wrong
        throw new Error('Invalid data structure received from API.');
      }

    } catch (err) {
      // Axios error handling is robust:
      // - HTTP errors (non-2xx) are caught here.
      // - Network errors are caught here.
      // - The custom 'Invalid data structure' error is caught here.
      if (axios.isAxiosError(err) && err.response) {
        // Server responded with a status code outside of 2xx
        console.error(`Employee Page: HTTP error! status: ${err.response.status}`);
        setError(`Failed to fetch data: ${err.response.statusText}`);
      } else {
        // A non-Axios error or a network/request error (e.g., the custom error)
        console.error(`Employee Page: `, err.message);
        setError(err.message || 'An unknown error occurred.');
      }
      setIsLoading(false); // Make sure loading state is turned off on error
    }
  }, [perPage, searchTerm]);



  useEffect(() => {
    fetchShifts(currentPage, perPage);
  }, [currentPage, perPage, fetchShifts]); // Re-fetch when page or perPage changes

  const [schedule, setSchedule] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_SCHEDULE;
    try {
      const raw = localStorage.getItem("selectedShift");
      if (!raw) return DEFAULT_SCHEDULE;
      const parsed = JSON.parse(raw);
      // Optionally merge to ensure new keys are present:
      return { ...DEFAULT_SCHEDULE, ...parsed };
    } catch {
      return DEFAULT_SCHEDULE;
    }
  });

  // Persist any edits back to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("selectedShift", JSON.stringify(schedule));
    } catch { }
  }, [schedule]);



  const handleChange = (key, value) => {
    console.log("🚀 ~ handleChange ~ key, value:", key, value)
    setSchedule((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const router = useRouter();
  const handleGoBack = () => router.push(`/shift`);
  const handleCancel = () => router.push(`/shift`);

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


  const renderRow = (employee) => {
    return (
      <li key={employee.id}
        className="p-4 flex items-center space-x-4 hover:bg-primary/10 cursor-pointer bg-white"
        onClick={() => setSchedule(employee)}
      >
        <div>
          <p className="font-medium text-text-light dark:text-text-dark">
            {employee.name}
          </p>
          <p className="text-sm text-subtext-light dark:text-subtext-dark">
            {employee.on_duty_time || 'N/A'} - {employee.off_duty_time || 'N/A'}
          </p>
        </div>
      </li>
    );
  };


  return (
    <>
      <div className="flex flex-1 gap-6">
        <div
          className="w-80 bg-surface-light dark:bg-surface-dark border-r border-border flex flex-col"
        >
          <div
            className="p-4 border-b border-border-light dark:border-border-dark flex justify-between items-center"
          >
            <h2 className="text-lg font-semibold">Shifts</h2>
            <Link href="/shift/create">
              <button className="p-2 rounded-lg bg-primary text-white">
                <span className="material-icons">add</span>
              </button>
            </Link>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-grow">
                <span
                  className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark"
                >search</span
                >
                <Input
                  className="w-full  pl-10 pr-4 py-2 rounded-lg border border-border-light dark:border-border-dark   focus:ring-primary focus:border-primary"
                  placeholder="Search Shifts"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-border-light dark:divide-border-dark">
              {shifts.map(renderRow)}
            </ul>
          </div>
        </div>
        <div className="flex-1">

          <div
            className="relative  dark:bg-card-dark rounded-lg "
          >
            <header className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold">Shift:  {schedule?.name || "---"}</h1>
                <p className="text-subtext-light dark:text-subtext-dark">{schedule?.on_duty_time || "---"} - {schedule?.off_duty_time || "---"}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleGoBack}
                  variant="default"
                  className="bg-primary text-white hover:bg-indigo-700 transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  BACK
                </Button>
              </div>
            </header>
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
                          onChange={(e) => handleChange("early_time", e.target.value)}
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
            <SuccessDialog
              open={open}
              onOpenChange={setOpen}
              title="Shift Saved"
              description="Your Shift information has been inserted successfully."
            />
          </div>
        </div>

      </div>
    </>
  );
}

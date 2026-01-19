"use client";

import React, { useEffect, useState } from "react";
import { SuccessDialog } from "@/components/SuccessDialog";
import { Button } from "@/components/ui/button";
import { Briefcase, ArrowLeft, LogInIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { getBranches, getDepartments, storeSchedule } from "@/lib/api";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import DepartmentSelect from "@/components/ui/DepartmentSelect";
import EmployeeMultiSelect from "@/components/ui/EmployeeMultiSelect";
import DateRangeSelect from "@/components/ui/DateRange";
import DropDown from "@/components/ui/DropDown";
import ShiftSelect from "@/components/ui/ShiftSelect";
import { parseApiError } from "@/lib/utils";

let initialPayload = {
  branch_id: "",
  department_id: "",
  shift_id: 0,
  employee_ids: [],
  schedules: [
    {
      shift_id: 188,
      shift_type_id: 6,
      from_date: "2025-11-01",
      to_date: "2025-12-31",
      is_over_time: false,
      isAutoShift: false,
    },
  ],
  replace_schedules: false,
}

const Create = ({ onSuccess = () => { } }) => {

  const [formData, setFormData] = useState(initialPayload);

  const [open, setOpen] = useState(false);
  const [globalError, setGlobalError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [filterEmployeesByScheduleType, setFilterEmployeesByScheduleType] = useState(0);

  const [branches, setBranches] = useState([]);

  const fetchBranches = async () => {
    try {
      setBranches(await getBranches());
    } catch (error) {
      setGlobalError(parseApiError(error));
    }
  };

  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async () => {
    try {
      setDepartments(await getDepartments());
    } catch (error) {
      setGlobalError(parseApiError(error));
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchDepartments();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setGlobalError(null);
    setIsSubmitting(true);

    try {
      await storeSchedule(formData);

      setFormData(initialPayload);

      onSuccess();

    } catch (error) {
      setGlobalError(parseApiError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-8 px-2">
        <div>
          <label className="block text-xs font-medium mb-1">Branch</label>
          <DropDown
            placeholder="Select Branch"
            value={formData.branch_id}
            items={branches}
            onChange={(id) => { setFormData((prev) => ({ ...prev, branch_id: id })) }}
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Department</label>
          <DropDown
            placeholder="Select Department"
            value={formData.department_id}
            items={departments}
            onChange={(id) => { setFormData((prev) => ({ ...prev, department_id: id })) }}
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Scheduled/ UnScheduled</label>
          <DropDown
            value={filterEmployeesByScheduleType}
            items={
              [
                { id: `2`, name: `All Employees` },
                { id: `1`, name: "Scheduled Only" },
                { id: `0`, name: "Un-Scheduled" },
              ]}
            onChange={(id) =>
              setFilterEmployeesByScheduleType(id)
            }
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Employee</label>
          <EmployeeMultiSelect
            selectedBranchId={formData.branch_id}
            selectedDepartmentId={formData.department_id}
            filterEmployeesByScheduleType={filterEmployeesByScheduleType}
            value={formData.employee_ids}
            onChange={(id) =>
              setFormData((prev) => ({ ...prev, employee_ids: id }))
            }
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Shift</label>
          <ShiftSelect
            selectedBranchId={formData.branch_id}
            value={formData.schedules[0].shift_id}
            onChange={(schedule) => {
              console.log(schedule);
              setFormData((prev) => ({ ...prev, schedules: [schedule] }))
            }
            }
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Date Range</label>
          <DateRangeSelect
            value={{
              from: formData.schedules[0]?.from_date,
              to: formData.schedules[0]?.to_date,
            }}
            onChange={({ from, to }) => {
              console.log("📅 Date range changed:");
              console.log("From:", from);
              console.log("To:", to);

              setFormData((prev) => ({
                ...prev,
                schedules: [
                  {
                    ...prev.schedules?.[0],
                    from_date: from,
                    to_date: to,
                  },
                ],
              }));
            }}
          />

        </div>

        <div>
          <Switch
            // ✅ FIX 1: Add the necessary id for the Label's htmlFor to connect
            id="over-time-switch"
            checked={formData.is_over_time}
            onCheckedChange={
              (val) => {
                setFormData((prev) => ({
                  ...prev, schedules: [
                    {
                      ...prev.schedules[0],
                      is_over_time: val,

                    }
                  ]
                }))
              }
            }
          />
          <Label
            // ✅ FIX 2: Update htmlFor to match the new id of the first Switch
            htmlFor="over-time-switch"
            className="text-sm font-medium text-text-light dark:text-text-dark"
          >
            Over Time
          </Label>
        </div>

        <div>
          <Switch
            // ✅ FIX 3: Update the id to be unique and descriptive
            id="auto-shift-switch"
            checked={formData.isAutoShift}

            onCheckedChange={
              (val) => {
                setFormData((prev) => ({
                  ...prev, schedules: [
                    {
                      ...prev.schedules[0],
                      isAutoShift: val,

                    }
                  ]
                }))
              }
            }
          />
          <Label
            // ✅ FIX 4: Update htmlFor to match the new unique id
            htmlFor="auto-shift-switch"
            className="text-sm font-medium text-text-light dark:text-text-dark"
          >
            is Auto Shift
          </Label>
        </div>
      </div>

      {globalError && (
        <div className="mb-4 p-3 border border-red-500 bg-red-50 text-red-700 rounded-lg" role="alert">
          {globalError}
        </div>
      )}

      {/* Buttons Right Aligned */}
      <div className="flex justify-end gap-3 mt-4 px-2">
        <Button
          onClick={onSubmit}
          className="bg-primary text-white"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </>
  );
};

export default Create;

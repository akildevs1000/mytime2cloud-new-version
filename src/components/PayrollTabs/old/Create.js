"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function PayrollSettings() {

  // Payroll Formula
  const [payload, setPayload] = useState({
    branch_id: "",
    salary_type: "basic_salary",
    ot_value: "",
    deduction_value: "",
  });

  const [errors, setErrors] = useState({});

  // Payroll Generation Date
  const [branchId, setBranchId] = useState("");
  const [date, setDate] = useState("");

  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1),
    label: `Day ${i + 1}`,
  }));

  const handleFormulaSubmit = () => {
    if (!payload.salary_type || !payload.ot_value || !payload.deduction_value) {
      setErrors({
        salary_type: !payload.salary_type ? ["Salary type is required"] : null,
        ot_value: !payload.ot_value ? ["OT value is required"] : null,
        deduction_value: !payload.deduction_value ? ["Deduction value is required"] : null,
      });
      return;
    }

    console.log("Payroll Formula Submitted:", payload);
    alert("Payroll formula saved successfully!");
  };

  const handleDateSubmit = () => {
    if (!branchId || !date) {
      alert("Please select both branch and date.");
      return;
    }

    console.log("Payroll Generation Date Submitted:", { branchId, date });
    alert("Payroll generation date saved successfully!");
  };

  return (
    <div className="space-y-5">
      {/* === PAYROLL FORMULA === */}
      <Card className="p-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Create Payroll Formula
          </CardTitle>
        </CardHeader>
        <Separator className="mb-4" />

        <CardContent>

          <div className="grid grid-cols-12 gap-4 items-center mb-6">
            <div className="col-span-4">
              <Label>Salary calculation formula</Label>
            </div>
            <div className="col-span-6">
              <RadioGroup
                className="flex space-x-6"
                value={payload.salary_type}
                onValueChange={(val) => setPayload({ ...payload, salary_type: val })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="basic_salary" id="basic" />
                  <Label htmlFor="basic">Basic Salary</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="net_salary" id="net" />
                  <Label htmlFor="net">Net Salary</Label>
                </div>
              </RadioGroup>
              {errors.salary_type && (
                <p className="text-sm text-red-600 mt-1">{errors.salary_type[0]}</p>
              )}
            </div>
          </div>

          {/* OT Formula */}
          <div className="grid grid-cols-12 gap-4 items-center mb-6">
            <div className="col-span-4">
              <Label>OT formula</Label>
            </div>
            <div className="col-span-6 flex items-center space-x-2">
              <Input className="w-1/2" value="Per Hour Salary" readOnly />
              <span className="text-lg">x</span>
              <Input
                className="w-1/2"
                placeholder="Enter OT value"
                value={payload.ot_value}
                onChange={(e) => setPayload({ ...payload, ot_value: e.target.value })}
              />
            </div>
            {errors.ot_value && (
              <p className="text-sm text-red-600 mt-1 col-span-6 col-start-5">{errors.ot_value[0]}</p>
            )}
          </div>

          {/* Deduction Formula */}
          <div className="grid grid-cols-12 gap-4 items-center mb-6">
            <div className="col-span-4">
              <Label>Late Deduction formula</Label>
            </div>
            <div className="col-span-6 flex items-center space-x-2">
              <Input className="w-1/2" value="Per Hour Salary" readOnly />
              <span className="text-lg">x</span>
              <Input
                className="w-1/2"
                placeholder="Enter deduction value"
                value={payload.deduction_value}
                onChange={(e) => setPayload({ ...payload, deduction_value: e.target.value })}
              />
            </div>
            {errors.deduction_value && (
              <p className="text-sm text-red-600 mt-1 col-span-6 col-start-5">{errors.deduction_value[0]}</p>
            )}
          </div>

          <div className="text-right">
            <Button onClick={handleFormulaSubmit}>Submit</Button>
          </div>
        </CardContent>
      </Card>

      {/* === PAYROLL GENERATION DATE === */}
      <Card className="p-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Create Payroll Generation Date
          </CardTitle>
        </CardHeader>
        <Separator className="mb-4" />

        <CardContent>
          <div className="grid grid-cols-12 gap-4 items-center mb-6">
            <div className="col-span-4">
              <Label>Salary Payslip Generation Date (Every Month)</Label>
            </div>
            <div className="col-span-3">
              <Select onValueChange={setDate} value={date}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Date" />
                </SelectTrigger>
                <SelectContent>
                  {dayOptions.map((day) => (
                    <SelectItem key={day.value} value={day.value}>
                      {day.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-5 text-right">
              <Button onClick={handleDateSubmit}>Submit</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

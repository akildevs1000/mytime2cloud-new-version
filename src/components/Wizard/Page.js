"use client";

import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BranchCreate from "./BranchCreate";
import DepartmentCreate from "./DepartmentCreate";
import DeviceCreate from "./DeviceCreate";
import { motion } from "framer-motion";
import { getBranches, getDepartments, getDeviceList } from "@/lib/api";
import { SuccessDialog } from "@/components/SuccessDialog";

export default function MultiStepDialog() {
  const [open, setOpen] = useState(true);
  const [successOpen, setSuccessOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchSetupData = async () => {
    try {
      setLoading(true);

      // Run all API calls in parallel for faster performance
      const [branches, departments, devices] = await Promise.all([
        getBranches(),
        getDepartments(),
        getDeviceList(),
      ]);

      // Determine which step to show
      if (branches.length === 0) {
        setStepIndex(0); // Step 1: Branch
        setOpen(true);
      } else if (departments.length === 0) {
        setStepIndex(1); // Step 2: Department
        setOpen(true);
      } else if (devices.length === 0) {
        setStepIndex(2); // Step 3: Device
        setOpen(true);
      } else {
        // All data present → skip setup
        setOpen(false);
      }

    } catch (error) {
      console.error("Setup fetch error:", parseApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSetupData();
  }, []);

  const steps = [
    {
      id: 0,
      title: "Account",
      subtitle: "Basic account info",
      content: <BranchCreate onSuccess={next} goBack={back} stepIndex={stepIndex} />,
    },
    {
      id: 1,
      title: "Company",
      subtitle: "Company details",
      content: <DepartmentCreate onSuccess={next} goBack={back} stepIndex={stepIndex} />,
    },
    {
      id: 2,
      title: "Confirm",
      subtitle: "Review & finish",
      content: <DeviceCreate onSuccess={finish} goBack={back} stepIndex={stepIndex} />,
    },
  ];

  const maxIndex = steps.length - 1;

  function next() { if (stepIndex < maxIndex) setStepIndex(stepIndex + 1); }
  function back() { if (stepIndex > 0) setStepIndex(stepIndex - 1); }

  async function finish() {
    setSuccessOpen(true)
    setOpen(false)
  }

  if (loading) return;

  return (
    <>
      <SuccessDialog
        open={successOpen}
        onOpenChange={setSuccessOpen}
        title="Setup completed"
        description="Default configuration has been completed"
      />
      <Dialog open={open} onOpenChange={() => { }}>
        <DialogContent className="sm:max-w-2xl w-full"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}>
          <div className="flex items-start justify-between">
            <DialogHeader>
              <DialogTitle>Initial Setup</DialogTitle>
              <p className="text-sm text-muted-foreground">Please provide the necessary information to ensure a smooth process.</p>
            </DialogHeader>
          </div>
          <Card className="pa-0">
            <CardHeader className="pt-2">
              <CardTitle className="flex items-center justify-between gap-2">
                {steps.map((s, i) => (
                  <div key={s.id} className="flex items-center">
                    {/* Step Circle */}
                    <motion.div
                      animate={{
                        background: i === stepIndex
                          ? "linear-gradient(to right, #6946dd, #8b63f0)" // purple gradient
                          : i < stepIndex
                            ? "linear-gradient(to right, #34d399, #059669)" // completed green
                            : "#e5e7eb",
                        color: i <= stepIndex ? "#fff" : "#6b7280",
                        scale: i === stepIndex ? 1.2 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium shadow-md"
                    >
                      {i < stepIndex ? <Check size={14} /> : i + 1}
                    </motion.div>


                    {/* Connector Line */}
                    {i !== steps.length - 1 && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 210 }}
                        transition={{ duration: 0.5 }}
                        className={`h-2 mx-2 rounded ${i < stepIndex
                          ? "bg-gradient-to-r from-green-400 to-green-600"
                          : "bg-gray-200"
                          }`}
                      />
                    )}
                  </div>
                ))}
              </CardTitle>
            </CardHeader>

            {/* Step Content with smooth transition */}
            <CardContent>
              <motion.div
                key={stepIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {steps[stepIndex].content}
              </motion.div>
            </CardContent>
          </Card>

        </DialogContent>
      </Dialog>
    </>

  );
}

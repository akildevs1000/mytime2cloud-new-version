"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Branch from "@/components/Branch/Page";
import Department from "@/components/Department/Page";
import Device from "@/components/Device/Page";
import ShiftPage from "@/app/shift/page";
import SchedulePage from "@/app/schedule/page";
import EmployeesPage from "@/app/employees/page";

export default function Index() {
    const [stepIndex, setStepIndex] = useState(0);

    const steps = [
        {
            id: 1,
            label: "Step 1",
            sidebarTitle: "Branch Info",
            title: "Branch Information",
            subtitle: "Create branch Info",
            content: (
                <div className="p-10">
                    <Branch />
                </div>
            ),
        },
        {
            id: 2,
            label: "Step 2",
            sidebarTitle: "Department Info",
            title: "Department Information",
            subtitle: "Now, add your departments.",
            content: (
                <div className="p-10">
                    <Department />
                </div>),
        },
        {
            id: 3,
            label: "Step 3",
            sidebarTitle: "Device Info",
            title: "Department Information",
            subtitle: "Now, add your departments.",
            content: (
                <div className="p-10">
                    <Device />
                </div>),
        },
        {
            id: 4,
            label: "Step 4",
            sidebarTitle: "Shift Info",
            title: "Department Information",
            subtitle: "Now, add your departments.",
            content: <ShiftPage />,
        },
        {
            id: 5,
            label: "Step 5",
            sidebarTitle: "Employee Info",
            title: "Department Information",
            subtitle: "Now, add your departments.",
            content: <EmployeesPage />,
        },
        {
            id: 6,
            label: "Step 6",
            sidebarTitle: "Assign Schedule",
            title: "Department Information",
            subtitle: "Now, add your departments.",
            content: <SchedulePage />,
        },
    ];

    const currentStep = steps[stepIndex];
    const isLastStep = stepIndex === steps.length - 1;


    const handleNext = async () => {
        if (stepIndex < steps.length - 1) {
            setStepIndex(stepIndex + 1);
        } else {
            setOpen(false); // close dialog on finish
        }
    };

    const handleBack = async () => {
        setStepIndex(stepIndex - 1);
    };

    return (
        <Card className="flex flex-col md:flex-row border-none shadow-none rounded-none h-full">
            {/* Sidebar Stepper */}
            <CardContent className="w-full md:w-[260px] shrink-0 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 p-4">
                <nav className="flex md:flex-col gap-1">
                    {steps.map((step, index) => {
                        const isActive = index === stepIndex;

                        return (
                            <button
                                key={step.id}
                                className={[
                                    "w-full text-left rounded-lg px-4 py-3 transition-colors flex flex-col gap-1",
                                    isActive
                                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
                                ].join(" ")}
                            >
                                <span className="text-xs uppercase tracking-wide opacity-70">
                                    {step.label}
                                </span>
                                <span className="font-semibold text-sm">
                                    {step.sidebarTitle}
                                </span>
                            </button>
                        );
                    })}
                </nav>
            </CardContent>


            {/* Step Content with Framer Motion */}
            <div className="flex-1">
                <div className="flex flex-col h-full">
                    <div className="">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={stepIndex}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="h-full"
                            >
                                {currentStep.content}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-end mr-5 gap-5">
                        {stepIndex > 0 && <Button
                            className="rounded-xl flex items-center justify-end 
bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-500
dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-slate-300"
                            type="button"
                            onClick={handleBack}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key="back"
                                    className="flex items-center gap-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {!isLastStep &&
                                        <motion.div
                                            animate={{ x: [0, 5, 0], opacity: [1, 0.7, 1] }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <ArrowLeft className="h-5 w-5" />
                                        </motion.div>}
                                    <span>{isLastStep ? "Finish" : "Back"} </span>

                                    {isLastStep && <Check className="h-5 w-5" />}
                                </motion.div>
                            </AnimatePresence>
                        </Button>}


                        <Button
                            className="rounded-xl flex items-center justify-end"
                            type="button"
                            onClick={handleNext}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key="next"
                                    className="flex items-center gap-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <span>{isLastStep ? "Finish" : "Next"}</span>
                                    {!isLastStep &&
                                        <motion.div
                                            animate={{ x: [0, 5, 0], opacity: [1, 0.7, 1] }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <ArrowRight className="h-5 w-5" />
                                        </motion.div>}
                                    {isLastStep && <Check className="h-5 w-5" />}
                                </motion.div>
                            </AnimatePresence>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Branch from "./Branch/Index";
import Department from "./Department/Index";
import Device from "./Device/Index";
import Shift from "./Shift/Index";
import Employee from "./Employee/Index";
import Schedule from "./Schedule/Index";



export default function CreateAccountPage() {
  const [open, setOpen] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    {
      id: 1,
      label: "Step 1",
      sidebarTitle: "Branch Info",
      title: "Branch Information",
      subtitle: "Create branch Info",
      content: <Branch />,
    },
    {
      id: 2,
      label: "Step 2",
      sidebarTitle: "Department Info",
      title: "Department Information",
      subtitle: "Now, add your departments.",
      content: <Department />,
    },
    {
      id: 3,
      label: "Step 3",
      sidebarTitle: "Device Info",
      title: "Department Information",
      subtitle: "Now, add your departments.",
      content: <Device />,
    },
    {
      id: 4,
      label: "Step 4",
      sidebarTitle: "Shift Info",
      title: "Department Information",
      subtitle: "Now, add your departments.",
      content: <Shift />,
    },
    {
      id: 5,
      label: "Step 5",
      sidebarTitle: "Employee Info",
      title: "Department Information",
      subtitle: "Now, add your departments.",
      content: <Employee />,
    },
    {
      id: 6,
      label: "Step 6",
      sidebarTitle: "Assign Schedule",
      title: "Department Information",
      subtitle: "Now, add your departments.",
      content: <Schedule />,
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
    w-full 
    max-w-[95vw]        /* use 95% of viewport width */
    xl:max-w-[1300px]   /* cap at 1200px on big screens */
    p-0 
    overflow-hidden
  "
      >

        <DialogHeader>
          <DialogTitle >
          </DialogTitle>
        </DialogHeader>

        <Card className="flex flex-col md:flex-row border-none shadow-none rounded-none">
          {/* Sidebar Stepper */}
          <CardContent className="w-full md:w-[260px] border-b md:border-b-0  dark:border-border-dark shrink-0">
            <div className="flex md:flex-col gap-8">
              {steps.map((step, index) => {
                const isActive = index === stepIndex;
                const isCompleted = index < stepIndex;

                return (
                  <div key={step.id} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={[
                          "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                          isActive
                            ? "bg-primary text-white"
                            : isCompleted
                              ? "bg-primary/10 border-2 border-primary text-primary"
                              : "border-2 border-border-light dark:border-border-dark text-text-light/60 dark:text-text-dark/60",
                        ].join(" ")}
                      >
                        {step.id}
                      </div>
                      {index < steps.length - 1 && (
                        <div className="h-10 w-0.5 bg-border-light dark:bg-border-dark md:block hidden" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-text-light/60 dark:text-text-dark/60">
                        {step.label}
                      </p>
                      <p
                        className={[
                          "font-semibold",
                          isActive
                            ? "text-primary"
                            : "text-text-light/60 dark:text-text-dark/60",
                        ].join(" ")}
                      >
                        {step.sidebarTitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
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
                  className="rounded-xl flex items-center justify-end bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-500"
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
      </DialogContent>
    </Dialog>
  );
}

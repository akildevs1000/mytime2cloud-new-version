"use client";

import { useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Index from "./Index";


export default function CreateAccountPage() {

  const [open, setOpen] = useState(true);


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

        <Index />

      </DialogContent>
    </Dialog>
  );
}

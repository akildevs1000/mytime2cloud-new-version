"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

// function Label({
//   className,
//   ...props
// }) {
//   return (
//     <LabelPrimitive.Root
//       data-slot="label"
//       className={cn(
//         "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
//         className
//       )}
//       {...props} />
//   );
// }

const Label = ({ children }) => (
  <label className="block text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
    {children}
  </label>
);

const SectionTitle = ({ icon, title }) => (
  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
    {icon} {title}
    <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1 ml-2"></div>
  </h3>
);

export { Label, SectionTitle };

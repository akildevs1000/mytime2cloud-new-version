"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, Check, X } from "lucide-react";

// Assuming your shadcn/ui components are correctly imported:
import { cn, formatDateDubai } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export default function DateRangeSelect({ className, onChange = () => {} }) {
  // 1. Main state for the selected range (displayed in the button)
  const [date, setDate] = useState({
    // from: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // First day of current month
    // to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), // Last day of current month
    from: null, // First day of current month
    to: null, // Last day of current month
  });

  // 2. Draft state for the range selection happening *inside* the calendar
  // It is initialized with the current committed date.
  const [draftDate, setDraftDate] = useState(date);

  // 3. State to control the Popover's open/close status
  const [open, setOpen] = useState(false);

  // --- Handlers ---

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
    // If the Popover is closing without an explicit action, revert draft date
    // to the last committed date to ensure canceled changes are discarded.
    if (!newOpen) {
      setDraftDate(date);
    }
  };

  const handleApply = () => {
    setDate(draftDate); // Commit the draft selection to the main state
    setOpen(false); // Close the popover

    onChange({
      from: formatDateDubai(draftDate.from),
      to: formatDateDubai(draftDate.to),
    }); // Notify parent component of the new date range
  };

  const handleCancel = () => {
    setDraftDate(date); // Revert the draft back to the last committed date
    setOpen(false); // Close the popover
  };

  // --- Rendering ---

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal border border-border text-gray-600 dark:text-slate-300",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="h-4 w-4" />
            {/* Display the committed date range or a placeholder */}
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 text-gray-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/20"
          align="start" // Ensures the popover's left edge aligns with the button's left edge
          side="bottom" // Ensures the popover opens below the button
        >
          {/* Calendar Component */}
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={draftDate?.from}
            selected={draftDate} // Use the draft state for selection
            onSelect={setDraftDate} // Update the draft state on day selection
            numberOfMonths={2} // Show two months for easier range selection
          />

          {/* Action Buttons Container */}
          <div className="flex justify-end space-x-2 border-t border-gray-200 dark:border-white/30 p-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCancel}
              className="bg-white dark:bg-slate-700"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button
              className="bg-white dark:bg-primary"
              size="sm"
              onClick={handleApply}
              // The Apply button is disabled unless both the 'from' and 'to' dates are selected.
              disabled={!draftDate?.from || !draftDate.to}
            >
              <Check className="h-4 w-4" />
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Check, X } from "lucide-react"

// Assuming your shadcn/ui components are correctly imported:
import { cn } from "@/lib/utils" 
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"


export default function DateRangeSelect({ className }) {
  // 1. Main state for the selected range (displayed in the button)
  const [date, setDate] = React.useState({
    from: new Date(2025, 0, 20), // Month is 0-indexed (January)
    to: new Date(2025, 1, 9),    // Month is 0-indexed (February)
  });

  // 2. Draft state for the range selection happening *inside* the calendar
  // It is initialized with the current committed date.
  const [draftDate, setDraftDate] = React.useState(date);

  // 3. State to control the Popover's open/close status
  const [open, setOpen] = React.useState(false);

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
    setOpen(false);   // Close the popover
  };

  const handleCancel = () => {
    setDraftDate(date); // Revert the draft back to the last committed date
    setOpen(false);   // Close the popover
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
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
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
            className="w-auto p-0" 
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
          <div className="flex justify-end space-x-2 border-t p-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCancel}
              className="hover:text-red-600"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleApply}
              // The Apply button is disabled unless both the 'from' and 'to' dates are selected.
              disabled={!draftDate?.from || !draftDate.to}
            >
              <Check className="mr-2 h-4 w-4" />
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
import { Calendar1, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const startOfDay = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

// New helper function to format date objects to 'YYYY-MM-DD' strings
const formatDateToString = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const year = d.getFullYear();
  // Month is 0-indexed, so add 1 and pad to 2 digits
  const month = String(d.getMonth() + 1).padStart(2, "0");
  // Date is 1-indexed, pad to 2 digits
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Calendar = ({ initialMonth, selected, onSelect, numberOfMonths = 2 }) => {
  const today = startOfDay(new Date());
  // State to track the month being displayed (always the first month of the pair)
  const [month, setMonth] = useState(
    initialMonth ? startOfDay(initialMonth) : startOfDay(new Date())
  );

  // Date comparison helpers
  const isSameDay = (date1, date2) =>
    date1 &&
    date2 &&
    startOfDay(date1).getTime() === startOfDay(date2).getTime();

  const isInRange = (date) => {
    if (!selected || !selected.from || !selected.to) return false;

    const from = startOfDay(selected.from);
    const to = startOfDay(selected.to);
    const target = startOfDay(date);

    // Ensure from is always before or same as to for correct range check
    const rangeStart = from < to ? from : to;
    const rangeEnd = from < to ? to : from;

    return target > rangeStart && target < rangeEnd;
  };

  const handleDayClick = (day) => {
    if (!day) return;

    const currentFrom = selected.from ? startOfDay(selected.from) : undefined;
    const currentTo = selected.to ? startOfDay(selected.to) : undefined;

    const isSingleDayRange =
      currentFrom && currentTo && isSameDay(currentFrom, currentTo);
    const isFullRange = currentFrom && currentTo && !isSingleDayRange;

    let newFrom = currentFrom;
    let newTo = currentTo;
    const clickedDay = startOfDay(day);

    // Case 1: Start/Reset (Empty state, or full range state)
    if (!currentFrom || isFullRange) {
      newFrom = clickedDay;
      newTo = clickedDay; // Start as a single-day range (D1-D1)
    }
    // Case 2: Extending a single-day range (from D1-D1 to D1-D2 or D2-D1)
    else if (isSingleDayRange) {
      // If they click the same day again, do nothing
      if (isSameDay(clickedDay, currentFrom)) {
        return;
      }

      // Otherwise, complete the range selection
      if (clickedDay.getTime() < currentFrom.getTime()) {
        // Swap: clickedDay is the new 'from', old 'from' is the new 'to'
        newTo = currentFrom;
        newFrom = clickedDay;
      } else {
        // Complete: clickedDay is the new 'to'
        newTo = clickedDay;
      }
    }

    onSelect({ from: newFrom, to: newTo });
  };

  const getDayClasses = (day) => {
    if (!day) return "pointer-events-none";

    let classes =
      "w-9 h-9 flex items-center justify-center text-sm transition-colors cursor-pointer ";

    // Today styling (subtle accent)
    if (isSameDay(day, today)) {
      classes += "border border-accent-foreground/30 ";
    }

    const isFrom = isSameDay(day, selected.from);
    const isTo = isSameDay(day, selected.to);
    const inMiddle = isInRange(day);

    // Selection Styling (Primary)
    if (isFrom || isTo) {
      // Single day selection OR complete range (need to check if from != to)
      const isRange =
        selected.from && selected.to && !isSameDay(selected.from, selected.to);
      const isSingle =
        selected.from && selected.to && isSameDay(selected.from, selected.to);

      if (isSingle) {
        // Single day selection (full circle)
        classes +=
          "bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90";
      } else if (isRange) {
        // Full range start or end point

        // Determine which is earlier for proper rounding
        const isFromEarlier = selected.from.getTime() <= selected.to.getTime();

        if (isFrom && isFromEarlier) {
          // Range Start
          classes +=
            "bg-primary text-primary-foreground font-semibold hover:bg-primary/90 rounded-l-md rounded-r-none";
        } else if (isTo && isFromEarlier) {
          // Range End
          classes +=
            "bg-primary text-primary-foreground font-semibold hover:bg-primary/90 rounded-r-md rounded-l-none";
        } else if (isFrom && !isFromEarlier) {
          // Range End (because from is later)
          classes +=
            "bg-primary text-primary-foreground font-semibold hover:bg-primary/90 rounded-r-md rounded-l-none";
        } else if (isTo && !isFromEarlier) {
          // Range Start (because to is earlier)
          classes +=
            "bg-primary text-primary-foreground font-semibold hover:bg-primary/90 rounded-l-md rounded-r-none";
        }
      }
    } else if (inMiddle) {
      // Middle of the range (Accent background)
      classes +=
        "bg-accent text-accent-foreground rounded-none hover:bg-accent/70";
    } else {
      // Normal day
      classes +=
        "text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md";
    }

    // Re-fix the single day selection class if it was initially set as a range segment by accident
    if (isFrom && isTo && isSameDay(selected.from, selected.to)) {
      classes =
        "w-9 h-9 flex items-center justify-center text-sm transition-colors cursor-pointer bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90";
    }

    return classes.trim();
  };

  // Calendar rendering helpers
  function getDaysInMonth(date) {
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const lastDayOfMonth = new Date(year, monthIndex + 1, 0);
    const firstDayOfMonth = new Date(year, monthIndex, 1);
    const days = [];

    // Calculate leading blanks (starting day of week: Monday = 0, Sunday = 6)
    // Correcting for Sunday (0) to be the last day, and Monday (1) to be the first (ISO standard)
    let startDayOfWeek = firstDayOfMonth.getDay();
    startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1; // 0=Mon, 6=Sun

    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    // Add actual days
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push(new Date(year, monthIndex, i));
    }

    return days;
  }

  const formatMonthName = (date) =>
    date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

  // Define the two months to display
  const currentMonth = month;
  const nextMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1);

  const monthsToDisplay = [
    { date: currentMonth, days: getDaysInMonth(currentMonth) },
    { date: nextMonth, days: getDaysInMonth(nextMonth) },
  ];

  return (
    <div
      className={`flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 ${
        numberOfMonths === 2 ? "gap-4" : ""
      }`}
    >
      {monthsToDisplay.slice(0, numberOfMonths).map((m, index) => (
        <div key={index} className="space-y-4 min-w-[280px]">
          {/* Header with Navigation */}
          <div className="flex justify-between items-center px-2">
            <button
              onClick={() =>
                setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
              }
              disabled={index !== 0} // Only allow navigation on the first month view
              className={`p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                index !== 0 ? "invisible" : ""
              }`}
            >
              <ChevronLeft />
            </button>
            <h2 className="text-sm font-medium dark:text-gray-50">
              {formatMonthName(m.date)}
            </h2>
            <button
              onClick={() =>
                setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))
              }
              disabled={index !== 0 || numberOfMonths === 1} // Only allow navigation on the first month when two are visible
              className={`p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                index !== 0 ? "invisible" : ""
              }`}
            >
              <ChevronRight />
            </button>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 text-xs text-muted-foreground">
            {weekDays.map((day, i) => (
              <div
                key={i}
                className="w-9 h-9 flex items-center justify-center font-medium text-gray-500 dark:text-gray-400"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 auto-rows-min">
            {m.days.map((day, i) => (
              <div key={i} className="flex items-center justify-center">
                {day ? (
                  <button
                    onClick={() => handleDayClick(day)}
                    className={getDayClasses(day)}
                  >
                    {day.getDate()}
                  </button>
                ) : (
                  <div className="w-9 h-9" /> // Empty space for padding
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const DateRangePicker = ({ className, onRangeChange }) => {
  const today = new Date();

  // The 'to' date is yesterday (today - 1 day)
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // The 'from' date should be 6 days before the 'to' date, which is 7 days ago (today - 7 days)
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  // Initial state: last 7 days, ending Yesterday
  const initialDate = {
    from: startOfDay(sevenDaysAgo),
    to: startOfDay(yesterday),
  };
  // ---------------------------------------------------------------------

  // State for the selected range and popover visibility
  const [date, setDate] = useState(initialDate);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Formatting the display string for the input field
  const formatRange = () => {
    if (!date || (!date.from && !date.to)) {
      return "Pick a date range";
    }

    const options = { month: "short", day: "numeric", year: "numeric" };

    // Normalize dates for display (handle case where 'from' is after 'to' temporarily during selection)
    let displayFrom = date.from;
    let displayTo = date.to;

    if (
      displayFrom &&
      displayTo &&
      displayFrom.getTime() > displayTo.getTime()
    ) {
      [displayFrom, displayTo] = [displayTo, displayFrom];
    }

    if (displayFrom && displayTo) {
      const fromStr = displayFrom.toLocaleDateString("en-US", options);
      const toStr = displayTo.toLocaleDateString("en-US", options);
      if (fromStr === toStr) {
        return fromStr;
      }
      return `${fromStr} - ${toStr}`;
    }

    if (displayFrom) {
      return displayFrom.toLocaleDateString("en-US", options);
    }

    return "Pick a date range";
  };

  // --- Component Simulations for UI ---

  // Simulates the PopoverTrigger (Button)
  const PopoverTrigger = ({ children, onClick }) => (
    <button
      onClick={onClick}
      className="flex h-10 w-full items-center justify-start rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm shadow-sm ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span className="text-gray-700 dark:text-gray-300 font-medium">
        {formatRange()}
      </span>
      <Calendar1 className="ml-auto h-4 w-4 opacity-70 text-gray-400 dark:text-gray-500" />
    </button>
  );

  // Simulates the PopoverContent (Dropdown container)
  const PopoverContent = ({ children }) => (
    <div className="absolute z-50 w-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 shadow-2xl p-4 mt-2 transition-all min-w-full sm:min-w-0 origin-top-left">
      {children}
    </div>
  );

  const handleApplyRange = () => {
    setIsPopoverOpen(false);

    // Normalize the date range
    let { from, to } = date;
    if (from && to && from.getTime() > to.getTime()) {
      [from, to] = [to, from];
    }

    // Convert Date objects to YYYY-MM-DD strings for the parent component
    const formattedFrom = from ? formatDateToString(from) : null;
    const formattedTo = to ? formatDateToString(to) : null;

    if (onRangeChange) {
      // Pass the formatted strings back
      onRangeChange({ from: formattedFrom, to: formattedTo });
    }
  };

  return (
    <div>
      {/* 1. Trigger */}
      <PopoverTrigger onClick={() => setIsPopoverOpen(!isPopoverOpen)} />

      {/* 2. Content */}
      {isPopoverOpen && (
        <PopoverContent>
          <Calendar
            initialMonth={date.to || new Date()} // Initial month focuses on the end date
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
          <div className="flex justify-end pt-4">
            <button
              onClick={handleApplyRange} // Call the new handler
              className="inline-flex bg-primary items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-indigo-600 text-white shadow-md hover:bg-indigo-700 h-9 px-4 py-2"
            >
              Apply Range
            </button>
          </div>
        </PopoverContent>
      )}
    </div>
  );
};
export default DateRangePicker;

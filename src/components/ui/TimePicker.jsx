"use client";

import React, { forwardRef } from "react";
import { Input } from "@/components/ui/input";

/**
 * Reusable input with a right-side icon (default: "schedule")
 *
 * Props:
 * - value, onChange, defaultValue: standard input control
 * - id, name, type, placeholder, disabled, required, autoComplete
 * - className: container classes
 * - inputClassName: classes applied to the input itself
 * - icon: optional ReactNode (e.g., <Clock />). If not provided, uses Material Icons "schedule"
 */
const TimePicker = forwardRef(function TimePicker(
  {
    value,
    onChange,
    defaultValue,
    id,
    name,
    type = "text",
    placeholder = "",
    disabled = false,
    required = false,
    autoComplete,
    className = "",
    inputClassName = "",
    icon, // ReactNode; if absent, uses material-icons 'schedule'
    ...rest
  },
  ref
) {
  return (
    <div className={`relative w-full ${className}`}>
      <Input
        ref={ref}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        className={`w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-strong-light dark:text-text-strong-dark focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] pr-10 text-sm transition-all ${inputClassName}`}
        {...rest}
      />

      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400">
        {icon ? (
          icon
        ) : (
          <span className="material-icons text-base">schedule</span>
        )}
      </span>
    </div>
  );
});

export default TimePicker;

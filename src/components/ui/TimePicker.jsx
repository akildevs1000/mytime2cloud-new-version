"use client";

import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

// --- helpers ---
function pad2(n) {
  return String(n).padStart(2, "0");
}
function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}
function parseTime(str, fallback = { h: 9, m: 0 }) {
  if (!str || typeof str !== "string") return fallback;
  const m = str.match(/^(\d{1,2}):(\d{1,2})/);
  if (!m) return fallback;
  let h = clamp(parseInt(m[1], 10), 0, 23);
  let mm = clamp(parseInt(m[2], 10), 0, 59);
  return { h, m: mm };
}
function fmt(h, m) {
  return `${pad2(h)}:${pad2(m)}`;
}

/**
 * TimePicker (shadcn-style)
 *
 * Props:
 * - value (string "HH:MM"), onChange (fn)
 * - defaultValue (string "HH:MM"), minuteStep (number, default 5)
 * - id, name, placeholder, disabled, required, autoComplete
 * - className (container), inputClassName (input)
 * - icon (ReactNode) — right-side icon; defaults to Material 'schedule'
 */
const TimePicker = forwardRef(function TimePicker(
  {
    value,
    onChange,
    defaultValue,
    minuteStep = 5,
    id,
    name,
    placeholder = "Select time",
    disabled = false,
    required = false,
    autoComplete,
    className = "",
    inputClassName = "",
    icon,
    ...rest
  },
  ref
) {
  const initial = useMemo(
    () => parseTime(value ?? defaultValue ?? "09:00"),
    [value, defaultValue]
  );

  const [open, setOpen] = useState(false);
  const [h, setH] = useState(initial.h);
  const [m, setM] = useState(initial.m);

  const inputRef = useRef(null);

  // sync internal when external value changes
  useEffect(() => {
    if (typeof value === "string") {
      const t = parseTime(value, { h, m });
      setH(t.h);
      setM(t.m);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const display = useMemo(() => {
    const src = typeof value === "string" ? parseTime(value) : { h, m };
    return fmt(src.h, src.m);
  }, [value, h, m]);

  function commitChange(nextH = h, nextM = m) {
    const out = fmt(nextH, nextM);
    onChange?.(out);
  }

  function incHour(step = 1) {
    const next = (h + step + 24) % 24;
    setH(next);
    commitChange(next, m);
  }
  function incMinute(step = minuteStep) {
    const total = h * 60 + m + step;
    const mod = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
    const nextH = Math.floor(mod / 60);
    const nextM = mod % 60;
    setH(nextH);
    setM(nextM);
    commitChange(nextH, nextM);
  }

  function handleKeyDown(e) {
    if (disabled) return;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      incMinute(minuteStep);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      incMinute(-minuteStep);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      incHour(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      incHour(-1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      setOpen(false);
    }
  }

  function onManualInput(e) {
    const raw = e.target.value;
    const t = parseTime(raw, { h, m });
    setH(t.h);
    setM(t.m);
    onChange?.(fmt(t.h, t.m));
  }

  function setNow() {
    const d = new Date();
    const nh = d.getHours();
    const nm = d.getMinutes() - (d.getMinutes() % minuteStep);
    setH(nh);
    setM(nm);
    commitChange(nh, nm);
  }

  function clearTime() {
    setH(0);
    setM(0);
    onChange?.("");
  }

  return (
    <div className={`relative w-full ${className}`}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <Input
              ref={(node) => {
                inputRef.current = node;
                if (typeof ref === "function") ref(node);
                else if (ref) ref.current = node;
              }}
              id={id}
              name={name}
              type="text"
              value={display}
              onChange={onManualInput}
              onKeyDown={handleKeyDown}
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
            {/* clickable area to open */}
            {!disabled && (
              <button
                type="button"
                aria-label="Open time picker"
                className="absolute inset-0 cursor-text"
                onClick={() => setOpen(true)}
                // ensure text selection/caret still works
                style={{ background: "transparent" }}
              />
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-64 p-3">
          {/* Hours / Minutes controls */}
          <div className="grid grid-cols-2 gap-3">
            {/* Hours */}
            <div className="rounded-md border p-2">
              <div className="mb-2 text-xs font-medium">Hours</div>
              <div className="flex items-center justify-between">
                <Button type="button" size="icon" variant="outline" onClick={() => incHour(-1)}>
                  <span className="material-icons text-sm">expand_more</span>
                </Button>
                <div className="text-lg font-semibold tabular-nums">{pad2(h)}</div>
                <Button type="button" size="icon" variant="outline" onClick={() => incHour(1)}>
                  <span className="material-icons text-sm">expand_less</span>
                </Button>
              </div>
            </div>

            {/* Minutes */}
            <div className="rounded-md border p-2">
              <div className="mb-2 text-xs font-medium">Minutes</div>
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => incMinute(-minuteStep)}
                >
                  <span className="material-icons text-sm">expand_more</span>
                </Button>
                <div className="text-lg font-semibold tabular-nums">{pad2(m)}</div>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => incMinute(minuteStep)}
                >
                  <span className="material-icons text-sm">expand_less</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-3 flex items-center justify-between">
            <div className="space-x-2">
              <Button type="button" variant="ghost" onClick={setNow}>
                Now
              </Button>
              <Button type="button" variant="ghost" onClick={clearTime}>
                Clear
              </Button>
            </div>
            <Button type="button" onClick={() => setOpen(false)}>
              Done
            </Button>
          </div>

          <div className="mt-2 text-xs text-muted-foreground">
            Tip: Use Arrow ↑/↓ to adjust minutes, ←/→ hours.
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});

export default TimePicker;

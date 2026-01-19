"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DaysSelector({ schedule, setSchedule }) {
  const toggleDay = (day, checked) => {
    setSchedule((prev) => {
      const currentDays = new Set(prev.days || []);
      if (checked) currentDays.add(day);
      else currentDays.delete(day);

      return {
        ...prev,
        days: Array.from(currentDays),
      };
    });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
      {ALL_DAYS.map((day) => {
        const isActive = schedule.days?.includes(day);

        const cardOn =
          "bg-background-light dark:bg-gray-800/50 border border-border-light dark:border-border-dark";
        const cardOff =
          "bg-red-100/50 dark:bg-red-900/40 border border-red-200 dark:border-red-800/60";

        const textOn = "text-text-strong-light dark:text-text-strong-dark";
        const textOff = "text-red-700 dark:text-red-300";

        return (
          <div
            key={day}
            className={`flex items-center justify-between rounded-lg py-2 px-3 transition-colors ${isActive ? cardOn : cardOff}`}
          >
            <span className={`font-medium text-sm ${isActive ? textOn : textOff}`}>
              {day.toUpperCase()}
            </span>
            <Switch
              id={`${day.toLowerCase()}-toggle`}
              checked={isActive}
              onCheckedChange={(checked) => toggleDay(day, checked)}
            />
          </div>
        );
      })}
    </div>
  );
}

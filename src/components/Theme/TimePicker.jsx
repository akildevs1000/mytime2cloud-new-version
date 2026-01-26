import React from "react";
import Dropdown from "./DropDown"; // Importing your existing component

const TimePicker = ({ value, onChange, placeholder = "Select Time", interval = 1 }) => {
  // 1. Generate the time slots (00:00 to 23:30)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let min = 0; min < 60; min += interval) {
        const h = hour.toString().padStart(2, "0");
        const m = min.toString().padStart(2, "0");
        const timeStr = `${h}:${m}`;
        slots.push({ id: timeStr, name: timeStr });
      }
    }
    return slots;
  };

  const timeItems = generateTimeSlots();

  // 2. Map the current string value (e.g., "09:00") back to an item object
  const selectedItem = timeItems.find((item) => item.id === value) || null;

  return (
    <Dropdown
      items={timeItems}
      selectedItem={selectedItem}
      onSelect={(item) => onChange(item.id)}
      placeholder={placeholder}
      width="w-full"
    />
  );
};

export default TimePicker;
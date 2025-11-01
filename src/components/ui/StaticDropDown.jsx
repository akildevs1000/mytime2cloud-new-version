"use client";

import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

export default function StaticDropDown({ items, value, onChange }) {
  const [deviceOpen, setDeviceOpen] = useState(false);

  const handleSelect = (currentValue) => {
    const selectedItem = items.find((d) => d.name === currentValue);
    onChange(selectedItem?.id || null);
    setDeviceOpen(false);
  };

  const selectedDeviceName =
    items.find((b) => b.id === value)?.name || "Select Item";

  return (
    <Popover open={deviceOpen} onOpenChange={setDeviceOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={deviceOpen}
          className="w-full justify-between text-gray-500 border border-gray-300 rounded-lg bg-white hover:bg-gray-100"
        >
          {selectedDeviceName}
          <span className="material-icons text-gray-400 ml-2 text-base">
            expand_more
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] max-w-full p-0">
        <Command>
          <CommandInput placeholder="Search device..." />
          <CommandEmpty>No employee found.</CommandEmpty>
          <CommandGroup>
            {items.map((device) => (
              <CommandItem
                key={device.id}
                value={device.name}
                className="text-gray-600"
                onSelect={handleSelect}
              >
                {device.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

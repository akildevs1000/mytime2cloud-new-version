"use client";

import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { getEmployeeList } from "@/lib/api";

export default function DeviceSelect({
  selectedBranchId,
  value,
  onChange,
}) {
  const [devices, setDevices] = useState([]);
  const [deviceOpen, setDeviceOpen] = useState(false);

  const fetchDevices = async () => {
    if (!selectedBranchId) return;
    try {
      const list = await getEmployeeList(selectedBranchId);
      setDevices(list);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [selectedBranchId]);

  const handleSelect = (currentValue) => {
    if (currentValue === "Select All") {
      onChange(null);
    } else {
      const selectedItem = devices.find((d) => d.name === currentValue);
      onChange(selectedItem?.id || null);
    }
    setDeviceOpen(false);
  };

  const selectedDeviceName =
    devices.find((b) => b.id === value)?.name || "Select Employee";

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
            <CommandItem
              className="text-gray-600"
              value="Select All"
              onSelect={handleSelect}
            >
              Select All
            </CommandItem>
            {devices.map((device) => (
              <CommandItem
                key={device.id}
                value={device.first_name}
                className="text-gray-600"
                onSelect={handleSelect}
              >
                {device.first_name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

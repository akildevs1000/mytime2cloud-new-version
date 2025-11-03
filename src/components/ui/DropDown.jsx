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

export default function DropDown({
  items,
  value,
  onChange,
  placeholder = "Select Item",
}) {
  const [itemOpen, setItemOpen] = useState(false);

  const handleSelect = (currentValue) => {
    const selectedItem = items.find((d) => d.name === currentValue);
    onChange(selectedItem?.id || null);
    setItemOpen(false);
  };

  const itemName = items.find((b) => b.id === value)?.name || placeholder;

  return (
    <Popover open={itemOpen} onOpenChange={setItemOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={itemOpen}
          className="w-full justify-between text-gray-500 border border-gray-300 rounded-lg bg-white hover:bg-gray-100"
        >
          {itemName}
          <span className="material-icons text-gray-400 ml-2 text-base">
            expand_more
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] max-w-full p-0">
        <Command>
          <CommandInput placeholder="Search item..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.id}
                value={item.name}
                className="text-gray-600"
                onSelect={handleSelect}
              >
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

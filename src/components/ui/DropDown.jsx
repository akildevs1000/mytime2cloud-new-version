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
          className="w-full justify-between"
        >
          {itemName}
          <span className="material-icons ml-2">
            expand_more
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] max-w-full max-h-60 p-0">
        <Command>
          <CommandInput placeholder="Search item..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.id}
                value={item.name}
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

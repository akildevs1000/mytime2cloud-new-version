"use client";

import { useState, useRef, useEffect } from "react";
import { X, CheckIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

export default function MultiDropDown({
  items = [],
  value = [],
  onChange,
  placeholder = "Select...",
  badgesCount = 2
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const [popoverWidth, setPopoverWidth] = useState(0);

  useEffect(() => {
    if (triggerRef.current) {
      setPopoverWidth(triggerRef.current.offsetWidth);
    }
  }, [triggerRef.current?.offsetWidth, open]);

  const handleSelect = (id) => {
    const isSelected = value.includes(id);
    let newSelection = [];

    if (id === "Select All") {
      newSelection =
        value.length === items.length ? [] : items.map((d) => d.id);
    } else if (isSelected) {
      newSelection = value.filter((v) => v !== id);
    } else {
      newSelection = [...value, id];
    }

    // console.log("🚀 ~ handleSelect ~ newSelection:", newSelection);

    onChange(newSelection);
  };

  const handleRemove = (id) => {
    const newSelection = value.filter((v) => v !== id);
    onChange(newSelection);
  };

  const selectedItems = items.filter((d) => value.includes(d.id));
  const itemsToDisplay = selectedItems.slice(0, badgesCount);
  const overflowCount = selectedItems.length - badgesCount;

  const getDisplayContent = () => {
    if (selectedItems.length === 0) {
      return <span className="text-gray-500">{placeholder}</span>;
    }

    const badges = itemsToDisplay.map((item) => (
      <Badge
        key={item.id}
        variant="secondary"
        className="mr-1 hover:bg-gray-200"
      >
        {item.name}
        <X
          className="ml-1 h-3 w-3 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleRemove(item.id);
          }}
        />
      </Badge>
    ));

    if (overflowCount > 0) {
      badges.push(
        <Badge
          key="overflow"
          variant="outline"
          className="ml-1 bg-gray-100 text-gray-700"
        >
          +{overflowCount} more
        </Badge>
      );
    }

    return <div className="flex flex-wrap gap-1">{badges}</div>;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="border border-gray-300 flex justify-between"
        >
          {getDisplayContent()}
          <span className="material-icons text-gray-400 ml-2 text-base shrink-0">
            expand_more
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0" style={{ width: popoverWidth }}>
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}`} />
          <CommandEmpty>No items found.</CommandEmpty>
          <CommandGroup>
            {/* Select All Option */}
            <CommandItem
              className="text-gray-600 flex justify-between"
              value="Select All"
              onSelect={() => handleSelect("Select All")}
            >
              Select All ({items.length})
              <CheckIcon
                className={cn(
                  "h-4 w-4",
                  value.length === items.length && items.length > 0
                    ? "opacity-100"
                    : "opacity-0"
                )}
              />
            </CommandItem>

            {items.map((item) => (
              <CommandItem
                key={item.id}
                value={item.name}
                className="text-gray-600 flex justify-between"
                onSelect={() => handleSelect(item.id)}
              >
                {item.name}
                <CheckIcon
                  className={cn(
                    "h-4 w-4",
                    value.includes(item.id) ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

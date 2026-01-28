"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox"; // Ensure this import exists
import { cn } from "@/lib/utils";

export default function MultiDropDown({
  items = [],
  value = [],
  onChange,
  placeholder = "Select...",
  badgesCount = 2,
  width = "w-full",
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
    onChange(newSelection);
  };

  const handleRemove = (id) => {
    const newSelection = value.filter((v) => v !== id);
    onChange(newSelection);
  };

  const selectedItems = items.filter((d) => value.includes(d.id));
  const itemsToDisplay = selectedItems.slice(0, badgesCount);
  const overflowCount = selectedItems.length - badgesCount;

  // Logic for the Select All Checkbox state
  const isAllSelected = value.length === items.length && items.length > 0;
  const isSomeSelected = value.length > 0 && value.length < items.length;

  const getDisplayContent = () => {
    if (selectedItems.length === 0) {
      return (
        <span className="text-gray-600 dark:text-slate-300">{placeholder}</span>
      );
    }

    const badges = itemsToDisplay.map((item) => (
      <Badge
        key={item.id}
        variant="secondary"
        className="flex items-center gap-1"
      >
        {item.name}
        <X
          className="h-3 w-3 cursor-pointer hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            handleRemove(item.id);
          }}
        />
      </Badge>
    ));

    if (overflowCount > 0) {
      badges.push(
        <Badge key="overflow" variant="secondary">
          +{overflowCount} more
        </Badge>,
      );
    }

    return <div className="flex flex-wrap gap-1">{badges}</div>;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full">
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`${width} borderborder-gray-300 flex justify-between h-auto min-h-10 px-3 py-2`}
        >
          {getDisplayContent()}
          <span className="material-icons ml-2 shrink-0  text-gray-700 dark:text-slate-300">
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
              className="flex items-center gap-2 px-2 py-2 cursor-pointer"
              onSelect={() => handleSelect("Select All")}
            >
              <Checkbox
                checked={
                  isAllSelected
                    ? true
                    : isSomeSelected
                      ? "indeterminate"
                      : false
                }
                onCheckedChange={() => handleSelect("Select All")}
              />
              <span className="font-medium">Select All ({items.length})</span>
            </CommandItem>

            <div className="h-[1px] bg-muted my-1" />

            {/* Individual Items */}
            {items.map((item) => {
              const isSelected = value.includes(item.id);
              return (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  className="flex items-center gap-2 px-2 py-2 cursor-pointer"
                  onSelect={() => handleSelect(item.id)}
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => handleSelect(item.id)}
                  />
                  <span className="flex-1">{item.name}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

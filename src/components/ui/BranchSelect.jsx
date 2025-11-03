"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

import { getBranches } from "@/lib/api";

export default function BranchSelect({
  selectedBranchId = null,
  onSelect = () => {},
  isSeletedAll = true,
}) {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setBranches(await getBranches());
      } catch (error) {
        console.error("Error fetching branches:", error);
        setBranches([]);
      }
    };
    fetchBranches();
  }, []);

  const selected = branches.find((b) => b.id === selectedBranchId);

  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    if (value === "Select All") {
      onSelect(null);
    } else {
      const id = Number(value);
      if (!Number.isNaN(id)) onSelect(id);
    }
    // Auto-close the popover after selection
    setOpen(false);
  };

  const [popoverWidth, setPopoverWidth] = useState(0);

  const triggerRef = useRef(null);

  useEffect(() => {
    if (triggerRef.current) {
      setPopoverWidth(triggerRef.current.offsetWidth);
    }
  }, [triggerRef.current?.offsetWidth, open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full min-w-50 justify-between py-4 text-gray-500 border border-gray-300 rounded-lg bg-white hover:bg-gray-100"
        >
          {selected ? selected.name : "Select Branch"}
          <span className="material-icons text-gray-400">expand_more</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0" style={{ width: popoverWidth }}>
        <Command>
          <CommandInput placeholder="Search branch..." />
          <CommandEmpty>No branch found.</CommandEmpty>
          <CommandGroup>
            {isSeletedAll && (
              <CommandItem
                value="Select All"
                className="text-gray-500"
                onSelect={handleSelect}
              >
                Select All
              </CommandItem>
            )}

            {branches.map((branch) => (
              <CommandItem
                key={branch.id}
                value={`${branch.id}`}
                className="text-gray-500"
                onSelect={handleSelect}
              >
                {branch.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

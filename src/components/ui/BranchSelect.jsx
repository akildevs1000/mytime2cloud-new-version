"use client";

import React, { useEffect, useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Button } from '@/components/ui/button';

import { getBranches } from '@/lib/api';

export default function BranchSelect({ selectedBranchId = null, onSelect = () => { } }) {

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
        if (value === 'Select All') {
            onSelect(null);
        } else {
            const id = Number(value);
            if (!Number.isNaN(id)) onSelect(id);
        }
        // Auto-close the popover after selection
        setOpen(false);
    };

    return (
        <div className="relative">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={`w-50 justify-between py-4 text-gray-500 border border-gray-300 rounded-lg bg-white hover:bg-gray-100`}
                    >
                        {selected ? selected.name : 'Select Branch'}
                        <span className="material-icons text-gray-400">expand_more</span>
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[320px] p-0">
                    <Command>
                        <CommandInput placeholder="Search branch..." />
                        <CommandEmpty>No branch found.</CommandEmpty>
                        <CommandGroup>
                            <CommandItem className="text-gray-500" value="Select All" onSelect={handleSelect}>
                                Select All
                            </CommandItem>
                            {branches.map((branch) => (
                                <CommandItem key={branch.id} className="text-gray-500" value={`${branch.id}`} onSelect={handleSelect}>
                                    {branch.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}

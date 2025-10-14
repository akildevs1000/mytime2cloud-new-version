"use client";

import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

export default function DatePicker({ value = null, onChange = () => {}, placeholder = 'Pick a date', className = '', formatStr = 'yyyy-MM-dd', disabled = false, initialFocus = true }) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={`w-full pl-3 text-left font-normal ${!value ? 'text-muted-foreground' : ''} ${className}`}
                    disabled={disabled}
                >
                    {value ? format(value, formatStr) : <span>{placeholder}</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={(date) => {
                        onChange(date);
                        setOpen(false);
                    }}
                    initialFocus={initialFocus}
                />
            </PopoverContent>
        </Popover>
    );
}

'use client';

import * as React from 'react';

import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';

function formatDate(date: Date | undefined) {
  if (!date) {
    return '';
  }

  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export interface CalendarWithInputProps extends Omit<React.ComponentProps<'input'>, 'value' | 'onChange'> {
  value?: Date | string;
  onChange?: (value: Date | undefined) => void;
}

export function CalendarWithInput({ className, value, onChange, ...props }: CalendarWithInputProps) {
  const [open, setOpen] = React.useState(false);
  const controlledDate = React.useMemo(() => {
    if (value instanceof Date) return value;
    if (typeof value === 'string') {
      const d = new Date(value);
      return isValidDate(d) ? d : undefined;
    }
    return undefined;
  }, [value]);
  const [month, setMonth] = React.useState<Date | undefined>(controlledDate || undefined);
  const [inputValue, setInputValue] = React.useState(formatDate(controlledDate));

  React.useEffect(() => {
    setInputValue(formatDate(controlledDate));
    if (controlledDate) setMonth(controlledDate);
  }, [controlledDate]);

  return (
    <div className="relative flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <Input
              id="date"
              value={inputValue}
              placeholder="Select date"
              className={`pr-10 w-full ${className}`}
              onChange={(e) => {
                setInputValue(e.target.value);
                const d = new Date(e.target.value);
                if (isValidDate(d)) {
                  if (onChange) onChange(d);
                  setMonth(d);
                } else {
                  if (onChange) onChange(undefined);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setOpen(true);
                }
              }}
              {...props}
            />
            <CalendarIcon className="size-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            selected={controlledDate}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            onSelect={(d) => {
              if (onChange) onChange(d);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

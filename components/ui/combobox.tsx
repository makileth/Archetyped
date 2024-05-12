"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Option {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: Option[];
  defaultValue?: string;
  errorValue?: string;
  isClickable?: boolean;
  onSelect: (selectedValue: string) => void;
}

export const Combobox = ({
  options,
  defaultValue,
  errorValue,
  isClickable,
  onSelect,
}: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue ?? "Choose..."); // Use ?? for nullish coalescing

  const selectedOptionLabel = options.find(
    (option) => option.value === value
  )?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between ${
            errorValue && value === "" ? "border-red-500 text-red-500" : ""
          } ${!isClickable && "pointer-events-none"}`}
        >
          {selectedOptionLabel
            ? selectedOptionLabel // Show value as placeholder if label not found
            : value}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[70%] max-h-[15rem] overflow-y-auto p-0">
        <Command>
          <CommandInput placeholder="Search" />
          <CommandEmpty>Nothing found</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  onSelect(currentValue); // Call the onSelect callback
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

// type Student = Record<"mailId", string | boolean>;
type Student = {
  mailId: string;
  available: boolean;
};


export default function StudentMultiSelect({
  selected,
  setSelected,
  options,
}: {
  selected: Student[];
  setSelected: React.Dispatch<React.SetStateAction<Student[]>>;
  options: Student[];
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);

  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback(
    (framework: Student) => {
      setSelected((prev) => prev.filter((s) => s.mailId !== framework.mailId));
    },
    [setSelected],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [setSelected],
  );

  const selectables = options.filter((student) => !selected.includes(student));

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((student) => {
            return (
              <Badge key={student.mailId} variant="secondary">
                {student.mailId}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(student);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(student)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select Batchmates..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((student) => {
                return (
                  <CommandItem
                    key={student.mailId}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue("");
                      setSelected((prev) => [...prev, student]);
                    }}
                    className={
                      "flex cursor-pointer items-center justify-between "
                    }
                    disabled={!student.available}
                  >
                    <span>{student.mailId}</span>
                    <Badge variant="secondary">
                      {student.available ? "Available" : "Not Available"}
                    </Badge>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}

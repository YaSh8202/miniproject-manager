import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const students = [
  "Aditya Kumar 20bcs001",
  "Aman Kumar 20bcs002",
  "Yash Bajaj 20bcs106",
];

function InviteMembers() {
  return (
    <Command>
      <CommandInput placeholder="Type Student Entry no. or Name to search" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Invited">
          <CommandItem>Member 1</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="All Batchmates">
          {students.map((student, i) => (
            <CommandItem key={i}>{student}</CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default InviteMembers;

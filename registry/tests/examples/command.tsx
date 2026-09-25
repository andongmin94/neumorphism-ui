"use client";
import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
export default function Example() {
  const [selected, setSelected] = React.useState("No command selected.");
  return <div className="grid w-full max-w-md gap-3">
    <Command>
      <CommandInput placeholder="Search commands" />
      <CommandList>
        <CommandEmpty>No matching commands.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem value="dashboard" onSelect={() => setSelected("Dashboard")}>Dashboard<CommandShortcut>⌘D</CommandShortcut></CommandItem>
          <CommandItem value="settings" onSelect={() => setSelected("Settings")}>Settings<CommandShortcut>⌘,</CommandShortcut></CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
    <p role="status" className="text-sm text-[var(--muted-foreground)]">{selected}</p>
  </div>;
}

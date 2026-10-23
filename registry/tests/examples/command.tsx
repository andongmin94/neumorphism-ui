"use client";

import * as React from "react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut } from "@/components/ui/command";
export default function Example() {
    const text = {
        "city": "Search cities",
        "empty": "No matching cities.",
        "quiet": "Saved state"
    };
    const cities = ["Busan", "London", "Seoul", "Tokyo"];
    const [message, setMessage] = React.useState("");
    return <div className="grid w-full max-w-sm gap-3"><Command><CommandInput placeholder={text.city} aria-label={text.city}/><CommandList><CommandEmpty>{text.empty}</CommandEmpty><CommandGroup heading={text.city}>{cities.map((city, index) => <CommandItem key={city} value={city} onSelect={() => setMessage(city)}>{city}<CommandShortcut>⌘{index + 1}</CommandShortcut></CommandItem>)}</CommandGroup></CommandList></Command><p role="status" className="text-sm text-[var(--muted-foreground)]">{message || text.quiet}</p></div>;
}

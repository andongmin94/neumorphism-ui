"use client";

import { Combobox, ComboboxLabel, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty } from "@/components/ui/combobox";
export default function Example() {
  const cities = ["Busan", "London", "Seoul", "Tokyo"];
  return (<div className="w-full max-w-sm"><Combobox items={cities}><ComboboxLabel>{"Search cities"}</ComboboxLabel><ComboboxInput placeholder={"Search cities"} /><ComboboxContent><ComboboxEmpty>{"No matching cities."}</ComboboxEmpty><ComboboxList>{(city: string) => <ComboboxItem key={city} value={city}>{city}</ComboboxItem>}</ComboboxList></ComboboxContent></Combobox></div>);
}

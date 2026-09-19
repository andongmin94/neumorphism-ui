"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription, PopoverClose } from "@/components/ui/popover";
export default function Example() {

  return (<Popover><PopoverTrigger render={<Button />}>{"Notification settings"}</PopoverTrigger><PopoverContent><PopoverTitle>{"Tune your notifications"}</PopoverTitle><PopoverDescription>{"Keep your focus with only the updates that matter."}</PopoverDescription><PopoverClose render={<Button variant="primary" />}>{"Close"}</PopoverClose></PopoverContent></Popover>);
}

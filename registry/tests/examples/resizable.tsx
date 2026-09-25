"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
export default function Example() {
  return <ResizablePanelGroup orientation="horizontal" className="h-48 max-w-lg">
    <ResizablePanel defaultSize={40} minSize={25}><div className="grid h-full place-items-center p-4">List</div></ResizablePanel>
    <ResizableHandle withHandle />
    <ResizablePanel defaultSize={60} minSize={30}><div className="grid h-full place-items-center p-4">Details</div></ResizablePanel>
  </ResizablePanelGroup>;
}

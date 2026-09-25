"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
export default function Example() {
  return <Drawer swipeDirection="down">
    <DrawerTrigger render={<Button />}>Quick settings</DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Quick settings</DrawerTitle>
        <DrawerDescription>Adjust frequent options without leaving the current screen.</DrawerDescription>
      </DrawerHeader>
      <div className="grid gap-3 px-5 py-4"><p>Notification and display controls can live in this area.</p></div>
      <DrawerFooter><DrawerClose render={<Button variant="primary" />}>Done</DrawerClose></DrawerFooter>
    </DrawerContent>
  </Drawer>;
}

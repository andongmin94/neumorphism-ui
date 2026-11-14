import * as React from "react";
import { createRoot } from "react-dom/client";
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription, DrawerClose } from "@/components/ui/drawer";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import "./drawer-modal.css";

const overlays = {
  drawer: { Root: Drawer, Trigger: DrawerTrigger, Content: DrawerContent, Title: DrawerTitle, Description: DrawerDescription, Close: DrawerClose },
  dialog: { Root: Dialog, Trigger: DialogTrigger, Content: DialogContent, Title: DialogTitle, Description: DialogDescription, Close: DialogClose },
  sheet: { Root: Sheet, Trigger: SheetTrigger, Content: SheetContent, Title: SheetTitle, Description: SheetDescription, Close: SheetClose },
};

function OverlayModalFixture() {
  const [clicks, setClicks] = React.useState(0);
  const query = new URLSearchParams(location.search);
  const component = query.get("component");
  const kind = component === "dialog" || component === "sheet" ? component : "drawer";
  const { Root, Trigger, Content, Title, Description, Close } = overlays[kind];
  const mode = query.get("modal");
  const modal = mode === "false" ? false : mode === "trap-focus" ? "trap-focus" : undefined;
  return <main>
    <button data-testid="background-action" onClick={() => setClicks(value => value + 1)}>Background action</button>
    <output data-testid="background-count">{clicks}</output>
    <Root modal={modal}>
      <Trigger>Open {kind}</Trigger>
      <Content {...(kind === "sheet" ? { side: "bottom" as const } : {})}>
        <Title>Overlay modal behavior</Title>
        <Description>Background actions remain available unless modal is true.</Description>
        <Close>Close {kind}</Close>
      </Content>
    </Root>
  </main>;
}

createRoot(document.getElementById("root")!).render(<OverlayModalFixture />);

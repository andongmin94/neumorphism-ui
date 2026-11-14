import { Dialog as NativeDialog } from "@base-ui/react/dialog";
import { Drawer as NativeDrawer } from "@base-ui/react/drawer";
import { Menu as NativeMenu } from "@base-ui/react/menu";
import { Tooltip as NativeTooltip } from "@base-ui/react/tooltip";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

const dialog = NativeDialog.createHandle<{ id: string }>();
const drawer = NativeDrawer.createHandle<{ id: string }>();
const menu = NativeMenu.createHandle<{ id: string }>();
const tooltip = NativeTooltip.createHandle<{ id: string }>();

export function PopupPayloadTypes() {
  return (
    <>
      <Dialog handle={dialog}>{({ payload }) => payload?.id.toUpperCase()}</Dialog>
      <Drawer handle={drawer}>{({ payload }) => payload?.id.toUpperCase()}</Drawer>
      <DropdownMenu handle={menu}>{({ payload }) => payload?.id.toUpperCase()}</DropdownMenu>
      <MenubarMenu handle={menu}>{({ payload }) => payload?.id.toUpperCase()}</MenubarMenu>
      <Tooltip handle={tooltip}>{({ payload }) => payload?.id.toUpperCase()}</Tooltip>
      <DialogTrigger handle={dialog} payload={{ id: "item" }} />
      <DrawerTrigger handle={drawer} payload={{ id: "item" }} />
      <DropdownMenuTrigger handle={menu} payload={{ id: "item" }} />
      <MenubarTrigger handle={menu} payload={{ id: "item" }} />
      <TooltipTrigger handle={tooltip} payload={{ id: "item" }} />
      {/* @ts-expect-error Trigger payload must match its typed handle. */}
      <DialogTrigger handle={dialog} payload={{ id: 123 }} />
      {/* @ts-expect-error Trigger payload must match its typed handle. */}
      <DrawerTrigger handle={drawer} payload={{ id: 123 }} />
      {/* @ts-expect-error Trigger payload must match its typed handle. */}
      <DropdownMenuTrigger handle={menu} payload={{ id: 123 }} />
      {/* @ts-expect-error Trigger payload must match its typed handle. */}
      <MenubarTrigger handle={menu} payload={{ id: 123 }} />
      {/* @ts-expect-error Trigger payload must match its typed handle. */}
      <TooltipTrigger handle={tooltip} payload={{ id: 123 }} />
    </>
  );
}

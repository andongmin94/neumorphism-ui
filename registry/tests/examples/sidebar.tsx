"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuLink,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
export default function Example() {
  return <SidebarProvider className="min-h-80">
    <Sidebar collapsible="icon">
      <SidebarHeader><strong>Workspace</strong></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem><SidebarMenuLink href="#overview" isActive tooltip="Overview"><span aria-hidden="true">⌂</span><span>Overview</span></SidebarMenuLink></SidebarMenuItem>
              <SidebarMenuItem><SidebarMenuLink href="#settings" tooltip="Settings"><span aria-hidden="true">⚙</span><span>Settings</span></SidebarMenuLink></SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    <SidebarInset><header className="p-3"><SidebarTrigger /></header><section id="overview" className="p-4">Workspace overview</section></SidebarInset>
  </SidebarProvider>;
}

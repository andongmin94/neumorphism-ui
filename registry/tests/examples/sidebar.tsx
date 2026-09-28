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
              <SidebarMenuItem><SidebarMenuLink href="#overview" isActive tooltip="Overview"><svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 10 9-7 9 7v10H3Z" /><path d="M9 20v-7h6v7" /></svg><span>Overview</span></SidebarMenuLink></SidebarMenuItem>
              <SidebarMenuItem><SidebarMenuLink href="#settings" tooltip="Settings"><svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1Z" /><circle cx="12" cy="12" r="3" /></svg><span>Settings</span></SidebarMenuLink></SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    <SidebarInset><header className="p-3"><SidebarTrigger /></header><section id="overview" className="p-4">Workspace overview</section></SidebarInset>
  </SidebarProvider>;
}

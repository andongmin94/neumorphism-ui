"use client";

import { Sidebar, SidebarProvider, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
export default function Example() {
    const text = {
        "close": "Close"
    };
    const sidebar = {
        "workspace": "Workspace",
        "navigation": "Navigation",
        "overview": "Overview",
        "settings": "Settings",
        "toggle": "Toggle sidebar",
        "body": "Review the most important information for the current project."
    };
    return <SidebarProvider className="h-56 w-full max-w-lg overflow-hidden rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] [box-shadow:var(--neu-shadow-inset)]"><Sidebar collapsible="icon" mobileTitle={sidebar.workspace} mobileDescription={sidebar.navigation} closeLabel={text.close}><SidebarHeader><strong className="truncate text-sm">{sidebar.workspace}</strong></SidebarHeader><SidebarContent><SidebarGroup><SidebarGroupLabel>{sidebar.navigation}</SidebarGroupLabel><SidebarGroupContent><SidebarMenu><SidebarMenuItem><SidebarMenuButton isActive tooltip={sidebar.overview}><svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 10 9-7 9 7v10H3Z"/><path d="M9 20v-7h6v7"/></svg><span>{sidebar.overview}</span></SidebarMenuButton></SidebarMenuItem><SidebarMenuItem><SidebarMenuButton tooltip={sidebar.settings}><svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1Z"/><circle cx="12" cy="12" r="3"/></svg><span>{sidebar.settings}</span></SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarGroupContent></SidebarGroup></SidebarContent></Sidebar><SidebarInset><header className="flex items-center gap-2 border-b border-[var(--border)] p-2"><SidebarTrigger label={sidebar.toggle}/><strong className="text-sm">{sidebar.overview}</strong></header><div className="p-4 text-sm text-[var(--muted-foreground)]">{sidebar.body}</div></SidebarInset></SidebarProvider>;
}

"use client";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuViewport } from "@/components/ui/navigation-menu";
export default function Example() {
  return <div><NavigationMenu aria-label="Product"><NavigationMenuList><NavigationMenuItem><NavigationMenuTrigger>Product</NavigationMenuTrigger><NavigationMenuContent><NavigationMenuLink href="#navigation-guide">Guide</NavigationMenuLink></NavigationMenuContent></NavigationMenuItem></NavigationMenuList><NavigationMenuViewport /></NavigationMenu><p id="navigation-guide">Guide</p></div>;
}

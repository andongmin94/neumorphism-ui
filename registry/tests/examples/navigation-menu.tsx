"use client";

import * as React from "react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuViewport } from "@/components/ui/navigation-menu";
export default function Example() {
    const t = {
        "product": "Product",
        "components": "Components",
        "themes": "Themes",
        "guides": "Guides",
        "guideText": "Choose a destination from the navigation menu."
    };
    const id = React.useId();
    const componentCount = 56;
    return <div className="grid w-full gap-5"><NavigationMenu aria-label={t.product}><NavigationMenuList><NavigationMenuItem><NavigationMenuTrigger>{t.product}</NavigationMenuTrigger><NavigationMenuContent><NavigationMenuLink href={`#${id}-components`}>{t.components}</NavigationMenuLink><NavigationMenuLink href={`#${id}-themes`}>{t.themes}</NavigationMenuLink></NavigationMenuContent></NavigationMenuItem><NavigationMenuItem><NavigationMenuLink href={`#${id}-guide`}>{t.guides}</NavigationMenuLink></NavigationMenuItem></NavigationMenuList><NavigationMenuViewport /></NavigationMenu><div className="grid gap-2 text-sm text-[var(--muted-foreground)] [&>p[id]]:scroll-mt-24"><p id={`${id}-guide`}>{t.guideText}</p><p id={`${id}-components`}>{t.components} · {componentCount}</p><p id={`${id}-themes`}>{t.themes} · 5</p></div></div>;
}

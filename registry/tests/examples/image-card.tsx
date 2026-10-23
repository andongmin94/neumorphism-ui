"use client";

import { ImageCard } from "@/components/ui/image-card";
export default function Example() {
    const image = {
        "alt": "Workspace cover with a soft blue gradient",
        "caption": "Design system workspace · 12 components"
    };
    const previewImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1'%3E%3Cstop stop-color='%23dbeafe'/%3E%3Cstop offset='1' stop-color='%23bfdbfe'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='4' height='3' fill='url(%23g)'/%3E%3C/svg%3E";
    return <ImageCard src={previewImage} alt={image.alt} caption={image.caption} className="max-w-xs"/>;
}

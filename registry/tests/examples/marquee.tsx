"use client";

import { Marquee } from "@/components/ui/marquee";
export default function Example() {
    const marquee = {
        "items": [
            "Accessibility",
            "Base UI",
            "React 19",
            "Tailwind 4"
        ],
        "label": "Supported technologies",
        "pause": "Pause animation",
        "resume": "Resume animation"
    };
    return <Marquee items={marquee.items} label={marquee.label} pauseLabel={marquee.pause} resumeLabel={marquee.resume} duration={18}/>;
}

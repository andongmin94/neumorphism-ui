"use client";

import { useEffect } from "react";
import { inject } from "@vercel/analytics";

const productionOrigin = "https://neumorphism-ui.andongmin.com";

export function SiteAnalytics() {
  useEffect(() => {
    if (!import.meta.env.PROD || window.location.origin !== productionOrigin || navigator.webdriver) return;

    inject({
      mode: "production",
      debug: false,
      beforeSend(event) {
        if (event.type !== "pageview") return null;
        const url = new URL(event.url);
        if (url.origin !== productionOrigin) return null;
        return { ...event, url: `${url.origin}${url.pathname}` };
      },
    });
  }, []);

  return null;
}

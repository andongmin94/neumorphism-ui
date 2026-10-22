"use client";

import { useEffect } from "react";

const productionOrigin = "https://neumorphism-ui.andongmin.com";

export function SiteAnalytics() {
  useEffect(() => {
    if (!import.meta.env.PROD || window.location.origin !== productionOrigin || navigator.webdriver) return;

    if (document.getElementById("cloudflare-web-analytics")) return;
    const script = document.createElement("script");
    script.id = "cloudflare-web-analytics";
    script.type = "module";
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.dataset.cfBeacon = JSON.stringify({ token: "70770d2bd86349b3bbc52fcbb8c9a9ca" });
    document.head.appendChild(script);
  }, []);

  return null;
}

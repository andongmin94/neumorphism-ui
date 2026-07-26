import { headers } from "next/headers";

const FALLBACK_ORIGIN = "https://neumorphism-ui.dev";

export async function getRequestOrigin() {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost ?? requestHeaders.get("host") ?? "neumorphism-ui.dev";
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol =
    forwardedProtocol === "http" || forwardedProtocol === "https"
      ? forwardedProtocol
      : host.startsWith("localhost") || host.startsWith("127.")
        ? "http"
        : "https";
  const origin = `${protocol}://${host}`;

  return URL.canParse(origin) ? origin : FALLBACK_ORIGIN;
}

const FALLBACK_ORIGIN = "https://neumorphism-ui.dev";

export async function getRequestOrigin() {
  const configured = process.env.NEUMORPHISM_UI_ORIGIN?.trim();
  if (!configured) return FALLBACK_ORIGIN;
  return URL.canParse(configured) ? configured.replace(/\/$/, "") : FALLBACK_ORIGIN;
}

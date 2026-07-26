export const THEME_STORAGE_KEY = "neumorphism-ui-style-v2";
export const LEGACY_THEME_STORAGE_KEY = "neumorphism-ui-style-v1";

export const themePresetIds = [
  "air",
  "lavender",
  "sage",
  "clay",
  "graphite",
] as const;

export const themeDepthIds = ["subtle", "balanced", "deep"] as const;
export const themeLightDirections = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
] as const;
export const themeControlShapes = ["rounded", "soft", "pill"] as const;
export const themeMotionValues = [120, 180, 260] as const;

export type ThemePresetId = (typeof themePresetIds)[number];
export type ThemeDepth = (typeof themeDepthIds)[number];
export type ThemeLightDirection = (typeof themeLightDirections)[number];
export type ThemeControlShape = (typeof themeControlShapes)[number];
export type ThemeMotion = (typeof themeMotionValues)[number];
export type ThemeMode = "light" | "dark";

type ThemeModeTokens = {
  background: string;
  surface: string;
  surfaceSoft: string;
  surfaceLow: string;
  popover: string;
  secondary: string;
  foreground: string;
  mutedForeground: string;
  primary: string;
  primaryForeground: string;
  destructive: string;
  border: string;
  input: string;
  edge: string;
  shadowDark: string;
  shadowLight: string;
};

export type ThemePreset = {
  id: ThemePresetId;
  name: string;
  description: string;
  registryName: string;
  defaults: Pick<
    ThemeSettings,
    | "depth"
    | "lightDirection"
    | "surfaceRadius"
    | "controlShape"
    | "motion"
  >;
  light: ThemeModeTokens;
  dark: ThemeModeTokens;
};

export type ThemeSettings = {
  schemaVersion: 2;
  presetId: ThemePresetId;
  accent: string | null;
  depth: ThemeDepth;
  lightDirection: ThemeLightDirection;
  surfaceRadius: number;
  controlShape: ThemeControlShape;
  motion: ThemeMotion;
};

export const themePresets: readonly ThemePreset[] = [
  {
    id: "air",
    name: "Air",
    description: "차가운 회청색 · 선명한 블루",
    registryName: "style-air",
    defaults: {
      depth: "balanced",
      lightDirection: "top-left",
      surfaceRadius: 18,
      controlShape: "soft",
      motion: 180,
    },
    light: {
      background: "#e5ebf1",
      surface: "#e9eef4",
      surfaceSoft: "#f3f6f9",
      surfaceLow: "#dbe2ea",
      popover: "#eef3f8",
      secondary: "#dfe6ee",
      foreground: "#172033",
      mutedForeground: "#566478",
      primary: "#1267f4",
      primaryForeground: "#ffffff",
      destructive: "#b92e43",
      border: "rgb(83 99 123 / 0.18)",
      input: "rgb(83 99 123 / 0.16)",
      edge: "rgb(255 255 255 / 0.72)",
      shadowDark: "rgb(30 48 72 / 0.14)",
      shadowLight: "rgb(255 255 255 / 0.88)",
    },
    dark: {
      background: "#151a22",
      surface: "#1b222c",
      surfaceSoft: "#242d39",
      surfaceLow: "#141922",
      popover: "#1b222c",
      secondary: "#202a36",
      foreground: "#e9f0fa",
      mutedForeground: "#8fa1b7",
      primary: "#5aa2ff",
      primaryForeground: "#07111f",
      destructive: "#ff7685",
      border: "rgb(255 255 255 / 0.10)",
      input: "rgb(255 255 255 / 0.12)",
      edge: "rgb(255 255 255 / 0.07)",
      shadowDark: "rgb(0 0 0 / 0.34)",
      shadowLight: "rgb(255 255 255 / 0.065)",
    },
  },
  {
    id: "lavender",
    name: "Lavender",
    description: "보랏빛 회색 · 낮은 대비",
    registryName: "style-lavender",
    defaults: {
      depth: "subtle",
      lightDirection: "top-left",
      surfaceRadius: 26,
      controlShape: "pill",
      motion: 260,
    },
    light: {
      background: "#ebe9f4",
      surface: "#ebe9f4",
      surfaceSoft: "#f6f3fb",
      surfaceLow: "#ddd9e9",
      popover: "#f2eff8",
      secondary: "#e0ddea",
      foreground: "#252036",
      mutedForeground: "#6f6680",
      primary: "#7557df",
      primaryForeground: "#ffffff",
      destructive: "#cf5368",
      border: "rgb(111 102 128 / 0.22)",
      input: "rgb(111 102 128 / 0.18)",
      edge: "rgb(255 255 255 / 0.72)",
      shadowDark: "rgb(45 32 76 / 0.16)",
      shadowLight: "rgb(255 255 255 / 0.96)",
    },
    dark: {
      background: "#171520",
      surface: "#1e1a2a",
      surfaceSoft: "#292339",
      surfaceLow: "#131119",
      popover: "#1e1a2a",
      secondary: "#282237",
      foreground: "#f1edff",
      mutedForeground: "#aaa0bd",
      primary: "#a98cff",
      primaryForeground: "#171022",
      destructive: "#ff7891",
      border: "rgb(255 255 255 / 0.10)",
      input: "rgb(255 255 255 / 0.12)",
      edge: "rgb(255 255 255 / 0.08)",
      shadowDark: "rgb(0 0 0 / 0.44)",
      shadowLight: "rgb(255 255 255 / 0.045)",
    },
  },
  {
    id: "sage",
    name: "Sage",
    description: "차분한 세이지 · 자연스러운 대비",
    registryName: "style-sage",
    defaults: {
      depth: "subtle",
      lightDirection: "top-right",
      surfaceRadius: 18,
      controlShape: "soft",
      motion: 180,
    },
    light: {
      background: "#e7eee9",
      surface: "#e7eee9",
      surfaceSoft: "#f2f7f3",
      surfaceLow: "#d8e3db",
      popover: "#eef5f0",
      secondary: "#dbe6de",
      foreground: "#1a2b24",
      mutedForeground: "#5f746a",
      primary: "#23856b",
      primaryForeground: "#ffffff",
      destructive: "#cf5962",
      border: "rgb(95 116 106 / 0.22)",
      input: "rgb(95 116 106 / 0.18)",
      edge: "rgb(255 255 255 / 0.72)",
      shadowDark: "rgb(26 56 43 / 0.15)",
      shadowLight: "rgb(255 255 255 / 0.94)",
    },
    dark: {
      background: "#121b17",
      surface: "#19251f",
      surfaceSoft: "#223129",
      surfaceLow: "#101713",
      popover: "#19251f",
      secondary: "#213028",
      foreground: "#e9f5ee",
      mutedForeground: "#91aa9d",
      primary: "#62c8a7",
      primaryForeground: "#071710",
      destructive: "#ff7b82",
      border: "rgb(255 255 255 / 0.10)",
      input: "rgb(255 255 255 / 0.12)",
      edge: "rgb(255 255 255 / 0.075)",
      shadowDark: "rgb(0 0 0 / 0.44)",
      shadowLight: "rgb(255 255 255 / 0.04)",
    },
  },
  {
    id: "clay",
    name: "Clay",
    description: "따뜻한 베이지 · 코랄",
    registryName: "style-clay",
    defaults: {
      depth: "balanced",
      lightDirection: "top-left",
      surfaceRadius: 14,
      controlShape: "rounded",
      motion: 180,
    },
    light: {
      background: "#efe8df",
      surface: "#efe8df",
      surfaceSoft: "#faf4ec",
      surfaceLow: "#e2d7cb",
      popover: "#f6efe7",
      secondary: "#e5dbd0",
      foreground: "#35271f",
      mutedForeground: "#806e62",
      primary: "#d46b4c",
      primaryForeground: "#2b140d",
      destructive: "#c84851",
      border: "rgb(128 110 98 / 0.22)",
      input: "rgb(128 110 98 / 0.18)",
      edge: "rgb(255 255 255 / 0.68)",
      shadowDark: "rgb(76 50 33 / 0.16)",
      shadowLight: "rgb(255 255 255 / 0.90)",
    },
    dark: {
      background: "#211814",
      surface: "#2a1f19",
      surfaceSoft: "#382920",
      surfaceLow: "#18120f",
      popover: "#2a1f19",
      secondary: "#37281f",
      foreground: "#f8eee6",
      mutedForeground: "#b8a093",
      primary: "#f08b6b",
      primaryForeground: "#21110b",
      destructive: "#ff7378",
      border: "rgb(255 255 255 / 0.10)",
      input: "rgb(255 255 255 / 0.12)",
      edge: "rgb(255 255 255 / 0.075)",
      shadowDark: "rgb(0 0 0 / 0.46)",
      shadowLight: "rgb(255 255 255 / 0.04)",
    },
  },
  {
    id: "graphite",
    name: "Graphite",
    description: "중성 회색 · 높은 대비",
    registryName: "style-graphite",
    defaults: {
      depth: "deep",
      lightDirection: "top-left",
      surfaceRadius: 8,
      controlShape: "rounded",
      motion: 120,
    },
    light: {
      background: "#e6e8eb",
      surface: "#e6e8eb",
      surfaceSoft: "#f1f3f5",
      surfaceLow: "#d5d9de",
      popover: "#edf0f2",
      secondary: "#d9dde1",
      foreground: "#1d232b",
      mutedForeground: "#626b76",
      primary: "#3f536f",
      primaryForeground: "#ffffff",
      destructive: "#c8545f",
      border: "rgb(98 107 118 / 0.22)",
      input: "rgb(98 107 118 / 0.18)",
      edge: "rgb(255 255 255 / 0.70)",
      shadowDark: "rgb(31 39 50 / 0.17)",
      shadowLight: "rgb(255 255 255 / 0.94)",
    },
    dark: {
      background: "#111419",
      surface: "#181c22",
      surfaceSoft: "#222831",
      surfaceLow: "#0d1014",
      popover: "#181c22",
      secondary: "#20262e",
      foreground: "#edf1f6",
      mutedForeground: "#929ca9",
      primary: "#b2c2d8",
      primaryForeground: "#11161d",
      destructive: "#ff7885",
      border: "rgb(255 255 255 / 0.10)",
      input: "rgb(255 255 255 / 0.12)",
      edge: "rgb(255 255 255 / 0.08)",
      shadowDark: "rgb(0 0 0 / 0.48)",
      shadowLight: "rgb(255 255 255 / 0.045)",
    },
  },
] as const;

export const defaultThemeSettings: ThemeSettings = {
  schemaVersion: 2,
  presetId: "air",
  accent: null,
  depth: "balanced",
  lightDirection: "top-left",
  surfaceRadius: 18,
  controlShape: "soft",
  motion: 180,
};

const depthProfiles: Record<
  ThemeDepth,
  { offset: number; blur: number; smallOffset: number; smallBlur: number }
> = {
  subtle: { offset: 4, blur: 10, smallOffset: 2, smallBlur: 6 },
  balanced: { offset: 6, blur: 15, smallOffset: 2, smallBlur: 6 },
  deep: { offset: 10, blur: 22, smallOffset: 4, smallBlur: 10 },
};

const directionVectors: Record<ThemeLightDirection, [number, number]> = {
  "top-left": [1, 1],
  "top-right": [-1, 1],
  "bottom-left": [1, -1],
  "bottom-right": [-1, -1],
};

function isOneOf<T extends string>(
  value: unknown,
  values: readonly T[],
): value is T {
  return typeof value === "string" && values.includes(value as T);
}

function isHexColor(value: unknown): value is string {
  return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value);
}

function readableForeground(hex: string) {
  function relativeLuminance(color: string) {
    const channels = [1, 3, 5].map((offset) => {
      const value = Number.parseInt(color.slice(offset, offset + 2), 16) / 255;
      return value <= 0.04045
        ? value / 12.92
        : ((value + 0.055) / 1.055) ** 2.4;
    });

    return (
      channels[0] * 0.2126 +
      channels[1] * 0.7152 +
      channels[2] * 0.0722
    );
  }

  const background = relativeLuminance(hex);
  const light = relativeLuminance("#ffffff");
  const dark = relativeLuminance("#111827");
  const lightContrast = (light + 0.05) / (background + 0.05);
  const darkContrast = (background + 0.05) / (dark + 0.05);

  return lightContrast >= darkContrast ? "#ffffff" : "#111827";
}

export function getThemePreset(id: ThemePresetId) {
  return themePresets.find((preset) => preset.id === id) ?? themePresets[0];
}

export function parseThemeSettings(value: string | null): ThemeSettings | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as Partial<ThemeSettings>;
    if (
      parsed.schemaVersion !== 2 ||
      !isOneOf(parsed.presetId, themePresetIds) ||
      !(parsed.accent === null || isHexColor(parsed.accent)) ||
      !isOneOf(parsed.depth, themeDepthIds) ||
      !isOneOf(parsed.lightDirection, themeLightDirections) ||
      !isOneOf(parsed.controlShape, themeControlShapes) ||
      !themeMotionValues.includes(parsed.motion as ThemeMotion) ||
      typeof parsed.surfaceRadius !== "number" ||
      parsed.surfaceRadius < 8 ||
      parsed.surfaceRadius > 32
    ) {
      return null;
    }

    return parsed as ThemeSettings;
  } catch {
    return null;
  }
}

function shadowValue(
  x: number,
  y: number,
  offset: number,
  blur: number,
  dark: string,
  light: string,
  inset = false,
) {
  const prefix = inset ? "inset " : "";
  return `${prefix}${x * offset}px ${y * offset}px ${blur}px ${dark}, ${prefix}${-x * offset}px ${-y * offset}px ${blur}px ${light}`;
}

export function buildThemeVariables(
  settings: ThemeSettings,
  mode: ThemeMode,
): Record<string, string> {
  const preset = getThemePreset(settings.presetId);
  const tokens = preset[mode];
  const primary = settings.accent ?? tokens.primary;
  const primaryForeground = settings.accent
    ? readableForeground(settings.accent)
    : tokens.primaryForeground;
  const profile = depthProfiles[settings.depth];
  const [x, y] = directionVectors[settings.lightDirection];
  const insetOffset = Math.max(2, Math.round(profile.smallOffset * 0.7));
  const insetBlur = Math.max(5, Math.ceil(profile.smallBlur * 0.9));
  const controlRadius =
    settings.controlShape === "pill"
      ? "999px"
      : settings.controlShape === "soft"
        ? "12px"
        : "10px";
  const raisedSmallLight = `color-mix(in srgb, ${tokens.shadowLight} 94%, transparent)`;
  const insetLight = `color-mix(in srgb, ${tokens.shadowLight} 97%, transparent)`;
  const primaryShadow = `${x * profile.smallOffset}px ${y * (profile.smallOffset + 1)}px ${profile.smallBlur + 1}px ${tokens.shadowDark}, ${-x * profile.smallOffset}px ${-y * profile.smallOffset}px ${profile.smallBlur}px ${raisedSmallLight}, inset 0 1px 0 color-mix(in srgb, ${primary} 72%, white)`;
  const primaryInsetShadow = shadowValue(
    x,
    y,
    2,
    5,
    `color-mix(in srgb, ${primary} 68%, black)`,
    `color-mix(in srgb, ${primary} 78%, white)`,
    true,
  );

  return {
    "--background": tokens.background,
    "--foreground": tokens.foreground,
    "--card": tokens.surface,
    "--card-foreground": tokens.foreground,
    "--popover": tokens.popover,
    "--popover-foreground": tokens.foreground,
    "--primary": primary,
    "--primary-foreground": primaryForeground,
    "--secondary": tokens.secondary,
    "--secondary-foreground": tokens.foreground,
    "--muted-foreground": tokens.mutedForeground,
    "--destructive": tokens.destructive,
    "--success": mode === "light" ? "#0a9b78" : "#40d6ad",
    "--border": tokens.border,
    "--input": tokens.input,
    "--ring": primary,
    "--radius": `${settings.surfaceRadius}px`,
    "--neu-surface": tokens.surface,
    "--neu-surface-soft": tokens.surfaceSoft,
    "--neu-surface-low": tokens.surfaceLow,
    "--neu-edge": tokens.edge,
    "--neu-shadow-dark": tokens.shadowDark,
    "--neu-shadow-light": tokens.shadowLight,
    "--neu-shadow-raised": shadowValue(
      x,
      y,
      profile.offset,
      profile.blur,
      tokens.shadowDark,
      tokens.shadowLight,
    ),
    "--neu-shadow-raised-sm": shadowValue(
      x,
      y,
      profile.smallOffset,
      profile.smallBlur,
      tokens.shadowDark,
      raisedSmallLight,
    ),
    "--neu-shadow-inset": shadowValue(
      x,
      y,
      insetOffset,
      insetBlur,
      tokens.shadowDark,
      insetLight,
      true,
    ),
    "--neu-shadow-inset-sm": shadowValue(
      x,
      y,
      1,
      3,
      tokens.shadowDark,
      tokens.shadowLight,
      true,
    ),
    "--neu-shadow-primary": primaryShadow,
    "--neu-shadow-primary-inset": primaryInsetShadow,
    "--neu-shadow-destructive-inset": shadowValue(
      x,
      y,
      2,
      5,
      `color-mix(in srgb, ${tokens.destructive} 68%, black)`,
      `color-mix(in srgb, ${tokens.destructive} 78%, white)`,
      true,
    ),
    "--neu-overlay":
      mode === "light" ? "rgb(15 23 42 / 0.28)" : "rgb(0 0 0 / 0.55)",
    "--neu-radius-control": controlRadius,
    "--neu-radius-surface": `${settings.surfaceRadius}px`,
    "--neu-radius-overlay": `calc(${settings.surfaceRadius}px + 4px)`,
    "--neu-duration": `${settings.motion}ms`,
    "--surface": "var(--neu-surface)",
    "--surface-soft": "var(--neu-surface-soft)",
    "--surface-low": "var(--neu-surface-low)",
    "--surface-glass": `color-mix(in srgb, ${tokens.surface} 84%, transparent)`,
    "--muted": tokens.mutedForeground,
    "--line": `color-mix(in srgb, ${tokens.border} 76%, transparent)`,
    "--line-light": "var(--neu-edge)",
    "--accent": primary,
    "--accent-ink":
      mode === "light"
        ? `color-mix(in srgb, ${primary} 82%, #06152d)`
        : primary,
    "--accent-foreground": primaryForeground,
    "--danger": tokens.destructive,
    "--shadow-dark": "var(--neu-shadow-dark)",
    "--shadow-light": "var(--neu-shadow-light)",
    "--shadow-raised": "var(--neu-shadow-raised)",
    "--shadow-soft": "var(--neu-shadow-raised-sm)",
    "--shadow-inset": "var(--neu-shadow-inset)",
    "--shadow-accent": "var(--neu-shadow-primary)",
    "--accent-bright": `color-mix(in srgb, ${primary} 68%, white)`,
    "--accent-deep": `color-mix(in srgb, ${primary} 76%, black)`,
    "--foreground-soft": `color-mix(in srgb, ${tokens.foreground} 76%, ${tokens.mutedForeground})`,
  };
}

export function getThemeBootstrapScript() {
  const presets = Object.fromEntries(
    themePresets.map((preset) => [
      preset.id,
      { light: preset.light, dark: preset.dark },
    ]),
  );

  return `(function(){try{
var root=document.documentElement;
var mode=localStorage.getItem("neumorphism-ui-theme");
if(mode!=="light"&&mode!=="dark"){mode=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}
root.dataset.theme=mode;
root.classList.toggle("dark",mode==="dark");
root.style.colorScheme=mode;
var presets=${JSON.stringify(presets)};
var defaults=${JSON.stringify(defaultThemeSettings)};
var profiles=${JSON.stringify(depthProfiles)};
var vectors=${JSON.stringify(directionVectors)};
var settings=defaults;
try{
  var parsed=JSON.parse(localStorage.getItem("${THEME_STORAGE_KEY}")||"null");
  if(parsed&&parsed.schemaVersion===2&&presets[parsed.presetId]&&profiles[parsed.depth]&&vectors[parsed.lightDirection]&&["rounded","soft","pill"].indexOf(parsed.controlShape)!==-1&&[120,180,260].indexOf(parsed.motion)!==-1&&typeof parsed.surfaceRadius==="number"&&parsed.surfaceRadius>=8&&parsed.surfaceRadius<=32&&(parsed.accent===null||/^#[0-9a-f]{6}$/i.test(parsed.accent))){settings=parsed}
}catch(ignore){}
localStorage.removeItem("${LEGACY_THEME_STORAGE_KEY}");
var tokens=presets[settings.presetId][mode];
var primary=settings.accent||tokens.primary;
function luminance(hex){
  var values=[1,3,5].map(function(offset){
    var value=parseInt(hex.slice(offset,offset+2),16)/255;
    return value<=0.04045?value/12.92:Math.pow((value+0.055)/1.055,2.4);
  });
  return values[0]*0.2126+values[1]*0.7152+values[2]*0.0722;
}
function foreground(hex){
  var background=luminance(hex);
  return (1.05/(background+0.05))>=((background+0.05)/(luminance("#111827")+0.05))?"#ffffff":"#111827";
}
function shadow(x,y,offset,blur,dark,light,inset){
  var prefix=inset?"inset ":"";
  return prefix+(x*offset)+"px "+(y*offset)+"px "+blur+"px "+dark+", "+prefix+(-x*offset)+"px "+(-y*offset)+"px "+blur+"px "+light;
}
var primaryForeground=settings.accent?foreground(settings.accent):tokens.primaryForeground;
var profile=profiles[settings.depth];
var vector=vectors[settings.lightDirection];
var x=vector[0],y=vector[1];
var insetOffset=Math.max(2,Math.round(profile.smallOffset*0.7));
var insetBlur=Math.max(5,Math.ceil(profile.smallBlur*0.9));
var controlRadius=settings.controlShape==="pill"?"999px":settings.controlShape==="soft"?"12px":"10px";
var smallLight="color-mix(in srgb, "+tokens.shadowLight+" 94%, transparent)";
var insetLight="color-mix(in srgb, "+tokens.shadowLight+" 97%, transparent)";
var values={
  "--background":tokens.background,
  "--foreground":tokens.foreground,
  "--card":tokens.surface,
  "--card-foreground":tokens.foreground,
  "--popover":tokens.popover,
  "--popover-foreground":tokens.foreground,
  "--primary":primary,
  "--primary-foreground":primaryForeground,
  "--secondary":tokens.secondary,
  "--secondary-foreground":tokens.foreground,
  "--muted-foreground":tokens.mutedForeground,
  "--destructive":tokens.destructive,
  "--success":mode==="light"?"#0a9b78":"#40d6ad",
  "--border":tokens.border,
  "--input":tokens.input,
  "--ring":primary,
  "--radius":settings.surfaceRadius+"px",
  "--neu-surface":tokens.surface,
  "--neu-surface-soft":tokens.surfaceSoft,
  "--neu-surface-low":tokens.surfaceLow,
  "--neu-edge":tokens.edge,
  "--neu-shadow-dark":tokens.shadowDark,
  "--neu-shadow-light":tokens.shadowLight,
  "--neu-shadow-raised":shadow(x,y,profile.offset,profile.blur,tokens.shadowDark,tokens.shadowLight,false),
  "--neu-shadow-raised-sm":shadow(x,y,profile.smallOffset,profile.smallBlur,tokens.shadowDark,smallLight,false),
  "--neu-shadow-inset":shadow(x,y,insetOffset,insetBlur,tokens.shadowDark,insetLight,true),
  "--neu-shadow-inset-sm":shadow(x,y,1,3,tokens.shadowDark,tokens.shadowLight,true),
  "--neu-shadow-primary":(x*profile.smallOffset)+"px "+(y*(profile.smallOffset+1))+"px "+(profile.smallBlur+1)+"px "+tokens.shadowDark+", "+(-x*profile.smallOffset)+"px "+(-y*profile.smallOffset)+"px "+profile.smallBlur+"px "+smallLight+", inset 0 1px 0 color-mix(in srgb, "+primary+" 72%, white)",
  "--neu-shadow-primary-inset":shadow(x,y,2,5,"color-mix(in srgb, "+primary+" 68%, black)","color-mix(in srgb, "+primary+" 78%, white)",true),
  "--neu-shadow-destructive-inset":shadow(x,y,2,5,"color-mix(in srgb, "+tokens.destructive+" 68%, black)","color-mix(in srgb, "+tokens.destructive+" 78%, white)",true),
  "--neu-overlay":mode==="light"?"rgb(15 23 42 / 0.28)":"rgb(0 0 0 / 0.55)",
  "--neu-radius-control":controlRadius,
  "--neu-radius-surface":settings.surfaceRadius+"px",
  "--neu-radius-overlay":"calc("+settings.surfaceRadius+"px + 4px)",
  "--neu-duration":settings.motion+"ms",
  "--surface":"var(--neu-surface)",
  "--surface-soft":"var(--neu-surface-soft)",
  "--surface-low":"var(--neu-surface-low)",
  "--surface-glass":"color-mix(in srgb, "+tokens.surface+" 84%, transparent)",
  "--muted":tokens.mutedForeground,
  "--line":"color-mix(in srgb, "+tokens.border+" 76%, transparent)",
  "--line-light":"var(--neu-edge)",
  "--accent":primary,
  "--accent-ink":mode==="light"?"color-mix(in srgb, "+primary+" 82%, #06152d)":primary,
  "--accent-foreground":primaryForeground,
  "--danger":tokens.destructive,
  "--shadow-dark":"var(--neu-shadow-dark)",
  "--shadow-light":"var(--neu-shadow-light)",
  "--shadow-raised":"var(--neu-shadow-raised)",
  "--shadow-soft":"var(--neu-shadow-raised-sm)",
  "--shadow-inset":"var(--neu-shadow-inset)",
  "--shadow-accent":"var(--neu-shadow-primary)",
  "--accent-bright":"color-mix(in srgb, "+primary+" 68%, white)",
  "--accent-deep":"color-mix(in srgb, "+primary+" 76%, black)",
  "--foreground-soft":"color-mix(in srgb, "+tokens.foreground+" 76%, "+tokens.mutedForeground+")"
};
Object.keys(values).forEach(function(property){root.style.setProperty(property,values[property])});
root.dataset.customTheme=settings.presetId;
}catch(error){}})();`;
}

const customizableProperties = Object.keys(
  buildThemeVariables(defaultThemeSettings, "light"),
);

export function applyThemeSettings(settings: ThemeSettings) {
  const root = document.documentElement;
  const mode: ThemeMode = root.classList.contains("dark") ? "dark" : "light";
  const variables = buildThemeVariables(settings, mode);

  for (const [property, value] of Object.entries(variables)) {
    root.style.setProperty(property, value);
  }
  root.dataset.customTheme = settings.presetId;
}

export function clearThemeSettings() {
  const root = document.documentElement;
  for (const property of customizableProperties) {
    root.style.removeProperty(property);
  }
  delete root.dataset.customTheme;
}

function formatVariables(variables: Record<string, string>) {
  return Object.entries(variables)
    .map(([property, value]) => `  ${property}: ${value};`)
    .join("\n");
}

export function buildThemeCss(settings: ThemeSettings) {
  const preset = getThemePreset(settings.presetId);
  const label = `${preset.name} · ${settings.depth} · ${settings.lightDirection}`;

  return `/* Neumorphism UI theme — ${label} */
:root {
${formatVariables(buildThemeVariables(settings, "light"))}
}

.dark {
${formatVariables(buildThemeVariables(settings, "dark"))}
}`;
}

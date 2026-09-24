import fs from "node:fs";
import { fileURLToPath } from "node:url";
import ts from "@typescript/typescript6";
import { buildThemeCss, buildThemeVariables, defaultThemeSettings, themePresets } from "../src/theme.ts";
const root = fileURLToPath(new URL("../", import.meta.url));
const colors = ["background", "foreground", "card", "card-foreground", "popover", "popover-foreground", "primary", "primary-foreground", "secondary", "secondary-foreground", "muted", "muted-foreground", "accent", "accent-foreground", "destructive", "destructive-foreground", "success", "border", "input", "ring"];
const theme = {
  "font-sans": "var(--neu-font-sans)",
  "font-mono": "var(--neu-font-mono)",
  ...Object.fromEntries(colors.map((name) => [`color-${name}`, `var(--${name})`])),
  "radius-sm": "calc(var(--radius) - 4px)", "radius-md": "calc(var(--radius) - 2px)", "radius-lg": "var(--radius)", "radius-xl": "calc(var(--radius) + 4px)",
  ...Object.fromEntries(["raised", "raised-sm", "inset", "primary"].map((name) => [`shadow-neu-${name}`, `var(--neu-shadow-${name})`])),
};
const css = {
  "@layer base": { "*": { "@apply border-border outline-ring/50": {} }, body: { "@apply bg-background text-foreground": {}, "font-family": "var(--neu-font-sans)" }, "code, pre, kbd, samp": { "font-family": "var(--neu-font-mono)" } },
  "@layer components": {
    ".neu-raised": { background: "var(--neu-surface)", "box-shadow": "var(--neu-shadow-raised)" },
    ".neu-raised-sm": { background: "var(--neu-surface)", "box-shadow": "var(--neu-shadow-raised-sm)" },
    ".neu-inset": { background: "var(--neu-surface)", "box-shadow": "var(--neu-shadow-inset)" },
    ".neu-primary": { background: "var(--primary)", color: "var(--primary-foreground)", "box-shadow": "var(--neu-shadow-primary)" },
  },
  "@media (prefers-reduced-motion: reduce)": {
    ".neu-raised, .neu-raised-sm, .neu-inset, .neu-primary": { "transition-duration": "0.01ms !important", "animation": "none !important" },
  },
};
function itemVariables(settings, mode) {
  return Object.fromEntries(Object.entries(buildThemeVariables(settings, mode)).map(([key, value]) => [key.slice(2), value]));
}
export function makeRegistry() {
  const registry = JSON.parse(fs.readFileSync(`${root}catalog.json`, "utf8"));
  for (const item of registry.items) {
    if (item.type === "registry:base") {
      item.cssVars = { theme, light: itemVariables(defaultThemeSettings, "light"), dark: itemVariables(defaultThemeSettings, "dark") };
      item.css = css;
    } else if (item.type === "registry:style") {
      const preset = themePresets.find((candidate) => candidate.registryName === item.name);
      if (!preset) throw new Error(`Missing theme preset: ${item.name}`);
      const settings = { ...defaultThemeSettings, ...preset.defaults, presetId: preset.id };
      item.cssVars = { light: itemVariables(settings, "light"), dark: itemVariables(settings, "dark") };
    }
  }
  return registry;
}
export function makeThemeCss() {
  return `/* Generated from registry/src/theme.ts. Do not edit. */\n${buildThemeCss(defaultThemeSettings)}\n\n@theme inline {\n${Object.entries(theme).map(([name, value]) => `  --${name}: ${value};`).join("\n")}\n}\n`;
}
export function makeBootstrapModule() {
  // Compile the actual engine rather than maintaining a parallel JS implementation.
  const source = fs.readFileSync(`${root}src/theme.ts`, "utf8");
  const result = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, removeComments: true } });
  const engine = result.outputText.replace(/^export /gm, "");
  const script = `(function(){\n${engine}\nconst root=document.documentElement;\nlet mode;\nlet settings=defaultThemeSettings;\ntry{mode=localStorage.getItem("neumorphism-ui-theme");settings=parseThemeSettings(localStorage.getItem(THEME_STORAGE_KEY))??defaultThemeSettings}catch{}\nif(mode!=="light"&&mode!=="dark")mode=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";\nroot.dataset.theme=mode;root.classList.toggle("dark",mode==="dark");root.style.colorScheme=mode;\nfor(const [name,value] of Object.entries(buildThemeVariables(settings,mode)))root.style.setProperty(name,value);\nroot.dataset.customTheme=settings.presetId;\n})();`;
  return `// Generated from registry/src/theme.ts. Do not edit.\nexport const THEME_BOOTSTRAP_SCRIPT = ${JSON.stringify(script).replaceAll("<", "\\u003c")};\n`;
}

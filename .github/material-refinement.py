from pathlib import Path
import sys, re

root = Path('.')
def write(path, text):
    p = root / path
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding='utf-8')
def edit(path, changes):
    p = root / path
    text = p.read_text()
    for old, new in changes:
        if old not in text:
            raise RuntimeError(f'Missing source target in {path}: {old[:100]}')
        text = text.replace(old, new)
    p.write_text(text)

if sys.argv[1] == 'prepare':
    write('docs/playwright.material.config.ts', '''import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/material", testMatch: "material.spec.ts", workers: 1, retries: 0,
  outputDir: `test-results/docs-browser/material-${process.env.MATERIAL_PHASE ?? "after"}`,
  timeout: 30000,
  use: { baseURL: "http://127.0.0.1:4181", viewport: { width: 1200, height: 1000 }, reducedMotion: "reduce", trace: "retain-on-failure", screenshot: "only-on-failure" },
  webServer: { command: "node tests/material/server.mjs", url: "http://127.0.0.1:4181", reuseExistingServer: false, timeout: 60000 },
});
''')
    write('docs/tests/material/server.mjs', '''import { createServer } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
const here = fileURLToPath(new URL("./", import.meta.url));
const source = fileURLToPath(new URL("../../src/registry/", import.meta.url));
const server = await createServer({
  configFile: false, root: here, plugins: [tailwindcss()],
  resolve: { dedupe: ["react", "react-dom"], alias: { "@/components/ui": source + "components/ui", "@/lib/utils": source + "lib/utils.ts", "@/material-theme": source + "theme.ts" } },
  oxc: { jsx: { runtime: "automatic" } },
  server: { host: "127.0.0.1", port: 4181, strictPort: true, fs: { allow: [fileURLToPath(new URL("../../../", import.meta.url))] } },
});
await server.listen();
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, async () => { await server.close(); process.exit(0); });
''')
    write('docs/tests/material/index.html', '<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Isolated material study</title></head><body><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>')
    write('docs/tests/material/styles.css', '''@import "tailwindcss";
@import "pretendard/dist/web/variable/pretendardvariable.css";
@source "../../src/registry";
@source ".";
@custom-variant dark (&:where(.dark, .dark *));
@theme inline { --font-sans: var(--neu-font-sans); --font-mono: var(--neu-font-mono); }
body { margin: 0; background: var(--background); color: var(--foreground); font-family: var(--neu-font-sans); }
''')
    write('docs/tests/material/main.tsx', '''import * as React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { buildThemeVariables, settingsForPreset, type ThemePresetId } from "../../src/registry/theme";
import "./styles.css";

function Specimen() {
  const [preset, setPreset] = React.useState<ThemePresetId>("air");
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const [name, setName] = React.useState("Studio workspace");
  const [invalid, setInvalid] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [saved, setSaved] = React.useState(false);
  React.useLayoutEffect(() => {
    for (const [key, value] of Object.entries(buildThemeVariables(settingsForPreset(preset), mode))) document.documentElement.style.setProperty(key, value);
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.style.colorScheme = mode;
    document.documentElement.dataset.material = `${preset}-${mode}`;
  }, [preset, mode]);
  return <main className="mx-auto max-w-5xl px-5 py-10 sm:px-10">
    <header className="mb-9 flex flex-wrap items-end justify-between gap-5">
      <div><p className="mb-2 font-mono text-xs text-[var(--muted-foreground)]">NEUMORPHISM UI / SOURCE COMPONENTS</p><h1 className="text-3xl font-semibold tracking-tight">A quieter surface. A clearer state.</h1><p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--muted-foreground)]">One light direction. Tactile actions. Recessed inputs. No documentation CSS.</p></div>
      <div className="flex gap-3"><select aria-label="Preset" className="rounded-md border border-[var(--border)] bg-[var(--neu-surface)] p-2 text-sm" value={preset} onChange={e => setPreset(e.target.value as ThemePresetId)}>{["air", "lavender", "sage", "clay", "graphite"].map(p => <option key={p}>{p}</option>)}</select><Button variant="soft" onClick={() => setMode(m => m === "light" ? "dark" : "light")}>Change mode</Button></div>
    </header>
    <div className="grid min-w-0 gap-7 md:grid-cols-2">
      <Card className="min-w-0 md:col-span-2" id="actions"><CardHeader><CardTitle>Actions</CardTitle><CardDescription>Material remains visible through hover and keyboard focus.</CardDescription></CardHeader><CardContent className="flex flex-wrap items-center gap-4"><Button data-testid="default">Secondary action</Button><Button data-testid="primary" variant="primary">Save changes</Button><Button variant="soft">Soft</Button><Button variant="ghost">Ghost</Button><Button variant="destructive">Delete</Button><Button disabled>Unavailable</Button></CardContent></Card>
      <Card className="min-w-0"><CardHeader><CardTitle>Workspace</CardTitle><CardDescription>A recessed field with an explicit error state.</CardDescription></CardHeader><CardContent><form id="workspace" className="grid gap-4" onSubmit={e => { e.preventDefault(); setInvalid(!name.trim()); setSaved(Boolean(name.trim())); }}>
        <label className="grid gap-2 text-sm font-medium">Workspace name<Input aria-label="Workspace name" name="workspace" value={name} onChange={e => { setName(e.target.value); setInvalid(false); setSaved(false); }} aria-invalid={invalid || undefined} aria-describedby={invalid ? "name-error" : undefined} /></label>
        {invalid && <p id="name-error" role="alert" className="text-sm text-[var(--neu-error-text)]">Enter a workspace name.</p>}
        <label className="grid gap-2 text-sm font-medium">Read only<Input value="Pro plan" readOnly /></label>
        <label className="grid gap-2 text-sm font-medium">Unavailable<Input value="Team managed" disabled /></label>
        <div className="flex items-center justify-between gap-4 py-2"><label htmlFor="notifications" className="text-sm font-medium">Notifications</label><Switch id="notifications" name="notifications" checked={checked} onCheckedChange={setChecked} /></div>
        <Button type="submit" variant="primary">Apply workspace</Button><output className="text-xs text-[var(--muted-foreground)]">{saved ? "Saved locally" : "Changes are local to this example"}</output>
      </form></CardContent></Card>
      <div className="grid min-w-0 content-start gap-7"><Card className="min-w-0"><CardHeader><CardTitle>Navigation</CardTitle><CardDescription>Selected, hovered and focused are different states.</CardDescription></CardHeader><CardContent><Tabs defaultValue="profile"><TabsList aria-label="Workspace sections"><TabsTrigger value="profile">Profile</TabsTrigger><TabsTrigger value="access" disabled>Access</TabsTrigger><TabsTrigger value="activity">Activity</TabsTrigger></TabsList><TabsContent value="profile"><p className="py-4 text-sm leading-relaxed text-[var(--muted-foreground)]">Profile settings for your workspace.</p></TabsContent><TabsContent value="activity"><p className="py-4 text-sm leading-relaxed text-[var(--muted-foreground)]">Your recent workspace activity.</p></TabsContent></Tabs></CardContent></Card>
      <Card variant="flat" className="min-w-0"><CardHeader><CardTitle>Task surface</CardTitle><CardDescription>Only an overlay needs a floating shadow.</CardDescription></CardHeader><CardFooter><Dialog><DialogTrigger render={<Button />}>Open preferences</DialogTrigger><DialogContent><DialogHeader><DialogTitle>A longer preferences title stays clear of the close control</DialogTitle><DialogDescription>All settings remain reachable on a short mobile screen.</DialogDescription></DialogHeader><label className="grid gap-2 text-sm">Project name<Input defaultValue="Side project" /></label>{Array.from({ length: 10 }, (_, i) => <p key={i} className="text-sm leading-relaxed text-[var(--muted-foreground)]">Setting {i + 1}. Keep a clear hierarchy without stacking raised panels inside this task.</p>)}<DialogFooter><DialogClose render={<Button variant="primary" />}>Done</DialogClose></DialogFooter></DialogContent></Dialog></CardFooter></Card></div>
    </div>
  </main>;
}
createRoot(document.getElementById("root")!).render(<Specimen />);
''')
    write('docs/tests/material/material.spec.ts', '''import { expect, test } from "@playwright/test";

for (const preset of ["air", "lavender", "sage", "clay", "graphite"]) for (const mode of ["light", "dark"]) {
  test(`material specimen: ${preset} ${mode}`, async ({ page }, info) => {
    await page.goto("/");
    await page.getByLabel("Preset").selectOption(preset);
    if (mode === "dark") await page.getByRole("button", { name: "Change mode" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-material", `${preset}-${mode}`);
    await page.evaluate(() => document.fonts.ready);
    await page.mouse.move(0, 0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: info.outputPath(`material-${preset}-${mode}.png`), fullPage: true });
  });
}

for (const mode of ["light", "dark"]) {
  test(`action and input states: ${mode}`, async ({ page }, info) => {
    await page.goto("/");
    if (mode === "dark") await page.getByRole("button", { name: "Change mode" }).click();
    const primary = page.getByTestId("primary");
    const read = () => primary.evaluate(e => { const s = getComputedStyle(e); return { shadow: s.boxShadow, color: s.color, fill: s.backgroundImage, filter: s.filter, outline: s.outlineWidth }; });
    const resting = await read();
    await primary.hover();
    const hovered = await read();
    expect(hovered.shadow).not.toBe(resting.shadow);
    expect(hovered.color).toBe(resting.color);
    expect(hovered.fill).toBe(resting.fill);
    expect(hovered.filter).toBe("none");
    await page.mouse.down();
    expect((await read()).shadow).toContain("inset");
    await page.locator("#actions").screenshot({ path: info.outputPath(`pressed-${mode}.png`) });
    await page.mouse.up();
    await page.mouse.move(0, 0);
    await primary.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    await expect(primary).toBeFocused();
    const focused = await read();
    expect(parseFloat(focused.outline)).toBeGreaterThanOrEqual(2);
    expect(focused.shadow).not.toBe("none");
    expect(await primary.evaluate(e => getComputedStyle(e).transitionProperty)).toBe("none");
    await page.locator("#actions").screenshot({ path: info.outputPath(`focus-${mode}.png`) });
    const input = page.getByRole("textbox", { name: "Workspace name" });
    await input.fill("");
    await page.getByRole("button", { name: "Apply workspace" }).click();
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByRole("alert")).toBeVisible();
    await input.focus();
    expect(await input.evaluate(e => getComputedStyle(e).boxShadow)).toContain("inset");
    await page.locator("#workspace").screenshot({ path: info.outputPath(`invalid-${mode}.png`) });
    await input.fill("Recovered");
    await page.getByRole("button", { name: "Apply workspace" }).click();
    await expect(page.getByRole("status")).toHaveText("Saved locally");
  });
}

test("switch target, keyboard, form value and tabs retain native behavior", async ({ page }, info) => {
  await page.goto("/");
  const toggle = page.getByRole("switch", { name: "Notifications" });
  const box = await toggle.boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(44);
  expect(box!.width).toBeGreaterThanOrEqual(44);
  await toggle.focus();
  await page.keyboard.press("Space");
  await expect(toggle).not.toBeChecked();
  expect(await page.locator("#workspace").evaluate(e => new FormData(e as HTMLFormElement).has("notifications"))).toBe(false);
  await page.keyboard.press("Space");
  await expect(toggle).toBeChecked();
  const track = page.locator('[data-slot="switch-track"]');
  const thumb = page.locator('[data-slot="switch-thumb"]');
  const t = await track.boundingBox(); const h = await thumb.boundingBox();
  expect(h!.y - t!.y).toBeGreaterThanOrEqual(2);
  expect(t!.y + t!.height - h!.y - h!.height).toBeGreaterThanOrEqual(2);
  const profile = page.getByRole("tab", { name: "Profile", exact: true });
  await profile.focus();
  await page.keyboard.press("ArrowRight");
  const activity = page.getByRole("tab", { name: "Activity", exact: true });
  await expect(activity).toBeFocused();
  await expect(activity).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("recent workspace activity");
  await page.screenshot({ path: info.outputPath("keyboard-controls.png"), fullPage: true });
});

test("mobile reflow and short-screen dialog stay reachable", async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  for (const mode of ["light", "dark"]) {
    if (mode === "dark") await page.getByRole("button", { name: "Change mode" }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: info.outputPath(`mobile-${mode}.png`), fullPage: true });
  }
  await page.setViewportSize({ width: 390, height: 400 });
  const trigger = page.getByRole("button", { name: "Open preferences" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const b = await dialog.boundingBox();
  expect(b!.y).toBeGreaterThanOrEqual(0);
  expect(b!.y + b!.height).toBeLessThanOrEqual(401);
  const close = dialog.getByRole("button", { name: "Close", exact: true });
  expect((await close.boundingBox())!.width).toBeGreaterThanOrEqual(40);
  await page.screenshot({ path: info.outputPath("dialog-mobile-top.png") });
  await dialog.getByRole("button", { name: "Done", exact: true }).scrollIntoViewIfNeeded();
  await page.screenshot({ path: info.outputPath("dialog-mobile-bottom.png") });
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
''')
    sys.exit(0)

# Keep the existing theme contract and ownership; regenerate all consumers from it.
edit('registry/src/theme.ts', [
    ('subtle: { offset: 4, blur: 10, smallOffset: 2, smallBlur: 6 }', 'subtle: { offset: 3, blur: 8, smallOffset: 2, smallBlur: 5 }'),
    ('balanced: { offset: 6, blur: 15, smallOffset: 2, smallBlur: 6 }', 'balanced: { offset: 6, blur: 14, smallOffset: 3, smallBlur: 7 }'),
    ('deep: { offset: 10, blur: 22, smallOffset: 4, smallBlur: 10 }', 'deep: { offset: 8, blur: 18, smallOffset: 4, smallBlur: 9 }'),
    ('${tokens.shadowLight} 94%', '${tokens.shadowLight} 62%'),
    ('${tokens.shadowLight} 97%', '${tokens.shadowLight} 65%'),
    ('const primaryShadow = ', 'const primaryShadow = '),
    ('color-mix(in srgb, ${primary} 72%, white)', 'color-mix(in srgb, ${primary} 86%, white)'),
    ('"--neu-edge": tokens.edge,', '"--neu-edge": `color-mix(in srgb, ${tokens.foreground} ${mode === "light" ? 10 : 9}%, transparent)`,'),
    ('      tokens.shadowLight,\n    ),\n    "--neu-shadow-raised-sm"', '      `color-mix(in srgb, ${tokens.shadowLight} 76%, transparent)`,\n    ),\n    "--neu-shadow-raised-sm"'),
    (') + `, inset ${x}px ${y}px 0 ${tokens.edge}`', ') + `, inset ${x}px ${y}px 0 color-mix(in srgb, ${tokens.edge} 45%, transparent)`'),
    ('"--neu-shadow-primary": primaryShadow,', '"--neu-shadow-primary": primaryShadow,\n    "--neu-shadow-primary-hover": shadowValue(x, y, profile.smallOffset + 1, profile.smallBlur + 3, tokens.shadowDark, raisedSmallLight) + `, inset ${x}px ${y}px 0 color-mix(in srgb, ${primary} 86%, white)`,\n    "--neu-fill-inset": `linear-gradient(${x === y ? (x > 0 ? 135 : 315) : (x > 0 ? 45 : 225)}deg, color-mix(in srgb, ${tokens.surfaceLow} 35%, ${tokens.surface}), ${tokens.surface})`,'),
    ('inset ${x}px ${y}px 0 ${tokens.edge}`', 'inset ${x}px ${y}px 0 color-mix(in srgb, ${tokens.edge} 45%, transparent)`'),
])

core = ['button', 'input', 'switch', 'tabs', 'dialog', 'card', 'textarea']
# Tailwind's shadow utility composes with rings; raw box-shadow declarations do not.
for name in core:
    p = root / f'registry/src/components/ui/{name}.tsx'
    text = re.sub(r'\[box-shadow:var\((--neu-[\w-]+)\)\]', r'shadow-[var(\1)]', p.read_text())
    p.write_text(text)

edit('registry/src/components/ui/button.tsx', [
    ('shadow-[var(--neu-shadow-primary)] hover:shadow-[var(--neu-shadow-hover)]', 'shadow-[var(--neu-shadow-primary)] hover:shadow-[var(--neu-shadow-primary-hover)]'),
    ('transition-[box-shadow,filter,background-color,color]', 'transition-[box-shadow,background-color,color]'),
    ('focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]', 'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--ring)]'),
    ('disabled:pointer-events-none disabled:opacity-50', 'disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:[background-image:none]'),
])
for name in ['input', 'textarea']:
    p = root / f'registry/src/components/ui/{name}.tsx'
    text = p.read_text()
    text = text.replace('bg-[var(--neu-surface)]', 'bg-[var(--neu-surface)] [background-image:var(--neu-fill-inset)]')
    text = text.replace('focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]/20', 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]')
    text = text.replace('aria-invalid:ring-2 aria-invalid:ring-[color:var(--destructive)]/20', 'aria-invalid:focus-visible:outline-[var(--neu-error-text)]')
    text = text.replace('disabled:opacity-50', 'disabled:opacity-60 disabled:shadow-none disabled:[background-image:none] read-only:shadow-none read-only:[background-image:none] read-only:bg-[var(--neu-surface-soft)]')
    p.write_text(text)

edit('registry/src/components/ui/switch.tsx', [
    ('peer absolute inset-0 z-10 m-0 size-full', 'peer absolute inset-x-0 -inset-y-2.5 z-10 m-0 h-11 w-full'),
    ('        aria-hidden="true"\n        className=', '        aria-hidden="true"\n        data-slot="switch-track"\n        className='),
    ('peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ring)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--background)]', 'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-[var(--ring)]'),
    ('peer-checked:[&>span]:translate-x-5', 'peer-checked:[&>span]:translate-x-5 rtl:peer-checked:[&>span]:-translate-x-5'),
    ('<span className="size-5 rounded-full', '<span data-slot="switch-thumb" className="size-[18px] shrink-0 rounded-full'),
])
edit('registry/src/components/ui/tabs.tsx', [
    ('inline-flex h-11 w-fit items-center justify-center', 'inline-flex h-11 max-w-full w-fit items-center justify-start overflow-x-auto'),
    ('border-[color:var(--neu-edge)] bg-[var(--neu-surface)]', 'border-[color:var(--border)] bg-[var(--neu-surface)]'),
    ('inline-flex h-8 flex-1', 'inline-flex h-8 shrink-0 flex-1'),
    ('focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:pointer-events-none', 'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--ring)] hover:text-[var(--foreground)] disabled:pointer-events-none'),
    ('data-[active]:border-[color:var(--neu-selected-border)] data-[active]:bg-[var(--neu-selected)]', 'data-[active]:border-[color:var(--neu-edge)] data-[active]:bg-[var(--neu-surface-soft)]'),
    ('text-[var(--muted-foreground)] outline-none', 'text-[var(--muted-foreground)] outline-none'),
])
edit('registry/src/components/ui/dialog.tsx', [
    ('data-slot="dialog-content"\n', 'data-slot="dialog-content"\n        data-close-button={showCloseButton || undefined}\n'),
    ('overflow-y-auto -translate-x-1/2', 'overflow-y-auto overscroll-contain -translate-x-1/2'),
    ('bg-[var(--popover)] p-6', 'bg-[var(--popover)] p-6 [&[data-close-button]>[data-slot=dialog-header]]:pr-12'),
    ('absolute top-4 right-4 grid size-8 place-items-center rounded-full', 'absolute top-3 right-3 grid size-10 place-items-center rounded-[var(--neu-radius-control)]'),
    ('<span aria-hidden="true">×</span>', '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="m6 6 12 12M6 18 18 6" /></svg>'),
    ('flex flex-col gap-2 text-center sm:text-left', 'flex flex-col gap-2 text-left'),
    ('text-lg leading-none font-semibold', 'text-lg leading-snug font-semibold'),
])

# The sample itself must not add a second recessed well around recessed controls.
p = root / 'docs/src/app.css'
css = p.read_text()
pattern = r'(\.component-example-panel\s*\{[^{}]*?)background: var\(--neu-surface-low\);([^{}]*?)box-shadow: var\(--neu-shadow-inset-sm\);'
css, count = re.subn(pattern, r'\1background: var(--neu-surface);\2box-shadow: none;', css)
if count != 1: raise RuntimeError(f'Expected one owned preview surface, found {count}')
p.write_text(css)

# Every preset emits the new material variables; no manually patched endpoint.
write('registry/tests/material-tokens.test.mjs', '''import assert from "node:assert/strict";
import { test } from "node:test";
import { buildThemeVariables, settingsForPreset, themePresetIds } from "../src/theme.ts";
test("all material presets retain distinct tinted hover and recessed fill", () => {
  for (const preset of themePresetIds) for (const mode of ["light", "dark"]) {
    const tokens = buildThemeVariables(settingsForPreset(preset), mode);
    assert.notEqual(tokens["--neu-shadow-primary-hover"], tokens["--neu-shadow-hover"]);
    assert.match(tokens["--neu-fill-inset"], /^linear-gradient/);
    assert.match(tokens["--neu-edge"], /color-mix/);
  }
});
''')
p = root / '.github/workflows/verify.yml'
text = p.read_text()
old = 'run: npx playwright test tests/browser/presentation.spec.ts tests/browser/docs-polish.spec.ts'
if old not in text: raise RuntimeError('Presentation command changed')
text = text.replace(old, 'run: |\n          npx playwright test tests/browser/presentation.spec.ts tests/browser/docs-polish.spec.ts\n          npx playwright test --config=playwright.material.config.ts')
p.write_text(text)
print('Refined theme and seven core components. Regenerate before publication.')

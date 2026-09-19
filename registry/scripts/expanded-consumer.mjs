import { exerciseControlStates } from "./state-checks.mjs";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const { expect } = createRequire(path.join(root, "../docs/package.json"))("@playwright/test");
export const expandedItems = ["alert-dialog", "popover", "hover-card", "sheet", "collapsible", "toggle", "toggle-group", "toolbar", "field", "fieldset", "form", "number-field", "meter", "combobox"];

export function decorateFixture(directory) {
  const source = fs.readFileSync(path.join(root, "../docs/components/docs/expanded-component-preview.tsx"), "utf8");
  fs.writeFileSync(path.join(directory, "src/expanded-preview.tsx"), source.replaceAll("@neumorphism-ui/registry/ui/", "@/design-system/ui/"));
  const file = path.join(directory, "src/consumer.tsx");
  let consumer = fs.readFileSync(file, "utf8");
  consumer = consumer.replace('export default function Consumer()', 'import { ExpandedComponentPreview, expandedSlugs } from "./expanded-preview";\nexport default function Consumer()');
  consumer = consumer.replace('maxWidth: 800', 'maxWidth: 1120');
  consumer = consumer.replace('  </main>;', `
    <section className="mt-12 grid gap-6" aria-label="Interaction collection">
      <header className="grid gap-2 border-b border-[var(--border)] pb-6">
        <p className="text-xs font-semibold tracking-[0.18em] text-[var(--muted-foreground)]">NEUMORPHISM UI · INTERACTION COLLECTION</p>
        <h2 className="text-3xl font-semibold tracking-tight">Soft surfaces. Clear states.</h2>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--muted-foreground)]">Raised actions, inset selection, and focused overlays. Installed source with no documentation CSS.</p>
      </header>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {expandedSlugs.map((slug, index) => <section key={slug} data-example={slug} className="flex min-h-44 min-w-0 flex-col gap-5 rounded-[var(--neu-radius-surface)] border border-[var(--border)] bg-[var(--neu-surface)] p-5 sm:p-6">
          <header className="flex items-center justify-between gap-4"><h3 className="text-sm font-semibold capitalize">{slug.replaceAll("-", " ")}</h3><span className="text-xs tabular-nums text-[var(--muted-foreground)]">{String(index + 1).padStart(2, "0")}</span></header>
          <div className="flex min-w-0 flex-1 items-center"><ExpandedComponentPreview slug={slug} /></div>
        </section>)}
      </div>
    </section>
  </main>;`);
  fs.writeFileSync(file, consumer);
}

export function assertExpandedFiles(directory) {
  for (const name of expandedItems) assert.ok(fs.existsSync(path.join(directory, `src/design-system/ui/${name}.tsx`)), `Installation did not finish: missing ${name}`);
}

export async function exerciseExpanded(page, { target, scenario, engineName, mode, evidenceRoot }) {
  const card = slug => page.locator(`[data-example="${slug}"]`);
  const screenshot = async label => {
    const overlays = page.locator("[data-slot=popover-content], [data-slot=alert-dialog-content], [data-slot=sheet-content], [data-slot=combobox-content], [data-slot=hover-card-content]");
    for (const overlay of await overlays.all()) if (await overlay.isVisible()) await expect(overlay).toHaveCSS("opacity", "1");
    fs.mkdirSync(evidenceRoot, { recursive: true });
    await page.screenshot({ path: path.join(evidenceRoot, `${target}-${scenario}-${engineName}-${mode}-${label}.png`), fullPage: false });
  };
  await exerciseControlStates(page, screenshot);
  const toggle = card("toggle").getByRole("button", { name: "Pin", exact: true }).first();
  await toggle.click(); assert.equal(await toggle.getAttribute("aria-pressed"), "true");
  await toggle.press("Space"); assert.equal(await toggle.getAttribute("aria-pressed"), "false");
  assert.ok(await card("toggle").getByRole("button", { name: "Locked" }).isDisabled());
  const group = card("toggle-group");
  await group.getByRole("button", { name: "Left", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(group.getByRole("button", { name: "Center", exact: true })).toBeFocused();
  await page.keyboard.press("Space");
  assert.equal(await group.getByRole("button", { name: "Center", exact: true }).getAttribute("aria-pressed"), "true");
  const disclosure = card("collapsible").getByRole("button");
  await disclosure.press("Enter"); assert.equal(await disclosure.getAttribute("aria-expanded"), "true");
  assert.ok(await card("collapsible").getByText("Reveal optional settings without changing the defaults.").isVisible());
  await disclosure.press("Space"); assert.equal(await disclosure.getAttribute("aria-expanded"), "false");

  const popoverTrigger = card("popover").getByRole("button");
  await popoverTrigger.press("Enter");
  await page.locator('[data-slot="popover-content"]').waitFor(); await screenshot("popover");
  await page.keyboard.press("Escape"); await page.locator('[data-slot="popover-content"]').waitFor({ state: "hidden" });
  await expect(popoverTrigger).toBeFocused();

  await card("alert-dialog").getByRole("button", { name: "Delete draft", exact: true }).click();
  const alert = page.getByRole("alertdialog"); await alert.waitFor();
  await expect(alert.getByRole("button", { name: "Go back", exact: true })).toBeFocused();
  await page.mouse.click(2, 2); assert.ok(await alert.isVisible(), "outside press dismissed a destructive confirmation");
  await screenshot("alert-dialog"); await alert.getByRole("button", { name: "Delete draft", exact: true }).click();
  await alert.waitFor({ state: "hidden" }); assert.equal(await card("alert-dialog").getByRole("status").textContent(), "Draft deleted.");

  await card("sheet").getByRole("button").click();
  const sheet = page.locator('[data-slot="sheet-content"]'); await sheet.waitFor();
  await expect(sheet).not.toHaveAttribute("data-starting-style", "");
  const bounds = await sheet.boundingBox(); const viewport = page.viewportSize();
  assert.ok(bounds && bounds.x >= -1 && bounds.x + bounds.width <= viewport.width + 1 && bounds.height <= viewport.height + 1);
  await screenshot("sheet"); await page.keyboard.press("Escape"); await sheet.waitFor({ state: "hidden" });

  const combo = card("combobox").getByRole("combobox");
  await combo.fill("Se"); await page.getByRole("option", { name: "Seoul", exact: true }).waitFor();
  await combo.press("ArrowDown"); await combo.press("Enter"); assert.equal(await combo.inputValue(), "Seoul");
  await combo.fill("zzzz"); await page.getByText("No matching cities.", { exact: true }).waitFor();
  await screenshot("combobox-empty"); await combo.press("Escape");

  const number = card("number-field");
  await number.getByRole("button", { name: "Increase seats" }).click();
  const numberInput = number.locator('[data-slot="number-field-input"]'); assert.equal(await numberInput.inputValue(), "4");
  await numberInput.fill("8"); await numberInput.press("Tab");
  assert.ok(await number.getByRole("button", { name: "Increase seats" }).isDisabled());
  await numberInput.press("ArrowDown"); assert.equal(await numberInput.inputValue(), "7");

  const form = card("form"); const input = form.getByRole("textbox");
  await input.fill(""); await form.getByRole("button", { name: "Save changes" }).click();
  await form.getByText("Enter a name.", { exact: true }).waitFor();
  assert.equal(await input.getAttribute("aria-invalid"), "true");
  await screenshot("form-error");
  await input.fill("Min"); await form.getByRole("button", { name: "Save changes" }).click();
  assert.equal(await form.getByRole("status").textContent(), "Local example saved.");
  await input.fill("Uncommitted"); await form.getByRole("button", { name: "Reset" }).click();
  assert.equal(await input.inputValue(), "Min");

  const toolbar = card("toolbar");
  await toolbar.getByRole("button", { name: "Undo" }).focus(); await page.keyboard.press("ArrowRight");
  const disabledRedo = toolbar.getByRole("button", { name: "Redo", exact: true });
  await expect(disabledRedo).toBeFocused();
  await expect(disabledRedo).toHaveAttribute("aria-disabled", "true");
  await page.keyboard.press("Space");
  assert.equal(await toolbar.getByRole("status").textContent(), "");
  await page.keyboard.press("ArrowRight");
  await expect(toolbar.getByRole("button", { name: "Save changes", exact: true })).toBeFocused();
  await page.keyboard.press("Enter"); assert.equal(await toolbar.getByRole("status").textContent(), "Local example saved.");
  assert.equal(await card("meter").getByRole("meter").getAttribute("aria-valuenow"), "64");

  await card("hover-card").getByRole("link").hover();
  await page.locator('[data-slot="hover-card-content"]').waitFor(); await screenshot("hover-card");
  await page.mouse.move(0, 0); await page.locator('[data-slot="hover-card-content"]').waitFor({ state: "hidden" });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "expanded components overflow horizontally");
  await page.evaluate(() => window.scrollTo(0, 0));

  // These captures deliberately cover both modes at the same desktop width too;
  // the main scenarios separately exercise mobile-dark interaction behavior.
  if (target === "vite" && scenario === "fresh" && engineName === "chromium" && mode === "light") {
    const initialTheme = await page.evaluate(() => ({ css: document.documentElement.style.cssText, className: document.documentElement.className }));
    for (const preset of ["air", "lavender", "sage", "clay", "graphite"]) for (const themeMode of ["light", "dark"]) {
      const item = JSON.parse(fs.readFileSync(path.join(root, `public/r/style-${preset}.json`), "utf8"));
      await page.evaluate(({ tokens, dark }) => {
        document.documentElement.classList.toggle("dark", dark);
        for (const [name, value] of Object.entries(tokens)) document.documentElement.style.setProperty(`--${name}`, value);
      }, { tokens: item.cssVars[themeMode], dark: themeMode === "dark" });
      await page.screenshot({ path: path.join(evidenceRoot, `collection-${preset}-${themeMode}.png`), fullPage: true });
    }
    await page.evaluate(({css, className}) => { document.documentElement.style.cssText = css; document.documentElement.className = className; }, initialTheme);
  }
}

import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const expanded = ["alert-dialog", "popover", "hover-card", "sheet", "collapsible", "toggle", "toggle-group", "toolbar", "field", "fieldset", "form", "number-field", "meter", "combobox", "command", "context-menu", "drawer", "input-otp", "carousel", "resizable", "sidebar", "image-card", "marquee"];
const localized = ["ko", "ja", "zh"].flatMap(locale => ["form", "combobox"].map(slug => ({ locale, slug })));
const cases = [...expanded.map(slug => ({ locale: "en", slug })), ...localized];

for (const { locale, slug } of cases) {
  test(`${locale}/${slug}: hydrated preview, source tab, and reflow`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    const response = await page.goto(`/${locale}/components/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    const preview = page.locator("#preview");
    await expect(preview.locator('[role="tabpanel"]').first()).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const tabs = preview.getByRole("tab");
    await tabs.nth(1).click();
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(preview.locator("pre")).toBeVisible();
    await tabs.nth(0).click();
    await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
    await preview.scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const clipped = await preview.locator("button,input,[role=combobox]").evaluateAll(elements => elements.filter(element => {
      const box = element.getBoundingClientRect();
      return box.width > 0 && box.height > 0 && (box.left < -1 || box.right > innerWidth + 1);
    }).map(element => element.outerHTML));
    expect(clipped).toEqual([]);
    await page.screenshot({ path: info.outputPath("preview.png"), fullPage: false });
    expect(errors).toEqual([]);
  });
}

test("marquee fills each cycle without a blank tail and respects reduced motion", async ({ page }) => {
  await page.goto("/en/components/marquee");
  const marquee = page.locator('#preview [data-slot="marquee"]');
  const track = marquee.locator('[data-slot="marquee-track"]');
  const toggle = marquee.locator('[data-slot="marquee-toggle"]');
  await expect(marquee).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await expect(toggle).toBeHidden();
  await expect(marquee.locator('[data-slot="marquee-copy"]')).toBeHidden();
  await expect(track).toHaveCSS("animation-name", "none");

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(toggle).toBeVisible();
  await expect(track).toHaveCSS("animation-play-state", "running");
  await toggle.click();
  await expect(toggle).toHaveAccessibleName("Resume animation");
  await expect(track).toHaveCSS("animation-play-state", "paused");

  const cycle = await marquee.evaluate(element => {
    const viewport = element.querySelector('[data-slot="marquee-viewport"]')!.getBoundingClientRect();
    const trackElement = element.querySelector('[data-slot="marquee-track"]')!;
    const original = element.querySelector('[data-slot="marquee-items"]')!;
    const copy = element.querySelector('[data-slot="marquee-copy"]')!;
    const animation = trackElement.getAnimations()[0];
    animation.currentTime = 0;
    const items = Array.from(original.children, item => item.getBoundingClientRect());
    const copyStart = copy.firstElementChild!.getBoundingClientRect();
    const gaps = items.slice(1).map((item, index) => item.left - items[index].right);
    gaps.push(copyStart.left - items.at(-1)!.right);
    const originalWidth = original.getBoundingClientRect().width;
    const copyWidth = copy.getBoundingClientRect().width;
    const trackWidth = trackElement.getBoundingClientRect().width;
    animation.currentTime = Number(animation.effect!.getTiming().duration) - 1;
    return {
      viewportWidth: viewport.width, originalWidth, copyWidth, trackWidth,
      gapSpread: Math.max(...gaps) - Math.min(...gaps),
      loopOffset: copy.firstElementChild!.getBoundingClientRect().left - items[0].left,
      blankTail: viewport.right - copy.getBoundingClientRect().right,
    };
  });
  expect(cycle.originalWidth).toBeGreaterThanOrEqual(cycle.viewportWidth - 1);
  expect(Math.abs(cycle.originalWidth - cycle.copyWidth)).toBeLessThanOrEqual(1);
  expect(Math.abs(cycle.trackWidth / 2 - cycle.originalWidth)).toBeLessThanOrEqual(1);
  expect(cycle.gapSpread).toBeLessThanOrEqual(1);
  expect(Math.abs(cycle.loopOffset)).toBeLessThanOrEqual(1);
  expect(cycle.blankTail).toBeLessThanOrEqual(1);

  await toggle.press("Space");
  await expect(track).toHaveCSS("animation-play-state", "running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(toggle).toBeHidden();
  await expect(track).toHaveCSS("animation-name", "none");
  const clippedItems = await marquee.evaluate(element => {
    const viewport = element.querySelector('[data-slot="marquee-viewport"]')!.getBoundingClientRect();
    return Array.from(element.querySelectorAll('[data-slot="marquee-items"] > *')).filter(item => {
      const box = item.getBoundingClientRect();
      return box.left < viewport.left - 1 || box.right > viewport.right + 1 || box.bottom > viewport.bottom + 1;
    }).length;
  });
  expect(clippedItems).toBe(0);
});

test("documented form recovers from errors and restores its saved value", async ({ page }, info) => {
  await page.goto("/en/components/form");
  const form = page.locator('#preview [data-slot="form"]');
  const input = form.getByRole("textbox");
  await input.fill("");
  await form.getByRole("button", { name: "Save changes" }).click();
  await expect(input).toHaveAttribute("aria-invalid", "true");
  await expect(form.getByText("Enter a name.", { exact: true })).toBeVisible();
  expect(await input.evaluate(element => (element.getAttribute("aria-describedby") ?? "").split(/\s+/).filter(Boolean).every(id => document.getElementById(id)))).toBe(true);
  await input.fill("Min");
  await form.getByRole("button", { name: "Save changes" }).click();
  await expect(form.getByRole("status")).toHaveText("Local example saved.");
  await input.fill("Uncommitted");
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(input).toHaveValue("Min");
  await expect(form.getByRole("status")).toHaveText("Saved state");
  await form.screenshot({ path: info.outputPath("form-saved.png") });
});

test("Theme Studio preset, exported CSS, and persisted settings agree", async ({ page }, info) => {
  await page.goto("/en/customize");
  const controls = page.locator("#theme-settings");
  await expect(controls).toHaveAttribute("aria-busy", "false");
  await controls.getByRole("button", { name: "Sage", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-custom-theme", "sage");
  const item = JSON.parse(fs.readFileSync(path.resolve("public/r/style-sage.json"), "utf8"));
  const tokens = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);
    return { mode: document.documentElement.dataset.theme, radius: style.getPropertyValue("--neu-radius-control").trim(), primary: style.getPropertyValue("--primary").trim(), muted: style.getPropertyValue("--muted").trim() };
  });
  expect(tokens.radius).toBe(item.cssVars[tokens.mode!]["neu-radius-control"]);
  expect(tokens.primary).toBe(item.cssVars[tokens.mode!].primary);
  expect(tokens.muted).toBe(item.cssVars[tokens.mode!].muted);
  const exportedCss = await page.locator("#theme-output pre").textContent();
  for (const mode of ["light", "dark"]) {
    for (const [name, value] of Object.entries(item.cssVars[mode])) {
      expect(exportedCss).toContain(`--${name}: ${value};`);
    }
  }
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-custom-theme", "sage");
  await expect(controls.getByRole("button", { name: "Sage", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.screenshot({ path: info.outputPath("theme-sage.png"), fullPage: true });
});

import { expect, test, type Locator, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";

const mobile = process.env.PLATFORM_DEVICE === "mobile";
const fullCatalog = process.env.PLATFORM_FULL_CATALOG === "true";
const catalog = JSON.parse(readFileSync(new URL("../../../registry/catalog.json", import.meta.url), "utf8")) as {
  items: { name: string; type: string }[];
};
const components = catalog.items.filter(item => item.type === "registry:ui").map(item => item.name);
const templateSlugs = ["dashboard", "settings", "data-manager", "link-hub", "portfolio", "blog", "blog-post", "cms"];

async function noDocumentOverflow(page: Page) {
  const result = await page.evaluate(() => ({
    actual: document.documentElement.scrollWidth,
    available: document.documentElement.clientWidth,
  }));
  expect(result.actual - result.available).toBeLessThanOrEqual(1);
}

async function tapCenter(page: Page, target: Locator) {
  await target.scrollIntoViewIfNeeded();
  const box = await target.boundingBox();
  expect(box).not.toBeNull();
  await page.touchscreen.tap(box!.x + box!.width / 2, box!.y + box!.height / 2);
}

function contrastRatio(a: string, b: string) {
  const luminance = (hex: string) => {
    expect(hex).toMatch(/^#[0-9a-f]{6}$/i);
    const channels = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
    const rgb = channels.map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  const light = luminance(a);
  const dark = luminance(b);
  return (Math.max(light, dark) + 0.05) / (Math.min(light, dark) + 0.05);
}

for (const preset of ["air", "lavender", "sage", "clay", "graphite"]) {
  test(`theme text contrast: ${preset} light and dark`, async () => {
    const theme = JSON.parse(readFileSync(new URL(`../../../registry/public/r/style-${preset}.json`, import.meta.url), "utf8")) as {
      cssVars: Record<string, Record<string, string>>;
    };
    for (const mode of ["light", "dark"]) {
      const vars = theme.cssVars[mode];
      for (const foreground of ["foreground", "muted-foreground", "neu-accent-ink"]) {
        const ratio = contrastRatio(vars[foreground], vars["neu-surface"]);
        expect(ratio, `${preset}/${mode}/${foreground} on surface`).toBeGreaterThanOrEqual(4.5);
      }
      expect(contrastRatio(vars["primary-foreground"], vars.primary),
        `${preset}/${mode}/primary text`).toBeGreaterThanOrEqual(4.5);
    }
  });
}

test("public home and documentation chrome render on this platform", async ({ page }, info) => {
  for (const locale of ["en", "ko", "ja", "zh"]) {
    const errors: string[] = [];
    const listener = (error: Error) => errors.push(error.message);
    page.on("pageerror", listener);
    const response = await page.goto(`/${locale}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await noDocumentOverflow(page);
    expect(await page.locator("body").evaluate(node => getComputedStyle(node).fontFamily.toLowerCase()))
      .toContain("pretendard");
    const cta = page.locator(".directory-hero-actions");
    for (const action of await cta.locator("a").all()) {
      await expect(action).toHaveAccessibleName(/\S/);
      const stroke = await action.evaluate(node => getComputedStyle(node).borderTopColor);
      expect(stroke).toBe("rgba(0, 0, 0, 0)");
    }
    if (locale === "en") await cta.screenshot({ path: info.outputPath("home-cta.png"), animations: "disabled" });
    expect(errors).toEqual([]);
    page.off("pageerror", listener);
  }
});

test("keyboard operation, visible focus, and overlay focus recovery", async ({ page }, info) => {
  await page.goto("/en/components/button");
  const button = page.locator(".component-example-panel [data-slot=button][data-variant=default]").first();
  await expect(button).toBeVisible();
  await button.focus();
  await page.keyboard.press("Tab");
  if (mobile && info.project.use.browserName === "webkit") {
    // Mobile Safari does not use desktop macOS full-keyboard-access tab order.
    // Re-focus after a keyboard gesture to verify the visible focus treatment.
    await button.focus();
  } else {
    await page.keyboard.press("Shift+Tab");
  }
  await expect(button).toBeFocused();
  await expect(button).toHaveCSS("outline-width", "2px");
  await button.screenshot({ path: info.outputPath("button-keyboard-focus.png"), animations: "disabled" });

  await page.goto("/en/components/dialog");
  const trigger = page.getByRole("button", { name: "Edit profile", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog").first();
  await expect(dialog).toBeVisible();
  for (let index = 0; index < 4; index++) {
    await page.keyboard.press("Tab");
    // Focus guards may briefly receive Tab before returning focus inside the modal.
    await expect.poll(() => page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]'))),
      { timeout: 3_000 }).toBe(true);
  }
  await dialog.screenshot({ path: info.outputPath("dialog-focus-trap.png"), animations: "disabled" });
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("reduced motion, responsive reflow, and forced colors", async ({ page }, info) => {
  await page.goto("/en/components/marquee");
  await expect(page.locator(".component-example-panel [data-slot=marquee-toggle]")).toBeHidden();

  await page.goto("/en/components/select");
  const select = page.locator('.component-example-panel [data-slot="select"]').first();
  await expect(select).toBeVisible();
  await select.focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await expect(select).toBeFocused();
  if (info.project.use.browserName === "chromium") {
    await page.emulateMedia({ forcedColors: "active" });
    await expect(select).toHaveCSS("appearance", "auto");
    await page.emulateMedia({ forcedColors: "none" });
  }

  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/en/components/card");
    await expect(page.locator(".component-example-panel [data-slot=card]").first()).toBeVisible();
    await noDocumentOverflow(page);
  }
});

test("real touch emulation opens navigation and modal without losing overlay targets", async ({ page }, info) => {
  test.skip(!mobile, "Desktop platforms have no touch digitizer.");
  await page.goto("/en/components/button");
  const open = page.getByRole("button", { name: "Open docs menu" });
  await expect(open).toBeVisible();
  await tapCenter(page, open);
  const nav = page.getByRole("dialog", { name: "Mobile documentation navigation" });
  await expect(nav).toBeVisible();
  const close = page.locator(".mobile-nav-close");
  await expect(close).toBeVisible();
  await tapCenter(page, close);
  await expect(nav).toBeHidden();

  await page.goto("/en/components/dialog");
  const trigger = page.getByRole("button", { name: "Edit profile", exact: true });
  await tapCenter(page, trigger);
  const modal = page.getByRole("dialog").first();
  await expect(modal).toBeVisible();
  await modal.screenshot({ path: info.outputPath("touch-modal.png"), animations: "disabled" });
  const closeModal = modal.getByRole("button", { name: "Cancel", exact: true });
  await tapCenter(page, closeModal);
  await expect(modal).toBeHidden();

  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/en");
  await noDocumentOverflow(page);
  await page.screenshot({ path: info.outputPath("touch-home-320.png"), animations: "disabled" });
});

if (fullCatalog) {
  for (const name of components) {
    test(`cross-engine catalog: ${name}`, async ({ page }, info) => {
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      const response = await page.goto(`/en/components/${name}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1").first()).toBeVisible();
      const panel = page.locator(".component-example-panel").first();
      await expect(panel).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      await noDocumentOverflow(page);
      // Base UI renders focus-inert aria-hidden native mirrors; these are not in the accessibility tree.
      const controls = panel.locator('button:not([aria-hidden="true"]), [role="button"]:not(button):not([aria-hidden="true"]), input:not([type="hidden"]):not([aria-hidden="true"]), textarea:not([aria-hidden="true"]), select:not([aria-hidden="true"]), [role="switch"]:not([aria-hidden="true"]), [role="slider"]:not([aria-hidden="true"])');
      const count = await controls.count();
      for (let i = 0; i < count; i++) {
        const control = controls.nth(i);
        if (await control.isVisible()) await expect(control).toHaveAccessibleName(/\S/);
      }
      if (["button", "card", "checkbox", "input", "select", "tabs", "toggle", "dialog"].includes(name)) {
        await panel.screenshot({ path: info.outputPath(`${name}.png`), animations: "disabled" });
      }
      expect(errors).toEqual([]);
    });
  }

  for (const slug of templateSlugs) {
    test(`cross-engine template: ${slug}`, async ({ page }, info) => {
      const errors: string[] = [];
      page.on("pageerror", e => errors.push(e.message));
      const response = await page.goto(`/en/templates/${slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1").first()).toBeVisible();
      await noDocumentOverflow(page);
      await page.screenshot({ path: info.outputPath(`template-${slug}.png`), animations: "disabled" });
      expect(errors).toEqual([]);
    });
  }
}

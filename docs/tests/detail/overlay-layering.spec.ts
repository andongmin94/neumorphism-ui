import { expect, test, type Locator } from "@playwright/test";

async function isPaintedAbove(locator: Locator) {
  return locator.evaluate(element => {
    const rect = element.getBoundingClientRect();
    const topmost = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
    return topmost !== null && element.contains(topmost);
  });
}

test("sheet title and close button stay above the sticky header", async ({ page }, info) => {
  const initial = page.viewportSize()!;
  for (const height of [initial.height, 500]) {
    await page.setViewportSize({ width: initial.width, height });
    await page.goto("/en/components/sheet");
    const trigger = page.getByRole("button", { name: "Profile settings", exact: true });
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const title = dialog.locator('[data-slot="dialog-title"]');
    const close = dialog.locator('button[aria-label="Close"]');
    await expect(title).toBeInViewport({ ratio: 1 });
    await expect(close).toBeInViewport({ ratio: 1 });
    expect(await isPaintedAbove(title)).toBe(true);
    expect(await isPaintedAbove(close)).toBe(true);
    const header = await page.locator(".site-header").boundingBox();
    const covered = await page.evaluate(({ x, y }) => {
      const top = document.elementFromPoint(x, y);
      return top !== null && !top.closest(".site-header") &&
        !!top.closest('[data-slot="sheet-content"], [data-slot="dialog-overlay"]');
    }, { x: header!.x + 8, y: header!.y + 24 });
    expect(covered).toBe(true);
    await page.screenshot({ path: info.outputPath(`sheet-unobscured-${height}.png`), animations: "disabled" });
    await close.click();
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  }
});

for (const entry of [
  { slug: "dialog", name: "Edit profile", overlay: "dialog-overlay" },
  { slug: "drawer", name: "Profile settings", overlay: "drawer-overlay" },
]) {
  test(`${entry.slug} modal layer covers header actions`, async ({ page }, info) => {
    await page.goto(`/en/components/${entry.slug}`);
    const trigger = page.getByRole("button", { name: entry.name, exact: true });
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const overlay = page.locator(`[data-slot="${entry.overlay}"]`);
    await expect(overlay).toBeVisible();
    const layers = await page.evaluate(overlaySlot => ({
      header: Number(getComputedStyle(document.querySelector(".site-header")!).zIndex),
      overlay: Number(getComputedStyle(document.querySelector(`[data-slot="${overlaySlot}"]`)!).zIndex),
      top: document.elementFromPoint(8, 24)?.closest(".site-header") !== null,
    }), entry.overlay);
    expect(layers.header).toBeLessThan(layers.overlay);
    expect(layers.top).toBe(false);
    await page.screenshot({ path: info.outputPath(`${entry.slug}-header-covered.png`), animations: "disabled" });
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });
}

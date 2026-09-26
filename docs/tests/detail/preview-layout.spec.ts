import { expect, test } from "@playwright/test";

const actionExamples = [
  "alert-dialog",
  "dropdown-menu",
  "sheet",
  "drawer",
  "popover",
] as const;

for (const slug of actionExamples) {
  test(`preview anatomy: ${slug} keeps its intrinsic action width`, async ({ page }, info) => {
    await page.goto(`/en/components/${slug}`);
    await page.evaluate(() => document.fonts.ready);
    const panel = page.locator(".component-example-panel").first();
    const stage = panel.locator("[data-component-stage]");
    const trigger = stage.getByRole("button").first();
    await expect(trigger).toBeVisible();
    await panel.scrollIntoViewIfNeeded();
    const frame = await stage.boundingBox();
    const action = await trigger.boundingBox();
    expect(frame).not.toBeNull();
    expect(action).not.toBeNull();
    expect(action!.width).toBeGreaterThan(72);
    expect(action!.width).toBeLessThan(frame!.width - 24);
    expect(action!.height).toBeGreaterThanOrEqual(36);
    expect(Math.abs(action!.x + action!.width / 2 - frame!.x - frame!.width / 2)).toBeLessThanOrEqual(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
    await panel.screenshot({ path: info.outputPath(`${slug}-intrinsic-width.png`), animations: "disabled" });
  });
}

for (const [slug, role] of [["dropdown-menu", "menu"], ["sheet", "dialog"]] as const) {
  test(`preview anatomy: ${slug} opens from its real target and restores focus`, async ({ page }, info) => {
    await page.goto(`/en/components/${slug}`);
    const trigger = page.locator("[data-component-stage]").getByRole("button").first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    const overlay = page.getByRole(role).first();
    await expect(overlay).toBeVisible();
    const bounds = await overlay.boundingBox();
    const viewport = page.viewportSize()!;
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(-1);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width + 1);
    await page.screenshot({ path: info.outputPath(`${slug}-open.png`), animations: "disabled" });
    await page.keyboard.press("Escape");
    await expect(overlay).toBeHidden();
    await expect(trigger).toBeFocused();
  });
}

test("preview anatomy: compound input groups retain their usable field width", async ({ page }) => {
  await page.goto("/en/components/input-group");
  const stage = page.locator("[data-component-stage]");
  const group = stage.locator('[data-slot="input-group"]').first();
  const field = group.locator("input");
  await expect(field).toBeVisible();
  const box = await group.boundingBox();
  expect(box!.height).toBe(40);
  expect(box!.width).toBeGreaterThan(260);
  await field.fill("Component geometry");
  await expect(field).toHaveValue("Component geometry");
});

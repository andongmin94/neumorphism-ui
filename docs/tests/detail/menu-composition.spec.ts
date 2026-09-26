import { expect, test } from "@playwright/test";

for (const locale of ["en", "ko", "ja", "zh"]) {
  test(`menu composition: ${locale} label, actions and copied source remain usable`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(`/${locale}/components/dropdown-menu`);
    const trigger = page.locator("[data-component-stage]").getByRole("button").first();
    await trigger.click();
    const menu = page.getByRole("menu").first();
    await expect(menu).toBeVisible();
    const label = menu.locator('[data-slot="dropdown-menu-label"]');
    const group = menu.locator('[data-slot="dropdown-menu-group"]').first();
    await expect(group).toBeVisible();
    await expect(group).toHaveAccessibleName((await label.innerText()).trim());
    const checkbox = menu.getByRole("menuitemcheckbox");
    await expect(checkbox).toHaveAttribute("aria-checked", "true");
    await checkbox.click();
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
    await page.screenshot({ path: info.outputPath(`menu-${locale}-open.png`), animations: "disabled" });
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(trigger).toBeFocused();
    await trigger.click();
    await expect(menu.getByRole("menuitemcheckbox")).toHaveAttribute("aria-checked", "false");
    await page.keyboard.press("Escape");
    await page.locator(".component-example-toolbar").getByRole("tab").nth(1).click();
    await expect(page.locator(".component-example-code")).toContainText("DropdownMenuGroup");
    expect(errors).toEqual([]);
  });
}

test("alert icons and compound search icon have their own aligned column", async ({ page }, info) => {
  await page.goto("/en/components/alert");
  const panel = page.locator(".component-example-panel");
  const alerts = panel.locator('[data-slot="alert"]');
  await expect(alerts).toHaveCount(3);
  for (const alert of await alerts.all()) {
    const icon = alert.locator(":scope > svg");
    await expect(icon).toHaveCount(1);
    const i = await icon.boundingBox();
    const title = await alert.locator('[data-slot="alert-title"]').boundingBox();
    expect(i!.width).toBe(16);
    expect(i!.height).toBe(16);
    expect(i!.x + i!.width + 8).toBeLessThanOrEqual(title!.x);
    expect(Math.abs(i!.y - title!.y)).toBeLessThanOrEqual(3);
  }
  await panel.screenshot({ path: info.outputPath("alert-icon-columns.png"), animations: "disabled" });
  await page.goto("/en/components/input-group");
  const group = page.locator('.component-example-panel [data-slot="input-group"]').first();
  const icon = await group.locator("svg").first().boundingBox();
  const field = await group.locator("input").boundingBox();
  expect(icon!.width).toBe(16);
  expect(icon!.x + icon!.width).toBeLessThanOrEqual(field!.x);
  expect(Math.abs(icon!.y + icon!.height / 2 - field!.y - field!.height / 2)).toBeLessThanOrEqual(1);
});

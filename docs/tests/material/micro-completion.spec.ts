import { expect, test } from "@playwright/test";

for (const mode of ["light", "dark"]) for (const width of [320, 390, 1440]) {
  test.describe(`micro completion ${mode} ${width}`, () => {
    test.use({ viewport: { width, height: 1000 } });
    test.beforeEach(async ({ page }) => {
      await page.goto(`/micro-completion.html?mode=${mode}`);
      await expect(page.getByRole("heading", { name: "Micro completion", exact: true })).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
    });
    test("Sidebar preserves caller callbacks, cancellation and SVG sizing", async ({ page }, info) => {
      const area = page.getByTestId("sidebar-actions");
      await expect(area.locator("[data-mobile]")).toHaveAttribute("data-mobile", String(width < 768));
      const trigger = area.getByRole("button", { name: "Toggle with callback" });
      const before = await trigger.getAttribute("aria-expanded");
      await area.screenshot({ path: info.outputPath("sidebar-before-action.png") });
      await trigger.click();
      await expect(area.getByRole("status", { name: "Sidebar callback count" })).toHaveText("1");
      await expect(trigger).toHaveAttribute("aria-expanded", String(before !== "true"));
      await trigger.focus(); await page.keyboard.press("Space");
      await expect(trigger).toHaveAttribute("aria-expanded", before!);
      await expect(area.getByRole("status", { name: "Sidebar callback count" })).toHaveText("2");
      await area.getByRole("button", { name: "Prevent toggle" }).click();
      await expect(trigger).toHaveAttribute("aria-expanded", before!);
      await expect(area.getByRole("status", { name: "Sidebar callback count" })).toHaveText("3");
      await expect(trigger.locator('svg[aria-hidden="true"]')).toBeVisible();
      await expect(area.getByRole("button", { name: "Custom sidebar icon" }).locator("svg")).toHaveCSS("width", "24px");
      await area.screenshot({ path: info.outputPath("sidebar-after-action.png") });
    });
    test("Sheet close uses fixed geometry and restores keyboard focus", async ({ page }, info) => {
      const trigger = page.getByRole("button", { name: "Open review sheet" });
      await trigger.click();
      const sheet = page.getByRole("dialog", { name: "Review changes" });
      const close = sheet.getByRole("button", { name: "Close review sheet" });
      await expect(close).toBeVisible();
      await sheet.screenshot({ path: info.outputPath("sheet-open.png") });
      await expect(close.locator('svg[aria-hidden="true"]')).toBeVisible();
      await close.focus(); await page.keyboard.press("Enter");
      await expect(sheet).toBeHidden(); await expect(trigger).toBeFocused();
      await trigger.press("Enter"); await expect(sheet).toBeVisible();
      await page.keyboard.press("Escape"); await expect(sheet).toBeHidden(); await expect(trigger).toBeFocused();
    });
    test("Long multiline actions wrap without clipping or losing submission", async ({ page }, info) => {
      const area = page.getByTestId("long-action");
      const button = area.getByRole("button"), field = area.getByRole("textbox");
      await area.screenshot({ path: info.outputPath("long-action.png") });
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
      const group = (await area.getByRole("group").boundingBox())!, action = (await button.boundingBox())!, input = (await field.boundingBox())!;
      expect(action.x).toBeGreaterThanOrEqual(group.x); expect(action.x + action.width).toBeLessThanOrEqual(group.x + group.width);
      expect(action.y).toBeGreaterThanOrEqual(input.y + input.height);
      expect(await button.evaluate(e => e.scrollWidth - e.clientWidth)).toBeLessThanOrEqual(1);
      const textFits = await button.evaluate(e => {
        const range = document.createRange(); range.selectNodeContents(e);
        const bounds = e.getBoundingClientRect();
        return [...range.getClientRects()].every(rect => rect.left >= bounds.left && rect.right <= bounds.right && rect.top >= bounds.top && rect.bottom <= bounds.bottom);
      });
      expect(textFits).toBe(true);
      await button.click(); await expect(area.getByRole("status", { name: "Applied changes" })).toHaveText("Applied");
      const normal = page.getByTestId("normal-input");
      await expect(normal.getByRole("group")).toHaveCSS("height", "40px");
      await expect(normal.getByRole("button")).toHaveCSS("height", "30px");
    });
    test("Input Group preserves caller-owned SVG dimensions", async ({ page }, info) => {
      const area = page.getByTestId("custom-icons");
      await area.screenshot({ path: info.outputPath("input-custom-icons.png") });
      await expect(area.locator("svg")).toHaveCount(2);
      for (const icon of await area.locator("svg").all()) {
        await expect(icon).toHaveCSS("width", "24px"); await expect(icon).toHaveCSS("height", "24px");
      }
    });
  });
}

for (const mode of ["light", "dark"] as const) for (const width of [800, 1440]) {
  test(`SidebarProvider observes uncontrolled changes without freezing its state: ${mode} ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(`/micro-completion.html?mode=${mode}`);
    const area = page.getByTestId("sidebar-state");
    const observed = area.getByRole("button", { name: "Observed uncontrolled sidebar" });
    const notifications = area.getByRole("status", { name: "Uncontrolled sidebar notifications" });
    const controlled = area.getByRole("button", { name: "Controlled sidebar" });
    const requests = area.getByRole("status", { name: "Controlled sidebar requests" });
    await expect(observed).toHaveAttribute("aria-expanded", "false");
    await observed.click();
    await expect(observed).toHaveAttribute("aria-expanded", "true");
    await expect(notifications).toHaveText("open");
    await observed.click();
    await expect(observed).toHaveAttribute("aria-expanded", "false");
    await expect(notifications).toHaveText("open,closed");

    // A controlled provider must remain closed until its owner accepts a request.
    await expect(controlled).toHaveAttribute("aria-expanded", "false");
    await controlled.click();
    await expect(requests).toHaveText("1");
    await expect(controlled).toHaveAttribute("aria-expanded", "false");
    await area.getByRole("checkbox", { name: "Accept controlled change" }).check();
    await controlled.click();
    await expect(requests).toHaveText("2");
    await expect(controlled).toHaveAttribute("aria-expanded", "true");
    await controlled.click();
    await expect(requests).toHaveText("3");
    await expect(controlled).toHaveAttribute("aria-expanded", "false");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
  });
}

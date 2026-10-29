import { expect, test } from "@playwright/test";

for (const mode of ["light", "dark"] as const) {
  test.describe(`Sidebar regressions ${mode}`, () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("runtime regressions: shortcuts leave editing, consumed and composing events with their owner", async ({ page }) => {
      for (const width of [1440, 390]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(`/sidebar-controls.html?mode=${mode}`);
        // The modal correctly hides background outputs from the accessibility tree.
        const open = page.locator('output[aria-label="Current sidebar open"]');
        const initial = width < 768 ? "false" : "true";
        await expect(open).toHaveText(initial);
        for (const name of ["Editor input", "Editor notes", "Rich editor"]) {
          await page.getByRole("textbox", { name, exact: true }).press("Control+b");
          await expect(open).toHaveText(initial);
        }
        await page.getByRole("combobox", { name: "Editor choice" }).press("Control+b");
        await expect(open).toHaveText(initial);
        await page.getByRole("button", { name: "Owned shortcut", exact: true }).press("Control+b");
        await expect(open).toHaveText(initial);
        const target = page.getByRole("button", { name: "Shortcut target", exact: true });
        await target.evaluate(element => element.dispatchEvent(new KeyboardEvent("keydown", {
          key: "b", ctrlKey: true, bubbles: true, cancelable: true, isComposing: true,
        })));
        await expect(open).toHaveText(initial);
        await target.press("Control+b");
        await expect(open).toHaveText(initial === "true" ? "false" : "true");
        if (width < 768) {
          await expect(page.getByRole("dialog", { name: "Workspace navigation" })).toBeVisible();
          await page.keyboard.press("Escape");
          await expect(open).toHaveText("false");
        } else {
          await target.press("Meta+b");
          await expect(open).toHaveText("true");
        }
      }
    });

    test("runtime regressions: none and mobile panels keep their expanded text presentation", async ({ page }) => {
      await page.goto(`/sidebar-controls.html?mode=${mode}&collapsible=none&closed`);
      const panel = page.getByTestId("consumer-sidebar");
      await expect(panel).toHaveCSS("width", "256px");
      await expect(panel.locator('[data-slot="sidebar-group-label"]')).not.toHaveClass(/sr-only/);
      for (const slot of ["sidebar-menu-button", "sidebar-menu-link"]) {
        const text = panel.locator(`[data-slot="${slot}"] > span:last-child`);
        expect(await text.evaluate(element => element.getBoundingClientRect().height)).toBeGreaterThan(10);
      }
      await page.goto(`/sidebar-controls.html?mode=${mode}&closed`);
      await expect(page.getByTestId("consumer-sidebar").locator('[data-slot="sidebar-group-label"]')).toHaveClass(/sr-only/);
      await page.setViewportSize({ width: 390, height: 844 });
      await page.getByRole("button", { name: "Toggle sidebar", exact: true }).click();
      const mobile = page.getByRole("dialog", { name: "Workspace navigation", exact: true });
      await expect(mobile).toHaveCSS("width", "288px");
      await expect(mobile.locator('[data-slot="sidebar-group-label"]')).not.toHaveClass(/sr-only/);
      for (const slot of ["sidebar-menu-button", "sidebar-menu-link"]) {
        expect(await mobile.locator(`[data-slot="${slot}"] > span:last-child`).evaluate(element => element.getBoundingClientRect().height)).toBeGreaterThan(10);
      }
      await page.keyboard.press("Escape");
      await expect(mobile).toBeHidden();
      await expect(page.getByRole("button", { name: "Toggle sidebar", exact: true })).toBeFocused();
    });

    test("runtime regressions: mobile portal forwards custom width, side, attributes, styles and ref", async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`/sidebar-controls.html?mode=${mode}&customWidth&side=right`);
      await page.getByRole("button", { name: "Toggle sidebar", exact: true }).click();
      const panel = page.getByRole("dialog", { name: "Workspace navigation", exact: true });
      await expect(panel).toHaveAttribute("id", "consumer-sidebar");
      await expect(panel).toHaveAttribute("data-testid", "consumer-sidebar");
      await expect(panel).toHaveAttribute("data-side", "right");
      await expect(panel).toHaveCSS("width", "320px");
      await expect(panel).toHaveCSS("font-weight", "600");
      await expect(page.locator('output[aria-label="Sidebar ref tag"]')).toHaveText("DIV");
      expect((await panel.boundingBox())!.x).toBeCloseTo(70, 0);
    });

    test("runtime regressions: provider mobile width crosses the portal and direct style wins", async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      for (const [query, width] of [["providerWidth", "352px"], ["providerWidth&customWidth", "320px"]]) {
        await page.goto(`/sidebar-controls.html?mode=${mode}&${query}`);
        await page.getByRole("button", { name: "Toggle sidebar", exact: true }).click();
        await expect(page.getByRole("dialog", { name: "Workspace navigation", exact: true })).toHaveCSS("width", width);
      }
    });
  });
}

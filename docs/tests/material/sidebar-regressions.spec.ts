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

for (const mode of ["light", "dark"] as const) {
  test.describe(`Sidebar offcanvas focus ${mode}`, () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("runtime regressions: collapsed offcanvas skips hidden actions in both Tab directions", async ({ page }) => {
      await page.goto(`/sidebar-focus.html?mode=${mode}&closed`);
      const panel = page.getByTestId("Primary-sidebar");
      const trigger = page.getByRole("button", { name: "Primary toggle", exact: true });
      const after = page.getByRole("button", { name: "Primary after", exact: true });
      const action = panel.locator('[data-slot="sidebar-menu-button"]');
      await expect(panel).toHaveAttribute("data-state", "collapsed");
      await trigger.focus();
      await page.keyboard.press("Tab");
      await expect(after).toBeFocused();
      await page.keyboard.press("Shift+Tab");
      await expect(trigger).toBeFocused();
      // Programmatic focus must not resurrect an invisible keyboard target.
      await action.evaluate(element => element.focus());
      await expect(trigger).toBeFocused();
      await after.focus();
      await action.evaluate(element => element.focus());
      await page.keyboard.press("Enter");
      await expect(page.getByTestId("Primary-activations")).toHaveText("0");
      // Inert retains mounted content; the focus/activation checks above prove it is unusable.
      await expect(action).toHaveCount(1);
      await expect(panel).toHaveAttribute("inert", "");
      await expect(page.getByTestId("Primary-ref")).toHaveText("ASIDE");
      await trigger.press("Enter");
      await expect(panel).not.toHaveAttribute("inert");
      await trigger.press("Tab");
      await expect(action).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(page.getByTestId("Primary-activations")).toHaveText("1");
      await page.keyboard.press("Tab");
      await expect(page.getByRole("link", { name: "Primary destination", exact: true })).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(/#primary$/);
    });

    test("runtime regressions: offcanvas shortcut returns focus before and without animation", async ({ page }) => {
      for (const reducedMotion of ["reduce", "no-preference"] as const) {
        await page.emulateMedia({ reducedMotion });
        await page.goto(`/sidebar-focus.html?mode=${mode}`);
        const panel = page.getByTestId("Primary-sidebar");
        const trigger = page.getByRole("button", { name: "Primary toggle", exact: true });
        for (const shortcut of ["Control+b", "Meta+b"]) {
          await page.getByRole("button", { name: "Primary action", exact: true }).press(shortcut);
          await expect(panel).toHaveAttribute("inert", "");
          await expect(trigger).toBeFocused();
          await page.keyboard.press("Tab");
          await expect(page.getByRole("button", { name: "Primary after", exact: true })).toBeFocused();
          await trigger.press(shortcut);
          await expect(panel).not.toHaveAttribute("inert");
        }
      }
    });

    test("runtime regressions: an internal offcanvas trigger restores the outside trigger and preserves drafts", async ({ page }) => {
      await page.goto(`/sidebar-focus.html?mode=${mode}`);
      const trigger = page.getByRole("button", { name: "Primary toggle", exact: true });
      await page.getByRole("textbox", { name: "Primary draft", exact: true }).fill("Keep this draft");
      await page.getByRole("button", { name: "Primary inside toggle", exact: true }).press("Enter");
      await expect(trigger).toBeFocused();
      await expect(page.getByTestId("Primary-sidebar")).toHaveAttribute("inert", "");
      await trigger.press("Enter");
      await expect(page.getByRole("textbox", { name: "Primary draft", exact: true })).toHaveValue("Keep this draft");
    });

    test("runtime regressions: controlled offcanvas closure restores only its owner and never steals outside focus", async ({ page }) => {
      await page.goto(`/sidebar-focus.html?mode=${mode}&controlled&two`);
      const trigger = page.getByRole("button", { name: "Primary toggle", exact: true });
      const close = page.getByRole("button", { name: "Close Primary externally", exact: true });
      await page.getByRole("link", { name: "Primary destination", exact: true }).focus();
      // Invoke the parent state change without moving focus to its button.
      await close.dispatchEvent("click");
      await expect(trigger).toBeFocused();
      await expect(page.getByTestId("Primary-sidebar")).toHaveAttribute("inert", "");
      await expect(page.getByTestId("Secondary-sidebar")).not.toHaveAttribute("inert");
      await trigger.press("Enter");
      const outside = page.getByRole("textbox", { name: "Primary outside input", exact: true });
      await outside.focus();
      await close.dispatchEvent("click");
      await expect(page.getByTestId("Primary-sidebar")).toHaveAttribute("inert", "");
      await expect(outside).toBeFocused();
    });

    test("runtime regressions: collapsed icon and none modes keep their actions keyboard-operable", async ({ page }) => {
      for (const collapsible of ["icon", "none"]) {
        await page.goto(`/sidebar-focus.html?mode=${mode}&closed&collapsible=${collapsible}`);
        await expect(page.getByTestId("Primary-sidebar")).not.toHaveAttribute("inert");
        await page.getByRole("button", { name: "Primary toggle", exact: true }).press("Tab");
        const action = page.getByRole("button", { name: "Primary action", exact: true });
        await expect(action).toBeFocused();
        await action.press("Enter");
        await expect(page.getByTestId("Primary-activations")).toHaveText("1");
      }
    });

    test("runtime regressions: closed desktop offcanvas does not disable the mobile Sheet", async ({ page }) => {
      for (const width of [320, 390]) {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(`/sidebar-focus.html?mode=${mode}&closed`);
        await expect(page.getByTestId("Primary-sidebar")).toHaveAttribute("inert", "");
        await page.setViewportSize({ width, height: 844 });
        await expect(page.locator('aside[data-testid="Primary-sidebar"]')).toHaveCount(0);
        const trigger = page.getByRole("button", { name: "Primary toggle", exact: true });
        await trigger.click();
        const dialog = page.getByRole("dialog", { name: "Primary navigation", exact: true });
        await expect(dialog).toBeVisible();
        await expect(dialog).not.toHaveAttribute("inert");
        await dialog.getByRole("button", { name: "Primary action", exact: true }).click();
        await expect(page.getByTestId("Primary-activations")).toHaveText("1");
        await expect(page.getByTestId("Primary-ref")).toHaveText("DIV");
        await page.keyboard.press("Escape");
        await expect(dialog).toBeHidden();
        await expect(trigger).toBeFocused();
        await page.setViewportSize({ width: 1440, height: 900 });
        await expect(page.getByTestId("Primary-sidebar")).toHaveAttribute("inert", "");
        await trigger.press("Tab");
        await expect(page.getByRole("button", { name: "Primary after", exact: true })).toBeFocused();
      }
    });

    test("runtime regressions: focus return skips disabled and visually hidden outside triggers", async ({ page }) => {
      await page.goto(`/sidebar-focus.html?mode=${mode}&unavailableTriggers`);
      await page.getByRole("button", { name: "Primary action", exact: true }).press("Control+b");
      await expect(page.getByTestId("Primary-sidebar")).toHaveAttribute("inert", "");
      await expect(page.getByRole("button", { name: "Primary toggle", exact: true })).toBeFocused();
    });

    test("runtime regressions: explicit caller inert remains effective on an expanded Sidebar", async ({ page }) => {
      await page.goto(`/sidebar-focus.html?mode=${mode}&callerInert`);
      await expect(page.getByTestId("Primary-sidebar")).toHaveAttribute("data-state", "expanded");
      await expect(page.getByTestId("Primary-sidebar")).toHaveAttribute("inert", "");
      await page.getByRole("button", { name: "Primary toggle", exact: true }).press("Tab");
      await expect(page.getByRole("button", { name: "Primary after", exact: true })).toBeFocused();
    });
  });
}

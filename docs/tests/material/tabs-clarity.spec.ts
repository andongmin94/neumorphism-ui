import { expect, test } from "@playwright/test";

for (const mode of ["light", "dark"]) for (const width of [320, 390, 1440]) {
  test(`compact tabs retain selection and keyboard behavior: ${mode} ${width}`, async ({ page }, info) => {
    for (const locale of ["en", "ko", "ja", "zh"]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/tabs-clarity.html?locale=${locale}&mode=${mode}`);
      await page.evaluate(() => document.fonts.ready);
      const horizontal = page.getByTestId("horizontal");
      const tabs = horizontal.getByRole("tab");
      await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
      const style = await tabs.first().evaluate(e => {
        const s = getComputedStyle(e); const rail = getComputedStyle(e.parentElement!);
        const probe = document.createElement("span"); e.append(probe);
        probe.style.backgroundColor = "var(--primary)"; probe.style.color = "var(--primary-foreground)";
        const p = getComputedStyle(probe);
        const result = { background: s.backgroundColor, color: s.color, primary: p.backgroundColor,
          onPrimary: p.color, rail: rail.backgroundColor, height: rail.height };
        probe.remove(); return result;
      });
      expect(style.background).toBe(style.primary);
      expect(style.color).toBe(style.onPrimary);
      expect(style.background).not.toBe(style.rail);
      expect(style.height).toBe("44px");
      await tabs.first().hover();
      await expect(tabs.first()).toHaveCSS("color", style.onPrimary);
      await tabs.last().hover();
      await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
      await page.mouse.move(0, 0);
      await expect(tabs.first()).toHaveCSS("font-size", "14px");
      await expect(tabs.last()).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
      await expect(tabs.nth(1)).toHaveAttribute("aria-disabled", "true");
      // Base UI uses manual activation; focusing a disabled tab cannot select it.
      await tabs.first().focus(); await tabs.first().press("ArrowRight");
      await expect(tabs.nth(1)).toBeFocused(); await tabs.nth(1).press("Enter");
      await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
      await tabs.nth(1).press("ArrowRight"); await tabs.last().press("Enter");
      await expect(tabs.last()).toHaveAttribute("aria-selected", "true");
      await expect(tabs.last()).toHaveCSS("outline-width", "2px");
      await expect(horizontal.locator('[role="tabpanel"]:not([inert])')).toHaveText("Code content");
      await tabs.first().click();
      await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
      await expect(horizontal.locator('[role="tabpanel"]:not([inert])')).toHaveText("Preview content");
      const vertical = page.getByTestId("vertical");
      await vertical.getByRole("tab").first().focus(); await page.keyboard.press("ArrowDown");
      await expect(vertical.getByRole("tab").last()).toBeFocused(); await page.keyboard.press("Space");
      await expect(vertical.locator('[role="tabpanel"]:not([inert])')).toHaveText("Code content");
      const long = page.getByTestId("long");
      await long.getByRole("tab").last().focus(); await page.keyboard.press("Enter");
      await expect(long.locator('[role="tabpanel"]:not([inert])')).toHaveText("Last panel");
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
      await page.screenshot({ path: info.outputPath(`tabs-${locale}.png`) });
    }
  });
}

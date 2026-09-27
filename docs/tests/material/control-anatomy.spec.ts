import { expect, test } from "@playwright/test";
for (const mode of ["light", "dark"] as const) for (const width of [390, 1440]) {
  test.describe(`control anatomy ${mode} ${width}`, () => {
    test.use({ viewport: { width, height: 1000 } });
    test.beforeEach(async ({ page }) => {
      await page.goto(`/controls.html?mode=${mode}`);
      await expect(page.getByRole("heading", { name: "Small controls. Consistent anatomy." })).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
    });
    test.afterEach(async ({ page }, info) => {
      await page.screenshot({ path: info.outputPath("control-anatomy.png"), fullPage: true, animations: "disabled" });
    });
    test("glyphs scale with the control while explicit icon sizes stay owned by the caller", async ({ page }) => {
      for (const family of ["button", "toggle"]) for (const [size, height, iconSize] of [["sm", 32, 14], ["default", 40, 16], ["lg", 48, 20]] as const) {
        const control = page.getByTestId(`${family}-${size}`);
        const r = (await control.boundingBox())!;
        const icon = (await control.locator("svg").boundingBox())!;
        expect(r.height).toBe(height); expect(icon.width).toBe(iconSize); expect(icon.height).toBe(iconSize);
        expect(Math.abs((r.y + r.height / 2) - (icon.y + icon.height / 2))).toBeLessThanOrEqual(0.5);
      }
      await expect(page.getByTestId("explicit-icon").locator("svg")).toHaveCSS("width", "24px");
    });
    test("avatar groups retain each circular silhouette and match their count typography", async ({ page }) => {
      for (const [size, diameter, textSize] of [["sm", 32, 12], ["default", 40, 14], ["lg", 48, 16]] as const) {
        const group = page.getByTestId(`avatars-${size}`);
        const avatars = group.locator('[data-slot="avatar"]');
        for (const avatar of await avatars.all()) {
          await expect(avatar).toHaveCSS("width", `${diameter}px`);
          const shadow = await avatar.evaluate(e => getComputedStyle(e).boxShadow);
          expect(shadow).not.toBe("none"); expect(shadow).toContain("2px");
          expect(shadow.split("rgb").length).toBeGreaterThanOrEqual(4);
        }
        const count = group.locator('[data-slot="avatar-group-count"]');
        await expect(count).toHaveCSS("width", `${diameter}px`); await expect(count).toHaveCSS("font-size", `${textSize}px`);
      }
    });
    test("segmented selection owns elevation without nesting an inset well", async ({ page }) => {
      const group = page.getByRole("group", { name: "Alignment" });
      const current = group.getByRole("button", { name: "Left", exact: true });
      expect(await group.evaluate(e => getComputedStyle(e).boxShadow)).toContain("inset");
      expect(await current.evaluate(e => getComputedStyle(e).boxShadow)).not.toContain("inset");
      await group.getByRole("button", { name: "Center", exact: true }).click();
      await expect(group.getByRole("button", { name: "Center", exact: true })).toHaveAttribute("aria-pressed", "true");
      await expect(current).toHaveAttribute("aria-pressed", "false");
      await expect(group.getByRole("button", { name: "Locked", exact: true })).toBeDisabled();
    });
    test("long badges fit and keyboard focus outlines the visible slider thumb", async ({ page }, info) => {
      const badge = page.getByTestId("long-badge");
      expect(await badge.evaluate(e => e.scrollWidth - e.clientWidth)).toBeLessThanOrEqual(1);
      expect((await badge.boundingBox())!.width).toBeLessThanOrEqual(176);
      await expect(badge.locator("svg")).toHaveCSS("width", "12px");
      const input = page.getByRole("slider", { name: "Volume", exact: true });
      await input.focus(); await page.keyboard.press("ArrowRight");
      await expect(input).toHaveValue("65");
      const thumb = page.locator('[data-slot="slider-thumb"]');
      await expect(thumb).toHaveCSS("outline-width", "2px");
      await thumb.screenshot({ path: info.outputPath("slider-focus.png") });
    });
    test("pagination preserves every target at 320px and reverses directional glyphs in RTL", async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 1000 });
      const nav = page.locator('[data-slot="pagination"]');
      await expect(nav.getByRole("link", { name: "Go to next page" })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(321);
      for (const link of await nav.getByRole("link").all()) expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(40);
      await nav.getByRole("link", { name: "Go to next page" }).click();
      await expect(nav.locator('[aria-current="page"]')).toHaveText("3");
      await nav.evaluate(e => e.setAttribute("dir", "rtl"));
      await expect(nav.getByRole("link", { name: "Go to next page" }).locator("svg")).toHaveCSS("rotate", "180deg");
    });
  });
}

import { expect, test, type Locator } from "@playwright/test";
import { themePresetIds } from "../../src/registry/theme";

async function selectionColors(button: Locator) {
  return button.evaluate(e => {
    const probe = document.createElement("span"); e.append(probe);
    probe.style.color = "var(--primary-foreground)"; probe.style.backgroundColor = "var(--primary)";
    const p = getComputedStyle(probe), s = getComputedStyle(e);
    const values = { primary: p.backgroundColor, onPrimary: p.color, background: s.backgroundColor, color: s.color };
    probe.remove(); return values;
  });
}

for (const mode of ["light", "dark"]) for (const width of [320, 390, 1440]) {
  test(`selection finish, readable labels and real state: ${mode} ${width}`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const locale of ["en", "ko", "ja", "zh"]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`/selection-finish.html?locale=${locale}&mode=${mode}`);
      await page.evaluate(() => document.fonts.ready);
      const group = page.getByTestId("single");
      const buttons = group.getByRole("button");
      const selected = buttons.first();
      await expect(selected).toHaveAttribute("aria-pressed", "true");
      const style = await selectionColors(selected);
      expect(style.background).toBe(style.primary); expect(style.color).toBe(style.onPrimary);
      await selected.hover(); await expect(selected).toHaveCSS("color", style.onPrimary);
      await expect(selected).toHaveCSS("background-color", style.primary);
      await buttons.nth(1).hover(); await expect(buttons.nth(1)).toHaveCSS("box-shadow", "none"); await expect(selected).toHaveAttribute("aria-pressed", "true");
      await selected.focus(); await selected.press("ArrowRight");
      await expect(buttons.nth(1)).toBeFocused();
      await expect(buttons.nth(1)).toHaveCSS("outline-width", "2px");
      await buttons.nth(1).press("Space");
      await expect(group.locator("output")).toHaveText("center");
      await expect(buttons.nth(1)).toHaveCSS("background-color", style.primary);
      await expect(selected).toHaveAttribute("aria-pressed", "false");
      await expect(buttons.last()).toBeDisabled();
      // Selection remains togglable; a second activation clears the controlled value.
      await buttons.nth(1).press("Space"); await expect(group.locator("output")).toHaveText("");
      await selected.click();
      const multi = page.getByTestId("multiple").getByRole("button");
      await multi.nth(1).click();
      await expect(multi.first()).toHaveAttribute("aria-pressed", "true");
      await expect(multi.nth(1)).toHaveAttribute("aria-pressed", "true");
      const vertical = page.getByTestId("vertical").getByRole("button");
      await vertical.first().focus(); await vertical.first().press("ArrowDown");
      await expect(vertical.last()).toBeFocused(); await vertical.last().press("Space");
      await expect(vertical.last()).toHaveAttribute("aria-pressed", "true");
      const toggle = page.getByTestId("standalone").getByRole("button").first();
      await toggle.click(); await expect(toggle).toHaveAttribute("aria-pressed", "true");
      const pressedShadow = await toggle.evaluate(e => getComputedStyle(e).boxShadow);
      expect(pressedShadow).toContain("inset");
      await toggle.hover(); await expect(toggle).toHaveCSS("box-shadow", pressedShadow);
      await toggle.press("Space"); await expect(toggle).toHaveAttribute("aria-pressed", "false");
      await expect(page.getByTestId("caller")).toHaveCSS("min-height", "48px");
      await expect(page.getByTestId("caller").locator("svg")).toHaveCSS("width", "24px");
      for (const control of await page.getByTestId("long").getByRole("button").all()) {
        const metrics = await control.evaluate(e => {
          const r = e.getBoundingClientRect(); const range = document.createRange(); range.selectNodeContents(e);
          const text = range.getBoundingClientRect();
          return { excess: e.scrollWidth - e.clientWidth, left: text.left - r.left, right: r.right - text.right,
            top: text.top - r.top, bottom: r.bottom - text.bottom };
        });
        expect(metrics.excess).toBeLessThanOrEqual(1);
        for (const inset of [metrics.left, metrics.right, metrics.top, metrics.bottom]) expect(inset).toBeGreaterThanOrEqual(-1);
      }
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
      await page.mouse.move(0, 0);
      await page.screenshot({ path: info.outputPath(`selection-${locale}.png`), fullPage: true });
    }
    expect(errors).toEqual([]);
  });
}

test("group selection uses every preset's foreground pair", async ({ page }) => {
  for (const preset of themePresetIds) for (const mode of ["light", "dark"]) {
    await page.goto(`/selection-finish.html?preset=${preset}&mode=${mode}`);
    const selected = page.getByTestId("single").getByRole("button").first();
    await expect(selected).toHaveAttribute("aria-pressed", "true");
    const color = await selectionColors(selected);
    expect(color.background).toBe(color.primary); expect(color.color).toBe(color.onPrimary);
  }
});

for (const mode of ["light", "dark"] as const) for (const motion of ["reduce", "no-preference"] as const) {
  test(`alert-dialog first-frame geometry respects ${motion}: ${mode}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: motion });
    await page.goto(`/?composition=1&mode=${mode}&actionSize=default`);
    await expect(page.getByRole("heading", { name: "Details that survive composition." })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    for (const [triggerName, role, closeName] of [
      ["Confirm removal", "alertdialog", "Keep"],
    ] as const) {
      // Record the native popup on insertion, before Base UI removes its start flag.
      // Waiting until the transition ends would miss the reduced-motion 95% frame.
      await page.evaluate(role => {
        const state = window as typeof window & { firstModalFrame?: { scale: string; starting: boolean; height: number }; modalObserver?: MutationObserver };
        state.firstModalFrame = undefined;
        state.modalObserver?.disconnect();
        state.modalObserver = new MutationObserver(() => {
          const popup = document.querySelector(`[role="${role}"][data-slot$="-content"]`);
          const button = popup?.querySelector('[data-slot$="-footer"] button');
          if (!popup || !button) return;
          state.firstModalFrame = { scale: getComputedStyle(popup).scale, starting: popup.hasAttribute("data-starting-style"), height: button.getBoundingClientRect().height };
          state.modalObserver?.disconnect();
        });
        state.modalObserver.observe(document.body, { childList: true, subtree: true });
      }, role);
      await page.getByRole("button", { name: triggerName, exact: true }).click();
      const popup = page.getByRole(role);
      await expect(popup).toBeVisible();
      const frame = await page.evaluate(() => (window as typeof window & { firstModalFrame?: { scale: string; starting: boolean; height: number } }).firstModalFrame);
      expect(frame).toBeDefined();
      expect(frame!.starting).toBe(true);
      if (motion === "reduce") {
        expect(["none", "1"]).toContain(frame!.scale);
        expect(frame!.height).toBe(40);
        await expect(popup).toHaveCSS("transition-property", "none");
      } else {
        expect(Number(frame!.scale)).toBeCloseTo(0.95, 2);
        expect(frame!.height).toBeCloseTo(38, 1);
        expect(await popup.evaluate(e => getComputedStyle(e).transitionProperty)).toContain("scale");
      }
      await expect(popup).not.toHaveAttribute("data-starting-style");
      await expect.poll(async () => (await popup.getByRole("button", { name: closeName, exact: true }).boundingBox())!.height).toBe(40);
      await popup.getByRole("button", { name: closeName, exact: true }).click();
      await expect(popup).toBeHidden();
    }
  });
}

import { expect, test } from "@playwright/test";

for (const mode of ["light", "dark"]) for (const width of [320, 390, 1440]) {
  test.describe(`micro finish ${mode} ${width}`, () => {
    test.use({ viewport: { width, height: 1000 } });
    test.beforeEach(async ({ page }) => {
      await page.goto(`/micro-finish.html?mode=${mode}`);
      await expect(page.getByRole("heading", { name: "Micro design finish", exact: true })).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
    });
    test("MD-01 keeps both pagination targets operable in a 228px host", async ({ page }, info) => {
      const area = page.getByTestId("pagination-case");
      await area.evaluate(e => { (e as HTMLElement).style.width = "228px"; });
      const previous = area.getByRole("link", { name: "Go to previous page" });
      const next = area.getByRole("link", { name: "Go to next page" });
      for (const control of [previous, next]) { await expect(control).toBeVisible(); expect((await control.boundingBox())!.width).toBeGreaterThanOrEqual(40); }
      await next.click(); await expect(area.locator('[aria-current="page"]')).toHaveText("3");
      await previous.focus(); await page.keyboard.press("Enter"); await expect(area.locator('[aria-current="page"]')).toHaveText("2");
      expect(await area.evaluate(e => e.scrollWidth - e.clientWidth)).toBeLessThanOrEqual(1);
      await area.screenshot({ path: info.outputPath("pagination.png") });
    });
    test("MD-02 shows every reduced-motion item and separates live controls", async ({ page }, info) => {
      const area = page.getByTestId("marquee-case");
      const viewport = area.locator('[data-slot="marquee-viewport"]');
      const track = area.locator('[data-slot="marquee-track"]');
      const toggle = area.locator('[data-slot="marquee-toggle"]');
      const items = area.locator('[data-slot="marquee-items"] [data-slot="marquee-item"]');
      await expect(toggle).toBeHidden(); await expect(track).toHaveCSS("animation-name", "none"); await expect(items).toHaveCount(4);
      await area.scrollIntoViewIfNeeded();
      for (const item of await items.all()) {
        const a = (await item.boundingBox())!, b = (await viewport.boundingBox())!;
        expect(a.x).toBeGreaterThanOrEqual(b.x - 1); expect(a.x + a.width).toBeLessThanOrEqual(b.x + b.width + 1);
        expect(a.y + a.height).toBeLessThanOrEqual(b.y + b.height + 1);
      }
      await area.screenshot({ path: info.outputPath("marquee-reduce.png") });
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await expect(toggle).toBeVisible(); await expect(track).toHaveCSS("animation-play-state", "running");
      const a = (await viewport.boundingBox())!, b = (await toggle.boundingBox())!;
      expect(a.x + a.width + 8).toBeLessThanOrEqual(b.x);
      const transform = await track.evaluate(e => getComputedStyle(e).transform);
      await expect.poll(() => track.evaluate(e => getComputedStyle(e).transform)).not.toBe(transform);
      await toggle.click(); await expect(track).toHaveCSS("animation-play-state", "paused");
      await expect(toggle).toHaveAccessibleName("Resume animation");
      await area.screenshot({ path: info.outputPath("marquee-paused.png") });
      await toggle.press("Space"); await expect(track).toHaveCSS("animation-play-state", "running");
      await page.emulateMedia({ reducedMotion: "reduce" }); await expect(toggle).toBeHidden();
    });
    test("MD-03 preserves sized panels and both resize orientations", async ({ page }, info) => {
      for (const [id, height, key] of [["horizontal-host", 160, "ArrowRight"], ["vertical-host", 192, "ArrowDown"]] as const) {
        const host = page.getByTestId(id), group = host.locator('[data-slot="resizable-panel-group"]'), handle = host.getByRole("separator");
        await expect(group).toHaveCSS("height", `${height}px`);
        const before = await handle.getAttribute("aria-valuenow");
        await handle.focus(); await page.keyboard.press(key);
        await expect(handle).not.toHaveAttribute("aria-valuenow", before!);
        const rect = (await handle.boundingBox())!;
        const afterKeyboard = await handle.getAttribute("aria-valuenow");
        await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
        await page.mouse.down(); await page.mouse.move(rect.x + rect.width / 2 + (key === "ArrowRight" ? 30 : 0), rect.y + rect.height / 2 + (key === "ArrowDown" ? 20 : 0), { steps: 5 }); await page.mouse.up();
        await expect(handle).not.toHaveAttribute("aria-valuenow", afterKeyboard!);
        await expect(handle.locator("svg")).toBeVisible();
      }
      await page.getByTestId("resizable-case").screenshot({ path: info.outputPath("resizable.png") });
    });
    test("MD-04 and MD-05 preserve joins and atomic breadcrumb wraps", async ({ page }, info) => {
      const images = page.getByTestId("image-case");
      const figure = images.locator('[data-slot="image-card"]').first();
      const image = (await figure.getByRole("img").boundingBox())!, caption = (await figure.locator("figcaption").boundingBox())!;
      expect(Math.abs(image.y + image.height - caption.y)).toBeLessThanOrEqual(1);
      await expect(figure.getByRole("img")).toHaveCSS("border-bottom-left-radius", "0px");
      await images.screenshot({ path: info.outputPath("image-join.png") });
      const area = page.getByTestId("breadcrumb-case");
      await area.evaluate(e => { (e as HTMLElement).style.width = "228px"; });
      await expect(area.locator('[data-slot="breadcrumb-list"] > [data-slot="breadcrumb-separator"]')).toHaveCount(0);
      for (const separator of await area.locator('[data-slot="breadcrumb-separator"]').all()) {
        const sibling = separator.locator('..').locator('a, [aria-current="page"]');
        const a = (await separator.boundingBox())!, b = (await sibling.boundingBox())!;
        expect(Math.abs(a.y - b.y)).toBeLessThanOrEqual(2);
      }
      expect(await area.evaluate(e => e.scrollWidth - e.clientWidth)).toBeLessThanOrEqual(1);
      await area.screenshot({ path: info.outputPath("breadcrumb.png") });
    });
    test("MD-06 gives multiline content the full width above its actions", async ({ page }, info) => {
      const area = page.getByTestId("input-group-case"), field = area.getByRole("textbox", { name: "Message" }), send = area.getByRole("button", { name: "Send" });
      const group = field.locator('..');
      const g = (await group.boundingBox())!, f = (await field.boundingBox())!, b = (await send.boundingBox())!;
      expect(g.width - f.width).toBeLessThanOrEqual(12); expect(b.y).toBeGreaterThanOrEqual(f.y + f.height);
      await field.fill("A long message retains the whole input width. ".repeat(8)); await send.click();
      await expect(area.getByRole("status", { name: "Sent message" })).toContainText("whole input width");
      await field.scrollIntoViewIfNeeded();
      const beforeResize = (await field.boundingBox())!;
      const gripX = beforeResize.x + beforeResize.width - 4, gripY = beforeResize.y + beforeResize.height - 4;
      await page.mouse.move(gripX, gripY); await page.mouse.down();
      await page.mouse.move(gripX, gripY + 64, { steps: 8 }); await page.mouse.up();
      const enlarged = (await field.boundingBox())!, moved = (await send.boundingBox())!;
      expect(enlarged.height).toBeGreaterThan(beforeResize.height + 32);
      expect(moved.y).toBeGreaterThanOrEqual(enlarged.y + enlarged.height);
      await expect(field).toHaveCSS("resize", "vertical");
      await area.screenshot({ path: info.outputPath("input-group.png") });
    });
    test("MD-07 and MD-08 preserve state edges and a real SVG close action", async ({ page }, info) => {
      const area = page.getByTestId("switch-case");
      const off = area.getByRole("switch", { name: "Off", exact: true });
      const disabled = area.getByRole("switch", { name: "Disabled", exact: true });
      const track = off.locator('..').locator('[data-slot="switch-track"]');
      const dim = disabled.locator('..').locator('[data-slot="switch-track"]');
      expect(await track.evaluate(e => getComputedStyle(e).borderColor)).toBe(await dim.evaluate(e => getComputedStyle(e).borderColor));
      expect(Number(await track.evaluate(e => getComputedStyle(e).opacity))).toBeGreaterThan(Number(await dim.evaluate(e => getComputedStyle(e).opacity)));
      await off.focus(); await page.keyboard.press("Space"); await expect(off).toBeChecked(); await expect(disabled).toBeDisabled();
      await expect(track).toHaveCSS("outline-style", "solid");
      await area.screenshot({ path: info.outputPath("switch-states.png") });
      await page.getByRole("button", { name: "Show notification" }).click();
      const toast = page.locator('[data-slot="toast"]');
      await expect(toast).toBeVisible();
      // Base UI excludes dismiss controls from live announcements until toast focus enters.
      await page.keyboard.press("F6");
      await toast.screenshot({ path: info.outputPath("toast-close.png") });
      const close = page.getByRole("button", { name: "Dismiss notification" });
      await expect(close.locator("svg")).toBeVisible(); await close.click(); await expect(close).toBeHidden();
    });
    test("MD-09 shows scroll boundary cues without a client layout wrapper", async ({ page }, info) => {
      const wide = page.getByRole("region", { name: "Wide table" });
      const fitting = page.getByRole("region", { name: "Fitting table" });
      expect(await wide.evaluate(e => e.scrollWidth - e.clientWidth)).toBeGreaterThan(0);
      await expect(wide).toHaveCSS("background-attachment", "local, local, scroll, scroll");
      expect(await fitting.evaluate(e => e.scrollWidth - e.clientWidth)).toBe(0);
      for (const [name, position] of [["start", 0], ["middle", 0.5], ["end", 1]] as const) {
        await wide.evaluate((e, fraction) => { e.scrollLeft = (e.scrollWidth - e.clientWidth) * fraction; }, position);
        await wide.screenshot({ path: info.outputPath(`table-${name}.png`) });
      }
      await expect(wide.getByText("Published").first()).toBeInViewport();
      await fitting.screenshot({ path: info.outputPath("table-fits.png") });
    });
    test("MD-10 uses the same plus-to-minus grammar for disclosure controls", async ({ page }, info) => {
      const area = page.getByTestId("disclosure-case");
      for (const name of ["Accordion details", "Optional details"]) {
        const trigger = area.getByRole("button", { name, exact: true });
        const stem = trigger.locator('[data-slot="disclosure-stem"]');
        await expect(stem).toHaveCount(1); await expect(trigger).toHaveAttribute("aria-expanded", "false");
        await trigger.click(); await expect(trigger).toHaveAttribute("aria-expanded", "true");
        await expect(stem).toHaveCSS("scale", "1 0");
        await trigger.press("Space"); await expect(trigger).toHaveAttribute("aria-expanded", "false");
      }
      await area.screenshot({ path: info.outputPath("disclosures.png") });
    });
  });
}
for (const preset of ["air", "lavender", "sage", "clay", "graphite"]) for (const mode of ["light", "dark"]) {
  test(`micro switch contours ${preset} ${mode}`, async ({ page }, info) => {
    await page.goto(`/micro-finish.html?preset=${preset}&mode=${mode}`);
    const area = page.getByTestId("switch-case");
    await area.waitFor(); await page.evaluate(() => document.fonts.ready);
    for (const track of await area.locator('[data-slot="switch-track"]').all()) {
      expect(await track.evaluate(e => getComputedStyle(e).borderColor)).not.toBe("rgba(0, 0, 0, 0)");
    }
    await area.screenshot({ path: info.outputPath(`${preset}-${mode}.png`) });
  });
}

import { expect, test } from "@playwright/test";
import { writeFile } from "node:fs/promises";

// A tall element screenshot can omit off-viewport composited text. Keep a real
// scrolled viewport and a full-page capture, with bounds for unaltered cropping.
test("sculptural preview remains visible through its bottom status on short screens", async ({ page }, info) => {
  const mode = info.project.name.endsWith("dark") ? "dark" : "light";
  await page.goto("/en/customize");
  await page.locator(".theme-preview-mode").getByRole("button", {
    name: mode === "dark" ? "Dark" : "Light", exact: true,
  }).click();
  const canvas = page.locator("[data-theme-price-preview]");
  await expect(canvas).toHaveAttribute("data-preview-mode", mode);
  const input = canvas.locator('input[type="number"]');
  await input.fill("240");
  await canvas.getByRole("button", { name: "Save", exact: true }).click();
  const status = canvas.getByRole("status");
  await expect(status).toContainText("Target: $240.00");
  await expect(status).toContainText("Local preview only. No alert is sent.");

  const viewport = page.viewportSize()!;
  // This checks usability in the actual viewport; it does not enlarge the UI to
  // manufacture a complete screenshot or conceal a clipped status.
  for (const height of [viewport.height, 500]) {
    await page.setViewportSize({ width: viewport.width, height });
    await status.scrollIntoViewIfNeeded();
    await expect(status).toBeInViewport({ ratio: 1 });
    const painted = await status.evaluate(element => {
      const lastLine = element.querySelector('[data-slot="alert-description"] > span:last-child');
      if (!lastLine) return false;
      const rect = lastLine.getBoundingClientRect();
      const x = rect.x + rect.width / 2;
      const y = rect.y + rect.height / 2;
      const topmost = document.elementFromPoint(x, y);
      return rect.y >= 0 && rect.bottom <= innerHeight &&
        rect.x >= 0 && rect.right <= innerWidth &&
        topmost !== null && element.contains(topmost);
    });
    expect(painted).toBe(true);
    await page.screenshot({
      path: info.outputPath(`status-reachable-${mode}-${height}.png`),
      animations: "disabled",
    });
  }

  await page.setViewportSize(viewport);
  await page.evaluate(async () => {
    window.scrollTo(0, 0);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    await document.fonts.ready;
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  });
  const bounds = await canvas.evaluate(element => {
    const rect = element.getBoundingClientRect();
    return { x: rect.x + scrollX, y: rect.y + scrollY, width: rect.width, height: rect.height };
  });
  const name = `workbench-${mode}`;
  await page.screenshot({ path: info.outputPath(`${name}-full.png`), fullPage: true, animations: "disabled" });
  await writeFile(info.outputPath(`${name}-bounds.json`), JSON.stringify({
    commit: process.env.GITHUB_SHA ?? null, mode, viewport, bounds,
  }, null, 2));
});

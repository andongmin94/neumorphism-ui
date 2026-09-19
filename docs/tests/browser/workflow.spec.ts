import { test, expect } from "@playwright/test";

for (const locale of ["ko", "en", "ja", "zh"]) for (const slug of ["calendar", "date-picker", "data-table", "toast"]) {
  test(`${locale}/${slug}: live preview, exact source and typography`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    const response = await page.goto(`/${locale}/components/${slug}`);
    expect(response?.status()).toBe(200);
    const preview = page.locator("#preview");
    await expect(preview).toBeVisible();
    const font = await page.evaluate(async () => {
      const faces = await document.fonts.load('16px "Pretendard Variable"');
      return { loaded: faces.length > 0 && faces.every(face => face.status === "loaded"), family: getComputedStyle(document.body).fontFamily };
    });
    expect(font.loaded).toBe(true);
    expect(font.family).toMatch(/^"?Pretendard/);
    const tabs = preview.getByRole("tab");
    await tabs.nth(1).click();
    await expect(preview.locator("pre")).toBeVisible();
    expect(await preview.locator("pre").evaluate(element => getComputedStyle(element).fontFamily)).toMatch(/^Consolas/);
    await tabs.nth(0).click();
    await preview.scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const bounds = await preview.locator("[data-slot=calendar], [data-slot=date-picker], [data-slot=data-table]").evaluateAll(elements => elements.map(element => { const rect = element.getBoundingClientRect(); return { left: rect.left, right: rect.right, width: innerWidth }; }));
    for (const bound of bounds) { expect(bound.left).toBeGreaterThanOrEqual(-1); expect(bound.right).toBeLessThanOrEqual(bound.width + 1); }
    await page.screenshot({ path: info.outputPath("workflow-preview.png") });
    expect(errors).toEqual([]);
  });
}

for (const zone of ["Asia/Seoul", "America/Los_Angeles"]) {
  test(`date-only serialization stays local in ${zone}`, async ({ browser }, info) => {
    const context = await browser.newContext({ timezoneId: zone, viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
    const page = await context.newPage();
    try {
      await page.goto("http://127.0.0.1:4178/en/components/date-picker");
      const preview = page.locator("#preview");
      const trigger = preview.getByRole("button", { name: /^Due date:/ });
      await trigger.click();
      const popup = page.locator('[data-slot="popover-content"]');
      await popup.locator('[data-day="2026-09-17"] button').click();
      await expect(preview.locator('input[name="dueDate"]')).toHaveValue("2026-09-17");
      expect(await preview.locator("form").evaluate(form => new FormData(form as HTMLFormElement).get("dueDate"))).toBe("2026-09-17");
      await expect(trigger).toBeFocused();
      await preview.getByRole("button", { name: "Clear date", exact: true }).first().click();
      await expect(preview.locator('input[name="dueDate"]')).toHaveValue("");
      await preview.getByRole("button", { name: "Reset date", exact: true }).click();
      await expect(preview.locator('input[name="dueDate"]')).toHaveValue("2026-09-15");
      await page.screenshot({ path: info.outputPath("local-date.png") });
    } finally { await context.close(); }
  });
}

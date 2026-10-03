import { expect, test } from "@playwright/test";

const labels = { en: "English", ko: "한국어", ja: "日本語", zh: "简体中文" };

for (const [locale, fullLabel] of Object.entries(labels)) {
  test(`compact language label and native menu: ${locale}`, async ({ page }, info) => {
    await page.goto(`/${locale}/components`);
    await page.setViewportSize({ width: 320, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    const switcher = page.locator(".language-switcher");
    const trigger = switcher.locator("summary");
    await expect(trigger).toHaveText(locale.toUpperCase());
    const geometry = await trigger.evaluate(element => {
      const box = element.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(element.querySelector("span")!);
      const text = range.getBoundingClientRect();
      return { lines: range.getClientRects().length,
        left: text.left - box.left, right: box.right - text.right,
        top: text.top - box.top, bottom: box.bottom - text.bottom };
    });
    expect(geometry.lines).toBe(1);
    for (const inset of [geometry.left, geometry.right, geometry.top, geometry.bottom]) expect(inset).toBeGreaterThanOrEqual(-1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await page.locator(".site-header").screenshot({ path: info.outputPath("header-320.png") });

    // Only the compact trigger changes. Native names and destination paths stay intact.
    await trigger.focus();
    await trigger.press("Enter");
    const menu = switcher.getByRole("navigation");
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link")).toHaveCount(4);
    await expect(menu.getByRole("link", { name: fullLabel, exact: true })).toHaveAttribute("aria-current", "page");
    for (const [target, label] of Object.entries(labels)) {
      await expect(menu.getByRole("link", { name: label, exact: true })).toHaveAttribute("href", `/${target}/components`);
    }
    await page.locator(".site-header").screenshot({ path: info.outputPath("language-menu-320.png") });
    const next = locale === "en" ? "ja" : "en";
    await menu.getByRole("link", { name: labels[next], exact: true }).click();
    await expect(page).toHaveURL(url => url.pathname === `/${next}/components`);
    await expect(page.locator(".language-switcher summary")).toHaveText(next.toUpperCase());
  });
}

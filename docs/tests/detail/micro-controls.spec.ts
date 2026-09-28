import { expect, test } from "@playwright/test";

for (const locale of ["en", "ko", "ja", "zh"]) {
  test(`SVG button and copy controls retain labels and geometry: ${locale}`, async ({ page, context }, info) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto(`/${locale}/components/button`);
    await expect(page.locator("[data-github-repository]")).toHaveAttribute("data-state", /^(ready|unavailable)$/, { timeout: 10000 });
    const panel = page.locator(".component-example-panel").first();
    await panel.screenshot({ path: info.outputPath("button-icons.png") });
    const add = panel.locator('button[aria-label]');
    await expect(add).toHaveAccessibleName(/.+/);
    await expect(add.locator('svg[aria-hidden="true"]')).toBeVisible();
    const copy = page.locator(".copy-button").first();
    await copy.scrollIntoViewIfNeeded();
    const before = (await copy.boundingBox())!;
    await copy.screenshot({ path: info.outputPath("copy-ready.png") });
    await expect(copy.locator("svg rect")).toHaveCount(1);
    await copy.click();
    await expect(copy.locator("svg rect")).toHaveCount(0);
    await expect(copy.locator(".sr-only")).not.toBeEmpty();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("neumorphism-ui");
    expect((await copy.boundingBox())!.height).toBe(before.height);
    await copy.screenshot({ path: info.outputPath("copy-success.png") });
  });

  test(`Directory reset and mobile navigation retain focus: ${locale}`, async ({ page }, info) => {
    await page.goto(`/${locale}`);
    await expect(page.locator("[data-github-repository]")).toHaveAttribute("data-state", /^(ready|unavailable)$/, { timeout: 10000 });
    const search = page.locator(".component-directory-search input");
    await search.fill("button");
    const clear = page.locator(".component-directory-search button");
    await clear.screenshot({ path: info.outputPath("directory-clear.png") });
    await expect(clear.locator('svg[aria-hidden="true"]')).toBeVisible();
    await clear.click(); await expect(search).toHaveValue(""); await expect(search).toBeFocused();
    await expect(page.locator(".component-directory-card")).toHaveCount(56);
    const mobile = page.locator(".mobile-nav-trigger");
    if (await mobile.isVisible()) {
      await mobile.click();
      const close = page.locator(".mobile-nav-close");
      await expect(close).toBeVisible();
      await close.screenshot({ path: info.outputPath("mobile-navigation-close.png") });
      await expect(close.locator('svg[aria-hidden="true"]')).toBeVisible();
      await close.click(); await expect(close).toBeHidden(); await expect(mobile).toBeFocused();
    }
  });
}

test("Theme direction controls use fixed SVG geometry and retain selection", async ({ page }, info) => {
  await page.goto("/en/customize");
  const directions = page.locator(".theme-direction-grid button");
  await expect(directions).toHaveCount(4);
  await directions.first().scrollIntoViewIfNeeded();
  await page.locator(".theme-direction-grid").screenshot({ path: info.outputPath("light-directions.png") });
  for (const button of await directions.all()) {
    await expect(button.locator('svg[aria-hidden="true"]')).toBeVisible();
    await button.click(); await expect(button).toHaveAttribute("aria-pressed", "true");
  }
  await expect(page.locator('.theme-direction-grid [aria-pressed="true"]')).toHaveCount(1);
  await expect(page.locator(".theme-preset-check svg")).toHaveCount(1);
});

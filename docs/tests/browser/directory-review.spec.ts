import { expect, test } from "@playwright/test";

test("mobile directory stays compact, readable and navigable in every locale", async ({ page }) => {
  for (const locale of ["ko", "en", "ja", "zh"]) {
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`/${locale}/components`);
      const cards = page.locator(".component-directory-card");
      await expect(cards).toHaveCount(56);
      const button = page.locator(`a.component-directory-card[href="/${locale}/components/button"]`);
      await expect(button.locator("h3")).toHaveCSS("font-size", "20px");
      await expect(button.locator("p")).toHaveCSS("font-size", "14px");
      await expect.poll(async () => (await button.boundingBox())!.height).toBeLessThan(170);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
      await page.getByRole("textbox").fill("button");
      // Search also includes summaries, so related components may match "button".
      await expect.poll(() => cards.count()).toBeLessThan(56);
      await expect(button).toBeVisible();
      await button.focus();
      await expect(button).toHaveCSS("outline-width", "2px");
      await button.press("Enter");
      await expect(page).toHaveURL(new RegExp(`/${locale}/components/button$`));
    }
  }
});

test("Air dark blue is shared by selected controls and readable accent text", async ({ page }, info) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/en/components/button");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const colors = await page.locator("html").evaluate(root => {
    const style = getComputedStyle(root);
    return { primary: style.getPropertyValue("--primary").trim(), ink: style.getPropertyValue("--neu-accent-ink").trim() };
  });
  expect(colors).toEqual({ primary: "#237bff", ink: "#68a8ff" });
  await expect(page.locator('#preview [data-variant="primary"]')).toHaveCSS("color", "rgb(104, 168, 255)");
  if (!info.project.use.hasTouch) {
    await page.goto("/en/components/accordion");
    const trigger = page.locator('#preview [data-slot="accordion-trigger"]').first();
    await trigger.hover();
    await expect(trigger).toHaveCSS("color", "rgb(104, 168, 255)");
  }
});

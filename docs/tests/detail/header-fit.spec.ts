import { expect, test } from "@playwright/test";

for (const locale of ["en", "ko", "ja", "zh"]) {
  test(`header preserves each visible destination and control: ${locale}`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(`/${locale}/components/toggle-group`);
    await expect(page.locator(".component-example")).toHaveAttribute("aria-busy", "false");
    await page.evaluate(() => document.fonts.ready);
    for (const width of [320, 360, 390, 768, 1023, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await expect.poll(() => page.evaluate(() => {
        const selectors = [".mobile-nav-trigger", ".site-brand__mark", ".primary-nav", ".header-search", "[data-github-repository]", ".language-switcher > summary", ".theme-toggle"];
        const boxes = selectors.map(selector => document.querySelector(selector)!.getBoundingClientRect()).filter(r => r.width && r.height);
        const excess = [document.documentElement.scrollWidth - innerWidth, ...boxes.flatMap(r => [-r.left, r.right - innerWidth])];
        for (let i = 0; i < boxes.length; i++) for (let j = i+1; j < boxes.length; j++) {
          const a = boxes[i], b = boxes[j];
          if (Math.min(a.bottom,b.bottom) > Math.max(a.top,b.top)) excess.push(Math.min(a.right,b.right)-Math.max(a.left,b.left));
        }
        return Math.max(...excess);
      }), { message: "Visible header controls must neither overlap nor leave the viewport" }).toBeLessThanOrEqual(1);
      // The home mark may fit the page while spilling out of its grid column.
      const home = await page.locator(".site-brand").evaluate(e => {
        const a=e.getBoundingClientRect(), b=e.querySelector(".site-brand__mark")!.getBoundingClientRect();
        return { left:b.left-a.left, right:a.right-b.right };
      });
      expect(home.left).toBeGreaterThanOrEqual(-1); expect(home.right).toBeGreaterThanOrEqual(-1);
      await expect(page.locator(".site-brand")).toHaveAttribute("href", `/${locale}`);
      await expect(page.locator("[data-github-repository]")).toHaveAttribute("href", "https://github.com/andongmin94/neumorphism-ui");
      await expect(page.locator("[data-github-stars]")).toBeVisible();
      await page.locator(".site-header").screenshot({ path: info.outputPath(`header-${width}.png`) });
    }
    await page.setViewportSize({width:320,height:900});
    const menu=page.locator(".mobile-nav-trigger");
    await menu.click(); await expect(page.locator(".mobile-nav-panel")).toBeVisible();
    await page.keyboard.press("Escape"); await expect(page.locator(".mobile-nav-panel")).toBeHidden();
    await expect(menu).toBeFocused();
    const search=page.locator(".docs-search-trigger");
    await search.click(); await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape"); await expect(page.getByRole("dialog")).toBeHidden();
    await expect(search).toBeFocused();
    const language=page.locator(".language-switcher > summary");
    await language.click(); await expect(page.locator(".language-switcher nav")).toBeVisible();
    await language.click(); await expect(page.locator(".language-switcher nav")).toBeHidden();
    const original=await page.locator("html").getAttribute("data-theme");
    await page.locator(".theme-toggle").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", original === "dark" ? "light" : "dark");
    await page.locator(".theme-toggle").click(); await expect(page.locator("html")).toHaveAttribute("data-theme", original!);
    await page.locator(".site-brand").focus(); await page.keyboard.press("Enter");
    await expect(page).toHaveURL(url=>url.pathname===`/${locale}`);
    expect(errors).toEqual([]);
  });
}

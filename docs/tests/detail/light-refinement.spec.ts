import { expect, test } from "@playwright/test";

test("raised controls and plates retain clear material with quieter light", async ({ page }, info) => {
  const mode = info.project.name.endsWith("dark") ? "dark" : "light";
    await page.goto("/en/components/button");
    await page.evaluate(() => document.fonts.ready);
    const button = page.locator(".component-example-panel [data-slot=button][data-variant=default]").first();
    await expect(button).toBeVisible();
    const values = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return Object.fromEntries(["--neu-shadow-raised", "--neu-shadow-raised-sm", "--neu-shadow-hover",
        "--neu-shadow-plate", "--neu-shadow-inset"].map(key => [key, style.getPropertyValue(key).trim()]));
    });
    const light = mode === "light";
    for (const [key, mix] of [["--neu-shadow-raised", light ? "74%" : "94%"],
      ["--neu-shadow-raised-sm", light ? "64%" : "84%"],
      ["--neu-shadow-hover", light ? "64%" : "84%"],
      ["--neu-shadow-plate", light ? "68%" : "84%"]] as const) {
      expect(values[key]).toContain(mix);
    }
    await expect(button).not.toHaveCSS("box-shadow", "none");
    expect(await button.evaluate(el => getComputedStyle(el).boxShadow)).not.toContain("inset");
    await button.screenshot({ path: info.outputPath("button.png"), animations: "disabled" });
    await button.focus();
    await expect(button).toHaveCSS("outline-width", "2px");
    await page.locator(".component-installation").screenshot({ path: info.outputPath("copy-and-registry.png"), animations: "disabled" });

    await page.goto("/en/components/card");
    const card = page.locator(".component-example-panel [data-slot=card][data-variant=raised]").first();
    await expect(card).toBeVisible();
    const shadow = await card.evaluate(el => getComputedStyle(el).boxShadow);
    expect(shadow).not.toBe("none");
    expect(shadow).not.toContain("inset");
    await card.screenshot({ path: info.outputPath("card.png"), animations: "disabled" });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
const registry = JSON.parse(readFileSync(new URL("../../../registry/public/r/registry.json", import.meta.url), "utf8")) as { homepage: string };
for (const locale of ["en", "ko", "ja", "zh"]) {
  test(`canonical origin in rendered installation and metadata: ${locale}`, async ({ page, request }, info) => {
    const url = `/${locale}/docs/installation`;
    const response = await request.get(url);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(registry.homepage);
    expect(html).not.toContain("https://neumorphism-ui.dev");
    await page.goto(url);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", `${registry.homepage}/og.png`);
    await expect(page.locator("[data-github-repository]")).toHaveAttribute("data-state", /^(ready|unavailable)$/, { timeout: 10000 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
    await page.screenshot({ path: info.outputPath(`installation-${locale}.png`), animations: "disabled" });
  });
}

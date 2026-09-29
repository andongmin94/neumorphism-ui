import { expect, test } from "@playwright/test";

for (const width of [1440, 390, 320]) for (const mode of ["light", "dark"]) {
  test(`Card plates use the installed material at ${width}px ${mode}`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    if (mode === "dark") await page.getByRole("button", { name: "Change mode", exact: true }).click();
    for (const preset of ["air", "lavender", "sage", "clay", "graphite"]) {
      await page.getByLabel("Preset", { exact: true }).selectOption(preset);
      await expect(page.locator("html")).toHaveAttribute("data-material", `${preset}-${mode}`);
      const plates = page.locator("#reference-plates [data-slot=card]");
      await expect(plates).toHaveCount(4);
      for (const card of await plates.all()) {
        await expect(card).not.toHaveCSS("box-shadow", "none");
        expect(await card.evaluate(e => getComputedStyle(e).boxShadow)).not.toContain("inset");
        expect(await card.evaluate(e => e.scrollWidth <= e.clientWidth + 1)).toBe(true);
      }
      const accent = plates.nth(1);
      const styles = await accent.evaluate(e => {
        const root = getComputedStyle(e), title = getComputedStyle(e.querySelector('[data-slot=card-title]')!), description = getComputedStyle(e.querySelector('[data-slot=card-description]')!);
        const probe = document.createElement("span"); e.append(probe);
        probe.style.color = "var(--primary-foreground)";
        const expected = getComputedStyle(probe).color;
        probe.style.color = "var(--primary)";
        const background = getComputedStyle(probe).color;
        probe.remove();
        return { root: root.color, title: title.color, description: description.color, expected, background, actualBackground: root.backgroundColor };
      });
      expect(styles.root).toBe(styles.expected);
      expect(styles.title).toBe(styles.expected);
      expect(styles.description).toBe(styles.expected);
      expect(styles.actualBackground).toBe(styles.background);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      await page.locator("#reference-plates").screenshot({ path: info.outputPath(`plates-${preset}.png`) });
    }
  });
}

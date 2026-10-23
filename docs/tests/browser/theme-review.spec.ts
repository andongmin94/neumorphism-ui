import { expect, test } from "@playwright/test";

test("theme controls work for the page session when browser storage is denied", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() { throw new DOMException("Storage is blocked", "SecurityError"); },
    });
  });
  await page.goto("/en/customize");
  const controls = page.locator("#theme-settings");
  await expect(controls).toHaveAttribute("aria-busy", "false");
  await expect(controls).not.toHaveAttribute("inert");
  await controls.getByRole("button", { name: "Sage", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-custom-theme", "sage");
  await controls.locator('[data-theme-choice="motion"]').getByRole("button", { name: "260ms" }).click();
  await expect(page.locator("#theme-output pre")).toContainText("260ms");
  const mode = await page.locator("html").getAttribute("data-theme");
  await page.locator(".theme-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", mode === "dark" ? "light" : "dark");
  await expect(page.locator("html")).toHaveAttribute("data-custom-theme", "sage");
  await expect(page.locator("html")).toHaveCSS("--neu-duration", "260ms");
  await controls.locator(".theme-studio-panel-heading > button").click();
  await expect(page.locator("html")).toHaveAttribute("data-custom-theme", "air");
  await expect(page.locator("#theme-output pre")).toContainText("180ms");
  expect(errors).toEqual([]);
});

test("failed preference writes and removal cannot restore stale saved settings", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.addInitScript(() => {
    localStorage.setItem("neumorphism-ui-style-v2", JSON.stringify({
      schemaVersion: 2, presetId: "sage", accent: null, depth: "subtle",
      lightDirection: "top-right", surfaceRadius: 18, controlShape: "soft", motion: 180,
    }));
    Storage.prototype.setItem = () => { throw new DOMException("Storage is full", "QuotaExceededError"); };
    Storage.prototype.removeItem = () => { throw new DOMException("Storage is blocked", "SecurityError"); };
  });
  await page.goto("/en/customize");
  const controls = page.locator("#theme-settings");
  await expect(controls).toHaveAttribute("aria-busy", "false");
  await expect(controls.getByRole("button", { name: "Sage", exact: true })).toHaveAttribute("aria-pressed", "true");
  await controls.getByRole("button", { name: "Clay", exact: true }).click();
  await page.locator(".theme-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("data-custom-theme", "clay");
  await controls.locator(".theme-studio-panel-heading > button").click();
  await page.locator(".theme-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("data-custom-theme", "air");
  await expect(controls.getByRole("button", { name: "Air", exact: true })).toHaveAttribute("aria-pressed", "true");
  expect(JSON.parse((await page.evaluate(() => localStorage.getItem("neumorphism-ui-style-v2")))!).presetId).toBe("sage");
  expect(errors).toEqual([]);
});

test("theme preview progress keeps its name while its actual value changes", async ({ page }) => {
  await page.goto("/en/customize");
  const preview = page.locator("[data-theme-price-preview]");
  await preview.locator('input[type="number"]').fill("240");
  await preview.getByRole("button", { name: "Save", exact: true }).click();
  const progress = preview.getByRole("progressbar", { name: "Progress toward target", exact: true });
  await expect(progress).toBeVisible();
  await expect(progress).toHaveAttribute("aria-valuenow", /^78/);
  await expect(preview).toContainText("78% of target");
});

test("mobile theme sections and preset tiles remain reachable at narrow widths", async ({ page }, info) => {
  test.skip(!info.project.name.startsWith("mobile"), "Mobile theme navigation.");
  for (const locale of ["en", "ko", "ja", "zh"]) {
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`/${locale}/customize`);
      const controls = page.locator("#theme-settings");
      await expect(controls).toHaveAttribute("aria-busy", "false");
      const navigation = page.locator('.theme-studio > nav');
      await expect(navigation).toBeVisible();
      await expect(navigation.getByRole("link")).toHaveCount(3);
      const tiles = controls.locator(".theme-preset-grid > button");
      const first = (await tiles.nth(0).boundingBox())!;
      const second = (await tiles.nth(1).boundingBox())!;
      const third = (await tiles.nth(2).boundingBox())!;
      expect(Math.abs(first.y - second.y)).toBeLessThanOrEqual(1);
      expect(third.y).toBeGreaterThan(first.y);
      expect(first.height).toBeGreaterThanOrEqual(44);
      for (const id of ["theme-preview", "theme-output", "theme-settings"]) {
        await test.step(`${locale} ${width}px: #${id} clears the fixed navigation`, async () => {
          await navigation.locator(`a[href="#${id}"]`).click();
          await expect(page).toHaveURL(new RegExp(`#${id}$`));
          await expect(navigation).toBeInViewport();
          // Native fragment scrolling is followed by the router's hash alignment.
          await expect.poll(async () => {
            const header = (await page.locator(".site-header").boundingBox())!;
            const navigationBox = (await navigation.boundingBox())!;
            return Math.abs(navigationBox.y - header.y - header.height);
          }).toBeLessThanOrEqual(1);
          const top = (await page.locator(`#${id}`).boundingBox())!.y;
          const navigationBox = (await navigation.boundingBox())!;
          expect(top).toBeGreaterThanOrEqual(navigationBox.y + navigationBox.height - 1);
          expect(top).toBeLessThan(844 / 2);
        });
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    }
  }
});

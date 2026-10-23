import { expect, test, type Locator } from "@playwright/test";

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

test("pill controls keep theme code contained, scrollable and copyable", async ({ page }, info) => {
  await page.addInitScript(() => {
    let copied = "";
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text: string) => { copied = text; },
        readText: async () => copied,
      },
    });
  });
  await page.goto("/en/customize");
  const controls = page.locator("#theme-settings");
  await expect(controls).toHaveAttribute("aria-busy", "false");
  const pill = controls.getByRole("button", { name: "Pill", exact: true });
  await pill.click();
  const radius = controls.getByRole("slider", { name: "Surface radius", exact: true });
  await radius.focus();
  await radius.press("End");
  await expect(controls.locator(".theme-radius-control output")).toHaveText("32px");

  const output = page.locator("#theme-output");
  const css = output.getByRole("group", { name: "Generated neumorphism theme CSS", exact: true });
  const expectCodeSurface = async (shell: Locator) => {
    await expect(shell).toBeVisible();
    // Highlighting can replace the pre between two awaited measurements.
    // Read the surface and both children in one DOM snapshot.
    const { box, corner, children } = await shell.evaluate(element => ({
      box: element.getBoundingClientRect().toJSON(),
      corner: Number.parseFloat(getComputedStyle(element).borderTopLeftRadius),
      children: ["pre", ".copy-button"].map(selector => element.querySelector(selector)?.getBoundingClientRect().toJSON()),
    }));
    expect(corner).toBeGreaterThan(0);
    expect(corner).toBeLessThanOrEqual(32);
    for (const childBox of children) {
      expect(childBox).toBeDefined();
      expect(childBox!.width).toBeGreaterThan(0);
      expect(childBox!.height).toBeGreaterThan(0);
      expect(childBox!.x).toBeGreaterThanOrEqual(box.x);
      expect(childBox!.y).toBeGreaterThanOrEqual(box.y);
      expect(childBox!.x + childBox!.width).toBeLessThanOrEqual(box.x + box.width + 1);
      expect(childBox!.y + childBox!.height).toBeLessThanOrEqual(box.y + box.height + 1);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  };

  await expectCodeSurface(css);
  await expect(css.locator("pre")).toContainText("--neu-radius-surface: 32px;");
  const generated = (await css.locator("pre").textContent())!.trimEnd();
  await css.locator(".copy-button").click();
  await expect(css.locator(".copy-button")).toHaveAccessibleName("Copied");
  expect((await page.evaluate(() => navigator.clipboard.readText())).trimEnd()).toBe(generated);

  const mode = await page.locator("html").getAttribute("data-theme");
  await page.locator(".theme-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", mode === "dark" ? "light" : "dark");
  await expect(pill).toHaveAttribute("aria-pressed", "true");
  await expectCodeSurface(css);

  await output.getByRole("tab", { name: "CLI", exact: true }).click();
  const commands = output.locator('[data-code-language="bash"]');
  await expect(commands).toHaveCount(2);
  for (const command of await commands.all()) await expectCodeSurface(command);
  const dryRun = commands.first();
  await expect(dryRun.locator("pre")).toContainText("--dry-run");
  const command = (await dryRun.locator("pre").textContent())!.trimEnd();
  await dryRun.locator(".copy-button").click();
  await expect(dryRun.locator(".copy-button")).toHaveAccessibleName("Copied");
  expect((await page.evaluate(() => navigator.clipboard.readText())).trimEnd()).toBe(command);

  await output.getByRole("tab", { name: "CSS", exact: true }).click();
  await expectCodeSurface(css);
  expect((await css.locator("pre").textContent())!.trimEnd()).toBe(generated);
  const pre = css.locator("pre");
  await pre.hover();
  const pageScroll = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 300);
  await expect.poll(() => pre.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
  expect(await page.evaluate(() => scrollY)).toBe(pageScroll);
  await pre.evaluate(element => { element.scrollTop = 0; });
  await output.evaluate(element => element.scrollIntoView({ block: "start" }));
  await page.screenshot({ path: info.outputPath("pill-theme-output.png"), fullPage: false });
});

test("pill choices and output tabs retain rounded selected surfaces", async ({ page }, info) => {
  await page.goto("/en/customize");
  const controls = page.locator("#theme-settings");
  await expect(controls).toHaveAttribute("aria-busy", "false");
  const shapes = controls.locator('[data-theme-choice="controlShape"]');
  await shapes.getByRole("button", { name: "Pill", exact: true }).click();
  await controls.locator('[data-theme-choice="depth"]').getByRole("button", { name: "Deep", exact: true }).click();
  const expectPill = async (element: Locator) => {
    // A capsule reaches halfway across its short edge, regardless of its CSS implementation.
    await expect.poll(() => element.evaluate(node => {
      const box = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      const corners = [style.borderTopLeftRadius, style.borderTopRightRadius, style.borderBottomLeftRadius, style.borderBottomRightRadius];
      return Math.min(...corners.map(value => Number.parseFloat(value))) - Math.min(box.width, box.height) / 2;
    })).toBeGreaterThanOrEqual(-1);
  };
  const selected = controls.locator("[data-theme-choice]").getByRole("button", { pressed: true });
  await expect(selected).toHaveCount(3);
  for (const choice of await selected.all()) await expectPill(choice);
  await shapes.scrollIntoViewIfNeeded();
  await page.screenshot({ path: info.outputPath("pill-theme-controls.png"), fullPage: false });

  const output = page.locator("#theme-output");
  for (const format of ["CLI", "CSS"]) {
    const tab = output.getByRole("tab", { name: format, exact: true });
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true");
    await expectPill(tab);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

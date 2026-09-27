import { expect, test } from "@playwright/test";

const panel = ".component-example-panel";

for (const slug of ["button", "input", "checkbox", "radio-group", "switch", "tabs", "accordion", "progress", "toolbar", "calendar"]) {
  test(`surface hierarchy: ${slug} is not placed inside a second embossed frame`, async ({ page }) => {
    await page.goto(`/en/components/${slug}`);
    await expect(page.locator(panel).first()).toBeVisible();
    expect(await page.locator(panel).first().evaluate(e => getComputedStyle(e).boxShadow)).toBe("none");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
  });
}

test("small checkbox faces stay square and marks stay centered", async ({ page }, info) => {
  await page.goto("/en/components/checkbox");
  const root = page.locator(`${panel} [data-slot=checkbox-root]`).first();
  const face = root.locator(':scope > [aria-hidden="true"]');
  expect(await face.evaluate(e => parseFloat(getComputedStyle(e).borderTopLeftRadius))).toBeLessThanOrEqual(4);
  const box = (await face.boundingBox())!;
  const mark = (await face.locator("[data-check]").boundingBox())!;
  expect(Math.abs(mark.x + mark.width / 2 - box.x - box.width / 2)).toBeLessThan(1);
  expect(Math.abs(mark.y + mark.height / 2 - box.y - box.height / 2)).toBeLessThan(1);
  const checkbox = root.getByRole("checkbox");
  await checkbox.focus();
  await page.keyboard.press("Space");
  await expect(checkbox).not.toBeChecked();
  await page.keyboard.press("Space");
  await expect(checkbox).toBeChecked();
  await page.locator(panel).screenshot({ path: info.outputPath("checkbox-anatomy.png") });
});

test("choice rows and tabs do not repeat raised containers", async ({ page }, info) => {
  for (const slug of ["radio-group", "switch", "tabs", "progress"]) {
    await page.goto(`/en/components/${slug}`);
    const wrappers = page.locator(`${panel} .component-preview-choice-card, ${panel} .component-preview-setting, ${panel} .component-preview-tab-panel, ${panel} .component-preview-progress`);
    expect(await wrappers.count()).toBeGreaterThan(0);
    for (const wrapper of await wrappers.all()) {
      expect(await wrapper.evaluate(e => getComputedStyle(e).boxShadow)).toBe("none");
    }
    await page.locator(panel).screenshot({ path: info.outputPath(`open-${slug}.png`) });
  }
});

test("form families share their geometry and are not given docs-only pill corners", async ({ page }) => {
  for (const [slug, slot] of [["input", "input"], ["select", "select"], ["combobox", "combobox-input"], ["field", "field-control"]]) {
    await page.goto(`/en/components/${slug}`);
    const field = page.locator(`${panel} [data-slot=${slot}]`).first();
    await expect(field).toBeVisible();
    const style = await field.evaluate(e => { const s = getComputedStyle(e); return { h: e.getBoundingClientRect().height, radius: parseFloat(s.borderTopLeftRadius), padding: parseFloat(s.paddingLeft), shadow: s.boxShadow, tracking: s.letterSpacing }; });
    expect(style.h).toBe(40);
    expect(style.radius).toBe(8);
    expect(style.padding).toBe(12);
    expect(style.shadow).toContain("inset");
    expect(["normal", "0px"]).toContain(style.tracking);
  }
});

test("neutral primary action keeps its material through press and keyboard focus", async ({ page }, info) => {
  await page.goto("/en/components/button");
  const button = page.locator(`${panel} [data-slot=button][data-variant=primary]`).first();
  const style = await button.evaluate(e => ({ face: getComputedStyle(e).backgroundColor, canvas: getComputedStyle(e.closest(".component-example-panel")!).backgroundColor, shadow: getComputedStyle(e).boxShadow }));
  expect(style.face).toBe(style.canvas);
  expect(style.shadow).not.toBe("none");
  await button.hover(); await page.mouse.down();
  expect(await button.evaluate(e => getComputedStyle(e).boxShadow)).toContain("inset");
  await page.mouse.up();
  await button.focus(); await page.keyboard.press("Tab"); await page.keyboard.press("Shift+Tab");
  await expect(button).toBeFocused();
  await expect(button).toHaveCSS("outline-style", "solid");
  await page.locator(panel).screenshot({ path: info.outputPath("action-anatomy.png") });
});

test("global search keeps one icon after source Command anatomy changes", async ({ page }) => {
  await page.goto("/en/docs");
  await page.locator(".docs-search-trigger").click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const input = dialog.locator("[data-slot=command-input]");
  await expect(input).toBeVisible();
  await input.fill("slider");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/en\/components\/slider/);
});

for (const slug of ["dashboard", "settings", "data-manager", "link-hub", "portfolio", "blog", "blog-post", "cms"]) {
  test(`composed surface: ${slug} remains usable in the common material`, async ({ page }, info) => {
    const errors: string[] = []; page.on("pageerror", e => errors.push(e.message));
    const response = await page.goto(`/en/templates/${slug}`);
    expect(response?.status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
    expect(errors).toEqual([]);
    await page.screenshot({ path: info.outputPath(`template-${slug}-top.png`) });
    await page.screenshot({ path: info.outputPath(`template-${slug}.png`), fullPage: true });
  });
}

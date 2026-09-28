import { expect, test, type Locator } from "@playwright/test";
import { readFileSync } from "node:fs";

async function expectDarkPlus(shell: Locator) {
  const pre = shell.locator("pre.shiki");
  await expect(pre).toBeVisible();
  await expect(shell).toHaveCSS("background-color", "rgb(30, 30, 30)");
  await expect(pre).toHaveCSS("font-family", /Consolas/);
  await expect(pre).toHaveCSS("font-size", "13px");
  await expect(pre).toHaveCSS("font-weight", "400");
  const colors = await pre.locator("span[style]").evaluateAll(elements =>
    [...new Set(elements.map(element => getComputedStyle(element).color))]);
  expect(colors.length).toBeGreaterThan(1);
  return pre;
}

test("directory cards keep idle depth, legible type, press and focus", async ({ page }, info) => {
  await page.goto("/en");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".component-directory-toolbar h2")).toHaveCSS("font-weight", "700");
  await page.locator(".component-directory-categories button").filter({ hasText: "Forms" }).click();
  const cards = page.locator(".component-directory-card");
  await expect(cards).toHaveCount(19);
  const first = cards.first();
  await first.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  for (const card of await cards.all()) {
    await expect(card).not.toHaveCSS("box-shadow", "none");
    expect(await card.evaluate(element => getComputedStyle(element).boxShadow)).not.toContain("inset");
    await expect(card.locator("h3")).toHaveCSS("font-weight", "700");
    await expect(card.locator("p")).toHaveCSS("font-weight", "500");
    await expect(card.locator("p")).toHaveCSS("font-size", "14px");
  }
  const idle = await first.evaluate(element => getComputedStyle(element).boxShadow);
  const box = (await first.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + 10);
  await page.mouse.down();
  await expect(first).toHaveCSS("box-shadow", /inset/);
  // Release away from the link, then exercise its real keyboard destination.
  await page.mouse.move(0, 0); await page.mouse.up();
  await expect(first).toHaveCSS("box-shadow", idle);
  await page.locator(".component-directory-results-head").scrollIntoViewIfNeeded();
  await page.screenshot({ path: info.outputPath("directory-reading.png") });
  await page.keyboard.press("Tab");
  await first.focus();
  await expect(first).toBeFocused();
  await expect(first).toHaveCSS("outline-width", "2px");
  await first.screenshot({ path: info.outputPath("directory-card-focus.png") });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await first.press("Enter");
  await expect(page).toHaveURL(/\/en\/components\/checkbox$/);
});

test("320px directory and highlighted examples retain all four locales", async ({ page }, info) => {
  await page.setViewportSize({ width: 320, height: 900 });
  for (const locale of ["en", "ko", "ja", "zh"]) {
    await page.goto(`/${locale}/components`);
    const card = page.locator(".component-directory-card").first();
    await expect(card).not.toHaveCSS("box-shadow", "none");
    await expect(card.locator("h3")).toHaveCSS("font-weight", "700");
    await page.goto(`/${locale}/components/button`);
    const preview = page.locator("#preview");
    await preview.getByRole("tab").nth(1).click();
    const shell = preview.locator(".code-shell");
    await expectDarkPlus(shell);
    await shell.screenshot({ path: info.outputPath(`code-320-${locale}.png`) });
    const button = shell.locator(".copy-button");
    const box = (await button.boundingBox())!;
    expect(box.width).toBeGreaterThanOrEqual(40);
    expect(box.x + box.width).toBeLessThanOrEqual(321);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
});

test("Dark+ highlights real TSX and installed source without changing copied bytes", async ({ page, context }, info) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/en/components/button");
  await page.locator("#preview").getByRole("tab", { name: "Code", exact: true }).click();
  const preview = page.locator("#preview .code-shell");
  const pre = await expectDarkPlus(preview);
  const colors = await pre.locator("span[style]").evaluateAll(elements => elements.map(element => getComputedStyle(element).color));
  expect(colors).toContain("rgb(86, 156, 214)"); // Dark+ HTML tag.
  expect(colors).toContain("rgb(206, 145, 120)"); // Dark+ string.
  await page.locator(".component-example-code").scrollIntoViewIfNeeded();
  await page.screenshot({ path: info.outputPath("code-reading.png") });
  await pre.focus();
  await expect(pre).toBeFocused();
  await pre.press("End");
  await preview.locator(".copy-button").click();
  expect((await page.evaluate(() => navigator.clipboard.readText())).trimEnd()).toBe((await pre.textContent())!.trimEnd());
  await preview.screenshot({ path: info.outputPath("dark-plus-example.png") });

  await page.locator(".component-installation").getByRole("tab").nth(1).click();
  const source = page.locator(".component-source-file .code-shell").last();
  const sourcePre = await expectDarkPlus(source);
  const item = JSON.parse(readFileSync(new URL("../../../registry/public/r/button.json", import.meta.url), "utf8"));
  expect((await sourcePre.textContent())!.trimEnd()).toBe(item.files[0].content.trimEnd());
  await source.locator(".copy-button").click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(item.files[0].content);
  // Header typography must not leak into highlighted source spans.
  await expect(sourcePre.locator("span[style]").first()).toHaveCSS("font-family", /Consolas/);
  await expect(sourcePre.locator("span[style]").first()).toHaveCSS("font-weight", "400");
  await source.screenshot({ path: info.outputPath("dark-plus-installed-source.png") });
  expect(errors).toEqual([]);
});

test("CLI, JSON and reference commands use their declared grammars", async ({ page }, info) => {
  await page.goto("/en/docs/installation");
  await expectDarkPlus(page.locator('#project .code-shell[data-code-language="bash"]'));
  await page.locator("#configure summary").click();
  const json = page.locator('#configure .code-shell[data-code-language="json"]');
  await expectDarkPlus(json);
  await json.screenshot({ path: info.outputPath("dark-plus-json.png") });
  for (const route of ["resources", "verification"]) {
    await page.goto(`/en/docs/${route}`);
    const shell = page.locator('.code-shell[data-code-language="bash"]');
    await expectDarkPlus(shell);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
});

test("editable theme CSS remains current while highlighting and copying", async ({ page, context }, info) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/en/customize");
  const controls = page.locator("#theme-settings");
  await expect(controls).toHaveAttribute("aria-busy", "false");
  const shell = page.locator('#theme-output .code-shell[data-code-language="css"]');
  for (const name of ["Sage", "Clay", "Air"]) {
    await controls.getByRole("button", { name, exact: true }).click();
    // Check the transition itself, not only the settled highlighted output.
    expect(await shell.locator("pre").count()).toBe(1);
    expect(await shell.locator("pre").textContent()).toContain(`— ${name} ·`);
    const pre = await expectDarkPlus(shell);
    const item = JSON.parse(readFileSync(new URL(`../../../registry/public/r/style-${name.toLowerCase()}.json`, import.meta.url), "utf8"));
    for (const mode of ["light", "dark"]) {
      await expect(pre).toContainText(`--primary: ${item.cssVars[mode].primary};`);
    }
    await shell.locator(".copy-button").click();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied.trimEnd()).toBe((await pre.textContent())!.trimEnd());
  }
  await shell.screenshot({ path: info.outputPath("dark-plus-theme-css.png") });
});

test("template and chart source share the code surface and heading weight", async ({ page }, info) => {
  await page.goto("/en/templates");
  await expect(page.locator(".template-card-heading h2").first()).toHaveCSS("font-weight", "700");
  await page.goto("/en/templates/link-hub");
  const usage = page.locator("#installation .code-shell[data-code-language=tsx]");
  await expectDarkPlus(usage);
  await page.locator("#installed-source summary").first().click();
  await expectDarkPlus(page.locator("#installed-source .code-shell").first());
  await page.goto("/en/charts");
  const card = page.locator(".chart-reference-card").first();
  await expect(card).not.toHaveCSS("box-shadow", "none");
  await expect(card.locator("h3")).toHaveCSS("font-weight", "700");
  await card.locator("summary").first().click();
  await expectDarkPlus(card.locator(".code-shell").first());
  await card.screenshot({ path: info.outputPath("dark-plus-chart-recipe.png") });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test("static usage code ships highlighted before client JavaScript", async ({ browser, baseURL }, info) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto("/en/components/button");
    await expectDarkPlus(page.locator(".component-installation .code-shell"));
    await expectDarkPlus(page.locator("#usage .code-shell").first());
    const shell = page.locator("#usage .code-shell").last();
    await expectDarkPlus(shell);
    await shell.screenshot({ path: info.outputPath("dark-plus-without-js.png") });
  } finally { await context.close(); }
});

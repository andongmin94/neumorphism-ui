import { expect, test } from "@playwright/test";

for (const preset of ["air", "lavender", "sage", "clay", "graphite"]) for (const mode of ["light", "dark"]) {
  test(`material specimen: ${preset} ${mode}`, async ({ page }, info) => {
    await page.goto("/");
    await page.getByLabel("Preset").selectOption(preset);
    if (mode === "dark") await page.getByRole("button", { name: "Change mode" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-material", `${preset}-${mode}`);
    await page.evaluate(() => document.fonts.ready);
    await page.mouse.move(0, 0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: info.outputPath(`material-${preset}-${mode}.png`), fullPage: true });
  });
}

for (const mode of ["light", "dark"]) {
  test(`action and input states: ${mode}`, async ({ page }, info) => {
    await page.goto("/");
    if (mode === "dark") await page.getByRole("button", { name: "Change mode" }).click();
    const primary = page.getByTestId("primary");
    const read = () => primary.evaluate(e => { const s = getComputedStyle(e); return { shadow: s.boxShadow, color: s.color, fill: s.backgroundImage, filter: s.filter, outline: s.outlineWidth, outlineStyle: s.outlineStyle, outlineColor: s.outlineColor, focusVisible: e.matches(":focus-visible") }; });
    const resting = await read();
    await primary.hover();
    const hovered = await read();
    expect(hovered.shadow).not.toBe(resting.shadow);
    expect(hovered.color).toBe(resting.color);
    expect(hovered.fill).toBe(resting.fill);
    expect(hovered.filter).toBe("none");
    await page.mouse.down();
    expect((await read()).shadow).toContain("inset");
    await page.locator("#actions").screenshot({ path: info.outputPath(`pressed-${mode}.png`) });
    await page.mouse.up();
    await page.mouse.move(0, 0);
    await primary.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    await expect(primary).toBeFocused();
    const focused = await read();
    expect(parseFloat(focused.outline)).toBeGreaterThanOrEqual(2);
    expect(focused.outlineStyle).toBe("solid");
    expect(focused.outlineColor).not.toBe("rgba(0, 0, 0, 0)");
    expect(focused.focusVisible).toBe(true);
    expect(focused.shadow).not.toBe("none");
    expect(await primary.evaluate(e => getComputedStyle(e).transitionProperty)).toBe("none");
    await page.locator("#actions").screenshot({ path: info.outputPath(`focus-${mode}.png`) });
    const input = page.getByRole("textbox", { name: "Workspace name" });
    await input.fill("");
    await page.getByRole("button", { name: "Apply workspace" }).click();
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByRole("alert")).toBeVisible();
    await input.focus();
    await expect(input).toHaveCSS("outline-style", "solid");
    expect(await input.evaluate(e => getComputedStyle(e).boxShadow)).toContain("inset");
    await page.locator("#workspace").screenshot({ path: info.outputPath(`invalid-${mode}.png`) });
    await input.fill("Recovered");
    await page.getByRole("button", { name: "Apply workspace" }).click();
    await expect(page.getByRole("status")).toHaveText("Saved locally");
  });
}

test("switch target, keyboard, form value and tabs retain native behavior", async ({ page }, info) => {
  await page.goto("/");
  const toggle = page.getByRole("switch", { name: "Notifications" });
  const box = await toggle.boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(44);
  expect(box!.width).toBeGreaterThanOrEqual(44);
  await toggle.focus();
  await page.keyboard.press("Space");
  await expect(toggle).not.toBeChecked();
  expect(await page.locator("#workspace").evaluate(e => new FormData(e as HTMLFormElement).has("notifications"))).toBe(false);
  await page.keyboard.press("Space");
  await expect(toggle).toBeChecked();
  const track = page.locator('[data-slot="switch-track"]');
  const thumb = page.locator('[data-slot="switch-thumb"]');
  const t = await track.boundingBox(); const h = await thumb.boundingBox();
  expect(h!.y - t!.y).toBeGreaterThanOrEqual(2);
  expect(t!.y + t!.height - h!.y - h!.height).toBeGreaterThanOrEqual(2);
  const profile = page.getByRole("tab", { name: "Profile", exact: true });
  await profile.focus();
  await page.keyboard.press("ArrowRight");
  // Base UI deliberately keeps disabled tabs discoverable. Focus does not select.
  const blocked = page.getByRole("tab", { name: "Access", exact: true });
  await expect(blocked).toBeFocused();
  await expect(blocked).toHaveAttribute("aria-disabled", "true");
  await expect(blocked).toHaveCSS("opacity", "0.5");
  await page.keyboard.press("Enter");
  await expect(profile).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("ArrowRight");
  const activity = page.getByRole("tab", { name: "Activity", exact: true });
  await expect(activity).toBeFocused();
  await expect(activity).toHaveAttribute("aria-selected", "false");
  await page.keyboard.press("Enter");
  await expect(activity).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("recent workspace activity");
  await page.screenshot({ path: info.outputPath("keyboard-controls.png"), fullPage: true });
});

test("mobile reflow and short-screen dialog stay reachable", async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  for (const mode of ["light", "dark"]) {
    if (mode === "dark") await page.getByRole("button", { name: "Change mode" }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: info.outputPath(`mobile-${mode}.png`), fullPage: true });
  }
  await page.setViewportSize({ width: 390, height: 400 });
  const trigger = page.getByRole("button", { name: "Open preferences" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const b = await dialog.boundingBox();
  expect(b!.y).toBeGreaterThanOrEqual(0);
  expect(b!.y + b!.height).toBeLessThanOrEqual(401);
  const close = dialog.getByRole("button", { name: "Close", exact: true });
  expect((await close.boundingBox())!.width).toBeGreaterThanOrEqual(40);
  await page.screenshot({ path: info.outputPath("dialog-mobile-top.png") });
  await dialog.getByRole("button", { name: "Done", exact: true }).scrollIntoViewIfNeeded();
  await page.screenshot({ path: info.outputPath("dialog-mobile-bottom.png") });
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

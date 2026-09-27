import { expect, test, type Locator } from "@playwright/test";
test.setTimeout(20000);
const phase = process.env.MATERIAL_PHASE ?? "after";
async function fits(locator: Locator) {
  expect(await locator.evaluate(e => e.scrollWidth - e.clientWidth)).toBeLessThanOrEqual(1);
}
async function visibleTarget(locator: Locator) {
  await expect(locator).toBeInViewport({ ratio: 1 });
  expect(await locator.evaluate(e => { const r = e.getBoundingClientRect(); const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return !!top && e.contains(top); })).toBe(true);
}
for (const mode of ["light", "dark"] as const) for (const width of [390, 1440]) {
  test.describe(`${mode} ${width}`, () => {
    test.use({ viewport: { width, height: 900 } });
    test.beforeEach(async ({ page }) => { await page.goto(`/?composition=1&mode=${mode}`); await page.evaluate(() => document.fonts.ready); await expect(page.getByRole("heading", { name: "Details that survive composition." })).toBeVisible({ timeout: 3000 }); });
    test.afterEach(async ({ page }, info) => { await page.screenshot({ path: info.outputPath(`${phase}-composition.png`), fullPage: true, animations: "disabled" }); });
    test("capture real default and open composition states", async ({ page }, info) => {
      await page.screenshot({ path: info.outputPath(`${phase}-default.png`), fullPage: true, animations: "disabled" });
      await page.getByRole("button", { name: "Open composition", exact: true }).click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await page.screenshot({ path: info.outputPath(`${phase}-dialog.png`), animations: "disabled" });
      await page.keyboard.press("Escape");
      await page.getByRole("button", { name: "Open actions", exact: true }).click();
      await expect(page.locator('[data-slot="dropdown-menu-content"]')).toBeVisible();
      await page.screenshot({ path: info.outputPath(`${phase}-menu.png`), animations: "disabled" });
      await page.getByRole("menuitem", { name: "More actions", exact: true }).focus();
      await page.keyboard.press("ArrowRight");
      await expect(page.locator('[data-slot="dropdown-menu-sub-content"]')).toBeVisible();
      await page.screenshot({ path: info.outputPath(`${phase}-submenu.png`), animations: "disabled" });
      await page.keyboard.press("Escape"); await page.keyboard.press("Escape");
    });
    test("native select sizes its own indicator and supports listbox and forced colors", async ({ page }, info) => {
      const single = page.getByLabel("Composition preset");
      expect((await single.boundingBox())!.width).toBe(160);
      await expect(single).toHaveCSS("height", "40px");
      expect(await single.evaluate(e => getComputedStyle(e).backgroundImage)).toContain("data:image/svg+xml");
      await single.selectOption("sage"); await expect(single).toHaveValue("sage");
      const list = page.getByRole("listbox", { name: "Review channels", exact: true });
      await list.selectOption(["release", "access"]); await expect(list).toHaveValues(["release", "access"]);
      expect(await list.evaluate(e => getComputedStyle(e).backgroundImage)).not.toContain("data:image/svg+xml");
      await page.screenshot({ path: info.outputPath(`${phase}-select-sizing.png`), fullPage: true, animations: "disabled" });
      await page.locator("main").evaluate(e => e.setAttribute("dir", "rtl"));
      const position = await single.evaluate(e => getComputedStyle(e).backgroundPosition.split(",")[0]);
      expect(position).toBe("12px 50%");
      await page.locator("main").evaluate(e => e.removeAttribute("dir"));
      await page.emulateMedia({ forcedColors: "active" });
      await expect(single).toHaveCSS("appearance", "auto");
      await expect(single).toHaveCSS("background-image", "none");
    });
    test("modal action wrapping preserves small, default and large button sizes", async ({ page }) => {
      for (const [size, height] of [["sm", 32], ["default", 40], ["lg", 48]] as const) {
        await page.goto(`/?composition=1&mode=${mode}&actionSize=${size}`);
        await page.getByRole("button", { name: "Open composition", exact: true }).click();
        const dialog = page.getByRole("dialog").filter({ has: page.getByRole("textbox", { name: "Dialog name", exact: true }) });
        const footer = dialog.locator('[data-slot="dialog-footer"]');
        for (const button of await footer.getByRole("button").all()) expect((await button.boundingBox())!.height).toBe(height);
        await footer.getByRole("button", { name: "Save", exact: true }).click();
        await page.getByRole("button", { name: "Confirm removal", exact: true }).click();
        const alert = page.getByRole("alertdialog");
        for (const button of await alert.locator('[data-slot="alert-dialog-footer"]').getByRole("button").all()) expect((await button.boundingBox())!.height).toBe(height);
        await alert.getByRole("button", { name: "Keep", exact: true }).click();
      }
    });
    test("input gutters and baselines agree in a real form", async ({ page }) => {
      const plain = page.getByRole("textbox", { name: "Plain field", exact: true });
      const compound = page.getByRole("textbox", { name: "Compound field", exact: true });
      const inset = async (e: Locator) => e.evaluate(el => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); const group = el.closest('[data-slot="input-group"]')?.getBoundingClientRect() ?? r; return { x: r.x + parseFloat(s.paddingLeft) + parseFloat(s.borderLeftWidth) - group.x, h: group.height, line: parseFloat(s.lineHeight), inside: r.height - parseFloat(s.paddingTop) - parseFloat(s.paddingBottom) - parseFloat(s.borderTopWidth) - parseFloat(s.borderBottomWidth) }; });
      const a = await inset(plain), b = await inset(compound);
      await expect(compound).toHaveCSS("font-weight", "400");
      await expect(compound).toHaveCSS("letter-spacing", await plain.evaluate(e => getComputedStyle(e).letterSpacing));
      for (const name of ["Plain notes", "Compound notes"]) {
        const notes = page.getByRole("textbox", { name, exact: true });
        await expect(notes).toHaveCSS("font-weight", "400");
        await expect(notes).toHaveCSS("line-height", "24px");
      }
      expect(b.h).toBe(a.h); expect(Math.abs(a.x - b.x)).toBeLessThanOrEqual(1); expect(b.inside).toBeGreaterThanOrEqual(b.line);
      const group = page.locator('[data-slot="number-field-group"]');
      const input = page.getByRole("textbox", { name: "Workspace seats" });
      expect((await input.boundingBox())!.width).toBeGreaterThan((await group.boundingBox())!.width / 2);
    });
    test("validation and read-only state do not lose their visual meaning", async ({ page }) => {
      const field = page.getByRole("textbox", { name: "Workspace name", exact: true });
      const plan = page.getByLabel("Workspace plan");
      const before = (await plan.boundingBox())!; const originalScroll = await page.evaluate(() => scrollY);
      await page.getByRole("button", { name: "Save workspace", exact: true }).click();
      await expect(page.locator('[data-slot="field-error"]')).toBeVisible();
      expect(Math.abs((await plan.boundingBox())!.y + await page.evaluate(() => scrollY) - before.y - originalScroll)).toBeLessThanOrEqual(width < 640 ? 100 : 1);
      await field.fill("Team workspace"); await page.getByRole("button", { name: "Save workspace", exact: true }).click();
      await expect(page.getByText("Workspace saved", { exact: true })).toBeVisible();
      await expect(page.getByRole("textbox", { name: "Read-only identifier" })).toHaveCSS("box-shadow", "none");
      const invalid = page.getByRole("combobox", { name: "Invalid region", exact: true });
      expect(await invalid.evaluate(e => getComputedStyle(e).borderTopColor)).toBe(await page.evaluate(() => { const e = document.createElement('span'); e.style.color = 'var(--destructive)'; document.body.append(e); const c = getComputedStyle(e).color; e.remove(); return c; }));
      await fits(page.getByTestId("form-card"));
    });
    test("six OTP cells fit inside a narrow card and preserve value entry", async ({ page }) => {
      await fits(page.getByTestId("narrow-card").locator('[data-slot="card-content"]'));
      const otp = page.getByRole("textbox", { name: "Verification code" });
      await otp.fill("123456"); await expect(otp).toHaveValue("123456");
      const slots = page.locator('[data-slot="input-otp-slot"]');
      expect(await slots.allTextContents()).toEqual(["1", "2", "3", "4", "5", "6"]);
      for (const cell of await slots.all()) expect((await cell.boundingBox())!.width).toBeGreaterThanOrEqual(30);
      const picker = page.locator('[data-slot="date-picker"]');
      const button = picker.getByRole("button").first();
      expect((await button.boundingBox())!.height).toBe(40);
      const text = button.locator('span').first();
      expect((await text.boundingBox())!.height).toBeLessThanOrEqual(24);
    });
    test("vertical tabs keep full-height targets and leave room for panel content", async ({ page }) => {
      const card = page.getByTestId("vertical-card"); await fits(card.locator('[data-slot="card-content"]'));
      const tabs = card.getByRole("tab");
      for (const tab of await tabs.all()) expect((await tab.boundingBox())!.height).toBeGreaterThanOrEqual(32);
      const input = page.getByRole("textbox", { name: "Nested tab field" });
      const panel = card.getByRole("tabpanel"); const i = (await input.boundingBox())!, p = (await panel.boundingBox())!;
      expect(i.x + i.width).toBeLessThanOrEqual(p.x + p.width + 1);
      await tabs.first().focus();
      await page.keyboard.press("ArrowDown");
      await expect(tabs.nth(1)).toBeFocused();
      await expect(tabs.nth(1)).toHaveAttribute("aria-disabled", "true");
      await page.keyboard.press("Enter");
      await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
      await page.keyboard.press("ArrowDown"); await expect(tabs.last()).toBeFocused();
      await page.keyboard.press("Enter"); await expect(page.getByText("Latest workspace activity.", { exact: true })).toBeVisible();
    });
    test("long dialog text and action labels remain inside their surfaces", async ({ page }) => {
      await page.getByRole("button", { name: "Open composition", exact: true }).click();
      const dialog = page.getByRole("dialog", { name: "WorkspaceDeploymentIdentifierWithoutAnyWordBreaks0123456789", exact: true });
      await fits(dialog); await fits(dialog.locator('[data-slot="dialog-footer"]'));
      const save = dialog.getByRole("button", { name: "Save and return to workspace overview", exact: true });
      await save.scrollIntoViewIfNeeded(); await visibleTarget(save); await save.click();
      await expect(dialog).toBeHidden();
      await page.getByRole("button", { name: "Confirm removal", exact: true }).click();
      const alert = page.getByRole("alertdialog"); await fits(alert); await fits(alert.locator('[data-slot="alert-dialog-footer"]'));
      await alert.getByRole("button", { name: "Keep this workspace and continue editing", exact: true }).click();
    });
    test("nested combobox and child dialog preserve parent focus and edits", async ({ page }) => {
      const trigger = page.getByRole("button", { name: "Open composition", exact: true }); await trigger.click();
      const dialog = page.getByRole("dialog", { name: "WorkspaceDeploymentIdentifierWithoutAnyWordBreaks0123456789", exact: true });
      await dialog.getByRole("textbox", { name: "Dialog name" }).fill("Unsaved local work");
      const schedule = dialog.getByRole("button", { name: "Schedule options", exact: true }); await schedule.click();
      const region = page.getByRole("combobox", { name: "Deployment region", exact: true }); await region.fill("Tokyo");
      const option = page.getByRole("option", { name: "Tokyo", exact: true });
      await expect(option).toBeVisible();
      await page.keyboard.press("ArrowDown");
      await expect(option).toHaveAttribute("data-highlighted", "");
      await page.keyboard.press("Enter");
      await expect(page.locator('input[name="deploymentRegion"]')).toHaveValue("Tokyo");
      await expect(page.locator('[data-slot="combobox-content"]')).toBeHidden();
      await expect(region).toHaveValue("Tokyo");
      // Base UI owns clearing a selected value on Escape before the parent dismisses.
      await page.keyboard.press("Escape");
      await expect(region).toHaveValue("");
      await expect(page.locator('input[name="deploymentRegion"]')).toHaveValue("");
      await expect(region).toBeFocused();
      await expect(schedule).toHaveAttribute("aria-expanded", "true");
      await page.keyboard.press("Escape"); await expect(schedule).toBeFocused();
      const advanced = dialog.getByRole("button", { name: "Advanced preferences", exact: true }); await advanced.click();
      const child = page.getByRole("dialog", { name: "Advanced preferences", exact: true });
      const close = child.getByRole("button", { name: "Back to preferences", exact: true }); await visibleTarget(close); await close.click();
      await expect(advanced).toBeFocused(); await expect(dialog.getByRole("textbox", { name: "Dialog name" })).toHaveValue("Unsaved local work");
      await page.keyboard.press("Escape"); await expect(trigger).toBeFocused();
    });
    test("long menu items and submenu ends remain reachable on short screens", async ({ page }) => {
      await page.setViewportSize({ width, height: 450 });
      const trigger = page.getByRole("button", { name: "Open actions", exact: true }); await trigger.click();
      const root = page.locator('[data-slot="dropdown-menu-content"]'); await fits(root);
      expect((await root.boundingBox())!.width).toBeLessThanOrEqual(width - 16);
      const sub = page.getByRole("menuitem", { name: "More actions", exact: true });
      await sub.focus(); await page.keyboard.press("ArrowRight");
      const menu = page.locator('[data-slot="dropdown-menu-sub-content"]'); await expect(menu).toBeVisible();
      expect((await menu.boundingBox())!.height).toBeLessThanOrEqual(434);
      await page.keyboard.press("End"); const last = page.getByRole("menuitem", { name: "Action 24", exact: true });
      await expect(last).toBeFocused(); await visibleTarget(last); await page.keyboard.press("Enter");
      await expect(page.getByText("Action 24", { exact: true })).toBeVisible(); await expect(trigger).toBeFocused();
    });
    test("context menu scrolls its long action list without moving the page", async ({ page }) => {
      await page.setViewportSize({ width, height: 450 });
      await page.getByText("Context actions", { exact: true }).click({ button: "right" });
      const menu = page.locator('[data-slot="context-menu-content"]'); await expect(menu).toBeVisible(); await fits(menu);
      expect((await menu.boundingBox())!.height).toBeLessThanOrEqual(450);
      await page.keyboard.press("End"); const last = page.getByRole("menuitem", { name: "Context 24", exact: true });
      await expect(last).toBeFocused(); await visibleTarget(last); await page.keyboard.press("Enter");
      await expect(page.getByText("Context 24", { exact: true })).toBeVisible();
    });
  });
}
test("all presets retain composition geometry at a 320px reflow width", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 500 });
  for (const mode of ["light", "dark"]) {
    await page.goto(`/?composition=1&mode=${mode}`);
    for (const preset of ["air", "lavender", "sage", "clay", "graphite"]) {
      await page.getByLabel("Composition preset").selectOption(preset);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
      await fits(page.getByTestId("narrow-card")); await fits(page.getByTestId("vertical-card"));
    }
  }
});

import { expect, test } from "@playwright/test";
const phase = process.env.REFINEMENT_PHASE ?? "after";
for (const mode of ["light", "dark"]) for (const width of [390, 1440]) {
  test.describe(`${mode} ${width}`, () => {
    test.use({ viewport: { width, height: 1000 } });
    test.beforeEach(async ({ page }) => {
      await page.goto(`/refinement.html?mode=${mode}`);
      await expect(page.getByRole("heading", { name: "Calendar and menu anatomy", exact: true })).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
    });
    test("specimen capture", async ({ page }, info) => {
      await page.screenshot({ path: info.outputPath(`${phase}-calendar.png`), fullPage: true, animations: "disabled" });
      await page.getByRole("button", { name: "Display options", exact: true }).click();
      await expect(page.locator('[data-slot="dropdown-menu-content"]')).toBeVisible();
      await page.screenshot({ path: info.outputPath(`${phase}-menu.png`), animations: "disabled" });
      await info.attach("calendar bounds", { body: JSON.stringify(await page.getByTestId("narrow-calendar").evaluate(e => ({ width: e.clientWidth, content: e.scrollWidth }))), contentType: "application/json" });
    });
    test("calendar cells follow the containing plate rather than viewport width", async ({ page }, info) => {
      for (const id of ["narrow-calendar", "range-calendar"]) {
        const fixture = page.getByTestId(id);
        const parent = (await fixture.locator('..').boundingBox())!, outer = (await fixture.boundingBox())!;
        expect(outer.width).toBeLessThanOrEqual(parent.width + 1);
        if (id === 'range-calendar' && outer.width < 640) {
          const plate = (await fixture.locator('[data-slot="calendar"] > div').boundingBox())!;
          const grid = (await fixture.locator('table').first().boundingBox())!;
          expect(plate.width - grid.width).toBeLessThanOrEqual(34);
        }
        expect(await fixture.evaluate(e => e.scrollWidth - e.clientWidth)).toBeLessThanOrEqual(1);
        for (const grid of await fixture.locator('table').all()) {
          const bounds = (await fixture.boundingBox())!;
          const r = (await grid.boundingBox())!;
          expect(r.x).toBeGreaterThanOrEqual(bounds.x - 1);
          expect(r.x + r.width).toBeLessThanOrEqual(bounds.x + bounds.width + 1);
          const cells = grid.locator('tbody tr').first().locator('td');
          const widths = await cells.evaluateAll(es => es.map(e => e.getBoundingClientRect().width));
          expect(Math.max(...widths) - Math.min(...widths)).toBeLessThanOrEqual(1);
          for (const button of await grid.getByRole('button').all()) expect((await button.boundingBox())!.height).toBeGreaterThanOrEqual(28);
        }
      }
      const intrinsic = page.getByTestId('intrinsic-calendar');
      expect((await intrinsic.locator('table').boundingBox())!.width).toBeGreaterThanOrEqual(190);
      if (width === 1440) {
        const range = page.getByTestId('range-calendar');
        await range.locator('..').evaluate(e => { (e as HTMLElement).style.gridColumn = '1 / -1'; });
        const grids = await range.locator('table').evaluateAll(es => es.map(e => e.getBoundingClientRect().y));
        expect(Math.abs(grids[0] - grids[1])).toBeLessThanOrEqual(1);
        await range.locator('..').evaluate(e => { (e as HTMLElement).style.removeProperty('grid-column'); });
      }
      const calendar = page.getByTestId("narrow-calendar");
      const grid = calendar.getByRole('grid');
      const day = grid.getByRole('button', { name: /September 16/ });
      await day.click(); await expect(page.getByTestId('date-value')).toHaveText('16');
      await page.keyboard.press('ArrowRight'); await page.keyboard.press('Enter');
      await expect(page.getByTestId('date-value')).toHaveText('17');
      const caption = calendar.getByRole('status');
      const navButton = calendar.getByRole('button', { name: /previous month/i });
      const a = (await caption.boundingBox())!, b = (await navButton.boundingBox())!;
      expect(Math.abs(a.y + a.height / 2 - b.y - b.height / 2)).toBeLessThanOrEqual(1);
      const c = (await calendar.boundingBox())!;
      expect(Math.abs(a.x + a.width / 2 - c.x - c.width / 2)).toBeLessThanOrEqual(1);
      await calendar.screenshot({ path: info.outputPath('calendar-selected.png') });
    });
    test("menu marks have fixed geometry and selection survives keyboard use", async ({ page }, info) => {
      await page.getByRole('button', { name: 'Display options', exact: true }).click();
      const popup = page.locator('[data-slot="dropdown-menu-content"]');
      const selected = popup.getByRole('menuitemradio', { name: 'Comfortable', exact: true });
      await expect(selected.locator('svg')).toHaveCount(1);
      await expect(selected.locator('svg')).toHaveCSS('width', '16px');
      const arrow = popup.getByRole('menuitem', { name: 'More options', exact: true }).locator('svg');
      await expect(arrow).toHaveCSS('width', '16px');
      const row = (await selected.boundingBox())!, dot = (await selected.locator('svg').boundingBox())!;
      expect(Math.abs(row.y + row.height / 2 - dot.y - dot.height / 2)).toBeLessThanOrEqual(1);
      await popup.getByRole('menuitemradio', { name: 'Compact', exact: true }).click();
      await expect(page.getByTestId('menu-value')).toContainText('compact');
      // Base UI RadioItem keeps the menu open by default.
      await expect(popup).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(popup).not.toBeVisible();
      const trigger = page.getByRole('button', { name: 'Display options', exact: true });
      await expect(trigger).toBeFocused();
      await trigger.press('ArrowDown');
      await expect(popup).toBeVisible();
      await page.keyboard.press('End');
      const sub = page.getByRole('menuitem', { name: 'More options', exact: true });
      await expect(sub).toBeFocused();
      await page.keyboard.press('ArrowRight');
      await expect(page.locator('[data-slot="dropdown-menu-sub-content"]')).toBeVisible();
      await page.getByRole('menuitem', { name: 'Copy link', exact: true }).click();
      await expect(page.getByTestId('menu-value')).toContainText('Copied');
      await expect(page.getByRole('button', { name: 'Display options', exact: true })).toBeFocused();
      await page.getByText('Context options', { exact: true }).click({ button: 'right' });
      const context = page.locator('[data-slot="context-menu-content"]');
      await expect(context.getByRole('menuitemradio', { name: 'Compact', exact: true }).locator('svg')).toHaveCSS('width', '16px');
      await context.screenshot({ path: info.outputPath('context-menu.png') });
    });
    test("combobox and directional marks remain aligned in RTL", async ({ page }, info) => {
      await page.goto(`/refinement.html?mode=${mode}&dir=rtl`);
      await page.getByRole('combobox', { name: 'Choose city', exact: true }).click();
      const option = page.getByRole('option', { name: 'Seoul', exact: true });
      await expect(option).toBeVisible();
      await expect(option.locator('svg')).toHaveCSS('width', '16px');
      const r = (await option.boundingBox())!, mark = (await option.locator('svg').boundingBox())!;
      expect(r.x + r.width - mark.x - mark.width).toBeLessThanOrEqual(12);
      await page.getByRole('option', { name: 'Tokyo', exact: true }).click();
      await expect(page.getByTestId('city-value')).toHaveText('Tokyo');
      await page.getByRole('button', { name: 'Display options', exact: true }).click();
      const popup = page.locator('[data-slot="dropdown-menu-content"]');
      await expect(popup.getByRole('menuitem', { name: 'More options', exact: true }).locator('svg')).toHaveCSS('rotate', '180deg');
      await popup.screenshot({ path: info.outputPath('menu-rtl.png') });
    });
  });
}

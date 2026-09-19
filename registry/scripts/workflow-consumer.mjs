import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const { expect } = createRequire(path.join(root, "../docs/package.json"))("@playwright/test");
export const workflowItems = ["calendar", "date-picker", "data-table", "toast"];

export function decorateWorkflowFixture(directory) {
  const demoRoot = path.join(directory, "src/workflow-examples");
  fs.mkdirSync(demoRoot, { recursive: true });
  for (const slug of workflowItems) {
    const source = fs.readFileSync(path.join(root, `../docs/components/examples/${slug}.tsx`), "utf8");
    fs.writeFileSync(path.join(demoRoot, `${slug}.tsx`), source.replaceAll("@neumorphism-ui/registry/ui/", "@/design-system/ui/"));
  }
  // Follow the documented one-time application entry import, not a fixture-only CSS patch.
  const entry = fs.existsSync(path.join(directory, "src/app/layout.tsx")) ? "src/app/layout.tsx" : "src/main.tsx";
  const entryPath = path.join(directory, entry);
  fs.writeFileSync(entryPath, 'import "pretendard/dist/web/variable/pretendardvariable.css";\n' + fs.readFileSync(entryPath, "utf8"));
  const file = path.join(directory, "src/consumer.tsx");
  let source = fs.readFileSync(file, "utf8");
  source = source.replace("export default function Consumer()", 'import CalendarExample from "./workflow-examples/calendar";\nimport DatePickerExample from "./workflow-examples/date-picker";\nimport DataTableExample from "./workflow-examples/data-table";\nimport ToastExample from "./workflow-examples/toast";\nexport default function Consumer()');
  source = source.replace("  </main>;", `
    <section aria-label="Workflow collection" className="mt-12 grid gap-6">
      <header><h2 className="text-3xl font-semibold tracking-tight">Dates, data and feedback.</h2><p className="mt-2 text-sm text-[var(--muted-foreground)]">Independent installation · Pretendard UI / <code data-testid="code-font">Consolas code</code></p></header>
      <section data-example="calendar" className="min-w-0 rounded-[var(--neu-radius-surface)] border border-[var(--border)] bg-[var(--neu-surface)] p-4"><CalendarExample /></section>
      <div className="grid min-w-0 gap-6 md:grid-cols-2"><section data-example="date-picker" className="min-w-0 rounded-[var(--neu-radius-surface)] border border-[var(--border)] bg-[var(--neu-surface)] p-4"><DatePickerExample /></section><section data-example="toast" className="min-w-0 rounded-[var(--neu-radius-surface)] border border-[var(--border)] bg-[var(--neu-surface)] p-4"><ToastExample /></section></div>
      <section data-example="data-table" className="min-w-0 rounded-[var(--neu-radius-surface)] border border-[var(--border)] bg-[var(--neu-surface)] p-4"><DataTableExample /></section>
    </section>
  </main>;`);
  fs.writeFileSync(file, source);
}

export async function exerciseWorkflow(page, { target, scenario, engineName, mode, evidenceRoot }) {
  const card = slug => page.locator(`[data-example="${slug}"]`);
  const screenshot = async name => { fs.mkdirSync(evidenceRoot, { recursive: true }); await page.screenshot({ path: path.join(evidenceRoot, `${target}-${scenario}-${engineName}-${mode}-${name}.png`) }); };
  const fonts = await page.evaluate(async () => {
    const loaded = await document.fonts.load('16px "Pretendard Variable"');
    return { faces: loaded.length, loaded: loaded.every(font => font.status === "loaded"), body: getComputedStyle(document.body).fontFamily, code: getComputedStyle(document.querySelector('[data-testid="code-font"]')).fontFamily };
  });
  assert.ok(fonts.faces > 0 && fonts.loaded, "Pretendard must actually load, not just appear in a font stack");
  assert.match(fonts.body, /^"?Pretendard/);
  assert.match(fonts.code, /^Consolas/);

  const calendar = card("calendar");
  const single = calendar.locator('[data-calendar="single"]');
  await single.locator('[data-day="2026-09-16"] button').click();
  await expect(single.getByTestId("calendar-value")).toHaveText("2026-09-16");
  await single.locator('[data-day="2026-09-16"] button').focus();
  await page.keyboard.press("ArrowRight"); await page.keyboard.press("Enter");
  await expect(single.getByTestId("calendar-value")).toHaveText("2026-09-17");
  await expect(single.locator('[data-day="2026-09-20"] button')).toBeDisabled();
  const range = calendar.locator('[data-calendar="range"]');
  await range.getByRole("button", { name: "Clear range" }).click();
  await range.locator('[data-day="2026-09-21"] button').click();
  await range.locator('[data-day="2026-09-24"] button').click();
  await expect(range.getByTestId("calendar-range")).toHaveText("2026-09-21 / 2026-09-24");
  await calendar.scrollIntoViewIfNeeded(); await screenshot("calendar-range");
  await single.getByRole("button", { name: /next month/i }).click();
  await expect(single.locator('[data-day="2026-10-15"] button')).toBeVisible();

  const picker = card("date-picker");
  const trigger = picker.getByRole("button", { name: /^Due date:/ });
  await trigger.click();
  const popup = page.locator('[data-slot="popover-content"]');
  await expect(popup.locator('[data-day="2026-09-09"] button')).toBeDisabled();
  await screenshot("date-picker-open");
  await popup.locator('[data-day="2026-09-17"] button').click();
  await expect(picker.locator('input[name="dueDate"]')).toHaveValue("2026-09-17");
  await expect(trigger).toBeFocused();
  await trigger.click(); await page.keyboard.press("Escape"); await expect(trigger).toBeFocused();
  await picker.getByRole("button", { name: "Clear date", exact: true }).first().click();
  await expect(picker.locator('input[name="dueDate"]')).toHaveValue("");
  await picker.getByRole("button", { name: "Reset date" }).click();
  await expect(picker.locator('input[name="dueDate"]')).toHaveValue("2026-09-15");
  await expect(picker.getByRole("button", { name: /^Locked date:/ })).toBeDisabled();

  const table = card("data-table");
  await table.getByRole("checkbox", { name: "Select Atlas", exact: true }).check();
  await table.getByRole("button", { name: "Next", exact: true }).click();
  await expect(table.getByText("Foxtrot", { exact: true })).toBeVisible();
  await expect(table.getByTestId("selected-rows")).toContainText(": 1");
  await table.getByRole("button", { name: "Seats", exact: true }).click();
  await expect(table.locator('th[aria-sort="descending"]')).toContainText("Seats");
  await expect(table.locator("tbody tr").first()).toContainText("Delta");
  await table.getByRole("combobox", { name: "Status", exact: true }).selectOption("active");
  await expect(table.locator("tbody tr")).toHaveCount(5);
  await table.getByRole("textbox", { name: "Search projects" }).fill("Atlas");
  await expect(table.locator("tbody tr")).toHaveCount(1);
  await expect(table.getByRole("checkbox", { name: "Select Atlas", exact: true })).toBeChecked();
  await screenshot("table-filtered");
  await table.getByRole("textbox", { name: "Search projects" }).fill("no-matching-project");
  await expect(table.getByText("No matching projects.", { exact: true })).toBeVisible();
  await expect(table.getByText("Page 0 / 0", { exact: true })).toBeVisible();
  await expect(table.getByRole("button", { name: "Next", exact: true })).toBeDisabled();
  await table.getByRole("textbox", { name: "Search projects" }).fill("");
  await table.getByRole("combobox", { name: "Status", exact: true }).selectOption("");
  await table.getByRole("combobox", { name: "Rows per page", exact: true }).selectOption("10");
  await expect(table.locator("tbody tr")).toHaveCount(8);
  await table.getByRole("button", { name: "Clear selection", exact: true }).click();
  await expect(table.getByTestId("selected-rows")).toContainText(": 0");

  const toastCard = card("toast");
  await toastCard.getByRole("button", { name: "Show success", exact: true }).click();
  await expect(page.locator('[data-slot="toast"]')).toContainText("Changes saved");
  await screenshot("toast-success");
  await page.keyboard.press("F6");
  await page.getByRole("button", { name: "Dismiss notification", exact: true }).click();
  await expect(page.locator('[data-slot="toast"]')).toHaveCount(0);
  await toastCard.getByRole("button", { name: "Show error", exact: true }).click();
  await expect(page.locator('[data-slot="toast"]')).toContainText("Could not save");
  await page.locator('[data-slot="toast"]').hover();
  await page.getByRole("button", { name: "Dismiss notification", exact: true }).click();
  await toastCard.getByRole("button", { name: "Archive draft", exact: true }).click();
  await page.locator('[data-slot="toast"]').hover();
  await page.locator('[data-slot="toast"]').getByRole("button", { name: "Undo", exact: true }).click();
  await expect(toastCard.getByRole("status")).toHaveText("Archive undone");
  await expect(page.locator('[data-slot="toast"]')).toHaveCount(0);
  await toastCard.getByRole("button", { name: "Show timed toast", exact: true }).click();
  await expect(page.locator('[data-slot="toast"]')).toContainText("Quick update");
  await page.mouse.move(0, 0);
  await expect(page.locator('[data-slot="toast"]')).toHaveCount(0, { timeout: 8000 });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "workflow components overflow the viewport");
  await table.scrollIntoViewIfNeeded(); await screenshot("table-complete");
  fs.writeFileSync(path.join(evidenceRoot, `${target}-${scenario}-${engineName}-${mode}-fonts.json`), JSON.stringify(fonts, null, 2));
}

import { test, expect } from "@playwright/test";

test("compiled documentation updates the caller-owned table across combined operations", async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/components/data-table");
  const table = page.locator("#preview");
  await table.getByRole("checkbox", { name: "Select Atlas", exact: true }).check();
  await expect(table.getByTestId("selected-rows")).toContainText(": 1");
  const selectedRow = table.locator('tbody tr[data-state="selected"]');
  const otherRow = table.locator('tbody tr:not([data-state="selected"])').first();
  await expect(selectedRow).toHaveCount(1);
  await otherRow.hover();
  const selectedColor = await selectedRow.evaluate(element => getComputedStyle(element).backgroundColor);
  const hoverColor = await otherRow.evaluate(element => getComputedStyle(element).backgroundColor);
  expect(selectedColor).not.toBe(hoverColor);
  await selectedRow.hover();
  await expect(selectedRow).toHaveCSS("background-color", selectedColor);
  await table.getByRole("button", { name: "Next", exact: true }).click();
  await expect(table.getByText("Foxtrot", { exact: true })).toBeVisible();
  await table.getByRole("button", { name: "Seats", exact: true }).click();
  await expect(table.locator("tbody tr").first()).toContainText("Delta");
  await expect(table.locator('th[aria-sort="descending"]')).toContainText("Seats");
  await table.getByRole("combobox", { name: "Status", exact: true }).selectOption("active");
  await table.getByRole("textbox", { name: "Search projects", exact: true }).fill("Atlas");
  await expect(table.locator("tbody tr")).toHaveCount(1);
  await expect(table.getByRole("checkbox", { name: "Select Atlas", exact: true })).toBeChecked();
  await table.getByRole("textbox", { name: "Search projects", exact: true }).fill("nothing-matches");
  await expect(table.getByText("No matching projects.", { exact: true })).toBeVisible();
  await expect(table.getByText("Page 0 / 0", { exact: true })).toBeVisible();
  await expect(table.getByRole("button", { name: "Next", exact: true })).toBeDisabled();
  await table.getByRole("textbox", { name: "Search projects", exact: true }).fill("");
  await table.getByRole("combobox", { name: "Status", exact: true }).selectOption("");
  await table.getByRole("combobox", { name: "Rows per page", exact: true }).selectOption("10");
  await expect(table.locator("tbody tr")).toHaveCount(8);
  await table.getByRole("button", { name: "Clear selection", exact: true }).click();
  await expect(table.getByTestId("selected-rows")).toContainText(": 0");
  await table.scrollIntoViewIfNeeded();
  await page.screenshot({ path: info.outputPath("table-recovered.png") });
});


test("table checkbox spacing follows reading direction and the scroll region shows focus", async ({ page }) => {
  await page.goto("/en/components/data-table");
  const preview = page.locator("#preview");
  const region = preview.getByRole("region", { name: "Workspace projects — illustrative data", exact: true });
  const selectionHead = region.locator("thead th").first();
  const selectionCell = region.locator("tbody td").first();
  const statusHead = region.getByRole("columnheader", { name: "Status", exact: true });
  await expect(selectionHead.locator('input[type="checkbox"]')).toBeVisible();
  await expect(selectionCell.locator('input[type="checkbox"]')).toBeVisible();
  for (const direction of ["ltr", "rtl"] as const) {
    await region.evaluate((element, dir) => element.setAttribute("dir", dir), direction);
    await expect(statusHead).toHaveCSS("text-align", "start");
    await expect(region.locator("caption")).toHaveCSS("text-align", "start");
    for (const cell of [selectionHead, selectionCell]) {
      await expect(cell).toHaveCSS("padding-inline-start", "16px");
      await expect(cell).toHaveCSS("padding-inline-end", "0px");
      await expect(cell).toHaveCSS(direction === "rtl" ? "padding-left" : "padding-right", "0px");
    }
  }
  await region.focus();
  await expect(region).toBeFocused();
  await expect(region).toHaveCSS("outline-width", "2px");
  await expect(region).toHaveCSS("outline-style", "solid");
});

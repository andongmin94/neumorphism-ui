import { test, expect } from "@playwright/test";

test("compiled documentation updates the caller-owned table across combined operations", async ({ page }, info) => {
  await page.goto("/en/components/data-table");
  const table = page.locator("#preview");
  await table.getByRole("checkbox", { name: "Select Atlas", exact: true }).check();
  await expect(table.getByTestId("selected-rows")).toContainText(": 1");
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

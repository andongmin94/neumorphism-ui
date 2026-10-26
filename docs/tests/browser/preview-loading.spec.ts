import { expect, test } from "@playwright/test";

test("a basic component does not download unrelated preview groups", async ({ page }) => {
  const groups: string[] = [];
  page.on("request", request => {
    const pathname = new URL(request.url()).pathname;
    if (/\/(?:chart-preview|workflow-component-preview|expanded-component-preview|navigation-preview)-[^/]+\.js$/.test(pathname)) groups.push(pathname);
  });
  await page.goto("/en/components/button");
  const preview = page.locator("#preview");
  await expect(preview.locator(".component-example")).toHaveAttribute("aria-busy", "false");
  await expect(preview.locator('[data-slot="button"]').first()).toBeVisible();
  await preview.getByRole("tab", { name: "Code", exact: true }).click();
  await expect(preview.locator("pre")).toBeVisible();
  await preview.getByRole("tab", { name: "Preview", exact: true }).click();
  await expect(preview.locator('[data-slot="button"]').first()).toBeVisible();
  expect(groups).toEqual([]);
});

test("a deferred preview offers a working page reload after a chunk failure", async ({ page }) => {
  let blockedRequests = 0;
  await page.route("**/assets/chart-preview-*.js", route => {
    blockedRequests++;
    return route.abort();
  });
  await page.goto("/en/components/chart");
  const preview = page.locator("#preview");
  await expect(preview.getByRole("alert")).toContainText("Preview could not be loaded.");
  expect(blockedRequests).toBeGreaterThan(0);
  await page.unroute("**/assets/chart-preview-*.js");
  await preview.getByRole("button", { name: "Reload page", exact: true }).click();
  await expect(preview.locator('[data-slot="chart-plot"]')).toBeVisible();
  await expect(preview.getByRole("alert")).toHaveCount(0);
});

import { test, expect } from "@playwright/test";

test("a source failure does not leak into the next component page", async ({ page }) => {
  await page.route("**/r/field.json", route => route.fulfill({ status: 503, body: "Unavailable" }));
  await page.goto("/en/components/field");
  let installation = page.locator("#installation");
  await installation.getByRole("tab").nth(1).click();
  await expect(installation.getByRole("alert")).toBeVisible();
  await page.unroute("**/r/field.json");
  const next = page.locator('.component-doc-pagination a[href="/en/components/fieldset"]');
  await next.click();
  await expect(page).toHaveURL(/\/en\/components\/fieldset$/);
  installation = page.locator("#installation");
  await installation.getByRole("tab").nth(1).click();
  await expect(installation.locator(".component-manual-meta code").first()).toHaveText("components/ui/fieldset.tsx");
  await expect(installation.getByRole("alert")).toHaveCount(0);
  await expect(installation.locator("pre").last()).toContainText("Fieldset");
});

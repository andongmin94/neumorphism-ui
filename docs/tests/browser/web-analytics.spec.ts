import { expect, test, type APIRequestContext, type Page } from "@playwright/test";

const productionOrigin = "https://neumorphism-ui.andongmin.com";
const beaconSource = "https://static.cloudflareinsights.com/beacon.min.js";

async function serveLocalBuildAsProduction(page: Page, request: APIRequestContext, baseURL: string) {
  // Never contact the deployed site or telemetry service during these tests.
  await page.route(beaconSource, route => route.fulfill({
    contentType: "application/javascript",
    headers: { "access-control-allow-origin": "*" },
    body: "window.__cloudflareBeaconLoads = (window.__cloudflareBeaconLoads || 0) + 1;",
  }));
  await page.route(`${productionOrigin}/**`, async route => {
    const url = new URL(route.request().url());
    const response = await request.get(new URL(url.pathname + url.search, baseURL).href);
    await route.fulfill({ response });
  });
}

test("local documentation does not load analytics", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("button", { name: /Search documentation/i }).click();
  await expect(page.getByRole("dialog", { name: /Search documentation/i })).toBeVisible();
  await expect(page.locator('script[data-cf-beacon]')).toHaveCount(0);
});

test("automated production smoke does not load analytics", async ({ page, request, baseURL }) => {
  await serveLocalBuildAsProduction(page, request, baseURL!);
  await page.goto(`${productionOrigin}/en`);
  await page.getByRole("button", { name: /Search documentation/i }).click();
  await expect(page.getByRole("dialog", { name: /Search documentation/i })).toBeVisible();
  await expect(page.locator('script[data-cf-beacon]')).toHaveCount(0);
});

test("production loads the official Cloudflare beacon once across client navigation", async ({ page, request, baseURL }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, "webdriver", { get: () => false }));
  await serveLocalBuildAsProduction(page, request, baseURL!);
  await page.goto(`${productionOrigin}/en`);
  const beacon = page.locator('script[data-cf-beacon]');
  await expect(beacon).toHaveCount(1);
  await expect(beacon).toHaveAttribute("src", beaconSource);
  await expect(beacon).toHaveAttribute("type", "module");
  await expect(beacon).toHaveAttribute("data-cf-beacon", JSON.stringify({ token: "70770d2bd86349b3bbc52fcbb8c9a9ca" }));
  await expect.poll(() => page.evaluate(() => (window as Window & { __cloudflareBeaconLoads?: number }).__cloudflareBeaconLoads)).toBe(1);
  await page.getByRole("button", { name: /Search documentation/i }).click();
  const search = page.getByRole("dialog", { name: /Search documentation/i });
  await search.getByRole("combobox").fill("cms");
  await search.locator('[data-href="/en/templates/cms"]').click();
  await expect(page).toHaveURL(`${productionOrigin}/en/templates/cms`);
  await expect(beacon).toHaveCount(1);
  expect(await page.evaluate(() => (window as Window & { __cloudflareBeaconLoads?: number }).__cloudflareBeaconLoads)).toBe(1);
});

import { expect, test, type APIRequestContext, type Page } from "@playwright/test";
import type { BeforeSend } from "@vercel/analytics";

const productionOrigin = "https://neumorphism-ui.andongmin.com";

async function serveLocalBuildAsProduction(page: Page, request: APIRequestContext, baseURL: string) {
  // Never contact the deployed site or telemetry service during these tests.
  await page.route(`${productionOrigin}/**`, async route => {
    const url = new URL(route.request().url());
    if (url.pathname.startsWith("/_vercel/insights/")) {
      await route.fulfill({ contentType: "application/javascript", body: "/* Analytics transport is stubbed in tests. */" });
      return;
    }
    const response = await request.get(new URL(url.pathname + url.search, baseURL).href);
    await route.fulfill({ response });
  });
}

test("local documentation does not load analytics", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("button", { name: /Search documentation/i }).click();
  await expect(page.getByRole("dialog", { name: /Search documentation/i })).toBeVisible();
  await expect(page.locator('script[src*="/_vercel/insights/"]')).toHaveCount(0);
});

test("automated production smoke does not load analytics", async ({ page, request, baseURL }) => {
  await serveLocalBuildAsProduction(page, request, baseURL!);
  await page.goto(`${productionOrigin}/en`);
  await page.getByRole("button", { name: /Search documentation/i }).click();
  await expect(page.getByRole("dialog", { name: /Search documentation/i })).toBeVisible();
  await expect(page.locator('script[src*="/_vercel/insights/"]')).toHaveCount(0);
});

test("production analytics accepts only pageviews and removes query strings and fragments", async ({ page, request, baseURL }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, "webdriver", { get: () => false }));
  await serveLocalBuildAsProduction(page, request, baseURL!);
  await page.goto(`${productionOrigin}/en?email=private@example.com#private`);
  await expect(page.locator('script[src*="/_vercel/insights/"]')).toHaveCount(1);
  const events = await page.evaluate(origin => {
    const beforeSend = window.vaq?.find(([name]) => name === "beforeSend")?.[1] as BeforeSend;
    return {
      pageview: beforeSend({ type: "pageview", url: `${origin}/en?email=private@example.com#private` }),
      custom: beforeSend({ type: "event", url: `${origin}/en` }),
      preview: beforeSend({ type: "pageview", url: "https://preview.vercel.app/en" }),
    };
  }, productionOrigin);
  expect(events).toEqual({ pageview: { type: "pageview", url: `${productionOrigin}/en` }, custom: null, preview: null });
});

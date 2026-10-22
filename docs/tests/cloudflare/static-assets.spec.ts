import { expect, test } from "@playwright/test";

test("localized deep links and RSC payloads are served as static assets", async ({ request }) => {
  for (const locale of ["en", "ko", "ja", "zh"]) {
    const html = await request.get(`/${locale}/components/dialog`);
    expect(html.status()).toBe(200);
    expect(html.headers()["content-type"]).toContain("text/html");
    expect(await html.text()).toContain("<h1");
    const payload = await request.get(`/RSC/R/${locale}/components/dialog.txt`);
    expect(payload.status()).toBe(200);
    expect(payload.headers()["content-type"]).toContain("text/x-component");
    expect(await payload.text()).not.toContain("<!DOCTYPE html>");
  }
});

test("static JSON API, build marker and missing routes keep their HTTP semantics", async ({ request }) => {
  const stars = await request.get("/api/github-stars");
  expect(stars.status()).toBe(200);
  expect(stars.headers()["content-type"]).toContain("application/json");
  expect(await stars.json()).toHaveProperty("count");
  const marker = await request.get("/build-info.json");
  expect(marker.status()).toBe(200);
  expect((await marker.json()).commit).toMatch(/^[\da-f]{40}$/);
  const missing = await request.get("/missing-cloudflare-route");
  expect(missing.status()).toBe(404);
  expect(missing.headers()["content-type"]).toContain("text/html");
});

test("page redirects and hashed asset cache headers match static hosting", async ({ request }) => {
  const redirect = await request.get("/en/components/dialog/", { maxRedirects: 0 });
  expect(redirect.status()).toBe(307);
  expect(redirect.headers().location).toMatch(/\/en\/components\/dialog$/);
  const html = await request.get("/en");
  const asset = (await html.text()).match(/href="(\/assets\/[^"]+\.js)"/)?.[1];
  expect(asset).toBeTruthy();
  const response = await request.get(asset!);
  expect(response.status()).toBe(200);
  expect(response.headers()["cache-control"]).toBe("public, max-age=31536000, immutable");
});

test("static RSC navigation and client-side search hydrate without a server runtime", async ({ page }) => {
  const errors: string[] = [];
  const rscStatuses: number[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("response", response => {
    if (new URL(response.url()).pathname.startsWith("/RSC/")) rscStatuses.push(response.status());
  });
  await page.goto("/en");
  await page.locator('.primary-nav a[href="/en/docs"]').click();
  await expect(page.getByRole("heading", { level: 1, name: "Documentation", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Button", exact: true }).first().click();
  await expect(page.getByRole("heading", { level: 1, name: "Button", exact: true })).toBeVisible();
  await page.getByRole("button", { name: /Search documentation/i }).click();
  const search = page.getByRole("dialog", { name: /Search documentation/i });
  await search.getByRole("combobox").fill("cms");
  await expect(search.locator('[data-href="/en/templates/cms"]')).toBeVisible();
  expect(rscStatuses.length).toBeGreaterThan(0);
  expect(rscStatuses.every(status => status === 200)).toBe(true);
  expect(errors).toEqual([]);
});

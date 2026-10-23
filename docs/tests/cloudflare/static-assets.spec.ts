import { expect, test } from "@playwright/test";

const canonicalOrigin = "https://neumorphism-ui.andongmin.com";

test("static HTML includes page-specific metadata and four-language alternates", async ({ request }) => {
  const descriptions = new Set<string>();
  for (const locale of ["en", "ko", "ja", "zh"]) {
    for (const pathname of ["", "/components/dialog", "/templates/cms", "/docs/installation"]) {
      const response = await request.get(`/${locale}${pathname}?search=ignored`);
      expect(response.status()).toBe(200);
      const head = (await response.text()).split("</head>")[0]!;
      const canonical = `${canonicalOrigin}/${locale}${pathname}`;
      expect(head.match(/<title>/g)).toHaveLength(1);
      expect(head.match(/rel="canonical"/g)).toHaveLength(1);
      expect(head.match(/property="og:url"/g)).toHaveLength(1);
      expect(head).toContain(" | Neumorphism UI</title>");
      expect(head).toContain(`<link rel="canonical" href="${canonical}"`);
      expect(head).toContain(`<meta property="og:url" content="${canonical}"`);
      expect(head).not.toContain("workers.dev");
      expect(head).not.toContain('name="robots" content="noindex"');
      for (const [language, prefix] of [["en", "en"], ["ko", "ko"], ["ja", "ja"], ["zh-CN", "zh"], ["x-default", "en"]]) {
        expect(head).toContain(`rel="alternate" hrefLang="${language}" href="${canonicalOrigin}/${prefix}${pathname}"`);
      }
      expect(head.match(/rel="alternate"/g)).toHaveLength(5);
      const description = head.match(/<meta name="description" content="([^"]+)"/)?.[1];
      expect(description).toBeTruthy();
      descriptions.add(description!);
    }
  }
  expect(descriptions.size).toBe(16);
});

test("native sitemap and robots advertise canonical multilingual pages only", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(sitemap.headers()["content-type"]).toContain("xml");
  const xml = await sitemap.text();
  expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  for (const locale of ["en", "ko", "ja", "zh"]) {
    for (const pathname of ["", "/docs/installation", "/components/dialog", "/templates/cms"]) {
      expect(xml).toContain(`<loc>${canonicalOrigin}/${locale}${pathname}</loc>`);
    }
  }
  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]!);
  expect(locations.length).toBeGreaterThan(16);
  expect(new Set(locations).size).toBe(locations.length);
  expect(locations.every(location => location.startsWith(`${canonicalOrigin}/`))).toBe(true);
  expect(xml).not.toMatch(/workers\.dev|\/404<|\/RSC\/|\/api\//);
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(robots.headers()["content-type"]).toContain("text/plain");
  expect(await robots.text()).toContain(`Sitemap: ${canonicalOrigin}/sitemap.xml`);
});

test("security headers preserve normal indexing and noindex only workers.dev hosts", async ({ request }) => {
  for (const host of ["neumorphism-ui.andongmin.com", "neumorphism-ui.andongmin94.workers.dev", "preview-neumorphism-ui.andongmin94.workers.dev"]) {
    const response = await request.get("/en/components/dialog", { headers: { Host: host } });
    expect(response.status()).toBe(200);
    const headers = response.headers();
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["x-frame-options"]).toBe("SAMEORIGIN");
    expect(headers["content-security-policy"]).toBe("base-uri 'self'; object-src 'none'; frame-ancestors 'self'");
    expect(headers["x-robots-tag"]).toBe(host.endsWith(".workers.dev") ? "noindex" : undefined);
    expect(await response.text()).toContain(`<link rel="canonical" href="${canonicalOrigin}/en/components/dialog"`);
  }
});

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
  await expect(page).toHaveTitle("Neumorphic UI for React | Neumorphism UI");
  await page.locator('.primary-nav a[href="/en/docs"]').click();
  await expect(page.getByRole("heading", { level: 1, name: "Documentation", exact: true })).toBeVisible();
  await expect(page).toHaveTitle("Documentation | Neumorphism UI");
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute("href", `${canonicalOrigin}/en/docs`);
  await page.getByRole("link", { name: "Button", exact: true }).first().click();
  await expect(page.getByRole("heading", { level: 1, name: "Button", exact: true })).toBeVisible();
  await expect(page).toHaveTitle("Button | Neumorphism UI");
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute("href", `${canonicalOrigin}/en/components/button`);
  await page.getByRole("button", { name: /Search documentation/i }).click();
  const search = page.getByRole("dialog", { name: /Search documentation/i });
  await search.getByRole("combobox").fill("cms");
  await expect(search.locator('[data-href="/en/templates/cms"]')).toBeVisible();
  expect(rscStatuses.length).toBeGreaterThan(0);
  expect(rscStatuses.every(status => status === 200)).toBe(true);
  expect(errors).toEqual([]);
});

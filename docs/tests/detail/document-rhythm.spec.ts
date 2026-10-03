
import { expect, test, type Page } from "@playwright/test";
const references = ["", "installation", "design-tokens", "registry", "resources", "accessibility", "verification", "credits"];
async function referenceMetrics(page: Page) {
  return page.locator(".docs-reference-article").evaluate(article => {
    const header = article.querySelector<HTMLElement>(":scope > .docs-page-header")!;
    const sections = [...article.querySelectorAll<HTMLElement>(":scope > .docs-content-section")];
    const rect = (element: HTMLElement) => {
      const box = element.getBoundingClientRect();
      const css = getComputedStyle(element);
      return { x: box.x, y: box.y, right: box.right, bottom: box.bottom, width: box.width,
        topRule: parseFloat(css.borderTopWidth), bottomRule: parseFloat(css.borderBottomWidth),
        paddingTop: parseFloat(css.paddingTop), paddingBottom: parseFloat(css.paddingBottom),
        marginTop: parseFloat(css.marginTop), marginBottom: parseFloat(css.marginBottom) };
    };
    return { header: rect(header), spacing: parseFloat(getComputedStyle(article).getPropertyValue("--docs-section-space")),
      sections: sections.map(section => {
        const heading = section.querySelector<HTMLElement>(":scope > h2");
        const body = [...section.children].find(child => child !== heading) as HTMLElement | undefined;
        const rows = getComputedStyle(section).gridTemplateRows;
        return { ...rect(section), heading: heading ? rect(heading) : null, body: body ? rect(body) : null,
          gridRows: rows === "none" ? 0 : rows.split(" ").length, children: section.children.length };
      }), pageWidth: document.documentElement.scrollWidth, viewport: innerWidth };
  });
}
async function checkReference(page: Page) {
  const metrics = await referenceMetrics(page);
  const first = metrics.sections[0];
  expect(metrics.header.bottomRule, "header owns the first boundary").toBe(1);
  expect(first.topRule, "first section must not repeat the header rule").toBe(0);
  expect(first.paddingTop, "first section must not add a second top gap").toBe(0);
  expect(Math.abs(metrics.header.right - first.right), "header and section rules have equal width").toBeLessThanOrEqual(1);
  expect(Math.abs(first.y - metrics.header.bottom - metrics.spacing), "one spacing owner after the header").toBeLessThanOrEqual(1);
  for (const [index, section] of metrics.sections.entries()) {
    expect(section.bottomRule).toBe(0);
    if (index > 0) expect(section.topRule, "later sections keep one leading rule").toBe(1);
    expect(section.gridRows, "no twenty-row implicit grid beneath a short heading").toBeLessThanOrEqual(section.children);
    if (section.heading && section.body && Math.abs(section.heading.y - section.body.y) < 100) {
      expect(section.body.marginTop, "reference copy starts without a stray paragraph margin").toBe(0);
    }
    if (!section.heading && section.body) {
      expect(section.body.width, "untitled sections must not reserve an empty label column").toBeGreaterThanOrEqual(section.width - 2);
    }
  }
  expect(metrics.pageWidth).toBeLessThanOrEqual(metrics.viewport + 1);
  return metrics;
}
for (const slug of references) {
  test(`reference boundary: ${slug || "index"}`, async ({ page }, info) => {
    const response = await page.goto(`/en/docs${slug ? `/${slug}` : ""}`);
    expect(response?.status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);
    const metrics = await referenceMetrics(page);
    await info.attach("section-metrics", { body: JSON.stringify(metrics, null, 2), contentType: "application/json" });
    await page.screenshot({ path: info.outputPath(`${slug || "index"}-top.png`), animations: "disabled" });
    await page.locator(".docs-reference-article").screenshot({ path: info.outputPath(`${slug || "index"}-article.png`), animations: "disabled" });
    await checkReference(page);
  });
}
for (const entry of [
  { name: "home", path: "/en", header: ".directory-hero", next: ".component-directory" },
  { name: "components", path: "/en/components", header: ".special-page-header", next: ".component-directory" },
  { name: "templates", path: "/en/templates", header: ".template-gallery-header", next: ".template-gallery" },
  { name: "charts", path: "/en/charts", header: ".charts-gallery-hero", next: ".charts-product-section" },
  { name: "styling", path: "/en/customize", header: ".theme-studio-page-hero", next: ".theme-studio-page > .theme-studio" },
]) {
  test(`product boundary: ${entry.name}`, async ({ page }, info) => {
    await page.goto(entry.path);
    await expect(page.locator(entry.header)).toHaveCSS("border-bottom-width", "1px");
    await expect(page.locator(entry.next)).toHaveCSS("border-top-width", "0px");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await page.screenshot({ path: info.outputPath(`${entry.name}-boundary.png`), animations: "disabled" });
    if (entry.name === "charts") {
      const sections = page.locator(".charts-gallery-page > section");
      expect(await sections.count()).toBeGreaterThan(1);
      for (let i = 0; i < await sections.count(); i++) {
        await expect(sections.nth(i)).toHaveCSS("border-bottom-width", "0px");
        await expect(sections.nth(i)).toHaveCSS("border-top-width", i ? "1px" : "0px");
      }
      await expect(page.locator(".site-footer")).toHaveCSS("border-top-width", "1px");
      await page.locator(".site-footer").scrollIntoViewIfNeeded();
      await page.screenshot({ path: info.outputPath("charts-footer.png"), animations: "disabled" });
    }
    if (entry.name === "templates") {
      for (const card of await page.locator(".template-card").all()) {
        await expect(card.locator(".template-card-preview")).toHaveCSS("border-bottom-width", "1px");
        await expect(card.locator(".template-card-body")).toHaveCSS("border-top-width", "0px");
      }
    }
  });
}
test("drawer keeps its boundary while preview uses open spacing", async ({ page }, info) => {
  await page.goto("/en/components/button");
  await expect(page.locator(".component-example-toolbar").first()).toHaveCSS("border-bottom-width", "0px");
  await expect(page.locator(".component-example").first()).toHaveCSS("border-width", "0px");
  await expect(page.locator(".component-example-panel").first()).toHaveCSS("border-top-width", "0px");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open docs menu" }).click();
  await expect(page.locator(".mobile-nav-heading")).toHaveCSS("border-bottom-width", "1px");
  await expect(page.locator(".mobile-nav-scroll")).toHaveCSS("border-top-width", "0px");
  await page.screenshot({ path: info.outputPath("drawer-boundary.png"), animations: "disabled" });
  await page.keyboard.press("Escape");
});
test("reference rhythm survives localization, intermediate widths and text zoom", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop-light", "one dedicated responsive pass");
  for (const width of [320, 820, 1280]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const locale of ["en", "ko", "ja", "zh"]) {
      await page.goto(`/${locale}/docs/design-tokens`);
      await checkReference(page);
      await page.screenshot({ path: info.outputPath(`tokens-${locale}-${width}.png`), animations: "disabled" });
    }
    await page.goto("/en/docs/installation");
    await checkReference(page);
    await expect(page.locator(".docs-toc")).toBeHidden();
    const columns = await page.locator(".docs-content-layout").evaluate(element => getComputedStyle(element).gridTemplateColumns.split(" "));
    expect(columns, "a hidden TOC must not leave an empty column").toHaveLength(1);
  }
  await page.setViewportSize({ width: 820, height: 1000 });
  await page.goto("/en/docs/design-tokens");
  await page.addStyleTag({ content: "html { font-size: 200%; }" });
  await checkReference(page);
  await page.screenshot({ path: info.outputPath("tokens-200-percent-text.png"), animations: "disabled" });
});

test("reference link rows use one internal rule without card borders", async ({ page }, info) => {
  await page.goto("/en/docs");
  for (const list of await page.locator(".docs-link-list").all()) {
    await expect(list).toHaveCSS("border-top-width", "0px");
    await expect(list).toHaveCSS("row-gap", "0px");
    const links = list.locator(":scope > a");
    for (let i = 0; i < await links.count(); i++) {
      await expect(links.nth(i)).toHaveCSS("border-top-width", i ? "1px" : "0px");
      await expect(links.nth(i)).toHaveCSS("border-bottom-width", "0px");
      await expect(links.nth(i)).toHaveCSS("border-radius", "0px");
    }
  }
  await page.locator(".docs-reference-article").screenshot({ path: info.outputPath("reference-links.png"), animations: "disabled" });
});
test("chart reference layout keeps gutters and source disclosure boundaries", async ({ page }, info) => {
  await page.goto("/en/charts");
  const grid = page.locator(".chart-reference-grid");
  await grid.scrollIntoViewIfNeeded();
  await grid.screenshot({ path: info.outputPath("chart-reference-grid.png"), animations: "disabled" });
  await expect(grid).toHaveCSS("display", "grid");
  await expect(grid).toHaveCSS("gap", "24px");
  const cards = grid.locator(".chart-reference-card");
  expect(await cards.count()).toBe(8);
  for (const card of await cards.all()) {
    await expect(card).toHaveCSS("padding-left", "24px");
    await expect(card).toHaveCSS("gap", "12px");
    for (const details of await card.locator(":scope > details").all()) {
      await expect(details).toHaveCSS("border-top-width", "1px");
      await expect(details).toHaveCSS("border-bottom-width", "0px");
    }
  }
  const details = cards.first().locator("details").first();
  await details.locator("summary").click();
  await expect(details).toHaveAttribute("open", "");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await cards.first().screenshot({ path: info.outputPath("chart-open-disclosure.png"), animations: "disabled" });
});
test("reference tables keep column gutters and one row boundary", async ({ page }) => {
  await page.goto("/en/docs/credits");
  const table = page.locator(".docs-reference-article table");
  const heading = table.locator("thead th").first();
  await expect(heading).toHaveCSS("text-align", "left");
  await expect(heading).toHaveCSS("border-bottom-width", "1px");
  const rows = table.locator("tbody tr");
  for (let i = 0; i < await rows.count(); i++) {
    const cell = rows.nth(i).locator("th");
    await expect(cell).toHaveCSS("padding-right", "16px");
    await expect(cell).toHaveCSS("border-top-width", i ? "1px" : "0px");
    await expect(cell).toHaveCSS("border-bottom-width", "0px");
  }
});

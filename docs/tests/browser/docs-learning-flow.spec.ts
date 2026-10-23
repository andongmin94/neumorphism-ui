import { expect, test } from "@playwright/test";
import { componentDocs } from "../../components/docs/component-docs-data";

for (const locale of ["en", "ko", "ja", "zh"]) {
  test(`${locale}: first component path keeps minimum usage separate from the interactive example`, async ({ page, context }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto(`/${locale}/docs`);
    await page.locator(`.docs-guide-article a[href="/${locale}/docs/installation"]`).first().click();
    await expect(page).toHaveURL(url => url.pathname === `/${locale}/docs/installation`);
    const setup = page.locator("#component");
    await expect(setup).toContainText("registry add @neumorphism-ui=https://neumorphism-ui.andongmin.com/r/{name}.json");
    await expect(setup).toContainText("npx shadcn@latest add @neumorphism-ui/neumorphism-ui");
    await expect(setup).toContainText("npx shadcn@latest add @neumorphism-ui/button");
    await expect(page.locator("#usage pre")).toContainText('from "@/components/ui/button"');
    await expect(page.locator("#usage pre")).toContainText("<Button");
    await page.goto(`/${locale}/components/button`);
    const usage = page.locator("#usage .code-shell");
    await expect(usage).toHaveCount(1);
    await expect(usage.locator("pre")).toContainText("export default function Example()");
    const minimum = await usage.locator("pre").innerText();
    expect(minimum.match(/<Button(?:\s|>)/g)).toHaveLength(1);
    await usage.locator(".copy-button").click();
    expect((await page.evaluate(() => navigator.clipboard.readText())).replaceAll("\r\n", "\n")).toBe(minimum);
    const preview = page.locator("#preview");
    await expect(preview.locator(".component-doc-example-caption h3")).toBeVisible();
    await preview.getByRole("tab").nth(1).click();
    const showcase = await preview.locator("pre").innerText();
    expect(showcase.match(/<Button(?:\s|>)/g)).toHaveLength(10);
    expect(showcase).toContain('from "@/components/ui/button"');
    expect(showcase).not.toBe(minimum);
    await expect(page.locator(".component-api-table thead th")).toHaveCount(5);
    await expect(page.locator(".component-api-table tbody tr")).toHaveCount(componentDocs.find(doc => doc.slug === "button")!.props.length);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
  });
}

test("component navigation follows the alphabet and filtering still opens a page", async ({ page }, info) => {
  await page.goto("/en/components/button");
  const mobile = info.project.use.isMobile;
  if (mobile) await page.getByRole("button", { name: "Open docs menu", exact: true }).click();
  const navigation = page.locator(mobile ? ".mobile-nav-panel" : ".docs-site-sidebar");
  const links = navigation.locator(".component-nav-list a");
  const names = await links.allTextContents();
  expect(names).toHaveLength(componentDocs.length);
  expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "en")));
  await navigation.getByRole("searchbox", { name: "Filter components", exact: true }).fill("dialog");
  await expect(links).toHaveCount(2);
  await links.filter({ hasText: /^Dialog$/ }).click();
  await expect(page).toHaveURL(url => url.pathname === "/en/components/dialog");
  if (mobile) await expect(page.getByRole("dialog", { name: "Mobile documentation navigation" })).toBeHidden();
  const ordered = [...componentDocs].sort((a, b) => a.title.localeCompare(b.title, "en"));
  const index = ordered.findIndex(doc => doc.slug === "dialog");
  await expect(page.locator(".component-doc-pagination a").first()).toHaveAttribute("href", `/en/components/${ordered[index - 1].slug}`);
  await expect(page.locator(".component-doc-pagination a").last()).toHaveAttribute("href", `/en/components/${ordered[index + 1].slug}`);
});

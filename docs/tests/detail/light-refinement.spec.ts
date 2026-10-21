import { expect, test, type Locator } from "@playwright/test";

async function expectNoVisibleStroke(element: Locator) {
  await expect(element).toBeVisible();
  const colors = await element.evaluate(node => {
    const style = getComputedStyle(node);
    return [style.borderTopColor, style.borderRightColor, style.borderBottomColor, style.borderLeftColor];
  });
  expect(colors).toEqual(["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"]);
}

test("raised buttons and cards use a directional rim without a perimeter stroke in light and dark", async ({ page }, info) => {
  const light = info.project.name.endsWith("light");
  const glint = light ? "82%, transparent" : "10%, transparent";

  await page.goto("/en");
  await page.evaluate(() => document.fonts.ready);
  const homeActions = page.locator(".directory-hero-actions");
  const primaryLink = homeActions.locator(".docs-primary-action");
  const secondaryLink = homeActions.locator(".docs-secondary-action");
  for (const link of [primaryLink, secondaryLink]) {
    await expectNoVisibleStroke(link);
    await expect(link).not.toHaveCSS("box-shadow", "none");
    expect(await link.evaluate(node => getComputedStyle(node).boxShadow)).not.toContain("inset");
  }
  await homeActions.screenshot({ path: info.outputPath("home-cta.png"), animations: "disabled" });
  const values = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);
    return Object.fromEntries([
      "--neu-shadow-raised", "--neu-shadow-raised-sm", "--neu-shadow-hover",
      "--neu-shadow-plate", "--neu-shadow-inset",
    ].map(key => [key, style.getPropertyValue(key).trim()]));
  });
  for (const key of ["--neu-shadow-raised", "--neu-shadow-raised-sm", "--neu-shadow-hover", "--neu-shadow-plate"]) {
    expect(values[key]).toContain("-1px -1px 0px 0px color-mix(in srgb, ");
    expect(values[key]).toContain(glint);
    expect(values[key]).not.toContain("inset");
  }
  expect(values["--neu-shadow-inset"]).toContain("inset");
  if (!light) {
    // Structural popup/field edges remain available; raised CTAs never inherit them.
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--neu-edge"))).toContain("color-mix");
  }

  await page.goto("/en/components/button");
  const panel = page.locator(".component-example-panel");
  const button = panel.locator("[data-slot=button][data-variant=default]").first();
  const primary = panel.locator("[data-slot=button][data-variant=primary]").first();
  await expectNoVisibleStroke(button);
  await expectNoVisibleStroke(primary);
  expect(await button.evaluate(node => getComputedStyle(node).boxShadow)).not.toContain("inset");
  await button.screenshot({ path: info.outputPath("button.png"), animations: "disabled" });
  await button.focus();
  await expect(button).toHaveCSS("outline-width", "2px");

  await page.goto("/en/components/card");
  const card = panel.locator("[data-slot=card][data-variant=raised]").first();
  await expectNoVisibleStroke(card);
  await expect(card).not.toHaveCSS("box-shadow", "none");
  expect(await card.evaluate(node => getComputedStyle(node).boxShadow)).not.toContain("inset");
  await card.screenshot({ path: info.outputPath("card.png"), animations: "disabled" });

  await page.goto("/en/components/image-card");
  const imageCard = panel.locator("[data-slot=image-card]").first();
  await expectNoVisibleStroke(imageCard);

  if (info.project.name.startsWith("mobile")) {
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto("/en");
    await expectNoVisibleStroke(page.locator(".directory-hero-actions .docs-secondary-action"));
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    await page.locator(".directory-hero-actions").screenshot({ path: info.outputPath("home-cta-320.png"), animations: "disabled" });
  }
});

test("documentation raised links and empty-state controls do not restore decorative borders", async ({ page }, info) => {
  await page.goto("/en/components/button");
  const registryLink = page.locator(".component-doc-registry-link").first();
  await expectNoVisibleStroke(registryLink);
  await registryLink.screenshot({ path: info.outputPath("registry-link.png"), animations: "disabled" });

  await page.goto("/en");
  const search = page.getByRole("textbox", { name: "Search components" });
  await search.fill("not-a-real-neumorphism-component");
  const emptyAction = page.locator(".component-directory-empty button");
  await expectNoVisibleStroke(emptyAction);
  await emptyAction.screenshot({ path: info.outputPath("empty-action.png"), animations: "disabled" });

  if (info.project.name.startsWith("mobile")) {
    await page.getByRole("button", { name: "Open docs menu" }).click();
    const close = page.locator(".mobile-nav-close");
    await expectNoVisibleStroke(close);
    await close.screenshot({ path: info.outputPath("mobile-nav-close.png"), animations: "disabled" });
    await close.click();
    await expect(page.getByRole("dialog", { name: "Mobile documentation navigation" })).not.toBeVisible();
  }
});

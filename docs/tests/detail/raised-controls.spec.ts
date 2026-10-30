import { expect, test, type Locator } from "@playwright/test";

async function expectRaisedWithoutStroke(element: Locator) {
  await expect(element).toBeVisible();
  const styles = await element.evaluate(node => {
    const style = getComputedStyle(node);
    return {
      border: style.borderTopColor,
      shadow: style.boxShadow,
      background: style.backgroundColor,
    };
  });
  expect(styles.border).toBe("rgba(0, 0, 0, 0)");
  expect(styles.shadow).not.toBe("none");
  expect(styles.shadow).not.toContain("inset");
}

test("soft secondary actions stay tactile while ghost controls remain intentionally flat", async ({ page }, info) => {
  await page.goto("/en/components/button");
  const panel = page.locator(".component-example-panel").first();
  const soft = panel.locator('[data-slot="button"][data-variant="soft"]').first();
  const ghost = panel.locator('[data-slot="button"][data-variant="ghost"]').first();
  await expectRaisedWithoutStroke(soft);
  await expect(ghost).toHaveClass(/shadow-none/);
  await expect(ghost).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await soft.screenshot({ path: info.outputPath("soft-button.png"), animations: "disabled" });

  const resting = await soft.evaluate(node => getComputedStyle(node).boxShadow);
  if (!info.project.use.isMobile) {
    await soft.hover();
    await expect.poll(() => soft.evaluate(node => getComputedStyle(node).boxShadow)).not.toBe(resting);
    await page.mouse.down();
    await expect.poll(() => soft.evaluate(node => getComputedStyle(node).boxShadow.includes("inset"))).toBe(true);
    await page.mouse.up();
  } else {
    await soft.tap();
  }
});

test("dialog Cancel and Save share a coherent raised face and restore focus", async ({ page }, info) => {
  await page.goto("/en/components/dialog");
  const trigger = page.getByRole("button", { name: "Edit profile", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog").first();
  await expect(dialog).toBeVisible();
  const cancel = dialog.getByRole("button", { name: "Cancel", exact: true });
  const save = dialog.getByRole("button", { name: "Save", exact: true });
  await expect(cancel).toHaveAttribute("data-variant", "soft");
  await expect(save).toHaveAttribute("data-variant", "primary");
  await expectRaisedWithoutStroke(cancel);
  await expectRaisedWithoutStroke(save);
  await dialog.screenshot({ path: info.outputPath("dialog-raised-footer.png"), animations: "disabled" });
  await cancel.click();
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("raised fields and navigation controls do not regain the dark-mode perimeter stroke", async ({ page }, info) => {
  for (const [slug, selector] of [
    ["input-group", '[data-slot="input-group-button"]'],
    ["number-field", '[data-slot="number-field-increment"]'],
    ["pagination", '[data-slot="pagination-link"][aria-current="page"]'],
    ["avatar", '[data-slot="avatar"]'],
  ] as const) {
    await page.goto(`/en/components/${slug}`);
    const control = page.locator(".component-example-panel").first().locator(selector).first();
    await expectRaisedWithoutStroke(control);
    await control.screenshot({ path: info.outputPath(`${slug}-raised.png`), animations: "disabled" });
  }

  await page.goto("/en/components/calendar");
  const calendar = page.locator(".component-example-panel [data-slot=calendar]").first();
  const navigation = calendar.getByRole("button", { name: /next month/i }).first();
  await expectRaisedWithoutStroke(navigation);
  await expectRaisedWithoutStroke(calendar.locator(".rdp-root").first());

  await page.goto("/en/charts");
  await expectRaisedWithoutStroke(page.locator('[data-slot="chart"]').first());
});

test("the actual registry button source and the displayed dialog example share the soft material", async ({ page }) => {
  const response = await page.request.get("/r/button.json");
  expect(response.status()).toBe(200);
  const registry = await response.json() as { files: { path: string; content: string }[] };
  const authored = registry.files.find(file => file.path.endsWith("/button.tsx"))?.content;
  expect(authored).toBeTruthy();
  expect(authored).toMatch(/soft:\s*\n\s*"[^"]*shadow-\[var\(--neu-shadow-raised-sm\)\]/);
  expect(authored).toContain("hover:shadow-[var(--neu-shadow-hover)]");
  expect(authored).toContain("active:[background-image:var(--neu-fill-inset)]");

  for (const locale of ["en", "ko", "ja", "zh"]) {
    await page.goto(`/${locale}/components/dialog`);
    const preview = page.locator(".component-example");
    await preview.getByRole("tab").nth(1).click();
    await expect(preview.locator("pre.shiki")).toContainText('DialogClose render={<Button variant="soft"/>}');
  }
});

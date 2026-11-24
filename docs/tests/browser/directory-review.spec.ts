import { expect, test } from "@playwright/test";

test("directory slash respects canceled keys, composition, and native editable targets", async ({ page }) => {
  await page.goto("/en/components");
  await expect(page.getByRole("button", { name: /Search documentation/i })).toBeEnabled();
  const search = page.getByRole("textbox", { name: "Search components", exact: true });
  await search.fill("button");
  await expect.poll(() => page.locator(".component-directory-card").count()).toBeLessThan(56);
  await page.getByRole("button", { name: "Reset filters", exact: true }).click();
  await expect(search).toHaveValue("");
  await expect(search).toBeFocused();
  await expect(page.locator(".component-directory-card")).toHaveCount(56);

  const category = page.locator(".component-directory-categories button").first();
  await category.focus();
  await page.keyboard.press("/");
  await expect(search).toBeFocused();
  await expect(page.getByRole("dialog")).toHaveCount(0);

  await category.focus();
  await category.evaluate(element => element.addEventListener("keydown", event => event.preventDefault(), { once: true }));
  await page.keyboard.press("/");
  await expect(category).toBeFocused();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  for (const composition of [{ isComposing: true }, { keyCode: 229 }]) {
    const allowed = await category.evaluate((element, details) => element.dispatchEvent(new KeyboardEvent("keydown", {
      key: "/", code: "Slash", bubbles: true, cancelable: true, ...details,
    })), composition);
    expect(allowed).toBe(true);
    await expect(category).toBeFocused();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  }

  await page.evaluate(() => {
    const controls = document.createElement("section");
    controls.id = "shortcut-controls";
    controls.innerHTML = `
      <input aria-label="Shortcut input">
      <textarea aria-label="Shortcut textarea"></textarea>
      <select aria-label="Shortcut select"><option>Choose</option><option>/</option></select>
      <div id="editable-true" contenteditable="true" tabindex="0"></div>
      <div id="editable-empty" contenteditable="" tabindex="0"></div>
      <div id="editable-plain" contenteditable="plaintext-only" tabindex="0"></div>
      <div contenteditable="true">
        <button id="editable-inherited" type="button">Editable child</button>
        <button id="editable-false" type="button" contenteditable="false">Read-only child</button>
      </div>`;
    document.body.append(controls);
    window.addEventListener("keydown", event => { controls.dataset.prevented = String(event.defaultPrevented); });
  });
  const controls = page.locator("#shortcut-controls");
  for (const selector of ["input", "textarea", "select", "#editable-true", "#editable-empty", "#editable-plain", "#editable-inherited"]) {
    const target = controls.locator(selector);
    await target.focus();
    await page.keyboard.press("/");
    await expect(target).toBeFocused();
    await expect(controls).toHaveAttribute("data-prevented", "false");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  }
  await expect(controls.locator("input")).toHaveValue("/");
  await expect(controls.locator("textarea")).toHaveValue("/");
  await controls.locator("#editable-false").focus();
  await page.keyboard.press("/");
  await expect(search).toBeFocused();
  await expect(page.getByRole("dialog")).toHaveCount(0);

  await page.goto("/en/components/button");
  const trigger = page.getByRole("button", { name: /Search documentation/i });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: /Search documentation/i });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page.keyboard.press("/");
  await expect(dialog).toBeVisible();
});

test("mobile directory stays compact, readable and navigable in every locale", async ({ page }) => {
  for (const locale of ["ko", "en", "ja", "zh"]) {
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`/${locale}/components`);
      const cards = page.locator(".component-directory-card");
      await expect(cards).toHaveCount(56);
      const button = page.locator(`a.component-directory-card[href="/${locale}/components/button"]`);
      await expect(button.locator("h3")).toHaveCSS("font-size", "20px");
      await expect(button.locator("p")).toHaveCSS("font-size", "14px");
      await expect.poll(async () => (await button.boundingBox())!.height).toBeLessThan(170);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
      await page.getByRole("textbox").fill("button");
      // Search also includes summaries, so related components may match "button".
      await expect.poll(() => cards.count()).toBeLessThan(56);
      await expect(button).toBeVisible();
      await button.focus();
      await expect(button).toHaveCSS("outline-width", "2px");
      await button.press("Enter");
      await expect(page).toHaveURL(new RegExp(`/${locale}/components/button$`));
    }
  }
});

test("Air dark blue is shared by selected controls and readable accent text", async ({ page }, info) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/en/components/button");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const colors = await page.locator("html").evaluate(root => {
    const style = getComputedStyle(root);
    return { primary: style.getPropertyValue("--primary").trim(), ink: style.getPropertyValue("--neu-accent-ink").trim() };
  });
  expect(colors).toEqual({ primary: "#237bff", ink: "#68a8ff" });
  await expect(page.locator('#preview [data-variant="primary"]')).toHaveCSS("color", "rgb(104, 168, 255)");
  if (!info.project.use.hasTouch) {
    await page.goto("/en/components/accordion");
    const trigger = page.locator('#preview [data-slot="accordion-trigger"]').first();
    await trigger.hover();
    await expect(trigger).toHaveCSS("color", "rgb(104, 168, 255)");
  }
});

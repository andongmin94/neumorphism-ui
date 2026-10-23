import { expect, test } from "@playwright/test";
import { getMessages } from "../../i18n/messages";

for (const locale of ["en", "ko", "ja", "zh"] as const) {
  test(`${locale}: search waits for its own hydration before the first click`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    let releaseScripts!: () => void;
    const scriptsReleased = new Promise<void>(resolve => { releaseScripts = resolve; });
    await page.route(url => url.pathname.endsWith(".js"), async route => {
      await scriptsReleased;
      await route.continue();
    });

    try {
      await page.goto(`/${locale}`, { waitUntil: "commit" });
      const trigger = page.locator(".docs-search-trigger");
      await expect(trigger).toBeVisible();
      await expect(trigger).toBeDisabled();
      await expect(page.getByRole("dialog")).toHaveCount(0);

      releaseScripts();
      // One ordinary click waits for the real trigger to become enabled.
      await trigger.click();
      const dialog = page.getByRole("dialog", { name: getMessages(locale).search.title, exact: true });
      await expect(trigger).toBeEnabled();
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole("combobox")).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(trigger).toBeFocused();
      expect(errors).toEqual([]);
    } finally {
      releaseScripts();
      await page.unrouteAll({ behavior: "wait" });
    }
  });

  test(`${locale}: component preview stays inert until its first dialog click can work`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    let releaseScripts!: () => void;
    const scriptsReleased = new Promise<void>(resolve => { releaseScripts = resolve; });
    await page.route(url => url.pathname.endsWith(".js"), async route => {
      await scriptsReleased;
      await route.continue();
    });

    try {
      await page.goto(`/${locale}/components/dialog`, { waitUntil: "commit" });
      const example = page.locator(".component-example");
      const stage = example.locator("[data-component-stage]");
      await expect(example).toHaveAttribute("aria-busy", "true");
      await expect(stage).toHaveAttribute("inert", "");
      await expect(page.getByRole("dialog")).toHaveCount(0);

      releaseScripts();
      await expect(example).toHaveAttribute("aria-busy", "false");
      await expect(stage).not.toHaveAttribute("inert");
      const trigger = stage.getByRole("button").first();
      await trigger.click();
      const dialog = page.getByRole("dialog").first();
      await expect(dialog).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(trigger).toBeFocused();
      expect(errors).toEqual([]);
    } finally {
      releaseScripts();
      await page.unrouteAll({ behavior: "wait" });
    }
  });
}

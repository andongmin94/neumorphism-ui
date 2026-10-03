import { expect, test } from "@playwright/test";

const labels = {
  en: { group: "Guides", all: "All", copy: "Copy email", success: "Email copied.", failure: "Could not copy." },
  ko: { group: "문서", all: "전체", copy: "이메일 복사", success: "이메일 주소를 복사했습니다.", failure: "복사하지 못했습니다." },
  ja: { group: "ガイド", all: "すべて", copy: "メールをコピー", success: "メールアドレスをコピーしました。", failure: "コピーできませんでした。" },
  zh: { group: "指南", all: "全部", copy: "复制邮箱", success: "邮箱地址已复制。", failure: "复制失败" },
};

for (const width of [320, 390, 1440]) for (const mode of ["light", "dark"]) {
  test(`link content, filters and clipboard without docs CSS: ${width} ${mode}`, async ({ page, context }, info) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const [locale, copy] of Object.entries(labels)) {
      await page.goto(`/link-hub.html?locale=${locale}&mode=${mode}`);
      const hub = page.locator('[data-example] [data-slot="link-hub"]');
      await expect(hub.getByRole("link")).toHaveCount(5);
      await page.evaluate(() => document.fonts.ready);
      const filter = hub.getByRole("button", { name: copy.group, exact: true });
      await filter.focus();
      await filter.press("Enter");
      await expect(filter).toHaveAttribute("aria-pressed", "true");
      await expect(filter).toBeFocused();
      await expect(hub.getByRole("link")).toHaveCount(2);
      await hub.getByRole("button", { name: copy.all, exact: true }).click();
      await expect(hub.getByRole("link")).toHaveCount(5);
      await hub.screenshot({ path: info.outputPath(`links-${locale}.png`) });

      const long = page.locator('[data-long] [data-slot="link-hub"]');
      const link = long.getByRole("link");
      const text = link.locator("span.flex-1");
      await expect(text.locator("span").nth(1)).toHaveText("https://example.com/" + "long-path-".repeat(24));
      for (const element of [long, long.locator("header"), link, text]) {
        expect(await element.evaluate(e => e.scrollWidth <= e.clientWidth + 1)).toBe(true);
      }
      await expect(text.locator("span").nth(1)).toHaveCSS("white-space", "normal");
      await expect(text.locator("span").nth(1)).toHaveCSS("overflow-x", "visible");
      expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(80);
      await link.focus();
      await expect(link).toBeFocused();
      await expect(link).not.toHaveCSS("box-shadow", "none");
      await long.screenshot({ path: info.outputPath(`long-links-${locale}.png`) });
      await link.press("Enter");
      await expect(page).toHaveURL(/#destination$/);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);

      const button = hub.getByRole("button", { name: copy.copy, exact: true });
      await button.click();
      await expect(hub.getByRole("status").last()).toHaveText(copy.success);
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("hello@example.com");
      // Exercise permission denial at the browser API boundary; do not replay user actions.
      await page.evaluate(() => Object.defineProperty(navigator.clipboard, "writeText", {
        configurable: true, value: async () => { throw new DOMException("Denied", "NotAllowedError"); },
      }));
      await button.click();
      await expect(hub.getByRole("status").last()).toContainText(copy.failure);
      await expect(hub.getByText("hello@example.com", { exact: true }).last()).toBeVisible();
    }
    expect(errors).toEqual([]);
  });
}

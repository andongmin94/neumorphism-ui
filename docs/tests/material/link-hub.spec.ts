import { expect, test } from "@playwright/test";

const labels = {
  en: { group: "Guides", all: "All", copy: "Copy email", success: "Email copied.", failure: "Could not copy." },
  ko: { group: "문서", all: "전체", copy: "이메일 복사", success: "이메일 주소를 복사했습니다.", failure: "복사하지 못했습니다." },
  ja: { group: "ガイド", all: "すべて", copy: "メールをコピー", success: "メールアドレスをコピーしました。", failure: "コピーできませんでした。" },
  zh: { group: "指南", all: "全部", copy: "复制邮箱", success: "邮箱地址已复制。", failure: "复制失败" },
};

for (const outcome of ["success", "failure"] as const) {
  test(`runtime regressions: LinkHub ${outcome} feedback follows the email, locale and latest request`, async ({ page }) => {
    type ClipboardWindow = typeof window & {
      pendingCopies: { text: string; resolve: () => void; reject: (reason: Error) => void }[];
    };
    await page.addInitScript(() => {
      const pendingCopies: ClipboardWindow["pendingCopies"] = [];
      Object.defineProperty(window, "pendingCopies", { value: pendingCopies });
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
          writeText: (text: string) => new Promise<void>((resolve, reject) => {
            pendingCopies.push({ text, resolve, reject });
          }),
        },
      });
    });
    await page.goto("/link-hub.html?scenario=clipboard");
    const hub = page.locator('[data-slot="link-hub"]');
    const feedback = hub.getByRole("status").last();
    const email = page.getByRole("textbox", { name: "Contact email" });
    await hub.getByRole("button", { name: labels.en.copy, exact: true }).click();
    await expect.poll(() => page.evaluate(() => (window as ClipboardWindow).pendingCopies.length)).toBe(1);
    await page.evaluate(result => {
      const copy = (window as ClipboardWindow).pendingCopies[0];
      if (result === "success") copy.resolve();
      else copy.reject(new Error("Clipboard denied"));
    }, outcome);
    await expect(feedback).toContainText(labels.en[outcome]);
    await page.getByRole("button", { name: "Switch locale" }).click();
    await expect(feedback).toContainText(labels.ko[outcome]);
    await email.fill("second@example.com");
    await expect(feedback).toBeEmpty();

    await hub.getByRole("button", { name: labels.ko.copy, exact: true }).click();
    await expect.poll(() => page.evaluate(() => (window as ClipboardWindow).pendingCopies.length)).toBe(2);
    await email.fill("third@example.com");
    await hub.getByRole("button", { name: labels.ko.copy, exact: true }).click();
    await expect.poll(() => page.evaluate(() => (window as ClipboardWindow).pendingCopies.length)).toBe(3);
    expect(await page.evaluate(() => (window as ClipboardWindow).pendingCopies.map(copy => copy.text))).toEqual([
      "first@example.com", "second@example.com", "third@example.com",
    ]);
    await page.evaluate(() => { (window as ClipboardWindow).pendingCopies[2].resolve(); });
    await expect(feedback).toHaveText(labels.ko.success);
    await page.evaluate(result => {
      const previous = (window as ClipboardWindow).pendingCopies[1];
      if (result === "success") previous.resolve();
      else previous.reject(new Error("Previous clipboard request denied"));
    }, outcome);
    await page.getByRole("button", { name: "Switch locale" }).click();
    await expect(feedback).toHaveText(labels.en.success);
    await expect(hub.getByText("third@example.com", { exact: true })).toBeVisible();
  });
}

test("runtime regressions: blog sorts timezone timestamps and date-only publications chronologically", async ({ page }) => {
  await page.goto("/link-hub.html?scenario=chronology");
  const blog = page.locator('[data-slot="blog"]');
  const titles = blog.locator("article h3");
  await expect(titles).toHaveText(["Following date", "Later UTC", "Seoul morning", "Previous date"]);
  const sort = blog.getByRole("combobox", { name: "Sort posts" });
  await sort.selectOption("oldest");
  await expect(titles).toHaveText(["Previous date", "Seoul morning", "Later UTC", "Following date"]);
  await sort.selectOption("newest");
  await expect(titles).toHaveText(["Following date", "Later UTC", "Seoul morning", "Previous date"]);
});

test("runtime regressions: caller All categories and Blog label targets remain independent", async ({ page }) => {
  await page.goto("/link-hub.html?scenario=filters");
  const firstBlog = page.locator("[data-first-blog]");
  const secondBlog = page.locator("[data-second-blog]");
  const hub = page.locator("[data-filter-hub]");
  await expect(firstBlog.locator("article")).toHaveCount(2);
  await expect(hub.getByRole("link")).toHaveCount(2);

  // The first All control means every category; the second is caller data.
  for (const surface of [firstBlog, hub]) {
    const all = surface.getByRole("button", { name: "All", exact: true });
    await expect(all).toHaveCount(2);
    await all.nth(1).click();
    await expect(all.nth(0)).toHaveAttribute("aria-pressed", "false");
    await expect(all.nth(1)).toHaveAttribute("aria-pressed", "true");
  }
  await expect(firstBlog.locator("article")).toHaveCount(1);
  const postLink = firstBlog.getByRole("link", { name: "All category post" });
  await expect(postLink).toBeVisible();
  const slug = "field notes?draft#한글";
  await expect(postLink).toHaveAttribute("href", "/blog/" + encodeURIComponent(slug));
  const reader = page.locator("[data-reader]");
  const section = reader.getByRole("region", { name: "Caller section", exact: true });
  await expect(section).toBeVisible();
  await expect(section.getByRole("heading")).toHaveAttribute("id", encodeURIComponent(slug) + "-section-1");
  const portfolio = page.locator("[data-private-portfolio]");
  await expect(portfolio.locator('a[href="#portfolio-contact"]')).toHaveCount(0);
  await expect(portfolio.locator("#portfolio-contact")).toHaveCount(0);
  await expect(hub.getByRole("link")).toHaveCount(1);
  await expect(hub.getByRole("link", { name: "All category link" })).toBeVisible();

  // Changing UI language must preserve the selected caller category.
  await page.getByRole("button", { name: "Switch locale" }).click();
  await expect(firstBlog.locator("article")).toHaveCount(1);
  await expect(hub.getByRole("link")).toHaveCount(1);
  for (const surface of [firstBlog, hub]) {
    await expect(surface.getByRole("button", { name: "All", exact: true })).toHaveAttribute("aria-pressed", "true");
    await surface.getByRole("button", { name: "전체", exact: true }).click();
  }
  await expect(firstBlog.locator("article")).toHaveCount(2);
  await expect(hub.getByRole("link")).toHaveCount(2);

  const firstSearch = firstBlog.getByRole("searchbox");
  const secondSearch = secondBlog.getByRole("searchbox");
  expect(await firstSearch.getAttribute("id")).not.toBe(await secondSearch.getAttribute("id"));
  await secondBlog.locator("label[for]").click();
  await expect(secondSearch).toBeFocused();
  await expect(firstSearch).not.toBeFocused();
});

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

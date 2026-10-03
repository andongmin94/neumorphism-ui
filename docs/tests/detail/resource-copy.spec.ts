import { expect, test } from "@playwright/test";

const labels = {
  en: { guides: "Guides", links: "Links", intro: "Review revenue, visits and conversion for the selected period and channel.", note: "The email address is an example and is not monitored." },
  ko: { guides: "문서", links: "링크", intro: "선택한 기간과 유입 경로의 매출, 방문 수, 전환율을 확인합니다.", note: "이메일은 예제 주소이며 문의를 받지 않습니다." },
  ja: { guides: "ガイド", links: "リンク", intro: "選択した期間と流入経路の売上、訪問数、転換率を確認します。", note: "メールアドレスはサンプルです。お問い合わせは受け付けていません。" },
  zh: { guides: "指南", links: "链接", intro: "查看所选期间和渠道的收入、访问量与转化率。", note: "邮箱地址仅供演示，不接收咨询。" },
};

for (const [locale, copy] of Object.entries(labels)) {
  test(`resource links and descriptive dashboard copy: ${locale}`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(`/${locale}/templates/link-hub`);
    const hub = page.locator('[data-slot="link-hub"]');
    await expect(hub.getByRole("heading", { name: "Neumorphism UI", exact: true })).toBeVisible();
    await expect(hub.getByRole("heading", { name: copy.links, exact: true })).toBeVisible();
    await expect(page.getByText(copy.note, { exact: true })).toBeVisible();
    await expect(hub.getByRole("link")).toHaveCount(5);
    for (const link of await hub.getByRole("link").all()) {
      const href = await link.getAttribute("href");
      if (href!.startsWith("https:")) {
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", "noreferrer");
      }
    }
    await page.evaluate(() => document.fonts.ready);
    await hub.screenshot({ path: info.outputPath("link-hub.png") });
    await page.setViewportSize({ width: 320, height: 1000 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    await hub.screenshot({ path: info.outputPath("link-hub-320.png") });
    const guides = hub.getByRole("button", { name: copy.guides, exact: true });
    await guides.focus();
    await guides.press("Enter");
    await expect(guides).toHaveAttribute("aria-pressed", "true");
    await expect(hub.getByRole("link")).toHaveCount(2);
    await expect(hub.getByRole("link").first()).toHaveAttribute("href", `https://neumorphism-ui.andongmin.com/${locale}/docs`);
    await page.locator("#installed-source summary").first().click();
    await expect(page.locator("#installed-source pre").first()).toContainText("overflow-wrap:anywhere");

    await page.setViewportSize(info.project.use.viewport!);
    await page.goto(`/${locale}/templates/dashboard`);
    const dashboard = page.locator('[data-slot="analytics-dashboard"]');
    await expect(dashboard.getByText(copy.intro, { exact: true })).toBeVisible();
    await expect(dashboard.locator('[data-metric="revenue"]')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await dashboard.screenshot({ path: info.outputPath("dashboard.png") });
    await page.setViewportSize({ width: 320, height: 1000 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    await dashboard.screenshot({ path: info.outputPath("dashboard-320.png") });
    expect(errors).toEqual([]);
  });
}

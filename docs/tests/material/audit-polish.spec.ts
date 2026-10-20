import { expect, test } from "@playwright/test";

const labels = {
  en: ["Build duration", "Service latency", "Release activity", "Delivery capacity", "Installation diagnostics"],
  ko: ["빌드 시간", "서비스 지연 시간", "릴리스 활동", "계획·완료 수량", "설치 단계 진단"],
  ja: ["ビルド時間", "サービスの応答時間", "リリースの利用状況", "計画・完了件数", "インストール診断"],
  zh: ["构建耗时", "服务延迟", "版本活动", "计划与完成数量", "安装诊断"],
};
const budgetLabel = { en: "Budget", ko: "목표", ja: "目標", zh: "目标" };
const emptyLabel = { en: "No latency samples.", ko: "지연 시간 데이터가 없습니다.", ja: "応答時間データはありません。", zh: "暂无延迟数据。" };

for (const mode of ["light", "dark"]) for (const width of [320, 390, 1440]) {
  test(`localized chart evidence and OTP states: ${mode} ${width}`, async ({ page, context }, info) => {
    test.setTimeout(120000);
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const locale of ["en", "ko", "ja", "zh"] as const) {
      await page.setViewportSize({width, height:1000});
      await page.goto(`/audit-polish.html?mode=${mode}&locale=${locale}`);
      await page.evaluate(() => document.fonts.ready);
      const charts = page.locator('[data-slot="chart"]');
      await expect(charts).toHaveCount(5);
      for (const [i, label] of labels[locale].entries()) await expect(charts.nth(i).getByRole("heading")).toHaveText(label);
      const build = page.locator('[data-chart="build-duration"]');
      const latency = page.locator('[data-chart="service-latency"]');
      await expect(build.locator('[data-slot="chart-legend"] li')).toHaveCount(3);
      await expect(latency.locator('[data-slot="chart-legend"]')).toContainText(`${budgetLabel[locale]} 300 ms`);
      await expect(latency.locator('[data-slot="chart-legend"] li')).toHaveCount(3);
      await expect(latency.locator('[data-slot="chart-legend"] line[stroke-dasharray="7 4"]')).toHaveCount(1);
      await expect(latency.locator('[data-slot="chart-legend"] line[stroke-dasharray="4 4"]')).toHaveCount(1);
      await latency.screenshot({path:info.outputPath(`latency-${locale}.png`)});
      await build.getByRole("combobox").selectOption("cached");
      await expect(build.locator('[data-slot="chart-legend"] li')).toHaveCount(2);
      await expect(build.locator('.recharts-line')).toHaveCount(1);
      await build.locator("summary").click();
      await expect(build.locator("tbody tr").first()).toHaveText("B1210108102");
      await build.getByRole("combobox").selectOption("both");
      await expect(build.locator('[data-slot="chart-legend"] li')).toHaveCount(3);
      await page.getByRole("button", {name:"Set budget 900"}).click();
      await expect(latency.locator('[data-slot="chart-legend"]')).toContainText(`${budgetLabel[locale]} 900 ms`);
      // SVG horizontal lines have zero-height boxes: inspect their actual stroke and endpoints.
      const budgetLine = latency.locator('.recharts-reference-line line');
      await expect(budgetLine).toHaveCount(1);
      await expect(latency.locator('svg.recharts-surface[role="application"]')).toBeVisible();
      await expect.poll(() => budgetLine.evaluate(element => {
        const line = element as SVGLineElement;
        const svg = line.ownerSVGElement!;
        const matrix = line.getScreenCTM();
        if (!matrix) return false;
        const a = new DOMPoint(line.x1.baseVal.value, line.y1.baseVal.value).matrixTransform(matrix);
        const b = new DOMPoint(line.x2.baseVal.value, line.y2.baseVal.value).matrixTransform(matrix);
        const plot = svg.getBoundingClientRect();
        const style = getComputedStyle(line);
        const ancestors = [];
        for (let node: Element | null = line; node; node = node.parentElement) ancestors.push(getComputedStyle(node));
        return b.x - a.x > plot.width / 2 && Math.abs(a.y - b.y) < 0.1 &&
          a.x >= plot.left && b.x <= plot.right && a.y > plot.top && a.y < plot.bottom &&
          style.stroke !== 'none' && parseFloat(style.strokeWidth) > 0 && parseFloat(style.strokeOpacity) > 0 &&
          ancestors.every(s => s.display !== 'none' && s.visibility === 'visible' && Number(s.opacity) > 0);
      })).toBe(true);
      await latency.screenshot({ path: info.outputPath(`latency-budget-${locale}.png`) });
      await latency.locator("summary").click();
      await expect(latency.locator('tbody tr').first()).toContainText("caller-owned80210");
      const release = page.locator('[data-chart="release-activity"]');
      await expect(release.locator('[data-slot="chart-legend"] li')).toHaveCount(2);
      await release.getByRole("combobox").selectOption("share");
      await expect(release.locator('[data-slot="chart-legend"] li')).toHaveCount(2);
      const delivery = page.locator('[data-chart="delivery-capacity"]');
      await delivery.getByRole("combobox").selectOption("variance");
      await expect(delivery.locator('[data-slot="chart-legend"] li')).toHaveCount(1);
      await delivery.locator("summary").click();
      await expect(delivery.locator("tbody tr").first()).toHaveText("S13228-4");
      const install = page.locator('[data-chart="install-diagnostics"]');
      await install.getByRole("combobox").selectOption("s");
      await install.locator("summary").click();
      await expect(install.locator("tbody tr").first()).toContainText("caller-stage0.12 s");
      for (const legend of await page.locator('[data-slot="chart-legend"]').all()) {
        expect(await legend.evaluate(e => e.scrollWidth - e.clientWidth)).toBeLessThanOrEqual(1);
        const plot = await legend.locator('xpath=ancestor::*[@data-slot="chart-plot"]').boundingBox();
        const bounds = (await legend.boundingBox())!;
        expect(bounds.x).toBeGreaterThanOrEqual(plot!.x - 1);
        expect(bounds.x + bounds.width).toBeLessThanOrEqual(plot!.x + plot!.width + 1);
      }
      const otp = page.getByTestId("otp");
      const first = otp.locator('[data-slot="input-otp-slot"]').first();
      const face = await first.evaluate(e => { const s=getComputedStyle(e);return {border:s.borderTopColor,bg:s.backgroundColor,width:s.borderTopWidth}; });
      expect(face.width).toBe("1px"); expect(face.border).not.toBe("rgba(0, 0, 0, 0)"); expect(face.border).not.toBe(face.bg);
      await otp.screenshot({path:info.outputPath(`otp-empty-${locale}.png`)});
      const input = otp.getByRole("textbox",{name:"Verification code",exact:true});
      await input.focus();
      await expect(first).toHaveAttribute("data-active","true");
      await input.pressSequentially("123456"); await expect(otp.locator("output")).toHaveText("123456");
      await input.press("Backspace"); await expect(otp.locator("output")).toHaveText("12345");
      await input.selectText(); await page.evaluate(() => navigator.clipboard.writeText("246810"));
      await input.press("Control+V"); await expect(otp.locator("output")).toHaveText("246810");
      await expect(otp.getByRole("textbox",{name:"Disabled code",exact:true})).toBeDisabled();
      await otp.screenshot({path:info.outputPath(`otp-filled-${locale}.png`)});
      await page.getByRole("checkbox",{name:"Empty charts"}).check();
      await expect(page.locator('[data-slot="chart-plot"]')).toHaveCount(0);
      await expect(latency.getByRole("status")).toHaveText(emptyLabel[locale]);
      await expect(page.locator('[data-slot="chart-legend"]')).toHaveCount(0);
      await page.getByRole("checkbox",{name:"Empty charts"}).uncheck();
      await expect(page.locator('[data-slot="chart-plot"]')).toHaveCount(5);
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
    }
    expect(errors).toEqual([]);
  });
}

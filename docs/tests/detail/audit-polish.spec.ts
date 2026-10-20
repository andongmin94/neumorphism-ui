import { expect, test } from "@playwright/test";

const titles = {
  en:["Build duration","Service latency","Release activity","Delivery capacity","Installation diagnostics"],
  ko:["빌드 시간","서비스 지연 시간","릴리스 활동","계획·완료 수량","설치 단계 진단"],
  ja:["ビルド時間","サービスの応答時間","リリースの利用状況","計画・完了件数","インストール診断"],
  zh:["构建耗时","服务延迟","版本活动","计划与完成数量","安装诊断"],
};
for (const locale of ["en","ko","ja","zh"] as const) {
  test(`operational chart locale and visible legend: ${locale}`, async ({page},info) => {
    await page.goto(`/${locale}/charts`);
    const gallery=page.locator('[data-slot="operational-chart-gallery"]');
    const charts=gallery.locator('[data-slot="chart"]');
    for(const [i,title] of titles[locale].entries()) await expect(charts.nth(i).getByRole("heading")).toHaveText(title);
    for(const width of [page.viewportSize()!.width,320]) {
      await page.setViewportSize({width,height:1000});
      await expect(charts.nth(1).locator('[data-slot="chart-legend"] li')).toHaveCount(3);
      await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
      await charts.nth(1).screenshot({path:info.outputPath(`latency-${width}.png`)});
    }
    await charts.first().getByRole("combobox").selectOption("cached");
    await expect(charts.first().locator('[data-slot="chart-legend"] li')).toHaveCount(2);
    await charts.first().locator("summary").click();
    await expect(charts.first().locator("tbody tr")).toHaveCount(6);
    await charts.last().getByRole("combobox").selectOption("s");
    await charts.last().locator("summary").click();
    await expect(charts.last().locator("tbody tr")).toHaveCount(4);
  });

  test(`studio shares selection material and preserves theme output: ${locale}`, async ({page},info) => {
    await page.goto(`/${locale}/customize`);
    await expect(page.locator('#theme-settings')).toHaveAttribute('aria-busy','false');
    for(const group of await page.locator('[data-theme-choice]').all()) {
      const buttons=group.getByRole('button');
      await buttons.last().click();
      const selected=group.locator('[aria-pressed="true"]');
      await expect(selected).toHaveCount(1);
      const colors=await selected.evaluate(e=>{const p=document.createElement('span');e.append(p);p.style.color='var(--primary-foreground)';p.style.backgroundColor='var(--primary)';const s=getComputedStyle(e),t=getComputedStyle(p);const values=[s.color,t.color,s.backgroundColor,t.backgroundColor];p.remove();return values;});
      expect(colors[0]).toBe(colors[1]);expect(colors[2]).toBe(colors[3]);
      await selected.click();await expect(group.locator('[aria-pressed="true"]')).toHaveCount(1);
      await buttons.first().focus();await buttons.first().press('ArrowRight');await expect(buttons.nth(1)).toBeFocused();
      await buttons.nth(1).press('Space');await expect(buttons.nth(1)).toHaveAttribute('aria-pressed','true');
    }
    const motion=page.locator('[data-theme-choice="motion"]');
    await motion.getByRole('button').last().click();
    await page.reload();await expect(page.locator('#theme-settings')).toHaveAttribute('aria-busy','false');
    await expect(motion.getByRole('button').last()).toHaveAttribute('aria-pressed','true');
    const output=page.locator('#theme-output');
    await expect(output.locator('pre.shiki')).toContainText('260ms');
    await expect(output.getByRole('heading')).toHaveCSS('font-weight','700');
    for(const width of [page.viewportSize()!.width,320]) {
      await page.setViewportSize({width,height:1000});
      await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
      await page.locator('#theme-settings').screenshot({path:info.outputPath(`settings-${width}.png`)});
      await page.locator('.theme-output-heading').screenshot({path:info.outputPath(`output-${width}.png`)});
    }
    await output.getByRole('tab',{name:'CLI',exact:true}).click();
    await expect(output.locator('pre.shiki').first()).toContainText('shadcn');
    await page.locator('.theme-preview-mode').getByRole('button',{name:'Dark',exact:true}).click();
    await expect(page.locator('[data-theme-price-preview]')).toHaveAttribute('data-preview-mode','dark');
    await page.locator('.theme-studio-panel-heading > button').click();
    await output.getByRole('tab',{name:'CSS',exact:true}).click();
    await expect(output.locator('pre.shiki')).toContainText('180ms');
  });

  test(`dashboard demo controls follow the product and still restore data: ${locale}`,async({page},info)=>{
    await page.goto(`/${locale}/templates/dashboard`);
    const dashboard=page.locator('[data-slot="analytics-dashboard"]');
    const controls=page.locator('[data-demo-controls]');
    await expect(controls).toHaveCount(1);
    expect(await dashboard.evaluate(e=>Boolean(e.compareDocumentPosition(document.querySelector('[data-demo-controls]')!)&Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
    const value=await dashboard.locator('[data-metric="revenue"]').textContent();
    await controls.getByRole('checkbox').check();
    await expect(dashboard.locator('[data-metric="revenue"]')).toHaveText('—');
    await expect(dashboard.locator('header button')).toBeDisabled();
    await controls.getByRole('checkbox').uncheck();
    await expect(dashboard.locator('[data-metric="revenue"]')).toHaveText(value!);
    await dashboard.locator(':scope > header').screenshot({path:info.outputPath('dashboard-heading.png')});
  });
}

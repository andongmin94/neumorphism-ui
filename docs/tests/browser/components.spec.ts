import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const expanded = ["alert-dialog", "popover", "hover-card", "sheet", "collapsible", "toggle", "toggle-group", "toolbar", "field", "fieldset", "form", "number-field", "meter", "combobox", "command", "context-menu", "drawer", "input-otp", "carousel", "resizable", "sidebar", "image-card", "marquee"];
const localized = ["ko", "ja", "zh"].flatMap(locale => ["form", "combobox", "sidebar"].map(slug => ({ locale, slug })));
const cases = [...expanded.map(slug => ({ locale: "en", slug })), ...localized];

for (const [locale, loading] of [["en", "Loading content"], ["ko", "콘텐츠 로딩 중"], ["ja", "コンテンツを読み込み中"], ["zh", "正在加载内容"]]) {
  test(`${locale}: skeleton preview and source expose localized loading status`, async ({ page }) => {
    await page.goto(`/${locale}/components/skeleton`);
    const preview = page.locator("#preview");
    await expect(preview.locator(".component-example")).toHaveAttribute("aria-busy", "false");
    const status = preview.getByRole("status");
    await expect(status).toBeVisible();
    await expect(status).toMatchAriaSnapshot(`- status: ${loading}`);
    await preview.getByRole("tab").nth(1).click();
    const source = await preview.locator("pre").innerText();
    expect(source).toContain('role="status"');
    expect(source).toContain('<span className="sr-only">{copy.skeleton.loading}</span>');
    expect(source).toContain(`"loading": "${loading}"`);
  });
}

for (const [locale, waiting] of [["en", "Waiting for data"], ["ko", "데이터 대기 중"], ["ja", "データを待機中"], ["zh", "等待数据"]]) {
  test(`${locale}: indeterminate progress preview and source use localized value text`, async ({ page }) => {
    await page.goto(`/${locale}/components/progress`);
    const preview = page.locator("#preview");
    await expect(preview.locator(".component-example")).toHaveAttribute("aria-busy", "false");
    const progress = preview.getByRole("progressbar", { name: waiting, exact: true });
    await expect(progress).toHaveAttribute("data-indeterminate", "");
    await expect(progress).toHaveAttribute("aria-valuetext", waiting);
    await expect(progress).not.toHaveAttribute("aria-valuenow");
    await preview.getByRole("tab").nth(1).click();
    const source = await preview.locator("pre").innerText();
    expect(source).toContain("aria-valuetext={copy.progress.waiting}");
    expect(source).toContain(`"waiting": "${waiting}"`);
  });
}

for (const [locale, minimumLabel, maximumLabel] of [
  ["en", "Minimum price", "Maximum price"],
  ["ko", "최저 가격", "최고 가격"],
  ["ja", "最低価格", "最高価格"],
  ["zh", "最低价格", "最高价格"],
]) {
  test(`${locale}: range slider preview and source describe the displayed currency values`, async ({ page }) => {
    await page.goto(`/${locale}/components/slider`);
    const preview = page.locator("#preview");
    await expect(preview.locator(".component-example")).toHaveAttribute("aria-busy", "false");
    const minimum = preview.getByRole("slider", { name: minimumLabel, exact: true });
    const maximum = preview.getByRole("slider", { name: maximumLabel, exact: true });
    const currency = new Intl.NumberFormat(locale, { style: "currency", currency: "KRW", maximumFractionDigits: 0 });
    await expect(minimum).toHaveAttribute("aria-valuenow", "32");
    await expect(minimum).toHaveAttribute("aria-valuetext", currency.format(32000));
    await expect(maximum).toHaveAttribute("aria-valuenow", "72");
    await expect(maximum).toHaveAttribute("aria-valuetext", currency.format(72000));

    await minimum.press("ArrowRight");
    await expect(minimum).toHaveAttribute("aria-valuenow", "33");
    await expect(minimum).toHaveAttribute("aria-valuetext", currency.format(33000));
    await expect(maximum).toHaveAttribute("aria-valuetext", currency.format(72000));
    await expect(preview.getByText("₩33K – ₩72K", { exact: true })).toBeVisible();
    await maximum.press("ArrowLeft");
    await expect(maximum).toHaveAttribute("aria-valuenow", "71");
    await expect(maximum).toHaveAttribute("aria-valuetext", currency.format(71000));
    await expect(preview.getByText("₩33K – ₩71K", { exact: true })).toBeVisible();

    await preview.getByRole("tab").nth(1).click();
    const source = await preview.locator("pre").innerText();
    expect(source).toContain(`new Intl.NumberFormat("${locale}",`);
    expect(source).toContain('currency: "KRW"');
    expect(source).toContain("getAriaValueText={(_, value) => priceFormatter.format(value * 1000)}");
  });
}

for (const [locale, inputError, textareaError] of [
  ["en", "Enter a valid email address.", "Add more detail to this note."],
  ["ko", "올바른 이메일 주소를 입력하세요.", "메모에 내용을 더 자세히 작성하세요."],
  ["ja", "有効なメールアドレスを入力してください。", "メモの内容をもう少し詳しく入力してください。"],
  ["zh", "请输入有效的电子邮件地址。", "请为笔记补充更多详细信息。"],
]) {
  test(`${locale}: invalid input and textarea previews describe their errors`, async ({ page }) => {
    for (const [slug, error] of [["input", inputError], ["textarea", textareaError]]) {
      await page.goto(`/${locale}/components/${slug}`);
      const preview = page.locator("#preview");
      await expect(preview.locator(".component-example")).toHaveAttribute("aria-busy", "false");
      const field = preview.locator(`${slug}[aria-invalid="true"]`);
      await expect(field).toHaveAccessibleDescription(error);
      const description = preview.locator(`#docs-${slug}-error`);
      await expect(description).toBeVisible();
      await expect(description).toHaveText(error);
      await preview.getByRole("tab").nth(1).click();
      const source = await preview.locator("pre").innerText();
      expect(source).toContain(`aria-describedby="docs-${slug}-error"`);
      expect(source).toContain(`<p id="docs-${slug}-error"`);
      expect(source).toContain(`"error": "${error}"`);
    }
  });
}

for (const locale of ["en", "ko", "ja", "zh"]) {
  test(`${locale}: hover-card profile links work without opening the preview`, async ({ page }, info) => {
    await page.goto(`/${locale}/components/hover-card`);
    const preview = page.locator("#preview");
    await expect(preview.locator(".component-example")).toHaveAttribute("aria-busy", "false");
    const trigger = preview.locator('[data-component-stage] a[href^="#"]');
    const profile = preview.getByRole("region", { name: "Alex Kim", exact: true });
    const popup = page.locator('[data-slot="hover-card-content"]');
    const href = await trigger.getAttribute("href");
    expect(href).toBeTruthy();
    await expect(profile).toHaveAttribute("id", href!.slice(1));
    await expect(profile).toBeVisible();
    await expect(popup).toHaveCount(0);

    if (info.project.use.isMobile) await trigger.tap();
    else await trigger.press("Enter");
    await expect(page).toHaveURL(url => decodeURIComponent(url.hash) === href);
    await expect(profile).toBeFocused();
    await expect(profile).toBeVisible();

    if (!info.project.use.isMobile) {
      await trigger.hover();
      await expect(popup).toBeVisible();
      await page.mouse.move(0, 0);
      await expect(popup).toBeHidden();
    }
    await expect(profile).toBeVisible();
    await expect(profile).toHaveAttribute("id", href!.slice(1));
  });
}

for (const { locale, slug } of cases) {
  test(`${locale}/${slug}: hydrated preview, source tab, and reflow`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    const response = await page.goto(`/${locale}/components/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    const preview = page.locator("#preview");
    await expect(preview.locator('[role="tabpanel"]').first()).toBeVisible();
    if (slug === "sidebar") {
      await expect(preview.locator(".component-example")).toHaveAttribute("aria-busy", "false");
      await expect(page.locator("main")).toHaveCount(1);
    }
    await page.evaluate(() => document.fonts.ready);
    const tabs = preview.getByRole("tab");
    await tabs.nth(1).click();
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(preview.locator("pre")).toBeVisible();
    if (slug === "sidebar") await expect(preview.locator("pre")).toContainText("<SidebarInset render={<div");
    await tabs.nth(0).click();
    await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
    await preview.scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const clipped = await preview.locator("button,input,[role=combobox]").evaluateAll(elements => elements.filter(element => {
      const box = element.getBoundingClientRect();
      return box.width > 0 && box.height > 0 && (box.left < -1 || box.right > innerWidth + 1);
    }).map(element => element.outerHTML));
    expect(clipped).toEqual([]);
    await page.screenshot({ path: info.outputPath("preview.png"), fullPage: false });
    expect(errors).toEqual([]);
  });
}

for (const [locale, label, prompt] of [
  ["en", "Document tools", "Right-click, or focus the target and press Shift+F10 to choose an action."],
  ["ko", "문서 도구", "오른쪽 클릭하거나 대상에 초점을 맞춘 뒤 Shift+F10을 눌러 작업을 선택하세요."],
  ["ja", "文書ツール", "右クリックするか、対象にフォーカスして Shift+F10 を押し、操作を選択してください。"],
  ["zh", "文档工具", "右键单击，或聚焦目标后按 Shift+F10 选择操作。"],
]) {
  test(`${locale}: context-menu preview supports keyboard access and labels its action group`, async ({ page }) => {
    await page.goto(`/${locale}/components/context-menu`);
    const preview = page.locator("#preview");
    await expect(preview.locator(".component-example")).toHaveAttribute("aria-busy", "false");
    const trigger = preview.locator('[data-slot="context-menu-trigger"]');
    const group = page.locator('[data-slot="context-menu-content"]').getByRole("group", { name: label, exact: true });
    await expect(preview.getByRole("status")).toHaveText(prompt);
    const restingShadow = await trigger.evaluate(node => getComputedStyle(node).boxShadow);
    const panel = preview.getByRole("tabpanel");
    await panel.focus();
    await expect(panel).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(trigger).toBeFocused();
    await expect(trigger).not.toHaveCSS("box-shadow", restingShadow);
    await page.keyboard.press("Shift+F10");
    await expect(group).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(group).toBeHidden();
    await expect(trigger).toBeFocused();

    await trigger.click({ button: "right" });
    await expect(group).toBeVisible();
    const labelId = await group.locator('[data-slot="context-menu-label"]').getAttribute("id");
    expect(labelId).toBeTruthy();
    await expect(group).toHaveAttribute("aria-labelledby", labelId!);
    await expect(group.getByRole("menuitem")).toHaveCount(1);
    const toggle = group.getByRole("menuitemcheckbox");
    await toggle.press("Enter");
    await expect(group).toBeHidden();
    await trigger.click({ button: "right" });
    await expect(group).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    await page.keyboard.press("Escape");
    await expect(group).toBeHidden();
    await preview.getByRole("tab").nth(1).click();
    const source = await preview.locator("pre").innerText();
    expect(source).toContain("<ContextMenuTrigger tabIndex={0}");
    expect(source).toContain("focus-visible:ring-2 focus-visible:ring-[var(--ring)]");
    expect(source).toContain(prompt);
  });
}

test("local pagination removes unavailable boundary destinations and tab stops", async ({ page }) => {
  await page.goto("/en/components/pagination");
  const preview = page.locator("#preview");
  await expect(preview.locator(".component-example")).toHaveAttribute("aria-busy", "false");
  const navigation = preview.locator('[data-slot="pagination"]');
  const previous = navigation.locator('[data-slot="pagination-link"]').first();
  const next = navigation.locator('[data-slot="pagination-link"]').last();
  const current = navigation.locator('[aria-current="page"]');
  const url = page.url();

  await expect(current).toHaveText("2");
  await expect(previous).toHaveAttribute("href", "#pagination-example");
  await expect(next).toHaveAttribute("href", "#pagination-example");

  for (const [number, boundary, opposite, tabKey] of [
    ["1", previous, next, "Shift+Tab"],
    ["3", next, previous, "Tab"],
  ] as const) {
    const pageLink = navigation.getByRole("link", { name: number, exact: true });
    await pageLink.click();
    await expect(current).toHaveText(number);
    await expect(boundary).toHaveAttribute("aria-disabled", "true");
    await expect(boundary).not.toHaveAttribute("href");
    await expect(boundary).toHaveAttribute("tabindex", "-1");
    await expect(opposite).toHaveAttribute("href", "#pagination-example");
    await pageLink.press(tabKey);
    expect(await navigation.evaluate(element => element.contains(document.activeElement))).toBe(false);

    await boundary.click({ force: true });
    await boundary.press("Enter");
    const popup = page.waitForEvent("popup", { timeout: 500 }).then(() => true, () => false);
    await boundary.click({ button: "middle", force: true });
    expect(await popup).toBe(false);
    await expect(page).toHaveURL(url);
    await expect(current).toHaveText(number);

    await opposite.click();
    await expect(current).toHaveText("2");
    await expect(boundary).toHaveAttribute("href", "#pagination-example");
    await expect(boundary).not.toHaveAttribute("tabindex");
  }
});

test("dropdown theme selection survives closing and reopening its menus", async ({ page }) => {
  await page.goto("/en/components/dropdown-menu");
  const trigger = page.locator("#preview").getByRole("button", { name: "Workspace menu", exact: true });
  const menu = page.locator('[data-slot="dropdown-menu-content"]');
  const theme = menu.getByRole("menuitem", { name: "Theme", exact: true });
  const submenu = page.locator('[data-slot="dropdown-menu-sub-content"]');
  const dark = submenu.getByRole("menuitemradio", { name: "Dark", exact: true });
  const system = submenu.getByRole("menuitemradio", { name: "System", exact: true });
  await trigger.click();
  await theme.press("ArrowRight");
  await expect(system).toHaveAttribute("aria-checked", "true");
  await dark.click();
  await expect(dark).toHaveAttribute("aria-checked", "true");
  await dark.press("Escape");
  await page.keyboard.press("Escape");
  await expect(submenu).toHaveCount(0);
  await expect(menu).toHaveCount(0);

  await trigger.click();
  await theme.press("ArrowRight");
  await expect(dark).toHaveAttribute("aria-checked", "true");
  await expect(system).toHaveAttribute("aria-checked", "false");
});

test("marquee fills each cycle without a blank tail and respects reduced motion", async ({ page }) => {
  await page.goto("/en/components/marquee");
  const marquee = page.locator('#preview [data-slot="marquee"]');
  const track = marquee.locator('[data-slot="marquee-track"]');
  const toggle = marquee.locator('[data-slot="marquee-toggle"]');
  await expect(marquee).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await expect(toggle).toBeHidden();
  await expect(marquee.locator('[data-slot="marquee-copy"]')).toBeHidden();
  await expect(track).toHaveCSS("animation-name", "none");

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(toggle).toBeVisible();
  await expect(track).toHaveCSS("animation-play-state", "running");
  await toggle.click();
  await expect(toggle).toHaveAccessibleName("Resume animation");
  await expect(track).toHaveCSS("animation-play-state", "paused");

  const cycle = await marquee.evaluate(element => {
    const viewport = element.querySelector('[data-slot="marquee-viewport"]')!.getBoundingClientRect();
    const trackElement = element.querySelector('[data-slot="marquee-track"]')!;
    const original = element.querySelector('[data-slot="marquee-items"]')!;
    const copy = element.querySelector('[data-slot="marquee-copy"]')!;
    const animation = trackElement.getAnimations()[0];
    animation.currentTime = 0;
    const items = Array.from(original.children, item => item.getBoundingClientRect());
    const copyStart = copy.firstElementChild!.getBoundingClientRect();
    const gaps = items.slice(1).map((item, index) => item.left - items[index].right);
    gaps.push(copyStart.left - items.at(-1)!.right);
    const originalWidth = original.getBoundingClientRect().width;
    const copyWidth = copy.getBoundingClientRect().width;
    const trackWidth = trackElement.getBoundingClientRect().width;
    animation.currentTime = Number(animation.effect!.getTiming().duration) - 1;
    return {
      viewportWidth: viewport.width, originalWidth, copyWidth, trackWidth,
      gapSpread: Math.max(...gaps) - Math.min(...gaps),
      loopOffset: copy.firstElementChild!.getBoundingClientRect().left - items[0].left,
      blankTail: viewport.right - copy.getBoundingClientRect().right,
    };
  });
  expect(cycle.originalWidth).toBeGreaterThanOrEqual(cycle.viewportWidth - 1);
  expect(Math.abs(cycle.originalWidth - cycle.copyWidth)).toBeLessThanOrEqual(1);
  expect(Math.abs(cycle.trackWidth / 2 - cycle.originalWidth)).toBeLessThanOrEqual(1);
  expect(cycle.gapSpread).toBeLessThanOrEqual(1);
  expect(Math.abs(cycle.loopOffset)).toBeLessThanOrEqual(1);
  expect(cycle.blankTail).toBeLessThanOrEqual(1);

  await toggle.press("Space");
  await expect(track).toHaveCSS("animation-play-state", "running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(toggle).toBeHidden();
  await expect(track).toHaveCSS("animation-name", "none");
  const clippedItems = await marquee.evaluate(element => {
    const viewport = element.querySelector('[data-slot="marquee-viewport"]')!.getBoundingClientRect();
    return Array.from(element.querySelectorAll('[data-slot="marquee-items"] > *')).filter(item => {
      const box = item.getBoundingClientRect();
      return box.left < viewport.left - 1 || box.right > viewport.right + 1 || box.bottom > viewport.bottom + 1;
    }).length;
  });
  expect(clippedItems).toBe(0);
});

test("documented form recovers from errors and restores its saved value", async ({ page }, info) => {
  await page.goto("/en/components/form");
  const form = page.locator('#preview [data-slot="form"]');
  const input = form.getByRole("textbox");
  await input.fill("");
  await form.getByRole("button", { name: "Save changes" }).click();
  await expect(input).toHaveAttribute("aria-invalid", "true");
  await expect(form.getByText("Enter a name.", { exact: true })).toBeVisible();
  expect(await input.evaluate(element => (element.getAttribute("aria-describedby") ?? "").split(/\s+/).filter(Boolean).every(id => document.getElementById(id)))).toBe(true);
  await input.fill("Min");
  await form.getByRole("button", { name: "Save changes" }).click();
  await expect(form.getByRole("status")).toHaveText("Local example saved.");
  await input.fill("Uncommitted");
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(input).toHaveValue("Min");
  await expect(form.getByRole("status")).toHaveText("Saved state");
  await form.screenshot({ path: info.outputPath("form-saved.png") });
});

test("Theme Studio preset, exported CSS, and persisted settings agree", async ({ page }, info) => {
  await page.goto("/en/customize");
  const controls = page.locator("#theme-settings");
  await expect(controls).toHaveAttribute("aria-busy", "false");
  await controls.getByRole("button", { name: "Sage", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-custom-theme", "sage");
  const item = JSON.parse(fs.readFileSync(path.resolve("public/r/style-sage.json"), "utf8"));
  const tokens = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);
    return { mode: document.documentElement.dataset.theme, radius: style.getPropertyValue("--neu-radius-control").trim(), primary: style.getPropertyValue("--primary").trim(), muted: style.getPropertyValue("--muted").trim() };
  });
  expect(tokens.radius).toBe(item.cssVars[tokens.mode!]["neu-radius-control"]);
  expect(tokens.primary).toBe(item.cssVars[tokens.mode!].primary);
  expect(tokens.muted).toBe(item.cssVars[tokens.mode!].muted);
  const exportedCss = await page.locator("#theme-output pre").textContent();
  for (const mode of ["light", "dark"]) {
    for (const [name, value] of Object.entries(item.cssVars[mode])) {
      expect(exportedCss).toContain(`--${name}: ${value};`);
    }
  }
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-custom-theme", "sage");
  await expect(controls.getByRole("button", { name: "Sage", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.screenshot({ path: info.outputPath("theme-sage.png"), fullPage: true });
});

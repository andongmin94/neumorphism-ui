import { expect, test, type Locator, type Page } from "@playwright/test";

async function choosePillTheme(page: Page, radius: 8 | 32, preset = radius === 8 ? "Graphite" : "Sage") {
  await page.goto("/en/customize");
  const controls = page.locator("#theme-settings");
  await expect(controls).toHaveAttribute("aria-busy", "false");
  await controls.getByRole("button", { name: preset, exact: true }).click();
  await controls.getByRole("button", { name: "Pill", exact: true }).click();
  const slider = controls.getByRole("slider", { name: "Surface radius", exact: true });
  await slider.focus();
  await slider.press(radius === 8 ? "Home" : "End");
  await expect(controls.locator(".theme-radius-control output")).toHaveText(`${radius}px`);
}

async function componentStage(page: Page, slug: string) {
  await page.goto(`/en/components/${slug}`);
  await expect(page.locator(".component-example")).toHaveAttribute("aria-busy", "false");
  return page.locator("[data-component-stage]");
}

async function expectSurface(surface: Locator, radius: number) {
  await expect(surface).toBeVisible();
  const corner = await surface.evaluate(node => Number.parseFloat(getComputedStyle(node).borderTopLeftRadius));
  expect(corner, "multiline surfaces must retain bounded corners under pill controls").toBeGreaterThan(0);
  expect(corner).toBeLessThanOrEqual(radius);
}

async function expectCapsule(control: Locator) {
  const cornerInset = await control.evaluate(node => {
    const box = node.getBoundingClientRect();
    return Number.parseFloat(getComputedStyle(node).borderTopLeftRadius) - Math.min(box.width, box.height) / 2;
  });
  expect(cornerInset, "pill controls must curve around their short edge").toBeGreaterThanOrEqual(-1);
}

test("pill accordion expands without clipping its first character or answer", async ({ page }, info) => {
  for (const radius of [8, 32] as const) {
    await choosePillTheme(page, radius);
    const stage = await componentStage(page, "accordion");
    const item = stage.locator('[data-slot="accordion-item"]').first();
    const trigger = item.getByRole("button");
    await trigger.scrollIntoViewIfNeeded();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await stage.screenshot({ path: info.outputPath(`pill-accordion-${radius}.png`) });
    await expectSurface(item, radius);
    // A visible bounding box alone does not detect text cut off by a rounded overflow clip.
    expect(await trigger.evaluate(element => {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      let text: Node | null;
      while ((text = walker.nextNode())) {
        const offset = text.textContent?.search(/\S/) ?? -1;
        if (offset < 0) continue;
        const range = document.createRange();
        range.setStart(text, offset);
        range.setEnd(text, offset + 1);
        const box = range.getBoundingClientRect();
        return element.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2));
      }
      return false;
    })).toBe(true);
    await trigger.focus();
    await trigger.press("Space");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await trigger.press("Space");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(item.locator('[data-slot="accordion-content"]')).toContainText("surface, shadow, and radius tokens");
  }
});

test("pill alert notices keep readable title and body surfaces at both radius limits", async ({ page }, info) => {
  for (const radius of [8, 32] as const) {
    await choosePillTheme(page, radius);
    const stage = await componentStage(page, "alert");
    const alerts = stage.getByRole("alert");
    await expect(alerts).toHaveCount(3);
    await stage.screenshot({ path: info.outputPath(`pill-notices-${radius}.png`) });
    for (const alert of await alerts.all()) {
      await expectSurface(alert, radius);
      await expect(alert.locator('[data-slot="alert-title"]')).toBeVisible();
      await expect(alert.locator('[data-slot="alert-description"]')).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  }
});

test("pill compound fields preserve multiline editing and rounded actions", async ({ page }, info) => {
  for (const radius of [8, 32] as const) {
    await choosePillTheme(page, radius);
    const stage = await componentStage(page, "input-group");
    const group = stage.locator('[data-slot="input-group"]').filter({ has: page.locator("textarea") });
    const message = group.getByRole("textbox");
    await message.fill("First line remains editable.\nSecond line remains inside the surface.");
    await message.press("Tab");
    const send = group.getByRole("button", { name: "Send", exact: true });
    await expect(send).toBeFocused();
    await expect(message).toHaveValue(/First line.*\nSecond line/);
    await group.screenshot({ path: info.outputPath(`pill-multiline-field-${radius}.png`) });
    await expectSurface(group, radius);
    await expectCapsule(send);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  }
  const stage = await componentStage(page, "number-field");
  const group = stage.locator('[data-slot="number-field-group"]');
  const input = group.locator("input");
  const increment = group.locator('[data-slot="number-field-increment"]');
  const decrement = group.locator('[data-slot="number-field-decrement"]');
  await increment.click();
  await expect(input).toHaveValue("4");
  await decrement.focus();
  await decrement.press("Space");
  await expect(input).toHaveValue("3");
  for (const control of [group, increment, decrement]) await expectCapsule(control);
  await group.screenshot({ path: info.outputPath("pill-number-field.png") });
});

test("saved pill themes reach portal surfaces without disrupting keyboard selection", async ({ page }, info) => {
  await choosePillTheme(page, 32);
  const stage = await componentStage(page, "combobox");
  await expect(page.locator("html")).toHaveAttribute("data-custom-theme", "sage");
  const input = stage.getByRole("combobox");
  await input.fill("Lon");
  const popup = page.locator('[data-slot="combobox-content"]');
  await expect(popup.getByRole("option", { name: "London", exact: true })).toBeVisible();
  await expectSurface(popup, 32);
  await input.press("ArrowDown");
  await input.press("Enter");
  await expect(input).toHaveValue("London");
  await expect(popup).toBeHidden();
  await expect(input).toBeFocused();

  const popoverStage = await componentStage(page, "popover");
  const trigger = popoverStage.getByRole("button");
  await expectCapsule(trigger);
  await trigger.click();
  const content = page.locator('[data-slot="popover-content"]');
  await expectSurface(content, 32);
  const box = (await content.boundingBox())!;
  expect(box.x).toBeGreaterThanOrEqual(-1);
  expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
  await page.screenshot({ path: info.outputPath("pill-portal.png") });
  await page.keyboard.press("Escape");
  await expect(content).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("navigation menu stays still after keyboard opening near the viewport edge", async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await choosePillTheme(page, 32, "Air");
  const stage = await componentStage(page, "navigation-menu");
  await page.evaluate(() => document.fonts.ready);
  await stage.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const trigger = stage.locator('[data-slot="navigation-menu-trigger"]');
  await trigger.focus();
  await trigger.press("ArrowDown");
  const popup = page.locator('[data-slot="navigation-menu-popup"]');
  await expect(popup).toBeVisible();
  const frames = await popup.evaluate(async element => {
    const samples: { x: number; y: number; width: number; height: number }[] = [];
    // Allow initial placement, then observe the resting menu over several painted frames.
    for (let frame = 0; frame < 20; frame++) {
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      if (frame < 4) continue;
      const { x, y, width, height } = element.getBoundingClientRect();
      samples.push({ x, y, width, height });
    }
    return samples;
  });
  await info.attach("navigation-resting-frames", { body: JSON.stringify(frames), contentType: "application/json" });
  await page.screenshot({ path: info.outputPath("navigation-menu-resting.png") });
  for (const dimension of ["x", "y", "width", "height"] as const) {
    const values = frames.map(frame => frame[dimension]);
    expect(Math.max(...values) - Math.min(...values), `resting menu ${dimension} must not oscillate`).toBeLessThanOrEqual(1);
  }
  for (const frame of frames) {
    expect(frame.x).toBeGreaterThanOrEqual(0);
    expect(frame.y).toBeGreaterThanOrEqual(0);
    expect(frame.x + frame.width).toBeLessThanOrEqual(390);
    expect(frame.y + frame.height).toBeLessThanOrEqual(844);
  }
  await page.keyboard.press("Escape");
  await expect(popup).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.press("ArrowDown");
  await expect(popup).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(popup.getByRole("link", { name: "Components", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(popup).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("pill chart tooltips retain a readable overlay while keyboard data changes", async ({ page }, info) => {
  await choosePillTheme(page, 32);
  await page.goto("/en/charts");
  const plot = page.locator('[data-slot="chart-plot"]').first();
  const chart = plot.locator("svg.recharts-surface");
  await chart.focus();
  await chart.press("ArrowRight");
  const tooltip = plot.locator(".recharts-default-tooltip");
  await expect(tooltip).toBeVisible();
  const first = await tooltip.textContent();
  await plot.screenshot({ path: info.outputPath("pill-chart-tooltip.png") });
  await expectSurface(tooltip, 32);
  await chart.press("ArrowRight");
  await expect(tooltip).not.toHaveText(first!);
  await expect(chart).toBeFocused();
});

test("planned delivery legend stays distinguishable on a dark themed surface", async ({ page }, info) => {
  await choosePillTheme(page, 32);
  if (await page.locator("html").getAttribute("data-theme") !== "dark") await page.locator(".theme-toggle").click();
  await page.goto("/en/charts");
  const chart = page.locator('[data-chart="delivery-capacity"]');
  const planned = chart.locator('[data-slot="chart-legend"] li').filter({ hasText: /^Planned$/ });
  await expect(planned).toBeVisible();
  const paint = await planned.locator("svg").evaluate(svg => {
    const context = document.createElement("canvas").getContext("2d")!;
    const rgba = (color: string) => {
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = color;
      context.fillRect(0, 0, 1, 1);
      return [...context.getImageData(0, 0, 1, 1).data];
    };
    let background = [255, 255, 255, 255];
    for (let node = svg.parentElement; node; node = node.parentElement) {
      const color = rgba(getComputedStyle(node).backgroundColor);
      if (color[3] === 255) { background = color; break; }
    }
    const glyph = svg.querySelector("line,path")!;
    const style = getComputedStyle(glyph);
    const stroke = style.stroke !== "none";
    const foreground = rgba(stroke ? style.stroke : style.fill);
    const opacity = Number(style.opacity) * Number(stroke ? style.strokeOpacity : style.fillOpacity) * foreground[3] / 255;
    const painted = foreground.slice(0, 3).map((channel, index) => channel * opacity + background[index] * (1 - opacity));
    const luminance = (channels: number[]) => channels.slice(0, 3).map(channel => {
      const value = channel / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    }).reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
    const a = luminance(painted), b = luminance(background);
    return { contrast: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05), dash: style.strokeDasharray };
  });
  await info.attach("planned-legend-paint", { body: JSON.stringify(paint), contentType: "application/json" });
  await chart.screenshot({ path: info.outputPath("dark-planned-legend.png") });
  expect(paint.contrast, "the graphical key must be visible against its actual surface").toBeGreaterThanOrEqual(3);
  expect(paint.dash).not.toBe("none");
});

test("template fragment links clear the fixed docs header at 320px", async ({ page }, info) => {
  await page.setViewportSize({ width: 320, height: 844 });
  for (const [slug, targets] of [["portfolio", ["portfolio-work", "portfolio-contact", "portfolio-top"]], ["blog-post", ["blog-post-top"]]] as const) {
    await page.goto(`/en/templates/${slug}`);
    const canvas = page.locator("[data-template-canvas]");
    for (const id of targets) {
      await canvas.locator(`a[href="#${id}"]`).last().click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect.poll(async () => {
        const target = (await canvas.locator(`#${id}`).boundingBox())!;
        const header = (await page.locator(".site-header").boundingBox())!;
        return target.y - header.y - header.height;
      }, { message: `${id} must remain readable below the fixed header` }).toBeGreaterThanOrEqual(8);
      const top = (await canvas.locator(`#${id}`).boundingBox())!.y;
      expect(top).toBeLessThan(844 / 2);
    }
    await page.screenshot({ path: info.outputPath(`${slug}-fragment-320.png`) });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  }
});

test("navigation example links reveal every destination below the fixed header at 320px", async ({ page }, info) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/ko/components/navigation-menu");
  await expect(page.locator(".component-example")).toHaveAttribute("aria-busy", "false");
  const stage = page.locator("[data-component-stage]");
  const trigger = stage.locator('[data-slot="navigation-menu-trigger"]');
  const popup = page.locator('[data-slot="navigation-menu-popup"]');

  for (const name of ["안내", "컴포넌트", "테마"] as const) {
    await stage.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    if (name !== "안내") {
      await trigger.focus();
      await trigger.press("ArrowDown");
      await expect(popup).toBeVisible();
      await page.keyboard.press("Tab");
      if (name === "테마") await page.keyboard.press("Tab");
    }
    const link = (name === "안내" ? stage : popup).getByRole("link", { name, exact: true });
    const href = (await link.getAttribute("href"))!;
    if (name === "안내") await link.click();
    else {
      await expect(link).toBeFocused();
      await link.press("Enter");
    }
    await expect.poll(() => new URL(page.url()).hash).toBe(href);
    if (name !== "안내") {
      await page.keyboard.press("Escape");
      await expect(popup).toBeHidden();
    }
    const destination = stage.locator(`p[id="${href.slice(1)}"]`);
    await expect.poll(async () => {
      const target = (await destination.boundingBox())!;
      const header = (await page.locator(".site-header").boundingBox())!;
      return target.y - header.y - header.height;
    }, { message: `${name} destination must clear the fixed header` }).toBeGreaterThanOrEqual(8);
    expect((await destination.boundingBox())!.y).toBeLessThan(844 / 2);
    await page.screenshot({ path: info.outputPath(`navigation-${name}-destination-320.png`) });
  }

  await stage.scrollIntoViewIfNeeded();
  await trigger.focus();
  await trigger.press("ArrowDown");
  await expect(popup).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(popup.getByRole("link", { name: "컴포넌트", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(popup).toBeHidden();
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

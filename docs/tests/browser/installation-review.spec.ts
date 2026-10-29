import { expect, test } from "@playwright/test";

test("manual source loads on demand and reuses the loaded dependency bundle", async ({ page }) => {
  const requests: string[] = [];
  await page.route("**/r/*.json", route => {
    requests.push(new URL(route.request().url()).pathname);
    return route.continue();
  });
  await page.goto("/en/components/button");
  const installation = page.locator("#installation");
  const manual = installation.getByRole("tab", { name: "Component source", exact: true });
  await expect(manual).toBeEnabled();
  expect(requests).toEqual([]);
  await manual.click();
  await expect(installation.locator(".component-manual-meta")).toBeVisible();
  expect([...requests].sort()).toEqual(["/r/button.json", "/r/neumorphism-ui.json", "/r/utils.json"]);
  await installation.getByRole("tab", { name: "CLI", exact: true }).click();
  await manual.click();
  await expect(installation.locator(".component-manual-meta")).toBeVisible();
  expect(requests).toHaveLength(3);
});

test("manual Sidebar source resolves the hook path used by its component", async ({ page }) => {
  await page.goto("/en/components/sidebar");
  const installation = page.locator("#installation");
  await installation.getByRole("tab", { name: "Component source", exact: true }).click();
  await expect(installation.locator(".component-manual-meta")).toBeVisible();

  const targets = installation.locator(".component-source-file-heading > span");
  await expect(targets).toContainText([
    "lib/utils.ts",
    "components/ui/sidebar.tsx",
    "hooks/use-mobile.ts",
  ]);
  expect(await targets.allTextContents()).not.toEqual(expect.arrayContaining([
    expect.stringMatching(/^@/),
  ]));
  await expect(installation.locator(".component-source-file").filter({
    has: page.locator(".component-source-file-heading > span", { hasText: /^components\/ui\/sidebar\.tsx$/ }),
  }).locator("pre")).toContainText('@/hooks/use-mobile');
});

test("a failed source request can be retried on the same component page", async ({ page }) => {
  let attempts = 0;
  await page.route("**/r/field.json", route => {
    attempts += 1;
    return attempts === 1 ? route.fulfill({ status: 503, body: "Unavailable" }) : route.continue();
  });
  await page.goto("/en/components/field");
  const installation = page.locator("#installation");
  await installation.getByRole("tab", { name: "Component source", exact: true }).click();
  await expect(installation.getByRole("alert")).toBeVisible();
  await installation.getByRole("button", { name: "Reload source", exact: true }).click();
  await expect(installation.locator(".component-manual-meta")).toBeVisible();
  await expect(installation.getByRole("alert")).toHaveCount(0);
  expect(attempts).toBe(2);
});

for (const locale of ["ko", "en", "ja", "zh"]) {
  test(`${locale}: manual installation includes font CSS and Button code matches its preview`, async ({ page }) => {
    await page.goto(`/${locale}/components/button`);
    const example = page.locator(".component-example");
    const preview = example.locator(".component-example-panel");
    await expect(preview.locator('[data-slot="button"]')).toHaveCount(10);
    const names = await preview.locator('[data-slot="button"]').evaluateAll(buttons => buttons.map(button => button.getAttribute("aria-label") ?? button.textContent!.trim()));
    await example.getByRole("tab").nth(1).click();
    const code = await example.locator(".component-example-code pre").textContent();
    expect(code!.match(/<Button(?:\s|>)/g)).toHaveLength(10);
    for (const name of names) expect(code).toContain(name);
    const installation = page.locator("#installation");
    await installation.getByRole("tab").nth(1).click();
    await expect(installation.locator(".component-manual-meta")).toBeVisible();
    await expect(installation.getByRole("group").filter({ hasText: 'import "pretendard/dist/web/variable/pretendardvariable.css";' })).toBeVisible();
    await expect(installation.locator(".component-manual-step").filter({ hasText: "src/app/layout.tsx" })).toContainText("src/main.tsx");
  });
}

test("clipboard failure offers visible manual copying and recovers on retry", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async () => { throw new Error("Clipboard unavailable"); } },
    });
  });
  await page.goto("/en/components/button");
  const shell = page.locator("#installation [data-code-language=bash]");
  const copy = shell.locator(".copy-button");
  await copy.click();
  await expect(shell.getByRole("alert")).toHaveText("Could not copy to the clipboard. Select the text below and copy it manually.");
  const manual = shell.getByRole("textbox", { name: "Text to copy manually" });
  const command = "npx shadcn@latest add @neumorphism-ui/button";
  await expect(manual).toBeVisible();
  await expect(manual).toHaveValue(command);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await manual.focus();
  expect(await manual.evaluate(element => {
    const textarea = element as HTMLTextAreaElement;
    return [textarea.selectionStart, textarea.selectionEnd];
  })).toEqual([0, command.length]);
  await page.evaluate(() => { navigator.clipboard.writeText = async () => {}; });
  await copy.click();
  await expect(copy).toHaveAccessibleName("Copied");
  await expect(shell.getByRole("alert")).toHaveCount(0);
  await expect(shell.getByRole("textbox")).toHaveCount(0);
});

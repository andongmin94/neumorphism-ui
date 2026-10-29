import { expect, test } from "@playwright/test";

for (const mode of ["light", "dark"] as const) for (const width of [390, 1440]) {
  test.describe(`runtime regressions: CMS and refs ${mode} ${width}`, () => {
    test.use({ viewport: { width, height: 900 } });
    test.beforeEach(async ({ page }) => {
      await page.goto(`/cms-ref-controls.html?mode=${mode}`);
      await expect(page.getByRole("heading", { name: "CMS persistence and ref regressions" })).toBeVisible();
    });

    test("new CMS IDs preserve existing and reloaded saved posts", async ({ page }) => {
      const cms = page.getByTestId("persisted-cms");
      const title = cms.getByRole("textbox", { name: "Title", exact: true });
      await cms.getByRole("button", { name: "New post", exact: true }).click();
      await title.fill("Persisted new draft");
      await cms.getByRole("button", { name: "Save", exact: true }).click();
      await expect(cms.getByRole("status").first()).toHaveText("Saved.");
      await cms.getByRole("button", { name: "Reload persisted posts", exact: true }).click();
      await expect(title).toHaveValue("Previously persisted post");
      await cms.getByRole("button", { name: "New post", exact: true }).click();
      await title.fill("Second fresh draft");
      await cms.getByRole("button", { name: "Save", exact: true }).click();
      await expect(cms.getByRole("status").first()).toHaveText("Saved.");
      const persisted = JSON.parse((await cms.getByTestId("persisted-posts").textContent())!) as { id: string; title: string; body: string }[];
      expect(persisted.map(post => post.title)).toEqual(["Previously persisted post", "Persisted new draft", "Second fresh draft"]);
      expect(new Set(persisted.map(post => post.id)).size).toBe(3);
      expect(persisted[0]).toMatchObject({ id: "local-post-1", body: "Original body" });
      await cms.getByRole("button", { name: /^Previously persisted post\b/ }).click();
      await expect(title).toHaveValue("Previously persisted post");
    });

    test("callback refs clean up exactly once on replacement and unmount", async ({ page }) => {
      const controls = page.getByTestId("ref-controls");
      const events = controls.getByTestId("ref-events");
      await expect(events).toContainText("checkbox:1:setup");
      await expect(events).toContainText("radio:1:setup");
      await controls.getByRole("button", { name: "Replace callback refs", exact: true }).click();
      await expect(events).toContainText("checkbox:1:cleanup");
      await expect(events).toContainText("radio:1:cleanup");
      await expect(events).toContainText("checkbox:2:setup");
      await expect(events).toContainText("radio:2:setup");
      await controls.getByRole("button", { name: "Unmount controls", exact: true }).click();
      await expect(events).toContainText("checkbox:2:cleanup");
      await expect(events).toContainText("radio:2:cleanup");
      const calls = JSON.parse((await events.textContent())!) as string[];
      for (const component of ["checkbox", "radio"]) for (const revision of [1, 2]) {
        expect(calls.filter(call => call === component + ":" + revision + ":setup")).toHaveLength(1);
        expect(calls.filter(call => call === component + ":" + revision + ":cleanup")).toHaveLength(1);
        expect(calls).not.toContain(component + ":" + revision + ":null");
      }
      expect(calls).toContain("legacy-checkbox:null");
      expect(calls).toContain("legacy-radio:null");
    });

    test("object refs, mixed checkbox and uncontrolled radio reset retain native behavior", async ({ page }) => {
      const controls = page.getByTestId("ref-controls");
      await controls.getByRole("button", { name: "Read object refs", exact: true }).click();
      await expect(controls.getByTestId("object-refs")).toHaveText('{"checkbox":true,"radio":true}');
      const mixed = controls.getByRole("checkbox", { name: "Callback checkbox", exact: true });
      await expect(mixed).toHaveJSProperty("indeterminate", true);
      await mixed.click();
      await expect(mixed).toBeChecked();
      await expect(mixed).toHaveJSProperty("indeterminate", false);
      await controls.getByRole("radio", { name: "Callback option B", exact: true }).check();
      await controls.getByRole("radio", { name: "Object option B", exact: true }).check();
      await controls.getByRole("button", { name: "Replace callback refs", exact: true }).click();
      await controls.getByRole("button", { name: "Reset form controls", exact: true }).click();
      await expect(controls.getByRole("radio", { name: "Callback option A", exact: true })).toBeChecked();
      await expect(controls.getByRole("radio", { name: "Object option A", exact: true })).toBeChecked();
      await controls.getByRole("button", { name: "Unmount controls", exact: true }).click();
      await controls.getByRole("button", { name: "Read object refs", exact: true }).click();
      await expect(controls.getByTestId("object-refs")).toHaveText('{"checkbox":false,"radio":false}');
    });

    test("StrictMode ref probes leave one active registration and no leaks after unmount", async ({ page }) => {
      await page.goto(`/cms-ref-controls.html?mode=${mode}&strict=1`);
      const controls = page.getByTestId("ref-controls");
      const events = controls.getByTestId("ref-events");
      await expect(events).toContainText("radio:1:setup");
      const before = JSON.parse((await events.textContent())!) as string[];
      for (const component of ["checkbox", "radio"]) {
        expect(before.filter(call => call === component + ":1:setup").length - before.filter(call => call === component + ":1:cleanup").length).toBe(1);
      }
      await controls.getByRole("button", { name: "Replace callback refs", exact: true }).click();
      await expect(events).toContainText("radio:2:setup");
      await controls.getByRole("button", { name: "Unmount controls", exact: true }).click();
      await expect(events).toContainText("radio:2:cleanup");
      const after = JSON.parse((await events.textContent())!) as string[];
      for (const component of ["checkbox", "radio"]) for (const revision of [1, 2]) {
        expect(after.filter(call => call === component + ":" + revision + ":setup").length).toBe(after.filter(call => call === component + ":" + revision + ":cleanup").length);
        expect(after).not.toContain(component + ":" + revision + ":null");
      }
    });
  });
}

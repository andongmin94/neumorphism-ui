import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

test("published registry index, shared base and button match checked-out source", async ({ request }) => {
  // Keep production checks fixed-size; exhaustive endpoint and install checks run locally.
  for (const name of ["registry", "neumorphism-ui", "button"]) {
    const response = await request.get(`/r/${name}.json`);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("json");
    const expected = JSON.parse(readFileSync(new URL(`../../../registry/public/r/${name}.json`, import.meta.url), "utf8"));
    expect(await response.json()).toEqual(expected);
  }
});

test("published home hydrates and opens documentation search", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  const response = await page.goto("/en");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1, name: "Neumorphic UI for React", exact: true })).toBeVisible();
  await page.getByRole("button", { name: /Search documentation/i }).click();
  await expect(page.getByRole("dialog", { name: /Search documentation/i })).toBeVisible();
  expect(errors).toEqual([]);
});

test("published component preview opens and closes its dialog", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  const response = await page.goto("/en/components/dialog");
  expect(response?.status()).toBe(200);
  await expect(page.locator(".component-example")).toHaveAttribute("aria-busy", "false");
  const trigger = page.getByRole("button", { name: "Edit profile", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog").first();
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  expect(errors).toEqual([]);
});

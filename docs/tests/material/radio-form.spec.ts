import { expect, test } from "@playwright/test";

for (const mode of ["light", "dark"] as const) for (const width of [320, 390, 1440]) {
  test(`uncontrolled RadioGroup follows native form reset: ${mode} ${width}`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(`/radio-form.html?mode=${mode}`);
    const form = page.getByTestId("radio-form");
    const density = form.getByRole("radiogroup", { name: "Density" });
    const delivery = form.getByRole("radiogroup", { name: "Delivery" });
    const compact = density.getByRole("radio", { name: "Compact" });
    const roomy = density.getByRole("radio", { name: "Roomy" });
    const email = delivery.getByRole("radio", { name: "Email" });
    const sms = delivery.getByRole("radio", { name: "SMS" });

    await expect(compact).toBeChecked();
    await expect(email).not.toBeChecked();
    await expect(sms).not.toBeChecked();

    await roomy.check();
    await sms.check();
    await expect(roomy).toBeChecked();
    await expect(sms).toBeChecked();
    expect(await form.evaluate(element => Object.fromEntries(new FormData(element as HTMLFormElement)))).toEqual({
      density: "roomy", delivery: "sms",
    });
    if (width === 390) await form.screenshot({ path: info.outputPath(`radio-selected-${mode}.png`), animations: "disabled" });

    await form.getByRole("button", { name: "Reset form" }).click();
    await page.getByRole("button", { name: "Rerender specimen" }).click();
    await expect(compact).toBeChecked();
    await expect(roomy).not.toBeChecked();
    await expect(email).not.toBeChecked();
    await expect(sms).not.toBeChecked();
    expect(await form.evaluate(element => Object.fromEntries(new FormData(element as HTMLFormElement)))).toEqual({
      density: "compact",
    });
    if (width === 390) await form.screenshot({ path: info.outputPath(`radio-restored-${mode}.png`), animations: "disabled" });

    await roomy.check();
    await email.check();
    await page.getByRole("checkbox", { name: "Cancel reset" }).check();
    await form.getByRole("button", { name: "Reset form" }).click();
    await page.getByRole("button", { name: "Rerender specimen" }).click();
    await expect(roomy).toBeChecked();
    await expect(email).toBeChecked();
    expect(await form.evaluate(element => Object.fromEntries(new FormData(element as HTMLFormElement)))).toEqual({
      density: "roomy", delivery: "email",
    });
    // Programmatic form.reset() must match activation of a native reset button.
    await page.getByRole("checkbox", { name: "Cancel reset" }).uncheck();
    await form.evaluate(element => (element as HTMLFormElement).reset());
    await page.getByRole("button", { name: "Rerender specimen" }).click();
    await expect(compact).toBeChecked();
    await expect(email).not.toBeChecked();
    expect(await form.evaluate(element => Object.fromEntries(new FormData(element as HTMLFormElement)))).toEqual({
      density: "compact",
    });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
  });
}

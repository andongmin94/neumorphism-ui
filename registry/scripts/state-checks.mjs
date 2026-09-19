import assert from "node:assert/strict";

// Measure rendered state changes rather than inferring them from class strings.
export async function exerciseControlStates(page, screenshot) {
  const primary = page.getByTestId("primary");
  await primary.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const resting = await primary.evaluate(element => getComputedStyle(element).boxShadow);
  await primary.hover();
  const hovered = await primary.evaluate(element => getComputedStyle(element).boxShadow);
  assert.notEqual(hovered, resting, "a raised action must have a visible hover state");
  await page.mouse.down();
  try {
    const pressed = await primary.evaluate(element => getComputedStyle(element).boxShadow);
    assert.match(pressed, /inset/, "an actively pressed action must become inset");
    assert.notEqual(pressed, hovered);
    await screenshot("button-pressed");
  } finally { await page.mouse.up(); }
  await page.keyboard.press("Tab");
  await primary.focus();
  assert.equal(await primary.evaluate(element => element.matches(":focus-visible")), true);
  const focused = await primary.evaluate(element => getComputedStyle(element).boxShadow);
  assert.notEqual(focused, hovered, "keyboard focus must be visible independently of hover");
  await screenshot("button-focus");
  await primary.blur();

  const toggle = page.locator('[data-example="toggle"]').getByRole("button", { name: "Pin", exact: true }).first();
  await toggle.click();
  assert.equal(await toggle.getAttribute("aria-pressed"), "true");
  await toggle.hover();
  assert.match(await toggle.evaluate(element => getComputedStyle(element).boxShadow), /inset/, "hover must not erase persistent selection depth");
  await page.mouse.move(0, 0);
  assert.match(await toggle.evaluate(element => getComputedStyle(element).boxShadow), /inset/, "selection depth must remain after pointer exit");
  await screenshot("toggle-selected");
  await toggle.click();
  assert.equal(await toggle.getAttribute("aria-pressed"), "false");
}

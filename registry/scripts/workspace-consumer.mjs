import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const { expect } = createRequire(path.join(root, "../docs/package.json"))("@playwright/test");
export const workspaceItems = ["navigation-menu", "menubar", "template-settings", "template-data-manager"];

export function decorateWorkspaceFixture(directory) {
  const file = path.join(directory, "src/consumer.tsx"); let source = fs.readFileSync(file, "utf8");
  source = source.replace('export default function Consumer()', 'import { SettingsExample } from "@/design-system/blocks/settings-panel";\nimport { DataManagerExample } from "@/design-system/blocks/data-manager";\nexport default function Consumer()');
  assert.ok(source.includes('  </main>;'));
  source = source.replace('  </main>;', '<section data-workspace="settings" className="mt-16 border-t border-[var(--border)] pt-10"><SettingsExample /></section><section data-workspace="records" className="mt-16 border-t border-[var(--border)] pt-10"><DataManagerExample /></section>\n  </main>;');
  fs.writeFileSync(file, source);
}
export async function exerciseWorkspaces(page, { target, scenario, engineName, mode, evidenceRoot }) {
  const shot = async (name, element) => { fs.mkdirSync(evidenceRoot, { recursive: true }); await element.screenshot({ path: path.join(evidenceRoot, `${target}-${scenario}-${engineName}-${mode}-workspace-${name}.png`) }); };
  const dismissToast = async title => {
    const notification = page.locator('[data-slot="toast"]').filter({ hasText: title });
    await expect(notification).toBeVisible();
    await notification.hover();
    await notification.getByRole('button', { name: 'Dismiss notification', exact: true }).click();
    await expect(notification).toBeHidden();
  };
  const settings = page.locator('[data-workspace="settings"]');
  const name = settings.getByRole('textbox', { name: 'Display name', exact: true });
  const save = settings.getByRole('button', { name: 'Save changes', exact: true });
  await expect(save).toBeDisabled(); await name.fill(''); await save.click(); await expect(name).toHaveAttribute('aria-invalid', 'true');
  await name.fill('Harbor Team'); await settings.getByRole('checkbox', { name: 'Fail the next save', exact: true }).check(); await save.click();
  await expect(settings.getByRole('alert')).toContainText('Changes were not saved'); await expect(name).toHaveValue('Harbor Team');
  await shot('settings-error', settings); await save.click(); await expect(settings.getByRole('status')).toHaveText('All changes saved');
  await dismissToast('Profile updated');
  await name.fill('Not saved'); await settings.getByRole('button', { name: 'Discard changes', exact: true }).click(); await expect(name).toHaveValue('Harbor Team');
  await shot('settings', settings);

  const manager = page.locator('[data-workspace="records"]');
  const search = manager.getByRole('searchbox', { name: 'Search records', exact: true });
  await search.fill('Profile settings'); await expect(manager.getByRole('row')).toHaveCount(2);
  await manager.getByRole('checkbox', { name: 'Select current page', exact: true }).check();
  await expect(manager.getByRole('status').first()).toContainText('1 selected'); await search.fill('');
  await expect(manager.getByRole('status').first()).toContainText('0 selected');
  await manager.getByRole('combobox', { name: 'Status', exact: true }).selectOption('draft');
  await expect(manager.getByRole('status').first()).toContainText('4 matching records');
  await manager.getByRole('button', { name: 'Reset filters', exact: true }).click();
  await manager.getByRole('button', { name: 'Next', exact: true }).click(); await expect(manager.getByText('Page 2 of 3', { exact: true })).toBeVisible();
  await manager.getByRole('button', { name: 'Previous', exact: true }).click();

  const nav = manager.locator('[data-slot="navigation-menu-trigger"]'); await nav.press('Enter');
  await expect(page.locator('[data-slot="navigation-menu-popup"]')).toBeVisible();
  await expect(page.locator('[data-slot="navigation-menu-popup"]').getByRole('link', { name: 'Recent activity', exact: true })).toBeVisible();
  await page.keyboard.press('Escape'); await expect(page.locator('[data-slot="navigation-menu-popup"]')).toBeHidden();
  const view = manager.locator('[data-slot="menubar-trigger"]').filter({ hasText: /^View$/ }); await view.press('ArrowDown');
  await page.getByRole('menuitemcheckbox', { name: 'Owner', exact: true }).click();
  await expect(manager.getByRole('columnheader', { name: /^Owner/ })).toHaveCount(0);
  await view.press('ArrowDown'); await page.getByRole('menuitemcheckbox', { name: 'Owner', exact: true }).click();
  await page.keyboard.press('Escape'); await expect(page.getByRole('menu')).toBeHidden();

  await manager.getByRole('checkbox', { name: 'Fail the next operation', exact: true }).check();
  await manager.getByRole('button', { name: /New record/ }).click();
  const editor = page.locator('[data-slot="sheet-content"]'); await expect(editor).toBeVisible();
  const title = editor.getByRole('textbox', { name: 'Title', exact: true });
  await editor.getByRole('button', { name: 'Save record', exact: true }).click(); await expect(title).toHaveAttribute('aria-invalid', 'true');
  await title.fill('New customer workspace'); await editor.getByRole('combobox', { name: 'Status', exact: true }).selectOption('active');
  await editor.getByRole('button', { name: /^Due date:/ }).click(); await expect(page.locator('[data-slot="popover-content"]')).toBeVisible();
  await page.keyboard.press('Escape'); await expect(editor).toBeVisible();
  await editor.getByRole('button', { name: 'Save record', exact: true }).click(); await expect(editor.getByRole('alert')).toContainText('Could not complete the action');
  await expect(title).toHaveValue('New customer workspace'); await shot('record-editor-error', editor);
  await editor.getByRole('button', { name: 'Save record', exact: true }).click(); await expect(editor).toBeHidden(); await dismissToast('Record saved');
  await search.fill('New customer workspace'); await expect(manager.getByRole('row')).toHaveCount(2);
  await manager.getByRole('button', { name: 'Edit New customer workspace', exact: true }).click(); await title.fill('Uncommitted title');
  await editor.getByRole('button', { name: 'Cancel', exact: true }).last().click();
  const confirmation = page.getByRole('alertdialog'); await expect(confirmation).toContainText('Discard edits?'); await shot('discard-confirmation', confirmation);
  await confirmation.getByRole('button', { name: 'Keep editing', exact: true }).click(); await expect(title).toHaveValue('Uncommitted title');
  await editor.getByRole('button', { name: 'Cancel', exact: true }).last().click(); await confirmation.getByRole('button', { name: 'Discard draft', exact: true }).click(); await expect(editor).toBeHidden();
  await expect(manager.getByRole('cell', { name: 'New customer workspace', exact: true })).toBeVisible();
  await manager.getByRole('button', { name: 'Edit New customer workspace', exact: true }).click();
  await title.fill('New customer workspace revised'); await editor.getByRole('button', { name: 'Save record', exact: true }).click();
  await expect(editor).toBeHidden(); await dismissToast('Record saved');
  await expect(manager.getByRole('cell', { name: 'New customer workspace revised', exact: true })).toBeVisible();
  await manager.getByRole('checkbox', { name: 'Select current page', exact: true }).check();
  await manager.getByRole('checkbox', { name: 'Fail the next operation', exact: true }).check();
  await manager.locator('[data-slot="menubar-trigger"]').filter({ hasText: /^Records$/ }).press('ArrowDown');
  await page.getByRole('menuitem', { name: /^Delete selected/ }).click(); await confirmation.getByRole('button', { name: 'Delete selected', exact: true }).click();
  await expect(confirmation.getByRole('alert')).toContainText('Could not complete the action');
  await confirmation.getByRole('button', { name: 'Delete selected', exact: true }).click(); await expect(confirmation).toBeHidden();
  await expect(manager.locator('[data-slot="menubar-trigger"]').filter({ hasText: /^Records$/ })).toBeFocused();
  await dismissToast('Records deleted');
  await expect(manager.getByText('No matching records. Change or reset your filters.', { exact: true })).toBeVisible();
  await manager.getByRole('button', { name: 'Reset filters', exact: true }).click();
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'workspace causes page-level horizontal overflow');
  await shot('data-manager', manager);
}

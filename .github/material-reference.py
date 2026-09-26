from pathlib import Path
import re

def edit(path, before, after, count=1):
    p = Path(path)
    text = p.read_text()
    assert text.count(before) == count, f'{path}: expected {count} targets: {before[:80]}'
    p.write_text(text.replace(before, after))

theme = 'registry/src/theme.ts'
for old, new in {
    'background: "#e5ebf1"': 'background: "#ebecf0"',
    'surface: "#e9eef4"': 'surface: "#ebecf0"',
    'surfaceSoft: "#f3f6f9"': 'surfaceSoft: "#f2f3f5"',
    'surfaceLow: "#dbe2ea"': 'surfaceLow: "#dfe1e7"',
    'popover: "#eef3f8"': 'popover: "#ebecf0"',
    'secondary: "#dfe6ee"': 'secondary: "#e5e7ed"',
    'foreground: "#172033"': 'foreground: "#25264b"',
    'mutedForeground: "#566478"': 'mutedForeground: "#626981"',
    'primary: "#1267f4"': 'primary: "#0768da"',
    'shadowDark: "rgb(30 48 72 / 0.14)"': 'shadowDark: "rgb(66 72 94 / 0.22)"',
    'shadowLight: "rgb(255 255 255 / 0.88)"': 'shadowLight: "rgb(255 255 255 / 0.94)"',
    'background: "#151a22"': 'background: "#242731"',
    'surface: "#1b222c"': 'surface: "#242731"',
    'surfaceSoft: "#242d39"': 'surfaceSoft: "#2b2f3c"',
    'surfaceLow: "#141922"': 'surfaceLow: "#1c1f28"',
    'popover: "#1b222c"': 'popover: "#292d39"',
    'secondary: "#202a36"': 'secondary: "#2a2e3a"',
    'mutedForeground: "#8fa1b7"': 'mutedForeground: "#aab4c8"',
}.items():
    edit(theme, old, new)
edit(theme, '"--neu-edge": `color-mix(in srgb, ${tokens.foreground} ${mode === "light" ? 10 : 9}%, transparent)`,', '"--neu-edge": mode === "light" ? "transparent" : `color-mix(in srgb, ${tokens.foreground} 4%, transparent)`,')
edit(theme, '${tokens.shadowLight} 62%, transparent', '${tokens.shadowLight} 84%, transparent')
edit(theme, '${tokens.shadowLight} 65%, transparent', '${tokens.shadowLight} 86%, transparent')
edit(theme, '${tokens.shadowLight} 76%, transparent', '${tokens.shadowLight} 94%, transparent')
edit(theme, ') + `, inset ${x}px ${y}px 0 color-mix(in srgb, ${tokens.edge} 45%, transparent)`,', '),')
edit(theme, '${tokens.surfaceSoft} 28%, ${tokens.surface}', '${tokens.surfaceSoft} 12%, ${tokens.surface}')
edit(theme, '${tokens.surfaceLow} 35%, ${tokens.surface}), ${tokens.surface})`', '${tokens.surfaceLow} 35%, ${tokens.surface}), color-mix(in srgb, ${tokens.surfaceSoft} 30%, ${tokens.surface}))`')
edit(theme, 'inset ${x}px ${y}px 0 color-mix(in srgb, ${primary} 86%, white)', 'inset ${x}px ${y}px 2px color-mix(in srgb, ${primary} 94%, white)', 2)

edit('registry/src/components/ui/card.tsx', 'inset: "bg-[var(--neu-surface-low)] shadow-[var(--neu-shadow-inset)]"', 'inset: "bg-[var(--neu-surface)] [background-image:var(--neu-fill-inset)] shadow-[var(--neu-shadow-inset)]"')
for name in ['input', 'textarea']:
    p = f'registry/src/components/ui/{name}.tsx'
    edit(p, 'border border-[color:var(--input)] bg-', 'border border-transparent bg-')
    edit(p, 'read-only:shadow-none', 'disabled:border-[color:var(--input)] read-only:border-[color:var(--input)] read-only:shadow-none')
edit('registry/src/components/ui/tabs.tsx', 'border border-[color:var(--border)] bg-[var(--neu-surface)] p-1', 'border border-transparent bg-[var(--neu-surface)] [background-image:var(--neu-fill-inset)] p-1')
edit('registry/src/components/ui/tabs.tsx', 'data-[active]:bg-[var(--neu-surface-soft)]', 'data-[active]:bg-[var(--neu-surface)] data-[active]:[background-image:var(--neu-fill-raised)]')
edit('registry/src/components/ui/button.tsx', 'shadow-[var(--neu-shadow-raised-sm)] active:shadow-[var(--neu-shadow-inset)]', 'shadow-[var(--neu-shadow-raised-sm)] hover:shadow-[var(--neu-shadow-hover)] active:shadow-[var(--neu-shadow-inset)]')

# Keep document separators; remove decorative frames only on raised surfaces.
p = Path('docs/src/app.css')
css = p.read_text()
start = css.index('/* Neobrutal documentation shell parity.')
base, shell = css[:start], css[start:]
selectors = ['.site-brand__mark', '.docs-search-trigger', '.sidebar-filter', '.component-directory-search', '.component-directory-card', '.template-card,\n.template-card-featured', '.template-card-link', '.charts-workbench-frame', '.github-repo-button,\n.theme-toggle,\n.language-switcher > summary,\n.mobile-nav-trigger']
for selector in selectors:
    matches = list(re.finditer(r'^' + re.escape(selector) + r' \{[^}]*\}', shell, re.M))
    assert len(matches) == 1, (selector, len(matches))
    old = matches[0].group()
    new = old.replace('border: 1px solid var(--docs-line-strong);', 'border: 1px solid var(--neu-edge);')
    shell = shell.replace(old, new, 1)
shell = shell.replace('background: var(--neu-surface-low);\n  box-shadow: var(--neu-shadow-inset-sm);\n}', 'background: var(--neu-surface);\n  box-shadow: none;\n}', 1)
old = '.docs-primary-action:hover,\n.docs-secondary-action:hover {\n  box-shadow: var(--neu-shadow-inset-sm);\n}'
new = '.docs-primary-action:hover {\n  box-shadow: var(--neu-shadow-primary-hover);\n}\n\n.docs-secondary-action:hover {\n  box-shadow: var(--neu-shadow-hover);\n}\n\n.docs-primary-action:active {\n  box-shadow: var(--neu-shadow-primary-inset);\n}\n\n.docs-secondary-action:active {\n  box-shadow: var(--neu-shadow-inset);\n}'
assert old in shell
p.write_text(base + shell.replace(old, new))
edit('docs/components/docs/github-repo-link.module.css', 'border: 1px solid var(--docs-line-strong);', 'border: 1px solid var(--neu-edge);')

Path('registry/tests/material-surface.test.mjs').write_text('''import assert from "node:assert/strict";
import test from "node:test";
import { buildThemeVariables, defaultThemeSettings } from "../src/theme.ts";

test("Air is one continuous material with independently visible states", () => {
  for (const mode of ["light", "dark"]) {
    const v = buildThemeVariables(defaultThemeSettings, mode);
    assert.equal(v["--background"], v["--neu-surface"]);
    assert.notEqual(v["--neu-shadow-raised"], v["--neu-shadow-inset"]);
    assert.match(v["--neu-shadow-inset"], /inset/);
    assert.doesNotMatch(v["--neu-shadow-raised-sm"], /inset/);
    assert.notEqual(v["--neu-fill-raised"], v["--neu-fill-inset"]);
    assert.notEqual(v["--neu-shadow-primary"], v["--neu-shadow-primary-hover"]);
  }
  const light = buildThemeVariables(defaultThemeSettings, "light");
  assert.equal(light["--background"], "#ebecf0");
  assert.equal(light["--neu-edge"], "transparent");
});
''')
p = Path('docs/tests/material/material.spec.ts')
p.write_text(p.read_text() + '''

test("continuous material and borderless depth survive interaction", async ({ page }, info) => {
  await page.goto("/");
  const neutral = page.getByTestId("default");
  const input = page.getByRole("textbox", { name: "Workspace name" });
  const material = await neutral.evaluate(e => ({
    base: getComputedStyle(document.body).backgroundColor,
    surface: getComputedStyle(e).backgroundColor,
    edge: getComputedStyle(e).borderTopColor,
    shadow: getComputedStyle(e).boxShadow,
  }));
  expect(material.surface).toBe(material.base);
  expect(material.edge).toBe("rgba(0, 0, 0, 0)");
  expect(material.shadow).not.toContain("inset");
  await neutral.hover();
  expect(await neutral.evaluate(e => getComputedStyle(e).boxShadow)).not.toBe(material.shadow);
  await page.mouse.down();
  expect(await neutral.evaluate(e => getComputedStyle(e).boxShadow)).toContain("inset");
  await page.mouse.up();
  await page.keyboard.press("Tab");
  await neutral.focus();
  await expect(neutral).toHaveCSS("outline-style", "solid");
  await expect(neutral).toHaveCSS("outline-width", "2px");
  await input.focus();
  expect(await input.evaluate(e => getComputedStyle(e).boxShadow)).toContain("inset");
  await expect(input).toHaveCSS("outline-style", "solid");
  await page.screenshot({ path: info.outputPath("continuous-material-focus.png"), fullPage: true });
});
''')

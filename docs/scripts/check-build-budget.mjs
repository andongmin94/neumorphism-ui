import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";

const docsRoot = fileURLToPath(new URL("../", import.meta.url));
const origin = "https://neumorphism-ui.andongmin.com";
const kibibyte = 1024;

// Baseline JS gzip KiB: 178.9 / 250.2 / 197.7 / 430.3; CSS: 124.7–126.2.
// Leave about 13–20% room for minor updates without counting lazy syntax grammars.
export const pageBudgets = {
  "/en": { javascript: 210 * kibibyte, stylesheet: 145 * kibibyte },
  "/en/components/button": { javascript: 290 * kibibyte, stylesheet: 145 * kibibyte },
  "/en/customize": { javascript: 235 * kibibyte, stylesheet: 145 * kibibyte },
  "/en/templates/cms": { javascript: 480 * kibibyte, stylesheet: 145 * kibibyte },
};

export function initialAssets(html, route) {
  // Inline data and commented examples must not become imaginary requests.
  const markup = html.replace(/<!--[\s\S]*?-->/g, "")
    .replace(/(<script\b[^>]*>)[\s\S]*?<\/script\s*>/gi, "$1</script>");
  const assets = { javascript: new Set(), stylesheet: new Set() };
  for (const tag of markup.match(/<(?:script|link)\b[^>]*>/gi) ?? []) {
    const attributes = Object.fromEntries([...tag.matchAll(/\b([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
      .map(([, name, double, single, bare]) => [name.toLowerCase(), double ?? single ?? bare]));
    const rel = attributes.rel?.toLowerCase().split(/\s+/) ?? [];
    let kind;
    let source;
    if (/^<script\b/i.test(tag) && attributes.src) {
      kind = "javascript"; source = attributes.src;
    } else if (rel.includes("modulepreload")) {
      kind = "javascript"; source = attributes.href;
    } else if (rel.includes("stylesheet") || (rel.includes("preload") && attributes.as?.toLowerCase() === "style")) {
      kind = "stylesheet"; source = attributes.href;
    } else {
      continue;
    }
    assert.ok(source, `${route}: initial ${kind} has no URL`);
    const url = new URL(source.replaceAll("&amp;", "&"), origin + route);
    assert.equal(url.origin, origin, `${route}: external initial asset cannot be measured locally: ${source}`);
    const pathname = decodeURIComponent(url.pathname);
    assert.match(pathname, kind === "javascript" ? /^\/assets\/.+\.m?js$/ : /^\/assets\/.+\.css$/,
      `${route}: unexpected initial ${kind} URL: ${source}`);
    assert.ok(!pathname.split("/").includes(".."), `${route}: asset escapes build output`);
    assets[kind].add(pathname);
  }
  assert.ok(assets.javascript.size, `${route}: no initial JavaScript assets found`);
  assert.ok(assets.stylesheet.size, `${route}: no initial stylesheets found`);
  return assets;
}

export function measureBuild(directory = path.join(docsRoot, "dist/public"), routes = Object.keys(pageBudgets)) {
  const root = path.resolve(directory);
  const cache = new Map();
  function measure(asset) {
    if (!cache.has(asset)) {
      const file = path.resolve(root, `.${asset}`);
      const relative = path.relative(root, file);
      assert.ok(!relative.startsWith("..") && !path.isAbsolute(relative), `Asset escapes build output: ${asset}`);
      const content = fs.readFileSync(file);
      cache.set(asset, { asset, bytes: content.length, gzipBytes: gzipSync(content).length });
    }
    return cache.get(asset);
  }
  return routes.map(route => {
    assert.match(route, /^\/[a-z0-9/-]+$/, `Invalid route: ${route}`);
    const html = fs.readFileSync(path.join(root, route, "index.html"), "utf8");
    const assets = initialAssets(html, route);
    const totals = Object.fromEntries(Object.entries(assets).map(([kind, paths]) => {
      const files = [...paths].map(measure);
      return [kind, { bytes: files.reduce((sum, file) => sum + file.bytes, 0), gzipBytes: files.reduce((sum, file) => sum + file.gzipBytes, 0), files }];
    }));
    return { route, ...totals };
  });
}

export function enforceBudgets(pages, budgets = pageBudgets) {
  const failures = [];
  for (const page of pages) {
    assert.ok(budgets[page.route], `Missing budget for ${page.route}`);
    for (const kind of ["javascript", "stylesheet"]) {
      const limit = budgets[page.route][kind];
      assert.ok(Number.isSafeInteger(limit) && limit > 0, `Invalid ${kind} budget for ${page.route}`);
      if (page[kind].gzipBytes > limit) failures.push(`${page.route} ${kind}: ${(page[kind].gzipBytes / kibibyte).toFixed(1)} KiB gzip > ${(limit / kibibyte).toFixed(1)} KiB`);
    }
  }
  assert.equal(failures.length, 0, `Initial asset budget exceeded:\n${failures.join("\n")}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const pages = measureBuild();
  console.log(JSON.stringify(pages.map(page => ({
    route: page.route,
    javascript: { files: page.javascript.files.length, gzipKiB: +(page.javascript.gzipBytes / kibibyte).toFixed(1), limitKiB: pageBudgets[page.route].javascript / kibibyte },
    stylesheet: { files: page.stylesheet.files.length, gzipKiB: +(page.stylesheet.gzipBytes / kibibyte).toFixed(1), limitKiB: pageBudgets[page.route].stylesheet / kibibyte },
  })), null, 2));
  enforceBudgets(pages);
}

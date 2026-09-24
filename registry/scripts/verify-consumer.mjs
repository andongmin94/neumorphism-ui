import { decorateAnalyticsFixture, exerciseAnalytics } from "./analytics-consumer.mjs";
import { decorateWorkspaceFixture, workspaceItems, exerciseWorkspaces } from "./workspace-consumer.mjs";
import { run } from "./consumer-command.mjs";
import { decorateWorkflowFixture, workflowItems, exerciseWorkflow } from "./workflow-consumer.mjs";
import { decorateFixture, expandedItems, assertExpandedFiles, exerciseExpanded } from "./expanded-consumer.mjs";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const docsRoot = path.resolve(root, "../docs");
const requireDocs = createRequire(path.join(docsRoot, "package.json"));
const { chromium, firefox, webkit } = requireDocs("@playwright/test");
const docsPackage = JSON.parse(fs.readFileSync(path.join(docsRoot, "package.json"), "utf8"));
const versions = { ...docsPackage.dependencies, ...docsPackage.devDependencies };
const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "neumorphism-consumer-"));
const evidenceRoot = path.join(docsRoot, "test-results/installed-consumers");
const cli = path.join(root, "node_modules/shadcn/dist/index.js");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const results = [];
function write(directory, file, content) { const destination = path.join(directory, file); fs.mkdirSync(path.dirname(destination), { recursive: true }); fs.writeFileSync(destination, content); }
function writeJson(directory, file, content) { write(directory, file, JSON.stringify(content, null, 2) + "\n"); }
function readJson(file) { return JSON.parse(fs.readFileSync(file, "utf8")); }
async function listen(server) { await new Promise((resolve, reject) => { server.once("error", reject); server.listen(0, "127.0.0.1", resolve); }); return server.address().port; }
const registryServer = http.createServer((request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  if (!/^\/r\/[a-z0-9-]+\.json$/.test(pathname)) { response.writeHead(404).end(); return; }
  const file = path.join(root, "public", pathname);
  if (!fs.existsSync(file)) { response.writeHead(404).end(); return; }
  response.writeHead(200, { "content-type": "application/json" }); response.end(fs.readFileSync(file));
});
function application() {
  return `"use client";
import { Button } from "@/design-system/ui/button";
import { Input } from "@/design-system/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/design-system/ui/dialog";
export default function Consumer() {
  return <main style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
    <h1>Installed Neumorphism UI</h1>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
      <Button data-testid="primary" variant="primary">Save changes</Button>
      <Button data-testid="destructive" variant="destructive">Delete draft</Button>
      <Button disabled>Unavailable</Button>
      <Dialog><DialogTrigger render={<Button />}>Open settings</DialogTrigger>
        <DialogContent closeLabel="Close settings">
          <DialogTitle>Settings</DialogTitle><DialogDescription>Long content must remain reachable.</DialogDescription>
          {Array.from({ length: 35 }, (_, index) => <p key={index}>Setting {index + 1}: keyboard and small-screen check.</p>)}
          <Button data-testid="dialog-last">Save settings</Button>
        </DialogContent>
      </Dialog>
    </div>
    <label htmlFor="name">Display name</label><Input id="name" defaultValue="Neumorphism" />
  </main>;
}`;
}
function fixture(directory, target, registryOrigin) {
  const dependencies = Object.fromEntries(["react", "react-dom"].map((name) => [name, versions[name]]));
  const devDependencies = Object.fromEntries(["typescript", "@types/react", "@types/react-dom", "@types/node", "tailwindcss", "@tailwindcss/postcss"].map((name) => [name, versions[name]]));
  const next = target === "next";
  if (next) dependencies.next = versions.next;
  else { devDependencies.vite = versions.vite; devDependencies["@vitejs/plugin-react"] = versions["@vitejs/plugin-react"]; }
  writeJson(directory, "package.json", { private: true, type: "module", dependencies, devDependencies, scripts: { build: next ? "next build" : "tsc --noEmit && vite build" } });
  writeJson(directory, "tsconfig.json", { compilerOptions: { target: "ES2022", lib: ["DOM", "DOM.Iterable", "ES2022"], strict: true, noEmit: true, skipLibCheck: true, esModuleInterop: true, module: "ESNext", moduleResolution: "Bundler", resolveJsonModule: true, jsx: next ? "preserve" : "react-jsx", allowJs: true, paths: { "@/*": ["./src/*"] }, ...(next ? { plugins: [{ name: "next" }] } : {}) }, include: ["src", ...(next ? ["next-env.d.ts", ".next/types/**/*.ts"] : [])], exclude: ["node_modules"] });
  writeJson(directory, "components.json", { $schema: "https://ui.shadcn.com/schema.json", style: "base-nova", rsc: next, tsx: true, tailwind: { config: "", css: "src/globals.css", baseColor: "neutral", cssVariables: true }, iconLibrary: "lucide", aliases: { components: "@/design-system", ui: "@/design-system/ui", lib: "@/shared", utils: "@/shared/utils", hooks: "@/shared/hooks" }, registries: { "@neumorphism-ui": `${registryOrigin}/r/{name}.json` } });
  write(directory, "postcss.config.mjs", 'export default { plugins: { "@tailwindcss/postcss": {} } };\n');
  write(directory, "src/globals.css", '@import "tailwindcss";\n@custom-variant dark (&:is(.dark *));\n');
  write(directory, "src/consumer.tsx", application());
  decorateFixture(directory);
  if (next) {
    write(directory, "src/app/layout.tsx", 'import "../globals.css"; export default function Layout({ children }: {children: React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }');
    write(directory, "src/app/page.tsx", 'export { default } from "../consumer";');
  } else {
    write(directory, "index.html", '<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Installed consumer</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>');
    write(directory, "src/main.tsx", 'import {createRoot} from "react-dom/client"; import Consumer from "./consumer"; import "./globals.css"; createRoot(document.getElementById("root")!).render(<Consumer/>);');
    write(directory, "vite.config.ts", 'import {defineConfig} from "vite"; import react from "@vitejs/plugin-react"; import {fileURLToPath, URL} from "node:url"; export default defineConfig({plugins:[react()],resolve:{alias:{"@":fileURLToPath(new URL("./src",import.meta.url))}}});');
  }
  decorateWorkflowFixture(directory);
  decorateWorkspaceFixture(directory);
  decorateAnalyticsFixture(directory);
}
async function waitForServer(origin, processRef) {
  const end = Date.now() + 60_000;
  while (Date.now() < end) {
    if (processRef.exitCode !== null) throw new Error(`Consumer server exited: ${processRef.exitCode}`);
    try { const response = await fetch(origin, { signal: AbortSignal.timeout(2000) }); if (response.ok) return; } catch { /* Server startup only. */ }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Consumer server did not start: ${origin}`);
}
async function browserChecks(directory, target, scenario) {
  const reserve = http.createServer(); const port = await listen(reserve); await new Promise((resolve) => reserve.close(resolve));
  const command = target === "next" ? [path.join(directory, "node_modules/next/dist/bin/next"), "start", "-p", String(port), "-H", "127.0.0.1"] : [path.join(directory, "node_modules/vite/bin/vite.js"), "preview", "--host", "127.0.0.1", "--port", String(port), "--strictPort"];
  const server = spawn(process.execPath, command, { cwd: directory, stdio: ["ignore", "inherit", "inherit"] });
  const origin = `http://127.0.0.1:${port}`;
  const expectedTheme = readJson(path.join(root, `public/r/${scenario === "existing" ? "style-sage" : "neumorphism-ui"}.json`));
  try {
    await waitForServer(origin, server);
    for (const [engineName, engine] of Object.entries({ chromium, firefox, webkit })) {
      const browser = await engine.launch();
      try {
        for (const [mode, viewport] of [["light", { width: 1280, height: 900 }], ["dark", { width: 390, height: 844 }]]) {
          const context = await browser.newContext({ viewport, colorScheme: mode, reducedMotion: "reduce" }); const page = await context.newPage(); const errors = [];
          page.on("pageerror", (error) => errors.push(error.message));
          await page.goto(origin, { waitUntil: "networkidle" });
          await page.evaluate((dark) => document.documentElement.classList.toggle("dark", dark), mode === "dark");
          await page.getByTestId("primary").waitFor();
          const metrics = await page.getByTestId("primary").evaluate((element) => { const style = getComputedStyle(element); const rootStyle = getComputedStyle(document.documentElement); return { radius: style.borderRadius, shadow: style.boxShadow, transition: style.transitionProperty, primary: rootStyle.getPropertyValue("--primary").trim(), rootRadius: rootStyle.getPropertyValue("--radius").trim() }; });
          assert.equal(metrics.primary.toLowerCase(), expectedTheme.cssVars[mode].primary.toLowerCase()); assert.equal(metrics.radius, expectedTheme.cssVars[mode]["neu-radius-control"]); assert.notEqual(metrics.shadow, "none"); assert.equal(metrics.transition, "none", "reduced motion must affect the installed Button");
          if (scenario === "existing") assert.equal(metrics.rootRadius, "23px");
          const foreground = await page.getByTestId("destructive").evaluate((element) => getComputedStyle(element).color);
          if (mode === "dark") assert.notEqual(foreground, "rgb(255, 255, 255)", "the dark destructive foreground must not remain fixed white");
          await page.locator("#name").fill("설치 검증"); assert.equal(await page.locator("#name").inputValue(), "설치 검증");
          await page.getByRole("button", { name: "Open settings", exact: true }).click(); await page.getByRole("dialog").waitFor();
          const bounds = await page.getByRole("dialog").boundingBox(); assert.ok(bounds && bounds.y >= 0 && bounds.y + bounds.height <= viewport.height + 1);
          await page.getByTestId("dialog-last").scrollIntoViewIfNeeded(); assert.ok(await page.getByTestId("dialog-last").isVisible());
          await page.keyboard.press("Escape"); await page.getByRole("dialog").waitFor({ state: "hidden" });
          assert.equal(await page.evaluate(() => document.activeElement?.textContent), "Open settings");
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "horizontal overflow"); assert.deepEqual(errors, []);
          try {
            await exerciseExpanded(page, { target, scenario, engineName, mode, evidenceRoot });
            await exerciseWorkflow(page, { target, scenario, engineName, mode, evidenceRoot });
            await exerciseWorkspaces(page, { target, scenario, engineName, mode, evidenceRoot });
            await exerciseAnalytics(page, { target, scenario, engineName, mode, evidenceRoot });
          } catch (error) {
            fs.mkdirSync(evidenceRoot, { recursive: true });
            const prefix = path.join(evidenceRoot, `${target}-${scenario}-${engineName}-${mode}-failure`);
            await page.screenshot({ path: prefix + ".png", fullPage: false });
            const activeElement = await page.evaluate(() => document.activeElement?.outerHTML);
            fs.writeFileSync(prefix + ".json", JSON.stringify({ message: String(error), errors, activeElement }, null, 2));
            throw error;
          }
          assert.deepEqual(errors, []);
          const file = path.join(evidenceRoot, `${target}-${scenario}-${engineName}-${mode}.png`); fs.mkdirSync(evidenceRoot, { recursive: true }); await page.screenshot({ path: file, fullPage: true });
          results.push({ target, scenario, engine: engineName, mode, metrics, errors }); await context.close();
        }
      } finally { await browser.close(); }
    }
  } finally {
    server.kill("SIGTERM");
    await new Promise((resolve) => { if (server.exitCode !== null) return resolve(); const timer = setTimeout(() => { server.kill("SIGKILL"); resolve(); }, 5000); server.once("close", () => { clearTimeout(timer); resolve(); }); });
  }
}
try {
  const registryOrigin = `http://127.0.0.1:${await listen(registryServer)}`;
  for (const target of ["vite", "next"]) for (const scenario of ["fresh", "existing"]) {
    const directory = path.join(temporaryRoot, `${target}-${scenario}`); fixture(directory, target, registryOrigin); await run(npm, ["install", "--no-audit", "--no-fund"], directory);
    const add = (...names) => run(process.execPath, [cli, "add", "--yes", "--cwd", directory, ...names.map((name) => `@neumorphism-ui/${name}`)], root, 300_000, scenario === "existing" && names.includes("alert-dialog") ? "button.tsx" : null);
    const aliases = readJson(path.join(directory, "components.json")).aliases;
    await add("neumorphism-ui"); assert.deepEqual(readJson(path.join(directory, "components.json")).aliases, aliases, "base reset custom aliases");
    await add("button"); if (scenario === "existing") await add("style-sage");
    const cssPath = path.join(directory, "src/globals.css"); const buttonPath = path.join(directory, "src/design-system/ui/button.tsx");
    if (scenario === "existing") { fs.appendFileSync(cssPath, "\n:root, .dark { --radius: 23px; }\n.consumer-owned { border-top: 7px solid currentColor; }\n"); fs.appendFileSync(buttonPath, "\n// Application-owned customization must survive later installs.\n"); }
    const beforeCss = fs.readFileSync(cssPath, "utf8"); const beforeButton = fs.readFileSync(buttonPath, "utf8"); const beforeApp = fs.readFileSync(path.join(directory, "src/consumer.tsx"), "utf8");
    await add("input", "dialog", ...expandedItems, ...workflowItems, ...workspaceItems, "template-analytics", "checkbox");
    assertExpandedFiles(directory);
    assert.equal(fs.readFileSync(cssPath, "utf8"), beforeCss, "adding UI changed theme or custom CSS"); assert.equal(fs.readFileSync(buttonPath, "utf8"), beforeButton, "adding UI overwrote a customized button"); assert.equal(fs.readFileSync(path.join(directory, "src/consumer.tsx"), "utf8"), beforeApp);
    await run(npm, ["run", "build"], directory); await browserChecks(directory, target, scenario);
    console.log(`PASS ${target}/${scenario}: install, preservation, build, and three browser engines.`);
  }
} finally {
  fs.mkdirSync(evidenceRoot, { recursive: true }); fs.writeFileSync(path.join(evidenceRoot, "results.json"), JSON.stringify(results, null, 2));
  await new Promise((resolve) => registryServer.close(resolve)); fs.rmSync(temporaryRoot, { recursive: true, force: true });
}

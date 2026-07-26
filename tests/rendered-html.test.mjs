import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const publicRoot = path.join(projectRoot, "public");

async function assetResponse(request) {
  const pathname = new URL(request.url).pathname;
  const relativePath = pathname.replace(/^\/+/, "");
  const filePath = path.resolve(publicRoot, relativePath);

  if (!filePath.startsWith(`${publicRoot}${path.sep}`)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const body = await readFile(filePath);
    const contentType = filePath.endsWith(".json")
      ? "application/json; charset=utf-8"
      : "application/octet-stream";

    return new Response(body, {
      headers: { "content-type": contentType },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: pathname.endsWith(".json") ? "application/json" : "text/html" },
    }),
    {
      ASSETS: {
        fetch: assetResponse,
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished Neumorphism UI homepage", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Neumorphism UI<\/title>/i);
  assert.match(html, /표면에서 시작하는/);
  assert.match(html, /shadcn Registry/);
  assert.match(html, /설치 시작하기/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("renders the component catalog and installation guide", async () => {
  const [componentsResponse, installationResponse] = await Promise.all([
    render("/components"),
    render("/docs/installation"),
  ]);

  assert.equal(componentsResponse.status, 200);
  assert.equal(installationResponse.status, 200);

  const [componentsHtml, installationHtml] = await Promise.all([
    componentsResponse.text(),
    installationResponse.text(),
  ]);

  for (const componentName of [
    "Accordion",
    "Alert",
    "Avatar",
    "Badge",
    "Breadcrumb",
    "Button",
    "Card",
    "Checkbox",
    "Dialog",
    "Dropdown Menu",
    "Input",
    "Input Group",
    "Label",
    "Pagination",
    "Progress",
    "Radio Group",
    "Scroll Area",
    "Select",
    "Separator",
    "Skeleton",
    "Slider",
    "Switch",
    "Table",
    "Tabs",
    "Textarea",
    "Tooltip",
  ]) {
    assert.match(componentsHtml, new RegExp(`>${componentName}<`));
  }
  assert.match(componentsHtml, /26개 세트/);

  assert.match(installationHtml, /@neumorphism-ui/);
  assert.match(installationHtml, /components\.json/);
  assert.match(installationHtml, /shadcn@latest/);
  assert.match(installationHtml, /https:\/\/neumorphism-ui\.dev\/r\/\{name\}\.json/);
});

test("serves a complete shadcn registry catalog", async () => {
  const response = await render("/r/registry.json");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^application\/json\b/i);

  const registry = await response.json();
  assert.equal(registry.$schema, "https://ui.shadcn.com/schema/registry.json");
  assert.equal(registry.name, "neumorphism-ui");

  const expectedItems = [
    "neumorphism-ui",
    "utils",
    "button",
    "card",
    "input",
    "badge",
    "skeleton",
    "tooltip",
    "accordion",
    "alert",
    "avatar",
    "breadcrumb",
    "checkbox",
    "dialog",
    "dropdown-menu",
    "input-group",
    "label",
    "pagination",
    "progress",
    "radio-group",
    "scroll-area",
    "select",
    "separator",
    "slider",
    "switch",
    "table",
    "tabs",
    "textarea",
  ];
  assert.deepEqual(
    registry.items.map((item) => item.name),
    expectedItems,
  );

  for (const itemName of expectedItems) {
    const item = JSON.parse(
      await readFile(path.join(publicRoot, "r", `${itemName}.json`), "utf8"),
    );
    assert.equal(item.$schema, "https://ui.shadcn.com/schema/registry-item.json");
    assert.equal(item.name, itemName);
  }

  const button = await readFile(path.join(publicRoot, "r", "button.json"), "utf8");
  assert.match(button, /--neu-shadow-raised-sm/);
  assert.doesNotMatch(button, /Upbit|Yahoo|Hyperliquid|watchlist/i);

  const utils = JSON.parse(
    await readFile(path.join(publicRoot, "r", "utils.json"), "utf8"),
  );
  assert.equal(utils.files[0].target, "@lib/utils.ts");

  for (const itemName of ["slider", "tooltip"]) {
    const item = JSON.parse(
      await readFile(path.join(publicRoot, "r", `${itemName}.json`), "utf8"),
    );
    assert.ok(item.dependencies.includes("radix-ui"));
  }
});

test("removes every disposable starter artifact", async () => {
  const packageJson = await readFile(path.join(projectRoot, "package.json"), "utf8");
  assert.doesNotMatch(packageJson, /react-loading-skeleton|site-creator-vinext-starter/);
  await assert.rejects(access(path.join(projectRoot, "app", "_sites-preview")));
});

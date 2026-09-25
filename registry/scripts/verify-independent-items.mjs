import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const docsRoot = path.resolve(root, "../docs");
const registry = JSON.parse(fs.readFileSync(path.join(root, "public/r/registry.json"), "utf8"));
const registryPackage = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const docsPackage = JSON.parse(fs.readFileSync(path.join(docsRoot, "package.json"), "utf8"));
const versions = {
  ...registryPackage.dependencies,
  ...registryPackage.devDependencies,
  ...docsPackage.dependencies,
  ...docsPackage.devDependencies,
  next: "16.3.5",
  "@vitejs/plugin-react": "6.0.2",
  "@tailwindcss/postcss": "^4.3.3",
};

const { values } = parseArgs({
  options: { shard: { type: "string", default: "1/1" } },
});
assert.match(values.shard, /^[1-9]\d*\/[1-9]\d*$/, "Use --shard=index/count (1-based)");
const [shard, shardCount] = values.shard.split("/").map(Number);
assert.ok(
  Number.isSafeInteger(shard) &&
    Number.isSafeInteger(shardCount) &&
    shard >= 1 &&
    shard <= shardCount,
  "Invalid independent-install shard",
);

const installable = registry.items.filter(
  (item) => item.files?.length && !["registry:base", "registry:style"].includes(item.type),
);
const selected = installable.filter((_, index) => index % shardCount === shard - 1);
assert.ok(selected.length > 0, "Independent installation shard must not be empty");

const cli = path.join(root, "node_modules/shadcn/dist/index.js");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const evidenceRoot = path.join(docsRoot, "test-results/independent-items");
fs.mkdirSync(evidenceRoot, { recursive: true });

function write(directory, file, content) {
  const destination = path.join(directory, file);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, content);
}
function writeJson(directory, file, content) {
  write(directory, file, JSON.stringify(content, null, 2) + "\n");
}
function run(command, args, cwd, log, timeout = 240_000) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
      stdio: ["ignore", log, log],
    });
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error("Command timed out: " + command + " " + args.join(" ")));
    }, timeout);
    child.once("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.once("close", (code, signal) => {
      clearTimeout(timer);
      if (code === 0) resolve();
      else reject(new Error(command + ": exit " + code + ", signal " + signal));
    });
  });
}
async function listen(server) {
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  return server.address().port;
}

const registryServer = http.createServer((request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  if (!/^\/r\/[a-z0-9-]+\.json$/.test(pathname)) {
    response.writeHead(404).end();
    return;
  }
  const file = path.join(root, "public", pathname);
  if (!fs.existsSync(file)) {
    response.writeHead(404).end();
    return;
  }
  response.writeHead(200, { "content-type": "application/json" });
  response.end(fs.readFileSync(file));
});

function fixture(directory, target, registryOrigin) {
  const next = target === "next";
  const dependencies = {
    react: versions.react,
    "react-dom": versions["react-dom"],
    ...(next ? { next: versions.next } : {}),
  };
  const devDependencies = {
    "@types/node": versions["@types/node"],
    "@types/react": versions["@types/react"],
    "@types/react-dom": versions["@types/react-dom"],
    "@tailwindcss/postcss": versions["@tailwindcss/postcss"],
    tailwindcss: versions.tailwindcss,
    typescript: versions.typescript,
    ...(next
      ? {}
      : {
          vite: versions.vite,
          "@vitejs/plugin-react": versions["@vitejs/plugin-react"],
        }),
  };
  writeJson(directory, "package.json", {
    private: true,
    type: "module",
    dependencies,
    devDependencies,
    scripts: { build: next ? "next build" : "tsc --noEmit && vite build" },
  });
  writeJson(directory, "tsconfig.json", {
    compilerOptions: {
      target: "ES2022",
      lib: ["DOM", "DOM.Iterable", "ES2022"],
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      esModuleInterop: true,
      module: "ESNext",
      moduleResolution: "Bundler",
      resolveJsonModule: true,
      jsx: next ? "preserve" : "react-jsx",
      allowJs: true,
      paths: { "@/*": ["./src/*"] },
      ...(next ? { plugins: [{ name: "next" }] } : {}),
    },
    include: ["src", ...(next ? ["next-env.d.ts", ".next/types/**/*.ts"] : [])],
    exclude: ["node_modules"],
  });
  writeJson(directory, "components.json", {
    $schema: "https://ui.shadcn.com/schema.json",
    style: "base-nova",
    rsc: next,
    tsx: true,
    tailwind: { config: "", css: "src/globals.css", baseColor: "neutral", cssVariables: true },
    iconLibrary: "lucide",
    aliases: {
      components: "@/design-system",
      ui: "@/design-system/ui",
      lib: "@/shared",
      utils: "@/shared/utils",
      hooks: "@/shared/hooks",
    },
    registries: { "@neumorphism-ui": registryOrigin + "/r/{name}.json" },
  });
  write(directory, "postcss.config.mjs", 'export default { plugins: { "@tailwindcss/postcss": {} } };\n');
  write(directory, "src/globals.css", '@import "tailwindcss";\n@custom-variant dark (&:is(.dark *));\n');

  if (next) {
    write(
      directory,
      "src/app/layout.tsx",
      'import "../globals.css"; export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }\n',
    );
    write(
      directory,
      "src/app/page.tsx",
      'export default function Page() { return <main>Independent registry item</main>; }\n',
    );
  } else {
    write(
      directory,
      "index.html",
      '<!doctype html><html lang="en"><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>',
    );
    write(
      directory,
      "src/main.tsx",
      'import { createRoot } from "react-dom/client"; import "./globals.css"; createRoot(document.getElementById("root")!).render(<main>Independent registry item</main>);\n',
    );
    write(
      directory,
      "src/vite-env.d.ts",
      '/// <reference types="vite/client" />\n',
    );
    write(
      directory,
      "vite.config.ts",
      'import { defineConfig } from "vite"; import react from "@vitejs/plugin-react"; import { fileURLToPath, URL } from "node:url"; export default defineConfig({ plugins: [react()], resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } } });\n',
    );
  }
}

async function verifyItem(item, target, registryOrigin) {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), "neumorphism-" + item.name + "-" + target + "-"),
  );
  const logPath = path.join(evidenceRoot, item.name + "-" + target + ".log");
  const log = fs.openSync(logPath, "w");
  try {
    fixture(directory, target, registryOrigin);
    await run(npm, ["install", "--no-audit", "--no-fund"], directory, log);
    await run(
      process.execPath,
      [cli, "add", "--yes", "--cwd", directory, "@neumorphism-ui/" + item.name],
      root,
      log,
    );
    await run(npm, ["run", "build"], directory, log);
    return { item: item.name, target, passed: true };
  } catch (error) {
    fs.writeSync(log, "\n" + String(error) + "\n");
    return { item: item.name, target, passed: false, error: String(error) };
  } finally {
    fs.closeSync(log);
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

const records = [];
const queue = [...selected];
async function worker(registryOrigin) {
  for (let item; (item = queue.shift()); ) {
    const targets = item.name.startsWith("template-") || item.categories?.includes("template") ? ["next"] : ["next", "vite"];
    for (const target of targets) {
      const record = await verifyItem(item, target, registryOrigin);
      records.push(record);
      console.log(
        (record.passed ? "PASS" : "FAIL") +
          " independent install: " +
          item.name +
          " (" +
          target +
          ")",
      );
      fs.writeFileSync(
        path.join(evidenceRoot, "report-" + shard + "-of-" + shardCount + ".json"),
        JSON.stringify(records, null, 2) + "\n",
      );
    }
  }
}

try {
  const registryOrigin = "http://127.0.0.1:" + (await listen(registryServer));
  await Promise.all(Array.from({ length: 2 }, () => worker(registryOrigin)));
} finally {
  await new Promise((resolve) => registryServer.close(resolve));
}

const expectedTargets = selected.reduce(
  (sum, item) =>
    sum + (item.name.startsWith("template-") || item.categories?.includes("template") ? 1 : 2),
  0,
);
assert.equal(records.length, expectedTargets, "Every selected item must finish");
const failures = records.filter((record) => !record.passed);
if (failures.length) {
  for (const failure of failures) {
    console.error(
      fs.readFileSync(
        path.join(evidenceRoot, failure.item + "-" + failure.target + ".log"),
        "utf8",
      ),
    );
  }
}
assert.equal(
  failures.length,
  0,
  "Independent installation failures; see docs/test-results/independent-items",
);
console.log(
  "All " +
    selected.length +
    " items passed " +
    records.length +
    " independent framework installations for shard " +
    shard +
    "/" +
    shardCount +
    ".",
);

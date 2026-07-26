import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const outputDir = path.join(root, "public", "r");

function run(executable, args, local = false) {
  const command = local
    ? path.join(
        root,
        "node_modules",
        ".bin",
        process.platform === "win32" ? `${executable}.cmd` : executable,
      )
    : executable;
  const windowsCommand =
    local && process.platform === "win32"
      ? [
          process.env.ComSpec ?? "cmd.exe",
          ["/d", "/s", "/c", [command, ...args].map(quoteCmdArg).join(" ")],
        ]
      : [command, args];
  const result = spawnSync(windowsCommand[0], windowsCommand[1], {
    cwd: root,
    stdio: "inherit",
  });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function quoteCmdArg(value) {
  if (/^[\w./:\\-]+$/.test(value)) {
    return value;
  }

  return `"${value.replaceAll('"', '""')}"`;
}

run(process.execPath, ["registry/scripts/validate-registry.mjs"]);
run("tsc", ["--project", "registry/tsconfig.json"], true);

fs.rmSync(outputDir, { force: true, recursive: true });
run("shadcn", ["build", "registry/registry.json", "--output", "public/r"], true);

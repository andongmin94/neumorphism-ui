import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const candidates = [process.env.WORKERS_CI_COMMIT_SHA, process.env.VERCEL_GIT_COMMIT_SHA, process.env.GITHUB_SHA];
try {
  candidates.push(execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: fileURLToPath(new URL("../..", import.meta.url)),
    encoding: "utf8",
  }).trim());
} catch {
  // Local source archives can be built without Git metadata.
}
const commit = candidates.find(value => /^[\da-f]{40}$/i.test(value ?? ""))?.toLowerCase() ?? "local";
const output = new URL("../public/build-info.json", import.meta.url);
mkdirSync(new URL("../public/", import.meta.url), { recursive: true });
writeFileSync(output, JSON.stringify({ commit }, null, 2) + "\n");

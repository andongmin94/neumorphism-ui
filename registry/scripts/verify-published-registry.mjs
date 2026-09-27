import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";

const root = fileURLToPath(new URL("../", import.meta.url));
const local = name => JSON.parse(fs.readFileSync(path.join(root, "public/r", `${name}.json`), "utf8"));
const registry = local("registry");
const origin = new URL(registry.homepage).origin;
const reportDirectory = path.join(root, "../docs/test-results/published-registry");
const report = { origin, checkedAt: new Date().toISOString(), expectedItems: registry.items.length, endpoints: [], passed: false };

async function inspect(name) {
  const url = `${origin}/r/${name}.json`;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(12000), headers: { accept: "application/json" } });
    const contentType = response.headers.get("content-type") ?? "";
    assert.equal(response.status, 200, `${url}: HTTP ${response.status}`);
    assert.ok(contentType.includes("json"), `${url}: expected JSON, received ${contentType}`);
    const body = await response.json();
    const matchesSource = isDeepStrictEqual(body, local(name));
    return { name, url, status: response.status, contentType, matchesSource, ...(matchesSource ? {} : { error: "Published item differs from this commit's generated endpoint" }) };
  } catch (error) {
    return { name, url, matchesSource: false, error: String(error), cause: String(error.cause ?? "") };
  }
}
try {
  const index = await inspect("registry");
  report.endpoints.push(index);
  assert.ok(index.matchesSource, index.error);
  for (let offset = 0; offset < registry.items.length; offset += 4) {
    report.endpoints.push(...await Promise.all(registry.items.slice(offset, offset + 4).map(item => inspect(item.name))));
  }
  report.passed = report.endpoints.every(item => item.matchesSource);
  assert.ok(report.passed, "Published endpoint mismatch; see published-registry/report.json");
  console.log(`Verified registry index and ${registry.items.length} published endpoints against this commit.`);
} catch (error) {
  report.error = String(error);
  console.error(report.error);
  process.exitCode = 1;
} finally {
  fs.mkdirSync(reportDirectory, { recursive: true });
  fs.writeFileSync(path.join(reportDirectory, "report.json"), JSON.stringify(report, null, 2) + "\n");
}

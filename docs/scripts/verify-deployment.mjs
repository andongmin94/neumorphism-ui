import assert from "node:assert/strict";

const expectedCommit = process.env.EXPECTED_COMMIT?.toLowerCase();
const origin = new URL(process.env.DOCS_TEST_URL ?? "https://neumorphism-ui.andongmin.com").origin;
assert.match(expectedCommit ?? "", /^[\da-f]{40}$/, "EXPECTED_COMMIT must be a full Git SHA");

const deadline = Date.now() + 5 * 60_000;
let lastFailure = "deployment marker not checked";
while (Date.now() < deadline) {
  try {
    const response = await fetch(`${origin}/build-info.json?expected=${expectedCommit}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(30_000),
    });
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /application\/json/i);
    const deployed = await response.json();
    if (deployed.commit === expectedCommit) {
      console.log(`Production documentation matches commit ${expectedCommit}.`);
      process.exit(0);
    }
    lastFailure = `production reports ${deployed.commit ?? "no commit"}`;
  } catch (error) {
    lastFailure = error instanceof Error ? error.message : String(error);
  }
  console.log(`Waiting for deployment: ${lastFailure}`);
  await new Promise(resolve => setTimeout(resolve, 5_000));
}
throw new Error(`Timed out waiting for ${expectedCommit}: ${lastFailure}`);

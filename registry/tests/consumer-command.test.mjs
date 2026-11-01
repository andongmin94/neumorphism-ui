import assert from "node:assert/strict";
import test from "node:test";
import { run } from "../scripts/consumer-command.mjs";
const execute = (source, expected, timeout = 3000, allow = false) => run(process.execPath, ["-e", source], process.cwd(), timeout, expected ? { file: expected, allow } : null);
test("declines only the expected overwrite and lets the command finish", async () => {
  await execute('process.stdout.write("The file button.tsx already exists. Would you like to overwrite?"); process.stdin.once("data", value => { process.exit(value.toString().startsWith("n") ? 0 : 9); });', "button.tsx");
});
test("rejects an early successful exit instead of recording an installation", async () => {
  await assert.rejects(execute('process.exit(0)', "button.tsx"), /Missing overwrite/);
});
test("rejects unexpected overwrite targets", async () => {
  await assert.rejects(execute('process.stdout.write("The file unrelated.tsx already exists. Would you like to overwrite?"); setInterval(()=>{}, 1000)', "button.tsx"), /Unexpected overwrite/);
});
test("bounds a stalled subprocess", async () => {
  await assert.rejects(execute('setInterval(()=>{}, 1000)', null, 100), /timed out/);
});
test("closes prompt input and waits for natural completion without forcing process exit", async () => {
  await execute('process.stdout.write("The file button.tsx already exists. Would you like to overwrite?"); process.stdin.on("data", value => { if (!value.toString().startsWith("n")) process.exit(9); }); process.stdin.on("end", () => { setTimeout(() => process.stdout.write("Finished remaining work after input EOF.\\n"), 25); });', "button.tsx");
});
test("still rejects an unexpected target after answering the expected prompt", async () => {
  await assert.rejects(execute('process.stdout.write("The file button.tsx already exists. Would you like to overwrite?"); process.stdin.on("data", () => { process.stdout.write("The file unrelated.tsx already exists. Would you like to overwrite?"); setTimeout(()=>{}, 2000); });', "button.tsx"), /Unexpected overwrite/);
});
test("approves only an explicitly named init scaffold without sending another answer", async () => {
  await execute('process.stdout.write("The file utils.ts already exists. Would you like to overwrite?"); process.stdin.once("data", value => { process.exit(value.toString() === "y" ? 0 : 9); });', "utils.ts", 3000, true);
});
test("rejects another overwrite after approving the init scaffold", async () => {
  await assert.rejects(execute('process.stdout.write("The file button.tsx already exists. Would you like to overwrite?"); process.stdin.on("data", () => { process.stdout.write("The file consumer-owned.tsx already exists. Would you like to overwrite?"); setTimeout(()=>{}, 2000); });', "button.tsx", 3000, true), /Unexpected overwrite/);
});

import { readFileSync } from "node:fs";
import { defineConfig } from "@playwright/test";

const registry = JSON.parse(readFileSync(new URL("../registry/public/r/registry.json", import.meta.url), "utf8")) as { homepage: string };

export default defineConfig({
  testDir: "./tests/smoke",
  testMatch: "deployment.spec.ts",
  workers: 1,
  retries: 0,
  timeout: 30_000,
  use: {
    baseURL: process.env.DOCS_TEST_URL ?? new URL(registry.homepage).origin,
    browserName: "chromium",
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  outputDir: "test-results/published-browser",
  reporter: [["list"], ["json", { outputFile: "test-results/published-browser-report.json" }]],
});

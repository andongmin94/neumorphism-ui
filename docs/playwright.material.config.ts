import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/material", testMatch: "material.spec.ts", workers: 1, retries: 0,
  outputDir: `test-results/docs-browser/material-${process.env.MATERIAL_PHASE ?? "after"}`,
  timeout: 30000,
  use: { baseURL: "http://127.0.0.1:4181", viewport: { width: 1200, height: 1000 }, reducedMotion: "reduce", trace: "retain-on-failure", screenshot: "only-on-failure" },
  webServer: { command: "node tests/material/server.mjs", url: "http://127.0.0.1:4181", reuseExistingServer: false, timeout: 60000 },
});

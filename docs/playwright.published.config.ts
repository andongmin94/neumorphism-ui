import { readFileSync } from "node:fs";
import { defineConfig } from "@playwright/test";
import base from "./playwright.config";
const registry = JSON.parse(readFileSync(new URL("../registry/public/r/registry.json", import.meta.url), "utf8")) as { homepage: string };
export default defineConfig({
  ...base,
  testMatch: ["**/presentation.spec.ts", "**/registry-origin.spec.ts"],
  use: { ...base.use, baseURL: new URL(registry.homepage).origin },
  webServer: undefined,
  outputDir: "test-results/published-browser",
  reporter: [["list"], ["json", { outputFile: "test-results/published-browser-report.json" }]],
});
